/*
 * All routes for my-listings are defined here
 * Since this file is loaded in server.js into /my-listings,
 *   these routes are mounted onto /my-listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

const db = require('../db/connection');
const myListingsFn = require('../db/queries/getMyListings');
const addNewListingFn = require('../db/queries/addNewListing');
const markAsSold = require('../db/queries/markAsSold');
const queryUser = require('../db/queries/getUserByID');

const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['superSecretKey', 'superSecretKey2'], /* secret keys */
  maxAge: 24 * 60 * 60 * 1000 // Cookie Options (24 hours)
}));

//Renders the my-listings page
router.get('/', (req, res) => {
  const cookieStored = req.session.user_id;
  const displayUserPromise = queryUser.getUserByID(cookieStored);
  const myListingsProducts = myListingsFn.getMyListings(cookieStored);

  Promise.all([displayUserPromise, myListingsProducts])
    .then(([displayUser, products]) => {
      const templateVars = {
        cookieStored,
        displayUser,
        listings: products,
      };
      return res.render('my-listings.ejs', templateVars);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    });
});


//Handles any post requests on my-listings
router.post("/", (req, res) => {
  const cookieStored = req.session.user_id;
  const displayUserPromise = queryUser.getUserByID(cookieStored);
  const myListingsProducts = myListingsFn.getMyListings(cookieStored);
  const newListing = addNewListingFn.addNewListing(cookieStored, req.body.name, req.body.description, req.body.photo_url, req.body.price);

  console.log(req.body);
  Promise.all([displayUserPromise, myListingsProducts, newListing])
      .then(([displayUser, products]) => {
      const templateVars = {
        cookieStored,
        displayUser,
        listings: products,
      };
      // console.log(templateVars);
      // return res.render('my-listings', templateVars);
      res.redirect(`/my-listings`);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// Handles mark as sold
router.post("/sold/:productId", (req, res) => {
  console.log("entered post for product id: ", req.params.productId);
  markAsSold(req.params.productId)
    .then(data => {
      return res.redirect("/my-listings");
    })
    .catch(error => {
      throw error;
    });
})


module.exports = router;
