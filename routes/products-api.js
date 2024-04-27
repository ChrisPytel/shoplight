const express = require('express');
const router = express.Router();
const db = require('../db/queries/products');

const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['superSecretKey', 'superSecretKey2'], /* secret keys */
  maxAge: 24 * 60 * 60 * 1000 // Cookie Options (24 hours)
}));

router.get('/', (req, res) => {

  return db.getProducts()
  .then((products) => {
        const templateVars = {
        listings: products
        // put call here for featured
      };
      console.log(products);
      return res.render('index.ejs', templateVars);
  })
});

module.exports = router;
