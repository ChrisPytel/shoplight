/*
 * All routes for messages are defined here
 * Since this file is loaded in server.js into /messages,
 *   these routes are mounted onto /messages
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

//Renders the messages page
router.get('/', (req, res) => {  
  console.log("GET messages entered");

  res.render('messages');
}); 


//Handles any post requests on messages
/*   router.post("/", (req, res) => {
  // our code goes here



    
  }); */

module.exports = router;
