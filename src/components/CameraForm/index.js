import React, { Component } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';

import './styles.css';
import { withStore } from '../helpers';
import { djangoErrorResponseParser } from '../helpers';

class CameraForm extends Component {
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

  async handleSubmitForm(event) {
    event.preventDefault();

    try {
      const {
        store: { cameraStore },
      } = this.props;

      if (this.state.id) {
        return cameraStore.update(this.state);
      }

      await cameraStore.add(this.state);

      return this.props.history.push('/cameras');
    } catch (error) {
      console.log(djangoErrorResponseParser);
      return this.setState({
        error: djangoErrorResponseParser(error),
      });
    }
  }

  render() {
    const {
      id,
      name,
      description,
      latitude,
      longitude,
      status,
      ip_address,
      error,
    } = this.state;

    return (
      <div>
        {error.non_field_errors && (
          <Alert variant="danger">{error.non_field_errors}</Alert>
        )}
        <div className="form-wrapper">
          <div className="form-inner">
            <Form onSubmit={event => this.handleSubmitForm(event)}>
              <h3>{!id ? 'Add new camera' : 'Edit camera'}</h3>
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
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  onChange={event => this.handleChange(event)}
                  value={description}
                  required
                />
                {error.description && (
                  <Form.Text className="text-muted error">
                    {error.description}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  onChange={event => this.handleChange(event)}
                  value={status}
                  required
                >
                  <option value="AC" selected>
                    Active
                  </option>
                  <option value="IN">Inactive</option>
                </Form.Control>
                {error.status && (
                  <Form.Text className="text-muted error">
                    {error.status}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="text"
                  name="latitude"
                  onChange={event => this.handleChange(event)}
                  value={latitude}
                  required
                />
                {error.latitude && (
                  <Form.Text className="text-muted error">
                    {error.latitude}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="text"
                  name="longitude"
                  onChange={event => this.handleChange(event)}
                  value={longitude}
                  required
                />
                {error.longitude && (
                  <Form.Text className="text-muted error">
                    {error.longitude}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Ip Address</Form.Label>
                <Form.Control
                  type="text"
                  name="ip_address"
                  onChange={event => this.handleChange(event)}
                  value={ip_address}
                  required
                />
                {error.ip_address && (
                  <Form.Text className="text-muted error">
                    {error.ip_address}
                  </Form.Text>
                )}
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withStore(CameraForm);
