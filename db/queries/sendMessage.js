
const db = require('../connection');

const sendMessage = (message, personTo, personFrom, productID) => {
  // console.log(`Sending message to DB: `, message, personTo, personFrom, productID);
  let queryArray = [message, personTo, personFrom, productID]

  let queryString =`
  INSERT INTO messages
  (message, user_id_to, user_id_from, product_id) 
  VALUES ($1, $2, $3, $4)
  RETURNING *;`;
  return db.query(queryString, queryArray)                //Refactored to handle .catch in the location the promise is resolved
    .then((res) => {                                            
      console.log(`Sucessfully POSTED to DB: `, res.rows[0]);        
    })
};

module.exports = { 
  sendMessage
};