-- Table to hold options for polls
DROP TABLE IF EXISTS poll_options CASCADE;

CREATE TABLE poll_options (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  poll_option_title VARCHAR(255) NOT NULL,
  poll_option_description TEXT
);