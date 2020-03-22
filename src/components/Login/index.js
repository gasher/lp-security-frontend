import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

class Login extends Component {
  componentWillUnmount() {}

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
            <h3>Sign In</h3>

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
              Submit
            </button>
            <p className="forgot-password text-right">
              Don't have an account? <Link to="register">Sign up.</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
