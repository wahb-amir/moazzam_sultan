import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'your_access_secret_123';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_456';

/**
 * Verify if the access token is valid and not expired
 */
export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, ACCESS_SECRET);
  } catch (error) {
    return null; // Token is expired or tampered with
  }
}

/**
 * Rotates the refresh token
 * 1. Verifies the existing refresh token
 * 2. Generates a brand new Access Token
 * 3. Generates a brand new Refresh Token (Token Rotation for security)
 */
export async function rotateTokens(oldRefreshToken) {
  try {
    // 1. Verify the refresh token
    const decoded = jwt.verify(oldRefreshToken, REFRESH_SECRET);
    if (!decoded) return null;

    // 2. Prepare user data for new tokens
    // Note: 'sub' or 'uid' depends on how you structured your login
    const payload = { 
      uid: decoded.uid || decoded.sub,
      role: decoded.role // If you have admin roles
    };

    // 3. Generate new tokens
    const newAccessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: { uid: payload.uid }
    };
  } catch (error) {
    console.error("Token rotation failed:", error);
    return null;
  }
}