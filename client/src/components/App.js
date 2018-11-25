import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";

import "./../overrides.css";

import Timeline from "../containers/Timeline";
import Profiles from "../containers/Profiles";

//LOGIN
import Login from "../containers/Login";
import SignUp from "../containers/SignUp";

const GlobalStyle = createGlobalStyle`
  img {
    max-width: 100%
  }
`;

const AppElement = styled.div``;

class App extends Component {
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
            path="/profiles"
            render={props => <Profiles {...props} />}
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

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
