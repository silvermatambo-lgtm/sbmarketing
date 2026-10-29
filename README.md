# S&B Marketing Motor Sport

Website built with React, Vite, Tailwind, Neon PostgreSQL and Vercel Blob.

## Shared admin catalogue

Products are stored in a single Neon database. The homepage, gallery, services collection and admin all read from the same source (and re-fetch on focus / every 30 seconds). Product images upload to Vercel Blob, not localStorage. The public Data API has row-level security for **read-only** visitor access. Only the Vercel API backend can write using its private service token and an authenticated admin session.

### Required Vercel environment variables (server-only, no VITE_ prefix)
- `NEON_DATA_API_URL` — Neon Data API endpoint ending in /rest/v1.
- `NEON_AUTH_URL` — Neon Managed Auth base URL ending in /auth.
- `NEON_DATA_API_SERVICE_TOKEN` — backend-only service token whose hash is registered in Neon's internal.service_keys.
- `ADMIN_PASSWORD` — strong owner password (not bundled into JavaScript).
- `ADMIN_SESSION_SECRET` — signing secret for 12-hour HttpOnly admin session cookies.
- `BLOB_READ_WRITE_TOKEN` — added by the linked Vercel Blob store.

### Recover older local-only uploads
Old uploads are in `localStorage['sbmarketing-products-v1']`, only in the browser and exact website domain where the client uploaded them. They **cannot** be accessed via GitHub or Neon until the owner visits /admin on the original browser and clicks **Import Saved Browser Items**. The import uploads locally saved base64 photos to Blob and saves products in Neon, skipping items with IDs that already exist. Do not clear this browser or switch domains before migration.

### Verification
- `/api/products` returns the seeded catalogue JSON.
- Sign into `/admin` with the server-side password and add a product and image.
- Confirm that the product appears on another browser/device across homepage/gallery/services.
- Delete the test product and verify it disappears.
- Import older local-only products from the original admin browser.

`npm install && npm run build` checks TypeScript and produces the Vite static frontend.
