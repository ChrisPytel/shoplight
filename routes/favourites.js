const express = require('express');
const router = express.Router();

const db = require('../db/connection');
const myListingsFn = require('../db/queries/getMyListings');
const favouriteProductsFn = require('../db/queries/getFavourites');
const queryUser = require('../db/queries/getUserByID');

const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['superSecretKey', 'superSecretKey2'], /* secret keys */
  maxAge: 24 * 60 * 60 * 1000 // Cookie Options (24 hours)
}));

//Renders the favourites page
router.get('/', (req, res) => {
  const cookieStored = req.session.user_id;
  const displayUserPromise = queryUser.getUserByID(cookieStored);
  const myFavouriteProducts = favouriteProductsFn.getFavourites(cookieStored);

  Promise.all([displayUserPromise, myFavouriteProducts])
    .then(([displayUser, products]) => {
      const templateVars = {
        cookieStored,
        displayUser,
        listings: products,
      };
      return res.render('favourites.ejs', templateVars);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
