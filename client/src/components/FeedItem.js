import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import linkify from "linkify-instagram";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import Truncate from "react-truncate-html";
import ImageLoader from "react-loading-image";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Button } from "./Button";
import { HeadingText } from "./common.styles";
import { Loading } from "./Loading";

const Item = styled.div`
  display: flex;
  border-bottom: 3px solid paleturquoise;
  box-shadow: 0px 2px 0px #000;
  overflow: hidden;
  min-height: 290px;
  @media (max-width: 700px) {
    flex-direction: column;
    padding-bottom: 0;
    overflow: visible;
  }
`;
const FeedItemImage = styled.div`
  position: relative;
  width: calc(100% * 2 / 3);
  margin-right: 24px;
  border: 3px solid #000;
  box-shadow: -6px 6px 0px paleturquoise;
  left: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 700px) {
    width: 100vw;
    margin: 0 -24px;
    left: 0;
    right: 0;
    border: 0;
  }
`;
const FeedItemsDetails = styled.div`
  width: calc(100% * 1 / 3);

  /* padding: 0 24px; */
  position: relative;
  display: flex;
  flex-direction: column;
  @media (max-width: 700px) {
    width: auto;
    > div:nth-child(1) {
      order: 2;
    }
    > div:nth-child(2) {
      order: 1;
    }
    > div:nth-child(3) {
      order: 3;
    }
  }
`;

const FeedUser = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 10;
  border-bottom: 3px solid paleturquoise;
  box-shadow: 0px 2px 0px #000;
  @media (max-width: 700px) {
    position: relative;
    width: auto;
    top: 12px;
  }
`;

const FeedItemCaption = styled.div`
  position: absolute;
  top: 88px;
  left: 0;
  bottom: 88px;
  width: 100%;
  overflow: scroll;
  @media (max-width: 700px) {
    position: relative;
    top: 0;
    bottom: 0;
  }
`;

const FeedItemActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  position: absolute;
  bottom: 6px;
  left: 0;
  width: 100%;
  @media (max-width: 700px) {
    position: relative;
    padding: 1rem 0 1rem 0;
    top: 24px;
  }
`;

const UserProfilePic = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-right: 12px;
`;

const Ago = styled(HeadingText)`
  position: absolute;
  top: 0;
  right: 0;
  background: #000;
  color: paleturquoise;
  font-weight: 600;
  z-index: 10;
  @media (max-width: 700px) {
    font-size: 12px;
  }
`;

const MAX_CAPTION_SIZE = 280;

class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }
  isInFavourites = id => {
    const { favourites } = this.props.favourites;
    return favourites.map(f => f.instagram_url_id).includes(id);
  };
  getCaption = ({ caption }) => {
    if (!caption) return null
    const html = linkify(caption).replace(/(?:\r\n|\r|\n)/g, "<br />");
    if (!this.state.expanded && caption.length > MAX_CAPTION_SIZE) {
      return (
        <Truncate
          lines={3}
          dangerouslySetInnerHTML={{
            __html: html
          }}
        />
      );
    }
    return (
      <p
        dangerouslySetInnerHTML={{
          __html: html
        }}
      />
    );
  };
  render() {
    const {
      media,
      favourites: { fetching }
    } = this.props;
    const inFavourites = this.isInFavourites(media.instagram_url_id);
    const username = `@${media.username}`;
    return (
      <Item className="mb4 pb4" key={media.instagram_url_id}>
        <FeedItemImage>
          <Ago className="py1 px2">
            {distanceInWordsToNow(new Date(media.timestamp * 1000))} ago
          </Ago>
          {media.type === "GraphImage" && (
            <ImageLoader
              style={{
                height: "100%"
              }}
              src={media.image_url}
              loading={() => <Loading />}
            />
          )}
          {media.type === "GraphSidecar" && (
            <Carousel showArrows={true} showThumbs={false}>
              {media.extraMedia.map(e => {
                const { url, type, poster } = e;
                if (type === "GraphVideo") {
                  return (
                    <video
                      controls
                      playsInline
                      preload="auto"
                      poster={poster}
                      src={url}
                      key={url}
                    />
                  );
                }
                return (
                  <div key={url}>
                    <ImageLoader
                      style={{
                        height: "100%"
                      }}
                      src={url}
                      loading={() => <Loading />}
                    />
                  </div>
                );
              })}
            </Carousel>
          )}
          {media.type === "GraphVideo" && (
            <video
              controls
              playsInline
              preload="auto"
              poster={media.image_url}
              src={media.extraMedia}
            />
          )}
        </FeedItemImage>
        <FeedItemsDetails>
          <FeedItemActions>
            <Button
              onClick={() => {
                !inFavourites
                  ? this.props.handleAddFavourites(media)
                  : this.props.handleRemoveFavourites(media.instagram_url_id);
              }}
              disabled={fetching}
            >
              {inFavourites
                ? "Remove from Filtergram Favourites"
                : "Add to Filtergram Favourites"}
            </Button>
          </FeedItemActions>
          <FeedUser className="py2">
            <UserProfilePic src={media.user_profile_pic} />
            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html: linkify(
                    username,
                    undefined,
                    '<a href="https://www.instagram.com/{username}" data-external>@{username}</a>'
                  )
                }}
              />
              {/* <p>{media.user_bio}</p>
              <a href={media.user_url}>{media.user_url}</a> */}
            </div>
          </FeedUser>
          <FeedItemCaption className="py3">
            <div className="mb3">
              {this.getCaption(media)}
              {!this.state.expanded && media.caption.length > MAX_CAPTION_SIZE && (
                <p
                  className="bold pointer"
                  onClick={() => this.setState({ expanded: true })}
                >
                  read more
                </p>
              )}
            </div>
            <a
              data-external
              href={`https://instagram.com/p/${media.instagram_url_id}`}
            >
              View on Instagram
            </a>
          </FeedItemCaption>
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
