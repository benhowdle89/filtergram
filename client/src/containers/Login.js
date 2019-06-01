import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { loginUsernamePassword, loginForgotPassword } from "./../modules/auth";

import Nav from "./../components/Nav";
import { Button } from "./../components/Button";
import { Error } from "./../components/Error";
import { Success } from "./../components/Success";
import { Loading } from "./../components/Loading";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
      success: null
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.auth.token && this.props.auth.token) {
      this.props.history.push("/feed");
    }
    if (
      !prevProps.auth.forms.usernamePassword.error &&
      this.props.auth.forms.usernamePassword.error
    ) {
      this.setState({
        error: this.props.auth.forms.usernamePassword.error
      });
    }
  }
  clearSuccess = () => this.setState({ success: null });
  handleForgotPasswordSubmit = () => {
    this.clearSuccess();
    const { email } = this.state;
    if (!email) {
      return this.setState({
        error: "Please fill out your email"
      });
    }
    this.props.loginForgotPassword(email).then(() => {
      if (!this.props.auth.forms.usernamePassword.error) {
        return this.setState({
          success:
            "Email with password reset instructions sent, please check your inbox."
        });
      }
    });
  };
  handleSubmit = () => {
    this.clearSuccess();
    const { email, password } = this.state;
    if (!email || !password) {
      return this.setState({
        error: "Please fill out all the fields"
      });
    }
    this.props.loginUsernamePassword(email, password);
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
            {this.state.success && <Success>{this.state.success}</Success>}
            <div>
              <label>Email</label>
              <input
                value={this.state.email}
                type="email"
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                value={this.state.password}
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
            {this.props.auth.forms.usernamePassword.fetching && <Loading />}
            <div className="flex justify-between">
              {!this.props.auth.forms.usernamePassword.fetching && (
                <Button>Log in</Button>
              )}
              <Button
                onClick={e => {
                  e.preventDefault();
                  this.handleForgotPasswordSubmit();
                }}
                secondary
              >
                Forgot password?
              </Button>
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
  loginUsernamePassword,
  loginForgotPassword
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
