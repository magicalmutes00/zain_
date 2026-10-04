import { useEffect, useState } from "react";
import { Link, Routes, Route, NavLink, useNavigate, Navigate } from "react-router-dom";
import {
  LayoutDashboard, Briefcase, Award, Wrench, Package, HelpCircle,
  Inbox, Image as ImageIcon, LogOut, Loader2, Menu, X,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { api, apiConfigured } from "@/lib/api";
import { ResourceAdmin, type ResourceConfig } from "@/components/admin/ResourceAdmin";
import { ImageField } from "@/components/admin/ImageField";

// ---------- resource configs ----------

const PROJECTS: ResourceConfig = {
  resource: "projects",
  title: "Projects",
  singular: "Project",
  columns: [
    { key: "image_url", label: "Image" },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "status", label: "Status" },
  ],
  fields: [
    { name: "title", label: "Title", type: "text" },
    { name: "category", label: "Category", type: "select", options: ["Fire Protection", "Fire Detection", "Electrical", "CCTV", "Plumbing"] },
    { name: "status", label: "Status", type: "select", options: ["completed", "ongoing"] },
    { name: "location", label: "Location", type: "text" },
    { name: "year", label: "Year", type: "text" },
    { name: "client", label: "Client", type: "text" },
    { name: "scope", label: "Scope", type: "textarea" },
    { name: "image_url", label: "Image", type: "image", folder: "zaintechoman/projects", publicIdField: "image_public_id" },
    { name: "display_order", label: "Order", type: "number" },
    { name: "is_published", label: "Published", type: "checkbox" },
  ],
  defaults: { category: "Fire Protection", status: "completed", display_order: 0, is_published: true },
};

const CERTIFICATIONS: ResourceConfig = {
  resource: "certifications",
  title: "Certifications",
  singular: "Certificate",
  columns: [
    { key: "image_url", label: "Image" },
    { key: "title", label: "Title" },
    { key: "orientation", label: "Orientation" },
  ],
  fields: [
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "orientation", label: "Orientation", type: "select", options: ["portrait", "landscape"] },
    { name: "image_url", label: "Image", type: "image", folder: "zaintechoman/certifications", publicIdField: "image_public_id" },
    { name: "display_order", label: "Order", type: "number" },
    { name: "is_published", label: "Published", type: "checkbox" },
  ],
  defaults: { orientation: "portrait", display_order: 0, is_published: true },
};

const SERVICES: ResourceConfig = {
  resource: "services",
  title: "Services",
  singular: "Service",
  columns: [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
  ],
  fields: [
    { name: "title", label: "Title", type: "text" },
    { name: "slug", label: "Slug", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "icon", label: "Icon", type: "select", options: ["Flame", "Shield", "Zap", "Video", "Droplets"] },
    { name: "features", label: "Features", type: "lines", hint: "One feature per line" },
    { name: "display_order", label: "Order", type: "number" },
    { name: "is_published", label: "Published", type: "checkbox" },
  ],
  defaults: { icon: "Flame", features: [], display_order: 0, is_published: true },
};

const PRODUCTS: ResourceConfig = {
  resource: "products",
  title: "Products",
  singular: "Product",
  columns: [
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "brand", label: "Brand" },
  ],
  fields: [
    { name: "name", label: "Name", type: "text" },
    { name: "category", label: "Category", type: "text" },
    { name: "brand", label: "Brand", type: "text" },
    { name: "display_order", label: "Order", type: "number" },
    { name: "is_published", label: "Published", type: "checkbox" },
  ],
  defaults: { display_order: 0, is_published: true },
};

const FAQS: ResourceConfig = {
  resource: "faqs",
  title: "FAQs",
  singular: "FAQ",
  columns: [{ key: "question", label: "Question" }],
  fields: [
    { name: "question", label: "Question", type: "text" },
    { name: "answer", label: "Answer", type: "textarea" },
    { name: "display_order", label: "Order", type: "number" },
    { name: "is_published", label: "Published", type: "checkbox" },
  ],
  defaults: { display_order: 0, is_published: true },
};

// ---------- auth guard ----------

