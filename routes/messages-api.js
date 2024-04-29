/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const queryMessage = require('../db/queries/getMessagesByID');

const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['superSecretKey', 'superSecretKey2'], /* secret keys */
  maxAge: 24 * 60 * 60 * 1000 // Cookie Options (24 hours)
}));


router.get('/', (req, res) => {
  console.log(`Entered into GET MESSAGES-API YAAAY!`);
  const cookieStored = req.session.user_id;

  queryMessage.getMessagesByID(cookieStored)     // Retrieve message from db
  .then(messages => {
    console.log(`Entered JSON route for messages`);
    res.json({ messages });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
