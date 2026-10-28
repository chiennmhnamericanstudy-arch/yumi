import type { Metadata, Viewport } from "next";
import "@fontsource-variable/syne";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
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
    <html lang="en">
      <body id="top">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="preview-banner">
          Local editorial preview · Student voice and publication review pending
        </div>
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
