require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { loadParticipant } = require('./middleware/auth');
const { loadAdmin } = require('./middleware/adminAuth');
const participantsRouter = require('./routes/participants');
const checkinRouter = require('./routes/checkin');
const adminRouter = require('./routes/admin');
const eventsRouter = require('./routes/events');

const app = express();

const allowedOrigins = [process.env.FRONTEND_ORIGIN, ...(process.env.CORS_EXTRA_ORIGINS || '').split(',')]
  .filter(Boolean)
  .map((origin) => origin.trim());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(loadParticipant);
app.use(loadAdmin);

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api', participantsRouter);
app.use('/api', checkinRouter);
app.use('/api', adminRouter);
app.use('/api', eventsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`csk-attendance-backend listening on port ${port}`);
});
