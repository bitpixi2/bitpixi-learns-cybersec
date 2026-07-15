"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

type Track = "foundation" | "systems" | "human" | "leadership";

type Mission = {
  id: string;
  title: string;
  provider: string;
  note: string;
  signal: string;
  href: string;
  track: Track;
  optional?: boolean;
};

type MissionGroup = {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  missions: Mission[];
};

const STORAGE_KEY = "bitpixi-cybersec-progress-v1";

const missionGroups: MissionGroup[] = [
  {
    id: "foundation",
    kicker: "PHASE 01 / GET GROUNDED",
    title: "Australian foundations",
    intro:
      "Start with the free work already on your desk, then add an employer-readable baseline.",
    missions: [
      {
        id: "tafe-linux",
        title: "Introduction to Linux",
        provider: "TAFE NSW",
        note: "Free, self-paced microskill · command line, distributions and system basics.",
        signal: "3–5 hrs · $0",
        href: "https://store.training.tafensw.edu.au/product/introduction-to-linux/",
        track: "foundation",
      },
      {
        id: "tafe-data-centres",
        title: "Introduction to Data Centres",
        provider: "TAFE NSW",
        note: "Free, self-paced microskill · infrastructure, operations and sustainability.",
        signal: "3–5 hrs · $0",
        href: "https://store.training.tafensw.edu.au/product/introduction-to-data-centres/",
        track: "foundation",
      },
      {
        id: "google-cyber",
        title: "Google Cybersecurity Certificate",
        provider: "Google",
        note: "Structured analyst training in Linux, SQL, Python, SIEM and incident response.",
        signal: "GUIDED PATH",
        href: "https://grow.google/certificates/cybersecurity/",
        track: "foundation",
      },
      {
        id: "isc2-cc",
        title: "Certified in Cybersecurity (CC)",
        provider: "ISC2",
        note: "Entry-level, no-experience credential with ISO/IEC 17024 accreditation.",
        signal: "FIRST EXAM",
        href: "https://www.isc2.org/certifications/cc",
        track: "foundation",
      },
      {
        id: "security-plus",
        title: "Security+",
        provider: "CompTIA",
        note: "Vendor-neutral security baseline widely understood by technical employers.",
        signal: "CORE BADGE",
        href: "https://www.comptia.org/en-us/certifications/security/",
        track: "foundation",
      },
      {
        id: "tafe-cert-iv",
        title: "Certificate IV in Cyber Security",
        provider: "TAFE NSW",
        note: "The formal Australian route: nationally recognised training. Check intake availability.",
        signal: "AQF PATH",
        href: "https://www.tafensw.edu.au/course-areas/information-and-communication-technology/courses/certificate-iv-in-cyber-security--22603VIC-01",
        track: "foundation",
        optional: true,
      },
    ],
  },
  {
    id: "systems",
    kicker: "PHASE 02 / WOODSY DUSTY",
    title: "Systems + authorised testing",
    intro:
      "Build the code, cloud and web-testing side in legal labs first, then prove it with practical exams.",
    missions: [
      {
        id: "sc-900",
        title: "Security, Compliance & Identity Fundamentals",
        provider: "Microsoft · SC-900",
        note: "Zero Trust, Entra, Defender, Sentinel and Microsoft compliance foundations.",
        signal: "CLOUD START",
        href: "https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/",
        track: "systems",
      },
      {
        id: "sc-200",
        title: "Security Operations Analyst Associate",
        provider: "Microsoft · SC-200",
        note: "Threat hunting, incident response, Defender XDR, Sentinel and KQL.",
        signal: "SOC TRACK",
        href: "https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst/",
        track: "systems",
      },
      {
        id: "portswigger-academy",
        title: "Web Security Academy",
        provider: "PortSwigger",
        note: "Free, legal labs for real web vulnerability classes and Burp Suite technique.",
        signal: "FREE LABS",
        href: "https://portswigger.net/web-security",
        track: "systems",
      },
      {
        id: "tryhackme",
        title: "TryHackMe learning paths",
        provider: "TryHackMe",
        note: "Beginner-friendly, guided offensive and defensive security rooms with browser-based hands-on labs.",
        signal: "LAB PLATFORM",
        href: "https://tryhackme.com/",
        track: "systems",
        optional: true,
      },
      {
        id: "bscp",
        title: "Burp Suite Certified Practitioner",
        provider: "PortSwigger · BSCP",
        note: "Practical web-security credential after the Academy practitioner labs.",
        signal: "WEB PROOF",
        href: "https://portswigger.net/web-security/certification",
        track: "systems",
      },
      {
        id: "crest",
        title: "CPSA → Registered Penetration Tester",
        provider: "CREST",
        note: "A strong Australia/NZ-facing pathway from practitioner theory into practical testing.",
        signal: "AU / NZ",
        href: "https://www.crest-approved.org/skills-certifications-careers/crest-certifications/",
        track: "systems",
      },
      {
        id: "oscp",
        title: "PEN-200 + OSCP+",
        provider: "OffSec",
        note: "Advanced hands-on penetration testing, reporting and adversarial problem solving.",
        signal: "LATER GAME",
        href: "https://www.offsec.com/courses/pen-200/",
        track: "systems",
        optional: true,
      },
    ],
  },
  {
    id: "human",
    kicker: "PHASE 03 / GUARDED OF VIBRANT",
    title: "Human layer + social engineering",
    intro:
      "Study the bait, the workaround and the evidence trail—without targeting a real person unless a signed scope says you may.",
    missions: [
      {
        id: "sans-sec467",
        title: "Social Engineering for Security Professionals",
        provider: "SANS · SEC467",
        note: "Professional methodology for authorised social-engineering assessments and countermeasures.",
        signal: "SPECIALIST",
        href: "https://www.sans.org/cyber-security-courses/social-engineering-security-professionals/",
        track: "human",
        optional: true,
      },
      {
        id: "giac-gosi",
        title: "Open Source Intelligence",
        provider: "GIAC · GOSI",
        note: "OSINT collection, analysis, privacy, OPSEC and reporting for people and organisations.",
        signal: "RESEARCH",
        href: "https://www.giac.org/certifications/open-source-intelligence-gosi",
        track: "human",
        optional: true,
      },
    ],
  },
  {
    id: "leadership",
    kicker: "PARALLEL TRACK / AI COMMAND",
    title: "AI leadership quartet",
    intro:
      "Learn the same transformation problem through four lenses: adoption, business value, cloud capability and governance.",
    missions: [
      {
        id: "ms-ai-leader",
        title: "AI Transformation Leader",
        provider: "Microsoft · AB-731",
        note: "Lead AI adoption, business-process change and responsible use without a coding prerequisite.",
        signal: "LEADERSHIP",
        href: "https://learn.microsoft.com/en-us/credentials/certifications/ai-transformation-leader/",
        track: "leadership",
      },
      {
        id: "google-ai-leader",
        title: "Generative AI Leader",
        provider: "Google Cloud",
        note: "Business-level gen-AI strategy, responsible adoption and Google Cloud offerings.",
        signal: "STRATEGY",
        href: "https://cloud.google.com/learn/certification/generative-ai-leader",
        track: "leadership",
      },
      {
        id: "aws-ai-practitioner",
        title: "Certified AI Practitioner",
        provider: "Amazon Web Services",
        note: "AI/ML, foundation models, responsible AI, security and governance on AWS.",
        signal: "CLOUD AI",
        href: "https://aws.amazon.com/certification/certified-ai-practitioner/",
        track: "leadership",
      },
      {
        id: "aigp",
        title: "AI Governance Professional",
        provider: "IAPP · AIGP",
        note: "AI lifecycle governance, risk, law, safety and trustworthy deployment.",
        signal: "GOVERNANCE",
        href: "https://iapp.org/certify/aigp",
        track: "leadership",
      },
    ],
  },
];

