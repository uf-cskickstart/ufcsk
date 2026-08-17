const express = require('express');
const pool = require('../db');
const { requireParticipant } = require('../middleware/auth');

const router = express.Router();

router.post('/checkin', requireParticipant, async (req, res, next) => {
  try {
    const { event_id, token } = req.body || {};
    const eventId = Number(event_id);

    if (!Number.isInteger(eventId) || typeof token !== 'string' || !token) {
      return res.status(400).json({ error: 'event_id and token are required' });
    }

    const eventResult = await pool.query(
      'SELECT id, name, date, points, qr_token FROM events WHERE id = $1',
      [eventId]
    );
    const event = eventResult.rows[0];
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    if (event.qr_token !== token) {
      return res.status(403).json({ error: 'Invalid check-in link' });
    }

    let alreadyCheckedIn = false;
    try {
      await pool.query(
        `INSERT INTO attendance (participant_id, event_id, full_name)
         SELECT $1, $2, full_name FROM participants WHERE id = $1`,
        [req.participantId, event.id]
      );
    } catch (err) {
      if (err.code === '23505') {
        alreadyCheckedIn = true;
      } else {
        throw err;
      }
    }

    res.json({
      already_checked_in: alreadyCheckedIn,
      event: { id: event.id, name: event.name, date: event.date, points: event.points },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
