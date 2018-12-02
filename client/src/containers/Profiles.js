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
      usernames: []
    };
    this.newUsernameInput = React.createRef();
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
  setUsernames = () => {
    const usernames = this.props.profiles.usernamesById.map(u => {
      return {
        username: u,
        filters: this.props.profiles.usernameFilters[u] || []
      };
    });
    this.setState({
      usernames
    });
  };
  handleSubmit = () => {
    this.props.editProfiles(this.state.usernames);
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
        ]
      },
      () => {
        this.newUsernameInput.current.value = "";
      }
    );
  };
  onRemoveUsername = username => {
    this.setState({
      usernames: [...this.state.usernames.filter(u => u.username !== username)]
    });
  };
  handleChange = ({ keyCode, target }) => {
    const { value } = target;
    if (keyCode === 13 && value) {
      return this.onAddNewUsername(value);
    }
  };
  handleRemove = username => username && this.onRemoveUsername(username);
  onAddFilter = ({ username, filter }) => {
    this.setState({
      usernames: [
        ...this.state.usernames.map(u => {
          if (u.username !== username) return u;
          return {
            ...u,
            filters: uniq([...u.filters, filter.toLowerCase().trim()])
          };
        })
      ]
    });
  };
  onRemoveFilter = ({ username, filter }) => {
    this.setState({
      usernames: [
        ...this.state.usernames.map(u => {
          if (u.username !== username) return u;
          return {
            ...u,
            filters: [...u.filters.filter(f => f !== filter)]
          };
        })
      ]
    });
  };
  render() {
    const {
      profiles: { fetching, error }
    } = this.props;
    const { usernames } = this.state;
    const tagPlaceholder = "Add an Instagram username";
    return (
      <div>
        <Nav />
        <div>
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
          <input
            type="text"
            placeholder={tagPlaceholder}
            onKeyDown={this.handleChange}
            className="mb3"
            ref={this.newUsernameInput}
          />
          <Hr />
          <Button disabled={fetching} onClick={this.handleSubmit}>
            Save
          </Button>
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
