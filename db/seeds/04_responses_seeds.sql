-- Responses seeds are here:
-- Poll #1
INSERT INTO
  responses (poll_option_id, score, name, responded)
VALUES
  (1, 4, 'Dean', NOW() + INTERVAL '5 minute'),
  (2, 3, 'Dean', NOW() + INTERVAL '5 minute'),
  (3, 2, 'Dean', NOW() + INTERVAL '5 minute'),
  (4, 1, 'Dean', NOW() + INTERVAL '5 minute'),
  (5, 0, 'Dean', NOW() + INTERVAL '5 minute');

INSERT INTO
  responses (poll_option_id, score, name, responded)
VALUES
  (1, 2, 'Emma', NOW() + INTERVAL '15 minute'),
  (2, 3, 'Emma', NOW() + INTERVAL '15 minute'),
  (3, 4, 'Emma', NOW() + INTERVAL '15 minute'),
  (4, 0, 'Emma', NOW() + INTERVAL '15 minute'),
  (5, 1, 'Emma', NOW() + INTERVAL '15 minute');

INSERT INTO
  responses (poll_option_id, score, name, responded)
VALUES
  (1, 0, 'Fred', NOW() + INTERVAL '5 minute'),
  (2, 1, 'Fred', NOW() + INTERVAL '5 minute'),
  (3, 3, 'Fred', NOW() + INTERVAL '5 minute'),
  (4, 4, 'Fred', NOW() + INTERVAL '5 minute'),
  (5, 0, 'Fred', NOW() + INTERVAL '5 minute');

INSERT INTO
  responses (poll_option_id, score, name, responded)
VALUES
  (1, 1, 'Giselle', NOW() + INTERVAL '1 hour'),
  (2, 0, 'Giselle', NOW() + INTERVAL '1 hour'),
  (3, 3, 'Giselle', NOW() + INTERVAL '1 hour'),
  (4, 2, 'Giselle', NOW() + INTERVAL '1 hour'),
  (5, 4, 'Giselle', NOW() + INTERVAL '1 hour');

INSERT INTO
  responses (poll_option_id, score, name, responded)
VALUES
  (1, 3, 'Hank', NOW() + INTERVAL '25 minute'),
  (2, 2, 'Hank', NOW() + INTERVAL '25 minute'),
  (3, 4, 'Hank', NOW() + INTERVAL '25 minute'),
  (4, 1, 'Hank', NOW() + INTERVAL '25 minute'),
  (5, 0, 'Hank', NOW() + INTERVAL '25 minute');

-- Poll #2
INSERT INTO
  responses (poll_option_id, score, name, responded)
VALUES
  (6, 6, 'Isabella', NOW() + INTERVAL '25 minute'),
  (7, 5, 'Isabella', NOW() + INTERVAL '25 minute'),
  (8, 4, 'Isabella', NOW() + INTERVAL '25 minute'),
  (9, 3, 'Isabella', NOW() + INTERVAL '25 minute'),
  (10, 2, 'Isabella', NOW() + INTERVAL '25 minute'),
  (11, 1, 'Isabella', NOW() + INTERVAL '25 minute'),
  (12, 0, 'Isabella', NOW() + INTERVAL '25 minute');

INSERT INTO
  responses (poll_option_id, score, name, responded)
VALUES
  (6, 6, 'Jeff', NOW() + INTERVAL '5 minute'),
  (7, 4, 'Jeff', NOW() + INTERVAL '5 minute'),
  (8, 2, 'Jeff', NOW() + INTERVAL '5 minute'),
  (9, 5, 'Jeff', NOW() + INTERVAL '5 minute'),
  (10, 3, 'Jeff', NOW() + INTERVAL '5 minute'),
  (11, 1, 'Jeff', NOW() + INTERVAL '5 minute'),
  (12, 0, 'Jeff', NOW() + INTERVAL '5 minute');

INSERT INTO
  responses (poll_option_id, score, name, responded)
VALUES
  (6, 0, 'Kate', NOW() + INTERVAL '15 minute'),
  (7, 1, 'Kate', NOW() + INTERVAL '15 minute'),
  (8, 2, 'Kate', NOW() + INTERVAL '15 minute'),
  (9, 3, 'Kate', NOW() + INTERVAL '15 minute'),
  (10, 4, 'Kate', NOW() + INTERVAL '15 minute'),
  (11, 5, 'Kate', NOW() + INTERVAL '15 minute'),
  (12, 6, 'Kate', NOW() + INTERVAL '15 minute');

