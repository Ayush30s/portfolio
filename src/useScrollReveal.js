import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sr-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    const els = document.querySelectorAll(
      ".sr-hidden, .sr-left, .sr-right, .sr-scale",
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}
