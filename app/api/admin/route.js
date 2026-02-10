
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

/**
 * Config - adjust to your policy
 */
const ACCESS_TOKEN_EXP = '15m';
const REFRESH_TOKEN_EXP = '1d';
const ACCESS_MAX_AGE = 15 * 60; // seconds
const REFRESH_MAX_AGE = 24 * 60 * 60; // seconds

// Debugging toggle: true if DEBUG_AUTH=true OR in non-production
const DEBUG = process.env.DEBUG_AUTH === 'true' || process.env.NODE_ENV !== 'production';

function log(...args) {
  if (DEBUG) console.log('[auth-route]', ...args);
}

function maskToken(t) {
  if (!t) return null;
  if (t.length <= 12) return `${t.slice(0, 3)}...${t.slice(-3)}`;
  return `${t.slice(0, 6)}...${t.slice(-6)} (len=${t.length})`;
}

/**
 * Verify access token (returns decoded payload or null)
 * - uses process.env.JWT_ACCESS_SECRET
 */
function verifyAccessToken(token) {
  try {
    log('verifyAccessToken: called, token=', maskToken(token));
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    log('verifyAccessToken: success, payload=', decoded);
    return decoded;
  } catch (err) {
    log('verifyAccessToken: failed -', err && err.name ? `${err.name}: ${err.message}` : err);
    return null;
  }
}

/**
 * Rotate tokens using a refresh token.
 * - verifies refresh token with JWT_REFRESH_SECRET
 * - NOTE: in production you MUST validate the refresh token against a store/allowlist
 *         to support revocation and prevent replay attacks. This example is minimal.
 *
 * Returns { accessToken, refreshToken, user } or null on failure.
 */
async function rotateTokens(refreshToken) {
  try {
    log('rotateTokens: called, refreshToken=', maskToken(refreshToken));
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    log('rotateTokens: refresh token payload=', payload);

    // Standardize user shape — adapt to your payload
    const uid = payload.uid || payload.sub || payload.id || payload.userId;
    if (!uid) {
      log('rotateTokens: no uid in payload');
      return null;
    }

    // TODO: check refresh token id/nonce against DB or revoke list here
    // Example: if (!isRefreshTokenAllowed(payload.jti)) return null;

    const newAccess = jwt.sign({ uid }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXP,
    });
    const newRefresh = jwt.sign({ uid }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXP,
    });

    log('rotateTokens: rotation success for uid=', uid, 'newAccess=', maskToken(newAccess), 'newRefresh=', maskToken(newRefresh));
    return { accessToken: newAccess, refreshToken: newRefresh, user: { uid } };
  } catch (err) {
    log('rotateTokens: failed -', err && err.name ? `${err.name}: ${err.message}` : err);
    return null;
  }
}

/**
 * GET /api/user/me
 * - returns { id: string } when authenticated, otherwise `null`
 * - rotates tokens when refresh token is valid and sets new cookies
 */
export async function GET(req) {
  try {
    log('Incoming GET /api/user/me');
    const accessToken = req.cookies.get('access_token')?.value;
    const refreshToken = req.cookies.get('refresh_token')?.value;

    log('Cookies seen -> access_token:', !!accessToken, 'refresh_token:', !!refreshToken);
    if (DEBUG) {
      log('access_token (masked):', maskToken(accessToken));
      log('refresh_token (masked):', maskToken(refreshToken));
    }

    // No tokens -> anonymous
    if (!accessToken && !refreshToken) {
      log('No tokens present -> returning null');
      return NextResponse.json(null, { status: 200 });
    }

    // Try access token first
    if (accessToken) {
      const decoded = verifyAccessToken(accessToken);
      if (decoded) {
        const id = decoded.uid || decoded.sub || decoded.id || decoded.userId;
        log('Access token valid -> returning user id=', id);
        return NextResponse.json({ id }, { status: 200 });
      }
      log('Access token invalid/expired -> will attempt refresh (if present)');
      // fallthrough to refresh logic
    }

    // Try refresh token rotation
    if (refreshToken) {
      const rotated = await rotateTokens(refreshToken);
      if (!rotated) {
        log('Refresh token invalid or rotation failed -> returning null');
        return NextResponse.json(null, { status: 200 });
      }

      const res = NextResponse.json({ id: rotated.user.uid }, { status: 200 });
      const isProd = process.env.NODE_ENV === 'production';

      // Use same cookie names we read earlier
      res.cookies.set('access_token', rotated.accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: ACCESS_MAX_AGE,
      });

      res.cookies.set('refresh_token', rotated.refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: REFRESH_MAX_AGE,
      });

      log('Rotation successful -> set cookies access_token & refresh_token (masked)');
      if (DEBUG) {
        log('Set access_token:', maskToken(rotated.accessToken));
        log('Set refresh_token:', maskToken(rotated.refreshToken));
      }

      return res;
    }

    // Fallback (shouldn't hit)
    log('Reached fallback -> returning null');
    return NextResponse.json(null, { status: 200 });
  } catch (err) {
    console.error('[auth-route] Uncaught error:', err);
    return NextResponse.json(null, { status: 200 });
  }
}
