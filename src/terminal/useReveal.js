import { useEffect, useRef } from "react";

/* ============================================================================
   Reveal-on-scroll for terminal output.
   Attach the returned ref to a container and mark each child that should
   animate in with `data-reveal` (start it in the `.t-reveal` hidden state).
   As a child scrolls into the terminal screen it gains `is-in` and settles.

   The IntersectionObserver is rooted at `.term-screen` (the terminal's own
   scroll area, not the window). Degrades gracefully: with reduced-motion or no
   IntersectionObserver support, every item is shown immediately.
   ========================================================================== */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll("[data-reveal]"));
    if (!items.length) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const scroller = root.closest(".term-screen") || null;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target); // reveal once, then stop watching
          }
        });
      },
      { root: scroller, threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => io.observe(el));

    // Safety net: if the observer produced no reveals at all (e.g. a zero-size
    // scroll root), never leave content stuck invisible — show everything.
    const fallback = setTimeout(() => {
      if (!items.some((el) => el.classList.contains("is-in"))) {
        items.forEach((el) => el.classList.add("is-in"));
      }
    }, 1400);

    return () => { clearTimeout(fallback); io.disconnect(); };
  }, []);

  return ref;
}
