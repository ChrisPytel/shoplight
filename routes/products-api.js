const express = require('express');
const router = express.Router();
const db = require('../db/queries/products');
const queryUser = require('../db/queries/getUserByID');

const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['superSecretKey', 'superSecretKey2'], /* secret keys */
  maxAge: 24 * 60 * 60 * 1000 // Cookie Options (24 hours)
}));

router.get('/', (req, res) => {
  const cookieStored = req.session.user_id;
  const displayUserPromise = queryUser.getUserByID(cookieStored);   // Retrieve displayUser asynchronously
  const productsPromise = db.getProducts();                         // Retrieve products

  Promise.all([displayUserPromise, productsPromise])                // Execute both promises concurrently using Promise.all
      .then(([displayUser, products]) => {
        console.log(`Our displayUser is: `, displayUser);
          const templateVars = {
              cookieStored,
              displayUser,
              listings: products,
              featured: products.is_featured
          };
          return res.render('index.ejs', templateVars);
      })
      .catch((error) => {
          console.error('Error fetching data:', error);
          res.status(500).send('Internal Server Error');
      });
});


module.exports = router;