INSERT INTO
  responses (poll_option_id, score, name, responded)
VALUES
  (6, 3, 'Luke', NOW() + INTERVAL '1 hour'),
  (7, 5, 'Luke', NOW() + INTERVAL '1 hour'),
  (8, 1, 'Luke', NOW() + INTERVAL '1 hour'),
  (9, 2, 'Luke', NOW() + INTERVAL '1 hour'),
  (10, 0, 'Luke', NOW() + INTERVAL '1 hour'),
  (11, 6, 'Luke', NOW() + INTERVAL '1 hour'),
  (12, 4, 'Luke', NOW() + INTERVAL '1 hour');

INSERT INTO
  responses (poll_option_id, score, name, responded)
VALUES
  (6, 4, 'Michelle', NOW() + INTERVAL '45 minute'),
  (7, 5, 'Michelle', NOW() + INTERVAL '45 minute'),
  (8, 2, 'Michelle', NOW() + INTERVAL '45 minute'),
  (9, 1, 'Michelle', NOW() + INTERVAL '45 minute'),
  (10, 6, 'Michelle', NOW() + INTERVAL '45 minute'),
  (11, 0, 'Michelle', NOW() + INTERVAL '45 minute'),
  (12, 3, 'Michelle', NOW() + INTERVAL '45 minute');

-- Poll #3
INSERT INTO
  responses (poll_option_id, score, name, responded)
VALUES
  (13, 4, 'Kiko', NOW() + INTERVAL '2 hour'),
  (14, 3, 'Kiko', NOW() + INTERVAL '2 hour'),
  (15, 2, 'Kiko', NOW() + INTERVAL '2 hour'),
  (16, 1, 'Kiko', NOW() + INTERVAL '2 hour'),
  (17, 0, 'Kiko', NOW() + INTERVAL '2 hour');

INSERT INTO
  responses (poll_option_id, score, name, responded)
VALUES
  (13, 2, 'Sato', NOW() + INTERVAL '35 minute'),
  (14, 4, 'Sato', NOW() + INTERVAL '35 minute'),
  (15, 1, 'Sato', NOW() + INTERVAL '35 minute'),
  (16, 0, 'Sato', NOW() + INTERVAL '35 minute'),
  (17, 3, 'Sato', NOW() + INTERVAL '35 minute');

INSERT INTO
  responses (poll_option_id, score, name, responded)
VALUES
  (13, 0, 'Tim', NOW() + INTERVAL '1 day'),
  (14, 4, 'Tim', NOW() + INTERVAL '1 day'),
  (15, 3, 'Tim', NOW() + INTERVAL '1 day'),
  (16, 2, 'Tim', NOW() + INTERVAL '1 day'),
  (17, 1, 'Tim', NOW() + INTERVAL '1 day');

-- Poll #4
INSERT INTO
  responses (poll_option_id, score, responded)
VALUES
  (19, 13, NOW() + INTERVAL '1 day'),
  (20, 12, NOW() + INTERVAL '1 day'),
  (21, 11, NOW() + INTERVAL '1 day'),
  (22, 10, NOW() + INTERVAL '1 day'),
  (23, 9, NOW() + INTERVAL '1 day'),
  (18, 8, NOW() + INTERVAL '1 day'),
  (24, 7, NOW() + INTERVAL '1 day'),
  (25, 6, NOW() + INTERVAL '1 day'),
  (26, 5, NOW() + INTERVAL '1 day'),
  (27, 4, NOW() + INTERVAL '1 day'),
  (28, 3, NOW() + INTERVAL '1 day'),
  (29, 2, NOW() + INTERVAL '1 day'),
  (30, 1, NOW() + INTERVAL '1 day'),
  (31, 0, NOW() + INTERVAL '1 day');

INSERT INTO
  responses (poll_option_id, score, responded)
VALUES
  (19, 12, NOW() + INTERVAL '1 day'),
  (20, 11, NOW() + INTERVAL '1 day'),
  (21, 10, NOW() + INTERVAL '1 day'),
  (22, 9, NOW() + INTERVAL '1 day'),
  (23, 8, NOW() + INTERVAL '1 day'),
  (18, 7, NOW() + INTERVAL '1 day'),
  (24, 6, NOW() + INTERVAL '1 day'),
  (25, 5, NOW() + INTERVAL '1 day'),
  (26, 4, NOW() + INTERVAL '1 day'),
  (27, 3, NOW() + INTERVAL '1 day'),
  (28, 2, NOW() + INTERVAL '1 day'),
  (29, 1, NOW() + INTERVAL '1 day'),
  (30, 0, NOW() + INTERVAL '1 day'),
  (31, 13, NOW() + INTERVAL '1 day');

