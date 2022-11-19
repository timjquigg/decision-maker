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
const getUsers = () => {

};

// From '/signup'
// Receive credentials and add to database, send promise back to
// users route
const addUsers = () => {

};


module.exports = { getUsers };
