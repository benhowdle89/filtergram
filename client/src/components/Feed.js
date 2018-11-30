import React from "react";
import styled from "styled-components";

import { Container } from "./common.styles";

import FeedItem from "./FeedItem";
import { Button } from "./Button";
import { Hr } from "./Hr";

const FeedList = styled.div``;

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const flatten = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

export class Feed extends React.Component {
  sortFeed = list => {
    return list.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
  };
  feedDisplay() {
    const { usernames, usernamesById } = this.props;
    const list = usernamesById.reduce((list, username) => {
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
    }, []);
    return this.sortFeed(flatten(list));
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
    const feed = this.feedDisplay();
    const { fetching } = this.props;
    return (
      <Container>
        {!fetching && (
          <Centered>
            <Button className="mb3" onClick={this.props.refresh}>
              Refresh
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
      </Container>
    );
  }
}
