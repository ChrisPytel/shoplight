const db = require('../connection');

const getEmailPassword = (email, password) => {
  console.log(`02- getEmailPassword query : ${email} and pass: ${password}`);
  let queryParams = [email, password];
  let queryString =`
  SELECT id, email, password 
  FROM users
  WHERE email = $1
  AND password = $2;`
  return db.query(queryString, queryParams)
    .then(data => {
      console.log(`03-Our DB returned: `, data.rows);
      return data.rows;
    })
    .catch(err => {
      console.log(`03-Got an error during getEmailPassword query:\n`, err);
      return null;
    })
};

module.exports = { 
  getEmailPassword
};
