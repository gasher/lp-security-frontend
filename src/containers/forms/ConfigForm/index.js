import React, { Component } from 'react';

import GenericForm from '../../../components/forms/GenericForm';
import {
  djangoErrorResponseParser,
  withStore,
} from '../../../components/helpers';

const fields = (cameras, routines) => [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
  },
  {
    name: 'routine',
    type: 'select',
    label: 'Routine',
    options: routines.map(routine => ({
      value: routine.id,
      label: routine.name,
    })),
  },
  {
    name: 'camera',
    type: 'select',
    label: 'Camera',
    options: cameras.map(camera => ({
      value: camera.id,
      label: camera.name,
    })),
  },
];

class ConfigForm extends Component {
  state = {
    id: this.props.id || null,
    name: this.props.name || '',
    camera: this.props.camera || '',
    routine: this.props.routine || '',
    cameras: [],
    routines: [],
    error: {},
  };

  async componentDidMount() {
    const {
      store: { cameraStore, routineStore },
    } = this.props;
    const cameras = await cameraStore.getAll();
    const routines = await routineStore.getAll();

    if (cameras.length > 0) {
      this.setState({
        camera: cameras[0].id,
      });
    }

    if (routines.length > 0) {
      this.setState({
        routine: routines[0].id,
      });
    }

    return this.setState({
      cameras,
      routines,
    });
  }

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
        store: { configStore },
        closeModal,
      } = this.props;

      if (this.state.id) {
        await configStore.update({
          id: this.state.id,
          name: this.state.name,
          camera: this.state.camera,
          routine: this.state.routine,
        });

        return closeModal();
      }

      await configStore.add({
        name: this.state.name,
        camera: this.state.camera,
        routine: this.state.routine,
      });

      return this.props.history && this.props.history.push('/configs');
    } catch (error) {
      return this.setState({
        error: djangoErrorResponseParser(error),
      });
    }
  }

  render() {
    return (
      <GenericForm
        fields={fields(this.state.cameras, this.state.routines)}
        handleSubmitForm={event => this.handleSubmitForm(event)}
        handleChange={event => this.handleChange(event)}
        entity={this.state}
      />
    );
  }
}

export default withStore(ConfigForm);
