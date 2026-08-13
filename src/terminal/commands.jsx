/* ============================================================================
   Command engine + registry.
   Each command is { desc, run(args, ctx) -> ReactNode }. Commands render
   semantic JSX output; side effects go through ctx (run/clear/setTheme/windows).
   Adding a command later = one entry in COMMANDS.
   ========================================================================== */

import React from "react";
import {
  identity,
  stats,
  manifesto,
  about,
  skills,
  projects,
  experience,
  education,
  achievements,
  learning,
  contact,
  social,
} from "./content.js";
import { artFor } from "./art.js";
import { LeetCodePanel, GitHubPanel } from "./panels.jsx";
import { useReveal } from "./useReveal.js";
import { logEvent } from "../lib/visitorLog.js";

/* ---- ASCII ---------------------------------------------------------------- */
const BANNER = String.raw`
 █████╗ ██╗   ██╗██╗   ██╗███████╗██╗  ██╗
██╔══██╗╚██╗ ██╔╝██║   ██║██╔════╝██║  ██║
███████║ ╚████╔╝ ██║   ██║███████╗███████║
██╔══██║  ╚██╔╝  ██║   ██║╚════██║██╔══██║
██║  ██║   ██║   ╚██████╔╝███████║██║  ██║
╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝╚═╝  ╚═╝`;

const NEO_LOGO = String.raw`
   ╔═══════════╗
   ║  ●  ●  ●  ║
   ╟───────────╢
   ║  >_ ayush ║
   ║  ███████  ║
   ║  ██   ██  ║
   ╚═══════════╝`;

/* ---- small building blocks ----------------------------------------------- */
const Hr = () => <div className="t-hr" aria-hidden="true" />;
const Sp = () => <div className="t-spacer" aria-hidden="true" />;
const Eyebrow = ({ children }) => <div className="t-eyebrow">{children}</div>;
const Heading = ({ children }) => <div className="t-heading">{children}</div>;
const Feat = ({ mark = "▸", tone = "t-arrow", children }) => (
  <div className="t-feat">
    <span className={tone}>{mark}</span>
    <span>{children}</span>
  </div>
);
const Tags = ({ items }) => (
  <div className="t-tags">
    {items.map((t, i) => (
      <span className="t-tag" key={i}>
        {t}
      </span>
    ))}
  </div>
);
const Ext = ({ href, children }) => (
  <a className="t-link" href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);
const Btn = ({ href, children, track }) => (
  <a
    className="t-btn"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={track ? () => logEvent(track) : undefined}
  >
    {children}
  </a>
);
// clickable in-terminal command
const Run = ({ ctx, cmd, children }) => (
  <span
    className="t-run"
    role="button"
    tabIndex={0}
    onClick={() => ctx.run(cmd)}
    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && ctx.run(cmd)}
  >
    {children || cmd}
  </span>
);
// terminal-window header strip: traffic dots + file path (+ optional right slot)
const WinHead = ({ path, right }) => (
  <div className="t-winhead">
    <span className="dots" aria-hidden="true"><i /><i /><i /></span>
    <span className="path">{path}</span>
    {right != null && <span className="idx">{right}</span>}
  </div>
);

/* ---- lookups -------------------------------------------------------------- */
export const THEMES = ["dark", "matrix", "amber", "light", "mono"];
export const SECTION_CMDS = [
  "about", "projects", "skills", "experience", "education",
  "achievements", "learning", "contact", "social",
];
export const findProject = (arg) => {
  if (!arg) return null;
  const q = String(arg).toLowerCase();
  return (
    projects.find((p) => p.slug === q) ||
    projects.find((p) => (p.aliases || []).includes(q)) ||
    projects.find((p) => p.name.toLowerCase() === q) ||
    projects.find((p) => p.slug.startsWith(q)) ||
    null
  );
};

/* ---- welcome (boot end / home) ------------------------------------------- */
export function Welcome({ ctx }) {
  return (
    <div className="t-welcome">
      <pre className="term-ascii" aria-label="AYUSH">{BANNER}</pre>
      <div>
        <span className="c-bold c-text">AYUSH SRIVASTAV</span>
        <span className="c-muted"> — {identity.discipline}</span>
      </div>
      <div className="c-muted t-block" style={{ maxWidth: "64ch" }}>
        I build production backends, real-time systems and on-prem AI. From
        schema to CI/CD, I own the whole stack.
      </div>
      <div className="t-block">
        <span className="c-muted">Type </span>
        <Run ctx={ctx} cmd="help">
          <span className="c-green">help</span>
        </Run>
        <span className="c-muted"> to see commands. Try{" "}</span>
        <Run ctx={ctx} cmd="about"><span className="c-cyan">about</span></Run>
        <span className="c-muted"> · </span>
        <Run ctx={ctx} cmd="projects"><span className="c-cyan">projects</span></Run>
        <span className="c-muted"> · </span>
        <Run ctx={ctx} cmd="skills"><span className="c-cyan">skills</span></Run>
        <span className="c-muted"> · </span>
        <Run ctx={ctx} cmd="contact"><span className="c-cyan">contact</span></Run>
      </div>
    </div>
  );
}

