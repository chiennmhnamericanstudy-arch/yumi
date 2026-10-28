import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/gallery";
import { MediaPlate } from "@/components/media";
import { galleryItems, mediaFor } from "@/data/media";
import { projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return {
    title: project?.name ?? "Project not found",
    description: project?.summary,
    openGraph: {
      title: `${project?.name ?? "Project"} | Như Ngọc`,
      description: project?.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const projectIndex = projects.indexOf(project);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const issue = String(projectIndex + 1).padStart(2, "0");
  const images = mediaFor(project.mediaSection);
  const coverImages = images.slice(0, 2);
  const evidenceImages = images.slice(2);

  return (
    <article className={`case-study case-magazine ${project.theme}`}>
      <header className="case-magazine-cover frame">
        <div className="case-cover-nav">
          <Link href="/work" className="back-link">← All work</Link>
          <p>ISSUE {issue} / 05</p>
          <p>{project.dates}</p>
        </div>

        <div className="case-cover-grid">
          <div className="case-cover-type">
            <p className="case-cover-discipline">{project.discipline}</p>
            <h1>{project.name}</h1>
            <p className="case-cover-headline">{project.headline}</p>
          </div>
          <div className="case-opening-images">
            {coverImages.map((image, index) => (
              <MediaPlate
                image={image}
                label={project.plate}
                kind={project.slug === "yumi-project" ? "Artwork" : "Photography"}
                className={`case-opening-image case-opening-image-${index + 1}`}
                showCaption={false}
                priority={index === 0}
                key={image.src}
              />
            ))}
            <span className="case-issue-mark" aria-hidden="true">{issue}</span>
          </div>
        </div>

        <div className="case-cover-footer">
          <p><span>Role</span>{project.role}</p>
          <p><span>Focus</span>{project.discipline}</p>
          <p className="case-cover-summary">{project.summary}</p>
        </div>
      </header>

      <div className="case-kinetic-strip" aria-hidden="true">
        {project.shortName} / QUESTION / ROLE / WORK / REACH / REFLECTION / {project.shortName}
      </div>

      <div className="case-magazine-body frame">
        <nav className="chapter-nav case-chapter-nav" aria-label="Case study sections">
          <a href="#question">Question</a>
          <a href="#role">My role</a>
          <a href="#work">The work</a>
          <a href="#reach">The reach</a>
          <a href="#reflection">Reflection</a>
        </nav>

        <section className="case-editorial-section case-question" id="question">
          <p className="case-section-index">The question</p>
          <h2>{project.question}</h2>
          <p className="editorial-note">Editorial framing of the documented work.</p>
        </section>

        <section className="case-editorial-section case-role" id="role">
          <div>
            <p className="case-section-index">My role</p>
            <h2>What I brought<br />to the room.</h2>
          </div>
          <p className="case-role-copy">{project.contribution}</p>
        </section>

        <section className="case-editorial-section case-work" id="work">
          <header>
            <p className="case-section-index">The work</p>
            <h2>From idea<br />to evidence.</h2>
          </header>
          <div className="case-work-notes">
            {project.work.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        {project.slug === "yumi-project" ? (
          <section className="art-archive case-art-archive" aria-labelledby="archive-title">
            <div className="section-heading">
              <h2 id="archive-title">The visual<br />archive.</h2>
              <p>Portraits, characters, stories, objects.</p>
            </div>
            <Gallery items={galleryItems()} />
          </section>
        ) : project.slug !== "disabled-film" && evidenceImages.length ? (
          <section className="case-evidence" aria-label={`${project.name} evidence gallery`}>
            {evidenceImages.map((image, index) => (
              <MediaPlate
                key={image.src}
                image={image}
                label={project.plate}
                className={`case-evidence-image case-evidence-image-${index + 1}`}
              />
            ))}
          </section>
        ) : null}

        {project.slug === "disabled-film" ? (
          <section className="case-film-archive" aria-labelledby="film-archive-title">
            <header>
              <div>
                <p className="case-section-index">Festival documentation</p>
                <h2 id="film-archive-title">Screen and<br />ensemble.</h2>
              </div>
              <p>
                The approved archive currently documents the festival screening and
                the student film team. Additional production stills remain private
                until publication rights are confirmed.
              </p>
            </header>
            <div className="case-film-grid">
              {images.map((image) => (
                <MediaPlate key={image.src} image={image} label="Disabled" />
              ))}
            </div>
          </section>
        ) : null}

        {project.slug === "disabled-film" ? (
          <aside className="viewing-note">
            <p className="case-section-index">Viewing note</p>
            <h3>Film viewing</h3>
            <p>The film is not available to stream in this preview. An approved, compressed version with captions is pending.</p>
          </aside>
        ) : null}

        <section className="case-reach" id="reach">
          <header>
            <p className="case-section-index">The reach</p>
            <h2>What moved<br />beyond the page.</h2>
          </header>
          <dl className={`case-metrics ${project.slug === "disabled-film" ? "case-metrics-text" : ""}`}>
            {project.reach.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="reach-note">{project.reachNote}</p>
        </section>

        {project.slug === "lhp-debate" ? (
          <aside className="personal-award case-award">
            <div>
              <p className="case-section-index">Personal recognition</p>
              <h3>Also at the debating table.</h3>
              <p>Global Citizen Debate Challenge, 2025: Regional Champion and National Second Runner-up. These personal competition honors are separate from Ngọc’s club leadership role.</p>
            </div>
            {mediaFor("Debate competition").map((image) => (
              <MediaPlate key={image.src} image={image} label="Debate" />
            ))}
          </aside>
        ) : null}

        <section className="case-editorial-section case-reflection" id="reflection">
          <p className="case-section-index">Reflection</p>
          <h2>{project.reflectionPrompt}</h2>
          <p className="editorial-note">A prompt for Ngọc. Her personal reflection is awaiting approval.</p>
        </section>

        <Link className="next-project case-next-project" href={`/work/${nextProject.slug}`}>
          <span>Next chapter</span>
          <strong>{nextProject.shortName}</strong>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
