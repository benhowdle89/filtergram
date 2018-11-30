import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  align-self: center;
  cursor: pointer;
  appearance: none;
  background-color: paleturquoise;
  /* border: 3px solid #000;
  box-sizing: border-box; */
  box-shadow: -3px 3px 0px #000;
  outline: 0;
  color: #000;
  font-weight: 800;
  text-align: center;
  width: auto;
  font-family: inherit;
  font-size: 16px;
  text-transform: uppercase;
  /* transform: skew(-14deg) rotate(-3deg); */
  & > span {
    display: inline-block;
    /* transform: skew(14deg) rotate(3deg); */
    border-bottom: 2px solid transparent;
  }
  &:hover {
    opacity: 0.9;
    & > span {
      border-bottom: 2px solid #000;
    }
  }
`;

export const Button = ({ children, className, ...rest }) => {
  return (
    <StyledButton {...rest} className={["px2 py1", className].join(" ")}>
      <span>{children}</span>
    </StyledButton>
  );
};
