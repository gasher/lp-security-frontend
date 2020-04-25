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
    name: 'file',
    type: 'text',
    label: 'File',
  },
];

class RoutineForm extends Component {
  state = {
    id: this.props.id || null,
    name: this.props.name || '',
    file: this.props.file || '',
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
