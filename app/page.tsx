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
  callout?: string;
  calloutLink?: { label: string; href: string; suffix?: string };
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
const X_SHARE_TEXT =
  "I saw @bitpixi's \"BITPIXI LEARNS CYBERSEC\" site featuring @CyberBrokers_ and built with #Codex.\n\nI was blown away! Maybe I should design my own personal study guides with @OpenAIDevs tools. 🤔\n\n-> https://bitpixi-learns-cybersec.bitpixi.chatgpt.site";
const X_SHARE_URL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(X_SHARE_TEXT)}`;

const missionGroupCatalog: MissionGroup[] = [
  {
    id: "foundation",
    kicker: "PHASE 02 / AUSTRALIAN FOUNDATIONS",
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
        id: "security-plus",
        title: "Security+",
        provider: "AWSN · CompTIA Security+",
        note: "Five-day SY0-701 training pathway with an exam voucher, subject to AWSN eligibility and cohort availability.",
        signal: "AWSN EOI",
        href: "https://www.awsn.org.au/Web/web/education-training/comp-tia-security-training.aspx",
        track: "human",
        callout: "SIGNED UP · Possible subsidised cost through AWSN.",
      },
      {
        id: "vu-cert-iii-it",
        title: "Certificate III in Information Technology",
        provider: "Victoria University · ICT30120",
        note: "Victorian foundation pathway and planned prerequisite before Certificate IV, with a cyber security stream covering systems, networking and virtual machines.",
        signal: "PREREQUISITE",
        href: "https://www.vu.edu.au/courses/certificate-iii-in-information-technology-ict30120",
        track: "human",
        callout: "WAIT FOR PR · Check Victorian funding and residency eligibility before enrolling.",
      },
      {
        id: "tafe-cert-iv",
        title: "Certificate IV in Cyber Security",
        provider: "Victoria University · 22603VIC",
        note: "Victorian nationally recognised training covering cyber security operations, networking, testing and incident response.",
        signal: "VIC PATH",
        href: "https://www.vu.edu.au/courses/certificate-iv-in-cyber-security-22603vic",
        track: "human",
        callout: "WAIT FOR PR · Check Victorian funding and residency eligibility before enrolling.",
        optional: true,
      },
    ],
  },
  {
    id: "systems",
    kicker: "PHASE 03 / SYSTEMS + TESTING",
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
        provider: "Microsoft · SC-200 · MAYBE",
        note: "Sentinel, Defender XDR and Defender for Cloud, Entra, KQL, incident response, threat hunting, detection engineering and automation.",
        signal: "REASSESS LATER",
        href: "https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst/",
        track: "systems",
        callout: "Reassess after Security+ and Centri. Updates on 28 July 2026.",
        optional: true,
      },
      {
        id: "centri-btja",
        title: "Blue Team Junior Analyst Pathway Bundle",
        provider: "Centri · BTJA",
        note: "Free six-course diagnostic covering OSINT, digital forensics, dark-web operations, threat hunting, vulnerability management and network analysis.",
        signal: "ADDED · FREE",
        href: "https://www.centri.org/courses/blue-team-junior-analyst-pathway-bundle",
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
    id: "leadership",
    kicker: "PHASE 01 / AI LEADERSHIP",
    title: "AI leadership quartet",
    intro:
      "Learn the same transformation problem through four lenses: adoption, business value, cloud capability and governance.",
    missions: [
      {
        id: "ms-secure-ai-applied",
        title: "Secure AI solutions in the cloud",
        provider: "Microsoft Applied Skills",
        note: "Configure AI-service security in Defender for Cloud, model guardrails and Microsoft Foundry environment security settings.",
        signal: "PLANNED · FREE",
        href: "https://learn.microsoft.com/en-us/credentials/applied-skills/secure-ai-solutions-in-the-cloud/",
        track: "leadership",
      },
      {
        id: "ms-mcp-applied",
        title: "Integrate MCP tools with agents in Microsoft Foundry",
        provider: "Microsoft Applied Skills",
        note: "Deploy a model, configure an agent, connect it to an MCP server, and monitor agent and tool usage.",
        signal: "PLANNED · FREE",
        href: "https://learn.microsoft.com/en-us/credentials/applied-skills/integrate-model-context-protocol-tools-with-agents-in-microsoft-foundry/",
        track: "leadership",
      },
      {
        id: "ms-ab-620",
        title: "AI Agent Builder Associate",
        provider: "Microsoft · AB-620",
        note: "Build and integrate enterprise agents with Copilot Studio, Microsoft Foundry, MCP, Agent2Agent, RAG, APIs, connectors and multi-agent solutions.",
        signal: "MAIN GOAL",
        href: "https://learn.microsoft.com/en-us/credentials/certifications/ai-agent-builder-associate/",
        track: "leadership",
        callout: "Funding plan · Attempt to win the ",
        calloutLink: {
          label: "contest voucher",
          href: "https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR_392dPJTjJGuDHL3BK1bNBUOFYyOVQ3TDVCQVI3TUxSWERSSjJMT1o4RyQlQCN0PWcu",
          suffix: " first.",
        },
      },
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

const missionGroups: MissionGroup[] = [
  missionGroupCatalog[2],
  missionGroupCatalog[0],
  missionGroupCatalog[1],
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
          <img src="/badges/blc-cybersec-badge.png" alt="BLC cyber security badge" />
        </a>
        <div className="badge-strip" aria-label="Project badges">
          <span className="badge-label">Sec Study Groups:</span>
          <a className="maker-badge" href="https://discord.com/invite/owls" target="_blank" rel="noreferrer" title="Join OwlSec on Discord">
            <img src="/stickers/owlsec-face.png" alt="OwlSec Discord" />
          </a>
          <a className="maker-badge" href="https://discord.gg/DSnxTcqA5F" target="_blank" rel="noreferrer" title="Join Kanga Root on Discord">
            <img src="/stickers/kanga-root.webp" alt="Kanga Root Discord" />
          </a>
          <span className="badge-pipe" aria-hidden="true">|</span>
          <span className="badge-label">Site made with:</span>
          <a className="maker-badge" href="https://openai.com/codex" target="_blank" rel="noreferrer" title="Made with Codex"><img src="/stickers/codex-color.png" alt="Made with Codex" /></a>
          <a className="maker-badge maker-badge-cyberbrokers" href="https://www.cyberbrokers.com/" target="_blank" rel="noreferrer" title="CyberBrokers"><img src="/stickers/cyberbrokers-logo.jpg" alt="CyberBrokers" /></a>
        </div>
        <nav className="top-nav" aria-label="Primary navigation">
          <a href="#roadmap">Study Plan</a>
          <a href="#pathway">Mission Statement</a>
          <a href="#reading">Reading List</a>
          <a href="#watchlist">Watch Desk</a>
          <a href="#merch">Merch Concepts</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>BITPIXI<br /><span className="hero-learns">LEARNS</span><br /><span>CYBERSEC</span></h1>
          <p className="hero-deck">
            My personal learning plan for cyber security, authorised testing and
            responsible AI leadership in Australia.
          </p>
          <div className="hero-meta">
            <span>37.8136° S</span>
            <span>144.9631° E</span>
            <span>SECTOR AU</span>
          </div>
        </div>

        <div className="broker-stage" aria-label="Authentic CyberBroker artwork">
          <article className="broker-card broker-card-guarded">
            <span className="broker-number">#8377</span>
            <span className="broker-role">PHISHER · PEOPLE SYSTEMS</span>
            <img
              src="/nft/8377.png"
              alt="CyberBroker 8377 in vivid pink fishing gear with a cyber fishing pole"
              fetchPriority="high"
            />
            <div className="broker-marks" aria-label="CyberBroker 8377 identity marks">
              <figure className="hero-mark hero-mark-primary">
                <img src="/tokens/human-signal.png" alt="Human signal identity token" />
                <figcaption>HUMAN SIGNAL</figcaption>
              </figure>
              <figure className="hero-mark hero-mark-secondary">
                <img src="/tokens/bait-map.png" alt="Bait map identity token" />
                <figcaption>BAIT MAP</figcaption>
              </figure>
            </div>
          </article>
          <article className="broker-card broker-card-woodsy">
            <span className="broker-number">#2821</span>
            <span className="broker-role">HACKER · TECHNICAL SYSTEMS</span>
            <img
              src="/nft/2821.png"
              alt="CyberBroker 2821 in dark cyber outerwear with a glowing blue mask"
              fetchPriority="high"
            />
            <div className="broker-marks" aria-label="CyberBroker 2821 identity marks">
              <figure className="hero-mark hero-mark-primary">
                <img src="/tokens/code-guard.png" alt="Code guard identity token" />
                <figcaption>CODE GUARD</figcaption>
              </figure>
              <figure className="hero-mark hero-mark-secondary">
                <img src="/tokens/pipeline.png" alt="Pipeline identity token" />
                <figcaption>PIPELINE</figcaption>
              </figure>
            </div>
          </article>
        </div>
      </section>

      <section className="roadmap" id="roadmap">
        <div className="roadmap-head">
          <div>
            <p className="eyebrow">LEARNING / STARTS JULY 2026</p>
            <h2>Study Plan</h2>
            <p>
              The Victorian Certificate III and IV are the nationally recognised Australian
              qualifications in this plan. Security+, Microsoft, Google and AWS credentials add
              employer-recognised specialisation, while the free courses and labs build practical evidence.
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
            <section className={`mission-group group-${group.id} track-${group.missions[0].track}`} key={group.id}>
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
                    <article className={`mission track-${mission.track} ${isDone ? "is-done" : ""}`} id={`mission-${mission.id}`} key={mission.id}>
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
                        {mission.callout && (
                          <span className="mission-callout">
                            {mission.callout}
                            {mission.calloutLink && (
                              <>
                                <a href={mission.calloutLink.href} target="_blank" rel="noreferrer">
                                  {mission.calloutLink.label}
                                </a>
                                {mission.calloutLink.suffix}
                              </>
                            )}
                          </span>
                        )}
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
          <p className="eyebrow">BITPIXI LEARNS CYBERSEC / MISSION STATEMENT</p>
          <h2>Keep Calm and Grep On</h2>
          <p>
            My goal is to help companies prevent, detect and respond to security incidents,
            especially as they adopt new AI tools, agentic pipelines and systems that allow AI to
            move data, decisions and actions into and out of secure sandboxes. This roadmap combines
            Victorian Certificate III and IV training, Security+, hands-on practice, cloud
            security, authorised web-security labs and AI leadership. It focuses on helping commercial
            organisations introduce AI responsibly, with strong controls around access, permissions,
            data flows and automated actions, while protecting their employees, customers, systems
            and data.
          </p>
        </div>
      </section>

      <section className="required-reading" id="reading">
        <div className="section-title">
          <p className="eyebrow">AUSTRALIAN SECURITY BASELINE</p>
          <h2>Reading List</h2>
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
          <p className="eyebrow">THE LATEST NEWS IN AUSTRALIA</p>
          <div className="section-title-heading">
            <h2>Watch Desk</h2>
            <img className="section-title-badge" src="/tokens/bait-map.png" alt="Bait Map identity badge" />
          </div>
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
          <p className="eyebrow">FUTURE FAN KIT / CONCEPTS ONLY</p>
          <h2>Merch Concepts</h2>
        </div>
        <div className="merch-grid">
          <article className="merch-card">
            <img className="merch-real-image" src="/merch/cyberbrokers-notebooks.png" alt="Two overlapping hardcover notebooks, each featuring one authentic CyberBrokers NFT cover" />
            <div className="merch-caption"><span>CONCEPT 01</span><h3>CyberBrokers notebooks</h3><p>Two notebooks · one authentic NFT cover each</p></div>
          </article>
          <article className="merch-card">
            <img className="merch-real-image" src="/merch/patch-approved.png" alt="Approved duo artwork as a circular embroidered patch mockup" />
            <div className="merch-caption"><span>CONCEPT 02</span><h3>Embroidered patch</h3><p>Round merrow edge · navy, cyan and pink threadwork</p></div>
          </article>
          <article className="merch-card">
            <img className="merch-real-image" src="/merch/linux-grep-mug.png" alt="Black ceramic mug printed with the Keep Calm and Grep On Linux artwork" />
            <div className="merch-caption"><span>CONCEPT 03</span><h3>Linux grep mug</h3><p>Gloss-black ceramic · crisp white command-line print</p></div>
          </article>
          <article className="merch-card">
            <img className="merch-real-image" src="/merch/blc-enamel-pin.png" alt="Circular hard-enamel pin featuring the BLC cyber security badge" />
            <div className="merch-caption"><span>CONCEPT 04</span><h3>BLC enamel pin</h3><p>Black nickel · navy, cyan and pink hard enamel</p></div>
          </article>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-title contact-title">
          <p className="eyebrow">FIND BITPIXI ONLINE</p>
          <h2>Contact</h2>
          <p>Follow my work, view current projects or get in touch directly.</p>
        </div>
        <div className="contact-grid" aria-label="Bitpixi social links">
          <a href="https://www.linkedin.com/in/bitpixi" target="_blank" rel="noreferrer">
            <span className="contact-mark">in</span><span><b>LinkedIn</b><small>/in/bitpixi</small></span><em>↗</em>
          </a>
          <a href="https://bitpixi.com/" target="_blank" rel="noreferrer">
            <span className="contact-mark">www</span><span><b>Website</b><small>bitpixi.com</small></span><em>↗</em>
          </a>
          <a href="https://github.com/bitpixi2" target="_blank" rel="noreferrer">
            <span className="contact-mark">gh</span><span><b>GitHub</b><small>@bitpixi2</small></span><em>↗</em>
          </a>
          <a href="mailto:Kasey.bitpixi@gmail.com">
            <span className="contact-mark">@</span><span><b>Email</b><small>Kasey.bitpixi@gmail.com</small></span><em>↗</em>
          </a>
          <a href="https://x.com/bitpixi" target="_blank" rel="noreferrer">
            <span className="contact-mark">x</span><span><b>X</b><small>@bitpixi</small></span><em>↗</em>
          </a>
        </div>
        <div className="x-share-card" aria-label="Share this website">
          <div className="share-copy">
            <span>SHARE IF YOU ENJOYED THIS</span>
            <p>
              I saw <a href="https://x.com/bitpixi" target="_blank" rel="noreferrer">@bitpixi</a>&apos;s &quot;BITPIXI LEARNS CYBERSEC&quot; site featuring <a href="https://x.com/CyberBrokers_" target="_blank" rel="noreferrer">@CyberBrokers_</a> and built with <a href="https://x.com/hashtag/Codex?src=hashtag_click" target="_blank" rel="noreferrer">#Codex</a>.
            </p>
            <p>
              I was blown away! Maybe I should design my own personal study guides with <a href="https://x.com/OpenAIDevs" target="_blank" rel="noreferrer">@OpenAIDevs</a> tools. 🤔
            </p>
            <p>-&gt; <a href="https://bitpixi-learns-cybersec.bitpixi.chatgpt.site">https://bitpixi-learns-cybersec.bitpixi.chatgpt.site</a></p>
          </div>
          <div className="share-actions">
            <a href={X_SHARE_URL} target="_blank" rel="noreferrer">
              Post on X <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <aside className="country-acknowledgement" aria-label="Acknowledgement of Country">
        <span>ACKNOWLEDGEMENT OF COUNTRY</span>
        <p>
          I acknowledge the Wurundjeri Woi-wurrung people of the Kulin Nation as the Traditional Owners of the land on which this site was created. I recognise their continuing connection to land, waters and culture, and pay my respects to Elders past and present.
        </p>
      </aside>

      <footer>
        <p>BITPIXI LEARNS CYBERSEC</p>
        <small>Personal field plan · updated July 2026</small>
      </footer>
    </main>
  );
}
