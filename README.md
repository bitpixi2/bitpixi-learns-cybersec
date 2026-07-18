# BITPIXI LEARNS CYBERSEC

[![Verify](https://github.com/bitpixi2/bitpixi-learns-cybersec/actions/workflows/ci.yml/badge.svg)](https://github.com/bitpixi2/bitpixi-learns-cybersec/actions/workflows/ci.yml)
[![CodeQL](https://github.com/bitpixi2/bitpixi-learns-cybersec/actions/workflows/codeql.yml/badge.svg)](https://github.com/bitpixi2/bitpixi-learns-cybersec/actions/workflows/codeql.yml)

A public Australian cyber-security and responsible AI leadership fieldbook.

The site pairs two authentic CyberBrokers: Woodsy Dusty (#2821) for the technical track and Guarded of Vibrant (#8377) for the human layer. They anchor an 18-mission study checklist, Australian research watchlist, authorised-testing boundary and a small audit trail.

Live site: [bitpixi-learns-cybersec.bitpixi.chatgpt.site](https://bitpixi-learns-cybersec.bitpixi.chatgpt.site)

## Audit trail

This repository is intentionally reviewable. Start with the live response headers or [`/.well-known/security.txt`](https://bitpixi-learns-cybersec.bitpixi.chatgpt.site/.well-known/security.txt), then find the short character exchange without testing real systems or third parties.

- [`SECURITY.md`](SECURITY.md) defines the authorised, low-rate and non-destructive testing scope.
- [`Woodsy-Dusty-threat-model.md`](Woodsy-Dusty-threat-model.md) documents trust boundaries, abuse paths and residual risks.
- [`public/field-notes/spill-the-tea.json`](public/field-notes/spill-the-tea.json) is a quick phishing-link Easter egg starring #8377 and #2821.

The Easter egg shows its flag directly and has no entry form. Study progress is non-sensitive browser-local state; the application has no user accounts, application database or analytics collector.

## Architecture

The application is a React 19 and Next.js 16 fieldbook compiled by Vinext for a Cloudflare Worker-compatible runtime. The Worker centralises security headers and dispatches the page renderer and allowlisted image optimisation. Public assets are immutable source artifacts; progress remains in `localStorage` on the visitor's own device.

The original CyberBrokers SVGs, PNG renders and metadata snapshots live in `public/nft/`. They are intentionally public and are not secrets or access controls.

## Commands

- `npm run dev` starts local development.
- `npm run build` creates the production build.
- `npm test` builds and verifies the rendered fieldbook and audit artifacts.
- `npm run lint` runs the code-quality checks.
