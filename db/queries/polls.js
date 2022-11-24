// Poll queries go here
const { Pool } = require('pg');
const db = require('../connection');
const { query } = require('express');


// 2 QUERIES: 1) RETURNS JUST THE POLL IDs based on USER_ID
//            2) query that exists now
// from '/polls' get all polls belonging to user
// send back promise to route.
const getPollsByUserID = (id) => {
  const queryString = `
  SELECT
  users.first_name AS firstname,
  users.last_name AS lastname,
  polls.id AS poll_id,
  polls.question AS title,
  poll_options.poll_option_title AS option,
  created_on AS date_created
  FROM polls
  JOIN users ON creator_id = users.id
  JOIN poll_options ON polls.id = poll_id
  WHERE users.id = $1
  GROUP BY polls.id, poll_options.poll_option_title, users.first_name, users.last_name;
  `;

  const queryParam = [id];
  return db.query(queryString, queryParam)
    .then((results) => {
      if (results) {
        return results.rows;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log('error message from database:', err.message);
    });
};

const getPollResultsByPoll = (id) => {
  const queryString = `
  SELECT
  poll_options.poll_option_title AS option,
  SUM(responses.score) AS score
  FROM poll_options
  JOIN responses ON poll_options.id = poll_option_id
  JOIN polls ON polls.id = poll_options.poll_id
  JOIN users ON polls.creator_id = users.id
  WHERE polls.creator_id = $1
  GROUP BY poll_options.poll_option_title;
  `;
  const queryParam = [id];
  return db.query(queryString, queryParam)
    .then((results) => {
      if (results) {
        return results.rows;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log('error message from database:', err.message);
    });
};

// from post '/polls'
// Send promise back to router
const addNewPoll = (pollInfo, userID = null) => {
  const {creator_id = userID, poll_question, isAnonymous = false, deadline} = pollInfo;
  const currenttime = 'NOW()';
  const queryString = `INSERT INTO
  polls (creator_id, question, annonymous, created_on, deadline)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *`;
  return db
    .query(queryString, [creator_id , poll_question, isAnonymous ,currenttime ,deadline])
    .then(result => result)
    .catch(err => console.log(err.message));
};

const addOptionsToPoll = (pollInfo, pollId) => {

  const queryParams = [pollId];

  let queryString = `INSERT INTO
poll_options (poll_id, poll_option_title, poll_option_description
)
VALUES`;
  // ($1, $2, $3)`
  // RETURNING *`;

  let counter = queryParams.length;

  for (const keys in pollInfo) {
  // console.log(keys)
  // data shows up as (id, option_title, option_desc)
  // .includes filters out id and just reads the options data
  // counter specifies the value of the '$num' based on the current length
  // of the queryParams
    if (keys.includes('option')) {
    // console.log(pollInfo[keys])
      if (counter <= 1) {
        queryString += '($1';
      }
      if (counter > 1) {
        queryString += ',($1';
      }
      queryParams.push(pollInfo[keys][0]);
      counter ++;
      queryString += `, $${counter}`;
      counter ++;
      queryParams.push(pollInfo[keys][1]);
      queryString += `, $${counter}`;
      queryString += `)`;

    }
  }

  queryString += `RETURNING *;`;

  return db
    .query(queryString, queryParams)
    .then(result => result)
    .catch(err => console.log(err.message));

};

// from get '/polls/:id'
// send request to db for results summary and
// return promise to router.

const getOptionsByPollId = (pollId) => {
  const queryString = `
  SELECT
  users.id as userId,
  users.first_name AS firstname,
  users.last_name AS lastname,
  polls.id AS poll_id,
  polls.question AS title,
  poll_options.poll_option_title AS option,
  polls.annonymous AS isAnnonymous,
  created_on AS date_created
  FROM polls
  JOIN users ON creator_id = users.id
  JOIN poll_options ON polls.id = poll_id
  WHERE polls.id = $1
  GROUP BY users.id, polls.id, poll_options.poll_option_title, users.first_name, users.last_name;
  `;
  const queryParam = [pollId];
  return db.query(queryString, queryParam)
    .then((results) => {
      if (results) {
        return results.rows;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log('error message from database:', err.message);
    });
};

const getNamesResponded = (pollId) => {
  const queryString = `
  SELECT responses.name AS respondedBy,
  responses.responded AS time_responded
  FROM responses JOIN poll_options ON poll_options.id = poll_option_id
  JOIN polls ON poll_id = polls.id
  WHERE polls.id = $1
  GROUP BY responses.name, time_responded;
  `;
  return db.query(queryString, [pollId])
    .then(results => {
      if (results) {
        return results.rows;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log('error message from database:', err.message);
    });
};

// Gets the information of the poll to be used to render the response page
const getPollDataById = (id) => {
  let queryParams = [id];
  let queryString = `
  SELECT poll_id,
  poll_options.id AS option_id,
  question,
  poll_option_title AS options,
  poll_option_description AS description,
  annonymous AS is_Anonymous,
  polls.deadline AS deadline
  FROM polls JOIN poll_options ON polls.id = poll_id
  WHERE polls.id = $1;
  `;
  return db
    .query(queryString, queryParams)
    .then(result => result)
    .catch(err => console.log(err));

};

// from post '/polls/:id'
// return promise to router

// adds the result to poll, name is null by default for users not signed in
const addResultsToPoll = (name = null, pollResponse) => {

  let scoreSheet = pollResponse;

  // query params initiated with the name as $1
  let queryParams = [name];
  // counter initializes the max score per poll
  let counter = queryParams.length;
  let queryString =
`
INSERT INTO responses
(poll_option_id, score, name, responded)
VALUES

`;

  // it builds the value as ($1, $2, $3), ($1, $4, $5), ... depends on num of options
  scoreSheet.forEach((data, index) => {
    if (index <= 0) {
      queryString += `(`;
    } else {
      queryString += `,(`;
    }
    queryString += `$${counter + 1}, $${counter + 2}, $1, NOW())`;

    queryParams.push(data[0]);
    queryParams.push(data[1]);

    counter += 2;

  });

  queryString +=  `RETURNING *;`;
  console.log(queryParams);
  console.log(queryString);
  return db
    .query(queryString, queryParams)
    .then(result => result)
    .catch(err => console.log(err));

};

// gets the latest number of the polls to be used for the url,
// it gets called as soon as the user creates a poll and send it back to the
// ejs file.
const getTotalPoll = () => {
  let queryString = `SELECT COUNT(*) FROM polls;`;
  return db
    .query(queryString, [])
    .then(result => result)
    .catch(err => console.log(err));
};

// used for mailgun if the user is logged in.
const getEmailByPoll = (pollId) => {
  let queryString = `SELECT DISTINCT(email), first_name
  FROM polls JOIN users
  ON creator_id = users.id
  WHERE polls.id = $1;`;

  return db
    .query(queryString, [pollId])
    .then(result => result)
    .catch(err => console.log(err));
};

// retrieves the data of a specific poll based on an option
// used for mailgun
const getPollDataByOptionsId = (optionId) => {
  let queryString = `SELECT polls.id, email, question, polls.created_on
  FROM polls
  JOIN poll_options ON poll_id = polls.id
  JOIN users ON users.id = creator_id
  WHERE poll_options.id = $1`;

  return db
    .query(queryString, [optionId])
    .then(result => result)
    .catch(err => console.log(err));

};


module.exports = {
  addNewPoll,
  addOptionsToPoll,
  getPollsByUserID,
  getPollDataById,
  addResultsToPoll,
  getPollResultsByPoll,
  getOptionsByPollId,
  getNamesResponded,
  getTotalPoll,
  getEmailByPoll,
  getPollDataByOptionsId
};


