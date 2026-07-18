import type { Metadata } from "next";
import "./globals.css";

const sourceEasterEgg = String.raw`
       ><(((('>

  #8377: missed Tuesday
  #2821: the schedule needs a patch

  verdict: patch the plan, not the person
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://bitpixi-learns-cybersec.bitpixi.chatgpt.site"),
  title: "BITPIXI LEARNS CYBERSEC",
  description:
    "A public Australian study map for women in cyber security, ADHD-friendly learning and responsible AI leadership.",
  openGraph: {
    type: "website",
    url: "/",
    title: "BITPIXI LEARNS CYBERSEC",
    description:
      "Women in cyber, ADHD-friendly learning and personal study tools built with Codex.",
    images: [
      {
        url: "/og.png",
        width: 1734,
        height: 907,
        alt: "Bitpixi Learns Cybersec: women in cyber and ADHD-friendly study tools built with Codex",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITPIXI LEARNS CYBERSEC",
    description:
      "Women in cyber, ADHD-friendly learning and personal study tools built with Codex.",
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
      <body>
        <template id="blc-source-note">{sourceEasterEgg}</template>
        {children}
      </body>
    </html>
  );
}
