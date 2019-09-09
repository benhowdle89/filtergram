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
  font-weight: 700;
  border-bottom: 3px solid transparent;
  text-transform: uppercase;
  &.${activeClassName} {
    border-bottom: 3px solid paleturquoise;
    box-shadow: 0px 2px 0px #000;
  }
  :hover {
    border-bottom: 3px solid paleturquoise;
    box-shadow: 0px 2px 0px #000;
  }
`;

const NavMenu = styled.div`
  border-bottom: 3px solid #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 0px paleturquoise;
  @media (max-width: 700px) {
    padding: 1rem 0;
    flex-direction: column-reverse;
    > div:first-child {
      margin-bottom: 1rem;
    }
    > div:last-child {
      align-self: flex-end;
      margin-bottom: 1rem;
    }
  }
`;

const Logo = styled.h1`
  font-weight: 800;
  text-transform: uppercase;
  text-shadow: -2px 2px 0px paleturquoise;
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
      location: { pathname }
    } = this.props;
    return (
      <NavMenu className="py3 mb3">
        <div>
          <Logo className={!isHome(pathname) && "mb2"}>Filtergram</Logo>
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
