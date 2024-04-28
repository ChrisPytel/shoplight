const db = require('../connection');

const getMyListings = (id) => {
  return db.query(`SELECT * FROM products WHERE user_id = $1;`,
  [id])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = { getMyListings };
