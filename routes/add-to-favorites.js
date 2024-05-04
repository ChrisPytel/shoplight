const express = require('express');
const router = express.Router();

const db = require('../db/connection');
const favouriteProductsFn = require('../db/queries/getFavourites');
const addNewFavouriteProductsFn = require('../db/queries/addToFavorite');
const queryUser = require('../db/queries/getUserByID');


//Handles any post requests to add-to-favorites
router.post("/:productId/:userId", (req, res) => {
  const cookieStored = req.session.user_id;
  const displayNamePromise = queryUser.getUserByID(cookieStored);
  const myFavouriteProducts = favouriteProductsFn.getFavourites(cookieStored);
  const newFavorite = addNewFavouriteProductsFn.addNewFavorite(cookieStored, req.params.productId);

  Promise.all([displayNamePromise, myFavouriteProducts, newFavorite])
    .then(([]) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
});



module.exports = router;
