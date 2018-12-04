import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import uniq from "lodash.uniq";
import styled from "styled-components";

import Nav from "./../components/Nav";

import { Button } from "./../components/Button";
import { Loading } from "./../components/Loading";
import { Error } from "./../components/Error";
import { FilterInput } from "./../components/FilterInput";
import { Hr } from "./../components/Hr";
import { SmallNote } from "./../components/common.styles";

import { fetchProfiles, editProfiles } from "./../modules/profiles";

const FormInput = styled.div``;

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUsername: ""
    };
  }
  componentDidMount() {
    if (!this.props.profiles.usernamesById.length) this.props.fetchProfiles();
  }

  formatUsernamesForState = () => {
    return this.props.profiles.usernamesById.map(u => {
      return {
        username: u,
        filters: this.props.profiles.usernameFilters[u] || []
      };
    });
  };
  handleSubmit = newUsernames => {
    this.props.editProfiles(newUsernames);
  };
  handleAddNewUsername = () => {
    const value = this.state.newUsername;
    if (value) {
      this.onAddNewUsername(value);
    }
  };
  handleChange = ({ target }) => {
    let { value } = target;
    value = value.replace(/\s.*/, "");
    return this.setState({
      newUsername: value
    });
  };
  onAddNewUsername = username => {
    username = username.toLowerCase().trim();
    const usernames = this.formatUsernamesForState();
    this.setState(
      {
        newUsername: ""
      },
      () => {
        this.handleSubmit([
          ...usernames,
          {
            username,
            filters: []
          }
        ]);
      }
    );
  };
  onRemoveUsername = username => {
    this.handleSubmit([
      ...this.formatUsernamesForState().filter(u => u.username !== username)
    ]);
  };
  onAddFilter = ({ username, filter }) => {
    this.handleSubmit([
      ...this.formatUsernamesForState().map(u => {
        if (u.username !== username) return u;
        return {
          ...u,
          filters: uniq([...u.filters, filter.toLowerCase().trim()])
        };
      })
    ]);
  };
  onRemoveFilter = ({ username, filter }) => {
    this.handleSubmit([
      ...this.formatUsernamesForState().map(u => {
        if (u.username !== username) return u;
        return {
          ...u,
          filters: [...u.filters.filter(f => f !== filter)]
        };
      })
    ]);
  };
  handleRemove = username => username && this.onRemoveUsername(username);
  render() {
    const {
      profiles: { fetching, error }
    } = this.props;
    const usernames = this.formatUsernamesForState();
    const tagPlaceholder = "Add an Instagram username";
    return (
      <div>
        <Nav />

        <div className="max-width-1 mx-auto my4">
          {fetching && <Loading />}
          {error && (
            <Error>
              <p className="mb2">{error}</p>
              <Button onClick={this.props.fetchProfiles}>Try again?</Button>
            </Error>
          )}

          {!error && (
            <div className="mb4">
              <p className="bold mb2">Who do you want to follow?</p>
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
              <SmallNote>
                <p>
                  <span className="bold">Note:</span> Private Instagram accounts
                  cannot be followed.
                </p>
              </SmallNote>
            </div>
          )}

          <Hr />

          {!!usernames.length && (
            <div className="max-width-2 mx-auto mb3">
              <p className="mb1">
                You can decide what posts are included in your feed by adding
                some filters for each user. If their post's caption contain your
                filter words, then it's displayed!
              </p>
              <p>
                If you don't add any filters, all posts are displayed for that
                user.
              </p>
            </div>
          )}

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
