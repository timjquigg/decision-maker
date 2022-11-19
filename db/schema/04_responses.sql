-- Table to hold responses to polls 
DROP TABLE IF EXISTS responses CASCADE;

CREATE TABLE responses (
  id SERIAL PRIMARY KEY NOT NULL,
  -- poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  poll_option_id INTEGER REFERENCES poll_options(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  name VARCHAR(255) DEFAULT NULL,
  responded TIMESTAMP
);