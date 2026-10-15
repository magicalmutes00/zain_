import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  PROJECTS,
  type ProjectCategory,
  type ProjectStatus,
} from "../data/content";
import { Reveal, SectionHeading } from "../components/Reveal";
import { CtaBand } from "../components/CtaBand";

export function Projects() {
  const [status, setStatus] = useState<ProjectStatus>("Completed");
  const [category, setCategory] = useState<"All" | ProjectCategory>("All");

  const visible = useMemo(
    () =>
      PROJECTS.filter(
        (p) => p.status === status && (category === "All" || p.category === category)
      ),
    [status, category]
  );

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span>{" "}
            <span aria-current="page">Projects</span>
          </nav>
          <span className="eyebrow">Projects</span>
          <h1>Project scopes ZAIN delivers across Oman.</h1>
          <p className="lead" style={{ maxWidth: "54rem" }}>
            Representative fire protection, fire detection, electrical and CCTV &amp; ELV scopes for
            commercial, industrial, government and residential facilities. Facility types are shown
            instead of client names.
          </p>
        </div>
      </div>

      <section className="section" aria-label="Project scopes">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="By discipline"
              title="Browse project scopes by discipline and delivery status."
            />
          </Reveal>

          <Reveal>
            <div className="proj-tabs" role="group" aria-label="Filter by status">
              {PROJECT_STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="proj-tab"
                  aria-pressed={status === s}
                  onClick={() => setStatus(s)}
                >
                  {s}
                  <span className="proj-tab-count">
                    {PROJECTS.filter((p) => p.status === s).length}
                  </span>
                </button>
              ))}
            </div>

            <div className="proj-filters" role="group" aria-label="Filter by discipline">
              {PROJECT_CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="chip"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <p className="proj-results" role="status" aria-live="polite">
            Showing {visible.length} {status.toLowerCase()} project scope
            {visible.length === 1 ? "" : "s"}
            {category === "All" ? "" : ` in ${category}`}.
          </p>

          {visible.length === 0 ? (
            <p className="proj-empty">
              No {status.toLowerCase()}
              {category === "All" ? "" : ` ${category}`} project scopes are listed. Choose another
              discipline or status.
            </p>
          ) : null}

          <div className="proj-grid">
            {visible.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 70}>
                <article className="proj-card">
                  <div className="proj-media">
                    <img
                      src={p.image}
                      alt={`${p.facility} — ${p.category} installation works`}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="proj-badges">
                      <span className="proj-badge cat">{p.category}</span>
                      <span className={`proj-badge ${p.status === "Completed" ? "done" : "live"}`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                  <div className="proj-body">
                    <h3>{p.title}</h3>
                    <dl className="proj-meta">
                      <div>
                        <dt>Facility</dt>
                        <dd>{p.facility}</dd>
                      </div>
                      <div>
                        <dt>Location</dt>
                        <dd>{p.location}</dd>
                      </div>
                      <div>
                        <dt>Status</dt>
                        <dd>
                          {p.status} · {p.year}
                        </dd>
                      </div>
                    </dl>
                    <p className="proj-scope">{p.scope}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="form-note" style={{ marginTop: "1.6rem", maxWidth: "52rem" }}>
            These entries describe representative project scopes across ZAIN&rsquo;s divisions.
            Specific client names are not published here.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
