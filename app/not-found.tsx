import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-shell">
      <p className="eyebrow">FIELD NOTE 404 / SAFE FAILURE</p>
      <h1>Good recon. The route needs a patch.</h1>
      <p>
        This route does not exist. #8377 found the friction, #2821 logged it,
        and the learner gets to restart.
      </p>
      <div className="not-found-actions">
        <Link href="/">Return to the fieldbook</Link>
        <a href="/.well-known/security.txt">Read the disclosure path</a>
      </div>
      <small>FIELD NOTE · BLC-404</small>
    </main>
  );
}
