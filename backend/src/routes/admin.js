const crypto = require('crypto');
const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const pool = require('../db');
const {
  ADMIN_COOKIE,
  signAdminToken,
  requireAdmin,
  adminCookieOptions,
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
  res.cookie(ADMIN_COOKIE, token, adminCookieOptions());

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
    res.cookie(ADMIN_COOKIE, token, adminCookieOptions());

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

router.get('/admin/roster', requireAdmin, async (req, res, next) => {
  try {
    // Same points math as /profile: sum of points for every event attended.
    const result = await pool.query(
      `SELECT p.id, p.full_name, p.ufid, p.created_at,
              COALESCE(SUM(e.points), 0)::int AS total_points,
              COALESCE(
                json_agg(
                  json_build_object('id', e.id, 'name', e.name, 'date', e.date, 'points', e.points, 'checked_in_at', a.checked_in_at)
                  ORDER BY e.date DESC
                ) FILTER (WHERE e.id IS NOT NULL),
                '[]'
              ) AS events
       FROM participants p
       LEFT JOIN attendance a ON a.participant_id = p.id
       LEFT JOIN events e ON e.id = a.event_id
       GROUP BY p.id
       ORDER BY total_points DESC, p.full_name ASC`
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.delete('/admin/participants/:id', requireAdmin, async (req, res, next) => {
  const participantId = Number(req.params.id);
  if (!Number.isInteger(participantId)) {
    return res.status(400).json({ error: 'Invalid participant id' });
  }

  // attendance.participant_id has no ON DELETE CASCADE, so remove their
  // check-ins first, in the same transaction so a failure leaves both intact.
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM attendance WHERE participant_id = $1', [participantId]);
    const result = await client.query('DELETE FROM participants WHERE id = $1 RETURNING id', [participantId]);
    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Member not found' });
    }
    await client.query('COMMIT');
    res.json({ ok: true });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    next(err);
  } finally {
    client.release();
  }
});

module.exports = router;
