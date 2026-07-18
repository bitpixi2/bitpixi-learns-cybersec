import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-shell">
      <p className="eyebrow">FIELD NOTE 404 / SAFE FAILURE</p>
      <h1>Good recon. Nothing spilled.</h1>
      <p>
        This route does not exist. #8377 reported it, #2821 checked it, and the
        kettle remains safely on.
      </p>
      <div className="not-found-actions">
        <Link href="/">Return to the fieldbook</Link>
        <a href="/.well-known/security.txt">Read the disclosure path</a>
      </div>
      <small>FIELD NOTE · BLC-404</small>
    </main>
  );
}
