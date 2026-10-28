import type { Metadata } from "next";
import Link from "next/link";
import { student } from "@/data/projects";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Do Tran Nhu Ngoc about her student portfolio and creative work.",
};
export default function Contact() {
  return (
    <div className="frame page-shell contact-page">
      <h1>Let’s talk.</h1>
      <div className="contact-intro">
        <p>
          About a story, an illustration,
          <br />
          or a new conversation.
        </p>
        <p>
          {student.name}
          <br />
          Ho Chi Minh City, Vietnam
        </p>
      </div>
      <a className="contact-email" href={`mailto:${student.email}`}>
        yumidotran<span>@gmail.com ↗</span>
      </a>
      <div className="contact-bottom">
        <p>
          Write directly by email.
          <br />
          Your email app will open.
        </p>
        <Link href="/work" className="text-link">
          Explore the portfolio ↗
        </Link>
      </div>
    </div>
  );
}
