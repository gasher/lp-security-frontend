import React from 'react';
import { Col, Card } from 'react-bootstrap';
import moment from 'moment';

import './styles.css';

const Trigger = ({ id, license_plate, routine, camera, triggered_at }) => {
  return (
    <Col xs="4">
      <Card className="text-center trigger">
        <Card.Body>
          <Card.Title>{license_plate}</Card.Title>
          <Card.Text>
            {`Camera ${camera} triggered routine ${routine} at ${moment(
              triggered_at
            ).format('MM/DD/YYYY')}`}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Trigger;
