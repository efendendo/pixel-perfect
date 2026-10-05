import { Link } from "react-router";
import { useEffect, useRef } from "react";
import { Radar, BellRing, CalendarX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { usePageMeta } from "@/lib/use-page-meta";
import { RetroSky } from "@/components/RetroSky";

const features = [
  {
    icon: Radar,
    title: "盯緊熱門航線",
    en: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: BellRing,
    title: "達標自動通知",
    en: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: CalendarX,
    title: "隨時取消",
    en: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal") ?? [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function Index() {
  usePageMeta({
    title: "Flight Price Notifier｜機票降價通知",
    description:
      "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.",
    ogTitle: "Flight Price Notifier｜機票降價通知",
    ogDescription: "設定航線與目標價，機票降價就通知你。",
  });
  const ref = useReveal();
  return (
    <div ref={ref} className="flex min-h-screen flex-col">
      <SiteHeader
        right={
          <Button
            asChild
            className="border-ink border-2 font-display uppercase tracking-wider shadow-glow"
          >
            <Link to="/signin">Sign in / 登入</Link>
          </Button>
        }
      />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <RetroSky />
          <div className="relative mx-auto max-w-4xl px-4 pb-40 pt-24 text-center sm:px-6 sm:pb-48 sm:pt-32">
            <p className="decal-tag animate-fade-up mb-6 inline-block rounded-sm px-3 py-1 text-xs font-bold">
              機票降價通知 · 台北出發
            </p>
            <h1 className="animate-fade-up text-gradient text-5xl font-bold uppercase tracking-tight drop-shadow-[4px_4px_0_var(--ink)] sm:text-7xl">
              Flight Price Notifier
            </h1>
            <p className="animate-fade-up mt-6 text-xl font-medium sm:text-2xl">
              設定航線與目標價，機票降價就通知你
            </p>
            <p className="animate-fade-up mt-3 text-muted-foreground">
              Set a route and a target price — we email you when the fare drops.
            </p>
            <div className="animate-fade-up mt-10 flex justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="border-ink border-2 font-display uppercase tracking-wider shadow-glow hover:-translate-y-0.5"
              >
                <Link to="/signup">免費開始 / Get started</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-desert">
          <div className="mx-auto max-w-6xl px-4 pb-28 pt-12 sm:px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className="reveal panel-mecha rounded-md bg-card p-7 transition-transform hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="border-ink mb-5 grid h-12 w-12 place-items-center rounded-full border-2 bg-accent text-primary shadow-glow">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">
                    {f.title}{" "}
                    <span className="block text-xs font-medium uppercase tracking-[0.15em] text-accent">
                      ({f.en})
                    </span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
