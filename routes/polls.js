/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// const e = require('express');
require('dotenv').config();

const express = require('express');
const router  = express.Router();
const db = require('../db/queries/polls');
const userDB = require('../db/queries/users');
const userdb = require('../db/queries/users');


//mailgun
const mailgun = require("mailgun-js");

//IP
const IP = require('ip');
const ipAddress = IP.address();

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
          // console.log(object);
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
  console.log(IP.address());

  // Send data from poll creation form to db js file
  // forward promise response to front end so
  // client side js can display links

  // console.log('Poll Info', req.body);

  //Adds a new poll to the db then adds the options of that poll to the db.
  // if (!req.session) {
  // req.session = {
  //   userId : null,
  //   userFirst : null,
  //   userLast : null,
  //   userEmail : req.body.email
  // };
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
        db.addNewPoll(req.body, userId)
          .then(result => {
            // console.log('poll log:', result.rows);
            const pollId = result.rows[0].id;
            console.log(pollId, req.body.email);

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

            db.getTotalPoll()
              .then(result => {
                const pollData = {
                  count : result.rows[0].count,
                  ip: ipAddress
                };
                console.log('185', pollData);
                res.send(pollData);
                // res.send(result.rows[0].count);
              })
              .catch(err => console.log(err.message));
            db.addOptionsToPoll(req.body, pollId)
              .then(result => {
                // console.log('options log', result.rows);
                return result;
              });
          })
          .catch(err => console.log(err));
      });
    return;
  }

  const userId = req.session.userId;
  db.addNewPoll(req.body, userId)
    .then(result => {
      console.log('poll log:', result.rows);
      db.getTotalPoll()
        .then(result => {
          const pollData = {
            count : result.rows[0].count,
            ip: ipAddress
          };
          console.log('185', pollData);
          res.send(pollData);
        })
        .catch(err => console.log(err.message));
      const pollId = result.rows[0].id;
      db.getEmailByPoll(pollId)
        .then(result => {

          console.log('apple',result.rows[0]);
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
  if (!Number.isInteger(Number(pollId))) {
    res.redirect('../404');
    return;
  }

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
      // Redirect to home page if not logged in
      // if (!req.session.userId) {
      //   res.redirect('../');
      //   return;
      // }
      const tempVar = {
        username: req.session.userFirst,
        question: pollData[pollId].question,
        anonymous: pollData[pollId].isAnonymous,
        options: pollData[pollId].options,
      };
      // console.log(tempVar);
      res.render('response.ejs', tempVar);
      // res.render('response.ejs');
    })
    .catch(err => console.log(err.message));
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
    .then(result => {
      // console.log('apple', result.rows, 'mango', result);
      db.getPollDataByOptionsId(result.rows[0].poll_option_id)
        .then(result => {
          console.log('mango', result.rows[0]);
          const {id : pollId, email, question, created_on : dateCreated} = result.rows[0];

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

  // A returned poll is received

  // send form data to db js for adding to db
  // after recieving promise from db, client side
  // js display thank you and link to home page


});


router.get('/results/:id', (req, res) => {
  const userId = req.session.userId;
  const userFirstName = req.session.userFirst;
  const pollId = req.params.id;
  db.getNamesResponded(pollId)
    .then(names => {
      // console.log('names:', names);
      let peopleResponded = [];
      for (let name of names) {
        // console.log('name.respondedby:', name.respondedby);
        let innerArr = [];
        innerArr.push(name.respondedby);
        innerArr.push(name['time_responded']);
        peopleResponded.push(innerArr);
      }
      //console.log('peopleresponded:', peopleResponded);
      db.getOptionsByPollId(pollId)
        .then((data) => {
          console.log(data);
          // Get results data
          db.getPollResultsByPoll(data[0].userid)
            .then((score)=>{
              // db.getResultsByPollId(pollId)
              //   .then((data) => {
              //     // Get results data
              //     db.getPollResultsByPoll(userId)
              //       .then((score)=>{
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
              // console.log("object:", object);
              res.render('results', tempVar);
            });
        });
    })
    .catch(e => res.send(e));
});


// router.get('/results/:id', (req, res) => {
//   // const userId = req.session.userId;
//   const userFirstName = req.session.userFirst;
//   const pollId = req.params.id;

//   db.getOptionsByPollId(pollId)
//     .then((data) => {
//       console.log(data);
//       // Get results data
//       db.getPollResultsByPoll(data[0].userid)
//         .then((score)=>{
//           // Convert array of scores, to useable object
//           const newScores = {};
//           for (const index in score) {
//             newScores[score[index].option] = score[index].score;
//           }

//           const object = {};

//           for (let i = 0; i < data.length; i++) {
//             const group = data[i];
//             const poll = group.title;

//             // If results are not available yet, make score 0
//             let thisScore;
//             if (newScores[group.option]) {
//               thisScore = newScores[group.option];
//             } else {
//               thisScore = '0';
//             }

//             if (object[poll]) {
//               object[poll].push({
//                 option: group.option,
//                 score: thisScore,
//                 date_created: group.date_created,
//                 pollId: group.poll_id
//               });
//             } else {
//               object[poll] = [{
//                 option: group.option,
//                 score: thisScore,
//                 date_created: group.date_created,
//                 pollId: group.poll_id
//               }];
//             }
//           }
//           // console.log(object);
//           const tempVar = {
//             object: object,
//             username: userFirstName
//           };
//           console.log("object:", object);
//           res.render('results', tempVar);
//         });
//     })
//     .catch(e => res.send(e));
// });

// router.get('/results/:id', (req, res) => {
//   const userId = req.session.userId;
//   const userFirstName = req.session.userFirst;
//   const pollId = req.params.id;

//   db.getResultsByPollId(pollId)
//     .then((data) => {
//       // Get results data
//       db.getPollResultsByPoll(userId)
//         .then((score)=>{
//           // Convert array of scores, to useable object
//           const newScores = {};
//           for (const index in score) {
//             newScores[score[index].option] = score[index].score;
//           }

//           const object = {};

//           for (let i = 0; i < data.length; i++) {
//             const group = data[i];
//             const poll = group.title;

//             // If results are not available yet, make score 0
//             let thisScore;
//             if (newScores[group.option]) {
//               thisScore = newScores[group.option];
//             } else {
//               thisScore = '0';
//             }

//             if (object[poll]) {
//               object[poll].push({
//                 option: group.option,
//                 score: thisScore,
//                 date_created: group.date_created,
//                 pollId: group.poll_id
//               });
//             } else {
//               object[poll] = [{
//                 option: group.option,
//                 score: thisScore,
//                 date_created: group.date_created,
//                 pollId: group.poll_id
//               }];
//             }
//           }
//           const tempVar = {
//             object: object,
//             username: userFirstName
//           };
//           console.log("object:", object);
//           res.render('results', tempVar);
//         });
//     })
//     .catch(e => res.send(e));
// });

module.exports = router;
