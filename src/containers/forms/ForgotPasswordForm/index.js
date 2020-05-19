import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import GenericForm from '../../../components/forms/GenericForm';
import {
  djangoErrorResponseParser,
  withStore,
} from '../../../components/helpers';

class ForgotPasswordForm extends Component {
  state = {
    email: '',
    password: '',
    token: queryString.parse(this.props.location.search).token,
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

  async handleSubmitNoToken(event) {
    event.preventDefault();

    try {
      const {
        store: { authStore },
      } = this.props;

      await authStore.forgotPassword({ email: this.state.email });

      return this.props.history && this.props.history.push('/login');
    } catch (error) {
      console.log(djangoErrorResponseParser);
      return this.setState({
        error: djangoErrorResponseParser(error),
      });
    }
  }

  async handleSubmitWithToken(event) {
    event.preventDefault();

    try {
      const {
        store: { authStore },
      } = this.props;

      const { token, password } = this.state;

      await authStore.changePassword({ token, password });

      return this.props.history && this.props.history.push('/login');
    } catch (error) {
      return this.setState({
        error: djangoErrorResponseParser(error),
      });
    }
  }

  render() {
    const { token } = this.state;

    const fields = token
      ? [
          {
            name: 'password',
            type: 'password',
            label: 'Password',
          },
        ]
      : [
          {
            name: 'email',
            type: 'email',
            label: 'Email',
          },
        ];

    return (
      <GenericForm
        fields={fields}
        handleSubmitForm={event =>
          token
            ? this.handleSubmitWithToken(event)
            : this.handleSubmitNoToken(event)
        }
        handleChange={event => this.handleChange(event)}
        entity={this.state}
        title={token ? 'Enter new password' : 'Forgot Password'}
      />
    );
  }
}

export default withRouter(withStore(ForgotPasswordForm));
