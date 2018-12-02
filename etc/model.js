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

const updateProfileByUserId = async (userId, username, filters) => {
  filters = JSON.stringify(filters);
  return query(
    `UPDATE profiles SET filters = $1 WHERE user_id = $2 AND username = $3`,
    [filters, userId, username]
  );
};

const addProfileByUserId = async (userId, username, filters) => {
  filters = JSON.stringify(filters);
  return query(
    `INSERT INTO profiles(user_id, username, filters) values($1, $2, $3)`,
    [userId, username, filters]
  );
};

const removeProfileByUserId = async (userId, username) => {
  return query(`DELETE FROM profiles WHERE user_id = $1 AND username = $2`, [
    userId,
    username
  ]);
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
  updateProfileByUserId,
  addProfileByUserId,
  removeProfileByUserId,
  addFavouriteForUser,
  getFavouritesByUserId,
  removeFavouritesForUser
};
