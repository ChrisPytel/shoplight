//------------------ Global Variables ------------------
//Non-persistant and new additions reset after each `$ npm start local`

//Our local 
const users = {
  test01: {
    id: "test01",
    name: "Stephen B",
    email: "user@example.com",
    password: "purple",
  },
  test02: {
    id: "test02",
    name: "Christopher P",
    email: "user2@example.com",
    password: "funky",
  }
};

module.exports = {
  users
};