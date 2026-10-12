import { useState } from "react";
import { BadgeCheck, CircleAlert, CircleSlash, Clock, Loader2, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { statusOf, type Plan, type Subscription } from "@/lib/flight-api";

type Props = {
  plan: Plan;
  subscription?: Subscription | undefined;
  disabled?: boolean;
  onSubmit: (targetPrice: number) => Promise<void>;
  onCancel: () => Promise<void>;
};

const twd = (n: number) => `NT$${n.toLocaleString("en-US")}`;

const BADGES = {
  active: { icon: BadgeCheck, text: "已訂閱（有效）" },
  pending_payment: { icon: CircleAlert, text: "未完成付款" },
  cancelled: { icon: Clock, text: "已取消" },
  expired: { icon: CircleSlash, text: "已結束" },
} as const;

export function PlanCard({ plan, subscription, disabled, onSubmit, onCancel }: Props) {
  const [value, setValue] = useState(String(subscription?.target_price ?? plan.hintTwd));
  const [saving, setSaving] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const status = subscription ? statusOf(subscription) : null;
  const badge = status ? BADGES[status] : null;
  // Paid (or still inside a cancelled period) means the button only updates the target.
  const paid = status === "active" || status === "cancelled";

  const price = Number(value);
  const valid = Number.isFinite(price) && price > 0;

  async function handleCancel() {
    if (!window.confirm("確定要取消訂閱嗎？本期結束前仍會收到通知。")) return;
    setCancelling(true);
    setError(null);
    try {
      await onCancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : "取消失敗，請再試一次");
    } finally {
      setCancelling(false);
    }
  }

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
        {badge && (
          <span className="decal-tag inline-flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-bold">
            <badge.icon className="h-3.5 w-3.5" /> {badge.text}
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        {status === "active" &&
          `目前目標價 ${twd(subscription!.target_price)}，票價低於這個數字就寄 email 通知你。`}
        {status === "cancelled" &&
          `已取消，有效至 ${subscription!.current_period_end_date ?? "本期結束"}（仍會通知到該日）。`}
        {status === "pending_payment" && "還沒完成付款，付款後才會開始寄通知。"}
        {status === "expired" && "訂閱已結束，重新訂閱就會再開始追蹤。"}
        {!status && `目前最低價約 ${twd(plan.hintTwd)}，設定你能接受的價格。`}
      </p>
      {!paid && (
        <p className="text-xs text-muted-foreground">月費 NT$300，透過綠界信用卡定期定額扣款。</p>
      )}

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
        {paid
          ? "更新目標價"
          : status === "pending_payment"
            ? "完成付款"
            : status === "expired"
              ? "重新訂閱"
              : "開始追蹤"}
      </Button>

      {status === "active" && (
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={disabled || cancelling || saving}
          className="border-ink border-2 bg-card"
        >
          {cancelling && <Loader2 className="animate-spin" />}
          取消訂閱
        </Button>
      )}
    </form>
  );
}
