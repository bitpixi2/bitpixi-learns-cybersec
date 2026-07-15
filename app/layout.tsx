import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BITPIXI LEARNS CYBERSEC",
  description:
    "A personal Australian study map for cyber security, authorised testing and responsible AI leadership.",
  icons: {
    icon: "/badges/blc-cybersec-badge.png",
    shortcut: "/badges/blc-cybersec-badge.png",
    apple: "/badges/blc-cybersec-badge.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
