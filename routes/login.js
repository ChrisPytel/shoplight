/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

//internal libraries from Tinyapp
const helper = require('../resources/functions');

const express = require('express');
const router  = express.Router();
const query = require('../db/queries/getEmailPassword');


const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['superSecretKey', 'superSecretKey2'], /* secret keys */
  maxAge: 24 * 60 * 60 * 1000 // Cookie Options (24 hours)
}));


//Renders the login page with some users
router.get('/', (req, res) => {
  console.log("GET Login entered");
  res.render('login');
}); 

//Handles the request after pressing the LOGIN button
router.post("/", (req, res) => {
  console.log("POST login entered");
  const formEmail = req.body.email;
  const formPassword = req.body.password;
  console.log(`01- Our formSubmissionEmail is: ${formEmail} and password: ${formPassword}`);

  const queryPromise = query.getEmailPassword(formEmail, formPassword);  //performs a sql query to check our database, returns a promise
  console.log(`Our queryPromise is: `, queryPromise);
  queryPromise.then(queryReturn =>{   

    const verifyLogin = helper.checkLoginCredentials(formEmail, formPassword, queryReturn);
    if (verifyLogin.verified === true) {
      console.log("Wow we got it!");
      req.session.user_id = verifyLogin.id;
      res.redirect('/');
    } else if (verifyLogin.verified === false) {
      return res.status(400).send("Invalid login credentials, please try again.");
    }
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
