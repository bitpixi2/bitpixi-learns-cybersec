import type { Metadata } from "next";
import "./globals.css";

const sourceEasterEgg = String.raw`
       ><(((('>

  #8377: suspicious link spotted
  #2821: safely checked and blocked

  verdict: no tokens were spilled
`;

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
      "Human signal, safe verification and phishing awareness from an Australian cyber security learning roadmap.",
    images: [
      {
        url: "/og.png",
        width: 1734,
        height: 907,
        alt: "Bitpixi Learns Cybersec: human signal and safe phishing-link verification",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITPIXI LEARNS CYBERSEC",
    description:
      "Human signal, safe verification and phishing awareness.",
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
