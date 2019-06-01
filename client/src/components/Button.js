import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  align-self: center;
  cursor: pointer;
  appearance: none;
  background-color: ${props =>
    !props.destructive
      ? props.secondary
        ? "transparent"
        : "paleturquoise"
      : "#e74c3c"};
  box-shadow: ${props => (props.secondary ? "none" : "-3px 3px 0px #000")};
  text-decoration: ${props => (props.secondary ? "underline" : "none")};
  outline: 0;
  color: ${props => (!props.destructive ? "#000" : "#fff")};
  font-weight: 800;
  text-align: center;
  width: auto;
  font-family: inherit;
  font-size: ${props => (!props.destructive ? "14px" : "12px")};
  text-transform: uppercase;
  @media (max-width: 700px) {
    padding: 0.5rem 0.5rem;
    font-size: ${props => (!props.destructive ? "12px" : "10px")};
  }
  & > span {
    display: inline-block;
    border-bottom: ${props =>
      props.secondary ? "2px solid #000" : "2px solid transparent"};
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
