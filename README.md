# S&B Marketing Motor Sport

React + Vite + Tailwind website with Neon PostgreSQL catalogue, Vercel Blob image uploads and Vercel Functions backend.

## Required project configuration

In Vercel environment variables configure:
- `DATABASE_URL`: Neon project sbmarketing pooled PostgreSQL connection string (server-only).
- `ADMIN_PASSWORD`: strong password used by the owner (server-only).
- `ADMIN_SESSION_SECRET`: random 32+ byte secret for signed admin session cookie (server-only).
- `BLOB_READ_WRITE_TOKEN`: auto-provisioned when connecting Vercel Blob to this project.

Never use VITE_ prefixes for secrets or commit an .env with values.

## Upgrade from local browser catalogue
Previously uploaded items were saved to each admin browser under localStorage key `sbmarketing-products-v1`. The owner MUST use the same original device/browser and hostname, sign in to /admin after deployment, then click **Import Saved Browser Items**. The import uploads data URL photos to Blob and records them in Neon, skipping products already in the database. Browser local storage is not remotely retrievable by the developer.

## Verify
1. Configure Vercel secrets and deploy.
2. Visit /api/products and confirm a JSON response with seeded products.
3. Sign into /admin, import saved browser items, add a new item with photo.
4. Open the homepage in a private browser on a second device; ensure the new item and photo are visible.
5. Delete the test item in admin and ensure it disappears after refreshing the public site.

The public catalogue refreshes on focus and every 30 seconds while visible.
