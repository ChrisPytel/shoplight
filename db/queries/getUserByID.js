const db = require('../connection');

const getUserByID = (id) => {
  console.log(`Our id is: `, id);
  let queryString =`
  SELECT name
  FROM users
  WHERE id = $1;`
  return db.query(queryString,[id])
    .then(data => {
      console.log(`Our DB returned: `, data.rows);
      return data.rows;
    })
    .catch(err => {
      console.log(`Got an error during getUserByID query:\n`, err);
      return null;
    })
};

module.exports = { 
  getUserByID
};
