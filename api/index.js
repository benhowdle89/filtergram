const express = require("express");
const asyncMiddleware = require("./../etc/async-middleware");
const instagram = require("./../lib/instagram");

const api = express.Router();

api.get(
  "/profiles/:username",
  asyncMiddleware(async (req, res) => {
    const { username } = req.params;
    const media = await instagram.fetchInstagramProfile(username);
    return res.json(media);
  })
);

module.exports = api;
