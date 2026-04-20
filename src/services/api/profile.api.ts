import { supabase } from "@/utils/supabase";

export async function getAllProfiles(): Promise<IProfile[]> {
  const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as IProfile[];
}

export async function createProfile(values: CreateProfileFormValues) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: `${values.username}@tinasoft.vn`,
    password: values.password,
    options: {
      data: {
        full_name: values.full_name,
        username: values.username,
      },
    },
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error("Không tạo được user");

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: authData.user.id,
    full_name: values.full_name,
    username: values.username,
    role: values.role,
    status: values.status,
    avatar_path: values.avatar_path ?? null,
  });

  if (profileError) throw profileError;

  return authData.user;
}

export async function updateProfile(userId: string, values: Partial<UpdateProfileFormValues>) {
  if (values.full_name || values.username) {
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        full_name: values.full_name,
        username: values.username,
      },
    });
    if (authError) throw authError;
  }

  const { data, error: profileError } = await supabase
    .from("profiles")
    .update({
      full_name: values.full_name,
      username: values.username,
      role: values.role,
      status: values.status,
      avatar_path: values.avatar_path,
    })
    .eq("id", userId)
    .select()
    .single();

  if (profileError) throw profileError;

  return data;
}

export async function deleteProfile(userId: string) {
  const { error } = await supabase.from("profiles").delete().eq("id", userId);

  if (error) throw error;
}