const jwt = require('jsonwebtoken');

const ADMIN_COOKIE = 'admin_session';
const ADMIN_COOKIE_MAX_AGE_MS = 12 * 60 * 60 * 1000;

function signAdminToken(email) {
  return jwt.sign({ email }, process.env.SESSION_SECRET, { expiresIn: '12h' });
}

function loadAdmin(req, res, next) {
  const token = req.cookies[ADMIN_COOKIE];
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.SESSION_SECRET);
      req.adminEmail = payload.email;
    } catch (err) {
      // invalid or expired token - treat as signed out
    }
  }
  next();
}

function requireAdmin(req, res, next) {
  if (!req.adminEmail) {
    return res.status(401).json({ error: 'Not signed in as admin' });
  }
  next();
}

// Frontend and backend live on different domains in production, which makes
// every API call cross-site - SameSite=Lax cookies aren't sent on those, only
// on top-level navigations, so we need None+Secure there. Locally both run on
// localhost (same-site across ports), where Lax works and None would require
// HTTPS we don't have.
function adminCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: ADMIN_COOKIE_MAX_AGE_MS,
  };
}

module.exports = {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE_MS,
  signAdminToken,
  loadAdmin,
  requireAdmin,
  adminCookieOptions,
};
