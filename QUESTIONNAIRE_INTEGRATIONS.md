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

To add an email later, extend `app/api/lead/route.ts` after the CRM request succeeds. Send the email from this server route, not from the questionnaire HTML, so the provider API key remains private.

Recommended environment variables:

```text
LEAD_NOTIFICATION_EMAIL=your@email.com
EMAIL_PROVIDER_API_KEY=your_private_provider_key
```

Use `body.contact`, `body.request_type`, `body.deal_highlights`, and `body.suggested_paths` to build the email summary. Keep email delivery inside its own `try` block so a provider outage does not block the user from seeing the questionnaire result.
