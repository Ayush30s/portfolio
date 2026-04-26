import { useScrollReveal } from "./useScrollReveal";
import ayush from "../image/ayush.jpeg";
import amit from "../image/amit.png";

const skillTextColors = {
  "Next.js": "text-gray-200",
  React: "text-cyan-400",
  NestJS: "text-red-500",
  TypeScript: "text-blue-500",
  "Node.js": "text-green-500",
  PostgreSQL: "text-blue-600",
  AWS: "text-orange-400",
  Prisma: "text-indigo-500",
  MongoDB: "text-green-500",
  "Socket.io": "text-gray-300",
  Redux: "text-purple-500",
  "REST APIs": "text-gray-400",

  Laravel: "text-red-500",
  PHP: "text-indigo-400",
  Django: "text-green-600",
  Python: "text-yellow-400",
  MySQL: "text-sky-500",
  Postman: "text-orange-400",
  JWT: "text-purple-500",
  Spatie: "text-pink-400",
  OOP: "text-gray-300",
  MVC: "text-gray-400",
};

const AYUSH = {
  name: "Ayush Srivastav",
  role: "Full-Stack Developer",
  tagline: "Architect of scalable systems and polished UIs",
  bio: "BCA graduate with hands-on experience building large-scale applications using Next.js, NestJS, TypeScript, and AWS. Currently working as a Software Developer at TechnoBren Infotech, where he architects full-stack solutions with a focus on performance and clean code.",
  skills: [
    "Next.js",
    "React",
    "NestJS",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Prisma",
    "MongoDB",
    "Socket.io",
    "Redux",
    "REST APIs",
  ],
  highlights: [
    "Full-Stack Developer @ TechnoBren Infotech",
    "500+ DSA problems solved",
    "BCA – Veer Bahadur Singh Purvanchal University",
    "Expert in system design & scalable architecture",
  ],
  socials: {
    github: "https://www.github.com/Ayush30s",
    linkedin: "https://www.linkedin.com/in/ayush-srivastav-58635b280",
    x: "https://x.com/Ayush_Sri_30",
    email: "ayushsri302003@gmail.com",
  },
  avatar: ayush,
  initials: null,
};

const AMIT = {
  name: "Amit Pathak",
  role: "Backend Developer",
  tagline: "Builder of secure, structured, and battle-tested backends",
  bio: "BCA graduate specializing in backend engineering with PHP, Laravel, Django, and RESTful API development. Currently a Software Developer at TechnoBren Infotech Pvt. Ltd., delivering production-grade systems with clean MVC architecture, Eloquent ORM, and robust authentication layers.",
  skills: [
    "Laravel",
    "PHP",
    "Django",
    "Python",
    "MySQL",
    "PostgreSQL",
    "REST APIs",
    "Postman",
    "JWT",
    "Spatie",
    "OOP",
    "MVC",
  ],
  highlights: [
    "Backend Developer @ TechnoBren Infotech",
    "Laravel Passport & Sanctum auth expert",
    "BCA – Veer Bahadur Singh Purvanchal University",
    "Role-based access control & API design",
  ],
  socials: {
    github: "https://github.com/Amitp0070",
    email: "amitpathak00700@gmail.com",
  },
  avatar: amit,
  initials: "AP",
};

