import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bitpixi-learns-cybersec.bitpixi.chatgpt.site"),
  title: "BITPIXI LEARNS CYBERSEC",
  description:
    "A public Australian study map for cyber security, authorised testing and responsible AI leadership.",
  openGraph: {
    type: "website",
    url: "/",
    title: "BITPIXI LEARNS CYBERSEC",
    description:
      "Blue-team field notes, authorised testing and detection-as-code from an Australian cyber security learning roadmap.",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "Bitpixi Learns Cybersec — blue-team field notes and Operation Catch & Release",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITPIXI LEARNS CYBERSEC",
    description:
      "Blue-team field notes, authorised testing and detection-as-code.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/badges/blc-cybersec-badge.png",
    shortcut: "/badges/blc-cybersec-badge.png",
    apple: "/badges/blc-cybersec-badge.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "blc-field-note": "/.well-known/security.txt",
    "security-contact": "mailto:Kasey.bitpixi@gmail.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
