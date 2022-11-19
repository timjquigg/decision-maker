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