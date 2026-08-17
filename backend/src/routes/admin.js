const crypto = require('crypto');
const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE_MS,
  signAdminToken,
  requireAdmin,
} = require('../middleware/adminAuth');

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function getAdminAllowlist() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function timingSafeStringEqual(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Still run a comparison so failure timing doesn't leak the length.
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

router.post('/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  const expectedUsername = process.env.ADMIN_USERNAME || '';
  const expectedPassword = process.env.ADMIN_PASSWORD || '';

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !expectedUsername ||
    !expectedPassword ||
    !timingSafeStringEqual(username, expectedUsername) ||
    !timingSafeStringEqual(password, expectedPassword)
  ) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = signAdminToken(expectedUsername);
  res.cookie(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ADMIN_COOKIE_MAX_AGE_MS,
  });

  res.json({ username: expectedUsername });
});

router.post('/admin/google-signin', async (req, res, next) => {
  const { credential } = req.body || {};
  if (typeof credential !== 'string' || !credential) {
    return res.status(400).json({ error: 'credential is required' });
  }

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Google credential' });
  }

  try {
    const email = (payload.email || '').toLowerCase();
    if (!payload.email_verified || !getAdminAllowlist().includes(email)) {
      return res.status(403).json({ error: 'This Google account is not authorized as an admin' });
    }

    const token = signAdminToken(email);
    res.cookie(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ADMIN_COOKIE_MAX_AGE_MS,
    });

    res.json({ email });
  } catch (err) {
    next(err);
  }
});

router.get('/admin/me', requireAdmin, (req, res) => {
  res.json({ email: req.adminEmail });
});

router.post('/admin/logout', (req, res) => {
  res.clearCookie(ADMIN_COOKIE);
  res.json({ ok: true });
});

module.exports = router;
