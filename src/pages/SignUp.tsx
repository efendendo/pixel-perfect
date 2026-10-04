import { AuthForm } from "@/components/AuthForm";
import { usePageMeta } from "@/lib/use-page-meta";

export default function SignUp() {
  usePageMeta({
    title: "Sign up｜Flight Price Notifier",
    description: "註冊 Flight Price Notifier，設定航線與目標價，降價就通知你。",
    ogTitle: "Sign up｜Flight Price Notifier",
    ogDescription: "註冊 Flight Price Notifier，設定航線與目標價，降價就通知你。",
  });
  return <AuthForm mode="signup" />;
}
