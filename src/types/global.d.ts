export {};

declare global {
  interface IBackendRes<T, M = undefined> {
    success: boolean;
    statusCode: number | string;
    statusText: string;
    errorCode: string;
    message: string;
    data?: T;
    meta?: M;
  }

  interface IProfile {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    full_name: string;
    username: string;
    status: 0 | 1;
    role: string;
    balance: number;
    avatar_path: string | null;
    cover_path: string | null;
    avatar_url?: string;
  }

  export interface CreateProfileFormValues {
    full_name: string;
    username: string;
    password: string;
    confirmPassword: string;
    role: "SuperAdmin" | "Admin" | "User";
    status: 0 | 1;
    avatar_path?: string;
  }

  export interface UpdateProfileFormValues {
    username: string;
    full_name: string;
    password: string;
    role: "SuperAdmin" | "Admin" | "User";
    status: 0 | 1;
    avatar_path?: string;
  }
}
