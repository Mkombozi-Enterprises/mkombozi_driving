import type { Metadata } from "next";
import { Barlow_Condensed, Caveat, Figtree } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-loaded",
  display: "swap",
});

const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-loaded",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-hand-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mkombozi Driving School | NTSA Driving Lessons Kakamega & Lumakanda",
  description:
    "NTSA-certified driving school in Lumakanda, Kakamega County. Category A (A1–A3 motorcycles) and Category B (B1–B3 light vehicles). Flexible schedules, M-Pesa, honest pricing.",
  keywords: [
    "driving school Kakamega",
    "NTSA driving school",
    "Class B driving lessons Lumakanda",
    "Category A motorcycle licence Kenya",
    "driving school near me Kenya",
    "Mkombozi Driving School",
  ],
  // Place files under public/ — see public/ICONS.md
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${hand.variable}`}>
      <body
        style={
          {
            ["--font-display" as string]:
              "var(--font-display-loaded), 'Arial Narrow', sans-serif",
            ["--font-body" as string]: "var(--font-body-loaded), system-ui, sans-serif",
            ["--font-head" as string]:
              "var(--font-display-loaded), 'Arial Narrow', sans-serif",
            ["--font-hand" as string]: "var(--font-hand-loaded), cursive",
          } as React.CSSProperties
        }
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
