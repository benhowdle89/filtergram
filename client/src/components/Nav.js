import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { logout } from "./../modules/auth";

import { Button } from "./Button";

const activeClassName = "nav-item-active";

const NavItem = styled(NavLink)`
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  &.${activeClassName} {
    border-bottom: 2px solid paleturquoise;
  }
  :hover {
    border-bottom: 2px solid paleturquoise;
  }
`;

const NavMenu = styled.div`
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-weight: 800;
  text-transform: uppercase;
  text-shadow: 0px 3px 0px paleturquoise;
  letter-spacing: 0px;
`;

const isHome = path => path === "/";

class Nav extends React.Component {
  shouldComponentUpdate() {
    return true;
  }
  handleLogout = () => {
    const { logout, history } = this.props;
    logout();
    history.push("/");
  };
  render() {
    const {
      auth: { token },
      location: { pathname }
    } = this.props;
    const loggedIn = !!token;
    return (
      <NavMenu className="p3 mb3">
        <div>
          <Logo className="mb2">Filtergram</Logo>
          {!loggedIn && !isHome(pathname) && (
            <NavItem
              exact
              activeClassName={activeClassName}
              className="mr1"
              to="/"
            >
              Home
            </NavItem>
          )}
          {loggedIn && (
            <NavItem
              exact
              activeClassName={activeClassName}
              className="mr1"
              to="/feed"
            >
              Feed
            </NavItem>
          )}
          {loggedIn && (
            <NavItem
              exact
              activeClassName={activeClassName}
              className="mr1"
              to="/following"
            >
              Following
            </NavItem>
          )}
          {loggedIn && (
            <NavItem
              activeClassName={activeClassName}
              exact
              className="mr1"
              to="/favourites"
            >
              Favourites
            </NavItem>
          )}
        </div>
        <div>
          {!loggedIn && (
            <NavItem
              activeClassName={activeClassName}
              exact
              className="mr1"
              to="/login"
            >
              Login
            </NavItem>
          )}
          {!loggedIn && (
            <NavItem
              activeClassName={activeClassName}
              exact
              className="mr1"
              to="/sign-up"
            >
              Sign up
            </NavItem>
          )}
          {loggedIn && <Button onClick={this.handleLogout}>Logout</Button>}
        </div>
      </NavMenu>
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
