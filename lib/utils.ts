import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Validate and normalize external URLs to http(s) only.
// Returns a normalized href string or null if invalid/unsafe.
export function toSafeExternalHref(input?: unknown): string | null {
  try {
    if (typeof input !== 'string') return null;
    const raw = input.trim();
    if (!raw) return null;
    const lower = raw.toLowerCase();
    // Quick reject of dangerous schemes
    if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
      return null;
    }

    let url: URL;
    try {
      url = new URL(raw);
    } catch {
      // If no scheme, attempt https normalization for domain-like inputs
      if (/^[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i.test(raw)) {
        url = new URL(`https://${raw}`);
      } else {
        return null;
      }
    }

    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    return url.href;
  } catch {
    return null;
  }
}
