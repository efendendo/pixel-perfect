import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, PlaneTakeoff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Dashboard｜Flight Price Notifier" },
      { name: "description", content: "你的航線追蹤儀表板。" },
      { property: "og:title", content: "Dashboard｜Flight Price Notifier" },
      { property: "og:description", content: "你的航線追蹤儀表板。" },
    ],
  }),
  component: AppPage,
});

function AppPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        right={
          <Button variant="outline" onClick={signOut}>
            <LogOut /> Sign out
          </Button>
        }
      />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-16 sm:px-6">
        <h1 className="animate-fade-up text-3xl font-bold tracking-tight sm:text-4xl">Hi {user.email}</h1>
        <div className="animate-fade-up mt-8 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary">
            <PlaneTakeoff className="h-6 w-6" />
          </div>
          <p className="text-lg font-medium">
            你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Your dashboard is coming soon. Route-subscription will be added in the next milestone.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
