import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-shell">
      <p className="eyebrow">CASE 404 / SAFE FAILURE</p>
      <h1>Good recon.</h1>
      <p>
        Missing is not the same as vulnerable. No stack trace, internal path or
        synthetic evidence escaped with this response.
      </p>
      <div className="not-found-actions">
        <Link href="/">Return to the fieldbook</Link>
        <a href="/.well-known/security.txt">Read the disclosure path</a>
      </div>
      <small>INCIDENT REF · BLC-404-2821</small>
    </main>
  );
}
