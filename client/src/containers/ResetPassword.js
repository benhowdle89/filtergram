import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import queryString from "query-string";

import { resetPassword } from "./../modules/auth";

import Nav from "./../components/Nav";
import { Button } from "./../components/Button";
import { Error } from "./../components/Error";
import { Success } from "./../components/Success";
import { Loading } from "./../components/Loading";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      error: null,
      success: null
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      !prevProps.auth.forms.resetPassword.error &&
      this.props.auth.forms.resetPassword.error
    ) {
      this.setState({
        error: this.props.auth.forms.resetPassword.error
      });
    }
  }
  handleSubmit = () => {
    const { password } = this.state;
    const values = queryString.parse(this.props.location.search);
    if (!values.email || !password || !values.token) {
      return this.setState({
        error: "Missing required fields"
      });
    }
    if (password.length < 6) {
      return this.setState({
        error: "Password must be at least 6 characters"
      });
    }
    this.props.resetPassword(values.email, values.token, password).then(() => {
      if (!this.props.auth.forms.resetPassword.error) {
        return this.props.history.push("/login");
      }
    });
  };
  render() {
    return (
      <div className="h-100">
        <Nav />
        <div className="max-width-1 mx-auto my4">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.handleSubmit();
            }}
          >
            {this.state.error && <Error>{this.state.error}</Error>}
            <div>
              <label>New Password</label>
              <input
                value={this.state.password}
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
            {this.props.auth.forms.resetPassword.fetching && <Loading />}
            <div className="flex justify-between">
              {!this.props.auth.forms.resetPassword.fetching && (
                <Button>Reset Password</Button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  resetPassword
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResetPassword)
);
