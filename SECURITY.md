# Security policy

## Supported surface

The supported version is the current `main` branch and the production site at `https://bitpixi-learns-cybersec.bitpixi.chatgpt.site`.

Low-rate, non-destructive testing is authorised for the site's public pages and the explicitly synthetic paths under `/field-notes/` and `/detections/`. You may inspect public source, response headers, static assets and browser-local behaviour.

## Rules of engagement

Please:

- keep automated requests low-rate and stop if availability degrades;
- use only your own browser state and the supplied synthetic records;
- preserve evidence and include reproducible steps in a report;
- identify the affected URL, expected behaviour, observed behaviour and likely impact.

Do not:

- perform denial-of-service, load, resource-exhaustion or destructive testing;
- attempt credential attacks, social engineering or access to another person's data;
- persist, alter or delete data or content;
- test `chatgpt.site`, Cloudflare, GitHub, linked training providers, social platforms or any adjacent tenant;
- claim authorisation for any host other than the exact production hostname above;
- publish sensitive details before there has been a reasonable opportunity to respond.

The incident records use reserved example IP addresses, `.example` domains and fictional identities. They are training evidence, not targets.

## Reporting

Email `Kasey.bitpixi@gmail.com` with the subject `BLC security report`. Plain-text reports are welcome. I aim to acknowledge a good-faith report within seven days; this is a personal learning project and does not operate a paid bug bounty.

## Safe harbour

Good-faith research that stays within this policy will be treated as authorised for this project. If you are unsure whether an action is in scope, pause and ask before proceeding. This statement cannot authorise testing of infrastructure or services owned by third parties.
