"use client";
import { useRef, useState } from "react";
import type { GalleryItem } from "@/data/media";
import { MediaPlate } from "./media";
export function Gallery({ items }: { items: GalleryItem[] }) {
  const [group, setGroup] = useState("All");
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const groups = ["All", ...new Set(items.map((i) => i.group))];
  const shown = items.filter((i) => group === "All" || i.group === group);
  const selected = shown[index] ?? shown[0];
  const move = (step: number) =>
    setIndex((i) => (i + step + shown.length) % shown.length);
  function open(i: number, button: HTMLButtonElement) {
    setIndex(i);
    trigger.current = button;
    dialog.current?.showModal();
  }
  return (
    <div className="gallery">
      <div
        className="gallery-filters"
        role="group"
        aria-label="Artwork categories"
      >
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            aria-pressed={group === g}
            onClick={() => {
              setGroup(g);
              setIndex(0);
            }}
          >
            {g}
          </button>
        ))}
      </div>
      <p className="gallery-count" aria-live="polite">
        {shown.length}{" "}
        {items.some((i) => i.image) ? "selected works" : "preview categories"}
      </p>
      <div className="gallery-grid">
        {shown.map((item, i) => (
          <article className="gallery-item" key={item.id}>
            <button
              type="button"
              className="gallery-open"
              onClick={(e) => open(i, e.currentTarget)}
              aria-label={`Open ${item.title}`}
            >
              <MediaPlate
                image={item.image}
                label={
                  item.group === "Editorial Portraits"
                    ? "Portraits"
                    : item.group === "Character Systems"
                      ? "Expressions"
                      : item.group === "Applied Illustration"
                        ? "Objects"
                        : "Stories"
                }
                kind="Artwork"
                showCaption={false}
              />
              <span className="gallery-title">
                {item.title}
                <span aria-hidden="true"> ↗</span>
              </span>
            </button>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        aria-labelledby="gallery-dialog-title"
        className="lightbox"
        onClose={() => trigger.current?.focus()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
          if (e.key === "Tab") {
            const buttons = e.currentTarget.querySelectorAll<HTMLButtonElement>(
              "button:not(:disabled)",
            );
            const first = buttons[0],
              last = buttons[buttons.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="lightbox-body">
          <div className="lightbox-top">
            <p>{selected.group}</p>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close gallery"
            >
              Close ×
            </button>
          </div>
          <MediaPlate
            key={selected.id}
            image={selected.image}
            label={selected.group}
            kind="Artwork"
            showCaption={false}
          />
          <h3 id="gallery-dialog-title">{selected.title}</h3>
          <p>{selected.description}</p>
          <div className="lightbox-controls">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous artwork"
            >
              ← Previous
            </button>
            <span aria-live="polite">
              {index + 1} / {shown.length}
            </span>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next artwork"
            >
              Next →
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
