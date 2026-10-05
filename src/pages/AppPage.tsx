import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { usePageMeta } from "@/lib/use-page-meta";
import { RetroSky } from "@/components/RetroSky";
import { PlanCard } from "@/components/PlanCard";
import {
  PLANS,
  isFlightApiConfigured,
  listSubscriptions,
  subscribe,
  type PlanName,
  type Subscription,
} from "@/lib/flight-api";
import type { AuthenticatedData } from "@/routes/authenticated";

export default function AppPage() {
  usePageMeta({
    title: "Dashboard｜Flight Price Notifier",
    description: "你的航線追蹤儀表板。",
    ogTitle: "Dashboard｜Flight Price Notifier",
    ogDescription: "你的航線追蹤儀表板。",
  });
  const { user } = useLoaderData() as AuthenticatedData;
  const navigate = useNavigate();
  const email = user.email ?? "";
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const apiReady = isFlightApiConfigured();

  useEffect(() => {
    if (!apiReady || !email) return;
    listSubscriptions(email)
      .then(setSubs)
      .catch(() => setLoadError("暫時讀不到你的訂閱，請稍後重新整理。"));
  }, [apiReady, email]);

  async function handleSubscribe(plan: PlanName, targetPrice: number) {
    await subscribe(email, plan, targetPrice);
    setSubs(await listSubscriptions(email));
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        right={
          <Button
            variant="outline"
            className="border-ink border-2 bg-card font-display uppercase tracking-wider shadow-glow"
            onClick={signOut}
          >
            <LogOut /> Sign out
          </Button>
        }
      />
      <main className="relative flex-1">
        <RetroSky />
        <div className="relative mx-auto w-full max-w-4xl px-4 pb-40 pt-16 sm:px-6">
          <p className="decal-tag animate-fade-up mb-4 inline-block rounded-sm px-3 py-1 text-xs font-bold">
            Flight Deck · 控制台
          </p>
          <h1 className="animate-fade-up break-words text-3xl font-bold tracking-tight drop-shadow-[3px_3px_0_var(--ink)] sm:text-4xl">
            Hi {user.email}
          </h1>
          <p className="animate-fade-up mt-3 text-muted-foreground">
            選一條航線、設定目標價，票價低於目標就寄 email 通知你。
          </p>
          {!apiReady && (
            <p className="mt-6 text-sm text-destructive">訂閱服務尚未設定，請稍後再試。</p>
          )}
          {loadError && <p className="mt-6 text-sm text-destructive">{loadError}</p>}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {PLANS.map((plan) => (
              <PlanCard
                key={`${plan.name}-${subs.find((s) => s.route === plan.route)?.target_price ?? ""}`}
                plan={plan}
                subscription={subs.find((s) => s.route === plan.route)}
                disabled={!apiReady || !email}
                onSubmit={(price) => handleSubscribe(plan.name, price)}
              />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