INSERT INTO
  responses (poll_option_id, score, responded)
VALUES
  (19, 1, NOW() + INTERVAL '1 day'),
  (20, 2, NOW() + INTERVAL '1 day'),
  (21, 3, NOW() + INTERVAL '1 day'),
  (22, 4, NOW() + INTERVAL '1 day'),
  (23, 5, NOW() + INTERVAL '1 day'),
  (18, 6, NOW() + INTERVAL '1 day'),
  (24, 7, NOW() + INTERVAL '1 day'),
  (25, 8, NOW() + INTERVAL '1 day'),
  (26, 9, NOW() + INTERVAL '1 day'),
  (27, 0, NOW() + INTERVAL '1 day'),
  (28, 10, NOW() + INTERVAL '1 day'),
  (29, 11, NOW() + INTERVAL '1 day'),
  (30, 12, NOW() + INTERVAL '1 day'),
  (31, 13, NOW() + INTERVAL '1 day');

INSERT INTO
  responses (poll_option_id, score, responded)
VALUES
  (19, 2, NOW() + INTERVAL '1 day'),
  (20, 4, NOW() + INTERVAL '1 day'),
  (21, 6, NOW() + INTERVAL '1 day'),
  (22, 8, NOW() + INTERVAL '1 day'),
  (23, 10, NOW() + INTERVAL '1 day'),
  (18, 12, NOW() + INTERVAL '1 day'),
  (24, 1, NOW() + INTERVAL '1 day'),
  (25, 3, NOW() + INTERVAL '1 day'),
  (26, 5, NOW() + INTERVAL '1 day'),
  (27, 7, NOW() + INTERVAL '1 day'),
  (28, 9, NOW() + INTERVAL '1 day'),
  (29, 0, NOW() + INTERVAL '1 day'),
  (30, 11, NOW() + INTERVAL '1 day'),
  (31, 13, NOW() + INTERVAL '1 day');

INSERT INTO
  responses (poll_option_id, score, responded)
VALUES
  (19, 11, NOW() + INTERVAL '1 day'),
  (20, 10, NOW() + INTERVAL '1 day'),
  (21, 9, NOW() + INTERVAL '1 day'),
  (22, 8, NOW() + INTERVAL '1 day'),
  (23, 7, NOW() + INTERVAL '1 day'),
  (18, 6, NOW() + INTERVAL '1 day'),
  (24, 5, NOW() + INTERVAL '1 day'),
  (25, 4, NOW() + INTERVAL '1 day'),
  (26, 3, NOW() + INTERVAL '1 day'),
  (27, 2, NOW() + INTERVAL '1 day'),
  (28, 1, NOW() + INTERVAL '1 day'),
  (29, 12, NOW() + INTERVAL '1 day'),
  (30, 13, NOW() + INTERVAL '1 day'),
  (31, 0, NOW() + INTERVAL '1 day');

INSERT INTO
  responses (poll_option_id, score, responded)
VALUES
  (19, 1, NOW() + INTERVAL '1 day'),
  (20, 3, NOW() + INTERVAL '1 day'),
  (21, 5, NOW() + INTERVAL '1 day'),
  (22, 7, NOW() + INTERVAL '1 day'),
  (23, 9, NOW() + INTERVAL '1 day'),
  (18, 11, NOW() + INTERVAL '1 day'),
  (24, 13, NOW() + INTERVAL '1 day'),
  (25, 0, NOW() + INTERVAL '1 day'),
  (26, 2, NOW() + INTERVAL '1 day'),
  (27, 4, NOW() + INTERVAL '1 day'),
  (28, 6, NOW() + INTERVAL '1 day'),
  (29, 8, NOW() + INTERVAL '1 day'),
  (30, 10, NOW() + INTERVAL '1 day'),
  (31, 12, NOW() + INTERVAL '1 day');

INSERT INTO
  responses (poll_option_id, score, responded)
