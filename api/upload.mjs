import { randomUUID } from 'node:crypto';
import { put } from '@vercel/blob';
import { authenticated, json, sameOrigin } from './_server.mjs';

const contentTypes = {
  'image/jpeg':'jpg', 'image/png':'png',
  'image/webp':'webp', 'image/gif':'gif'
};
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, {error:'Method not allowed'});
  if (!sameOrigin(req) || !authenticated(req)) return json(res, 401, {error:'Please sign in again'});
  const mime = String(req.headers['content-type'] || '').toLowerCase();
  const extension = contentTypes[mime];
  if (!extension) return json(res, 400, {error:'Unsupported image type'});
  if (Number(req.headers['content-length'] || 0) > 3*1024*1024) return json(res, 413, {error:'Image must be under 3MB'});
  try {
    const chunks = [];
    let size = 0;
    if (Buffer.isBuffer(req.body)) { chunks.push(req.body); size=req.body.length; }
    else if (req.body && typeof req.body === 'string') { const chunk=Buffer.from(req.body); chunks.push(chunk); size=chunk.length; }
    else {
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 3*1024*1024) return json(res, 413, {error:'Image must be under 3MB'});
        chunks.push(chunk);
      }
    }
    if (!size || size > 3*1024*1024) return json(res, 400, {error:'Invalid image size'});
    const bytes = Buffer.concat(chunks);
    const blob = await put('products/' + randomUUID() + '.' + extension, bytes, {access:'public',contentType:mime});
    return json(res, 200, {url:blob.url});
  } catch(e) {
    console.error('Blob upload failed', e?.message || 'Unknown error');
    return json(res, 503, {error:'Image upload is temporarily unavailable'});
  }
}
