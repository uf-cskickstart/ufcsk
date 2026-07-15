CREATE TABLE IF NOT EXISTS participants (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  ufid TEXT UNIQUE NOT NULL,
  email TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  points INTEGER NOT NULL DEFAULT 1,
  qr_token TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  participant_id INTEGER REFERENCES participants(id),
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  full_name TEXT,
  checked_in_at TIMESTAMP DEFAULT now(),
  UNIQUE (participant_id, event_id)
);

-- Backfills full_name for tables that existed before this column was added.
ALTER TABLE attendance ADD COLUMN IF NOT EXISTS full_name TEXT;
UPDATE attendance a SET full_name = p.full_name
FROM participants p
WHERE a.participant_id = p.id AND a.full_name IS NULL;

-- Lets deleting an event also remove its attendance rows (tables that existed
-- before this had the FK without ON DELETE CASCADE).
ALTER TABLE attendance DROP CONSTRAINT IF EXISTS attendance_event_id_fkey;
ALTER TABLE attendance ADD CONSTRAINT attendance_event_id_fkey
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE;
