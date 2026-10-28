import generated from "./media.generated.json";
export type ApprovedMedia = {
  src: string;
  alt: string;
  section: string;
  width: number;
  height: number;
  credit?: string;
};
// Editorial sequence is independent of Drive filenames and audit CSV order.
const editorialOrder = [
  "4b38e74fde",
  "d08b7eb77a",
  "5b0577577d",
  "6e00bacfa3",
  "33117a7d9d",
  "8ef620e4be",
  "e0baaa42ba",
  "a81733c99d",
  "e356c4dc6d",
  "20da273949",
  "8ce10377e3",
  "7ae9e1aa96",
  "1aea7a9499",
  "75bd4df3b3",
  "2e827965ed",
  "2104dcaed0",
  "47cdc26ba6",
  "f71c304168",
  "2557b7bab0",
  "4dc3d72fa7",
  "cbb5e3a939",
  "f7ccb575ea",
  "bb499cfe5f",
  "5fc62e2edd",
  "bff093c47f",
  "18e811c851",
];
const sourceId = (item: ApprovedMedia) =>
  item.src.split("--").pop()?.replace(".webp", "") ?? "";
const rank = (item: ApprovedMedia) => {
  const index = editorialOrder.indexOf(sourceId(item));
  return index < 0 ? editorialOrder.length : index;
};
export const media: ApprovedMedia[] = [...generated].sort(
  (a, b) => rank(a) - rank(b),
);
export function mediaFor(section: string) {
  return media.filter((item) =>
    section.toLowerCase() === "yumi project"
      ? /^yumi(?:\s*\/| project$)/i.test(item.section)
      : item.section.toLowerCase() === section.toLowerCase(),
  );
}
export const galleryGroups = [
  "Editorial Portraits",
  "Character Systems",
  "Comics",
  "Applied Illustration",
] as const;
export type GalleryItem = {
  id: string;
  group: string;
  title: string;
  description: string;
  image?: ApprovedMedia;
};
const descriptions: Record<string, string> = {
  "Editorial Portraits":
    "Portraits, color studies and graphic compositions from the 2026 visual portfolio.",
  "Character Systems":
    "Expressive characters and stickers with recurring cobalt outlines.",
  Comics:
    "Moving, moving... explores a short narrative through six illustrated moments.",
  "Applied Illustration":
    "Character illustrations translated into keychain designs and everyday messages.",
};
const artworkTitles: Record<string, string> = {
  a81733c99d: "Color & character",
  e356c4dc6d: "The Beauty of a Woman",
  "7ae9e1aa96": "A cast of expressions",
  "2104dcaed0": "Moving, moving...",
  "47cdc26ba6": "A character in hand",
  f71c304168: "From drawing to object",
  "20da273949": "A world of characters",
  "8ce10377e3": "Portrait in line",
  "1aea7a9499": "Little moods",
  "75bd4df3b3": "Question mark",
  "2e827965ed": "A curious thought",
  "2557b7bab0": "Friend trio",
  "4dc3d72fa7": "Better together",
  cbb5e3a939: "Happy family",
};
export function galleryItems(): GalleryItem[] {
  const approved = media.filter((item) => /^yumi/i.test(item.section));
  if (approved.length)
    return approved.map((item, i) => {
      const group =
        galleryGroups.find((g) =>
          item.section.toLowerCase().includes(g.toLowerCase()),
        ) ?? "Editorial Portraits";
      return {
        id: `art-${i}`,
        group,
        title: artworkTitles[sourceId(item)] ?? item.alt,
        description: item.alt,
        image: item,
      };
    });
  return galleryGroups.map((group, i) => ({
    id: `preview-${i}`,
    group,
    title: group,
    description: descriptions[group],
  }));
}
