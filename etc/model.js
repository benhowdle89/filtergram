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

const getFavouritesByUserId = async userId => {
  return query(`SELECT * FROM favourites WHERE user_id = $1`, [userId]);
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

const addFavouriteForUser = async (userId, item) => {
  const { instagram_url_id } = item;
  const inserted = await query(
    `INSERT INTO favourites(instagram_url_id, data, user_id) values($1, $2, $3) ON CONFLICT DO NOTHING RETURNING id`,
    [instagram_url_id, JSON.stringify(item), userId]
  );
  if (!inserted.length) return [];
  const insertId = inserted[0].id;
  return query(`SELECT * FROM favourites WHERE id = $1`, [insertId]);
};

const removeFavouritesForUser = async (userId, instagramUrlId) => {
  return query(
    `DELETE FROM favourites WHERE user_id = $1 AND instagram_url_id = $2`,
    [userId, instagramUrlId]
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
  updateProfilesByUserId,
  addFavouriteForUser,
  getFavouritesByUserId,
  removeFavouritesForUser
};
