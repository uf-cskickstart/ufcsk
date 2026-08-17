const jwt = require('jsonwebtoken');

const PARTICIPANT_COOKIE = 'participant_session';
const PARTICIPANT_COOKIE_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

function signParticipantToken(participantId) {
  return jwt.sign({ participantId }, process.env.SESSION_SECRET, { expiresIn: '180d' });
}

function loadParticipant(req, res, next) {
  const token = req.cookies[PARTICIPANT_COOKIE];
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.SESSION_SECRET);
      req.participantId = payload.participantId;
    } catch (err) {
      // invalid or expired token - treat as signed out
    }
  }
  next();
}

function requireParticipant(req, res, next) {
  if (!req.participantId) {
    return res.status(401).json({ error: 'Not signed in' });
  }
  next();
}

// See adminCookieOptions in adminAuth.js for why this differs between
// production (cross-site, needs None+Secure) and local dev (same-site).
function participantCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: PARTICIPANT_COOKIE_MAX_AGE_MS,
  };
}

module.exports = {
  PARTICIPANT_COOKIE,
  PARTICIPANT_COOKIE_MAX_AGE_MS,
  signParticipantToken,
  loadParticipant,
  requireParticipant,
  participantCookieOptions,
};
