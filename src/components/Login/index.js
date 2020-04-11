import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import { withStore } from '../helpers';

class Login extends Component {
  state = {
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

    return store.authStore.login(this.state);
  }

  render() {
    const { email, password } = this.props;
    console.log(this.props.store);
    return (
      <div className="form-wrapper">
        <div className="form-inner">
          <form onSubmit={event => this.handleSubmitForm(event)}>
            <h3>Sign In</h3>

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

export default withStore(Login);