VALUES
  (19, 5, NOW() + INTERVAL '1 day'),
  (20, 10, NOW() + INTERVAL '1 day'),
  (21, 4, NOW() + INTERVAL '1 day'),
  (22, 9, NOW() + INTERVAL '1 day'),
  (23, 3, NOW() + INTERVAL '1 day'),
  (18, 8, NOW() + INTERVAL '1 day'),
  (24, 2, NOW() + INTERVAL '1 day'),
  (25, 7, NOW() + INTERVAL '1 day'),
  (26, 1, NOW() + INTERVAL '1 day'),
  (27, 13, NOW() + INTERVAL '1 day'),
  (28, 6, NOW() + INTERVAL '1 day'),
  (29, 0, NOW() + INTERVAL '1 day'),
  (30, 12, NOW() + INTERVAL '1 day'),
  (31, 11, NOW() + INTERVAL '1 day');

INSERT INTO
  responses (poll_option_id, score, responded)
VALUES
  (19, 5, NOW() + INTERVAL '1 day'),
  (20, 10, NOW() + INTERVAL '1 day'),
  (21, 4, NOW() + INTERVAL '1 day'),
  (22, 9, NOW() + INTERVAL '1 day'),
  (23, 3, NOW() + INTERVAL '1 day'),
  (18, 8, NOW() + INTERVAL '1 day'),
  (24, 2, NOW() + INTERVAL '1 day'),
  (25, 7, NOW() + INTERVAL '1 day'),
  (26, 1, NOW() + INTERVAL '1 day'),
  (27, 13, NOW() + INTERVAL '1 day'),
  (28, 6, NOW() + INTERVAL '1 day'),
  (29, 0, NOW() + INTERVAL '1 day'),
  (30, 12, NOW() + INTERVAL '1 day'),
  (31, 11, NOW() + INTERVAL '1 day');

INSERT INTO
  responses (poll_option_id, score, responded)
VALUES
  (19, 5, NOW() + INTERVAL '1 day'),
  (20, 10, NOW() + INTERVAL '1 day'),
  (21, 4, NOW() + INTERVAL '1 day'),
  (22, 9, NOW() + INTERVAL '1 day'),
  (23, 3, NOW() + INTERVAL '1 day'),
  (18, 8, NOW() + INTERVAL '1 day'),
  (24, 2, NOW() + INTERVAL '1 day'),
  (25, 7, NOW() + INTERVAL '1 day'),
  (26, 1, NOW() + INTERVAL '1 day'),
  (27, 13, NOW() + INTERVAL '1 day'),
  (28, 6, NOW() + INTERVAL '1 day'),
  (29, 0, NOW() + INTERVAL '1 day'),
  (30, 12, NOW() + INTERVAL '1 day'),
  (31, 11, NOW() + INTERVAL '1 day');

INSERT INTO
  responses (poll_option_id, score, responded)
VALUES
  (19, 5, NOW() + INTERVAL '1 day'),
  (20, 10, NOW() + INTERVAL '1 day'),
  (21, 4, NOW() + INTERVAL '1 day'),
  (22, 9, NOW() + INTERVAL '1 day'),
  (23, 3, NOW() + INTERVAL '1 day'),
  (18, 8, NOW() + INTERVAL '1 day'),
  (24, 2, NOW() + INTERVAL '1 day'),
  (25, 7, NOW() + INTERVAL '1 day'),
  (26, 11, NOW() + INTERVAL '1 day'),
  (27, 13, NOW() + INTERVAL '1 day'),
  (28, 6, NOW() + INTERVAL '1 day'),
  (29, 0, NOW() + INTERVAL '1 day'),
  (30, 12, NOW() + INTERVAL '1 day'),
  (31, 1, NOW() + INTERVAL '1 day');

INSERT INTO
  responses (poll_option_id, score, responded)
VALUES
  (19, 5, NOW() + INTERVAL '1 day'),
  (20, 10, NOW() + INTERVAL '1 day'),
  (21, 4, NOW() + INTERVAL '1 day'),
  (22, 9, NOW() + INTERVAL '1 day'),
  (23, 3, NOW() + INTERVAL '1 day'),
  (18, 8, NOW() + INTERVAL '1 day'),
  (24, 2, NOW() + INTERVAL '1 day'),
  (25, 7, NOW() + INTERVAL '1 day'),
  (26, 11, NOW() + INTERVAL '1 day'),
  (27, 13, NOW() + INTERVAL '1 day'),
  (28, 6, NOW() + INTERVAL '1 day'),
  (29, 0, NOW() + INTERVAL '1 day'),
  (30, 12, NOW() + INTERVAL '1 day'),
  (31, 1, NOW() + INTERVAL '1 day');