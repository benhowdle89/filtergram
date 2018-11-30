import React from "react";
import styled from "styled-components";

const LoadingElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = () => {
  return (
    <LoadingElement className="my3 block">
      <img src="/puff.svg" />
    </LoadingElement>
  );
};
