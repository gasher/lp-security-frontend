import React, { Component } from 'react';

import './styles.css';
import { withStore } from '../helpers';

class CameraForm extends Component {
  state = {
    id: this.props.id || null,
    name: this.props.name || '',
    description: this.props.description || '',
    longitude: this.props.longitude || '',
    latitude: this.props.latitude || '',
    status: this.props.status || '',
    ip_address: this.props.ip_address || '',
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
    const {
      store: { cameraStore },
    } = this.props;
    console.log(this.state);

    if (this.state.id) {
      return cameraStore.update(this.state);
    }

    return cameraStore.add(this.state);
  }

  render() {
    const { id, name, description, latitude, longitude, status } = this.state;

    return (
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
            </div>

            <div className="form-group">
              <label>Status</label>
              <input
                type="text"
                name="status"
                className="form-control"
                onChange={event => this.handleChange(event)}
                value={status}
              />
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
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withStore(CameraForm);
