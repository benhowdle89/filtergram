import React, { Component } from "react";
import { connect } from "react-redux";

import { signUp } from "./../modules/auth";

import Nav from "./../components/Nav";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleSubmit = () => {
    this.props.signUp(this.state.email, this.state.password);
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
          <label>Email</label>
          <input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <label>Password</label>
          <input
            value={this.state.password}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
