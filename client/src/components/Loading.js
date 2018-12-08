import React from "react";
import styled from "styled-components";

const Puff = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#afeeee"
  >
    <g fill="none" fillRule="evenodd" strokeWidth="2">
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="0s"
          dur="1.8s"
          values="1; 20"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="-0.9s"
          dur="1.8s"
          values="1; 20"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="-0.9s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);

const LoadingElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${props =>
    props.overlay &&
    `position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    width: 100%;
    z-index: 100;
    height: 100vh;`}
`;

export const Loading = ({ overlay = false }) => {
  return (
    <LoadingElement
      overlay={overlay}
      className={`${overlay ? "" : "my3"} block`}
    >
      <Puff />
    </LoadingElement>
  );
};
