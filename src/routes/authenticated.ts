import { redirect } from "react-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AuthenticatedData = { user: User };

// Client-only gate for signed-in pages: redirects to /signin when there is no session.
export async function requireUser(): Promise<AuthenticatedData> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw redirect("/signin");
  return { user: data.user };
}
