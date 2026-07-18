import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

async function read(path) {
  return readFile(projectFile(path), "utf8");
}

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("security-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("sets the defensive response baseline and audit breadcrumb", async () => {
  const response = await render();
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.equal(response.headers.get("cross-origin-opener-policy"), "same-origin");
  assert.equal(response.headers.get("x-blc-field-note"), "/.well-known/security.txt");

  const csp = response.headers.get("content-security-policy-report-only") ?? "";
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /object-src 'none'/);
  assert.doesNotMatch(csp, /unsafe-eval/);

  const html = await response.text();
  assert.match(html, /og:image/);
  assert.match(html, /\/og\.png/);
  assert.match(html, /summary_large_image/);
  assert.match(html, /blc-source-note/);
  assert.match(html, /#8377: suspicious link spotted/);
  assert.match(html, /#2821: safely checked and blocked/);
  assert.match(html, /verdict: no tokens were spilled/);
});

test("publishes a complete security.txt and bounded policy", async () => {
  const securityTxt = await read("public/.well-known/security.txt");
  const policy = await read("public/security-policy.txt");

  assert.match(securityTxt, /^Contact: mailto:/m);
  assert.match(securityTxt, /^Expires: 2027-/m);
  assert.match(securityTxt, /^Canonical: https:\/\/bitpixi-learns-cybersec\.bitpixi\.chatgpt\.site\/.well-known\/security\.txt$/m);
  assert.match(securityTxt, /^Policy: https:/m);
  assert.match(securityTxt, /^Hiring: https:/m);
  assert.match(policy, /low-rate, non-destructive/i);
  assert.match(policy, /denial-of-service/i);
  assert.match(policy, /third-party origin/i);
  assert.match(policy, /fictional field note/i);
  assert.match(policy, /no submission endpoint/i);
});

test("keeps the character Easter egg short, safe and self-contained", async () => {
  const fieldNote = JSON.parse(await read("public/field-notes/incident-8377.json"));
  const serialised = JSON.stringify(fieldNote);

  assert.equal(fieldNote.easter_egg, true);
  assert.equal(fieldNote.cast["#8377"], "human phishing-link investigator");
  assert.equal(fieldNote.cast["#2821"], "systems verifier");
  assert.equal(fieldNote.exchange.length, 4);
  assert.match(fieldNote.finding, /Nobody clicked\./);
  assert.equal(fieldNote.flag, "BLC{spill_the_tea_not_the_tokens}");
  assert.ok(fieldNote.tea_cup.length >= 6);
  assert.doesNotMatch(serialised, /events|answer_sha256|detection_artifacts/);
  assert.doesNotMatch(serialised, /alex[._ ]chen|finance\.user/i);
  assert.doesNotMatch(serialised, /\u2014/);
});

test("documents privacy boundaries and known gaps", async () => {
  const controls = JSON.parse(await read("public/field-notes/2821.json"));

  assert.equal(controls.data_collection.application_analytics, false);
  assert.equal(controls.data_collection.easter_egg_submissions, false);
  assert.equal(controls.data_collection.browser_progress.leaves_device, false);
  assert.match(controls.browser_controls.csp.mode, /report-only/i);
  assert.ok(controls.known_gaps.length >= 3);
});
