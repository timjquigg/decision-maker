const db = require('../connection');

// const getUsers = () => {
//   return db.query('SELECT * FROM users;')
//     .then(data => {
//       return data.rows;
//     });
// };

// From '/login'
// Receive login credentials, and check vs database, and send promise
// back to users route.
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
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// From '/signup'
// Receive credentials and add to database, send promise back to
// users route
const addUsers = () => {

};


module.exports = { getUsers, addUsers };
