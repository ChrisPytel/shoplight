// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

//------------------- API route source -------------------
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const messageApiRoutes = require('./routes/messages-api');

//------------------- Page route source -------------------
const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const logoutRoute = require('./routes/logout');
const myListingsRoutes = require('./routes/my-listings');
const searchRoutes = require('./routes/search');
const productRoutes = require('./routes/products-api');
const favouritesRoutes = require('./routes/favourites');
const messagesRoutes = require('./routes/messages');
const addNewFavoriteRoutes = require('./routes/add-to-favorites');

// Cookies
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['superSecretKey', 'superSecretKey2'], /* secret keys */
  maxAge: 24 * 60 * 60 * 1000 // Cookie Options (24 hours)
}));


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// Note: mount other resources here, using the same pattern

//------------------- API endpoints -------------------
app.use('/api/users', userApiRoutes);          //sample route
app.use('/api/widgets', widgetApiRoutes);      //sample route
app.use('/api/messages', messageApiRoutes);    //for GET/POST-ing our messages to/from DB


//------------------- Page endpoints  -------------------
app.use('/users', usersRoutes);                // sample route
app.use('/login', loginRoutes);                // GET renders page | POST logs user in + sets cookie
app.use('/register', registerRoutes);          // GET renders page | POST registers user + sets cookie   <- implement
app.use('/logout', logoutRoute);               // POST logs user out + clears cookie
app.use('/my-listings', myListingsRoutes);     // GET renders page
app.use('/search', searchRoutes);              // GET renders page
app.use('/messages', messagesRoutes);          // GET renders page | POST directs ajax query to messages-api
app.use('/products', productRoutes);           // resolved conflict
app.use('/favourites', favouritesRoutes);      // resolved conflict
app.use('/add-to-favorites', addNewFavoriteRoutes);

// Home page
// Warning: avoid creating more routes in this file!  Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  const cookieStored = req.session.user_id;
  const templateVars = {
    cookieStored
  };
  res.redirect('/products');
  res.render('index', templateVars);
});



app.get('/my-listings', (req, res) => {
  res.render('my-listings', templateVars);
});














/*  -------------- old resources from Tinyapp - safe to remove --------------


const helper = require('./resources/functions');
const database = require('./resources/databases');

*/


/*  ------------------------- OLD ROUTES -  safe to remove ---------------------------



//Renders the webpage for registering new user
app.get("/register", (req, res) => {
  const isLoggedIn = req.session.user_id;
  if (isLoggedIn) {
    res.redirect("/urls");
  } else { //Renders our nav buttons to login/register
    const templateVars = {
      isLoggedIn,
      user: helper.getUserByID(isLoggedIn, database.users)
    };
    res.render("register", templateVars);
  }
});


//Renders the webpage for logging into an account
app.get("/login", (req, res) => {
  const isLoggedIn = req.session.user_id;
  if (isLoggedIn) {
    res.redirect("/urls");
  } else { //Renders our nav buttons to login/register
    const templateVars = {
      isLoggedIn,
      user: helper.getUserByID(isLoggedIn, database.users)
    };
    res.render("login", templateVars);
  }
});



//Handles the request after pressing LOGIN button
app.post("/login", (req, res) => {
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;
  //returns the status of verification and optional userID value if true
  const verifyLogin = helper.checkLoginCredentials(loginEmail, loginPassword);
  if (verifyLogin.verified === true) {
    req.session.user_id = verifyLogin.userID; //eslint wants this to be camel case. I set it to be distinct from userID
    res.redirect('/urls');
  } else if (verifyLogin.verified === false) {
    return res.status(400).send("Invalid login credentials, please try again.");
  }
});

//Logs the current user out of the site and wipes any stored cookies
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

//Handles the request after pressing REGISTER button
app.post("/register", (req, res) => {
  const newEmail = req.body.email; //comes from the E-mail field
  const newPassword = req.body.password; //comes from the password field

  if (!newEmail || !newPassword) {
    return res.status(400).send("E-mail and password cannot be blank");
  } else if (helper.isEmailRegistered(newEmail)) {
    return res.status(400).send("E-mail already exists in our Database, try using a different one.");
  }

  //Creates a new user entry in our database and returns the unique ID# for it
  const newID = helper.createNewUser(newEmail, newPassword);

  if (!database.users[newID]) { //checks if succesfully added user to our object
    return res.status(500).send(`Something went wrong, could not create database entry for ${newEmail}`);
  } else if (database.users[newID]) {
    req.session.user_id = newID; //eslint wants this to be camel case. I set it to be distinct from userID
    res.redirect('/urls');
  }
});


 */



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