const SocialIcon = ({ type }) => {
  const icons = {
    github: (
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    x: (
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    ),
    email: (
      <>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[type]}
    </svg>
  );
};

const FounderCard = ({ founder, direction }) => (
  <div
    className={`sr-${direction} glass-card rounded-2xl p-8 flex flex-col gap-6`}
  >
    <div className="flex items-start gap-5">
      <div className="relative flex-shrink-0">
        <div
          className="w-20 h-20 rounded-2xl overflow-hidden"
          style={{ border: "2px solid var(--border)" }}
        >
          {founder.avatar ? (
            <img
              src={founder.avatar}
              alt={founder.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#4f8ef7] to-[#7c6af5] flex items-center justify-center">
              <span className="font-display font-extrabold text-white text-2xl">
                {founder.initials}
              </span>
            </div>
          )}
        </div>
        <div
          className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-green-400"
          style={{ border: "2px solid var(--navy)" }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3
          className="font-extrabold text-xl"
          style={{ color: "var(--text-primary)" }}
        >
          {founder.name}
        </h3>
        <p
          className="font-mono-custom text-xs tracking-wide mt-0.5"
          style={{ color: "var(--accent)" }}
        >
          {founder.role}
        </p>
        <p
          className="text-sm mt-1 italic"
          style={{ color: "var(--text-secondary)" }}
        >
          "{founder.tagline}"
        </p>
      </div>
    </div>

    <p
      className="text-sm leading-relaxed"
      style={{ color: "var(--text-secondary)" }}
    >
      {founder.bio}
    </p>

    <div className="flex flex-col gap-2">
      {founder.highlights.map((h, i) => (
        <div
          key={i}
          className="flex items-center gap-3 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          <span className="font-bold" style={{ color: "var(--accent)" }}>
            →
          </span>
          {h}
        </div>
      ))}
    </div>

    <div className="flex flex-wrap gap-2">
      {founder.skills.map((s, i) => (
        <span
          key={i}
          className={`${
            skillTextColors[s] 
          } font-mono text-[0.65rem] tracking-[0.05em] bg-[var(--tag-bg)] border border-[var(--tag-border)] px-2.5 py-1 rounded-full transition-all duration-200 inline-block`}
        >
          {s}
        </span>
      ))}
    </div>

    <div
      className="flex gap-3 pt-3"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {Object.entries(founder.socials).map(([type, href]) => (
        <a
          key={type}
          href={type === "email" ? `mailto:${href}` : href}
          target={type !== "email" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl transition-all duration-300"
          style={{
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--accent)";
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.background = "var(--tag-bg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <SocialIcon type={type} />
        </a>
      ))}
    </div>
  </div>
);

const Stats = () => {
  useScrollReveal();
  const stats = [
    { n: "15+", label: "Projects Shipped" },
    { n: "2+", label: "Years Combined Exp." },
    { n: "10+", label: "Technologies Mastered" },
    { n: "100%", label: "Client Commitment" },
  ];
  return (
    <div className="grid grid-cols-2 py-10 lg:grid-cols-4 gap-4 mt-12 overflow-hidden">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`sr-hidden sr-d${i + 1} glass-card rounded-2xl p-6 text-center`}
        >
          <div className="font-display font-extrabold text-4xl grad-text">
            {s.n}
          </div>
          <div
            className="font-mono-custom text-xs tracking-widest mt-2 uppercase"
            style={{ color: "var(--text-secondary)" }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
};

const Team = () => {
  useScrollReveal();
  return (
    <section
      id="team"
      // Added overflow-x-hidden to prevent animations/orbs from creating horizontal scroll
      className="py-28 relative overflow-x-hidden"
      style={{ background: "var(--navy-2)" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{
          background: "var(--accent-2)",
          opacity: "var(--orb-section-opacity)",
        }}
      />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="sr-hidden sr-d1 mb-4 section-line" />
        <div className="sr-hidden sr-d2 mb-16 text-start">
          <span
            className="font-mono-custom text-xs tracking-widest uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            The Founders
          </span>
          <h2
            className="font-display font-extrabold text-4xl sm:text-5xl mt-3"
            style={{ color: "var(--text-primary)" }}
          >
            Two Developers,
            <br />
            <span className="grad-text">One Vision</span>
          </h2>
          <p
            className="text-lg max-w-2xl mt-4"
            style={{ color: "var(--text-secondary)" }}
          >
            We're not a faceless agency. We're two developers who personally
            build, test, and ship your product.
          </p>
        </div>

        {/* Wrapping the grid to contain the sr-left/sr-right translations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FounderCard founder={AYUSH} direction="left" />
          <FounderCard founder={AMIT} direction="right" />
        </div>

        <Stats />
      </div>
    </section>
  );
};

export default Team;
