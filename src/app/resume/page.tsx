import type { Metadata } from "next";
import Link from "next/link";
import { awards, projects, student } from "@/data/projects";
export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Education, creative communication experience and selected honors of Do Tran Nhu Ngoc.",
};
export default function Resume() {
  return (
    <div className="frame page-shell resume-page">
      <div className="page-intro">
        <h1>Résumé.</h1>
        <p>
          {student.name}
          <br />
          {student.location}
          <br />
          <a href={`mailto:${student.email}`}>{student.email}</a>
        </p>
      </div>
      <p className="resume-note">
        A selected, accessible summary of education and experience.
      </p>
      <section className="resume-section">
        <h2>Education</h2>
        <div>
          <article>
            <div className="resume-heading">
              <h3>{student.school}</h3>
              <p>2024–2027</p>
            </div>
            <p>Ho Chi Minh City, Vietnam</p>
          </article>
          <article>
            <div className="resume-heading">
              <h3>Nguyen An Khuong Secondary School</h3>
              <p>2020–2024</p>
            </div>
          </article>
        </div>
      </section>
      <section className="resume-section">
        <h2>Experience</h2>
        <div>
          {projects.map((p) => (
            <article key={p.slug}>
              <div className="resume-heading">
                <h3>
                  <Link href={`/work/${p.slug}`}>{p.name} ↗</Link>
                </h3>
                <p>{p.dates}</p>
              </div>
              <p className="role">{p.role}</p>
              <p>{p.contribution}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="resume-section">
        <h2>Selected honors</h2>
        <div>
          {awards.map((a) => (
            <article key={a.title}>
              <div className="resume-heading">
                <h3>{a.title}</h3>
                <p>{a.year}</p>
              </div>
              <p>{a.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="resume-section">
        <h2>Service</h2>
        <div>
          <article>
            <h3>SUGAR Vietnam</h3>
            <p>Volunteer Mathematics Tutor · October 2025–June 2026</p>
            <p>
              Five students, two hours weekly over seven months; four improved
              from average to good or excellent.
            </p>
          </article>
          <article>
            <h3>InitiaRe</h3>
            <p>Volunteer · January–September 2025</p>
            <p>
              Organized interactive science games and hands-on activities for
              30+ children.
            </p>
          </article>
        </div>
      </section>
      <section className="resume-section">
        <h2>Skills & interests</h2>
        <div>
          <p>
            Social media content, event photography, video recording and
            editing, illustration, debate and public speaking.
          </p>
          <p>Languages: Vietnamese (native), English.</p>
          <p>Piano, organ, basketball, badminton and volleyball.</p>
        </div>
      </section>
    </div>
  );
}
