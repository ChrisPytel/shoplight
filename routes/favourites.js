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
  return db
    .query(`SELECT * FROM favourites WHERE user_id = $1;`,
  [req.session.user_id])
    .then((products) => {
      const templateVars = {
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
