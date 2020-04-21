import React, { Component } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';

import './styles.css';
import { withStore } from '../helpers';
import { djangoErrorResponseParser } from '../helpers';

class RoutineForm extends Component {
  state = {
    id: this.props.id || null,
    name: this.props.name || '',
    description: this.props.description || '',
    longitude: this.props.longitude || '',
    latitude: this.props.latitude || '',
    status: this.props.status || 'AC',
    ip_address: this.props.ip_address || '',
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

  async handleDelete(id) {
    try {
      const {
        store: { routineStore },
      } = this.props;

      await routineStore.delete(id);

      return this.props.history.push('/routines');
    } catch (error) {
      console.log(djangoErrorResponseParser);
      return this.setState({
        error: djangoErrorResponseParser(error),
      });
    }
  }

  async handleSubmitForm(event) {
    event.preventDefault();

    try {
      const {
        store: { routineStore },
      } = this.props;

      if (this.state.id) {
        return routineStore.update(this.state);
      }

      await routineStore.add(this.state);

      return this.props.history.push('/routines');
    } catch (error) {
      console.log(djangoErrorResponseParser);
      return this.setState({
        error: djangoErrorResponseParser(error),
      });
    }
  }

  render() {
    const { id, name, code, error } = this.state;

    return (
      <div>
        {error.non_field_errors && (
          <Alert variant="danger">{error.non_field_errors}</Alert>
        )}
        <div className="form-wrapper">
          <div className="form-inner">
            <Form onSubmit={event => this.handleSubmitForm(event)}>
              <h3>{!id ? 'Add new routine' : 'Edit routine'}</h3>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={event => this.handleChange(event)}
                  value={name}
                  required
                />
                {error.name && (
                  <Form.Text className="text-muted error">
                    {error.name}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Code</Form.Label>
                <Form.Control
                  as="textarea"
                  name="code"
                  onChange={event => this.handleChange(event)}
                  value={code}
                  required
                />
                {error.code && (
                  <Form.Text className="text-muted error">
                    {error.code}
                  </Form.Text>
                )}
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              {id && (
                <Button variant="danger" onClick={() => this.handleDelete(id)}>
                  Remove routine
                </Button>
              )}
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withStore(RoutineForm);
