import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";

import "./../overrides.css";
import basscss from "basscss/css/basscss.min.css";

import { logout } from "../modules/auth";

import Timeline from "../containers/Timeline";
import Profiles from "../containers/Profiles";
import Homepage from "../containers/Homepage";

//LOGIN
import Login from "../containers/Login";
import SignUp from "../containers/SignUp";
import Favourites from "../containers/Favourites";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  html{
    font-size:14px
  }
  body{
    background:#fff;
    text-rendering:optimizeLegibility;
    -webkit-font-smoothing:antialiased;
    color:#222;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    overflow:auto
  }
  a {
    color: inherit;
    text-decoration: none;
    font-weight: 600;
  }
  img, video {
    max-width: 100%;
  }
`;

const AppElement = styled.div`
  max-width: 1800px;
  margin: auto;
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
        <GlobalStyle />
        <Switch>
          <Route
            path="/"
            exact
            render={props =>
              token ? <Redirect to="/feed" /> : <Homepage {...props} />
            }
          />
          <Route path="/feed" exact render={props => <Timeline {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route
            exact
            path="/sign-up"
            render={props => <SignUp {...props} />}
          />
          <Route
            exact
            path="/following"
            render={props => <Profiles {...props} />}
          />

          <Route
            exact
            path="/favourites"
            render={props => <Favourites {...props} />}
          />

          {/* <Route component={NotFound} /> */}
        </Switch>
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
