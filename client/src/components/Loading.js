import React from "react";
import styled from "styled-components";

import Puff from "./../assets/puff.svg";

const LoadingElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${props =>
    props.overlay &&
    `position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    width: 100%;
    z-index: 100;
    height: 100vh;`}
`;

const LoadingImg = styled.img`
  height: auto;
`

export const Loading = ({ overlay = false }) => {
  return (
    <LoadingElement
      overlay={overlay}
      className={`${overlay ? "" : "my3"} block`}
    >
      <LoadingImg src={Puff} />
    </LoadingElement>
  );
};
