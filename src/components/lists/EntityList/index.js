import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';

const EntityList = props => {
  return (
    <Container>
      <Button href={props.addHref}>Add new</Button>
      <Row>{props.entities}</Row>
    </Container>
  );
};

export default EntityList;
