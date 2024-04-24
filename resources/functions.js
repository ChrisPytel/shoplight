// ----------------- Helper Functions -----------------

const database = require('./databases');  //imports our database to perform actions with

//Generates a random string for our shortURLS and UserIDs
const generateRandomString = function() {
  return (Math.random().toString(16).substring(2,8));
};

//Creates a new user after pressing register for a new account
const createNewUser = function(email, password) {
  const newUserID = generateRandomString();
  database.users[newUserID] = {  //Creates a new database entry for our new user and defines values
    id: newUserID,
    email,
    password
  };
  return newUserID;
};


//After pressing login button, POST route calls this to verify login credentials
const checkLoginCredentials = function(loginEmail, loginPassword) {
  for (const ID in database.users) {
    if (database.users[ID].email === loginEmail && bcrypt.compareSync(loginPassword, database.users[ID].password)) {
      return {verified: true,    //returns object with a bool and corresponding ID
        userID: database.users[ID].id};
    }
  }
  return {verified: false};  //returns object with false if login/password are incorrect
};

//Check if user with that ID exists, if so return the user object and its values
const getUserByID = function(userID, userDatabase) {
  for (const ID in userDatabase) {
    if (userID === ID) {
      return userDatabase[ID];
    }
  }
};


// ---------------------  registry functions - Skip for now ---------------------

//Checks against the database entry for that given user to see if it exists already
const isEmailRegistered = function(newUser) {
  for (const ID in database.users) {
    if (newUser === database.users[ID].email) {
      return true;
    }
  }
  return false;
};


//Exports modules to use across other files in our project
module.exports = {
  generateRandomString,
  createNewUser,
  checkLoginCredentials,
  getUserByID,
  isEmailRegistered,

};