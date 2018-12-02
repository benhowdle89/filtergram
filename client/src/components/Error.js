import React from "react";
import styled from "styled-components";

const ErrorElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #fff;
  background: #e74c3c;
`;

export const Error = ({ children }) => {
  return (
    <ErrorElement className="my3 py2 block flex flex-column">
      {children}
    </ErrorElement>
  );
};
