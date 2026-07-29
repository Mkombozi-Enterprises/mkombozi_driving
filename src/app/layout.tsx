import type { Metadata } from "next";
import { Barlow_Condensed, Figtree } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Mkombozi Driving School | NTSA-Certified Driving Lessons in Kenya",
  description:
    "Mkombozi Driving School — NTSA-certified instructors, manual & automatic lessons, motorcycle, truck and PSV training, flexible schedules and honest pricing in Kakamega County, Kenya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body
        style={
          {
            ["--font-display" as string]: "var(--font-display-loaded), 'Arial Narrow', sans-serif",
            ["--font-body" as string]: "var(--font-body-loaded), system-ui, sans-serif",
            ["--font-head" as string]: "var(--font-display-loaded), 'Arial Narrow', sans-serif",
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
