import type { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../supabase.js";
import { env } from "../env.js";

export interface AdminRequest extends Request {
  adminEmail?: string;
}

// Verifies the Supabase JWT (Authorization: Bearer <access_token>) and
// restricts access to emails in ADMIN_EMAILS.
export async function requireAdmin(req: AdminRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) {
    res.status(401).json({ error: "Missing access token" });
    return;
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  const email = data.user?.email?.toLowerCase();

  if (error || !email || !env.adminEmails.has(email)) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  req.adminEmail = email;
  next();
}
