const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-12"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--navy-2)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4f8ef7] to-[#7c6af5] rounded-lg rotate-45" />
            <span className="absolute inset-0 flex  items-center justify-center text-white font-bold text-xs  z-10">
              M's
            </span>
          </div>
          <span
            className="font-800 text-lg tracking-tight hidden sm:block"
            style={{ color: "var(--text-primary)" }}
          >
            Million<span className="grad-text">'s</span>
          </span>
        </div>
        <p
          className="font-mono-custom text-xs tracking-wide text-center"
          style={{ color: "var(--text-secondary)" }}
        >
          © {year} Ayush Srivastav & Amit Pathak. All rights reserved.
        </p>
        <div className="flex gap-4">
          {[
            { label: "GitHub (Ayush)", href: "https://github.com/Ayush30s" },
            { label: "GitHub (Amit)", href: "https://github.com/Amitp0070" },
          ].map((l, i) => (
            <a
              key={i}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-custom text-xs transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
              onMouseLeave={(e) =>
                (e.target.style.color = "var(--text-secondary)")
              }
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
