import Link from "next/link";
import { MediaPlate } from "@/components/media";
import { mediaFor } from "@/data/media";
import { projects, student } from "@/data/projects";

export default function Home() {
  const heritage = projects[0];
  const yumi = projects[1];
  const debate = projects[2];
  const community = projects[3];
  const film = projects[4];
  const heritageArchive = mediaFor(heritage.mediaSection);
  const yumiArchive = mediaFor(yumi.mediaSection);
  const debateArchive = [
    ...mediaFor(debate.mediaSection),
    ...mediaFor("Debate competition"),
  ];
  const communityArchive = mediaFor(community.mediaSection);
  const filmArchive = mediaFor(film.mediaSection);
  const flashmobArchive = mediaFor("Flashmob");

  return (
    <>
      <section className="mag-cover frame" aria-labelledby="cover-title">
        <div className="mag-cover-meta">
          <p>ART PORTFOLIO · ISSUE 01</p>
          <p>Ho Chi Minh City, Vietnam<br />2024—2026</p>
        </div>
        <h1 id="cover-title" className="mag-cover-name">Như<br />Ngọc</h1>
        <p className="mag-cover-kicker">Heritage in motion</p>
        <div className="mag-cover-images">
          <MediaPlate image={heritageArchive[0]} label="Hát Bội" className="mag-cover-mask" showCaption={false} priority />
          <MediaPlate image={mediaFor("Yumi / Editorial Portraits")[0]} label="Yumi" kind="Artwork" className="mag-cover-character" showCaption={false} priority />
        </div>
        <div className="mag-cover-bottom">
          <p>{student.name}<br />Student communicator & illustrator</p>
          <p className="mag-cover-statement">Culture, image and voice — assembled as a living art magazine.</p>
          <Link className="mag-arrow-link" href="#co-sac-tan-thanh">Open the issue <span aria-hidden="true">↓</span></Link>
        </div>
      </section>

      <section id="co-sac-tan-thanh" className="mag-chapter heritage-issue" aria-labelledby="heritage-title">
        <div className="heritage-ribbon" aria-hidden="true">CỔ SẮC · TÂN THANH · HÁT BỘI · CỔ SẮC · TÂN THANH</div>
        <div className="heritage-issue-inner frame">
          <header className="heritage-editorial-head">
            <p className="mag-folio">01 / CULTURAL COMMUNICATION</p>
            <h2 id="heritage-title">Cổ Sắc<br /><em>Tân Thanh</em></h2>
            <p className="heritage-deck">Giving tradition a new voice.</p>
          </header>
          <div className="heritage-mask-wall">
            {heritageArchive.map((image, index) => (
              <MediaPlate image={image} label="Hát Bội" className={`heritage-shot heritage-shot-${index + 1}`} key={image.src} />
            ))}
            <div className="heritage-sun" aria-hidden="true"><span>戲</span></div>
          </div>
          <div className="heritage-story">
            <p className="heritage-dropcap">{heritage.summary}</p>
            <div className="heritage-facts" aria-label="Project highlights">
              <p><strong>20</strong><span>club members</span></p>
              <p><strong>30</strong><span>content pieces</span></p>
              <p><strong>1,200</strong><span>page likes</span></p>
            </div>
            <Link className="mag-arrow-link" href={`/work/${heritage.slug}`}>Read the cultural story <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="mag-chapter yumi-issue" aria-labelledby="yumi-title">
        <header className="yumi-editorial-head frame">
          <p className="mag-folio">02 / ILLUSTRATION STUDIO</p>
          <h2 id="yumi-title">A world<br />drawn by hand.</h2>
          <p>Yumi is a sketchbook left open: portraits, character systems, sequential stories and objects people can hold.</p>
          <Link className="mag-arrow-link" href={`/work/${yumi.slug}`}>Enter Yumi Studio <span aria-hidden="true">↗</span></Link>
        </header>
        <div className="yumi-tape" aria-hidden="true">EXPRESSIONS / PORTRAITS / COMICS / LITTLE OBJECTS / EXPRESSIONS</div>
        <div className="yumi-archive frame">
          {yumiArchive.map((image, index) => (
            <MediaPlate image={image} label="Yumi" kind="Artwork" className={`yumi-card yumi-card-${(index % 7) + 1}`} key={image.src} />
          ))}
        </div>
      </section>

      <section className="mag-chapter debate-issue frame" aria-labelledby="debate-title">
        <header className="debate-head">
          <p className="mag-folio">03 / IDEAS IN PUBLIC</p>
          <h2 id="debate-title">Give ideas<br /><span>a stage.</span></h2>
          <p>{debate.summary}</p>
        </header>
        <div className="debate-broadsheet">
          {debateArchive.map((image, index) => (
            <MediaPlate image={image} label="Debate" className={`debate-photo debate-photo-${index + 1}`} key={image.src} />
          ))}
          <div className="debate-numbers">
            <p><strong>36</strong> teams</p><p><strong>200+</strong> debaters</p><p><strong>10</strong> program members</p>
          </div>
          <Link className="mag-arrow-link" href={`/work/${debate.slug}`}>Read the debate chapter <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="mag-chapter community-issue" aria-labelledby="community-title">
        <div className="community-grid frame">
          <header className="community-head">
            <p className="mag-folio">04 / COMMUNITY FIELD NOTES</p>
            <h2 id="community-title">Diary of the<br /><em>Blue Rose</em></h2>
            <p>{community.summary}</p>
            <Link className="mag-arrow-link" href={`/work/${community.slug}`}>Open the field notes <span aria-hidden="true">↗</span></Link>
          </header>
          <div className="community-photos">
            {communityArchive.map((image, index) => (
              <MediaPlate image={image} label="Blue Rose" className={`community-photo community-photo-${index + 1}`} key={image.src} />
            ))}
          </div>
          <aside className="community-note"><p>Attention<br />into action.</p><span>20 members · 15 collaborators · 3 initiatives</span></aside>
        </div>
      </section>

      <section className="mag-chapter performance-issue" aria-labelledby="performance-title">
        <div className="performance-heading frame">
          <p className="mag-folio">INTERLUDE / PERFORMANCE & MOVEMENT</p>
          <h2 id="performance-title">Ideas can<br /><em>move.</em></h2>
          <p>
            A Teachers’ Day performance honoring sanitation workers — ensemble
            rhythm, stage presence and communication without a microphone.
          </p>
        </div>
        <div className="performance-strip" aria-hidden="true">ENERGY / TIMING / TEAMWORK / STORY / ENERGY / TIMING / TEAMWORK</div>
        <div className="performance-archive frame">
          {flashmobArchive.map((image, index) => (
            <MediaPlate
              image={image}
              label="Flashmob"
              className={`performance-shot performance-shot-${(index % 4) + 1}`}
              key={image.src}
            />
          ))}
        </div>
        <div className="performance-foot frame">
          <p>Vietnamese Teachers’ Day · 2025</p>
          <p>Team First Prize</p>
          <Link className="mag-arrow-link" href="/about#beyond-the-brief">See performance in context <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="mag-chapter film-issue" aria-labelledby="film-title">
        <div className="film-topline frame"><p className="mag-folio">05 / FILM & PERFORMANCE</p><p>APRIL—MAY 2026 · LEAD ACTRESS</p></div>
        <div className="film-marquee" aria-hidden="true">DISABLED / FROM POEM TO PERFORMANCE</div>
        <div className="film-frame frame">
          <div className="film-stills">
            {filmArchive.map((image, index) => (
              <MediaPlate image={image} label="Disabled" className={`film-still film-still-${index + 1}`} key={image.src} />
            ))}
          </div>
          <div className="film-copy">
            <h2 id="film-title">From poem<br />to performance.</h2>
            <p>{film.summary}</p>
            <p className="film-credit">Best Creative Adaptation · Best Actress nomination</p>
            <Link className="mag-arrow-link" href={`/work/${film.slug}`}>View the film chapter <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="mag-colophon frame">
        <p className="mag-folio">END NOTE / 2026</p>
        <h2>Stories deserve to be seen,<br />heard, and remembered.</h2>
        <div>
          <p>A student at Le Hong Phong High School for the Gifted, exploring Communication through culture, illustration and shared experiences.</p>
          <Link className="button" href="/work">Explore all projects ↗</Link>
          <Link className="mag-arrow-link" href="/about">Meet Như Ngọc ↗</Link>
        </div>
      </section>
    </>
  );
}