/* ---- experience: a card deck (like projects), reveals on scroll ----------- */
function ExperienceDeck({ ctx }) {
  const ref = useReveal();
  return (
    <div>
      <div className="t-pdeck" ref={ref}>
        {experience.map((job, i) => {
          const current = /present|current/i.test(job.period);
          const extra = Math.max(0, job.tech.length - 5);
          const open = () => ctx?.openTerminal?.({ type: "experience", itemId: String(i) });
          return (
            <div
              className="t-pcard t-reveal"
              data-reveal=""
              style={{ transitionDelay: `${Math.min(i, 5) * 55}ms` }}
              key={i}
              onClick={open}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open())
              }
            >
              <div className="t-pcard-head">
                <span className="t-pcard-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="t-pcard-name">{job.role}</span>
                {current && <span className="t-pcard-status c-green">current</span>}
              </div>
              <div className="t-pcard-meta">
                <span className="c-accent">{job.company}</span>
                {job.location && <span className="c-muted"> · {job.location}</span>}
              </div>
              <div className="c-muted t-pcard-tag">{job.period}</div>
              <div className="t-pcard-tech">
                {job.tech.slice(0, 5).map((t) => (
                  <span className="t-tag" key={t}>{t}</span>
                ))}
                {extra > 0 && <span className="t-tag more">+{extra}</span>}
              </div>
              <div className="t-pcard-open">
                <span className="c-green">open</span>
                <span className="c-muted"> ·&nbsp;</span>
                <span className="c-dim c-muted">detail window</span>
                <span className="t-pcard-arrow c-accent">↗</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---- projects: redesigned card deck (grid), reveals on scroll ------------- */
function ProjectDeck({ ctx }) {
  const ref = useReveal();
  const shortStatus = (s) => String(s || "").split("·").pop().trim();
  return (
    <div>
      <div className="t-pdeck" ref={ref}>
        {projects.map((p, i) => {
          const extra = Math.max(0, p.tech.length - 5);
          return (
            <div
              className="t-pcard t-reveal"
              data-reveal=""
              style={{ transitionDelay: `${Math.min(i, 5) * 55}ms` }}
              key={p.slug}
              onClick={() => ctx.openTerminal?.({ type: "project", itemId: p.slug })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                (e.preventDefault(), ctx.openTerminal?.({ type: "project", itemId: p.slug }))
              }
            >
              <div className="t-pcard-head">
                <span className="t-pcard-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="t-pcard-name">{p.name}</span>
                <span className="t-pcard-status">{shortStatus(p.status)}</span>
              </div>
              <div className="t-pcard-meta">
                <span className="c-accent">{p.year}</span>
                <span className="c-muted"> · {p.category}</span>
              </div>
              <div className="c-muted t-pcard-tag">{p.tagline}</div>
              <div className="t-pcard-tech">
                {p.tech.slice(0, 5).map((t) => (
                  <span className="t-tag" key={t}>{t}</span>
                ))}
                {extra > 0 && <span className="t-tag more">+{extra}</span>}
              </div>
              <div className="t-pcard-open">
                <span className="c-green">open</span>
                <span className="c-muted"> ·&nbsp;</span>
                <span className="c-dim c-muted">detail window</span>
                <span className="t-pcard-arrow c-accent">↗</span>
              </div>
            </div>
          );
        })}
      </div>
      <Sp />
      <div className="c-muted c-dim">
        Open one → <span className="c-green">project 1</span>
        <span className="c-muted"> … </span>
        <span className="c-green">project {projects.length}</span>
        <span className="c-muted">  or  </span>
        <span className="c-green">project &lt;name&gt;</span>
      </div>
    </div>
  );
}

/* ---- detail-window content (rendered inside a draggable TerminalWindow) ---- */
// Short, terminal-flavoured title shown in a window's header.
export function terminalWindowTitle(type, itemId) {
  if (type === "project") {
    const p = projects.find((x) => x.slug === itemId);
    return p ? `~/projects/${p.slug}` : "project";
  }
  const job = experience[Number(itemId)];
  const slug = job
    ? job.company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : "role";
  return `~/experience/${slug}`;
}

// Project details, presented command-style. Reuses the existing content model —
// only fields that actually exist are shown; nothing is invented.
export function ProjectTerminalContent({ slug }) {
  const p = findProject(slug);
  if (!p) return <div className="c-red">cat: {slug}: no such project</div>;
  const links = p.links || {};
  return (
    <div className="tw-doc">
      <div className="tw-cmd">
        <span className="c-green">$</span> open project <span className="c-yellow">&quot;{p.name}&quot;</span>
      </div>
      <div className="tw-boot c-muted c-dim">&gt; loading project…</div>
      <div className="c-bold c-green-b" style={{ fontSize: "1.05em" }}>{p.name}</div>
      <div className="c-accent">
        {p.year} · {p.category}
        <span className="c-muted"> · {p.status}</span>
      </div>
      <Hr />
      <div className="c-accent c-bold">DESCRIPTION</div>
      <p className="c-text t-block">{p.description}</p>
      {p.features?.length > 0 && (
        <>
          <div className="c-accent c-bold t-mt">FEATURES</div>
          {p.features.map((f, i) => <Feat key={i}>{f}</Feat>)}
        </>
      )}
      <div className="c-accent c-bold t-mt">TECHNOLOGIES</div>
      <Tags items={p.tech} />
      {links.github || links.demo ? (
        <>
          <div className="c-accent c-bold t-mt">LINKS</div>
          <div className="t-projlinks">
            {links.github && <Btn href={links.github}>GitHub ↗</Btn>}
            {links.demo && <Btn href={links.demo}>Live Demo ↗</Btn>}
          </div>
        </>
      ) : (
        <div className="c-muted c-dim t-mt">
          Source available on request · <Ext href={social[0].url}>github.com/Ayush30s ↗</Ext>
        </div>
      )}
    </div>
  );
}

// Experience details, presented command-style, keyed by the array index so no
// data is duplicated into window state.
export function ExperienceTerminalContent({ index }) {
  const job = experience[Number(index)];
  if (!job) return <div className="c-red">no such experience: {String(index)}</div>;
  return (
    <div className="tw-doc tw-doc-wide">
      <div className="tw-cmd">
        <span className="c-green">$</span> open experience <span className="c-yellow">&quot;{job.role}&quot;</span>
      </div>
      <div className="tw-boot c-muted c-dim">&gt; loading experience…</div>
      <div className="tw-exp-grid">
        <div className="tw-exp-main">
          <div className="c-accent c-bold">COMPANY</div>
          <div className="c-text c-bold">
            {job.company}
            {job.location && <span className="c-muted"> · {job.location}</span>}
          </div>
          <div className="c-accent c-bold t-mt">ROLE</div>
          <div className="c-text">{job.role}</div>
          <div className="c-accent c-bold t-mt">DURATION</div>
          <div className="c-green">{job.period}</div>
          <div className="c-accent c-bold t-mt">TECHNOLOGIES</div>
          <Tags items={job.tech} />
        </div>
        <div className="tw-exp-side">
          {job.bullets?.length > 0 && (
            <>
              <div className="c-accent c-bold">RESPONSIBILITIES</div>
              {job.bullets.map((b, i) => <Feat key={i}>{b}</Feat>)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---- command registry ----------------------------------------------------- */
export const COMMANDS = {
  help: {
    desc: "List available commands",
    run: (_a, ctx) => {
      const rows = [
        ["about", "Who I am & how I work"],
        ["whoami", "Identity at a glance"],
        ["skills", "Technical stack"],
        ["projects", "Browse my work"],
        ["project <n>", "Open a project in detail"],
        ["experience", "Work history"],
        ["education", "Academic background"],
        ["achievements", "Milestones & ratings"],
        ["resume", "View / download résumé"],
        ["contact", "Get in touch"],
        ["social", "Profiles & coding sites"],
        ["status", "System status"],
        ["theme <name>", "Change color theme"],
        ["exit", "Close the top detail window"],
        ["clear", "Clear the terminal"],
        ["home", "Return to the welcome screen"],
      ];
      return (
        <div>
          <div className="t-cmds">
            {rows.map(([c, d]) => (
              <React.Fragment key={c}>
                <Run ctx={ctx} cmd={c.split(" ")[0]}>
                  <span className="cmd">{c}</span>
                </Run>
                <span className="desc">{d}</span>
              </React.Fragment>
            ))}
          </div>
          <Sp />
          <div className="c-muted c-dim">
            More: <Run ctx={ctx} cmd="neofetch"><span className="c-purple">neofetch</span></Run>
            {" · "}<Run ctx={ctx} cmd="leetcode"><span className="c-purple">leetcode</span></Run>
            {" · "}<Run ctx={ctx} cmd="github"><span className="c-purple">github</span></Run>
            {" · "}<Run ctx={ctx} cmd="manifesto"><span className="c-purple">manifesto</span></Run>
            {" · "}ls · pwd · cd · date · echo · history · sudo
          </div>
          <Sp />
          <Heading>Navigation</Heading>
          <Hr />
          <div className="t-cmds">
            <span className="cmd">↑ / ↓</span><span className="desc">Command history</span>
            <span className="cmd">Tab</span><span className="desc">Autocomplete</span>
            <span className="cmd">Ctrl + L</span><span className="desc">Clear terminal</span>
            <span className="cmd">Ctrl + C</span><span className="desc">Cancel current line</span>
            <span className="cmd">click</span><span className="desc">Any command, chip or link is clickable</span>
          </div>
        </div>
      );
    },
  },

  whoami: {
    desc: "Identity at a glance",
    run: () => (
      <div>
        <div className="c-bold c-green-b" style={{ fontSize: "1.15em", letterSpacing: ".04em" }}>
          {identity.name}
        </div>
        <div className="t-block">
          {identity.roles.map((r, i) => (
            <div key={i} className="c-text">{r}</div>
          ))}
        </div>
        <div className="c-muted t-block" style={{ maxWidth: "62ch" }}>{identity.tagline}</div>
        <div className="t-mt t-kv">
          <span className="k">Location</span><span className="v">{identity.location}</span>
          <span className="k">Status</span>
          <span className="v"><span className="t-pill"><span className="pulse" />{identity.status}</span></span>
        </div>
      </div>
    ),
  },

  about: {
    desc: "Who I am & how I work",
    run: (_a, ctx) => (
      <div>
        <div className="t-box t-box-accent">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="c-text t-block" style={{ maxWidth: "72ch" }}>{p}</p>
          ))}
          <Sp />
          <div className="c-accent c-bold">Currently focused on</div>
          {about.focus.map((f, i) => <Feat key={i}>{f}</Feat>)}
          <Sp />
          <div className="c-accent c-bold">How I work</div>
          {about.values.map((v, i) => (
            <div key={i} className="t-block">
              <span className="t-bullet">◆ </span>
              <span className="c-text c-bold">{v.title}</span>
              <span className="c-muted"> — {v.desc}</span>
            </div>
          ))}
        </div>
        <div className="c-muted c-dim t-mt">
          → Next: <Run ctx={ctx} cmd="experience"><span className="c-cyan">experience</span></Run>
          {" · "}<Run ctx={ctx} cmd="projects"><span className="c-cyan">projects</span></Run>
        </div>
      </div>
    ),
  },

  skills: {
    desc: "Technical stack",
    run: () => (
      <div>
        <div className="t-stack">
          {skills.categories.map((c) => (
            <React.Fragment key={c.name}>
              <div className="cat">
                <span className="c-accent c-bold">{c.name}</span>
                <span className="c-muted c-dim"> ({c.items.length})</span>
              </div>
              <div className="items">
                {c.items.map((it, i) => (
                  <React.Fragment key={it}>
                    {i > 0 && <span className="c-muted"> · </span>}
                    <span className="c-text">{it}</span>
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
        <Sp />
        <div className="c-muted c-dim">{skills.note}</div>
      </div>
    ),
  },

  projects: {
    desc: "Browse my work",
    run: (_a, ctx) => <ProjectDeck ctx={ctx} />,
  },

  project: {
    desc: "Open a project — project <name|number>",
    hidden: true,
    run: (args, ctx) => {
      const p = findProject(args[0]);
      if (!args[0]) {
        return (
          <div className="c-yellow">
            Usage: <span className="c-green">project &lt;name|number&gt;</span>
            <div className="c-muted c-dim">e.g. <span className="c-green">project 1</span> or <span className="c-green">project chat</span>. Run <Run ctx={ctx} cmd="projects"><span className="c-cyan">projects</span></Run> for the list.</div>
          </div>
        );
      }
      if (!p) {
        return (
          <div>
            <div className="c-red">Project not found: {args.join(" ")}</div>
            <div className="c-muted">Type <Run ctx={ctx} cmd="projects"><span className="c-cyan">projects</span></Run> to see available projects.</div>
          </div>
        );
      }
      const links = p.links || {};
      return (
        <div className="t-card t-card-detail">
          <WinHead path={`~/projects/${p.slug}`} right={<span className="c-muted">{p.year}</span>} />
          <div className="t-artstrip">
            <pre className="t-artimg" aria-hidden="true">{artFor(p.slug)}</pre>
          </div>
          <div className="t-card-body">
            <div className="t-projhead">
              <span className="c-bold c-green-b" style={{ fontSize: "1.1em" }}>{p.name}</span>
              <span className="t-pill"><span className="pulse" />{p.status}</span>
            </div>
            <div className="c-accent">{p.year} · {p.category}</div>
            <div className="c-muted" style={{ marginTop: 2 }}>{p.tagline}</div>
            <Hr />
            <p className="c-text" style={{ maxWidth: "72ch" }}>{p.description}</p>
            {p.features?.length > 0 && (
              <>
                <div className="c-accent c-bold t-mt">Key features</div>
                {p.features.map((f, i) => <Feat key={i}>{f}</Feat>)}
              </>
            )}
            <div className="c-accent c-bold t-mt">Tech</div>
            <Tags items={p.tech} />
            {(links.github || links.demo) && (
              <div className="t-projlinks">
                {links.github && <Btn href={links.github}>GitHub ↗</Btn>}
                {links.demo && <Btn href={links.demo}>Live Demo ↗</Btn>}
              </div>
            )}
            {!links.github && !links.demo && (
              <div className="c-muted c-dim t-mt">Source available on request · <Ext href={social[0].url}>github.com/Ayush30s ↗</Ext></div>
            )}
          </div>
        </div>
      );
    },
  },

  experience: {
    desc: "Work history",
    run: (_a, ctx) => <ExperienceDeck ctx={ctx} />,
  },

  education: {
    desc: "Academic background",
    run: () => (
      <div>
        {education.map((e, i) => (
          <div key={i}>
            <div className="c-text c-bold">{e.degree}</div>
            <div className="c-muted">{e.institution}</div>
            <div className="t-block">
              <span className="c-accent">{e.period}</span>
              <span className="c-muted"> · </span>
              <span className="c-green">{e.score}</span>
            </div>
            {e.coursework?.length > 0 && (
              <>
                <div className="c-accent c-bold t-mt">Relevant coursework</div>
                {e.coursework.map((c, j) => (
                  <div key={j} className="t-block">
                    <span className="t-bullet">▸ </span>
                    <span className="c-text c-bold">{c.name}</span>
                    <span className="c-muted"> — {c.desc}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    ),
  },

  achievements: {
    desc: "Milestones · LeetCode · GitHub",
    run: () => (
      <div>
        {achievements.map((a, i) => (
          <div key={i} className="t-block">
            <span className={a.icon === "★" ? "c-green-b" : "c-green"}>{a.icon} </span>
            <span className="c-text c-bold">{a.title}</span>
            {a.desc && <span className="c-muted"> — {a.desc}</span>}
          </div>
        ))}
        <Sp />
        <LeetCodePanel />
        <Sp />
        <GitHubPanel />
      </div>
    ),
  },

  leetcode: {
    desc: "LeetCode stats, heatmap & badges",
    run: () => <LeetCodePanel />,
  },

  github: {
    desc: "GitHub contribution graph",
    run: () => <GitHubPanel />,
  },

  resume: {
    desc: "View / download résumé",
    run: () => (
      <div className="t-box">
        <div className="c-muted">My full résumé (PDF) is hosted on Google Drive.</div>
        <div className="t-projlinks">
          <Btn href={identity.resume} track="resume_view">Open / View ↗</Btn>
          <Btn href={identity.resume} track="resume_download">Download ↗</Btn>
        </div>
        <div className="c-muted c-dim t-mt">Opens in a new tab — use Drive's download button to save the PDF.</div>
      </div>
    ),
  },

  contact: {
    desc: "Get in touch",
    run: () => (
      <div>
        <div className="t-kv">
          <span className="k">Email</span>
          <span className="v"><Ext href={`mailto:${contact.email}`}>{contact.email}</Ext></span>
          <span className="k">Phone</span>
          <span className="v"><Ext href={`tel:${contact.tel}`}>{contact.phone}</Ext></span>
          <span className="k">Location</span>
          <span className="v">{contact.location}</span>
          <span className="k">Response</span>
          <span className="v c-green">{contact.replies}</span>
        </div>
        <Sp />
        <div className="c-accent c-bold">Available for</div>
        {contact.availableFor.map((a, i) => <Feat key={i} mark="→">{a}</Feat>)}
      </div>
    ),
  },

  social: {
    desc: "Profiles & coding sites",
    run: () => {
      const socials = social.filter((s) => s.kind === "social");
      const codes = social.filter((s) => s.kind === "code");
      const Row = ({ s }) => (
        <div className="t-social">
          <span className="c-text c-bold nm">{s.name}</span>
          <span className="c-muted ar">→</span>
          <span><Ext href={s.url}>{s.handle}</Ext></span>
        </div>
      );
      return (
        <div>
          {socials.map((s) => <Row key={s.name} s={s} />)}
          <Sp />
          <Heading>Coding Profiles</Heading>
          <Hr />
          {codes.map((s) => <Row key={s.name} s={s} />)}
        </div>
      );
    },
  },

  learning: {
    desc: "Currently exploring",
    run: () => (
      <div>
        <div className="c-muted t-block">The AI / ML rabbit holes I'm deep in outside of shipping.</div>
        {learning.map((l, i) => (
          <div key={i} className="t-block">
            <span className="t-bullet">▸ </span>
            <span className="c-text c-bold">{l.title}</span>
            <span className="c-muted"> — {l.desc}</span>
          </div>
        ))}
      </div>
    ),
  },

  status: {
    desc: "System status",
    run: () => (
      <div>
        <div className="t-kv">
          <span className="k">Portfolio</span><span className="v c-green">● ONLINE</span>
          <span className="k">Experience</span><span className="v">{stats.experience}</span>
          <span className="k">Projects</span><span className="v">{stats.projects} shipped</span>
          <span className="k">Companies</span><span className="v">{stats.companies}</span>
          <span className="k">DSA solved</span><span className="v">{stats.dsa}</span>
          <span className="k">Availability</span><span className="v c-green">OPEN — full-time & freelance</span>
          <span className="k">Last updated</span><span className="v">{stats.lastUpdated}</span>
        </div>
        <Sp />
        <div className="c-green">✓ All systems operational</div>
      </div>
    ),
  },

  manifesto: {
    desc: "The position I build from",
    run: () => (
      <div>
        <Eyebrow>01 — Position</Eyebrow>
        <blockquote className="t-quote">{manifesto}</blockquote>
        <div className="t-mt t-kv">
          <span className="k">Discipline</span><span className="v">Backend · Real-time · RAG</span>
          <span className="k">Based</span><span className="v">{identity.locationLong}</span>
          <span className="k">Status</span><span className="v c-green">{identity.status}</span>
        </div>
      </div>
    ),
  },

  theme: {
    desc: "Change color theme — theme <name>",
    run: (args, ctx) => {
      const name = (args[0] || "").toLowerCase();
      if (!name) {
        return (
          <div>
            <div className="c-muted">Current theme: <span className="c-green">{ctx.theme}</span></div>
            <div className="t-mt">Available:</div>
            {THEMES.map((t) => (
              <div key={t} className="t-block">
                <Run ctx={ctx} cmd={`theme ${t}`}>
                  <span className={t === ctx.theme ? "c-green c-bold" : "c-green"}>
                    {t === ctx.theme ? "● " : "○ "}{t}
                  </span>
                </Run>
              </div>
            ))}
            <div className="c-muted c-dim t-mt">Usage: <span className="c-green">theme matrix</span></div>
          </div>
        );
      }
      if (!THEMES.includes(name)) {
        return (
          <div>
            <div className="c-red">Unknown theme: {name}</div>
            <div className="c-muted">Available: {THEMES.join(" · ")}</div>
          </div>
        );
      }
      ctx.setTheme(name);
      return <div className="c-green">✓ Theme set to <span className="c-bold">{name}</span>.</div>;
    },
  },

  exit: {
    desc: "Close the top detail window — exit [all]",
    run: (args, ctx) => {
      const all = /^(all|-a|--all)$/i.test(args[0] || "");
      const closed = ctx.closeTerminals ? ctx.closeTerminals(all) : [];
      if (!closed.length) {
        return (
          <div className="c-muted">
            No open windows. Open one from{" "}
            <Run ctx={ctx} cmd="projects"><span className="c-cyan">projects</span></Run>
            {" or "}
            <Run ctx={ctx} cmd="experience"><span className="c-cyan">experience</span></Run>.
          </div>
        );
      }
      return (
        <div className="c-green">
          ✓ closed <span className="c-bold">{closed.join("  ·  ")}</span>
        </div>
      );
    },
  },

  clear: { desc: "Clear the terminal", run: () => null },

  home: {
    desc: "Return to the welcome screen",
    run: (_a, ctx) => <Welcome ctx={ctx} />,
  },

  ls: {
    desc: "List sections",
    hidden: true,
    run: (_a, ctx) => {
      const entries = [
        { label: "about.md", cmd: "about", cls: "c-text" },
        { label: "projects/", cmd: "projects", cls: "c-blue" },
        { label: "skills.json", cmd: "skills", cls: "c-text" },
        { label: "experience/", cmd: "experience", cls: "c-blue" },
        { label: "education/", cmd: "education", cls: "c-blue" },
        { label: "achievements/", cmd: "achievements", cls: "c-blue" },
        { label: "learning/", cmd: "learning", cls: "c-blue" },
        { label: "contact.vcf", cmd: "contact", cls: "c-text" },
        { label: "social/", cmd: "social", cls: "c-blue" },
        { label: "resume.pdf", cmd: "resume", cls: "c-green" },
      ];
      return (
        <div className="t-ls">
          {entries.map((e) => (
            <Run ctx={ctx} cmd={e.cmd} key={e.label}>
              <span className={e.cls}>{e.label}</span>
            </Run>
          ))}
        </div>
      );
    },
  },

  cd: {
    desc: "Change directory",
    hidden: true,
    run: (args, ctx) => {
      const dir = (args[0] || "~").replace(/^\.?\/*/, "").replace(/\/$/, "");
      if (!args[0] || dir === "~" || dir === "") {
        ctx.setCwd("~");
        return null;
      }
      const target = SECTION_CMDS.find((c) => c === dir || c.startsWith(dir));
      if (!target) {
        return <div className="c-red">cd: no such directory: {args[0]}</div>;
      }
      ctx.setCwd("~/" + target);
      return COMMANDS[target].run([], ctx);
    },
  },

  pwd: {
    desc: "Print working directory",
    hidden: true,
    run: (_a, ctx) => <span className="c-text">/home/ayush{ctx.cwd === "~" ? "" : "/" + ctx.cwd.slice(2)}</span>,
  },

  date: {
    desc: "Current date & time",
    hidden: true,
    run: () => <span className="c-text">{new Date().toString()}</span>,
  },

  echo: {
    desc: "Print text",
    hidden: true,
    run: (args) => <span className="c-text">{args.join(" ")}</span>,
  },

  history: {
    desc: "Command history",
    hidden: true,
    run: (_a, ctx) => {
      const h = ctx.history || [];
      if (!h.length) return <span className="c-muted">No history yet.</span>;
      return (
        <div>
          {h.map((c, i) => (
            <div key={i}>
              <span className="c-muted" style={{ display: "inline-block", minWidth: "3ch", textAlign: "right" }}>{i + 1}</span>
              <span className="c-text">  {c}</span>
            </div>
          ))}
        </div>
      );
    },
  },

  neofetch: {
    desc: "System summary",
    run: () => {
      const rows = [
        ["OS", "Portfolio OS · Terminal Edition"],
        ["Host", identity.discipline],
        ["Kernel", "React 18 · Vite 5"],
        ["Shell", "ayush-sh 1.0"],
        ["Uptime", "shipping since 2021"],
        ["Stack", "TypeScript · NestJS · React · Python · AWS"],
        ["Focus", "Backend · AI / RAG · Real-time"],
        ["Location", identity.location],
        ["Experience", `${stats.experience} · ${stats.projects} projects · ${stats.companies} companies`],
        ["DSA", `${stats.dsa} solved`],
        ["Status", "● Open to work"],
      ];
      const sw = ["c-red", "c-orange", "c-yellow", "c-green", "c-cyan", "c-blue", "c-purple"];
      return (
        <div className="t-neo">
          <pre className="logo">{NEO_LOGO}</pre>
          <div className="info">
            <div className="row"><span className="k" style={{ minWidth: 0 }}><span className="c-green c-bold">ayush</span><span className="c-muted">@</span><span className="c-green c-bold">portfolio</span></span></div>
            <div className="row"><span className="c-muted">{"─".repeat(22)}</span></div>
            {rows.map(([k, v]) => (
              <div className="row" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
            ))}
            <div className="row" style={{ marginTop: 6, gap: 4 }}>
              {sw.map((c, i) => <span key={i} className={`swatch ${c}`} style={{ background: "currentColor" }} />)}
            </div>
          </div>
        </div>
      );
    },
  },

  sudo: {
    desc: "Superuser… maybe",
    hidden: true,
    run: (args, ctx) => {
      const line = args.join(" ").toLowerCase();
      if (line.startsWith("hire")) {
        return (
          <div>
            <div className="c-green">Permission granted.</div>
            <div className="c-green-b">✓ Ayush is ready for the next challenge.</div>
            <div className="c-muted c-dim t-mt">Run <Run ctx={ctx} cmd="contact"><span className="c-cyan">contact</span></Run> to make it official.</div>
          </div>
        );
      }
      return (
        <div>
          <div className="c-muted">[sudo] password for guest:</div>
          <div className="c-yellow">Nice try 😄 — you don't need root to explore. Try <Run ctx={ctx} cmd="sudo hire ayush"><span className="c-green">sudo hire ayush</span></Run>.</div>
        </div>
      );
    },
  },
};

/* ---- aliases -------------------------------------------------------------- */
export const ALIASES = {
  "?": "help", commands: "help", menu: "help",
  me: "whoami", "who": "whoami", id: "whoami",
  bio: "about", info: "about",
  work: "projects", portfolio: "projects", proj: "project",
  stack: "skills", tech: "skills",
  jobs: "experience", exp: "experience", career: "experience",
  edu: "education", school: "education",
  wins: "achievements", awards: "achievements", myachievements: "achievements", achievement: "achievements",
  lc: "leetcode", grind: "leetcode", dsa: "leetcode",
  gh: "github", contributions: "github",
  cv: "resume", résumé: "resume",
  mail: "contact", email: "contact", hire: "contact",
  links: "social", profiles: "social",
  learn: "learning", exploring: "learning",
  cls: "clear", reset: "clear",
  quit: "exit", q: "exit", close: "exit", bye: "exit",
  dir: "ls", ll: "ls",
  quote: "manifesto",
};

/* ---- resolver + engine ---------------------------------------------------- */
export function resolveName(input) {
  const name = String(input || "").trim().split(/\s+/)[0].toLowerCase();
  return ALIASES[name] || name;
}

/* Identity of a command's *output*, not of the text that was typed.
   Two inputs that render the same panel share a signature, so the shell can
   keep exactly one copy on screen instead of stacking duplicates every time a
   chip, nav button or repeated command fires. Returns null when there is
   nothing to de-duplicate. */
export function commandSignature(input) {
  const raw = String(input || "").trim();
  if (!raw) return null;
  const parts = raw.split(/\s+/);
  const canonical = resolveName(parts[0]);
  const args = parts.slice(1).map((s) => s.toLowerCase());

  // `cd about` renders the very same panel as `about`
  if (canonical === "cd") {
    const dir = (args[0] || "~").replace(/^\.?\/*/, "").replace(/\/$/, "");
    if (!dir || dir === "~") return "cd";
    const target = SECTION_CMDS.find((c) => c === dir || c.startsWith(dir));
    return target || `cd ${dir}`;
  }
  // `project 1`, `proj chat` and `project real-time-chat` are one and the same
  if (canonical === "project") {
    const p = findProject(args[0]);
    if (p) return `project ${p.slug}`;
  }
  return [canonical, ...args].join(" ");
}

function NotFound({ name, ctx }) {
  return (
    <div>
      <div className="c-red">command not found: {name}</div>
      <div className="c-muted">
        Type <Run ctx={ctx} cmd="help"><span className="c-cyan">help</span></Run> to see available commands.
      </div>
    </div>
  );
}

export function runCommand(input, ctx) {
  const raw = String(input || "").trim();
  if (!raw) return null;
  const parts = raw.split(/\s+/);
  const canonical = ALIASES[parts[0].toLowerCase()] || parts[0].toLowerCase();
  const args = parts.slice(1);
  const cmd = COMMANDS[canonical];
  if (!cmd) return <NotFound name={parts[0]} ctx={ctx} />;
  try {
    return cmd.run(args, ctx);
  } catch (err) {
    return <div className="c-red">Error running “{canonical}”: {String(err && err.message)}</div>;
  }
}

/* main list for toolbar + help */
export const TOOLBAR = ["about", "projects", "skills", "experience", "achievements", "contact", "resume"];

/* completions for Tab / ghost text */
export function getCompletions(input) {
  const raw = String(input || "");
  if (!raw.trim()) return [];
  const parts = raw.split(/\s+/);
  const names = Object.keys(COMMANDS).concat(Object.keys(ALIASES));
  if (parts.length <= 1) {
    const p = parts[0].toLowerCase();
    return [...new Set(names)].filter((n) => n.startsWith(p) && n !== p).sort();
  }
  const first = parts[0].toLowerCase();
  const partial = parts[parts.length - 1].toLowerCase();
  const base = parts.slice(0, -1).join(" ");
  let pool = [];
  if (first === "project" || ALIASES[first] === "project") pool = projects.map((p) => p.slug);
  else if (first === "theme") pool = THEMES;
  else if (first === "cd") pool = SECTION_CMDS;
  return pool.filter((s) => s.startsWith(partial) && s !== partial).map((s) => `${base} ${s}`);
}
