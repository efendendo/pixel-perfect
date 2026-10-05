import { Link, useNavigate } from "react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/SiteHeader";
import { RetroSky } from "@/components/RetroSky";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const isUp = mode === "signup";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = isUp
      ? await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/app" },
        })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else if (!data.session) {
      toast.success("請到信箱確認 email / Check your email to confirm.");
    } else {
      navigate("/app");
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="relative min-h-[calc(100vh-4.25rem)]">
        <RetroSky />
        <div className="relative mx-auto flex max-w-md flex-col px-4 pb-40 pt-20">
          <div className="panel-mecha animate-fade-up rounded-md bg-card p-8 backdrop-blur-sm">
            <h1 className="text-2xl font-bold uppercase tracking-wide">
              {isUp ? "建立帳號 / Sign up" : "登入 / Sign in"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isUp ? "開始追蹤你的機票目標價" : "歡迎回來"}
            </p>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-display uppercase tracking-wider">
                  Email
                </Label>
                <Input
                  className="bg-background/60"
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-display uppercase tracking-wider">
                  Password
                </Label>
                <Input
                  className="bg-background/60"
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="border-ink w-full border-2 font-display uppercase tracking-wider shadow-glow"
                disabled={loading}
              >
                {loading ? "…" : isUp ? "Sign up / 註冊" : "Sign in / 登入"}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {isUp ? "已經有帳號？" : "還沒有帳號？"}{" "}
              <Link
                to={isUp ? "/signin" : "/signup"}
                className="font-semibold text-accent hover:underline"
              >
                {isUp ? "Sign in" : "Sign up"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
