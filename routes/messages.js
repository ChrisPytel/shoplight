/*
 * All routes for messages are defined here
 * Since this file is loaded in server.js into /messages,
 *   these routes are mounted onto /messages
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const queryUser = require('../db/queries/getUserByID');
const postMessage = require('../db/queries/sendMessage');

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
    const displayNamePromise = queryUser.getUserByID(cookieStored);
    displayNamePromise
    .then((result) => {
    console.log('Name for signed in user:', result);
    const templateVars ={
      cookieStored,        //Effectively a bool, representing if a cookie is set
      displayName: result
    };
    res.render('messages', templateVars);
    return;
    })
    .catch(err =>{
      console.log('Got an error, couldnt fetch Username for stored cookieID', err);
      res.redirect('/');
      return;
    })
  }else{ //If no cookie is stored, redirect to home page
    res.redirect('/');
    return;
  }
});


//Handles any post requests on messages
  router.post("/", (req, res) => {
    const cookieStored = req.session.user_id;
    console.log(cookieStored);
    console.log(typeof cookieStored);

    console.log("Entered the post route for sending replies to DB WOW!");
    console.log(req.body);
    console.log(`Reply TEXT: `, req.body.text);
    console.log(`Reply TO userID#: `, req.body.user_id_to);
    console.log(`Reply FROM userID#: `, req.body.user_id_from);
    console.log(`Reply PROD#: `, req.body.product_id);
    postMessage.sendMessage(req.body.text, req.body.user_id_to, cookieStored, req.body.product_id);
  });

module.exports = router;
