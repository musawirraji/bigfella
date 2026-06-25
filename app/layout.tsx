import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Bigfella Auto Express — Style Guide",
  description: "Design system specimen for Bigfella Auto Express. Cinematic, concierge, dark-luxury auto transport.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Display: Clash Display (commanding) · Text/UI: Satoshi — both free via Fontshare. NOT Inter/Fraunces. */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700,900&display=swap"
        />
        {/* Mono: JetBrains Mono — tabular figures for numbers/timers. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
