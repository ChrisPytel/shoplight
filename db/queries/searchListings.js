const db = require('../connection');

const searchListings = (options) => {
  // params to give to .query later
  const queryParams = [];

  // string to give to .query later
  let queryString = `
  SELECT * 
  FROM products 
  WHERE 1=1`;

  // keyword option
  if (options.name_or_description) {
    queryParams.push(`%${options.name_or_description}%`);
    queryString += `
  AND LOWER(products.name) LIKE LOWER($${queryParams.length}) OR LOWER(products.description) LIKE LOWER($${queryParams.length}) `;
  }

  // price option
  if (options.minimum_price) {
    queryParams.push(options.minimum_price);
    queryString += `
  AND products.price >= $${queryParams.length} `;
  }

  if (options.maximum_price) {
    queryParams.push(options.maximum_price);
    queryString += `
  AND products.price <= $${queryParams.length} `;
  }

  queryString += `
  GROUP BY products.id; `

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = { searchListings };
