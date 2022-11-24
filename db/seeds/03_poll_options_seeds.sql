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
  (4, 'England'),
  (4, 'Argentina'),
  (4, 'France'),
  (4, 'Japan'),
  (4, 'Canada'),
  (4, 'Brazil'),
  (4, 'Portugal');

INSERT INTO
  poll_options (poll_id, poll_option_title)
VALUES
  (5, 'Eggs'),
  (5, 'Pancakes'),
  (5, 'Waffles'),
  (5, 'French Toast'),
  (5, 'Coffffeeeeeee');

INSERT INTO
  poll_options (
    poll_id,
    poll_option_title,
    poll_option_description
  )
VALUES
  (6, 'Hockey', 'Canada''s Game'),
  (
    6,
    'Football',
    'AKA soccer, futball, The Beautiful Game'
  ),
  (6, 'Baseball', 'America''s Past Time'),
  (6, 'Rugby', ''),
  (
    6,
    'American Football',
    'Why do they call it football when it''s all in your hands?'
  ),
  (6, 'Cricket', '');

INSERT INTO
  poll_options (poll_id, poll_option_title)
VALUES
  (7, '8:00am'),
  (7, '9:00am'),
  (7, '10:00am'),
  (7, '2:00pm'),
  (7, '3:00pm');

INSERT INTO
  poll_options (
    poll_id,
    poll_option_title,
    poll_option_description
  )
VALUES
  (8, 'My two front teeth!', ''),
  (8, 'Coal', 'You know, (char)coal for BBQ!!!'),
  (8, 'The latest toy!', ''),
  (8, 'A new computer', '');