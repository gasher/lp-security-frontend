import React from 'react';
import { Redirect } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ has_error: true });
  }

  render() {
    if (this.state.hasError) {
      return <Redirect to="/internal-error" />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
