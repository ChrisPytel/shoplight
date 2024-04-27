/*
 * All routes for my-listings are defined here
 * Since this file is loaded in server.js into /my-listings,
 *   these routes are mounted onto /my-listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

const db = require('../db/connection');

const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['superSecretKey', 'superSecretKey2'], /* secret keys */
  maxAge: 24 * 60 * 60 * 1000 // Cookie Options (24 hours)
}));

//Renders the my-listings page
router.get('/', (req, res) => {
  return db
    .query(`SELECT * FROM products WHERE user_id = $1;`,
  [req.session.user_id])
    .then((products) => {
      const templateVars = {
        listings: products.rows
      };
      return res.render('my-listings', templateVars);
    })
    .catch((err) => {
      console.log(err.message);
    });

});


//Handles any post requests on my-listings
router.post("/", (req, res) => {
  console.log(req.body);
  return db
    .query(`INSERT INTO products (user_id, name, description, photo_url, price) 
VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [1, req.body.name, req.body.description, req.body.photo_url, req.body.price])
    .then((products) => {
      const templateVars = {
        listings: products.rows
      };
      // console.log(templateVars);
      return res.render('my-listings', templateVars);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// const templateVars = { }; //update this line with the new db
// return res.render("my-listings", templateVars);
//   });


module.exports = router;
