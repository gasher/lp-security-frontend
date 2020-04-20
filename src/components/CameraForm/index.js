import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

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
            <form onSubmit={event => this.handleSubmitForm(event)}>
              <h3>{!id ? 'Add new camera' : 'Edit camera'}</h3>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={event => this.handleChange(event)}
                  value={name}
                />
                {error.name && <label className="error">{error.name}</label>}
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  onChange={event => this.handleChange(event)}
                  value={description}
                />
                {error.description && (
                  <label className="error">{error.description}</label>
                )}
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  className="form-control"
                  onChange={event => this.handleChange(event)}
                  value={status}
                >
                  <option value="AC" selected>
                    Active
                  </option>
                  <option value="IN">Inactive</option>
                </select>
                {error.status && (
                  <label className="error">{error.status}</label>
                )}
              </div>

              <div className="form-group">
                <label>Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  className="form-control"
                  onChange={event => this.handleChange(event)}
                  value={latitude}
                />
                {error.latitude && (
                  <label className="error">{error.latitude}</label>
                )}
              </div>

              <div className="form-group">
                <label>Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  className="form-control"
                  onChange={event => this.handleChange(event)}
                  value={longitude}
                />
                {error.longitude && (
                  <label className="error">{error.longitude}</label>
                )}
              </div>

              <div className="form-group">
                <label>Ip Address</label>
                <input
                  type="text"
                  name="ip_address"
                  className="form-control"
                  onChange={event => this.handleChange(event)}
                  value={ip_address}
                />
                {error.ip_address && (
                  <label className="error">{error.ip_address}</label>
                )}
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withStore(CameraForm);
