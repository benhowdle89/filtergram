const query = require("./db");

const getUsers = async username => {
  return query(`SELECT * FROM users LIMIT 1`);
};

//insert
// client.query('INSERT INTO items(text, complete) values($1, $2)',
//     [data.text, data.complete]);

module.exports = {
  getUsers
};
