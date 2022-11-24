/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// const e = require('express');
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const router  = express.Router();
const db = require('../db/queries/polls');
const userDB = require('../db/queries/users');

//mailgun
const mailgun = require("mailgun-js");

//IP
const IP = require('ip');

let ipAddress = IP.address();


//Enter domain and api_keys key here
const DOMAIN = process.env.MG_DOMAIN_KEY;
const api_key = process.env.MG_API_KEY;
const mg = mailgun({apiKey: api_key, domain: DOMAIN});

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
          // console.log(score);
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

          res.render('profile', tempVar);
        });
    })
    .catch(e => res.send(e));
});

// load create-poll page
router.get('/new', (req, res) => {
  // Redirect to home page if not logged in
  if (!req.session.userId) {
    req.session = {
      userId : null,
      userFirst : null,
      userLast : null,
      userEmail : null
    };
  }

  const tempVar = {username: req.session.userFirst};
  res.render('create_poll', tempVar);
});

// // Create Anonymous Poll
// router.get('/new:anonymous', (req, res) => {
//   // Redirect to home page if not logged in

//   const tempVar = {username: 'anonymous'};
//   res.render('create_poll', tempVar);
// });

router.post('/', (req, res) => {


  // Send data from poll creation form to db js file
  // forward promise response to front end so
  // client side js can display links

  //Adds a new poll to the db then adds the options of that poll to the db.

  if (req.body.email) {
    const userCredentials = {
      firstName: null,
      lastName: null,
      email: req.body.email,
      password: null
    };
    userDB.addUsers(userCredentials)
      .then((user) => {
        console.log(user);
        const userId = user.id;

        //adds a new poll to the db
        db.addNewPoll(req.body, userId)
          .then(result => {
            const pollId = result.rows[0].id;


            if (process.env.NODE_ENV === 'production') {
              ipAddress = req.hostname;
            }

            // shoots an email to the creator of the email

            ///////////////////////MAILGUN/////////////////////////
            const data = {
              from: 'Ranker <kikopocampo@gmail.com>',
              to: req.body.email,
              subject: 'Success! Poll created',
              text: `Hi! You have created a Poll:
              \nShare your poll: http://${ipAddress}:8080/polls/${pollId}
              \nSee the result: http://${ipAddress}:8080/polls/results/${pollId}

              \nTo start saving your polls, create an account now: http://${ipAddress}:8080/users
              \nThank you for choosing Ranker!

              \nBest,
              \nRanker Team
              `
            };
            mg.messages().send(data, function(error, body) {
              if (error) {
                console.log(error);
              }
              console.log(body);
            });
            //////////////////////////////////////////////////////

            // gets the latest poll number to be used for the url
            db.getTotalPoll()
              .then(result => {

                if (process.env.NODE_ENV === 'production') {
                  ipAddress = req.hostname;
                }

                const pollData = {
                  count : result.rows[0].count,
                  ip: ipAddress
                };
                res.send(pollData);
              })
              .catch(err => console.log(err.message));
            db.addOptionsToPoll(req.body, pollId)
              .then(result => {
                return result;
              });
          })
          .catch(err => console.log(err));
      });
    return;
  }

  //if user is logged in
  const userId = req.session.userId;
  db.addNewPoll(req.body, userId)
    .then(result => {
      db.getTotalPoll()
        .then(result => {

          if (process.env.NODE_ENV === 'production') {
            ipAddress = req.hostname;
          }

          const pollData = {
            count : result.rows[0].count,
            ip: ipAddress
          };
          res.send(pollData);
        })
        .catch(err => console.log(err.message));
      const pollId = result.rows[0].id;
      db.getEmailByPoll(pollId)
        .then(result => {

          if (process.env.NODE_ENV === 'production') {
            ipAddress = req.hostname;
          }

          ///////////////////////MAILGUN/////////////////////////
          const data = {
            from: 'Decision Maker <kikopocampo@gmail.com>',
            to: result.rows[0].email,
            subject: 'Success! Poll created',
            text: `Hi, ${result.rows[0].first_name}.

              \nYou have created a Poll:
              \nShare your poll: http://${ipAddress}:8080/polls/${pollId}
              \nSee the result: http://${ipAddress}:8080/polls/results/${pollId}

              \nTo manage your polls, log in to your account: http://${ipAddress}:8080/users
              \nThank you for using Ranker.

              \nBest,
              \nRanker Team
              `
          };
          mg.messages().send(data, function(error, body) {
            if (error) {
              console.log(error);
            }
            console.log(body);
          });
          //////////////////////////////////////////////////////
        });
      db.addOptionsToPoll(req.body, pollId)
        .then(result => {

          return result;
        });

    })
    .catch(err => console.log(err));


});

