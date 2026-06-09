/**
 * Tiny client over apps-backend. All event writes are consent-gated server-side.
 * Shared design with airportiq/services/api.ts — kept duplicated rather than
 * extracted to a shared package so the apps can ship independently.
 */

const API_BASE =
  process.env.EXPO_PUBLIC_API_BASE ?? "http://localhost:8000";
export const POLICY_VERSION =
  process.env.EXPO_PUBLIC_POLICY_VERSION ?? "v1.0";

const APP_SLUG = "careerpulse";

let authToken: string | null = null;
export const setAuthToken = (t: string | null) => {
  authToken = t;
};

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${path} -> ${res.status}: ${text}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export async function grantConsent(scope: string) {
  return request("POST", "/v1/consent/grant", {
    app_slug: APP_SLUG,
    scope,
    policy_version: POLICY_VERSION,
  });
}

export async function withdrawConsent(scope: string) {
  return request("POST", "/v1/consent/withdraw", {
    app_slug: APP_SLUG,
    scope,
    policy_version: POLICY_VERSION,
  });
}

export async function logEvent(opts: {
  eventType: string;
  consentScope: string;
  payload?: Record<string, unknown>;
}) {
  return request("POST", "/v1/events", {
    app_slug: APP_SLUG,
    event_type: opts.eventType,
    consent_scope: opts.consentScope,
    occurred_at: new Date().toISOString(),
    payload: opts.payload ?? {},
  });
}