const watchlist = [
  {
    title: "National Anti-Scam Centre",
    note: "Current scam data, technology and AI tactics targeting Australians.",
    href: "https://www.scamwatch.gov.au/stop-check-protect/help-to-spot-and-avoid-scams/how-scammers-use-technology-and-ai",
  },
  {
    title: "ASD Annual Cyber Threat Report",
    note: "The Australian threat picture, including criminal use of generative AI.",
    href: "https://www.cyber.gov.au/about-us/view-all-content/reports-and-statistics/annual-cyber-threat-report-2024-2025",
  },
  {
    title: "Australian Institute of Criminology",
    note: "Research on AI-enabled crime, impersonation, fraud and victimisation.",
    href: "https://www.aic.gov.au/publications/sb/sb51",
  },
  {
    title: "eSafety deepfake research",
    note: "Australian harms, detection limits and safety responses for synthetic media.",
    href: "https://www.esafety.gov.au/industry/tech-trends-and-challenges/deepfakes",
  },
  {
    title: "OAIC AI + privacy guidance",
    note: "How Australian privacy obligations apply to AI products and personal information.",
    href: "https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products",
  },
  {
    title: "National AI Centre",
    note: "Practical Australian guidance for responsible organisational AI adoption.",
    href: "https://www.industry.gov.au/science-technology-and-innovation/technology/artificial-intelligence/national-ai-centre",
  },
];

