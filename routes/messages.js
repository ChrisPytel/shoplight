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
const { getEmailPassword } = require('../db/queries/getEmailPassword');
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
    const displayUserPromise = queryUser.getUserByID(cookieStored);
    displayUserPromise
    .then((result) => {
    // console.log('Details for signed in user:', result);
    const templateVars ={
      cookieStored,        //Effectively a bool, representing if a cookie is set
      displayUser: result
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
    console.log(`Cookie value for user user ID#:`, cookieStored);
    console.log("Entered the post route for sending replies to DB WOW!\nWe've got this from the form:", req.body);

    console.log(`Message TEXT: `, req.body.text);
    console.log(`Directed TO userID#: ${req.body.user_id_to}. Sent FROM userID#: ${req.body.user_id_from}. About productID#: ${req.body.product_id}`);

    postMessage.sendMessage(req.body.text, req.body.user_id_to, req.body.user_id_from, req.body.product_id)
      .then((dbReturn) => {
      console.log('postMessage Promise Resolved:\n', dbReturn);    

      //POSTING via a standard button on a form will result in page waiting for a response         /* Option A - Do nothing and press escape to prevent timeout */                 
      // res.status(201).send({server: "Sent message to user", message});                         /* Option B, send a response in the form of a status and an object */    
      // res.redirect(`/messages`);                                                              /* Option C, redirect to another page */ 
      })
      .catch((err) => {
      console.error('Promise Rejected:', err);
      });
  });

module.exports = router;
