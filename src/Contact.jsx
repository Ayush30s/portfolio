import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useScrollReveal } from "./useScrollReveal";

const Contact = () => {
  useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const send = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name,
        from_email: form.email,
        message: `Position/Role: ${form.role}\n\n${form.message}`,
      }, PUBLIC_KEY);
      setStatus("success");
      setForm({ name: "", email: "", role: "", message: "" });
      setTimeout(() => setStatus(null), 6000);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const CONTACTS = [
    { label: "Email", value: "ayushsri302003@gmail.com", href: "mailto:ayushsri302003@gmail.com" },
    { label: "LinkedIn", value: "ayush-srivastav-58635b280", href: "https://www.linkedin.com/in/ayush-srivastav-58635b280" },
    { label: "GitHub", value: "Ayush30s", href: "https://github.com/Ayush30s" },
    { label: "Location", value: "Jaunpur, UP, India (Remote-ready)", href: null },
    { label: "Phone", value: "+91 9648829728", href: "tel:+919648829728" },
  ];

  return (
    <section id="contact" className="py-24 relative" style={{ background: "var(--bg-2)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="sr-hidden sr-d1 mb-2">
          <span className="section-label">Get In Touch</span>
        </div>
        <div className="sr-hidden sr-d2 mb-12">
          <div className="accent-stripe" />
          <h2 className="font-display text-4xl sm:text-5xl" style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
            Let's Work<br />
            <span className="grad-text font-display italic">Together</span>
          </h2>
          <p className="text-base mt-4 max-w-lg" style={{ color: "var(--text-secondary)" }}>
            Open to full-time roles, internships, and freelance projects. I respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 sr-left flex flex-col gap-4">
            {CONTACTS.map((c, i) => (
              <div key={i} className="card-white p-4 flex items-center justify-between">
                <span className="font-mono-custom text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  {c.label}
                </span>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-sm font-semibold transition-colors break-all text-right"
                    style={{ color: "var(--accent)" }}
                    onMouseEnter={e => e.target.style.color = "var(--accent-2)"}
                    onMouseLeave={e => e.target.style.color = "var(--accent)"}
                  >
                    {c.value} ↗
                  </a>
                ) : (
                  <span className="text-sm text-right" style={{ color: "var(--text-secondary)" }}>{c.value}</span>
                )}
              </div>
            ))}

            <div
              className="p-4 mt-2"
              style={{ background: "var(--accent)", border: "var(--border)", boxShadow: "var(--shadow-md)" }}
            >
              <p className="font-mono-custom text-xs text-white opacity-80 mb-1">Status</p>
              <p className="font-bold text-white">✅ Available for opportunities</p>
              <p className="text-xs text-white opacity-70 mt-1">Full-time · Internship · Freelance</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 sr-right card p-8">
            <form onSubmit={send} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "Jane Smith" },
                  { id: "email", label: "Your Email", type: "email", placeholder: "jane@company.com" },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label htmlFor={f.id} className="font-mono-custom text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type} id={f.id} name={f.id}
                      value={form[f.id]}
                      onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                      placeholder={f.placeholder}
                      required
                      className="form-input"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="role" className="font-mono-custom text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  Position / Opportunity
                </label>
                <input
                  type="text" id="role" name="role"
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Full-Stack Developer at Acme Corp"
                  className="form-input"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono-custom text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  Message
                </label>
                <textarea
                  id="message" name="message" rows="5"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the role, company, or project..."
                  required
                  className="form-input"
                  style={{ resize: "none" }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`btn-primary py-4 text-base flex items-center justify-center gap-2 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message →"
                )}
              </button>

              {status === "success" && (
                <p className="text-green-700 text-center text-sm font-semibold" style={{ border: "1px solid #16a34a", padding: "10px", background: "#f0fdf4" }}>
                  ✓ Sent! I'll get back to you within 24 hours.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-center text-sm" style={{ border: "1px solid #e85d3a", padding: "10px", background: "#fff5f5" }}>
                  ✗ Something went wrong. Email me directly at ayushsri302003@gmail.com
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
