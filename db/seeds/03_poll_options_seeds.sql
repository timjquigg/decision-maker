-- Poll Options table seeds here
INSERT INTO
  poll_options (
    poll_id,
    poll_option_title,
    poll_option_description
  )
VALUES
  (1, 'Eat Out', 'New Italian restaurant'),
  (1, 'Skip The Dishes', 'Pho'),
  (
    1,
    'Go over to Kiko''s',
    'I hear he makes really good food!'
  ),
  (
    1,
    'Potluck',
    'Everyone bring a dish and let''s share'
  ),
  (1, 'Who needs dinner?', '');

INSERT INTO
  poll_options (poll_id, poll_option_title)
VALUES
  (2, 'Black Panther: Wakanda Forever'),
  (2, 'Black Adam'),
  (2, 'Ticket to Paradise'),
  (2, 'Lyle, Lyle, Crocodyle'),
  (2, 'Smile'),
  (2, 'Prey for the Devil'),
  (2, 'The Banshees of Inisherin');

INSERT INTO
  poll_options (poll_id, poll_option_title)
VALUES
  (3, 'Monday'),
  (3, 'Tuesday'),
  (3, 'Wednesday'),
  (3, 'Thursday'),
  (3, 'Friday');

INSERT INTO
  poll_options (poll_id, poll_option_title)
VALUES
  (4, 'Netherlands'),
  (4, 'England'),
  (4, 'USA'),
  (4, 'Argentina'),
  (4, 'France'),
  (4, 'Spain'),
  (4, 'Japan'),
  (4, 'Germany'),
  (4, 'Belgium'),
  (4, 'Canada'),
  (4, 'Brazil'),
  (4, 'Cameroon'),
  (4, 'Portugal'),
  (4, 'Ghana');