import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import { withStore } from '../helpers';

class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    error: {},
  };

  handleChange(event) {
    const {
      target: { value, name },
    } = event;

    return this.setState({
      [name]: value,
    });
  }

  async handleSubmitForm(event) {
    event.preventDefault();
    const { store } = this.props;

    try {
      await store.authStore.signUp(this.state);

      return this.props.history.push('/');
    } catch (error) {
      return this.setState({
        error: error.response.data,
      });
    }
  }

  render() {
    const {
      email,
      firstName,
      lastName,
      password,
      username,
      error,
    } = this.state;

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
              {error.first_name && <label>{error.first_name[0]}</label>}
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
              {error.last_name && <label>{error.last_name[0]}</label>}
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
              {error.email && <label>{error.email[0]}</label>}
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={event => this.handleChange(event)}
              />
              {error.username && <label>{error.username[0]}</label>}
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
              {error.password && <label>{error.password[0]}</label>}
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
