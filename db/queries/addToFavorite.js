const db = require('../connection');

const addNewFavorite = (user_id, product_id) => {
  return db.query(`INSERT INTO favourites (user_id, product_id)
  VALUES ($1, $2) RETURNING *;`,
        [user_id, product_id])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = { addNewFavorite };
