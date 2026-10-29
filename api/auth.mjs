import { authenticated, body, clearCookie, json, passwordMatches, sameOrigin, signedCookie } from './_server.mjs';

export default async function handler(req, res) {
  if (req.method === 'GET') return json(res, 200, { authenticated: authenticated(req) });
  if (req.method === 'DELETE') {
    if (!sameOrigin(req)) return json(res, 403, { error: 'Invalid origin' });
    res.setHeader('Set-Cookie', clearCookie);
    return json(res, 200, { authenticated: false });
  }
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  if (!sameOrigin(req)) return json(res, 403, { error: 'Invalid origin' });
  try {
    const { password } = body(req);
    if (!passwordMatches(password)) return json(res, 401, { error: 'Incorrect password' });
    res.setHeader('Set-Cookie', signedCookie(req));
    return json(res, 200, { authenticated: true });
  } catch {
    return json(res, 500, { error: 'Admin sign-in unavailable' });
  }
}
