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
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    fullName: string;
    username: string;
    status: 0 | 1;
    role: string;
    balance: number;
    avatarPath: string | null;
    coverPath: string | null;
    avatarUrl?: string;
  }

  interface IProfileListMeta {
    totalBalance: number;
  }
}
