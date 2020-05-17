import React, { Component } from 'react';

import GenericForm from '../../../components/forms/GenericForm';
import {
  djangoErrorResponseParser,
  withStore,
} from '../../../components/helpers';

const fields = [
  {
    name: 'licensePlate',
    type: 'text',
    label: 'License Plate',
  },
];

class RoutineForm extends Component {
  state = {
    cameraId: this.props.cameraId || null,
    licensePlate: this.props.licensePlate || '',
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

      await cameraStore.executeRoutines({
        cameraId: this.state.cameraId,
        license_plate: this.state.licensePlate,
      });

      return closeModal();
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

export default withStore(RoutineForm);
