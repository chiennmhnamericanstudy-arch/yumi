"use client";
import Image from "next/image";
import { useState } from "react";
import type { ApprovedMedia } from "@/data/media";
export function MediaPlate({
  image,
  label,
  kind = "Documentation",
  className = "",
  priority = false,
  showCaption = true,
}: {
  image?: ApprovedMedia;
  label: string;
  kind?: string;
  className?: string;
  priority?: boolean;
  showCaption?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={`media-figure ${className}`}>
      {image && !failed ? (
        <div className="image-wrap">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 767px) 92vw, 60vw"
            preload={priority}
            onError={() => setFailed(true)}
          />
        </div>
      ) : (
        <div className="media-plate">
          <span className="plate-word" aria-hidden="true">
            {label}
          </span>
          <span className="plate-note">
            {failed ? "Image unavailable" : "Editorial preview"}
            <br />
            {kind} {failed ? "could not load" : "awaiting approval"}
          </span>
        </div>
      )}
      {showCaption &&
        (image && !failed ? (
          <figcaption>
            {image.alt}
            {image.credit ? ` · ${image.credit}` : ""}
          </figcaption>
        ) : (
          <figcaption>
            {failed
              ? "The project remains available below."
              : "Preview placeholder — no student image is displayed."}
          </figcaption>
        ))}
    </figure>
  );
}
