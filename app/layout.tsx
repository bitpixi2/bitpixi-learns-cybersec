import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BITPIXI LEARNS CYBERSEC",
  description:
    "A personal Australian study map for cyber security, authorised testing and responsible AI leadership.",
  icons: {
    icon: "/nft/2821.png",
    shortcut: "/nft/2821.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
