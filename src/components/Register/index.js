import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Form, Button } from 'react-bootstrap';

import './styles.css';
import { withStore, djangoErrorResponseParser } from '../helpers';

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
        error: djangoErrorResponseParser(error),
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
      <div>
        {error.non_field_errors && (
          <Alert variant="danger">{error.non_field_errors}</Alert>
        )}
        <div className="form-wrapper">
          <div className="form-inner">
            <h3>Sign Up</h3>

            <Form onSubmit={event => this.handleSubmitForm(event)}>
              <Form.Group>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  onChange={event => this.handleChange(event)}
                  value={firstName}
                  required
                />
                {error.first_name && (
                  <Form.Text className="text-muted error">
                    {error.first_name}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  onChange={event => this.handleChange(event)}
                  value={lastName}
                  required
                />
                {error.last_name && (
                  <Form.Text className="text-muted error">
                    {error.last_name}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={event => this.handleChange(event)}
                  value={email}
                  required
                />
                {error.email && (
                  <Form.Text className="text-muted error">
                    {error.email}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  onChange={event => this.handleChange(event)}
                  value={username}
                  required
                />
                {error.username && (
                  <Form.Text className="text-muted error">
                    {error.username}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={event => this.handleChange(event)}
                  value={password}
                  required
                />
                {error.password && (
                  <Form.Text className="text-muted error">
                    {error.password}
                  </Form.Text>
                )}
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Sign Up
              </Button>
              <Form.Text className="text-muted text-right">
                Already registered? <Link to="login">Sign in.</Link>
              </Form.Text>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withStore(Register);
