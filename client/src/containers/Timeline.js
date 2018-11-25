import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { fetchProfiles } from "./../modules/profiles";

import Nav from "./../components/Nav";
import { Feed } from "./../components/Feed";

class Timeline extends Component {
  componentDidMount() {
    if (!this.props.profiles.usernamesById.length) this.props.fetchProfiles();
  }
  render() {
    const {
      profiles: { fetching, error, usernames, usernamesById }
    } = this.props;
    return (
      <div>
        <Nav />
        {fetching && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!usernamesById.length && !fetching && <p>Nothing to show</p>}
        {<Feed usernames={usernames} usernamesById={usernamesById} />}
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
