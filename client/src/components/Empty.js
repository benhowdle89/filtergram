import React from "react";
import styled from "styled-components";

const EmptyElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

export const Empty = ({ children }) => {
  return <EmptyElement className="my3 block">{children}</EmptyElement>;
};
