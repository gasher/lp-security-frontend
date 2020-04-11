import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import { withStore } from '../helpers';

class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  handleChange(event) {
    const {
      target: { value, name },
    } = event;

    return this.setState({
      [name]: value,
    });
  }

  handleSubmitForm(event) {
    event.preventDefault();
    const { store } = this.props;

    return store.authStore.signUp(this.state);
  }

  render() {
    const { email, firstName, lastName, password } = this.props;

    return (
      <div className="form-wrapper">
        <div className="form-inner">
          <form onSubmit={event => this.handleSubmitForm(event)}>
            <h3>Sign Up</h3>

            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First name"
                value={firstName}
                onChange={event => this.handleChange(event)}
              />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last name"
                value={lastName}
                onChange={event => this.handleChange(event)}
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={event => this.handleChange(event)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={event => this.handleChange(event)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
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

export default withStore(Register);
