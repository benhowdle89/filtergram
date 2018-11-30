import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import linkify from "linkify-instagram";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Button } from "./Button";

const Item = styled.div`
  display: flex;
  border-bottom: 3px solid paleturquoise;
  box-shadow: 0px 2px 0px #000;
  overflow-x: hidden;
  /* min-height: 450px; */
  @media (max-width: 700px) {
    flex-direction: column;
    padding-bottom: 0;
  }
`;
const FeedItemImage = styled.div`
  width: calc(100% * 2 / 3);
  @media (max-width: 700px) {
    width: auto;
    margin-right: 0;
  }
  margin-right: 24px;
  border: 3px solid #000;
  box-shadow: -6px 6px 0px paleturquoise;
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
  bottom: 0;
  left: 0;
  width: 100%;
  @media (max-width: 700px) {
    position: relative;
    padding: 1rem 0 1rem 0;
    top: 24px;
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
      <Item className="mb4 pb4" key={media.instagram_url_id}>
        <FeedItemImage>
          {media.type === "GraphImage" && <img src={media.image_url} />}
          {media.type === "GraphSidecar" && (
            <Carousel showArrows={true} showThumbs={false}>
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
              playsInline
              preload="auto"
              poster={media.image_url}
              src={media.extraMedia}
            />
          )}
        </FeedItemImage>
        <FeedItemsDetails>
          <FeedItemActions>
            {/* <a
              data-external
              href={`https://instagram.com/p/${media.instagram_url_id}`}
            >
              View on Instagram
            </a> */}

            <Button
              onClick={() => {
                !inFavourites
                  ? this.props.handleAddFavourites(media)
                  : this.props.handleRemoveFavourites(media.instagram_url_id);
              }}
              disabled={fetching}
            >
              {inFavourites ? "Unfavourite" : "Favourite"}
            </Button>
          </FeedItemActions>
          <FeedUser className="p2">
            <UserProfilePic src={media.user_profile_pic} />
            <p dangerouslySetInnerHTML={{ __html: linkify(username) }} />
          </FeedUser>
          <FeedItemCaption className="py3">
            <p
              dangerouslySetInnerHTML={{
                __html: linkify(media.caption).replace(
                  /(?:\r\n|\r|\n)/g,
                  "<br />"
                )
              }}
            />
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
