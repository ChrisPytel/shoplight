const express = require('express');
const router = express.Router();

const queryUser = require('../db/queries/getUserByID');
const searchListingsFn = require('../db/queries/searchListings');

const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['superSecretKey', 'superSecretKey2'], /* secret keys */
  maxAge: 24 * 60 * 60 * 1000 // Cookie Options (24 hours)
}));

router.get('/', (req, res) => {
  const cookieStored = req.session.user_id;
  const displayUserPromise = queryUser.getUserByID(cookieStored);   // Retrieve displayUser asynchronously
  const searchPromise = searchListingsFn.searchListings(req.body); 

  Promise.all([displayUserPromise, searchPromise])                // Execute both promises concurrently using Promise.all
      .then(([displayUser, products]) => {
          const templateVars = {
              cookieStored,
              displayUser,
              listings: products
          };
          return res.render('search.ejs', templateVars);
      })
      .catch((error) => {
          console.error('Error fetching data:', error);
          res.status(500).send('Internal Server Error');
      });
});

router.post('/', (req, res) => {
  const cookieStored = req.session.user_id;
  const displayUserPromise = queryUser.getUserByID(cookieStored);   // Retrieve displayUser asynchronously
  const searchPromise = searchListingsFn.searchListings(req.body); 

  Promise.all([displayUserPromise, searchPromise])                // Execute both promises concurrently using Promise.all
      .then(([displayUser, products]) => {
          const templateVars = {
              cookieStored,
              displayUser,
              listings: products
          };
          return res.render('search.ejs', templateVars);
      })
      .catch((error) => {
          console.error('Error fetching data:', error);
          res.status(500).send('Internal Server Error');
      });
});


module.exports = router;
