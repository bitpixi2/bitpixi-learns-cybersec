import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the BITPIXI learning fieldbook", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>BITPIXI LEARNS CYBERSEC<\/title>/i);
  assert.match(html, /#2821/);
  assert.match(html, /#8377/);
  assert.match(html, /HACKER · TECHNICAL SYSTEMS/);
  assert.match(html, /PHISHER · PEOPLE SYSTEMS/);
  assert.match(html, /OwlSec/);
  assert.match(html, /\/nft\/2821\.png/);
  assert.match(html, /\/nft\/8377\.png/);
  assert.match(html, /Practical Threat Detection Engineering/);
  assert.match(html, /audit trail/i);
  assert.match(html, /blc-field-note/i);
  assert.doesNotMatch(html, /Codex is working|react-loading-skeleton/);
});

test("returns a safe custom 404", async () => {
  const response = await render("/definitely-not-a-real-route");
  assert.equal(response.status, 404);

  const html = await response.text();
  assert.match(html, /Good recon/i);
  assert.match(html, /Nothing spilled/i);
  assert.match(html, /kettle remains safely on/i);
  assert.doesNotMatch(html, /node_modules|file:\/\/|ERR_[A-Z_]+|\bat [A-Za-z_$][\w$]* \(/i);
});
