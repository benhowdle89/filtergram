const jwt = require("jsonwebtoken");

module.exports = {
  async create(user) {
    return jwt.sign(user, process.env.APP_SECRET, {
      expiresIn: "60 days"
    });
  },
  async fetch(token) {
    return await jwt.verify(token, process.env.APP_SECRET);
  }
};
