/*
 * All routes for Logout are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['superSecretKey', 'superSecretKey2'], /* secret keys */
  maxAge: 24 * 60 * 60 * 1000 // Cookie Options (24 hours)
}));


// When the logout button is pressed on the Header
// Logs the current user out, wipes any stored cookies, and redirects to the login page
router.post("/", (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = router;
