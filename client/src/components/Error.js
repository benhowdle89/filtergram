import React from "react";
import styled from "styled-components";

const ErrorElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #fff;
  background: #e74c3c;
  box-shadow: -3px 3px 0px #000;
`;

export const Error = ({ children }) => {
  return (
    <ErrorElement className="my3 py2 block flex flex-column">
      {children}
    </ErrorElement>
  );
};
