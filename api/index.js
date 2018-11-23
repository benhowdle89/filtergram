const express = require("express");
const asyncMiddleware = require("./../etc/async-middleware");
const instagram = require("./../lib/instagram");
const model = require("./../etc/model");

const api = express.Router();

api.get(
  "/profiles/:username",
  asyncMiddleware(async (req, res) => {
    const { username } = req.params;
    const media = await instagram.fetchInstagramProfile(username);
    return res.json(media);
  })
);

api.get(
  "/users",
  asyncMiddleware(async (req, res) => {
    const result = await model.getUsers();
    return res.json(result);
  })
);

module.exports = api;
