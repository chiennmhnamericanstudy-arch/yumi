"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    const stop = () => {
      if (preference.matches) {
        observer.disconnect();
        document.getAnimations().forEach((a) => a.cancel());
      }
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stop);
    };
  }, [path]);
  return null;
}
