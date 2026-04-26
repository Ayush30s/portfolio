import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useScrollReveal } from "./useScrollReveal";
import { Icon, Mail, MapPin, Zap } from "lucide-react";

const Contact = () => {
  useScrollReveal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
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
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: `Budget: ${form.budget}\n\n${form.message}`,
        },
        PUBLIC_KEY,
      );
      setStatus("success");
      setForm({ name: "", email: "", budget: "", message: "" });
      setTimeout(() => setStatus(null), 6000);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const infos = [
    {
      icon: Mail,
      label: "Email",
      value: "ayushsri302003@gmail.com",
      href: "mailto:ayushsri302003@gmail.com",
    },

    {
      icon: MapPin,
      label: "Location",
      value: "Jaunpur, Uttar Pradesh, India",
      href: null,
    },
  ];

  const inputStyle = {
    background: "var(--input-bg)",
    border: "1px solid var(--border)",
    color: "var(--input-text)",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    outline: "none",
    width: "100%",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "var(--accent)";
    e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)";
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = "var(--border)";
    e.target.style.boxShadow = "none";
  };

  return (
    <section
      id="contact"
      className="py-28 relative overflow-hidden"
      style={{ background: "var(--navy-2)" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{
          background: "var(--accent)",
          opacity: "var(--orb-section-opacity)",
        }}
      />
      <div className="max-w-6xl mx-auto px-6">
        <div className="sr-hidden sr-d1 mb-4 section-line" />
        <div className="sr-hidden sr-d2 mb-16 text-start">
          <span
            className="font-mono-custom text-xs tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
          >
            Get In Touch
          </span>
          <h2
            className="font-display font-extrabold text-4xl sm:text-5xl mt-3"
            style={{ color: "var(--text-primary)" }}
          >
            Let's Build Something
            <br />
            <span className="grad-text">Extraordinary</span>
          </h2>
          <p
            className="text-lg max-w-xl  mt-4"
            style={{ color: "var(--text-secondary)" }}
          >
            Have a project in mind? I'd love to contribute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info panel */}
          <div className="lg:col-span-2 flex flex-col gap-4 sr-left">
            {infos.map((info, i) => {
              const Icon = info.icon; // ✅ define icon here

              return (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--tag-bg)] border border-[var(--border)]">
                    <Icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>

                  <div>
                    <div
                      className="font-mono-custom text-xs tracking-widest mb-1"
                      style={{ color: "var(--accent)" }}
                    >
                      {info.label}
                    </div>

                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm transition-colors break-all"
                        style={{ color: "var(--text-primary)" }}
                        onMouseEnter={(e) =>
                          (e.target.style.color = "var(--accent)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.color = "var(--text-primary)")
                        }
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {info.value}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="glass-card rounded-2xl p-5">
              <div
                className="font-mono-custom text-xs tracking-widest mb-4"
                style={{ color: "var(--accent)" }}
              >
                FIND ME ONLINE
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  {
                    label: "GitHub (Ayush)",
                    href: "https://github.com/Ayush30s",
                  },

                  {
                    label: "LinkedIn (Ayush)",
                    href: "https://www.linkedin.com/in/ayush-srivastav-58635b280",
                  },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline px-4 py-2 rounded-xl text-xs"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 sr-right glass-card rounded-2xl p-8 relative overflow-hidden">
            <div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none"
              style={{ background: "var(--accent)", opacity: 0.08 }}
            />

            <form onSubmit={send} className="flex flex-col gap-5 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    id: "name",
                    label: "Full Name",
                    type: "text",
                    placeholder: "John Doe",
                  },
                  {
                    id: "email",
                    label: "Email Address",
                    type: "email",
                    placeholder: "john@example.com",
                  },
                ].map((f) => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label
                      htmlFor={f.id}
                      className="font-mono-custom text-xs tracking-widest uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      id={f.id}
                      name={f.id}
                      value={form[f.id]}
                      onChange={(e) =>
                        setForm({ ...form, [f.id]: e.target.value })
                      }
                      placeholder={f.placeholder}
                      required
                      style={{
                        ...inputStyle,
                        "::placeholder": { color: "var(--input-placeholder)" },
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-mono-custom text-xs tracking-widest uppercase"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Make me an Offer
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  required
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`btn-primary w-full py-4 rounded-2xl text-base flex items-center justify-center gap-3 mt-2 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        className="opacity-75"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>Send Email →</>
                )}
              </button>

              {status === "success" && (
                <p className="text-green-600 text-center text-sm font-semibold">
                  ✓ Message sent! We'll get back to you within 24 hours.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-500 text-center text-sm">
                  ✗ Something went wrong. Please email us directly.
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