const allMissions = missionGroups.flatMap((group) => group.missions);

export default function Home() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const restoreProgress = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setCompleted(new Set(JSON.parse(saved) as string[]));
        }
      } catch {
        // A blocked storage setting should never block the study plan itself.
      }
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(restoreProgress);
  }, []);

  const progress = useMemo(
    () => Math.round((completed.size / allMissions.length) * 100),
    [completed],
  );

  function toggleMission(id: string) {
    setCompleted((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // Progress still works for the current visit when storage is unavailable.
      }
      return next;
    });
  }

  function resetProgress() {
    setCompleted(new Set());
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // No action required.
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="BITPIXI Learns Cybersec home">
          B<span>L</span><em>C</em>
        </a>
        <div className="badge-strip" aria-label="Project badges">
          <a className="owlsec-badge" href="https://owlsec.ai/" target="_blank" rel="noreferrer" aria-label="OwlSec active learner">
            <span className="owl-eyes" aria-hidden="true"><i /><i /></span>
            <span><strong>OWLSEC</strong>ACTIVE LEARNER</span>
          </a>
          <span className="badge-pipe" aria-hidden="true">|</span>
          <a className="maker-badge" href="https://discord.gg/DSnxTcqA5F" target="_blank" rel="noreferrer" title="Join Kanga Root on Discord">
            <img src="/stickers/kanga-root.webp" alt="Kanga Root Discord" />
          </a>
          <span className="badge-pipe" aria-hidden="true">|</span>
          <a className="maker-badge" href="#mission-tafe-linux" title="Made with Linux"><img src="/stickers/made-with-linux.png" alt="Made with Linux" /></a>
          <span className="badge-pipe" aria-hidden="true">|</span>
          <a className="maker-badge" href="https://openai.com/codex" target="_blank" rel="noreferrer" title="Made with Codex"><img src="/stickers/codex-color.png" alt="Made with Codex" /></a>
          <span className="badge-pipe" aria-hidden="true">|</span>
          <a className="maker-badge" href="https://openclaw.ai/" target="_blank" rel="noreferrer" title="Made with OpenClaw"><img src="/stickers/openclaw-icon.png" alt="Made with OpenClaw" /></a>
        </div>
        <nav className="top-nav" aria-label="Primary navigation">
          <a href="#top">Home</a>
          <a href="#identity">Identity</a>
          <a href="#owlsec">OwlSec</a>
          <a href="#roadmap">Checklist</a>
          <a href="#pathway">Pathway</a>
          <a href="#reading">Reading</a>
          <a href="#watchlist">Watchlist</a>
          <a href="#merch">Field kit</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">PERSONAL STUDY MAP · MELBOURNE, AUSTRALIA</p>
          <h1>BITPIXI<br /><span className="hero-learns">LEARNS</span><br /><span>CYBERSEC</span></h1>
          <p className="hero-deck">
            My personal learning plan for cyber security, authorised testing and
            responsible AI leadership.
          </p>
          <div className="hero-meta">
            <span>37.8136° S</span>
            <span>144.9631° E</span>
            <span>SECTOR AU</span>
          </div>
        </div>

        <div className="broker-stage" aria-label="Authentic CyberBroker artwork">
          <article className="broker-card broker-card-woodsy">
            <a className="broker-source-link" href="https://www.cyberbrokers.com/" target="_blank" rel="noreferrer">CyberBrokers ↗</a>
            <img
              src="/nft/2821.png"
              alt="Woodsy Dusty, CyberBroker 2821, in dark cyber outerwear with a glowing blue mask"
              fetchPriority="high"
            />
            <div className="broker-label">
              <p>TECHNICAL LAYER · #2821</p>
              <h2>Woodsy Dusty</h2>
              <span>Talent: Hacker · systems + agentic security</span>
            </div>
          </article>
          <article className="broker-card broker-card-guarded">
            <a className="broker-source-link" href="https://www.cyberbrokers.com/" target="_blank" rel="noreferrer">CyberBrokers ↗</a>
            <img
              src="/nft/8377.png"
              alt="Guarded of Vibrant, CyberBroker 8377, in vivid pink fishing gear with a cyber fishing pole"
              fetchPriority="high"
            />
            <div className="broker-label">
              <p>HUMAN LAYER · #8377</p>
              <h2>Guarded of Vibrant</h2>
              <span>Talent: Phisherman · people + process safety</span>
            </div>
          </article>
        </div>
      </section>

      <section className="field-marks" id="identity" aria-label="Identity marks">
        <div className="section-index">00 / IDENTITY MARKS</div>
        <div className="mark-row">
          <figure className="art-mark mark-woodsy-face">
            <img src="/tokens/code-guard.png" alt="Code guard identity token" />
            <figcaption>CODE GUARD</figcaption>
          </figure>
          <figure className="art-mark mark-woodsy-terminal">
            <img src="/tokens/pipeline.png" alt="Pipeline identity token" />
            <figcaption>PIPELINE</figcaption>
          </figure>
          <figure className="art-mark mark-guarded-face">
            <img src="/tokens/human-signal.png" alt="Human signal identity token" />
            <figcaption>HUMAN SIGNAL</figcaption>
          </figure>
          <figure className="art-mark mark-guarded-kit">
            <img src="/tokens/bait-map.png" alt="Bait map identity token" />
            <figcaption>BAIT MAP</figcaption>
          </figure>
        </div>
      </section>

      <aside className="owlsec-callout" id="owlsec" aria-label="OwlSec study community">
        <img src="/owlsec/owlsec-community.jpg" alt="OwlSec owl community artwork" />
        <div>
          <p className="eyebrow">OWLSEC / STUDY CREW</p>
          <h2>Learning with OwlSec</h2>
          <p>Keeping the learning public, accountable and connected to the community.</p>
          <a href="https://owlsec.ai/" target="_blank" rel="noreferrer">Visit OwlSec ↗</a>
        </div>
      </aside>

      <section className="roadmap" id="roadmap">
        <div className="roadmap-head">
          <div>
            <p className="eyebrow">MISSION LEDGER / SAVED ON THIS DEVICE</p>
            <h2>Learning checklist</h2>
            <p>
              Vendor certifications are industry credentials. The TAFE Certificate IV is
              the nationally recognised Australian qualification route.
            </p>
          </div>
          <div className="progress-block" aria-live="polite">
            <div className="progress-count">
              <strong>{hydrated ? completed.size : 0}</strong>
              <span>/ {allMissions.length} missions</span>
            </div>
            <div
              className="progress-track"
              style={{ "--progress": `${hydrated ? progress : 0}%` } as CSSProperties}
              aria-label={`${hydrated ? progress : 0}% complete`}
            >
              <span />
            </div>
            {completed.size > 0 && (
              <button className="reset-button" type="button" onClick={resetProgress}>
                Reset progress
              </button>
            )}
          </div>
        </div>

        <div className="mission-groups">
          {missionGroups.map((group, groupIndex) => (
            <section className={`mission-group track-${group.missions[0].track}`} key={group.id}>
              <div className="group-intro">
                <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                <div>
                  <p>{group.kicker}</p>
                  <h3>{group.title}</h3>
                  <small>{group.intro}</small>
                </div>
              </div>
              <div className="mission-list">
                {group.missions.map((mission, index) => {
                  const isDone = completed.has(mission.id);
                  return (
                    <article className={`mission ${isDone ? "is-done" : ""}`} id={`mission-${mission.id}`} key={mission.id}>
                      <label className="mission-toggle">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleMission(mission.id)}
                          aria-label={`Mark ${mission.title} complete`}
                        />
                        <span className="check-box" aria-hidden="true">{isDone ? "✓" : ""}</span>
                      </label>
                      <span className="mission-number">{String(index + 1).padStart(2, "0")}</span>
                      <img
                        className="mission-badge"
                        src={mission.id === "tafe-linux"
                          ? "/stickers/made-with-linux.png"
                          : mission.track === "human"
                            ? "/tokens/human-signal.png"
                            : mission.track === "systems"
                              ? "/tokens/code-guard.png"
                              : mission.track === "leadership"
                                ? "/tokens/pipeline.png"
                                : "/badges/blc-cybersec-badge.png"}
                        alt=""
                        aria-hidden="true"
                      />
                      <div className="mission-copy">
                        <p>{mission.provider}</p>
                        <h4>{mission.title}</h4>
                        <small>{mission.note}</small>
                      </div>
                      <div className="mission-action">
                        <span>{mission.optional ? "OPTIONAL · " : ""}{mission.signal}</span>
                        <a href={mission.href} target="_blank" rel="noreferrer">
                          Open official link <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="authorisation-gate" id="pathway">
        <img className="gate-symbol" src="/badges/blc-cybersec-badge.png" alt="BLC cyber security badge" />
        <div>
          <p className="eyebrow">BITPIXI / AUSTRALIAN LEARNING PATH</p>
          <h2>Build the right base</h2>
          <p>
            Start with Linux and infrastructure basics, then complete the Victorian IT pathway
            needed for Free TAFE before Cert IV Cyber Security. Add ISC2 CC or Security+ for a
            recognised baseline; use SC-900 and PortSwigger labs to turn it into practical work.
          </p>
        </div>
        <div className="gate-links">
          <a href="https://bitpixi.com/" target="_blank" rel="noreferrer">
            Visit bitpixi.com ↗
          </a>
          <a href="https://www.vu.edu.au/courses/certificate-iv-in-cyber-security-22603vic" target="_blank" rel="noreferrer">
            Victorian Cert IV options ↗
          </a>
        </div>
      </section>

      <section className="required-reading" id="reading">
        <div className="section-title">
          <p className="eyebrow">AUSTRALIAN SECURITY BASELINE</p>
          <h2>Required reading</h2>
        </div>
        <div className="reading-grid">
          <a href="https://www.cyber.gov.au/sites/default/files/2026-06/Information%20security%20manual%20%28June%202026%29.pdf" target="_blank" rel="noreferrer">
            <img src="/reading/ism-june-2026-cover.png" alt="First page of ASD's Information Security Manual, June 2026" />
            <div><span>ASD / JUNE 2026</span><h3>Information Security Manual</h3><p>Australia&apos;s risk-based security framework for IT and operational technology.</p></div>
          </a>
          <a href="https://www.cyber.gov.au/sites/default/files/2026-06/ISM%20June%202026%20changes%20%28June%202026%29.pdf" target="_blank" rel="noreferrer">
            <img src="/reading/ism-changes-june-2026-cover.png" alt="First page of ASD's Information Security Manual June 2026 changes" />
            <div><span>ASD / JUNE 2026</span><h3>ISM change notes</h3><p>A quick way to see what changed in the current release before you dive in.</p></div>
          </a>
          <a href="https://www.vic.gov.au/sites/default/files/2026-04/fact-sheet-digital-technologies-victorian-skills-plan-for-2025-into-2026.pdf" target="_blank" rel="noreferrer">
            <img src="/reading/vic-digital-skills-plan-2026-cover.png" alt="First page of the Victorian Skills Plan Digital Technologies fact sheet" />
            <div><span>VICTORIA / 2025–26</span><h3>Digital skills plan</h3><p>Current Victorian pathways for cyber, data centres and digital technology careers, including a Ballarat example.</p></div>
          </a>
          <a href="https://www.homeaffairs.gov.au/reports-and-pubs/PDFs/2023-2030-aus-cyber-security-strategy-discussion-paper/Victorian-Government-submission.PDF" target="_blank" rel="noreferrer">
            <img src="/reading/victoria-cyber-strategy-submission-cover.png" alt="First page of Victoria's Australian Cyber Security Strategy submission" />
            <div><span>VICTORIA / 2023</span><h3>Career pathways submission</h3><p>Victorian recommendations on regional access, work readiness, diverse cohorts and women in cyber careers.</p></div>
          </a>
          <a href="https://www.premier.vic.gov.au/sites/default/files/2022-05/220513%20-%20Creating%20More%20Jobs%20For%20Women%20In%20Cyber%20Security.pdf" target="_blank" rel="noreferrer">
            <img src="/reading/women-in-cyber-vic-2022-cover.png" alt="First page of the Victorian women in cyber security pilot brief" />
            <div><span>VICTORIA / 2022 ARCHIVE</span><h3>Women in cyber</h3><p>Historical brief on the Women in Security pilot, mentoring, internships and leadership pathways.</p></div>
          </a>
          <a href="https://www.industry.gov.au/sites/default/files/2025-12/national-ai-plan.pdf" target="_blank" rel="noreferrer">
            <img src="/reading/national-ai-plan-2025-cover.png" alt="First page of Australia's National AI Plan 2025" />
            <div><span>AUSTRALIA / 2025</span><h3>National AI Plan</h3><p>The federal plan for growing AI capability, spreading benefits and keeping Australians safe.</p></div>
          </a>
        </div>
      </section>

      <section className="watchlist" id="watchlist">
        <div className="section-title">
          <p className="eyebrow">GUARDED&apos;S WATCH DESK / AUSTRALIA</p>
          <h2>Watchlist</h2>
        </div>
        <div className="watch-grid">
          {watchlist.map((item, index) => (
            <a href={item.href} target="_blank" rel="noreferrer" key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.note}</p>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="merch" id="merch">
        <div className="section-title">
          <p className="eyebrow">FUTURE FIELD KIT / CONCEPTS ONLY</p>
          <h2>Merch concepts</h2>
          <p>Concept mockups based on the approved duo artwork. Nothing is for sale yet.</p>
        </div>
        <div className="merch-grid">
          <article className="merch-card">
            <img className="merch-real-image" src="/merch/keychain-approved.png" alt="Approved duo artwork as an acrylic keychain mockup" />
            <div className="merch-caption"><span>CONCEPT 01</span><h3>Acrylic keychain</h3><p>One clear-cut dual-character charm</p></div>
          </article>
          <article className="merch-card">
            <img className="merch-real-image" src="/merch/patch-approved.png" alt="Approved duo artwork as a circular embroidered patch mockup" />
            <div className="merch-caption"><span>CONCEPT 02</span><h3>Embroidered patch</h3><p>Round merrow edge · navy, cyan and pink threadwork</p></div>
          </article>
        </div>
      </section>

      <footer>
        <p>BITPIXI LEARNS CYBERSEC</p>
        <span className="footer-links">
          <a href="https://www.linkedin.com/in/bitpixi" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://bitpixi.com/" target="_blank" rel="noreferrer">Website</a>
          <a href="https://github.com/bitpixi2" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:Kasey.bitpixi@gmail.com">Email</a>
          <a href="https://x.com/bitpixi" target="_blank" rel="noreferrer">X</a>
        </span>
        <small>Personal field plan · updated July 2026</small>
      </footer>
    </main>
  );
}
