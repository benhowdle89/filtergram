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

const updateProfilesByUserId = async (userId, usernames) => {
  await query(`DELETE FROM profiles WHERE user_id = $1`, [userId]);
  return Promise.all(
    usernames.map(username => {
      return query(`INSERT INTO profiles(username, user_id) values($1, $2)`, [
        username,
        userId
      ]);
    })
  );
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

module.exports = {
  getUserByEmail,
  createUser,
  getProfilesByUserId,
  updateProfilesByUserId
};
