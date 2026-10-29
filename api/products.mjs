import { randomUUID } from 'node:crypto';
import { authenticated, body, database, json, sameOrigin } from './_server.mjs';

const categories = new Set(['Posters','Photographs','Books','Magazines','Motorcycles','Memorabilia']);
function valid(item) {
  return item && typeof item.name === 'string' && item.name.trim().length > 0 && item.name.trim().length <= 180 &&
    categories.has(item.category) && typeof item.description === 'string' && item.description.trim().length > 0 &&
    item.description.trim().length <= 5000 && typeof item.image === 'string' &&
    /^https:\/\/[^\s]+$/i.test(item.image) && item.image.length <= 2048 &&
    (item.price == null || (typeof item.price === 'string' && item.price.length <= 100));
}
export default async function handler(req, res) {
  if (!['GET','POST','DELETE'].includes(req.method)) return json(res, 405, {error:'Method not allowed'});
  if (req.method !== 'GET' && (!sameOrigin(req) || !authenticated(req))) return json(res, 401, {error:'Please sign in again'});
  try {
    const sql = database();
    if (req.method === 'GET') {
      const rows = await sql.query('SELECT id,name,category,description,image,price FROM public.products ORDER BY display_order DESC,created_at DESC,id ASC');
      return json(res, 200, {products:rows});
    }
    if (req.method === 'DELETE') {
      const id = String(req.query?.id || '');
      if (!id || id.length > 120) return json(res, 400, {error:'Invalid item ID'});
      await sql.query('DELETE FROM public.products WHERE id=$1',[id]);
      return json(res, 200, {success:true});
    }
    const item = body(req);
    if (!valid(item)) return json(res, 400, {error:'Invalid product information or image link'});
    const keepId = item.importExisting === true && typeof item.id === 'string' && /^[A-Za-z0-9_-]{1,120}$/.test(item.id);
    const id = keepId ? item.id : randomUUID();
    const rows = await sql.query(
      'INSERT INTO public.products(id,name,category,description,image,price,display_order) VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT(id) DO NOTHING RETURNING id',
      [id,item.name.trim(),item.category,item.description.trim(),item.image,item.price || null,Date.now()]
    );
    return json(res,200,{id,inserted:rows.length > 0});
  } catch(e) {
    console.error('Products backend error', e?.message || 'Unknown');
    return json(res,503,{error:'Website collection is temporarily unavailable'});
  }
}
