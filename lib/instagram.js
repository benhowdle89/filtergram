const fetch = require("node-fetch");
const cheerio = require("cheerio");

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

exports.fetchInstagramProfile = async username => {
  const response = await fetch(`https://www.instagram.com/${username}`);
  const body = await response.text();
  const data = findData(body);
  const media = findMedia(data);
  return media;
};
