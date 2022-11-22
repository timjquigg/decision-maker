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
        return user.rows;
      }
      return null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getUserById = (userId) => {
  const queryParams = [userId];
  const queryString = `
  SELECT * FROM users
  WHERE id = $1;
  `;
  return db
    .query(queryString, queryParams)
    .then((result) => {
      if (result.rows) {
        return result.rows[0];
      }
      return null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addUsers = (credentials) => {
  const queryParams = [credentials.firstName, credentials.lastName, credentials.email, credentials.password];
  const queryString = `
    INSERT INTO users
    (first_name, last_name, email, password)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;`;
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


module.exports = { addUsers, getUserByEmail, getUserById };
