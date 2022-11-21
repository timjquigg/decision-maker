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
const userdb = require('../db/queries/users')

// Only accessible if logged in:
router.get('/', (req, res) => {

  // If logged in, will display profile page
  // send request to polls db file to get polls
  const userId = req.session.userId;
  const userFirstName = req.session.userFirst;
  
  db.getPollsByUserID(userId)
  .then((data) => {
    console.log('data:', data)
    const object = {};
    for (let i = 0; i < data.length; i++) {
      const group = data[i];
      const poll = group.title;

      if (object[poll]) {
        object[poll].push({
          option: group.option,
          score: group.score,
          date_created: group.date_created
        });
      } else {
        object[poll] = [{
          option: group.option,
          score: group.score,
          date_created: group.date_created
        }];
      }
    }

    const tempVar = {
      object: object,
      username: userFirstName
    }
    res.render('profile', tempVar);
  })
  .catch(e => res.send(e));
});

router.get('/new', (req, res) => {
  // load create-poll page
  res.render('create_poll');
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
      console.log('poll log:', result.rows);
      const pollId = result.rows[0].id;
      db.addOptionsToPoll(req.body, pollId)
      .then(result => {
        console.log('options log', result.rows)
      })
      // return result;
    })
    .catch(err => console.log(err));


});

router.get('/:id', (req, res) => {
  // logic to check for logged in

  // Logged in user:
  // query db for response summary data
  // then redirect to admin page for poll id
  // router forwards promise response in redirect
  // to results.ejs
  // potential mailgun?

  // not logged in user:
  // query db for poll data
  // forward db response in redirect to response.ejs
});

router.post('/:id', (req, res) => {
  // A returned poll is received

  // send form data to db js for adding to db
  // after recieving promise from db, client side
  // js display thank you and link to home page
});

module.exports = router;
