import { useEffect, useRef, useState } from "react";
import { ClipboardList, Handshake, ShieldCheck } from "lucide-react";
const FEATURES = [
  {
    icon: Handshake,
    title: "Direct Communication",
    desc: "You talk to the people writing your code — always.",
  },
  {
    icon: ClipboardList,
    title: "Transparent Process",
    desc: "Weekly updates, clear timelines, zero surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Post-Launch Support",
    desc: "We don't vanish after deployment. We stay with you.",
  },
];
const HandshakeComp = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [shook, setShook] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    const onLoaded = () => setVideoReady(true);
    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) setVideoReady(true);
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  useEffect(() => {
    if (!videoReady) return;
    const video = videoRef.current;
    if (!video) return;
    const handler = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const raw = (winH - rect.top) / (rect.height * 0.85);
      const progress = Math.max(0, Math.min(1, raw));
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = progress * video.duration;
      }
      if (progress >= 0.9 && !shook) setShook(true);
      if (progress < 0.85 && shook) setShook(false);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [videoReady, shook]);

  return (
    <section
      ref={sectionRef}
      className="relative py-36 overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Fixed: was --accent-primary (doesn't exist) → now --text-primary */}
        <span
          className="font-mono-custom text-xs tracking-widest uppercase block mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Our Promise
        </span>

        <h2
          className="font-display font-extrabold text-4xl sm:text-5xl mb-5 drop-shadow-lg"
          style={{ color: "var(--text-primary)" }}
        >
          Built on <span className="grad-text">Partnership</span>
        </h2>

        <p
          className="text-lg max-w-xl mx-auto mb-20 drop-shadow"
          style={{ color: "var(--text-primary)" }}
        >
          When you work with us, you get two founders personally invested in
          your success — every step of the way.
        </p>

        <div className="h-32 sm:h-48" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
          {FEATURES.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="rounded-2xl p-6 text-center backdrop-blur-md transition-colors duration-300 group"
                style={{
                  background: "var(--hs-card-bg)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="mb-3 flex justify-center">
                  <Icon
                    className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: "var(--accent)" }}
                  />
                </div>

                <h4 className="font-bold text-base mb-2 text-[var(--text-primary)]">
                  {item.title}
                </h4>

                <p className="text-sm text-[var(--text-secondary)]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HandshakeComp;
