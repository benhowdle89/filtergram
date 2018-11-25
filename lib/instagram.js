const fetch = require("node-fetch");
const cheerio = require("cheerio");

const fetchPageAsText = async url => {
  const response = await fetch(url);
  const body = await response.text();
  return body;
};

const cleanSharedData = s => {
  const clean = s[0].data.replace("window._sharedData = ", "").slice(0, -1);
  return clean;
};

const findData = body => {
  const $ = cheerio.load(body);
  const data = $("script")
    .get()
    .map(s => s.children)
    .filter(s => {
      const d = (s[0] || {}).data || "";
      return d.match(/window._sharedData/) && d.match(/graphql/);
    })
    .map(s => JSON.parse(cleanSharedData(s)))[0];
  return data;
};

const findMedia = async data => {
  return Promise.all(
    data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.map(
      async e => {
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

        const hasCaption = node.edge_media_to_caption;
        return {
          image_url: node.display_url,
          timestamp: node.taken_at_timestamp,
          instagram_url_id: shortcode,
          caption: hasCaption && node.edge_media_to_caption.edges[0].node.text,
          extraMedia,
          type: node.__typename
        };
      }
    )
  );
};

exports.fetchInstagramProfile = async username => {
  const body = await fetchPageAsText(`https://www.instagram.com/${username}`);
  const data = findData(body);
  const media = findMedia(data);
  return media;
};
