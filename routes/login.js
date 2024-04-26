/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const queryLogin = require('../db/queries/getEmailPassword');
const queryUser = require('../db/queries/getUserByID');

const fn = require('../resources/functions');

const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['superSecretKey', 'superSecretKey2'], /* secret keys */
  maxAge: 24 * 60 * 60 * 1000 // Cookie Options (24 hours)
}));


//Renders the login page with some users
router.get('/', (req, res) => {
  console.log("GET Login entered");
  const cookieStored = req.session.user_id;
  console.log(`Our cookieStored is: `, cookieStored);

  const queryPromise = queryUser.getUserByID(cookieStored);
  queryPromise
  .then((result) => {
  console.log('Name for signed in user:', result);
  const templateVars ={
    cookieStored,                   //Effectively a bool, representing if a cookie is set
    displayName: result
  };
  res.render('login', templateVars);
  })
  .catch(err =>{
    console.log('Got an error, couldnt fetch Username for stored cookieID', err);
    res.render('login');
  })  
}); 

//Handles the request after pressing the LOGIN button
router.post("/", (req, res) => {
  console.log("POST login entered");
  const formEmail = req.body.email;
  const formPassword = req.body.password;
  console.log(`01- Our formSubmissionEmail is: ${formEmail} and password: ${formPassword}`);

  const queryPromise = queryLogin.getEmailPassword(formEmail, formPassword);  //performs a sql query to check our database, returns a promise

  queryPromise
  .then(queryReturn =>{   
    const verifyLogin = fn.checkLoginCredentials(formEmail, formPassword, queryReturn); //gets the return value from authentication
    if (verifyLogin.verified === true) {
      req.session.user_id = verifyLogin.id; //sets the cookie based on the ID number from the database user
      console.log("07- Sucessfully signed in and cookie created! Cookie value:", req.session.user_id); 
      res.redirect('/');
    } else if (verifyLogin.verified === false) {
      return res.status(400).send("Invalid login credentials, please try again.");
    }
  })
  .catch((err) => {
    console.error('Promise Rejected:', err.message);
    })
});

module.exports = router;

//Check lightbnb for backend code
//Andy's suggestion was this on the kickoff demo, returning the router

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
