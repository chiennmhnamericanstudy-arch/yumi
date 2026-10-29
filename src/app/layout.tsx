import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Playfair_Display, Syne } from "next/font/google";
import "./globals.css";
import "./editorial-refinement.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-vietnamese",
});

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  display: "swap",
  variable: "--font-editorial",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-heritage-display",
});
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://127.0.0.1:3000"),
  title: {
    default: "Như Ngọc — Heritage in Motion",
    template: "%s | Như Ngọc",
  },
  description:
    "Do Tran Nhu Ngoc’s student portfolio in cultural communication, illustration, debate, community leadership and performance.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Như Ngọc — Heritage in Motion",
    description:
      "Communication, culture and creativity. A student portfolio by Do Tran Nhu Ngoc.",
    type: "website",
    locale: "en_US",
    siteName: "Như Ngọc",
  },
};
export const viewport: Viewport = { themeColor: "#F7F2EA" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${beVietnamPro.variable} ${syne.variable} ${playfairDisplay.variable}`}>
      <body id="top">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
