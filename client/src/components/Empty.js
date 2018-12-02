import React from "react";
import styled from "styled-components";

import { HeadingText } from "./common.styles";

const EmptyElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Empty = ({ children }) => {
  return (
    <EmptyElement className="my3 block">
      <HeadingText>{children}</HeadingText>
    </EmptyElement>
  );
};
