import { Router } from "express";
import { z } from "zod";
import { supabaseAdmin, cloudinary } from "../supabase.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

export const adminRouter = Router();
adminRouter.use(requireAdmin);

// Tables exposed through the generic CRUD below. inquiries is read +
// status-only (created via the public endpoint); site_content is keyed.
interface ResourceDef {
  table: string;
  required: string[];
  readOnly?: boolean;
}

const RESOURCES: Record<string, ResourceDef> = {
  projects: { table: "projects", required: ["title"] },
  certifications: { table: "certifications", required: ["title"] },
  services: { table: "services", required: ["slug", "title"] },
  products: { table: "products", required: ["name"] },
  faqs: { table: "faqs", required: ["question", "answer"] },
  inquiries: { table: "inquiries", required: [], readOnly: true },
  site_content: { table: "site_content", required: ["key", "value"] },
};

type ResourceName = keyof typeof RESOURCES;

function isResource(name: string): name is ResourceName {
  return name in RESOURCES;
}

const idParam = z.object({ id: z.string().uuid() });

// GET /api/admin/:resource — list newest first (display_order, then created)
adminRouter.get("/:resource", async (req, res) => {
  const { resource } = req.params;
  if (!isResource(resource)) {
    res.status(404).json({ error: "Unknown resource" });
    return;
  }

  const { table } = RESOURCES[resource];
  let query = supabaseAdmin.from(table).select("*");
  query = resource === "site_content"
    ? query.order("key")
    : query.order("display_order").order("created_at", { ascending: false });

  const { data, error } = await query;
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json({ items: data });
});

// POST /api/admin/:resource — create (validates required fields)
adminRouter.post("/:resource", async (req, res) => {
  const { resource } = req.params;
  if (!isResource(resource) || RESOURCES[resource].readOnly) {
    res.status(404).json({ error: "Unknown resource" });
    return;
  }

  const def = RESOURCES[resource];
  const body = (req.body ?? {}) as Record<string, unknown>;
  const missing = def.required.filter((k) => body[k] === undefined || body[k] === "");
  if (missing.length > 0) {
    res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });
    return;
  }

  const { data, error } = await supabaseAdmin.from(def.table).insert(body).select().single();
  if (error) {
    const status = error.code === "23505" ? 409 : 500;
    res.status(status).json({ error: error.message });
    return;
  }
  res.status(201).json({ item: data });
});

// PATCH /api/admin/:resource/:id — partial update
adminRouter.patch("/:resource/:id", async (req, res) => {
  const { resource } = req.params;
  if (!isResource(resource)) {
    res.status(404).json({ error: "Unknown resource" });
    return;
  }

  const idCheck = idParam.safeParse(req.params);
  if (!idCheck.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const { data, error } = await supabaseAdmin
    .from(RESOURCES[resource].table)
    .update(req.body ?? {})
    .eq("id", idCheck.data.id)
    .select()
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json({ item: data });
});

// DELETE /api/admin/:resource/:id — delete row + Cloudinary asset if present
adminRouter.delete("/:resource/:id", async (req, res) => {
  const { resource } = req.params;
  if (!isResource(resource) || RESOURCES[resource].readOnly) {
    res.status(404).json({ error: "Unknown resource" });
    return;
  }

  const idCheck = idParam.safeParse(req.params);
  if (!idCheck.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const { data: row } = await supabaseAdmin
    .from(RESOURCES[resource].table)
    .select("image_public_id")
    .eq("id", idCheck.data.id)
    .single();

  const { error } = await supabaseAdmin
    .from(RESOURCES[resource].table)
    .delete()
    .eq("id", idCheck.data.id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const publicId = (row as { image_public_id?: string } | null)?.image_public_id;
  if (publicId) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (e) {
      console.warn("cloudinary destroy failed (row deleted):", (e as Error).message);
    }
  }

  res.json({ ok: true });
});

// PUT /api/admin/site_content/:key — upsert singleton (hero, brands, …)
adminRouter.put("/site_content/:key", async (req, res) => {
  const { key } = req.params;
  if (!key) {
    res.status(400).json({ error: "Missing key" });
    return;
  }
  const { data, error } = await supabaseAdmin
    .from("site_content")
    .upsert({ key, value: req.body?.value ?? {} }, { onConflict: "key" })
    .select()
    .single();
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json({ item: data });
});
