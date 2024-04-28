const db = require('../connection');

const getFavourites = (id) => {
  return db.query(`SELECT * FROM favourites 
  JOIN products ON favourites.product_id = products.id 
  WHERE favourites.user_id = $1;`,
  [id])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = { getFavourites };
