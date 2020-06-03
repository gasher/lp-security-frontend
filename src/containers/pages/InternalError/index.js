import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import InternalErrorComponent from '../../../components/InternalError';

class InternalError extends Component {
  state = {
    hasError: true,
  };
  handleClick() {
    return this.setState({
      hasError: false,
    });
  }

  render() {
    const { hasError } = this.state;
    if (!hasError) {
      return <Redirect to="/" />;
    }

    return <InternalErrorComponent handleClick={() => this.handleClick()} />;
  }
}

export default InternalError;
