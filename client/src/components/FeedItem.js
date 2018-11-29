import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import linkify from "linkify-instagram";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const Item = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 2rem;
  min-height: 450px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
const FeedItemImage = styled.div`
  width: calc(100% * 2 / 3);
  @media (max-width: 700px) {
    width: auto;
    padding: 0 24px;
  }
  margin-right: 24px;
`;
const FeedItemsDetails = styled.div`
  width: calc(100% * 1 / 3);
  @media (max-width: 700px) {
    width: auto;
  }
  padding: 0 24px;
  position: relative;
`;

const FeedUser = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  padding: 24px;
  padding-left: 0;
  background: #fff;
  z-index: 10;
  border-bottom: 1px solid #ccc;
  @media (max-width: 700px) {
    position: relative;
  }
`;

const FeedItemCaption = styled.div`
  position: absolute;
  top: 88px;
  left: 0;
  bottom: 64px;
  width: 100%;
  overflow: scroll;
  padding: 24px;
  padding-left: 0;
  @media (max-width: 700px) {
    position: relative;
    top: 0;
    bottom: 0;
  }
`;

const FeedItemActions = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 24px;
  padding-left: 0;
  background: #fff;
  z-index: 10;
  border-top: 1px solid #ccc;
  @media (max-width: 700px) {
    position: relative;
  }
`;

const UserProfilePic = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
`;

class FeedItem extends React.Component {
  isInFavourites = id => {
    const { favourites } = this.props.favourites;
    return favourites.map(f => f.instagram_url_id).includes(id);
  };
  render() {
    const {
      media,
      favourites: { fetching }
    } = this.props;
    const inFavourites = this.isInFavourites(media.instagram_url_id);
    const username = `@${media.username}`;
    return (
      <Item key={media.instagram_url_id}>
        <FeedItemImage>
          {media.type === "GraphImage" && <img src={media.image_url} />}
          {media.type === "GraphSidecar" && (
            <Carousel showArrows={true}>
              {media.extraMedia.map(e => {
                return (
                  <div key={e}>
                    <img src={e} />
                  </div>
                );
              })}
            </Carousel>
          )}
          {media.type === "GraphVideo" && (
            <video
              controls
              playsinline
              preload="auto"
              poster={media.image_url}
              src={media.extraMedia}
            />
          )}
        </FeedItemImage>
        <FeedItemsDetails>
          <FeedUser>
            <UserProfilePic src={media.user_profile_pic} />
            <p dangerouslySetInnerHTML={{ __html: linkify(username) }} />
          </FeedUser>
          <FeedItemCaption>
            <p
              dangerouslySetInnerHTML={{
                __html: linkify(media.caption).replace(
                  /(?:\r\n|\r|\n)/g,
                  "<br />"
                )
              }}
            />
          </FeedItemCaption>
          <FeedItemActions>
            <p>
              View on{" "}
              <a href={`https://instagram.com/p/${media.instagram_url_id}`}>
                Instagram
              </a>
            </p>

            <button
              onClick={() => {
                !inFavourites
                  ? this.props.handleAddFavourites(media)
                  : this.props.handleRemoveFavourites(media.instagram_url_id);
              }}
              disabled={fetching}
            >
              {inFavourites ? "Remove from" : "Add to"} Favourites
            </button>
          </FeedItemActions>
        </FeedItemsDetails>
      </Item>
    );
  }
}

const mapStateToProps = state => ({
  favourites: state.favourites
});

export default connect(
  mapStateToProps,
  null
)(FeedItem);
