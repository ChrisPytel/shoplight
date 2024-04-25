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
  console.log("GET my-listings entered");
  return db
  .query(`SELECT * FROM products;`)  //replace this query with one that will retreieve only products that match user_in of person logged in                                                                            //note: we need to know what object is being given here in order to add each value
  .then((products) => {
    const templateVars = {
      listings : products.rows
    };
    console.log(templateVars);
    return res.render('my-listings', templateVars);
  })
  .catch((err) => {
    console.log(err.message);
  });
  
});


//Handles any post requests on my-listings
// router.post("/", (req, res) => {
// return db
//   .query(`INSERT INTO products (user_id, name, description, photo_url, price, is_featured, is_available) 
// VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
//     ["7 values go here"])                                                                              //note: we need to know what object is being given here in order to add each value
//   .then((result) => {
//     return result.rows[0];
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// const templateVars = { }; //update this line with the new db
// return res.render("my-listings", templateVars);
//   });


module.exports = router;
