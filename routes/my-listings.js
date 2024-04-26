/*
 * All routes for my-listings are defined here
 * Since this file is loaded in server.js into /my-listings,
 *   these routes are mounted onto /my-listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

const db = require('../db/connection');

//Renders the my-listings page
router.get('/', (req, res) => {
  // console.log("GET my-listings entered");
  return db
    .query(`SELECT * FROM products;`)  //replace this query with one that will retreieve only products that match user_in of person logged in                                                                            //note: we need to know what object is being given here in order to add each value
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


//Handles any post requests on my-listings
router.post("/", (req, res) => {
  console.log(req.body);
  // look at body parser
  // change names from db on form
  // before send to db, check that the data type is correct. AJAX -> better protected, change data before hits backend
  /* validation: after getting req.body, check on the stuff
  call another function in another file to check on ALL of the pieces

  could check if key:value all match and exist 
  can disable button until edge case is met -> all the fields are filled
  or as soon as hit button, validate, and show error message like tweeter 
  e.g. check if type is number, then throw error if not 
   */
  return db
    .query(`INSERT INTO products (user_id, name, description, photo_url, price, is_featured, is_available) 
VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
      [req.body.user_id, req.body.name, req.body.description, req.body.photo_url, req.body.price, req.body.is_featured, req.body.is_available])
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
