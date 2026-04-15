import { supabase } from "@/utils/supabase";

export async function getAllProfiles(): Promise<IProfile[]> {
  const { data, error } = await supabase.from("profiles").select("*").order("id", { ascending: false });

  if (error) throw error;
  return (data ?? []) as IProfile[];
}
