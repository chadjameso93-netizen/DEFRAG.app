import { createClient } from "@/lib/supabase/server"

export async function getSupabaseServer() {
  return createClient()
}
