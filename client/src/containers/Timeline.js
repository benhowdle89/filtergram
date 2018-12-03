import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { fetchProfiles } from "./../modules/profiles";
import {
  addFavourites,
  removeFavourites,
  fetchFavourites
} from "./../modules/favourites";

import Nav from "./../components/Nav";
import { Feed } from "./../components/Feed";
import { Loading } from "./../components/Loading";
import { Empty } from "./../components/Empty";
import { Error } from "./../components/Error";

class Timeline extends Component {
  componentDidMount() {
    if (!this.props.profiles.usernamesById.length) this.props.fetchProfiles();
    if (!this.props.favourites.favourites.length) this.props.fetchFavourites();
  }
  render() {
    const {
      profiles: { fetching, error, usernames, usernamesById },
      addFavourites,
      removeFavourites
    } = this.props;
    return (
      <div>
        <Nav />
        {fetching && <Loading />}
        {error && <Error>Error: {error}</Error>}
        {!usernamesById.length && !fetching && (
          <Empty>
            Nothing to show. Go add some{" "}
            <Link to="/following">Instagram usernames</Link>.
          </Empty>
        )}
        {
          <Feed
            usernames={usernames}
            usernamesById={usernamesById}
            addFavourites={addFavourites}
            removeFavourites={removeFavourites}
            refresh={this.props.fetchProfiles}
            fetching={fetching}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profiles: state.profiles,
  favourites: state.favourites
});

const mapDispatchToProps = {
  fetchProfiles,
  addFavourites,
  fetchFavourites,
  removeFavourites
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Timeline)
);
