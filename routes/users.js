/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const db = require('../db/queries/users');
const router  = express.Router();
const bcrypt = require('bcryptjs');

/*
Helper Functions
 */

const checkDuplicateEmail = (users) => {
  // If DB returns no users, then duplicate does not exist
  if (!users) {
    return false;
  }
  // Checks each user returned by DB, if any have non-NULL name -> duplicate
  for (const user of users) {
    if (user.first_name !== null) {
      return true;
    }
  }
};

const getRegisteredUser = (users) => {
  // If DB returns no users, then user does not exist
  if (!users) {
    return null;
  }
  // Returns the first user with a non-NULL name
  for (const user of users) {
    if (user.first_name !== null) {
      return user;
    }
  }
  return null;
};

// Display Signup Page
router.get('/', (req, res) => {
  const tempVar = {
    username : req.session.userFirst,
    service: 'signup'};
  res.render('login_signup', tempVar);
});

// Display Login Page
router.get('/:login', (req, res) => {
  const tempVar = {
    username : req.session.userFirst,
    service: 'login'};
  res.render('login_signup', tempVar);
});

// User attempts to login
router.post('/login', (req, res) => {
  // Send credentials db to see if credentials exist
  db.getUserByEmail(req.body.email)
    .then((users) => {

      const user = getRegisteredUser(users);

      // If user does not exist
      if (!user) {
        res.send(null);
        return;
      }

      // Validate password
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // Assign cookie for logged in user
        req.session = {
          userId : user.id,
          userFirst : user.first_name,
          userLast : user.last_name,
          userEmail : user.email
        };

        res.send('valid user');
        return;
      }

      res.send(null);
      return;

    }).catch((err) => {
      console.log(err);
    });
});

// Receive signup credentials
router.post('/signup', (req, res) => {
  // Credentials to send to DB
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 12);

  // Check to see if user already exists
  db.getUserByEmail(email)
    .then((users) => {

      // If e-mail already exists return to signup page
      if (checkDuplicateEmail(users)) {
        res.send(null);
        return;
      }

      // If user does not exist create user
      db.addUsers({firstName, lastName, email, password})
        .then((user) => {
          req.session = {
            userId : user.id,
            userFirst : user.first_name,
            userLast : user.last_name,
            userEmail : user.email
          };
          res.send(user);
        });
    });
});

// When user logs out
router.post('/logout', (req, res) => {
  // Delete cookie, redirect to home
  req.session = null;
  res.redirect('/');
  return;
});

module.exports = router;
