import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { loginUsernamePassword } from "./../modules/auth";

import Nav from "./../components/Nav";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null
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
  handleSubmit = () => {
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
      <div>
        <Nav />
        <form
          onSubmit={e => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          {this.state.error && <p>{this.state.error}</p>}
          <label>Email</label>
          <input
            value={this.state.email}
            type="email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <label>Password</label>
          <input
            value={this.state.password}
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  loginUsernamePassword
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
