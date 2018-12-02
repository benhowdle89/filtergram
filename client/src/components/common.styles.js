import styled from "styled-components";

export const Container = styled.div`
  max-width: 935px;
  margin: auto;
  padding-bottom: 24px;
  @media (max-width: 700px) {
    padding: 0 24px 24px 24px;
  }
`;

export const HeadingText = styled.h3`
  font-weight: 500;
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;
