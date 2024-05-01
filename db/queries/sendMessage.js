
const db = require('../connection');

const sendMessage = (message, personTo, personFrom, productID) => {
  // console.log(`Sending message to DB: `, message, personTo, personFrom, productID);
  let queryArray = [message, personTo, personFrom, productID]

  let queryString =`
  INSERT INTO messages
  (message, user_id_to, user_id_from, product_id) 
  VALUES ($1, $2, $3, $4);`;
  return db.query(queryString, queryArray)
    .then(() => {
      console.log(`Sucessfully POSTED to DB: `, queryArray);
    })
    .catch(err => {
      console.log(`Got an error during sendMessage query:\n`, err);
    })
};

module.exports = { 
  sendMessage
};