const db = require('../connection');

const getUserByEmail = (email) => {
  const queryParams = [email];
  const queryString = `
    SELECT * FROM users
    WHERE email = $1;`;
  return db
    .query(
      queryString, queryParams)
    .then((user) => {
      if (user.rows.length > 0) {
        return user.rows[0];
      }
      return null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addUsers = (credentials) => {
  const queryParams = [credentials.name, credentials.email, credentials.password];
  const queryString = `
    INSERT INTO users
    (name, email, password)
    VALUES
    ($1, $2, $3)
    RETURNING *;`;
  return db
    .query(
      queryString, queryParams)
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];
      }
      return null;
    })
    .catch((err) => {
      console.log(err.message);
    });

};


module.exports = { addUsers, getUserByEmail };
