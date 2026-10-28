import Link from "next/link";
export default function NotFound() {
  return (
    <div className="frame page-shell">
      <div className="page-intro">
        <h1>Page not found.</h1>
        <p>
          This page isn’t part of the portfolio. Explore the selected work to
          find a story.
        </p>
      </div>
      <Link className="button" href="/work">
        Back to the work ↗
      </Link>
    </div>
  );
}
