const express = require("express");
const bcrypt = require("bcryptjs");
const asyncMiddleware = require("./../etc/async-middleware");
const instagram = require("./../lib/instagram");
const model = require("./../etc/model");
const auth = require("./../etc/auth");

const api = express.Router();

const hashUserPassword = password => {
  let hashed;
  try {
    hashed = bcrypt.hashSync(password, 10);
  } catch (e) {
    throw new Error("Error with password");
  }
  return hashed;
};

const requireSession = async req => {
  const { token } = req;
  if (!token) return null;
  return auth.fetch(token);
};

const fetchInstagramProfilesForUsernames = async usernames => {
  const items = await Promise.all(
    usernames.map(async u => {
      const media = await instagram.fetchInstagramProfile(u.username);
      if (!media.length) return null;
      return {
        media,
        username: u.username
      };
    })
  );
  return items.filter(Boolean);
};

api.get(
  "/profiles/:userId",
  asyncMiddleware(async (req, res) => {
    const session = await requireSession(req);
    if (!session) {
      return res.sendStatus(401);
    }
    const { userId } = req.params;
    if (session.id != userId) return res.sendStatus(403);
    const profiles = await model.getProfilesByUserId(userId);
    if (!profiles.length) {
      return res.json(profiles);
    }
    const medias = await fetchInstagramProfilesForUsernames(profiles);
    return res.json(medias);
  })
);

api.post(
  "/profiles/:userId",
  asyncMiddleware(async (req, res) => {
    const session = await requireSession(req);
    if (!session) {
      return res.sendStatus(401);
    }
    const { userId } = req.params;
    if (session.id != userId) return res.sendStatus(403);
    const { usernames } = req.body;
    const medias = await fetchInstagramProfilesForUsernames(
      usernames.map(u => {
        return {
          username: u
        };
      })
    );
    const validUsernames = medias.map(m => m.username);
    await model.updateProfilesByUserId(
      userId,
      usernames.filter(u => validUsernames.includes(u))
    );
    return res.json(medias);
  })
);

api.get(
  "/favourites/:userId",
  asyncMiddleware(async (req, res) => {
    const session = await requireSession(req);
    if (!session) {
      return res.sendStatus(401);
    }
    const { userId } = req.params;
    if (session.id != userId) return res.sendStatus(403);
    const favourites = await model.getFavouritesByUserId(userId);
    return res.json(favourites);
  })
);

api.post(
  "/favourites/:userId",
  asyncMiddleware(async (req, res) => {
    const session = await requireSession(req);
    if (!session) {
      return res.sendStatus(401);
    }
    const { item } = req.body;
    const { userId } = req.params;
    console.log(session, userId);
    if (session.id != userId) return res.sendStatus(403);
    const favourite = await model.addFavouriteForUser(userId, item);
    return res.json(favourite);
  })
);

api.delete(
  "/favourites/:userId/:instagramUrlId",
  asyncMiddleware(async (req, res) => {
    const session = await requireSession(req);
    if (!session) {
      return res.sendStatus(401);
    }
    const { userId, instagramUrlId } = req.params;
    if (session.id != userId) return res.sendStatus(403);
    await model.removeFavouritesForUser(userId, instagramUrlId);
    return res.json({
      instagram_url_id: instagramUrlId
    });
  })
);

api.post(
  "/users/login",
  asyncMiddleware(async (req, res) => {
    let { email, password } = req.body;

    email = email.toLowerCase().trim();
    password = password.trim();
    const users = await model.getUserByEmail(email);
    if (!users.length) {
      return res.sendStatus(404);
    }
    const user = users[0];
    const correctPassword = bcrypt.compareSync(password, user.password);
    if (!correctPassword) {
      return res.sendStatus(400);
    }
    return res.json({
      user: {
        id: user.id,
        email: user.email
      },
      token: await auth.create({
        id: user.id
      })
    });
  })
);

api.post(
  "/users",
  asyncMiddleware(async (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase().trim();
    password = password.trim();
    const users = await model.getUserByEmail(email);
    if (users.length) {
      return res.sendStatus(400);
    }
    const hashedPassword = hashUserPassword(password.trim());
    let insertedUsers;
    email = email.toLowerCase().trim();
    try {
      insertedUsers = await model.createUser(email, hashedPassword);
    } catch (e) {
      console.error("Error creating user", e);
      return res.sendStatus(400);
    }
    if (!insertedUsers.length) {
      return res.sendStatus(400);
    }
    const user = insertedUsers[0];
    return res.json({
      user: {
        id: user.id,
        email: user.email
      },
      token: await auth.create({
        id: user.id
      })
    });
  })
);

module.exports = api;
