/*
 * All routes for messages are defined here
 * Since this file is loaded in server.js into /messages,
 *   these routes are mounted onto /messages
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const queryUser = require('../db/queries/getUserByID');

const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['superSecretKey', 'superSecretKey2'], /* secret keys */
  maxAge: 24 * 60 * 60 * 1000 // Cookie Options (24 hours)
}));

//Renders the messages page
router.get('/', (req, res) => {  
  console.log("GET messages entered");
  const cookieStored = req.session.user_id;
  console.log(`Our cookieStored is: `, cookieStored);

  if (cookieStored){
    const queryPromise = queryUser.getUserByID(cookieStored);
    queryPromise
    .then((result) => {
    console.log('Name for signed in user:', result);
    const templateVars ={
      cookieStored,                   //Effectively a bool, representing if a cookie is set
      displayName: result
    };
    res.render('messages', templateVars);
    })
    .catch(err =>{
      console.log('Got an error, couldnt fetch Username for stored cookieID', err);
      res.render('messages');
    })  
  }else{ //If no cookie is stored, redirect to home page
    res.render('index');
  }
}); 


//Handles any post requests on messages
/*   router.post("/", (req, res) => {
  // our code goes here



    
  }); */

module.exports = router;
