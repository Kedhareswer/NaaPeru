// Needle WASM TypeScript wrapper.
// ABI verified against the shipped binary (public/needle/needle.js):
//  - Module exports: ccall, cwrap, UTF8ToString, HEAPU8, _malloc, _free,
//    _needle_load, _needle_init, _needle_reset, _needle_complete.
//  - stringToUTF8 is NOT exported — string args must go through ccall("…", ["string"]).
//  - ccall takes names WITHOUT the leading underscore.
//  - _needle_load(ptr: i32, len: i64) — the length must be a BigInt.
//  - Call order: needle_load(model) FIRST, then needle_init; init fails otherwise.
//  - needle_init / needle_complete return the TOKEN COUNT on success (>= 0);
//    only negative values are errors.
//  - Result JSON uses snake_case (function_calls, error_code) — normalized here.

export interface NeedleInitOptions {
  systemPrompt?: string;
  toolsJson?: string;
  toolIndexPath?: string;
}

export interface NeedleCompleteResult {
  type: "call" | "respond" | "error";
  success?: boolean;
  error?: string | null;
  errorCode?: string | null;
  functionCalls?: Array<{
    name: string;
    arguments: Record<string, unknown>;
  }>;
  reasoning?: string;
  confidence?: number | null;
  prefillTps?: number;
  decodeTps?: number;
  peakRamMb?: number;
}

interface EmscriptenModule {
  ccall: (ident: string, returnType: string | null, argTypes: string[], args: unknown[]) => unknown;
  UTF8ToString: (ptr: number) => string;
  _malloc: (size: number) => number;
  _free: (ptr: number) => void;
  _needle_load: (ptr: number, len: bigint) => number;
  _needle_reset: () => void;
  HEAPU8: Uint8Array;
}

declare global {
  interface Window {
    createNeedle?: (moduleArg?: Record<string, unknown>) => Promise<EmscriptenModule>;
  }
}

let needleModule: EmscriptenModule | null = null;
let modulePromise: Promise<EmscriptenModule> | null = null;
let scriptLoadPromise: Promise<void> | null = null;

const NEEDLE_JS_URL = "/needle/needle.js";
const NEEDLE_WASM_URL = "/needle/needle.wasm";

function loadNeedleScript(): Promise<void> {
  if (window.createNeedle) return Promise.resolve();
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = NEEDLE_JS_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load needle.js"));
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

export async function loadNeedleWasm(): Promise<EmscriptenModule> {
  if (needleModule) return needleModule;
  if (modulePromise) return modulePromise;

  modulePromise = (async () => {
    await loadNeedleScript();
    if (!window.createNeedle) {
      throw new Error("createNeedle not found on window - needle.js failed to load");
    }
    const emModule = await window.createNeedle({
      locateFile: () => NEEDLE_WASM_URL,
    });
    needleModule = emModule;
    return emModule;
  })();

  return modulePromise;
}

/** Load model weights into the runtime. Must run before initNeedle. */
export async function loadNeedleModel(modelBytes: Uint8Array): Promise<void> {
  const module = await loadNeedleWasm();
  const ptr = module._malloc(modelBytes.length);
  module.HEAPU8.set(modelBytes, ptr);
  try {
    const result = module._needle_load(ptr, BigInt(modelBytes.length));
    if (result !== 0) {
      throw new Error(`Needle model load failed with code: ${result}`);
    }
  } finally {
    module._free(ptr);
  }
}

export async function initNeedle(options: NeedleInitOptions = {}): Promise<void> {
  const module = await loadNeedleWasm();
  const result = module.ccall(
    "needle_init",
    "number",
    ["string", "string", "string"],
    [options.systemPrompt ?? "", options.toolsJson ?? "[]", options.toolIndexPath ?? ""]
  ) as number;
  if (result < 0) {
    throw new Error(`Needle init failed with code: ${result} (is the model loaded?)`);
  }
}

/** snake_case wasm JSON -> camelCase result. */
function normalizeResult(raw: Record<string, unknown>): NeedleCompleteResult {
  const calls = (raw.function_calls ?? raw.functionCalls) as NeedleCompleteResult["functionCalls"];
  return {
    type: raw.type as NeedleCompleteResult["type"],
    success: raw.success as boolean | undefined,
    error: (raw.error ?? null) as string | null,
    errorCode: (raw.error_code ?? raw.errorCode ?? null) as string | null,
    functionCalls: calls ?? [],
    reasoning: (raw.reasoning ?? "") as string,
    confidence: (raw.confidence ?? null) as number | null,
    prefillTps: raw.prefill_tps as number | undefined,
    decodeTps: raw.decode_tps as number | undefined,
    peakRamMb: raw.peak_ram_mb as number | undefined,
  };
}

export async function completeNeedle(input: string, maxNewTokens = 256): Promise<NeedleCompleteResult> {
  const module = await loadNeedleWasm();
  const outCapacity = 16384;
  const outPtr = module._malloc(outCapacity);
  try {
    const resultCode = module.ccall(
      "needle_complete",
      "number",
      ["string", "number", "number", "number"],
      [input, maxNewTokens, outPtr, outCapacity]
    ) as number;
    const outputJson = module.UTF8ToString(outPtr);
    if (resultCode < 0) {
      // The runtime still writes a structured error payload on failure
      try {
        return normalizeResult(JSON.parse(outputJson));
      } catch {
        throw new Error(`Needle complete failed with code: ${resultCode}`);
      }
    }
    return normalizeResult(JSON.parse(outputJson));
  } finally {
    module._free(outPtr);
  }
}

export async function resetNeedle(): Promise<void> {
  const module = await loadNeedleWasm();
  module._needle_reset();
}

export function isNeedleLoaded(): boolean {
  return needleModule !== null;
}
