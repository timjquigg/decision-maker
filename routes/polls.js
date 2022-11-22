/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// const e = require('express');
const express = require('express');
const router  = express.Router();
const db = require('../db/queries/polls');
const userdb = require('../db/queries/users');

// Only accessible if logged in:
router.get('/', (req, res) => {

  // If logged in, will display profile page
  // send request to polls db file to get polls
  const userId = req.session.userId;
  const userFirstName = req.session.userFirst;
  // Redirect to home page if not logged in
  if (!userId) {
    res.redirect('../');
    return;
  }
  // Get polls & option info without results
  db.getPollsByUserID(userId)
    .then((data) => {
      // Get results data
      db.getPollResultsByPoll(userId)
        .then((score)=>{
          // Convert array of scores, to useable object
          const newScores = {};
          for (const index in score) {
            newScores[score[index].option] = score[index].score;
          }

          const object = {};

          for (let i = 0; i < data.length; i++) {
            const group = data[i];
            const poll = group.title;

            // If results are not available yet, make score 0
            let thisScore;
            if (newScores[group.option]) {
              thisScore = newScores[group.option];
            } else {
              thisScore = '0';
            }

            if (object[poll]) {
              object[poll].push({
                option: group.option,
                score: thisScore,
                date_created: group.date_created,
                pollId: group.poll_id
              });
            } else {
              object[poll] = [{
                option: group.option,
                score: thisScore,
                date_created: group.date_created,
                pollId: group.poll_id
              }];
            }
          }
          const tempVar = {
            object: object,
            username: userFirstName
          };
          // console.log("object:", object);
          res.render('profile', tempVar);
        });
    })
    .catch(e => res.send(e));
});

// load create-poll page
router.get('/new', (req, res) => {
  // Redirect to home page if not logged in
  if (!req.session.userId) {
    res.redirect('../');
    return;
  }

  const tempVar = {username: req.session.userFirst};
  res.render('create_poll', tempVar);
});

router.post('/', (req, res) => {
  // Send data from poll creation form to db js file
  // forward promise response to front end so
  // client side js can display links

  // console.log('Poll Info', req.body);

  //Adds a new poll to the db then adds the options of that poll to the db.
  const userId = req.session.userId;
  db.addNewPoll(req.body, userId)
    .then(result => {
      // console.log('poll log:', result.rows);
      db.getTotalPoll()
        .then(result => res.send(result.rows[0].count))
        .catch(err => console.log(err.message));
      const pollId = result.rows[0].id;
      db.addOptionsToPoll(req.body, pollId)
        .then(result => {
          // console.log('options log', result.rows);

          return result;
        });
      // return result;
    })
    .catch(err => console.log(err));


});

router.get('/:id', (req, res) => {
  const pollId = req.params.id;
  const pollData = {};
  db.getPollDataById(pollId)
    .then(result => {
      // console.log(result.rows)
      result.rows.forEach(data => {
        // console.log(data.poll_id);
        if (!pollData[data.poll_id]) {
          pollData[data.poll_id] = {
            // optionId: data.option_id,
            question : data.question,
            isAnonymous: data.is_anonymous,
            options : [[data.option_id,data.options, data.description]]
          };
        } else {
          pollData[data.poll_id].options.push([data.option_id, data.options, data.description]);
        }
      });
      // console.log('apple:',pollData[pollId]);

      const tempVar = {
        username: req.session.userFirst,
        question: pollData[pollId].question,
        anonymous: pollData[pollId].isAnonymous,
        options: pollData[pollId].options,
      };
      console.log(tempVar);
      res.render('response.ejs', tempVar);
      // res.render('response.ejs');
    })
    .catch(err => console.log(err.message));
  // Redirect to home page if not logged in
  if (!req.session.userId) {
    res.redirect('../');
    return;
  }

  // not logged in user:
  // query db for poll data
  // forward db response in redirect to response.ejs
});

router.post('/:id', (req, res) => {
  // console.log('apple:', req.body)
  const {name = null, result} = req.body;
  // console.log(req.body)
  // console.log(name)
  // console.log(result)
  let resultLen = result.length;
  const scoreSheet = [];
  result.forEach(optionId => {
    scoreSheet.push([Number(optionId), resultLen]);
    resultLen--;
  });

  console.log(scoreSheet);

  db.addResultsToPoll(name,scoreSheet)
    .then(result => result)
    .catch(error => console.log(error));

  // A returned poll is received

  // send form data to db js for adding to db
  // after recieving promise from db, client side
  // js display thank you and link to home page


});

router.get('/results/:id', (req, res) => {
  const userId = req.session.userId;
  const userFirstName = req.session.userFirst;
  const pollId = req.params.id;

  db.getResultsByPollId(pollId)
    .then((data) => {
      // Get results data
      db.getPollResultsByPoll(userId)
        .then((score)=>{
          // Convert array of scores, to useable object
          const newScores = {};
          for (const index in score) {
            newScores[score[index].option] = score[index].score;
          }

          const object = {};

          for (let i = 0; i < data.length; i++) {
            const group = data[i];
            const poll = group.title;

            // If results are not available yet, make score 0
            let thisScore;
            if (newScores[group.option]) {
              thisScore = newScores[group.option];
            } else {
              thisScore = '0';
            }

            if (object[poll]) {
              object[poll].push({
                option: group.option,
                score: thisScore,
                date_created: group.date_created,
                pollId: group.poll_id
              });
            } else {
              object[poll] = [{
                option: group.option,
                score: thisScore,
                date_created: group.date_created,
                pollId: group.poll_id
              }];
            }
          }
          const tempVar = {
            object: object,
            username: userFirstName
          };
          console.log("object:", object);
          res.render('results', tempVar);
        });
    })
    .catch(e => res.send(e));
});

module.exports = router;
