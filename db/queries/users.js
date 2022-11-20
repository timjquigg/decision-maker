const db = require('../connection');

const getUsers = (credentials) => {
  const queryParams = [credentials.user_name, credentials.user_email];
  const queryString = `
    SELECT * FROM users
    WHERE name = $1
    AND email = $2;`;

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

const getUserByEmail = (credentials) => {
  const queryParams = [credentials];
  const queryString = `
    SELECT * FROM users
    WHERE email = $1;`;
  return db
    .query(
      queryString, queryParams)
    .then((result) => {
      console.log(result);
      if (result.rows.length > 0) {
        return result.rows[0];
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
  `
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
}

const addUsers = (credentials) => {
  const queryParams = [credentials.name, credentials.email];
  const queryString = `
    INSERT INTO users
    (name, email)
    VALUES
    ($1, $2)
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


module.exports = { getUsers, addUsers, getUserByEmail, getUserById };
