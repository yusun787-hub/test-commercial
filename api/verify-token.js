const TOKEN_PATTERN = /^[a-f0-9]{32}$/i;

function sendJson(response, status, payload) {
  response.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.json(payload);
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return sendJson(response, 405, { valid: false, reason: 'method_not_allowed' });
  }

  const token = Array.isArray(request.query.token) ? request.query.token[0] : request.query.token;
  if (!token || !TOKEN_PATTERN.test(token)) {
    return sendJson(response, 200, { valid: false, reason: 'invalid' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase server environment variables are missing');
    return sendJson(response, 500, { valid: false, reason: 'error' });
  }

  try {
    const query = new URL('/rest/v1/access_tokens', supabaseUrl);
    query.searchParams.set('select', 'expires_at');
    query.searchParams.set('token', `eq.${token}`);
    query.searchParams.set('limit', '1');

    const upstream = await fetch(query, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      console.error('Supabase token verification failed', upstream.status);
      return sendJson(response, 502, { valid: false, reason: 'error' });
    }

    const rows = await upstream.json();
    const expiresAt = rows?.[0]?.expires_at;
    if (!expiresAt) return sendJson(response, 200, { valid: false, reason: 'invalid' });

    const expiry = new Date(expiresAt).getTime();
    if (!Number.isFinite(expiry)) {
      return sendJson(response, 502, { valid: false, reason: 'error' });
    }
    if (expiry <= Date.now()) {
      return sendJson(response, 200, { valid: false, reason: 'expired' });
    }

    return sendJson(response, 200, { valid: true, expiresAt });
  } catch (error) {
    console.error('Token verification request failed', error);
    return sendJson(response, 502, { valid: false, reason: 'error' });
  }
}
