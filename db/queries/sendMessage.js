
const db = require('../connection');

const sendMessage = (message, personTo, personFrom, productID) => {
  console.log(`Sending message to DB: `, message, personTo, personFrom, productID);
  let queryArray = [message, personTo, personFrom, productID]

  let queryString =`
  INSERT INTO messages
  (message, user_id_to, user_id_from, product_id) 
  VALUES ($1, $2, $3, $4);`;
  return db.query(queryString, queryArray)
    .then(data => {
      console.log(`Sucessfully POSTED to DB: `, message, `\nTo accountID# ${personTo} from ID#${personFrom}, regarding listing #${productID}`);
    })
    .catch(err => {
      console.log(`Got an error during sendMessage query:\n`, err);
      // return null;
    })
};

module.exports = { 
  sendMessage
};



/* 

INSERT INTO messages (message, user_id_to, user_id_from, product_id, date_sent) 
VALUES ('I''m interested in this item, let me know if its still available', 1, 7, 2, '2024-01-12 23:59:59'); 


*/
