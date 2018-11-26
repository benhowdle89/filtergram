import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { signUp } from "./../modules/auth";

import Nav from "./../components/Nav";

class SignUp extends Component {
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
      !prevProps.auth.forms.signUp.error &&
      this.props.auth.forms.signUp.error
    ) {
      this.setState({
        error: this.props.auth.forms.signUp.error
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
    if (password.length < 6) {
      return this.setState({
        error: "Password must be at least 6 characters"
      });
    }
    this.props.signUp(email, password);
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
            required
            onChange={e => this.setState({ email: e.target.value })}
          />
          <label>Password</label>
          <input
            value={this.state.password}
            type="password"
            required
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
  signUp
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUp)
);
