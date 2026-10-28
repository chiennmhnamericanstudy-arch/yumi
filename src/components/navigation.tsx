"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
const links = [
  ["/work", "Work"],
  ["/work/yumi-project", "Studio"],
  ["/about", "About"],
  ["/resume", "Résumé"],
  ["/contact", "Contact"],
];
export function Navigation() {
  const pathname = usePathname();
  const details = useRef<HTMLDetailsElement>(null);
  const navLinks = links.map(([href, label]) => (
    <Link
      key={href}
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      onClick={() => {
        if (details.current) details.current.open = false;
      }}
    >
      {label}
    </Link>
  ));
  return (
    <header className="site-header frame">
      <Link href="/" className="wordmark" aria-label="Như Ngọc — home">
        ngọc<span aria-hidden="true">.</span>
      </Link>
      <nav aria-label="Main navigation" className="desktop-nav">
        {navLinks}
      </nav>
      <details
        className="mobile-menu"
        ref={details}
        onKeyDown={(e) => {
          if (e.key === "Escape" && details.current) {
            details.current.open = false;
            details.current.querySelector("summary")?.focus();
          }
        }}
      >
        <summary>
          Menu <span aria-hidden="true">+</span>
        </summary>
        <nav aria-label="Mobile navigation">{navLinks}</nav>
      </details>
    </header>
  );
}
