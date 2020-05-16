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
  },
  {
    name: 'description',
    type: 'text',
    label: 'Description',
  },
  {
    name: 'latitude',
    type: 'text',
    label: 'Latitude',
  },
  {
    name: 'longitude',
    type: 'text',
    label: 'Longitude',
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
  },
  {
    name: 'ip_address',
    type: 'text',
    label: 'Ip address',
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
      } = this.props;

      if (this.state.id) {
        await cameraStore.update(this.state);
      } else {
        await cameraStore.add(this.state);
      }

      return this.props.history && this.props.history.push('/cameras');
    } catch (error) {
      console.log(error);
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
