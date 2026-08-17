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

module.exports = {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE_MS,
  signAdminToken,
  loadAdmin,
  requireAdmin,
};
