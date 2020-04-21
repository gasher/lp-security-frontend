import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Form, Button } from 'react-bootstrap';

import './styles.css';
import { withStore, djangoErrorResponseParser } from '../helpers';

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
        error: djangoErrorResponseParser(error),
      });

      return setTimeout(() => this.setState({ error: false }), 1000);
    }
  }

  render() {
    const { username, password, error } = this.state;

    return (
      <div>
        {error.non_field_errors && (
          <Alert variant="danger">{error.non_field_errors}</Alert>
        )}
        <div className="form-wrapper">
          <div className="form-inner">
            <h3>Sign In</h3>
            <Form onSubmit={event => this.handleSubmitForm(event)}>
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
                Submit
              </Button>
              <Form.Text className="text-muted text-right">
                Don't have an account? <Link to="register">Sign up.</Link>
              </Form.Text>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withStore(Login);
