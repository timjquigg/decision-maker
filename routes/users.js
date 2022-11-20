/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const db = require('../db/queries/users');
const router  = express.Router();

// Signup - Login page
router.get('/', (req, res) => {
  res.render('login_signup');
});


// Receive login credentials
router.post('/login', (req, res) => {
  // Send credentials db to see if credentials exist
  db.getUsers(req.body)
    .then((result) => {
      if (result === null) {
        res.send(result);
        return;
      }
      // Assign cookie for logged in user
      req.session.userId = result.id;
      res.send(result);

    }).catch((err) => {
      console.log(err);
    });
});

// Receive signup credentials
router.post('/signup', (req, res) => {
  // Send credentials to db to create user
  const name = req.body.user_name;
  const email = req.body.user_email;
  // Check to see if user already exists
  db.getUserByEmail(email)
    .then((result) => {
      
      if (result !== null) {
        res.send(null);
        return;
      }
      
      // If user does not exist create user
      db.addUsers({name, email})
        .then((result) => {
          req.session.userId = result.id;
          res.send(result);
        });
    });
});

router.post('/logout', (req, res) => {
  // Delete cookie, redirect to home
  req.session.userId = null;
  res.send('');
  return;
});

module.exports = router;
