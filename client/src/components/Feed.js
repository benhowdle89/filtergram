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

export class Feed extends React.Component {
  render() {
    const { usernames, usernamesById } = this.props;
    return (
      <div>
        {usernamesById.map(u => {
          const username = usernames[u];
          return (
            <div key={u}>
              <h2>{u}</h2>
              {username.media.map(media => {
                return (
                  <FeedItem key={media.instagram_url_id}>
                    <FeedItemImage>
                      <img src={media.image_url} />
                    </FeedItemImage>
                    <FeedItemsDetails>
                      <p>{media.caption}</p>
                      <p>
                        View on{" "}
                        <a
                          href={`https://instagram.com/p/${
                            media.instagram_url_id
                          }`}
                        >
                          Instagram
                        </a>
                      </p>
                    </FeedItemsDetails>
                  </FeedItem>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
