import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

const InternalError = props => {
  const { handleClick } = props;
  return (
    <Jumbotron>
      <h1>Something went wrong!</h1>
      <p>
        <Button variant="primary" onClick={handleClick}>
          Go to dashboard
        </Button>{' '}
      </p>
    </Jumbotron>
  );
};

export default InternalError;
