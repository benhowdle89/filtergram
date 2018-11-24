const query = require("./db");

const getUserById = async id => {
  return query(`SELECT * FROM users WHERE id = $1`, [id]);
};

const getUserByEmail = async email => {
  return query(`SELECT * FROM users WHERE email = $1`, [email]);
};

const getProfilesByUserId = async userId => {
  return query(`SELECT * FROM profiles WHERE user_id = $1`, [userId]);
};

const createUser = async (email, password) => {
  const inserted = await query(
    `INSERT INTO users(email, password) values($1, $2) RETURNING id`,
    [email, password]
  );
  if (!inserted.length) return [];
  const insertId = inserted[0].id;
  return getUserById(insertId);
};

//insert
// client.query('INSERT INTO items(text, complete) values($1, $2)',
//     [data.text, data.complete]);

module.exports = {
  getUserByEmail,
  createUser,
  getProfilesByUserId
};
