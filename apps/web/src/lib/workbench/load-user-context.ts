import { createClient } from "@/lib/supabase/server";

export interface LiveWorkbenchContext {
  profile: Record<string, unknown> | null;
  relationships: Array<Record<string, unknown>>;
  events: Array<Record<string, unknown>>;
}

export async function loadUserWorkbenchContext(userId: string): Promise<LiveWorkbenchContext> {
  const supabase = await createClient();

  const [{ data: profile }, { data: relationships }, { data: events }] = await Promise.all([
    supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle(),
    supabase
      .from("relationships")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(25),
    supabase
      .from("system_events")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  return {
    profile: profile ?? null,
    relationships: relationships ?? [],
    events: events ?? [],
  };
}
