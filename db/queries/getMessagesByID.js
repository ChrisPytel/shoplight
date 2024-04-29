const db = require('../connection');

const getMessagesByID = (id) => {
  console.log(`Our getMessagesByID ID number is: `, id);
  let queryString =`
  SELECT user_id_to, user_id_from, message, users.name AS from, products.name AS listing, date_sent
  FROM messages
  LEFT JOIN users ON messages.user_id_from = users.id
  LEFT JOIN products ON messages.product_id = products.id
  WHERE user_id_to = $1;`;
  return db.query(queryString,[id])
    .then(data => {
      console.log(`Our DB returned: `, data.rows);
      return data.rows; //returns the name corresponding the ID number of the stored cookie
    })
    .catch(err => {
      console.log(`Got an error during getMessagesByID query:\n`, err);
      return null;
    })
};

module.exports = { 
  getMessagesByID
};
