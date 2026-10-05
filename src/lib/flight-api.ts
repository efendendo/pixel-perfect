// Client for the flight-api HTTP API (API Gateway → Lambda → DynamoDB).
// The browser holds no AWS credentials; it only calls these two routes.

export type PlanName = "tokyo" | "seoul";

export type Plan = {
  name: PlanName;
  label: string;
  route: string;
  // Rough current cheapest fare, shown so people pick a sensible target.
  hintTwd: number;
};

export const PLANS: Plan[] = [
  { name: "tokyo", label: "台北 ✈ 東京", route: "TPE-TYO", hintTwd: 9325 },
  { name: "seoul", label: "台北 ✈ 首爾", route: "TPE-SEL", hintTwd: 5989 },
];

export type Subscription = {
  email: string;
  route: string;
  plan_name: PlanName;
  target_price: number;
  currency: "TWD";
};

const API_URL = (import.meta.env.VITE_FLIGHT_API_URL ?? "").replace(/\/+$/, "");

export function isFlightApiConfigured(): boolean {
  return API_URL !== "";
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) throw new Error("VITE_FLIGHT_API_URL is not set");
  const res = await fetch(`${API_URL}${path}`, init);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body?.error ?? `Request failed (${res.status})`);
  return body as T;
}

export async function listSubscriptions(email: string): Promise<Subscription[]> {
  const body = await call<{ items?: Subscription[] } | Subscription[]>(
    `/subscriptions?email=${encodeURIComponent(email)}`,
  );
  const items = Array.isArray(body) ? body : (body.items ?? []);
  return items.map((s) => ({ ...s, target_price: Number(s.target_price) }));
}

export async function subscribe(email: string, plan: PlanName, targetPrice: number) {
  return call<unknown>("/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, plan_name: plan, target_price: targetPrice }),
  });
}
