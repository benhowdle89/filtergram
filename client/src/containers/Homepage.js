import React from "react";
import styled from "styled-components";

import Nav from "./../components/Nav";
import { Hr } from "./../components/Hr";

export default class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="max-width-2 mx-auto my4">
          <h2 className="mb3">
            For People Who Want To See Some Instagram Content But Aren't Too
            Keen On The Instagram Experience Itself.
          </h2>
          <Hr />
        </div>
      </div>
    );
  }
}
