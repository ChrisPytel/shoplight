const db = require('../connection');

const searchListings = (options) => {
  console.log(options);
  // beginning of check here

  // params to give to .query later
  const queryParams = [];

  // string to give to .query later
  let queryString = `
  SELECT * 
  FROM products 
  WHERE 1=1`;

  // keyword option
  // if (options.name_or_description) {
  //   console.log("keyword entered");
  //   queryParams.push(options.name_or_description);
  //   queryString += `
  // AND LOWER(products.name) LIKE LOWER('%$1%') OR LOWER(products.description) LIKE LOWER('%$1%') `;
  // }

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

  console.log("params: ", queryParams);
  console.log("query: ", queryString);
  //end of the check here

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = { searchListings };
