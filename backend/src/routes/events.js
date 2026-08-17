const express = require('express');
const crypto = require('crypto');
const QRCode = require('qrcode');
const pool = require('../db');
const { requireAdmin } = require('../middleware/adminAuth');

const router = express.Router();

function checkinUrl(eventId, token) {
  const origin = process.env.FRONTEND_ORIGIN || '';
  return `${origin}/checkin?event=${eventId}&token=${token}`;
}

router.post('/events', requireAdmin, async (req, res, next) => {
  try {
    const { name, date, points } = req.body || {};
    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'name is required' });
    }
    if (typeof date !== 'string' || !date.trim()) {
      return res.status(400).json({ error: 'date is required' });
    }
    const pointsValue = points === undefined ? 1 : Number(points);
    if (!Number.isInteger(pointsValue) || pointsValue < 0) {
      return res.status(400).json({ error: 'points must be a non-negative integer' });
    }

    const qrToken = crypto.randomBytes(16).toString('hex');

    const result = await pool.query(
      'INSERT INTO events (name, date, points, qr_token) VALUES ($1, $2, $3, $4) RETURNING id, name, date, points, qr_token',
      [name.trim(), date.trim(), pointsValue, qrToken]
    );
    const event = result.rows[0];

    res.status(201).json({ ...event, checkin_url: checkinUrl(event.id, event.qr_token) });
  } catch (err) {
    next(err);
  }
});

router.get('/events', requireAdmin, async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, name, date, points, qr_token FROM events ORDER BY date DESC'
    );
    const events = result.rows.map((event) => ({
      ...event,
      checkin_url: checkinUrl(event.id, event.qr_token),
    }));
    res.json(events);
  } catch (err) {
    next(err);
  }
});

router.get('/events/:id/qrcode', requireAdmin, async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);
    if (!Number.isInteger(eventId)) {
      return res.status(400).json({ error: 'Invalid event id' });
    }

    const result = await pool.query('SELECT id, qr_token FROM events WHERE id = $1', [eventId]);
    const event = result.rows[0];
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const url = checkinUrl(event.id, event.qr_token);
    const png = await QRCode.toBuffer(url, { width: 512 });
    res.set('Content-Type', 'image/png');
    res.send(png);
  } catch (err) {
    next(err);
  }
});

router.get('/events/:id/attendance', requireAdmin, async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);
    if (!Number.isInteger(eventId)) {
      return res.status(400).json({ error: 'Invalid event id' });
    }

    const result = await pool.query(
      'SELECT full_name, checked_in_at FROM attendance WHERE event_id = $1 ORDER BY checked_in_at ASC',
      [eventId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.delete('/events/:id', requireAdmin, async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);
    if (!Number.isInteger(eventId)) {
      return res.status(400).json({ error: 'Invalid event id' });
    }

    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING id', [eventId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
