/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

// Only accessible if logged in:
router.get('/', (req, res) => {

  // If logged in, will display profile page
  // send request to polls db file to get polls
  // belonging to user
  // redirect to history page

  /*  const query = `SELECT * FROM widgets`;
  console.log(query);
  db.query(query)
    .then(data => {
      const widgets = data.rows;
      res.json({ widgets });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    }); */
});

router.get('/new', (req, res) => {
  res.render('create_poll');
});

router.post('/', (req, res) => {
  // Send data from poll creation form to db js file
  // forward promise response to front end so
  // client side js can display links
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
