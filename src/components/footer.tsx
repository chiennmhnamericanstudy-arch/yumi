import Link from "next/link";
import { student } from "@/data/projects";
export function Footer() {
  return (
    <footer className="site-footer frame">
      <div className="footer-top">
        <h2>Keep in touch.</h2>
        <a className="text-link" href={`mailto:${student.email}`}>
          Say hello <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="footer-name" aria-hidden="true">
        như ngọc.
      </div>
      <div className="footer-bottom">
        <p>{student.englishName} · Ho Chi Minh City</p>
        <Link href="/resume">Résumé</Link>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
