import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
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
  assert.match(html, /Woodsy Dusty/);
  assert.match(html, /Guarded of Vibrant/);
  assert.match(html, /OWLSEC/);
  assert.match(html, /\/nft\/2821\.png/);
  assert.match(html, /\/nft\/8377\.png/);
  assert.match(html, /The long way round/);
  assert.doesNotMatch(html, /Codex is working|react-loading-skeleton/);
});
