-- -- Polls table seeds here
INSERT INTO
  polls (
    creator_id,
    question,
    annonymous,
    created_on,
    deadline
  )
VALUES
  (
    1,
    'What should we have for dinner?',
    'false',
    NOW(),
    NOW() + INTERVAL '2 hour'
  ),
  (
    2,
    'What movie should we go see?',
    'false',
    NOW(),
    NOW() + INTERVAL '1 day'
  ),
  (
    3,
    'What day should we meet next week?',
    'false',
    NOW(),
    NOW() + INTERVAL '2 day'
  ),
  (
    1,
    'Who will win the World Cup in Qatar?',
    'true',
    NOW(),
    NOW() + INTERVAL '5 day'
  );