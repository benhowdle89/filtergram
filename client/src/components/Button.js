import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  align-self: center;
  cursor: pointer;
  appearance: none;
  background-color: paleturquoise;
  border: 0;
  outline: 0;
  color: #000;
  font-weight: 600;
  text-align: center;
  width: auto;
  font-family: inherit;
  font-size: inherit;
  transform: skew(-21deg) rotate(-5deg);
  & > span {
    display: inline-block;
    transform: skew(21deg) rotate(5deg);
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
    <StyledButton {...rest} className={["px1", className].join(" ")}>
      <span>{children}</span>
    </StyledButton>
  );
};
