import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X, Inbox } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import { ImageField } from "./ImageField";

export type FieldType = "text" | "textarea" | "select" | "number" | "checkbox" | "image" | "lines";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  folder?: string;
  /** for image fields: sibling field that receives the Cloudinary public_id */
  publicIdField?: string;
  /** for lines fields: join/split character display hint */
  hint?: string;
}

export interface ResourceConfig {
  resource: string;
  title: string;
  singular: string;
  columns: { key: string; label: string }[];
  fields: FieldDef[];
  defaults: Record<string, unknown>;
}

type Row = Record<string, unknown>;

const str = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));

export function ResourceAdmin({ config }: { config: ResourceConfig }) {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await api.list<Row>(config.resource));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.resource]);

  const openNew = () => setEditing({ ...config.defaults });
  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await api.remove(config.resource, pendingDelete);
      setItems((prev) => prev.filter((r) => r.id !== pendingDelete));
      toast(`${config.singular} deleted`, "success");
      setPendingDelete(null);
    } catch (e) {
      toast(e instanceof Error ? e.message : "Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        const updated = await api.update<Row>(config.resource, str(editing.id), editing);
        setItems((prev) => prev.map((r) => (r.id === editing.id ? updated : r)));
      } else {
        const created = await api.create<Row>(config.resource, editing);
        setItems((prev) => [created, ...prev]);
      }
      setEditing(null);
      toast(`${config.singular} saved`, "success");
    } catch (e) {
      toast(e instanceof Error ? e.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const set = (name: string, value: unknown) =>
    setEditing((prev) => (prev ? { ...prev, [name]: value } : prev));

  const togglePublished = async (row: Row) => {
    try {
      const updated = await api.update<Row>(config.resource, str(row.id), {
        is_published: !row.is_published,
      });
      setItems((prev) => prev.map((r) => (r.id === row.id ? updated : r)));
    } catch (e) {
      toast(e instanceof Error ? e.message : "Update failed", "error");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy dark:text-white">{config.title}</h1>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg font-medium hover:bg-brand-soft"
        >
          <Plus size={18} /> New {config.singular}
        </button>
      </div>

      {loading && (
        <div className="space-y-3" aria-label="Loading">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-14 w-full" />
          ))}
        </div>
      )}
      {error && <p className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-navy-deep">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#64748B] dark:text-gray-400 border-b border-gray-100 dark:border-white/10">
                {config.columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-medium">{c.label}</th>
                ))}
                <th className="px-4 py-3 font-medium">Published</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={str(row.id)} className="border-b border-gray-50 dark:border-white/5 last:border-0">
                  {config.columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 text-navy dark:text-white max-w-xs truncate">
                      {c.key === "image_url" && row.image_url ? (
                        <img src={str(row.image_url)} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        str(row[c.key]).slice(0, 80)
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    {"is_published" in row && (
                      <button
                        onClick={() => togglePublished(row)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          row.is_published
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {row.is_published ? "Live" : "Hidden"}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditing({ ...row })}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
                        aria-label="Edit"
                      >
                        <Pencil size={16} className="text-navy dark:text-white" />
                      </button>
                      <button
                        onClick={() => setPendingDelete(str(row.id))}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={config.columns.length + 2} className="px-4 py-10 text-center">
                    <Inbox size={28} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" aria-hidden="true" />
                    <p className="text-[#64748B] dark:text-gray-400">
                      No {config.title.toLowerCase()} yet — click “New {config.singular}”.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-navy rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={`${editing.id ? "Edit" : "New"} ${config.singular}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy dark:text-white">
                {editing.id ? "Edit" : "New"} {config.singular}
              </h2>
              <button onClick={() => setEditing(null)} aria-label="Close" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {config.fields.map((f) => (
                <label key={f.name} className="block">
                  <span className="block text-sm font-medium text-navy dark:text-white mb-1">{f.label}</span>
                  {f.type === "text" && (
                    <input
                      value={str(editing[f.name])}
                      onChange={(e) => set(f.name, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-deep dark:text-white outline-none focus:border-brand"
                    />
                  )}
                  {f.type === "number" && (
                    <input
                      type="number"
                      value={Number(editing[f.name] ?? 0)}
                      onChange={(e) => set(f.name, Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-deep dark:text-white outline-none focus:border-brand"
                    />
                  )}
                  {f.type === "textarea" && (
                    <textarea
                      value={str(editing[f.name])}
                      onChange={(e) => set(f.name, e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-deep dark:text-white outline-none focus:border-brand resize-y"
                    />
                  )}
                  {f.type === "select" && (
                    <select
                      value={str(editing[f.name])}
                      onChange={(e) => set(f.name, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-deep dark:text-white outline-none focus:border-brand"
                    >
                      {(f.options ?? []).map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  )}
                  {f.type === "checkbox" && (
                    <input
                      type="checkbox"
                      checked={Boolean(editing[f.name])}
                      onChange={(e) => set(f.name, e.target.checked)}
                      className="w-5 h-5 accent-brand"
                    />
                  )}
                  {f.type === "lines" && (
                    <>
                      <textarea
                        value={Array.isArray(editing[f.name]) ? (editing[f.name] as string[]).join("\n") : str(editing[f.name])}
                        onChange={(e) =>
                          set(f.name, e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))
                        }
                        rows={5}
                        placeholder="One item per line"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-deep dark:text-white outline-none focus:border-brand resize-y"
                      />
                      {f.hint && <span className="text-xs text-[#64748B]">{f.hint}</span>}
                    </>
                  )}
                  {f.type === "image" && (
                    <ImageField
                      value={str(editing[f.name])}
                      folder={f.folder ?? "zaintechoman/general"}
                      onChange={(url, publicId) => {
                        set(f.name, url);
                        if (f.publicIdField) set(f.publicIdField, publicId);
                      }}
                      onClear={() => {
                        set(f.name, "");
                        if (f.publicIdField) set(f.publicIdField, "");
                      }}
                    />
                  )}
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditing(null)}
                className="px-5 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="px-5 py-2.5 rounded-lg bg-brand text-white font-semibold hover:bg-brand-soft disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {pendingDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setPendingDelete(null)}>
          <div
            className="w-full max-w-sm bg-white dark:bg-navy rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
            aria-label={`Delete ${config.singular}`}
          >
            <h2 className="text-lg font-bold text-navy dark:text-white mb-2">Delete {config.singular}?</h2>
            <p className="text-sm text-[#64748B] dark:text-gray-400 mb-6">
              This cannot be undone. The item and its uploaded image will be removed.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPendingDelete(null)}
                className="px-5 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
