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
const messagesRoutes = require('./routes/messages');


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


// Home page
// Warning: avoid creating more routes in this file!  Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});