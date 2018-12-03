const fetch = require("node-fetch");
const cheerio = require("cheerio");
const cache = require("./../etc/cache");

const fetchPageAsText = async url => {
  const cached = cache.get(url);
  if (cached) {
    return cached;
  }
  const response = await fetch(url);
  const body = await response.text();
  if (body) {
    cache.put(url, body, 1000 * 60 * 60 * 3);
  }
  return body;
};

const cleanSharedData = s => {
  const clean = s[0].data.replace("window._sharedData = ", "").slice(0, -1);
  return clean;
};

const findData = body => {
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
    return data;
  } catch (error) {
    return null;
  }
};

const findMedia = async (data, filters) => {
  const { user } = data.entry_data.ProfilePage[0].graphql;
  return Promise.all(
    user.edge_owner_to_timeline_media.edges.map(async e => {
      const { node } = e;
      const isVideo = node.__typename === "GraphVideo";
      const isSidecar = node.__typename === "GraphSidecar";
      const { shortcode } = node;
      let extraMedia;
      if (isVideo || isSidecar) {
        const newPage = await fetchPageAsText(
          `https://www.instagram.com/p/${shortcode}`
        );
        const data = findData(newPage);
        if (data) {
          const shortcodeMedia =
            data.entry_data.PostPage[0].graphql.shortcode_media;
          if (isSidecar) {
            extraMedia = shortcodeMedia.edge_sidecar_to_children.edges.map(
              e => {
                return e.node.display_url;
              }
            );
          } else {
            extraMedia = shortcodeMedia.video_url;
          }
        }
      }

      const hasCaption = node.edge_media_to_caption;
      const caption =
        hasCaption && node.edge_media_to_caption.edges[0].node.text;
      if (filters.length) {
        if (!hasCaption) return null;
        const validCaption = filters.some(filter =>
          caption.toLowerCase().match(new RegExp(filter))
        );
        if (!validCaption) return null;
      }
      return {
        image_url: node.display_url,
        timestamp: node.taken_at_timestamp,
        instagram_url_id: shortcode,
        caption,
        extraMedia,
        type: node.__typename,
        user_profile_pic: user.profile_pic_url_hd,
        user_bio: user.biography,
        user_url: user.external_url
      };
    })
  );
};

exports.fetchInstagramProfile = async (username, filters) => {
  const body = await fetchPageAsText(`https://www.instagram.com/${username}`);
  const data = findData(body);
  const media = await findMedia(data, filters);
  return media.filter(Boolean);
};
