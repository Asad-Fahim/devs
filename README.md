# <Devs/> Shopify development studio

Professional Next.js 16 + TypeScript website for an independent Shopify services, theme and documentation studio.

## What is included

- All Version 2 public routes (services, theme catalog, MDX documentation, support, work, about, privacy, contact)
- Developer-oriented Liquid schema hero inspired by Version 3
- Server-backed enquiry and support APIs, validation and database schema
- Theme catalog slug, duplicate, release-status, documentation-link and listing URL validation
- Consistent warm-paper / forest / terracotta brand palette
- Real local SVG brand and visibly labelled theme *concept* artwork to replace missing assets
- Semantic headings, keyboard navigation, focus styling and reduced-motion support

## Start locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Configure real forms

Provision a PostgreSQL database and set `DATABASE_URL`. Create tables using the Drizzle schema in `src/db/schema.ts` (configure and run drizzle-kit migration). Set `WEB3FORMS_ACCESS_KEY` to enable notification delivery. Enquiries are stored before email notifications are attempted. Without those services, the forms cannot successfully submit. **Do not deploy live forms until database, email, persistent rate limiting, spam defenses and privacy policy are configured and tested.**

## Before publishing

1. Verify your public domain and set `NEXT_PUBLIC_SITE_URL`.
2. Replace the clearly labelled Alder illustrative SVG concepts with *real*, authorized theme screenshots. Verify theme features, branding, documentation and status; do not claim Theme Store approval without an official listing.
3. Edit contacts, legal/privacy details and descriptions to match the real studio.
4. Test build, contact/support end-to-end, mobile layouts, keyboard navigation, screen readers and performance in your hosting environment.
5. Create a real Shopify Liquid theme separately. This repository is a Next.js **marketing and documentation website**, not a Shopify theme package.

## Shopify references

- https://shopify.dev/docs/storefronts/themes
- https://shopify.dev/docs/storefronts/themes/architecture
- https://shopify.dev/docs/storefronts/themes/best-practices
