import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import './styles.css';
import { withStore } from '../helpers';

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: false,
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
      await store.authStore.login(this.state);

      return this.props.history.push('/');
    } catch (error) {
      this.setState({
        error: true,
      });

      return setTimeout(() => this.setState({ error: false }), 1000);
    }
  }

  render() {
    const { username, password, error } = this.state;

    return (
      <div>
        {error && <Alert variant="danger">Login failed!</Alert>}
        <div className="form-wrapper">
          <div className="form-inner">
            <form onSubmit={event => this.handleSubmitForm(event)}>
              <h3>Sign In</h3>

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
      </div>
    );
  }
}

export default withStore(Login);
