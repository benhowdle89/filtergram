import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { logout } from "./../modules/auth";

const NavLink = styled(Link)`
  margin-right: 12px;
`;

class Nav extends React.Component {
  handleLogout = () => {
    const { logout, history } = this.props;
    logout();
    history.push("/login");
  };
  render() {
    const {
      auth: { token }
    } = this.props;
    const loggedIn = !!token;
    return (
      <div>
        {loggedIn && <NavLink to="/">Feed</NavLink>}
        {loggedIn && <NavLink to="/profiles">Manage usernames</NavLink>}
        {loggedIn && <NavLink to="/favourites">Favourites</NavLink>}
        {!loggedIn && <NavLink to="/login">Login</NavLink>}
        {!loggedIn && <NavLink to="/sign-up">Sign up</NavLink>}
        {loggedIn && <p onClick={this.handleLogout}>Logout</p>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logout
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Nav)
);
