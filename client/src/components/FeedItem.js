import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const Item = styled.div`
  display: flex;
`;
const FeedItemImage = styled.div`
  width: calc(100% * 2 / 3);
`;
const FeedItemsDetails = styled.div`
  width: calc(100% * 1 / 3);
`;

const UserProfilePic = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
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
            <video controls src={media.extraMedia} />
          )}
        </FeedItemImage>
        <FeedItemsDetails>
          <p>@{media.username}</p>
          <UserProfilePic src={media.user_profile_pic} />
          <p>{media.caption}</p>
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
