const fetch = require("got");
const cheerio = require("cheerio");
const cache = require("./../etc/cache");

const scraperURL = "https://app.scrapingninja.co/api/v1/";

const fetchPageAsText = async url => {
  try {
    const response = await fetch(scraperURL, {
      query: {
        url,
        api_key: process.env.SCRAPER_API_KEY
      }
    });
    const { url: IGURL } = response;
    if (IGURL === "https://www.instagram.com/accounts/login/") {
      return null;
    }
    const { body } = response;
    return body;
  } catch (error) {
    console.log(error);
  }
};

const cleanSharedData = s => {
  const clean = s[0].data.replace("window._sharedData = ", "").slice(0, -1);
  return clean;
};

const findData = async url => {
  const cached = await cache.get(url);
  if (cached) {
    return cached;
  }
  const body = await fetchPageAsText(url);
  if (!body) {
    return null;
  }
  const $ = cheerio.load(body);
  try {
    const data = $("script")
      .get()
      .map(s => s.children)
      .filter(s => {
        const d = (s[0] || {}).data || "";
        return d.match(/window._sharedData/) && d.match(/graphql/);
      })
      .map(s => JSON.parse(cleanSharedData(s)))[0];
    if (data) cache.put(url, data, 24);
    return data;
  } catch (error) {
    return null;
  }
};

const findMedia = async (data, filters) => {
  const { user } = data.entry_data.ProfilePage[0].graphql;
  const media = [];
  for (const e of user.edge_owner_to_timeline_media.edges) {
    const { node } = e;
    const isVideo = node.__typename === "GraphVideo";
    const isSidecar = node.__typename === "GraphSidecar";
    const { shortcode } = node;
    let extraMedia;
    if (isVideo || isSidecar) {
      const data = await findData(`https://www.instagram.com/p/${shortcode}`);
      if (data) {
        const shortcodeMedia =
          data.entry_data.PostPage[0].graphql.shortcode_media;
        if (isSidecar) {
          extraMedia = shortcodeMedia.edge_sidecar_to_children.edges.map(e => {
            const { node } = e;
            const isVideo = node.__typename === "GraphVideo";
            return {
              url: isVideo ? node.video_url : node.display_url,
              type: node.__typename,
              poster: node.display_url
            };
          });
        } else {
          extraMedia = shortcodeMedia.video_url;
        }
      }
    }

    const hasCaption = node.edge_media_to_caption;

    const caption =
      hasCaption &&
      node.edge_media_to_caption.edges &&
      node.edge_media_to_caption.edges.length &&
      node.edge_media_to_caption.edges[0].node.text;
    if (filters.length) {
      if (!hasCaption) return null;
      const validCaption = filters.some(filter => {
        return String(caption).match(new RegExp(filter, "i"));
      });
      if (!validCaption) return null;
    }
    media.push({
      image_url: node.display_url,
      timestamp: node.taken_at_timestamp,
      instagram_url_id: shortcode,
      caption,
      extraMedia,
      type: node.__typename,
      user_profile_pic: user.profile_pic_url_hd,
      user_bio: user.biography,
      user_url: user.external_url
    });
  }
  return media;
};

exports.fetchInstagramProfile = async (username, filters = []) => {
  const data = await findData(`https://www.instagram.com/${username}`);
  if (!data) {
    return [];
  }
  const media = await findMedia(data, filters);
  return media.filter(Boolean);
};
