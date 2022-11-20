// Poll queries go here
const { query } = require('express');
const db = require('../connection');
// from '/polls' get all polls belonging to user
// send back promise to route.
const getPollsByUserID = () => {

};

// from post '/polls'
// Send promise back to router
const addNewPoll = (pollInfo) => {
  const {creator_id = 1, poll_question, isAnonymous = false, deadline} = pollInfo
  const currenttime = 'NOW()'
  const queryString = `INSERT INTO
  polls (creator_id, question, annonymous, created_on, deadline)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *`
return db
  .query(queryString, [creator_id , poll_question, isAnonymous ,currenttime ,deadline])
  .then(result => result)
  .catch(err => console.log(err.message))
};

const addOptionsToPoll = (pollInfo, pollId) => {
// console.log('APPLE:', pollInfo);
// let pollId = pollId;
const queryParams = [pollId];

let queryString = `INSERT INTO
poll_options (poll_id, poll_option_title, poll_option_description
)
VALUES`
// ($1, $2, $3)`
// RETURNING *`;

let counter = queryParams.length;

for (const keys in pollInfo) {
  // console.log(keys)
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
    // console.log(counter)
  }
};

// console.log({queryString,queryParams})

queryString += `RETURNING *;`;

return db
  .query(queryString, queryParams)
  .then(result => result)
  .catch(err => console.log(err.message));

}

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


module.exports = {
  addNewPoll,
  addOptionsToPoll
}
