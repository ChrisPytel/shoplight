// ajax to grab product id from form -> send to the same url /:productId
// once marked as sold -> change dom to make button change

const db = require("../connection");

const markAsSold = function(id) {
  return db
    .query(`SELECT is_available FROM products WHERE id = $1`, [id])
    .then((data) => {
      console.log("before update: ", data.rows);
      return db.query(`UPDATE products SET is_available = $1 WHERE products.id = $2;`,
        [!data.rows[0].is_available, id]);
    })
    .then(() => db.query(`SELECT is_available FROM products WHERE id = $1`, [id])) // Re-fetch the data to see the updated value
    .then((updateResult) => {
      console.log("after update: ", updateResult.rows); // Log the updated data
    })
    .catch(error => {
      throw error;
    });
}

module.exports = markAsSold;