/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

//internal libraries from Tinyapp
const helper = require('../resources/functions');
const database = require('../resources/databases');


//Renders the register page 
router.get("/", (req, res) => {

  // const signedIn = req.session.user_id;

  // if (signedIn) {
  //   res.redirect("/");
  // } else {  
  res.render("register");
  // }
});


//Handles the request after pressing REGISTER button
router.post("/", (req, res) => {
  const newEmail = req.body.email; //comes from the E-mail field
  const newPassword = req.body.password; //comes from the password field

  console.log(`Our newEmail is: `, newEmail);
  console.log(`Our newPassword is: `, newPassword);   


  // if (!newEmail || !newPassword) {
  //   return res.status(400).send("E-mail and password cannot be blank");
  // } else if (helper.isEmailRegistered(newEmail)) {
  //   return res.status(400).send("E-mail already exists in our Database, try using a different one.");
  // }

  // //Creates a new user entry in our database and returns the unique ID# for it
  // const newID = helper.createNewUser(newEmail, newPassword);

  // if (!database.users[newID]) { //checks if succesfully added user to our object
  //   return res.status(500).send(`Something went wrong, could not create database entry for ${newEmail}`);
  // } else if (database.users[newID]) {
  //   req.session.user_id = newID; 
  //   res.redirect('/urls');
  // }
});


module.exports = router;
