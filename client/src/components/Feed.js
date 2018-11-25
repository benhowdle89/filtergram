import React from "react";
import styled from "styled-components";

const FeedItem = styled.div`
  display: flex;
`;
const FeedItemImage = styled.div`
  width: 50%;
`;
const FeedItemsDetails = styled.div`
  width: 50%;
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
      usernameObj.username = username;
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
  render() {
    const feed = this.feedDisplay();
    return (
      <div>
        {feed.map(media => {
          return (
            <FeedItem key={media.instagram_url_id}>
              <FeedItemImage>
                <img src={media.image_url} />
              </FeedItemImage>
              <FeedItemsDetails>
                <p>{media.caption}</p>
                <p>
                  View on{" "}
                  <a href={`https://instagram.com/p/${media.instagram_url_id}`}>
                    Instagram
                  </a>
                </p>
              </FeedItemsDetails>
            </FeedItem>
          );
        })}
      </div>
    );
  }
}
