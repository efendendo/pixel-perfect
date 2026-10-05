import { useState } from "react";
import { BadgeCheck, Loader2, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Plan, Subscription } from "@/lib/flight-api";

type Props = {
  plan: Plan;
  subscription?: Subscription | undefined;
  disabled?: boolean;
  onSubmit: (targetPrice: number) => Promise<void>;
};

const twd = (n: number) => `NT$${n.toLocaleString("en-US")}`;

export function PlanCard({ plan, subscription, disabled, onSubmit }: Props) {
  const [value, setValue] = useState(String(subscription?.target_price ?? plan.hintTwd));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const price = Number(value);
  const valid = Number.isFinite(price) && price > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSaving(true);
    setError(null);
    try {
      await onSubmit(Math.round(price));
    } catch (err) {
      setError(err instanceof Error ? err.message : "訂閱失敗，請再試一次");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="panel-mecha animate-fade-up flex flex-col gap-4 rounded-md bg-card p-6 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="border-ink grid h-10 w-10 place-items-center rounded-full border-2 bg-accent text-primary shadow-glow">
            <Plane className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold">{plan.label}</h2>
        </div>
        {subscription && (
          <span className="decal-tag inline-flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-bold">
            <BadgeCheck className="h-3.5 w-3.5" /> 已訂閱
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        {subscription
          ? `目前目標價 ${twd(subscription.target_price)}，票價低於這個數字就寄 email 通知你。`
          : `目前最低價約 ${twd(plan.hintTwd)}，設定你能接受的價格。`}
      </p>

      <label className="flex flex-col gap-2 text-sm font-medium">
        目標價（TWD）
        <Input
          type="number"
          inputMode="numeric"
          min={1}
          step={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled || saving}
        />
      </label>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button
        type="submit"
        disabled={disabled || saving || !valid}
        className="border-ink border-2 font-display uppercase tracking-wider shadow-glow"
      >
        {saving && <Loader2 className="animate-spin" />}
        {subscription ? "更新目標價" : "開始追蹤"}
      </Button>
    </form>
  );
}
