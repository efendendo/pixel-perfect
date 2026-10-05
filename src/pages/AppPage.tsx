import { useLoaderData, useNavigate } from "react-router";
import { LogOut, PlaneTakeoff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { usePageMeta } from "@/lib/use-page-meta";
import { RetroSky } from "@/components/RetroSky";
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
          <div className="panel-mecha animate-fade-up mt-8 rounded-md bg-card p-10 text-center backdrop-blur-sm">
            <div className="border-ink mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border-2 bg-accent text-primary shadow-glow">
              <PlaneTakeoff className="h-6 w-6" />
            </div>
            <p className="text-lg font-medium">
              你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Your dashboard is coming soon. Route-subscription will be added in the next milestone.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
