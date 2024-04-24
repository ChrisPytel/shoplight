/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();


//Renders the search page
router.get("/", (req, res) => {
  res.render("search");
});

//Handles the request after pressing search button
/* router.post("/", (req, res) => {
  //code goes here  

}); */


module.exports = router;
