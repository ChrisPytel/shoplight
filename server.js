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
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users'); // sample route

const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const logoutRoute = require('./routes/logout');
const myListingsRoutes = require('./routes/my-listings');
const messagesRoutes = require('./routes/messages');
const searchRoutes = require('./routes/search');
const favouritesRoutes = require('./routes/favourites');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/logout', logoutRoute);
app.use('/my-listings', myListingsRoutes);
app.use('/messages', messagesRoutes);
app.use('/search', searchRoutes);
app.use('/favourites', favouritesRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});



app.get('/', (req, res) => {
  res.render('index');
});



app.get('/my-listings', (req, res) => {
  res.render('my-listings');
});
















//internal libraries from Tinyapp
const helper = require('./resources/functions');
const database = require('./resources/databases');







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










































app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
