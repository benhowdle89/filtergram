import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { fetchProfiles } from "./../modules/profiles";

class Timeline extends Component {
  componentDidMount() {
    this.props.fetchProfiles();
  }
  render() {
    const {
      profiles: { fetching, error, usernames, usernamesById }
    } = this.props;
    return (
      <div>
        {fetching && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!usernamesById.length && <p>Nothing to show</p>}
        {usernamesById.map(u => {
          const username = usernames[u];
          return (
            <div key={u}>
              <h2>{u}</h2>
              {username.media.map(media => {
                return (
                  <div key={media.instagram_url_id}>
                    <img src={media.image_url} />
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
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profiles: state.profiles
});

const mapDispatchToProps = {
  fetchProfiles
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Timeline)
);