function useAdminSession() {
  const [state, setState] = useState<{ loading: boolean; email: string | null }>({
    loading: true,
    email: null,
  });

  useEffect(() => {
    if (!supabaseConfigured) {
      setState({ loading: false, email: null });
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setState({ loading: false, email: data.session?.user.email ?? null });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setState({ loading: false, email: session?.user.email ?? null });
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return state;
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { loading, email } = useAdminSession();
  if (loading) {
    return (
      <p className="flex items-center gap-2 p-10 text-[#64748B]">
        <Loader2 size={18} className="animate-spin" /> Checking session…
      </p>
    );
  }
  if (!email) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

// ---------- login ----------

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0D1B2A] px-4 pt-24">
      <form onSubmit={submit} className="w-full max-w-md bg-white dark:bg-[#144272] rounded-2xl border border-gray-100 dark:border-white/10 p-8" aria-label="Admin sign in">
        <h1 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-1">Admin Sign In</h1>
        <p className="text-sm text-[#64748B] dark:text-gray-400 mb-6">ZAIN Technical control panel</p>
        {!supabaseConfigured && (
          <p className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm">
            Supabase is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing).
          </p>
        )}
        {error && <p className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">{error}</p>}
        <label className="block mb-4">
          <span className="block text-sm font-medium mb-1">Email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A2647] dark:text-white outline-none focus:border-[#FF6B35]" />
        </label>
        <label className="block mb-6">
          <span className="block text-sm font-medium mb-1">Password</span>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A2647] dark:text-white outline-none focus:border-[#FF6B35]" />
        </label>
        <button type="submit" disabled={busy} className="w-full px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#FF8F5E] disabled:opacity-50">
          {busy ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

// ---------- layout ----------

const NAV = [
  { to: "/admin", label: "Dashboard", Icon: LayoutDashboard, end: true },
  { to: "/admin/projects", label: "Projects", Icon: Briefcase },
  { to: "/admin/certifications", label: "Certifications", Icon: Award },
  { to: "/admin/services", label: "Services", Icon: Wrench },
  { to: "/admin/products", label: "Products", Icon: Package },
  { to: "/admin/faqs", label: "FAQs", Icon: HelpCircle },
  { to: "/admin/hero", label: "Homepage Hero", Icon: ImageIcon },
  { to: "/admin/inquiries", label: "Inquiries", Icon: Inbox },
];

function AdminLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0D1B2A] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
          <div className="lg:hidden mb-4">
            <button onClick={() => setOpen(!open)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10" aria-label="Toggle admin menu">
              {open ? <X size={20} /> : <Menu size={20} />} Menu
            </button>
          </div>
          <aside className={`${open ? "block" : "hidden"} lg:block mb-6 lg:mb-0`}>
            <nav className="bg-white dark:bg-[#144272] rounded-2xl border border-gray-100 dark:border-white/10 p-3 space-y-1" aria-label="Admin">
              {NAV.map(({ to, label, Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#FF6B35]/10 text-[#FF6B35]"
                        : "text-[#0A2647] dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                    }`
                  }
                >
                  <Icon size={18} /> {label}
                </NavLink>
              ))}
              <button
                onClick={signOut}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut size={18} /> Sign out
              </button>
              <Link to="/" className="block px-4 py-2.5 text-xs text-[#64748B] hover:text-[#FF6B35]">
                ← Back to website
              </Link>
            </nav>
          </aside>
          <div className="min-w-0">
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ResourceAdmin config={PROJECTS} />} />
              <Route path="certifications" element={<ResourceAdmin config={CERTIFICATIONS} />} />
              <Route path="services" element={<ResourceAdmin config={SERVICES} />} />
              <Route path="products" element={<ResourceAdmin config={PRODUCTS} />} />
              <Route path="faqs" element={<ResourceAdmin config={FAQS} />} />
              <Route path="hero" element={<HeroAdmin />} />
              <Route path="inquiries" element={<InquiriesAdmin />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- dashboard ----------

function Dashboard() {
  const [stats, setStats] = useState<{ projects: number; unread: number } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [projects, inquiries] = await Promise.all([
          api.list("projects"),
          api.list<Record<string, unknown>>("inquiries"),
        ]);
        setStats({
          projects: projects.length,
          unread: inquiries.filter((i) => i.status === "new").length,
        });
      } catch {
        setStats({ projects: 0, unread: 0 });
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-6">Dashboard</h1>
      {!apiConfigured && (
        <p className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm">
          API not configured (VITE_API_URL missing) — data below is unavailable.
        </p>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/admin/projects" className="p-6 rounded-2xl bg-white dark:bg-[#144272] border border-gray-100 dark:border-white/10">
          <p className="text-4xl font-bold text-[#FF6B35]">{stats?.projects ?? "—"}</p>
          <p className="text-sm text-[#64748B] dark:text-gray-400 mt-1">Projects in portfolio</p>
        </Link>
        <Link to="/admin/inquiries" className="p-6 rounded-2xl bg-white dark:bg-[#144272] border border-gray-100 dark:border-white/10">
          <p className="text-4xl font-bold text-[#FF6B35]">{stats?.unread ?? "—"}</p>
          <p className="text-sm text-[#64748B] dark:text-gray-400 mt-1">Unread inquiries</p>
        </Link>
      </div>
    </div>
  );
}

// ---------- hero editor ----------

interface HeroContent {
  badge: string;
  title_a: string;
  title_b: string;
  subtitle: string;
  image: string;
  image_public_id?: string;
  stats: { value: string; label: string }[];
}

function HeroAdmin() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api
      .list<{ key: string; value: HeroContent }>("site_content")
      .then((rows) => {
        const row = rows.find((r) => r.key === "hero");
        if (row) setHero(row.value);
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    if (!hero) return;
    setSaving(true);
    try {
      await api.upsertSiteContent("hero", hero);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-[#64748B]">Loading…</p>;
  if (!hero) return <p className="text-[#64748B]">No hero content found. Seed the database first.</p>;

  const setStat = (i: number, field: "value" | "label", v: string) =>
    setHero({ ...hero, stats: hero.stats.map((s, j) => (j === i ? { ...s, [field]: v } : s)) });

  const inputCls =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#144272] dark:text-white outline-none focus:border-[#FF6B35]";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0A2647] dark:text-white">Homepage Hero</h1>
        <button onClick={save} disabled={saving} className="px-5 py-2.5 rounded-lg bg-[#FF6B35] text-white font-semibold hover:bg-[#FF8F5E] disabled:opacity-50">
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
      {saved && <p className="mb-4 p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm">Saved.</p>}
      <div className="space-y-4 max-w-2xl">
        <label className="block">
          <span className="block text-sm font-medium mb-1">Badge line</span>
          <input value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} className={inputCls} />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-1">Title (first part)</span>
          <input value={hero.title_a} onChange={(e) => setHero({ ...hero, title_a: e.target.value })} className={inputCls} />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-1">Title (highlighted part)</span>
          <input value={hero.title_b} onChange={(e) => setHero({ ...hero, title_b: e.target.value })} className={inputCls} />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-1">Subtitle</span>
          <textarea value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} rows={4} className={`${inputCls} resize-y`} />
        </label>
        <div>
          <span className="block text-sm font-medium mb-1">Background image</span>
          <ImageField
            value={hero.image}
            folder="zaintechoman/hero"
            onChange={(url, publicId) => setHero({ ...hero, image: url, image_public_id: publicId })}
            onClear={() => setHero({ ...hero, image: "", image_public_id: "" })}
          />
        </div>
        <div>
          <span className="block text-sm font-medium mb-1">Stats (value | label)</span>
          <div className="space-y-2">
            {hero.stats.map((s, i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <input value={s.value} onChange={(e) => setStat(i, "value", e.target.value)} className={inputCls} aria-label={`Stat ${i + 1} value`} />
                <input value={s.label} onChange={(e) => setStat(i, "label", e.target.value)} className={inputCls} aria-label={`Stat ${i + 1} label`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- inquiries inbox ----------

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  status: string;
  notes: string;
  created_at: string;
};

function InquiriesAdmin() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState("new");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .list<Inquiry>("inquiries")
      .then(setItems)
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  const setStatus = async (id: string, status: string) => {
    try {
      const updated = await api.update<Inquiry>("inquiries", id, { status });
      setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Update failed");
    }
  };

  const visible = filter === "all" ? items : items.filter((i) => i.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0A2647] dark:text-white">Inquiries</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#144272] dark:text-white"
          aria-label="Filter by status"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
          <option value="all">All</option>
        </select>
      </div>
      {loading && <p className="text-[#64748B]">Loading…</p>}
      <div className="space-y-4">
        {visible.map((q) => (
          <div key={q.id} className="p-5 rounded-2xl bg-white dark:bg-[#144272] border border-gray-100 dark:border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <p className="font-semibold text-[#0A2647] dark:text-white">
                {q.name} <span className="font-normal text-sm text-[#64748B]">· {q.service || "General"}</span>
              </p>
              <select
                value={q.status}
                onChange={(e) => setStatus(q.id, e.target.value)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-white/10"
                aria-label={`Status for inquiry from ${q.name}`}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <p className="text-sm text-[#64748B] dark:text-gray-400">
              <a href={`mailto:${q.email}`} className="hover:text-[#FF6B35]">{q.email}</a>
              {q.phone && <> · <a href={`tel:${q.phone}`} className="hover:text-[#FF6B35]">{q.phone}</a></>}
              {q.company && <> · {q.company}</>}
              {" · "}
              {new Date(q.created_at).toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-[#0A2647] dark:text-white whitespace-pre-wrap">{q.message}</p>
          </div>
        ))}
        {!loading && visible.length === 0 && <p className="text-[#64748B]">No inquiries with this status.</p>}
      </div>
    </div>
  );
}

// ---------- root ----------

export default function Admin() {
  return (
    <>
      <SEO title="Admin | ZAIN Technical" description="ZAIN Technical administration panel." />
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          path="*"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        />
      </Routes>
    </>
  );
}
