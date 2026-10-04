import { supabase } from "./supabase";

const API = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

export const apiConfigured = API.startsWith("http");

async function accessToken(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

async function request<T>(path: string, init: RequestInit = {}, auth = true): Promise<T> {
  if (!apiConfigured) throw new Error("API not configured (VITE_API_URL missing)");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (auth) {
    const token = await accessToken();
    if (!token) throw new Error("Not signed in");
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API}${path}`, { ...init, headers });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as { error?: string }).error || `Request failed (${res.status})`);
  return body as T;
}

export const api = {
  list: <T>(resource: string) =>
    request<{ items: T[] }>(`/api/admin/${resource}`).then((r) => r.items),
  create: <T>(resource: string, data: Record<string, unknown>) =>
    request<{ item: T }>(`/api/admin/${resource}`, { method: "POST", body: JSON.stringify(data) }).then(
      (r) => r.item
    ),
  update: <T>(resource: string, id: string, data: Record<string, unknown>) =>
    request<{ item: T }>(`/api/admin/${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((r) => r.item),
  remove: (resource: string, id: string) =>
    request<{ ok: boolean }>(`/api/admin/${resource}/${id}`, { method: "DELETE" }),
  upsertSiteContent: <T>(key: string, value: unknown) =>
    request<{ item: T }>(`/api/admin/site_content/${key}`, {
      method: "PUT",
      body: JSON.stringify({ value }),
    }).then((r) => r.item),
  signUpload: (folder: string) =>
    request<{ cloud_name: string; api_key: string; timestamp: number; folder: string; signature: string }>(
      `/api/uploads/sign`,
      { method: "POST", body: JSON.stringify({ folder }) }
    ),
  submitInquiry: (data: Record<string, unknown>) =>
    request<{ ok: boolean }>(`/api/inquiries`, {
      method: "POST",
      body: JSON.stringify(data),
    }, false),
};

export async function uploadToCloudinary(file: File, folder: string): Promise<{ url: string; publicId: string }> {
  const sign = await api.signUpload(folder);
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sign.api_key);
  form.append("timestamp", String(sign.timestamp));
  form.append("folder", sign.folder);
  form.append("signature", sign.signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloud_name}/image/upload`, {
    method: "POST",
    body: form,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as { error?: { message?: string } }).error?.message || "Upload failed");
  return {
    url: (body as { secure_url: string }).secure_url,
    publicId: (body as { public_id: string }).public_id,
  };
}
