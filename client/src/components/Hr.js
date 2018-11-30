import React from "react";
import styled from "styled-components";

const HrElement = styled.div`
  border-bottom: 3px solid paleturquoise;
  box-shadow: 0px 2px 0px #000;
  height: 1px;
`;

export const Hr = () => {
  return <HrElement className="mb3 block" />;
};
