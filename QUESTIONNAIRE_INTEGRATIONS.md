# Find My Loan integrations

The questionnaire is served at `/find-my-loan` and the browser experience lives in `public/find-my-loan-questionnaire.html`.

## Google address autocomplete

1. Create a browser-restricted Google Maps API key with the Places API enabled.
2. Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to the Vercel project environment variables.
3. Restrict the key to the production website domains.
4. Redeploy the site.

The Next.js page passes this public browser key to the questionnaire. If the key is missing or Google Places is unavailable, the address field remains usable as a normal text field.

## Lead delivery

The contact form posts the full questionnaire payload to `/api/lead`. The existing route creates the contact in the CRM using `CRM_PASSWORD` from the Vercel environment.

The payload includes:

- Contact name, email, and phone
- Request type
- All deal answers in `deal_highlights`
- Suggested financing paths
- Whether the deal should be redirected to a planning call

## Automated email notification

The lead route sends a concise borrower and deal summary through the Resend API. Email delivery runs on the server and is independent from CRM delivery, so one service can fail without blocking the questionnaire.

Add these environment variables to the Vercel project:

```text
RESEND_API_KEY=re_your_private_key
LEAD_NOTIFICATION_EMAIL=steviemdegala@gmail.com
LEAD_FROM_EMAIL=Mortgage Stevie <onboarding@resend.dev>
```

`LEAD_NOTIFICATION_EMAIL` and `LEAD_FROM_EMAIL` have matching defaults in the code, but keeping them in Vercel makes future changes easier. `RESEND_API_KEY` is required and must remain a secret.

For initial testing, Resend's `onboarding@resend.dev` sender can be used with the email address associated with the Resend account. For long-term production delivery, verify a sending domain in Resend and change `LEAD_FROM_EMAIL` to an address on that domain, such as `Mortgage Stevie <leads@mortgagestevie.com>`.

The email includes the borrower's name, phone, email, request type, relevant property and timing details, key deal numbers, credit range, suggested financing paths, and planning-call status. It intentionally sends a high-level summary instead of an unfiltered data dump.
