import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

class Register extends Component {
  componentWillUnmount() {}

  handleFirstNameChange(e) {}

  handleLastNameChange(e) {}

  handleEmailChange(e) {}

  handlePasswordChange(e) {}

  handleSubmitForm(e) {}
  render() {
    const { values, inProgress } = {
      values: { email: '', password: '' },
      inProgress: false,
    };

    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={e => this.handleSubmitForm(e)}>
            <h3>Sign Up</h3>

            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                value={values.firstName}
                onChange={e => this.handleFirstNameChange(e)}
              />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                value={values.lastName}
                onChange={e => this.handleLastNameChange(e)}
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={values.email}
                onChange={e => this.handleEmailChange(e)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={values.password}
                onChange={e => this.handlePasswordChange(e)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={inProgress}
            >
              Sign Up
            </button>
            <p className="forgot-password text-right">
              Already registered? <Link to="login">Sign in.</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
