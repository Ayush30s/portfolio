const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-10"
      style={{ background: "#0f0f0f", borderTop: "3px solid #1a1a1a" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center font-bold text-sm"
            style={{ background: "var(--accent)", border: "1.5px solid #fff", color: "#fff" }}
          >
            AS
          </div>
          <div>
            <p className="font-bold text-white text-sm">Ayush Srivastav</p>
            <p className="font-mono-custom text-xs" style={{ color: "#6a6a6a" }}>Full-Stack Developer</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {[
            { label: "GitHub", href: "https://github.com/Ayush30s" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-srivastav-58635b280" },
            { label: "X / Twitter", href: "https://x.com/Ayush_Sri_30" },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-custom text-xs transition-colors"
              style={{ color: "#6a6a6a" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "#6a6a6a"}
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="font-mono-custom text-xs" style={{ color: "#4a4a4a" }}>
          © {year} Ayush Srivastav
        </p>
      </div>
    </footer>
  );
};

export default Footer;
