import React from "react";
import styled from "styled-components";

const SuccessElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #000;
  border: 3px solid #000;
  text-align: center;
`;

export const Success = ({ children }) => {
  return (
    <SuccessElement className="my3 py2 block flex flex-column">
      {children}
    </SuccessElement>
  );
};
