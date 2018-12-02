import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import uniq from "lodash.uniq";
import styled from "styled-components";

import Nav from "./../components/Nav";

import { Button } from "./../components/Button";
import { Loading } from "./../components/Loading";
import { FilterInput } from "./../components/FilterInput";
import { Hr } from "./../components/Hr";

import { fetchProfiles, editProfiles } from "./../modules/profiles";

const FormInput = styled.div``;

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernames: [],
      newUsername: ""
    };
  }
  componentDidMount() {
    if (!this.props.profiles.usernamesById.length) this.props.fetchProfiles();
    if (this.props.profiles.usernamesById.length) {
      this.setUsernames();
    }
  }
  componentDidUpdate(prevProps) {
    if (
      !prevProps.profiles.usernamesById.length &&
      this.props.profiles.usernamesById.length
    ) {
      this.setUsernames();
    }
  }
  formatUsernamesForState = () => {
    return this.props.profiles.usernamesById.map(u => {
      return {
        username: u,
        filters: this.props.profiles.usernameFilters[u] || []
      };
    });
  };
  setUsernames = () => {
    const usernames = this.formatUsernamesForState();
    this.setState({
      usernames
    });
  };
  hasBeenEdited = () => {
    const propsUsernames = this.formatUsernamesForState();
    const { usernames } = this.state;
    return JSON.stringify(propsUsernames) !== JSON.stringify(usernames);
  };
  handleSubmit = () => {
    this.props.editProfiles(this.state.usernames);
  };
  handleAddNewUsername = () => {
    const value = this.state.newUsername;
    if (value) {
      this.onAddNewUsername(value);
    }
  };
  handleChange = ({ target }) => {
    const { value } = target;
    return this.setState({
      newUsername: value
    });
  };
  onAddNewUsername = username => {
    username = username.toLowerCase().trim();
    this.setState(
      {
        usernames: [
          ...this.state.usernames,
          {
            username,
            filters: []
          }
        ],
        newUsername: ""
      },
      this.handleSubmit
    );
  };
  onRemoveUsername = username => {
    this.setState(
      {
        usernames: [
          ...this.state.usernames.filter(u => u.username !== username)
        ]
      },
      this.handleSubmit
    );
  };
  onAddFilter = ({ username, filter }) => {
    this.setState(
      {
        usernames: [
          ...this.state.usernames.map(u => {
            if (u.username !== username) return u;
            return {
              ...u,
              filters: uniq([...u.filters, filter.toLowerCase().trim()])
            };
          })
        ]
      },
      this.handleSubmit
    );
  };
  onRemoveFilter = ({ username, filter }) => {
    this.setState(
      {
        usernames: [
          ...this.state.usernames.map(u => {
            if (u.username !== username) return u;
            return {
              ...u,
              filters: [...u.filters.filter(f => f !== filter)]
            };
          })
        ]
      },
      this.handleSubmit
    );
  };
  handleRemove = username => username && this.onRemoveUsername(username);
  render() {
    const {
      profiles: { fetching, error }
    } = this.props;
    const { usernames } = this.state;
    const tagPlaceholder = "Add an Instagram username";
    return (
      <div>
        <Nav />
        <div className="max-width-1 mx-auto my4">
          {fetching && <Loading />}
          {error && <p>Error: {error}</p>}
          {!usernames.length && !fetching && <p>Nothing to show</p>}
          {usernames.map(u => {
            return (
              <FormInput className="mb3" key={u.username}>
                <FilterInput
                  username={u.username}
                  onAddFilter={this.onAddFilter}
                  onRemoveFilter={this.onRemoveFilter}
                  filters={u.filters}
                  handleRemoveUsername={this.handleRemove}
                />
                <Hr />
              </FormInput>
            );
          })}
          <div className="flex justify-between items-center mb2">
            <input
              type="text"
              disabled={fetching}
              value={this.state.newUsername}
              placeholder={tagPlaceholder}
              onKeyDown={({ keyCode }) => {
                if (keyCode === 13) this.handleAddNewUsername();
              }}
              onChange={this.handleChange}
            />
            {this.state.newUsername && (
              <Button
                className="ml1"
                disabled={fetching}
                onClick={this.handleAddNewUsername}
              >
                Save
              </Button>
            )}
          </div>
        </div>
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
