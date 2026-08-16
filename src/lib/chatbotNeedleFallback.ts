// Needle WASM fallback for the chatbot: a local model answering in-browser,
// tried before the external /api/chat fallback.
//
// The shipped wasm is the RUNTIME only — it needs model weights (.cact).
// Drop them at public/needle/model.cact and this whole path lights up on the
// next visit; until then status stays "absent" and the chatbot quietly uses
// the API fallback. No errors, no wasted work.

import { initNeedle, completeNeedle, resetNeedle, loadNeedleModel, NeedleCompleteResult } from "./needleWasm";
import { needleToolsJson, toolImplementations, NeedleToolName } from "./needleTools";

export type NeedleStatus = "absent" | "loading" | "ready" | "failed";

interface NeedleFallbackPayload {
  question: string;
  matcherReply: string;
}

const MODEL_URL = "/needle/model.cact";

const SYSTEM_PROMPT = `You are Kedhar. Roleplay as Kedhar himself in first person.
Only answer from the provided tools and their results.
If the question cannot be answered from the tool results, say you do not have that in this portfolio.
Do not invent facts. Do not use external world knowledge.
Keep answers concise, lightly sarcastic, playful, and with subtle humor.
You have access to tools that can retrieve information about Kedhar's profile, experience, projects, skills, education, contact, hobbies, achievements, and more.
Use the tools to get accurate information before responding.`;

let status: NeedleStatus = "absent";
let initPromise: Promise<void> | null = null;

export function getNeedleStatus(): NeedleStatus {
  return status;
}

export function isNeedleFallbackReady(): boolean {
  return status === "ready";
}

export async function initializeNeedleFallback(): Promise<void> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    status = "loading";
    try {
      // Cheap probe first — most visits won't have weights deployed.
      // SPA fallbacks answer 200 text/html for missing files, so the
      // content-type is the real signal, not the status code.
      const probe = await fetch(MODEL_URL, { method: "HEAD" });
      const probeType = probe.headers.get("content-type") ?? "";
      if (!probe.ok || probeType.includes("text/html")) {
        status = "absent";
        console.info("Needle: no model at /needle/model.cact — chatbot uses the API fallback.");
        return;
      }

      const response = await fetch(MODEL_URL);
      if (!response.ok) throw new Error(`model fetch failed: ${response.status}`);
      const bytes = new Uint8Array(await response.arrayBuffer());

      await loadNeedleModel(bytes); // weights first…
      await initNeedle({ systemPrompt: SYSTEM_PROMPT, toolsJson: needleToolsJson, toolIndexPath: "" }); // …then init

      status = "ready";
      console.info(`Needle: local model ready (${(bytes.length / 1024 / 1024).toFixed(1)} MB, in-browser).`);
    } catch (error) {
      status = "failed";
      console.warn("Needle: local model failed to initialize — chatbot uses the API fallback.", error);
    }
  })();

  return initPromise;
}

async function executeToolCall(name: string, args: Record<string, unknown>): Promise<unknown> {
  const impl = toolImplementations[name as NeedleToolName];
  if (!impl) return { error: `Unknown tool: ${name}` };
  try {
    return await impl(args);
  } catch (error) {
    return { error: `Tool execution failed: ${error}` };
  }
}

/**
 * Needle (45M params) is a tool ROUTER, not a prose writer — its "respond"
 * turn carries meta-reasoning, not user-facing text. The reply is composed
 * here, in Kedhar's voice, straight from the tool data the model selected.
 */
function flattenResult(value: unknown, prefix = "", depth = 0): string[] {
  if (value == null) return [];
  if (typeof value === "string" || typeof value === "number") {
    return [prefix ? `**${prefix}** — ${value}` : String(value)];
  }
  if (Array.isArray(value)) {
    const flat = value.filter((v) => typeof v === "string" || typeof v === "number");
    return flat.length ? [prefix ? `**${prefix}** — ${flat.join(", ")}` : flat.join(", ")] : [];
  }
  if (typeof value === "object" && depth < 2) {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
      flattenResult(v, prefix ? `${prefix} · ${k}` : k, depth + 1)
    );
  }
  return [];
}

function composeFromTools(toolResults: Array<{ name: string; result: unknown }>): string | null {
  const lines = toolResults
    .filter(({ result }) => !(result && typeof result === "object" && "error" in (result as object)))
    .flatMap(({ result }) => flattenResult(result))
    .slice(0, 10);
  if (!lines.length) return null;
  return `Straight from my own files, no cloud involved:\n${lines.map((l) => `- ${l}`).join("\n")}`;
}

export async function fetchNeedleFallbackReply(payload: NeedleFallbackPayload): Promise<string | null> {
  await initializeNeedleFallback();
  if (status !== "ready") return null;

  try {
    let result: NeedleCompleteResult = await completeNeedle(payload.question, 256);
    const toolResults: Array<{ name: string; result: unknown }> = [];

    for (let step = 0; step < 3; step++) {
      if (result.type === "call" && result.functionCalls && result.functionCalls.length > 0) {
        for (const call of result.functionCalls) {
          toolResults.push({ name: call.name, result: await executeToolCall(call.name, call.arguments) });
        }
        result = await completeNeedle(JSON.stringify(toolResults), 256);
      } else if (result.type === "respond") {
        // toolless respond = nothing grounded to say; hand off to the API
        return toolResults.length ? composeFromTools(toolResults) : null;
      } else {
        // error, or a call with no tools matched — likely off-topic
        return "That's outside my scope. I only know about Kedhar's work, projects, skills, and career. Ask me about those instead.";
      }
    }

    return composeFromTools(toolResults);
  } catch (error) {
    console.warn("Needle: inference error, falling back to API.", error);
    return null;
  }
}

export async function resetNeedleFallback(): Promise<void> {
  if (status !== "ready") return;
  try {
    await resetNeedle();
  } catch {
    /* reset is best-effort */
  }
}
