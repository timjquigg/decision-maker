-- Table to hold polls
DROP TABLE IF EXISTS polls CASCADE;

CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  annonymous BOOLEAN DEFAULT false,
  created_on TIMESTAMP,
  deadline TIMESTAMP
);