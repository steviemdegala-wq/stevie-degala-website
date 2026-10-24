# Mortgage Stevie Fix & Flip — release candidate

Version 0.1.0. Built for Stevie de Gala, NMLS 2845865, Barrett Financial NMLS 181106.

## Customer flow

1. Ask an AI assistant for financing or out-of-pocket costs for a fix-and-flip deal.
2. The read-only MCP tool returns a preliminary structure, fees, cash needs, profit, downside scenarios and a voluntary encrypted website link. It creates no CRM record and sends no email.
3. The website shows the estimate. Save/email requires name, email, phone and an unchecked consent checkbox for personal financing follow-up.
4. The CRM receives the saved deal with a ChatGPT source. Retries use the same scenario/contact key. Existing contacts are reused without resetting their pipeline stage.
5. The borrower can add the property address and ZIP for the existing conditional project prequalification letter. The same deal advances in the CRM. No new approval or underwriting engine was created.

## What is reused

The existing `/api/fix-and-flip` calculator, lender-program assumptions, ranking, borrower estimate email, internal notification and conditional PDF letter. The tool returns the calculator's selected modeled structure, not a whole-market search. Profile questions are requested only when the existing calculator needs them. Negative-profit or unmatched scenarios need manual review and cannot automatically generate a letter.

## Privacy and reliability

- No names, contact fields, exact addresses or documents in the MCP schema.
- AES-256-GCM authenticated handoff; 48-hour expiry. Financial inputs are immutable after handoff. No plaintext query-string deal data.
- The token is passed in the URL fragment and removed from the address bar after load. Reopening the original AI link resumes the estimate while valid; refreshing the cleaned URL requires the original link again.
- Automatic GA measurement is disabled on the dedicated handoff page, including client navigation into it. CRM source attribution is explicit and token-free. Google's defaults remain on other pages.
- Save fails closed if the companion CRM endpoint is unavailable. An estimate is only described as emailed after the email provider accepts it; this does not prove inbox delivery.
- CRM uniqueness and serializable transactions prevent duplicate deals on retry. Stages and delivery flags cannot regress. A different property/contact on the same saved request is rejected.
- Resend idempotency keys protect concurrent email retries for its 24-hour window. Persisted CRM delivery flags prevent normal subsequent sends. A provider-accepted message followed by a lost CRM acknowledgment can still require manual reconciliation; this is not a promise of exactly-once delivery.
- New scenarios for an email are capped at five per hour in CRM. Configure public edge rate limits before release; the calculator is intentionally unauthenticated and must not become an abuse channel.

## Required release order

1. Review the CRM companion changes and back up its database. Apply the additive `202610230001_calculator_intake` migration with the normal deployment process, then deploy the authenticated intake endpoint.
2. Configure a new server-only `CALCULATOR_HANDOFF_SECRET` with 32 random bytes encoded as 64 hex characters. Never put it in the plugin ZIP or a public environment variable. Keep `CALCULATOR_PLUGIN_ORIGIN=https://mortgagestevie.com` (default).
3. Existing website server settings: `CRM_URL`, `CRM_PASSWORD`, `RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `LEAD_NOTIFICATION_EMAIL`. Verify the existing sender is verified. Use a supported Node version meeting both projects’ requirements; Node 24 satisfies the tested versions.
4. Configure the host's rate limits for `/mcp`, `/api/calculator-handoff` and the existing calculator API. Use a deployment preview and mock services first.
5. Publish reviewed website and CRM changes only after approval. Then connect the HTTPS `/mcp` endpoint in ChatGPT developer mode and run the documented prompts. A real CRM/email smoke test needs its own clearly labeled test authorization.
6. Review the calculator privacy/terms pages and public plugin identity, then submit through OpenAI's **With MCP** flow if public directory distribution is desired. Account verification and acceptance of terms are owner steps. Directory approval and proactive recommendations are not guaranteed.

## Dependency validation

The release branches update Next.js to 16.4.3 and React/React DOM to 19.3.1. The CRM’s compatible security updates resolve its reported dependency advisories. The website retains three moderate build-tool advisories through Tailwind 3 / PostCSS selector parsing; removing those requires a separate Tailwind 4 migration. No high or critical advisories remain in the website audit after the compatible fixes. The site keeps its existing Webpack build path.

## Local verification

Website: `npm ci`, `npm run test:plugin`, `npm run build`.
CRM: `npm ci`, `prisma generate`, `node scripts/verify-calculator-intake.cjs`, production build with a dummy local database URL.
`npm run preview:plugin` starts the built website on localhost:3111 and an in-memory CRM on 127.0.0.1:3122, with no email key. Its ignored `.local-plugin-preview-url` contains a fictional sample handoff. It does not create real CRM records or send mail.

## Manual ChatGPT acceptance prompts

- “I’m buying an SFR in Colorado for $200,000, rehabbing for $50,000, ARV $400,000, six months, and $1,000 monthly holding costs. How much financing and cash would I need?”
- Same scenario with 12 months: ask broad experience and credit before calculating.
- A low-ARV/loss scenario: show the loss clearly, with no automated letter.
- Ask about DSCR or a VA owner-occupied purchase: explain this tool models fix-and-flip financing and direct the user to the appropriate existing service, without inventing results.
- Open handoff, decline contact consent: no lead is saved. Supply fictional contact details with consent in a mock preview: one deal, retry without duplicates, same deal progresses to a conditional letter.

## Package

`plugin.json`, `mcp.json`, this README and the existing Mortgage Stevie icon. No API keys, customer data, CRM credentials or generated estimate links belong in the distributable ZIP. This package references a future production endpoint; it will not work until the reviewed release is deployed and connected.

Official format: https://developers.openai.com/plugins/build/plugins
Official submission: https://developers.openai.com/plugins/deploy/app-review
