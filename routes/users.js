/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// Signup - Login page
router.get('/', (req, res) => {
  res.render('users');
});


// Receive login credentials
router.post('/login', (req, res) => {
  // Send credentials db to see if credentials exist
  // After receiving DB promise redirect to user profile
});

// Receive signup credentials
router.post('/signup', (req, res) => {
  // Send credentials to db to create user
  // After receiving DB promise redirect to user profile
});

router.post('/logout', (req, res) => {
  // Delete cookie, redirect to home
});

module.exports = router;
