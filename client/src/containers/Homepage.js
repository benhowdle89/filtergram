import React from "react";
import styled from "styled-components";

import Nav from "./../components/Nav";
import { Hr } from "./../components/Hr";
import { HeadingText } from "./../components/common.styles";
import { Error } from "./../components/Error";

const StyledIphone = styled.img`
  /* max-width: 256px; */
  @media (max-width: 700px) {
    max-width: 100%;
  }
`;

const SellSection = styled.div`
  border-bottom: 3px solid #000;
`;

const StepsSection = styled.div`
  border-bottom: 3px solid #000;
`;

const Bullet = styled(HeadingText)`
  font-weight: bold;
`;

const StepsItem = styled(HeadingText)`
  margin-bottom: 1rem;
`;

const Footer = styled.div``;

const HomepageWrap = styled.div`
  background: paleturquoise;
  box-shadow: -6px 6px 0px #000;
  padding: 2rem;
  @media (max-width: 700px) {
    flex-direction: column-reverse;
  }
`;

const HalfWidth = styled.div`
  &:last-child {
  }
  @media (max-width: 700px) {
    width: 100%;
    &:last-child {
      margin-bottom: 2rem;
    }
  }
`;

export default class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Error>
          <h2>Notice</h2>
          <p className="mb1">
            Unfortunately, due to Instagram's hostile ecosystem (blocking
            requests) and lack of willingness to liberate content to 3rd party
            apps, Filtergram is shutting down.
          </p>
          <p className="mb1">
            It wasn't around for that long, but it seemed to vibe with a lot of{" "}
            <a href="https://www.fastcompany.com/90283998/hate-social-media-but-cant-go-without-instagram-this-app-is-for-you">
              people
            </a>
            , which makes it more frustrating that its not sustainable or
            possible to keep running.
          </p>
          <p className="mb1">
            If you've got any ideas on how exactly you'd like your data exported
            from Filtergram in a helpful format, please get in{" "}
            <a href="mailto:hello@benhowdle.im">touch</a>.
          </p>
          <p className="mb1">
            The source code for this service is{" "}
            <a href="https://github.com/benhowdle89/filtergram">available</a> to
            peruse, or even host your own version!
          </p>
        </Error>
        <HomepageWrap className="py4 mx-auto my4 flex items-center">
          <HalfWidth className="col-6 mr1 flex items-center justify-center">
            <StyledIphone className="p2" src="./iphone.png" alt="" />
          </HalfWidth>
          <HalfWidth className="col-6 p2 ml1">
            <SellSection className="mb3 pb3">
              <h3>
                For People Who Want To See Some Instagram Content But Aren't Too
                Keen On The Instagram Experience Itself.
              </h3>
            </SellSection>

            <StepsSection className="mb3 pb3">
              <StepsItem>Follow some Instagram accounts.</StepsItem>
              <StepsItem>Filter their posts by keyword.</StepsItem>
              <StepsItem>Enjoy your chronological minimal feed.</StepsItem>
            </StepsSection>

            <Bullet>
              <p>No Instagram account needed.</p>
            </Bullet>
            <Bullet>
              <p>No comments.</p>
            </Bullet>
            <Bullet>
              <p>No ads.</p>
            </Bullet>
          </HalfWidth>
        </HomepageWrap>
        <Hr />
        <Footer className="pb2">
          <p>
            Made by <a href="https://benhowdle.im">Ben Howdle</a>
          </p>
        </Footer>
      </div>
    );
  }
}
