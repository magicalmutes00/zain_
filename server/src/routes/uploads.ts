import { Router } from "express";
import crypto from "node:crypto";
import { z } from "zod";
import { env } from "../env.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

export const uploadsRouter = Router();
uploadsRouter.use(requireAdmin);

const signSchema = z.object({
  folder: z.string().trim().min(1).max(120).default("zaintechoman/general"),
});

// Mints a signature for direct browser → Cloudinary uploads so the
// api_secret never leaves the server. The browser then POSTs the file to
// https://api.cloudinary.com/v1_1/<cloud_name>/image/upload with:
// api_key, timestamp, folder, signature (+ file).
uploadsRouter.post("/sign", async (req, res) => {
  const parsed = signSchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid sign request" });
    return;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const params: Record<string, string | number> = {
    timestamp,
    folder: parsed.data.folder,
  };

  const toSign =
    Object.keys(params)
      .sort()
      .map((k) => `${k}=${params[k]}`)
      .join("&") + env.CLOUDINARY_API_SECRET;
  const signature = crypto.createHash("sha1").update(toSign).digest("hex");

  res.json({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    timestamp,
    folder: parsed.data.folder,
    signature,
  });
});
