import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { supabaseAdmin } from "../supabase.js";
import { env } from "../env.js";

export const publicRouter = Router();

const inquiryLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).default(""),
  company: z.string().trim().max(160).default(""),
  service: z.string().trim().max(80).default(""),
  message: z.string().trim().min(5).max(4000),
});

// Contact / quote form destination. Replaces the frontend fake submit.
publicRouter.post("/inquiries", inquiryLimiter, async (req, res) => {
  const parsed = inquirySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid form data", details: parsed.error.flatten().fieldErrors });
    return;
  }

  const { error } = await supabaseAdmin.from("inquiries").insert({
    ...parsed.data,
    status: "new",
  });

  if (error) {
    console.error("inquiry insert failed:", error.message);
    res.status(500).json({ error: "Could not save your message, please try again." });
    return;
  }

  res.status(201).json({ ok: true });
});
