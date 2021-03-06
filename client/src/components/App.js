import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";

import "./../overrides.css";
import "basscss/css/basscss.min.css";

import { logout } from "../modules/auth";

import Timeline from "../containers/Timeline";
import Profiles from "../containers/Profiles";
import Homepage from "../containers/Homepage";
import Login from "../containers/Login";
import SignUp from "../containers/SignUp";
import Favourites from "../containers/Favourites";
import ResetPassword from "../containers/ResetPassword";

import { Container } from "../components/common.styles";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  html, body {
    height: 100%;
  }
  html{
    font-size:16px
  }
  body{
    background:#fff;
    text-rendering:optimizeLegibility;
    -webkit-font-smoothing:antialiased;
    color:#000;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    font-size: 1rem;
    line-height: 1.8;
  }
  a {
    color: inherit;
    text-decoration: none;
    font-weight: 800;
    border-bottom: 3px solid transparent;
    :hover {
      border-bottom: 3px solid paleturquoise;
      box-shadow: 0px 2px 0px #000;
    }
  }
  a[data-external]:after {
    content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==);
    margin: 0 3px 0 5px;
  }
  img, video {
    max-width: 100%;
    display: block;
  }
  label {
    font-weight: 600;
    margin-right: 1rem;
    display: block;
  }
  form div {
    margin-bottom: 1rem;
  }
  input {
    border: 3px solid paleturquoise;
    box-shadow: -3px 3px 0px #000;
    padding: 0.5rem 1rem;
    display: inline-block;
    width: 100%;
    font-size: 14px;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    box-sizing: border-box;
    appearance: none;
    border-radius: 0;
  }
  .pointer { cursor: pointer; }
  .h-100 { height: 100%; }
`;

const AppElement = styled.div`
  max-width: 1800px;
  margin: auto;
  height: 100%;
`;

class App extends Component {
  componentDidUpdate(prevProps, prevState) {
    const {
      auth: { token }
    } = this.props;
    const {
      auth: { token: oldToken }
    } = prevProps;
    if (oldToken && !token) {
      this.handleLogout();
    }
  }
  handleLogout = () => {
    const { logout, history } = this.props;
    logout();
    history.push("/");
  };
  render() {
    const {
      auth: { token }
    } = this.props;
    return (
      <AppElement>
        <Container>
          <GlobalStyle />
          <Switch>
            <Route
              path="*"
              render={props => {
                const {
                  location: { pathname }
                } = props;
                return pathname !== "/" ? (
                  <Redirect to="/" />
                ) : (
                  <Homepage {...props} />
                );
              }}
            />
            {/* <Route
              path="/feed"
              exact
              render={props =>
                token ? <Timeline {...props} /> : <Redirect to="/login" />
              }
            />
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route
              exact
              path="/sign-up"
              render={props => <SignUp {...props} />}
            />
            <Route
              exact
              path="/reset-password"
              render={props => <ResetPassword {...props} />}
            />
            <Route
              exact
              path="/following"
              render={props =>
                token ? <Profiles {...props} /> : <Redirect to="/login" />
              }
            />

            <Route
              exact
              path="/favourites"
              render={props =>
                token ? <Favourites {...props} /> : <Redirect to="/login" />
              }
            /> */}

            {/* <Route component={NotFound} /> */}
          </Switch>
        </Container>
      </AppElement>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logout
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
