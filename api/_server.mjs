import { neon } from '@neondatabase/serverless';
import { createHmac, createHash, timingSafeEqual } from 'node:crypto';

export function database() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured');
  return neon(process.env.DATABASE_URL);
}

export function json(res, status, data) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(status).json(data);
}

export function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.host;
  } catch { return false; }
}

export function body(req) {
  if (typeof req.body === 'string') return JSON.parse(req.body);
  return req.body || {};
}

function signature(expiry) {
  const key = process.env.ADMIN_SESSION_SECRET;
  if (!key) throw new Error('ADMIN_SESSION_SECRET is not configured');
  return createHmac('sha256', key).update('sbm-admin:' + expiry).digest('hex');
}

export function signedCookie(req) {
  const expiry = String(Date.now() + 12 * 60 * 60 * 1000);
  const value = expiry + '.' + signature(expiry);
  const secure = req.headers['x-forwarded-proto'] === 'https' || req.headers.host?.includes('.vercel.app');
  return 'sbm_admin=' + value + '; HttpOnly; SameSite=Strict; Path=/api; Max-Age=43200' + (secure ? '; Secure' : '');
}

export const clearCookie = 'sbm_admin=; HttpOnly; SameSite=Strict; Path=/api; Max-Age=0; Secure';

export function authenticated(req) {
  const cookie = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith('sbm_admin='));
  const value = cookie?.slice('sbm_admin='.length) || '';
  const [expiry, actual] = value.split('.');
  if (!expiry || !actual || !/^\d{13}$/.test(expiry) || Number(expiry) < Date.now()) return false;
  try {
    const expected = signature(expiry);
    const a = Buffer.from(actual, 'hex');
    const b = Buffer.from(expected, 'hex');
    return a.length === b.length && timingSafeEqual(a, b);
  } catch { return false; }
}

export function passwordMatches(submitted) {
  const stored = process.env.ADMIN_PASSWORD;
  if (!stored || typeof submitted !== 'string') return false;
  const a = createHash('sha256').update(submitted).digest();
  const b = createHash('sha256').update(stored).digest();
  return timingSafeEqual(a, b);
}
