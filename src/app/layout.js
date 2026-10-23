// src/app/layout.js
// The shell around every page: sets the fonts, the page title and the <html>/<body> tags.
import { Young_Serif, Figtree } from "next/font/google"; // loads Google fonts and hosts them for us
import "./globals.css"; // our Tailwind + theme file

// Each font exposes a CSS variable that globals.css uses
const youngSerif = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--font-young-serif" });
const figtree = Figtree({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-figtree" });

// Page title and description (replaces the <title> in the old index.html)
export const metadata = {
  title: "Caffè Marlena | Italian café & kitchen",
  description: "Espresso, handmade pasta and dolci. Book a table at Caffè Marlena.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${youngSerif.variable} ${figtree.variable}`} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}