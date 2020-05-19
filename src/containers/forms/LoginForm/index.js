import React, { Component } from 'react';

import GenericForm from '../../../components/forms/GenericForm';
import {
  djangoErrorResponseParser,
  withStore,
} from '../../../components/helpers';

const fields = [
  {
    name: 'username',
    type: 'text',
    label: 'Username',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
  },
];

class RoutineForm extends Component {
  state = {
    username: '',
    password: '',
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
    const { store } = this.props;

    try {
      await store.authStore.login(this.state);

      return this.props.history.push('/');
    } catch (error) {
      this.setState({
        error: djangoErrorResponseParser(error),
      });

      return setTimeout(() => this.setState({ error: {} }), 1000);
    }
  }

  render() {
    return (
      <GenericForm
        fields={fields}
        handleSubmitForm={event => this.handleSubmitForm(event)}
        handleChange={event => this.handleChange(event)}
        entity={this.state}
        isLoginForm
      />
    );
  }
}

export default withStore(RoutineForm);
