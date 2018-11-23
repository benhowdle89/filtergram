const http = require("http");
const express = require("express");
const util = require("util");
const path = require("path");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const api = require("./api");

const app = express();

const { PORT = 9000 } = process.env;

const log = o => console.log(util.inspect(o, false, null, true));

const cleanSharedData = s => {
  const clean = s[0].data.replace("window._sharedData = ", "").slice(0, -1);
  return clean;
};

const findData = body => {
  const $ = cheerio.load(body);
  const data = $("script")
    .get()
    .map(s => s.children)
    .filter(s => ((s[0] || {}).data || "").match(/edge_felix_video_timeline/))
    .map(s => JSON.parse(cleanSharedData(s)))[0];
  return data;
};

const findMedia = data => {
  return data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.map(
    e => e.node
  );
};

const fetchInstagramProfile = async () => {
  const response = await fetch("https://www.instagram.com/chrisdelia/?hl=en");
  const body = await response.text();
  const data = findData(body);
  const media = findMedia(data);
};

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/", (req, res) => res.sendStatus(200));
app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
