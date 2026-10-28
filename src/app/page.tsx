import Link from "next/link";
import Image from "next/image";
import hatBoiMaskCutout from "@/assets/hat-boi-performer-v2.webp";
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
      <section className="editorial-hero frame" aria-labelledby="cover-title">
        <div className="hero-atmosphere" aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-meta">
          <p>Heritage in Motion<br />A communication portfolio</p>
          <p>Ho Chi Minh City, Vietnam<br />2024—2026</p>
        </div>
        <div className="hero-stage">
          <h1 id="cover-title" className="hero-title" lang="vi" aria-label="Như Ngọc — student communicator and illustrator">
            <span className="line"><span data-line style={{ "--i": 0 } as React.CSSProperties}>Như</span></span>
            <span className="line"><span data-line style={{ "--i": 1 } as React.CSSProperties}>Ngọc</span></span>
          </h1>
          <p className="hero-role-line">Student communicator &amp; illustrator</p>
          <Image
            className="hero-mask-cutout"
            src={hatBoiMaskCutout}
            alt="Ornate opera performer illustration with a blue-and-gold headdress and red costume."
            width={866}
            height={768}
            priority
            sizes="(max-width: 600px) 72vw, (max-width: 900px) 48vw, 31vw"
          />
          <MediaPlate
            image={mediaFor("Yumi / Editorial Portraits")[0]}
            label="Yumi"
            kind="Artwork"
            className="hero-artwork"
            showCaption={false}
            priority
          />
          <span className="hero-ornament" aria-hidden="true">戲</span>
        </div>
        <div className="hero-bottom">
          <p className="hero-identity"><strong>{student.name}</strong><span>Student communicator &amp; illustrator</span></p>
          <p className="hero-statement">Culture, image and voice — assembled as a living art magazine.</p>
          <Link className="mag-arrow-link" href="#co-sac-tan-thanh">Open the issue <span aria-hidden="true">↓</span></Link>
        </div>
      </section>

      <section id="co-sac-tan-thanh" className="mag-chapter heritage-issue" aria-labelledby="heritage-title">
        <div className="chapter-atmosphere" aria-hidden="true"><span /></div>
        <div className="chapter-overlay" aria-hidden="true" />
        <div className="heritage-issue-inner frame">
          <header className="heritage-editorial-head" data-reveal>
            <h2 id="heritage-title" lang="vi">Cổ Sắc<br />Tân Thanh</h2>
            <p className="heritage-deck">Giving tradition a new voice.</p>
          </header>
          <div className="heritage-mask-wall" data-reveal>
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
        <div className="chapter-atmosphere" aria-hidden="true"><span /></div>
        <div className="chapter-overlay" aria-hidden="true" />
        <header className="yumi-editorial-head frame" data-reveal>
          <p className="chapter-label">Illustration studio</p>
          <h2 id="yumi-title">Yumi<br />Studio</h2>
          <p>Yumi is a sketchbook left open: portraits, character systems, sequential stories and objects people can hold.</p>
          <Link className="mag-arrow-link" href={`/work/${yumi.slug}`}>Enter Yumi Studio <span aria-hidden="true">↗</span></Link>
        </header>
        <div className="yumi-tape" aria-hidden="true"><span className="marquee-track"><span>EXPRESSIONS / PORTRAITS / COMICS / LITTLE OBJECTS / EXPRESSIONS&nbsp;·&nbsp;</span><span aria-hidden="true">EXPRESSIONS / PORTRAITS / COMICS / LITTLE OBJECTS / EXPRESSIONS&nbsp;·&nbsp;</span></span></div>
        <div className="yumi-archive frame" data-reveal>
          {yumiArchive.map((image, index) => (
            <MediaPlate image={image} label="Yumi" kind="Artwork" className={`yumi-card yumi-card-${(index % 7) + 1}`} key={image.src} />
          ))}
        </div>
      </section>

      <section className="mag-chapter debate-issue frame" aria-labelledby="debate-title">
        <div className="chapter-atmosphere" aria-hidden="true"><span /></div>
        <div className="chapter-overlay" aria-hidden="true" />
        <header className="debate-head" data-reveal>
          <h2 id="debate-title">Ideas on<br /><span>stage.</span></h2>
          <p>{debate.summary}</p>
        </header>
        <div className="debate-broadsheet" data-reveal>
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
        <div className="chapter-atmosphere" aria-hidden="true"><span /></div>
        <div className="chapter-overlay" aria-hidden="true" />
        <div className="community-grid frame">
          <header className="community-head" data-reveal>
            <h2 id="community-title">Blue<br />Rose</h2>
            <p className="chapter-label">Community field notes</p>
            <p>{community.summary}</p>
            <Link className="mag-arrow-link" href={`/work/${community.slug}`}>Open the field notes <span aria-hidden="true">↗</span></Link>
          </header>
          <div className="community-photos" data-reveal>
            {communityArchive.map((image, index) => (
              <MediaPlate image={image} label="Blue Rose" className={`community-photo community-photo-${index + 1}`} key={image.src} />
            ))}
          </div>
          <aside className="community-note"><p>Attention<br />into action.</p><span>20 members · 15 collaborators · 3 initiatives</span></aside>
        </div>
      </section>

      <section className="mag-chapter performance-issue" aria-labelledby="performance-title">
        <div className="chapter-atmosphere" aria-hidden="true"><span /></div>
        <div className="chapter-overlay" aria-hidden="true" />
        <div className="performance-heading frame" data-reveal>
          <h2 id="performance-title">In<br />motion.</h2>
          <p>
            A Teachers’ Day performance honoring sanitation workers — ensemble
            rhythm, stage presence and communication without a microphone.
          </p>
        </div>
        <div className="performance-strip" aria-hidden="true"><span className="marquee-track"><span>ENERGY / TIMING / TEAMWORK / STORY / ENERGY / TIMING / TEAMWORK&nbsp;·&nbsp;</span><span aria-hidden="true">ENERGY / TIMING / TEAMWORK / STORY / ENERGY / TIMING / TEAMWORK&nbsp;·&nbsp;</span></span></div>
        <div className="performance-archive frame" data-reveal>
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
        <div className="chapter-atmosphere" aria-hidden="true"><span /></div>
        <div className="chapter-overlay" aria-hidden="true" />
        <div className="film-marquee" aria-hidden="true"><span className="marquee-track"><span>DISABLED / FROM POEM TO PERFORMANCE&nbsp;·&nbsp;</span><span aria-hidden="true">DISABLED / FROM POEM TO PERFORMANCE&nbsp;·&nbsp;</span></span></div>
        <div className="film-frame frame" data-reveal>
          <div className="film-stills">
            {filmArchive.map((image, index) => (
              <MediaPlate image={image} label="Disabled" className={`film-still film-still-${index + 1}`} key={image.src} />
            ))}
          </div>
          <div className="film-copy">
            <h2 id="film-title">Poem to<br />film.</h2>
            <p className="film-meta">April—May 2026 · Lead actress</p>
            <p>{film.summary}</p>
            <p className="film-credit">Best Creative Adaptation · Best Actress nomination</p>
            <Link className="mag-arrow-link" href={`/work/${film.slug}`}>View the film chapter <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="mag-colophon frame" data-reveal>
        <h2>Stories move<br />people.</h2>
        <div>
          <p>A student at Le Hong Phong High School for the Gifted, exploring Communication through culture, illustration and shared experiences.</p>
          <Link className="button" href="/work">Explore all projects ↗</Link>
          <Link className="mag-arrow-link" href="/about">Meet Như Ngọc ↗</Link>
        </div>
      </section>
    </>
  );
}
