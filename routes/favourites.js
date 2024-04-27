const express = require('express');
const router = express.Router();

const db = require('../db/connection');

const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['superSecretKey', 'superSecretKey2'], /* secret keys */
  maxAge: 24 * 60 * 60 * 1000 // Cookie Options (24 hours)
}));

//Renders the favourites page
router.get('/', (req, res) => {  
  const cookieStored = req.session.user_id;
  return db
    .query(`SELECT * FROM favourites WHERE user_id = $1;`, //add JOIN to reference table products
  [req.session.user_id])
    .then((products) => {
      const templateVars = {
        cookieStored,
        listings: products.rows
      };
      return res.render('favourites', templateVars);
    })
    .catch((err) => {
      console.log(err.message);
    });
}); 


/*   router.post("/", (req, res) => {
  // our code goes here



    
  }); */

module.exports = router;

/*
Notes:
I pushed my changes and then when i went to favourites it was blank (but no error)
This was because my .ejs was emtpy so i just wrote "test" and it showed up on the app 
Then I copy the code to favouties.ejs from index.ejs and delete divs there
now im getting the error "cookieStored is not defined
    at eval (/home/labber/shoplight/views/partials/_header.ejs:10:8)"*/