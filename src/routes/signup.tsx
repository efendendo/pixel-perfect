import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up｜Flight Price Notifier" },
      { name: "description", content: "註冊 Flight Price Notifier，設定航線與目標價，降價就通知你。" },
      { property: "og:title", content: "Sign up｜Flight Price Notifier" },
      { property: "og:description", content: "註冊 Flight Price Notifier，設定航線與目標價，降價就通知你。" },
    ],
  }),
  component: () => <AuthForm mode="signup" />,
});
