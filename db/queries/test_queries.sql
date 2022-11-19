-- Get Rank
SELECT
  poll_option_title as option_title,
  poll_option_description as option_description,
  SUM(score)
FROM
  responses
  JOIN poll_options ON responses.poll_option_id = poll_options.id
  JOIN polls on polls.id = poll_options.poll_id
WHERE
  poll_id = 4
GROUP BY
  poll_options.id
ORDER BY
  SUM(score) DESC;

-- Poll History based on user
SELECT
  polls.question AS title,
  created_on AS date_created,
  CASE WHEN deadline < NOW()
  THEN 'Active' ELSE 'Closed'
  END AS status
FROM polls
  JOIN users ON creator_id = users.id
WHERE users.id = 1;




