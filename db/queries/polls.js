// Poll queries go here
const { Pool } = require('pg');
const db = require('../connection');

// from '/polls' get all polls belonging to user
// send back promise to route.
const getPollsByUserID = (id) => {
  const queryString = `
  SELECT
  users.name AS username,
  polls.id AS poll_id,
  polls.question AS title,
  poll_options.poll_option_title AS option,
  SUM(responses.score) AS score,
  created_on AS date_created
  FROM polls
  JOIN users ON creator_id = users.id
  JOIN poll_options ON polls.id = poll_id
  JOIN responses ON poll_options.id = poll_option_id
  WHERE users.id = $1
  GROUP BY polls.id, poll_options.poll_option_title, users.name;
  `;
  const queryParam = [id];
  return db.query(queryString, queryParam)
  .then((results) => {
    if(results) {
      return results.rows;
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.log('error message from database:', err.message);
  })
};

// from post '/polls'
// Send promise back to router
const addNewPoll = () => {

};

// from get '/polls/:id'
// send request to db for results summary and
// return promise to router.
const getResultsByPollId = () => {

};

// from get '/polls/:id' --- Not logged in
// return promise to router
const getPollDataById = () => {

};

// from post '/polls/:id'
// return promise to router
const addResultsToPoll = () => {
  
};

module.exports = { getPollsByUserID };