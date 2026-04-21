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

export async function register(email: string, password: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error("Đăng ký tài khoản không thành cônh");

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: authData.user.id,
    full_name: authData.user.email,
    username: authData.user.email,
    role: "User",
    status: 1,
  });

  if (profileError) throw profileError;

  return authData.user;
}

export async function getUserInfo() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();

    if (error) throw error;
    return data as IProfile;
  }
}

export async function updateInfo(user_id: string, full_name: string, avatar_path: string, cover_path: string) {
  const { data, error: profileError } = await supabase
    .from("profiles")
    .update({
      full_name: full_name,
      avatar_path: avatar_path,
      cover_path: cover_path,
    })
    .eq("id", user_id)
    .select()
    .single();

  if (profileError) throw profileError;

  return data as IProfile;
}

export async function signout() {
  const { error } = await supabase.auth.signOut({ scope: "local" });

  if (error) throw error;
}
