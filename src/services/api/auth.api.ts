import { supabase } from "@/utils/supabase";

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw error;
  } else {
    return data;
  }
}

export async function getUserInfo() {}
                                                                                      