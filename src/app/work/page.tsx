import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { mediaFor } from "@/data/media";
import { MediaPlate } from "@/components/media";
export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Five student projects across cultural communication, illustration, debate, community service and film.",
};
export default function Work() {
  return (
    <div className="frame page-shell">
      <div className="page-intro">
        <h1>Selected work.</h1>
        <p>
          Five projects. Different forms of communication.
          <br />A shared interest in how people connect.
        </p>
      </div>
      <div className="project-index">
        {projects.map((p) => (
          <article className={`index-entry ${p.theme}`} key={p.slug}>
            <div className="index-meta">
              <p>{p.discipline}</p>
              <p>{p.dates}</p>
            </div>
            <Link href={`/work/${p.slug}`}>
              <h2>
                {p.name}
                <span aria-hidden="true"> ↗</span>
              </h2>
            </Link>
            {mediaFor(p.mediaSection)[0] ? (
              <Link
                href={`/work/${p.slug}`}
                aria-label={`View ${p.name}`}
                className="index-image-link"
              >
                <MediaPlate
                  image={mediaFor(p.mediaSection)[0]}
                  label={p.shortName}
                />
              </Link>
            ) : null}
            <div className="index-description">
              <p>{p.role}</p>
              <p>{p.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
