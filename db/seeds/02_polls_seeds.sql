-- -- Polls table seeds here
INSERT INTO
  polls (
    creator_id,
    question,
    annonymous,
    created_on,
    deadline
  ) -- Poll #1
VALUES
  (
    1,
    'What should we have for dinner?',
    'false',
    NOW(),
    NOW() + INTERVAL '2 hour'
  ),
  -- Poll #2
  (
    2,
    'What movie should we go see?',
    'false',
    NOW(),
    NOW() + INTERVAL '1 day'
  ),
  -- Poll #3
  (
    3,
    'What day should we meet next week?',
    'false',
    NOW(),
    NOW() + INTERVAL '2 day'
  ),
  -- Poll #4
  (
    1,
    'Who will win the World Cup in Qatar?',
    'true',
    NOW(),
    NOW() + INTERVAL '5 day'
  ),
  -- Poll #5
  (
    1,
    'What should we have for breakfast?',
    'false',
    NOW(),
    NOW() + INTERVAL '2 day'
  ),
  -- Poll #6
  (
    4,
    'What What''s your favorite sport?',
    'true',
    NOW(),
    NOW() + INTERVAL '1 day'
  ),
  -- Poll #7
  (
    5,
    'What time should we have our daily meeting?',
    'false',
    NOW(),
    NOW() + INTERVAL '2 day'
  ),
  -- Poll #8
  (
    1,
    'What do you want for Christmas',
    'true',
    NOW(),
    NOW() + INTERVAL '14 day'
  );