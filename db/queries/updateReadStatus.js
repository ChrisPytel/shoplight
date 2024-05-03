const db = require('../connection');

const getUserByID = (user) => {
  console.log(`Our user is: `, user);

  let queryString =`
  UPDATE messages
  SET read_status = true
  WHERE id = $1
  RETURNING *;`
  return db.query(queryString,[user])
    .then(res => {
      console.log(`Our DB Updated read status for:`, user, `.Resulting: `, res.rows[0]);
    })
};

module.exports = { 
  getUserByID
};
