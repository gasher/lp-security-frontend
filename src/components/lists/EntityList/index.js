import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';

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
