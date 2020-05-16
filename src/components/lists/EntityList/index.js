import React from 'react';
import { Container, Button } from 'react-bootstrap';

import './styles.css';

const EntityList = props => {
  return (
    <Container>
      {props.addHref && (
        <Button className="add-button" href={props.addHref}>
          Add new
        </Button>
      )}
      {props.entities}
    </Container>
  );
};

export default EntityList;
