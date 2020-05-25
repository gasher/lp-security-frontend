import React, { Component } from 'react';

import GenericForm from '../../../components/forms/GenericForm';
import {
  djangoErrorResponseParser,
  withStore,
} from '../../../components/helpers';

const fields = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    tooltip:
      'Give a name suggestive name to the camera so it will recognize it later.',
  },
  {
    name: 'description',
    type: 'text',
    label: 'Description',
    tooltip:
      'Give a name suggestive name to the camera so it will recognize it later.',
  },
  {
    name: 'latitude',
    type: 'text',
    label: 'Latitude',
    tooltip: "Enter the latitude of camera's location.",
  },
  {
    name: 'longitude',
    type: 'text',
    label: 'Longitude',
    tooltip: "Enter the longitude of camera's location.",
  },
  {
    name: 'status',
    type: 'select',
    label: 'Status',
    options: [
      {
        value: 'AC',
        label: 'Active',
        selected: true,
      },
      {
        value: 'IN',
        label: 'Inactive',
        selected: false,
      },
    ],
    tooltip: 'Select if this camera is active or inactive.',
  },
  {
    name: 'ip_address',
    type: 'text',
    label: 'Ip address',
    tooltip:
      "Enter the ip address of the camera. Don't forget the port if the camera is set-up using port-forwarding and the credentials if needed.",
  },
];

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
        closeModal,
      } = this.props;

      if (this.state.id) {
        await cameraStore.update(this.state);
        return closeModal();
      }

      await cameraStore.add(this.state);

      return this.props.history && this.props.history.push('/cameras');
    } catch (error) {
      return this.setState({
        error: djangoErrorResponseParser(error),
      });
    }
  }

  render() {
    return (
      <GenericForm
        fields={fields}
        handleSubmitForm={event => this.handleSubmitForm(event)}
        handleChange={event => this.handleChange(event)}
        entity={this.state}
      />
    );
  }
}

export default withStore(CameraForm);
