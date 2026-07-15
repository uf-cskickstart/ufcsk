const express = require('express');
const pool = require('../db');
const {
  PARTICIPANT_COOKIE,
  PARTICIPANT_COOKIE_MAX_AGE_MS,
  signParticipantToken,
  requireParticipant,
} = require('../middleware/auth');

const router = express.Router();

const UFID_PATTERN = /^\d{8}$/;

router.post('/register-or-lookup', async (req, res, next) => {
  try {
    const { full_name, ufid } = req.body || {};

    if (typeof full_name !== 'string' || !full_name.trim()) {
      return res.status(400).json({ error: 'full_name is required' });
    }
    if (typeof ufid !== 'string' || !UFID_PATTERN.test(ufid.trim())) {
      return res.status(400).json({ error: 'ufid must be 8 digits' });
    }

    const trimmedName = full_name.trim();
    const trimmedUfid = ufid.trim();

    const existing = await pool.query(
      'SELECT id, full_name, ufid FROM participants WHERE ufid = $1',
      [trimmedUfid]
    );

    let participant = existing.rows[0];
    if (!participant) {
      const inserted = await pool.query(
        'INSERT INTO participants (full_name, ufid) VALUES ($1, $2) RETURNING id, full_name, ufid',
        [trimmedName, trimmedUfid]
      );
      participant = inserted.rows[0];
    }

    const token = signParticipantToken(participant.id);
    res.cookie(PARTICIPANT_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: PARTICIPANT_COOKIE_MAX_AGE_MS,
    });

    res.json({ id: participant.id, full_name: participant.full_name, ufid: participant.ufid });
  } catch (err) {
    next(err);
  }
});

router.get('/profile', requireParticipant, async (req, res, next) => {
  try {
    const participantResult = await pool.query(
      'SELECT id, full_name, ufid FROM participants WHERE id = $1',
      [req.participantId]
    );
    const participant = participantResult.rows[0];
    if (!participant) {
      return res.status(401).json({ error: 'Not signed in' });
    }

    const historyResult = await pool.query(
      `SELECT e.id, e.name, e.date, e.points, a.checked_in_at
       FROM attendance a
       JOIN events e ON a.event_id = e.id
       WHERE a.participant_id = $1
       ORDER BY e.date DESC`,
      [participant.id]
    );

    const totalPoints = historyResult.rows.reduce((sum, row) => sum + row.points, 0);

    res.json({
      id: participant.id,
      full_name: participant.full_name,
      ufid: participant.ufid,
      total_points: totalPoints,
      events: historyResult.rows,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
