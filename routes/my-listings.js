/*
 * All routes for my-listings are defined here
 * Since this file is loaded in server.js into /my-listings,
 *   these routes are mounted onto /my-listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();


//Renders the my-listings page
router.get('/', (req, res) => {  
  console.log("GET my-listings entered");

  res.render('my-listings');
}); 


//Handles any post requests on my-listings
/*   router.post("/", (req, res) => {
  // our code goes here



    
  }); */

module.exports = router;
