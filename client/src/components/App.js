import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Timeline from "../containers/Timeline";

//LOGIN
import Login from "../containers/Login";
import SignUp from "../containers/SignUp";

class App extends Component {
  render() {
    const {
      auth: { token }
    } = this.props;
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props =>
            token ? <Timeline {...props} /> : <Redirect to="/login" />
          }
        />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route exact path="/sign-up" render={props => <SignUp {...props} />} />

        {/* <Route component={NotFound} /> */}
      </Switch>
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
