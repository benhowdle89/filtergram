import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { logout } from "./../modules/auth";

const NavLink = styled(Link)`
  margin-right: 12px;
`;

const NavMenu = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  > * div:first-child {
  }
`;

const isHome = path => path === "/";

class Nav extends React.Component {
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
      <NavMenu>
        <div>
          {!loggedIn && !isHome(pathname) && <NavLink to="/">Home</NavLink>}
          {loggedIn && <NavLink to="/feed">Feed</NavLink>}
          {loggedIn && <NavLink to="/profiles">Manage usernames</NavLink>}
          {loggedIn && <NavLink to="/favourites">Favourites</NavLink>}
        </div>
        <div>
          {!loggedIn && <NavLink to="/login">Login</NavLink>}
          {!loggedIn && <NavLink to="/sign-up">Sign up</NavLink>}
          {loggedIn && <button onClick={this.handleLogout}>Logout</button>}
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
