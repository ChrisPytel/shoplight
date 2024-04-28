const db = require('../connection');

const addNewListing = (id, name, description, photo_url, price) => {
  return db.query(`INSERT INTO products (user_id, name, description, photo_url, price) 
  VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
        [id, name, description, photo_url, price])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = { addNewListing };
