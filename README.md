# NESTRO

Static-export Next.js 15 website for NESTRO, a UAE furniture and interior lifestyle studio.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and replace the placeholder phone, WhatsApp, form access key, and public site URL values.

## Production export

```bash
npm run build
```

The deployable static site is generated in `out/`. Forms submit to the configured Web3Forms-compatible endpoint; when no real access key is configured, they retain the complete client-side success flow for local review without sending data.

## Content

Products, collections, projects, journal stories, process steps, navigation, locations, and hours are stored in `data/`. All dynamic product, collection, project, upholstery, custom-furniture, and journal routes are pre-rendered during the build.
