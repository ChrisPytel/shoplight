/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const getMessages = require('../db/queries/getMessagesByID');

router.get('/', (req, res) => {
  // console.log(`Our req is: `, req);
  console.log(`Entered into GET MESSAGES-API YAAAY!`);
  getMessages.getMessagesByID(2)
      .then(users => {
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
});

module.exports = router;
