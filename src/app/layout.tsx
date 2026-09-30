import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import "yet-another-react-lightbox/styles.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sammonscreative.com"),
  title: {
    default: "Sammons Creative — Images, Ideas, Impact",
    template: "%s · Sammons Creative",
  },
  description:
    "Photography and graphic design by Sammons Creative — sports, form & structure, and design work rendered as a hand-flipped album.",
  openGraph: {
    title: "Sammons Creative — Images, Ideas, Impact",
    description:
      "Photography and graphic design portfolio by Sammons Creative.",
    url: "https://sammonscreative.com",
    siteName: "Sammons Creative",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sammons Creative — Images, Ideas, Impact",
    description:
      "Photography and graphic design portfolio by Sammons Creative.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
