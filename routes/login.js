/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

//internal libraries from Tinyapp
const helper = require('../resources/functions');
const database = require('../resources/databases');     //js

const express = require('express');
const router  = express.Router();


//Renders the login page with some users
router.get('/', (req, res) => {
  console.log("GET Login entered");
  res.render('login');
}); 


//Handles the request after pressing the LOGIN button
router.post("/", (req, res) => {
  console.log("POST login entered");
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;
  console.log(`Our loginEmail is: `, loginEmail);
  console.log(`Our loginPassword is: `, loginPassword);       
});





module.exports = router;



// module.exports = (db) =>{

//   router.get("/login", (req, res) => {
//       db.query(`select * from users;`)
//         .then(data => {
//           const users = data.rows;
//           res.json({users});
//         })
//         .catch(err => {
//           res.status(500)
//           .json({error: err.message});
//         });
//       });
//     return router;

// };


//check lightbbn for backend code











// router.get("/login", (req, res) => {
    
//   res.render("login");  
// });





