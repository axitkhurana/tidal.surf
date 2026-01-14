import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Tidal Surf Collective",
  description: "Sunburnt romantics of silicon. Surfers of the synthetic tide. Code cowboys in pastel polos.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
