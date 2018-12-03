import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import FeedItem from "./FeedItem";
import { Button } from "./Button";
import { Hr } from "./Hr";
import { Empty } from "./Empty";

const FeedList = styled.div``;

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const flatten = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

const ITEMS_TO_DISPLAY = 12;

export class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsToShow: ITEMS_TO_DISPLAY
    };
  }
  sortFeed = list => {
    return list.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
  };
  backToTop = () => {
    window.scrollTo(0, 0);
  };
  showMorePosts = () => {
    const { itemsToShow } = this.state;
    const totalItems = this.getFlattenedMediaList().length;
    let newItemsToShow = itemsToShow + ITEMS_TO_DISPLAY;
    if (newItemsToShow > totalItems) newItemsToShow = totalItems;
    return this.setState({
      itemsToShow: newItemsToShow
    });
  };
  hasMorePostsToShow = () => {
    const { itemsToShow } = this.state;
    const totalItems = this.getFlattenedMediaList().length;
    return itemsToShow < totalItems;
  };
  getFlattenedMediaList = () => {
    const { usernames, usernamesById } = this.props;
    return flatten(
      usernamesById.reduce((list, username) => {
        const usernameObj = usernames[username];
        return [
          ...list,
          usernameObj.map(u => {
            return {
              ...u,
              username
            };
          })
        ];
      }, [])
    );
  };
  feedDisplay(max) {
    const list = this.getFlattenedMediaList();
    return this.sortFeed(list).slice(0, max);
  }
  handleAddFavourites = media => {
    const { addFavourites } = this.props;
    addFavourites(media);
  };
  handleRemoveFavourites = instagram_url_id => {
    const { removeFavourites } = this.props;
    removeFavourites(instagram_url_id);
  };
  render() {
    const { fetching } = this.props;
    const { itemsToShow } = this.state;
    const feed = this.feedDisplay(itemsToShow);

    return (
      <div className="pb4">
        {!feed.length && !fetching && (
          <Empty>
            No posts. Try <Link to="/following">following</Link> some Instagram
            users or editing your filters.
          </Empty>
        )}

        {!fetching && (
          <Centered>
            <Button className="mb3" onClick={this.props.refresh}>
              Refresh feed
            </Button>
          </Centered>
        )}

        <Hr />

        <FeedList>
          {feed.map(media => {
            return (
              <FeedItem
                key={media.instagram_url_id}
                handleAddFavourites={this.handleAddFavourites}
                handleRemoveFavourites={this.handleRemoveFavourites}
                media={media}
              />
            );
          })}
        </FeedList>
        {!!feed.length && this.hasMorePostsToShow() && (
          <Centered>
            <Button onClick={this.showMorePosts}>Load more posts</Button>
          </Centered>
        )}
        {!!feed.length && !this.hasMorePostsToShow() && (
          <Centered>
            <Button onClick={this.backToTop}>Back to top</Button>
          </Centered>
        )}
      </div>
    );
  }
}