router.get('/:id', (req, res) => {
  const pollId = req.params.id;
  const pollData = {};
  if (!Number.isInteger(Number(pollId))) {
    res.redirect('../404');
    return;
  }

  // gets the poll information based on the pollID
  // (poll.id, the question, if anonymous, and the option details [option_id, option_title, and option_description if any])
  db.getPollDataById(pollId)
    .then(result => {
      if (result.rows.length === 0) {
        res.redirect('../404');
        return;
      }
      if (Date.now() > result.rows[0].deadline) {
        const tempVar = {username: req.session.userFirst};
        res.render('expired', tempVar);
        return;
      }
      result.rows.forEach(data => {

        if (!pollData[data.poll_id]) {
          pollData[data.poll_id] = {

            question : data.question,
            isAnonymous: data.is_anonymous,
            options : [[data.option_id,data.options, data.description]]
          };
        } else {
          pollData[data.poll_id].options.push([data.option_id, data.options, data.description]);
        }
      });

      const tempVar = {
        username: req.session.userFirst,
        question: pollData[pollId].question,
        anonymous: pollData[pollId].isAnonymous,
        options: pollData[pollId].options,
      };

      res.render('response.ejs', tempVar);
    })
    .catch(err => console.log(err.message));
});

router.post('/:id', (req, res) => {

  const {name = null, result} = req.body;

  let resultLen = result.length;
  // initializes the score sheet with the format [[option.id,score],[option.id, score], ...]
  // Which will then be used by the addResultsToPoll function to form the query
  // in a similar format VALUE(($1,$2,$3), ($1,$4,$5),...)
  const scoreSheet = [];
  result.forEach(optionId => {
    scoreSheet.push([Number(optionId), resultLen]);
    resultLen--;
  });

  console.log(scoreSheet);
  // inserts the result in the db based on the score sheet
  db.addResultsToPoll(name,scoreSheet)
    .then(result => {

      // gets specific info about the poll based on the option to be used for
      // the email body
      db.getPollDataByOptionsId(result.rows[0].poll_option_id)
        .then(result => {

          const {id : pollId, email, question, created_on : dateCreated} = result.rows[0];

          if (process.env.NODE_ENV === 'production') {
            ipAddress = req.hostname;
          }

          ///////////////////////MAILGUN/////////////////////////
          const data = {
            from: 'Ranker <kikopocampo@gmail.com>',
            to: email,
            subject: 'Response Notification',
            text: `
            \nSomeone has responded to your poll!
            \nPoll question: ${question}
            \nCreated at: ${dateCreated}
            \nSee the results: http://${ipAddress}:8080/polls/results/${pollId}

            \nTo manage your polls, log in to your account: http://${ipAddress}:8080/users
            \nThank you for choosing Ranker.

            \nBest,
            \nRanker Team
            `
          };
          mg.messages().send(data, function(error, body) {
            if (error) {
              console.log(error);
            }
            console.log(body);
          });
          //////////////////////////////////////////////////////

          return result;
        });
      return result;
    })
    .catch(error => console.log(error));



});


router.get('/results/:id', (req, res) => {
  const userId = req.session.userId;
  const userFirstName = req.session.userFirst;
  const pollId = req.params.id;
  // get an array of people responded to a poll
  db.getNamesResponded(pollId)
    .then(names => {
      let peopleResponded = [];
      for (let name of names) {
        let innerArr = [];
        innerArr.push(name.respondedby);
        innerArr.push(name['time_responded']);
        peopleResponded.push(innerArr);
      }

      db.getOptionsByPollId(pollId)
        .then((data) => {
          console.log(data);
          // Get results data
          db.getPollResultsByPoll(data[0].userid)
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
                    pollId: group.poll_id,
                    annonymous: group.isannonymous
                  });
                } else {
                  object[poll] = [{
                    option: group.option,
                    score: thisScore,
                    date_created: group.date_created,
                    pollId: group.poll_id,
                    annonymous: group.isannonymous
                  }];
                }
              }
              const tempVar = {
                object: object,
                username: userFirstName,
                peopleResponded
              };

              res.render('results', tempVar);
            });
        });
    })
    .catch(e => res.send(e));
});


module.exports = router;
