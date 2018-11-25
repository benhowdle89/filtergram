import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import uniq from "lodash.uniq";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";

import { Nav } from "./../components/Nav";

import { fetchProfiles, editProfiles } from "./../modules/profiles";

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernames: []
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      !prevProps.profiles.usernamesById.length &&
      this.props.profiles.usernamesById.length
    ) {
      this.setState({
        usernames: this.props.profiles.usernamesById
      });
    }
  }
  componentDidMount() {
    if (!this.props.profiles.usernamesById.length) this.props.fetchProfiles();
    if (this.props.profiles.usernamesById.length)
      this.setState({
        usernames: this.props.profiles.usernamesById
      });
  }
  handleSubmit = () => {
    this.props.editProfiles(this.getTags()).then(() => {
      const {
        profiles: { error },
        history
      } = this.props;
      if (!error) {
        history.push("/");
      }
    });
  };
  handleChange = usernames => {
    this.setState({
      usernames
    });
  };
  getTags = () => {
    const tags = uniq([...this.state.usernames]);
    return tags;
  };
  render() {
    const {
      profiles: { fetching, error, usernames, usernamesById }
    } = this.props;
    const tagPlaceholder = "Add an Instagram username";
    return (
      <div>
        <Nav />
        {fetching && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!usernamesById.length && !fetching && <p>Nothing to show</p>}
        <form
          onSubmit={e => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <TagsInput
            value={this.getTags()}
            onChange={this.handleChange}
            inputProps={{
              placeholder: tagPlaceholder,
              size: tagPlaceholder.length
            }}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profiles: state.profiles
});

const mapDispatchToProps = {
  editProfiles,
  fetchProfiles
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profiles)
);
