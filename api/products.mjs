import { randomUUID } from 'node:crypto';
import { authenticated, body, json, sameOrigin } from './_server.mjs';

const categories = new Set(['Posters', 'Photographs', 'Books', 'Magazines', 'Motorcycles', 'Memorabilia']);

function valid(item) {
  return item && typeof item.name === 'string' && item.name.trim().length > 0 && item.name.trim().length <= 180 &&
    categories.has(item.category) && typeof item.description === 'string' && item.description.trim().length > 0 &&
    item.description.trim().length <= 5000 && typeof item.image === 'string' &&
    /^https:\/\/[^\s]+$/i.test(item.image) && item.image.length <= 2048 &&
    (item.price == null || (typeof item.price === 'string' && item.price.length <= 100));
}

function dataApi() {
  const url = process.env.NEON_DATA_API_URL;
  const token = process.env.NEON_DATA_API_SERVICE_TOKEN;
  if (!url || !token) throw new Error('Neon Data API is not configured');
  return { url: url.replace(/\/$/, ''), token };
}

async function requestDatabase(url, init = {}) {
  const response = await fetch(url, {
    cache: 'no-store',
    ...init,
    signal: AbortSignal.timeout(12000)
  });
  const raw = await response.text();
  let parsed;
  try { parsed = raw ? JSON.parse(raw) : []; }
  catch { parsed = { message: 'Invalid response from data store' }; }
  if (!response.ok) {
    console.error('Neon Data API error', response.status, typeof parsed?.code === 'string' ? parsed.code : '');
    throw new Error('Database operation failed (' + response.status + ')');
  }
  return parsed;
}

export default async function handler(req, res) {
  if (!['GET', 'POST', 'DELETE'].includes(req.method)) return json(res, 405, { error: 'Method not allowed' });
  if (req.method !== 'GET' && (!sameOrigin(req) || !authenticated(req))) {
    return json(res, 401, { error: 'Please sign in again' });
  }
  try {
    const { url, token } = dataApi();
    if (req.method === 'GET') {
      const items = await requestDatabase(url + '/products?select=id,name,category,description,image,price&order=display_order.desc,created_at.desc,id.asc');
      if (!Array.isArray(items)) throw new Error('Unexpected products response');
      return json(res, 200, { products: items });
    }
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-service-token': token
    };
    if (req.method === 'DELETE') {
      const id = String(req.query?.id || '');
      if (!/^[A-Za-z0-9_-]{1,120}$/.test(id)) return json(res, 400, { error: 'Invalid item ID' });
      await requestDatabase(url + '/products?id=eq.' + encodeURIComponent(id), { method: 'DELETE', headers });
      return json(res, 200, { success: true });
    }

    const item = body(req);
    if (!valid(item)) return json(res, 400, { error: 'Invalid product information or image link' });
    const keepId = item.importExisting === true && typeof item.id === 'string' && /^[A-Za-z0-9_-]{1,120}$/.test(item.id);
    const id = keepId ? item.id : randomUUID();
    const rows = await requestDatabase(url + '/products?on_conflict=id', {
      method: 'POST',
      headers: { ...headers, Prefer: 'resolution=ignore-duplicates,return=representation' },
      body: JSON.stringify({
        id,
        name: item.name.trim(),
        category: item.category,
        description: item.description.trim(),
        image: item.image,
        price: item.price || null,
        display_order: Date.now()
      })
    });
    return json(res, 200, { id, inserted: Array.isArray(rows) && rows.length > 0 });
  } catch (err) {
    console.error('Product API failure:', err instanceof Error ? err.message : 'Unknown error');
    return json(res, 503, { error: 'Products are temporarily unavailable. Please try again.' });
  }
}
