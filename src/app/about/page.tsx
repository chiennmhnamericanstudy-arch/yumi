import type { Metadata } from "next";
import Link from "next/link";
import { student } from "@/data/projects";
import { mediaFor } from "@/data/media";
import { MediaPlate } from "@/components/media";
export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Do Tran Nhu Ngoc, a student communicator and illustrator in Ho Chi Minh City.",
};
export default function About() {
  return (
    <div className="frame page-shell about-page">
      <div className="page-intro">
        <h1>Meet Như Ngọc.</h1>
        <p>
          {student.name}
          <br />
          Student, illustrator, communicator.
        </p>
      </div>
      <section className="about-lead">
        <div className="about-art-collage">
          <MediaPlate
            image={mediaFor("Yumi / Character Systems")[0]}
            label="Character study"
            kind="Artwork"
            showCaption={false}
          />
          <MediaPlate
            image={mediaFor("Cultural heritage media club")[1]}
            label="Hát Bội"
            showCaption={false}
          />
          <p>Images. Ideas. People.</p>
        </div>
        <div>
          <h2>A creative education.</h2>
          <p>
            Như Ngọc studies at Le Hong Phong High School for the Gifted in Ho
            Chi Minh City, Vietnam (2024–2027). Her work brings together
            cultural heritage, illustration, debate, community activities and
            performance.
          </p>
          <p>
            She founded Cổ Sắc Tân Thanh and Yumi Project, served as Chair of
            Debate Programs at LHP Debate Club, and leads Diary of the Blue
            Rose. This portfolio presents those experiences through her interest
            in Communication, Media and Public Relations.
          </p>
          <Link href="/resume" className="text-link">
            Read the résumé ↗
          </Link>
        </div>
      </section>
      <section id="beyond-the-brief" className="beyond-section">
        <h2>Beyond the brief.</h2>
        <div className="activity-grid">
          <article>
            <h3>Culture in her hands</h3>
            <p>
              Led a lotus-themed Vietnamese conical hat decoration team, using
              chenille-stem flowers and watercolor. The team earned First Prize
              at the 2024 school-wide grade camp.
            </p>
          </article>
          <article>
            <h3>Dance as a tribute</h3>
            <p>
              Performed in <em>Tribute to Unsung Heroes</em>, honoring
              sanitation workers for Vietnamese Teachers’ Day in 2025. The dance
              team received First Prize.
            </p>
          </article>
          <article>
            <h3>Learning together</h3>
            <p>
              With SUGAR Vietnam, tutored five middle-school students for two
              hours weekly over seven months. Four improved their mathematics
              results from average to good or excellent.
            </p>
          </article>
          <article>
            <h3>Science through play</h3>
            <p>
              Volunteered with InitiaRe from January to September 2025,
              organizing hands-on science games for more than 30 children at a
              shelter.
            </p>
          </article>
        </div>
        <div className="about-performance-archive" aria-label="Flashmob performance photo essay">
          {mediaFor("Flashmob").map((m, index) => (
            <MediaPlate
              key={m.src}
              image={m}
              label="Performance"
              className={`about-performance-shot about-performance-shot-${(index % 4) + 1}`}
            />
          ))}
        </div>
      </section>
      <section className="interest-section">
        <h2>Off the page.</h2>
        <p>
          Piano and organ. Basketball, badminton and volleyball. Space for
          music, movement and the next idea.
        </p>
      </section>
    </div>
  );
}
