import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";
import { env } from "./env.js";

// Service-role client: bypasses RLS. Server-side only — never expose the key.
export const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export { cloudinary };
