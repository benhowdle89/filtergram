import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(Link)`
  margin-right: 12px;
`;

export class Nav extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/">Feed</NavLink>
        <NavLink to="/profiles">Manage usernames</NavLink>
      </div>
    );
  }
}
