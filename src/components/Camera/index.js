import React, { useState } from 'react';
import { Col, Card, Modal, Button } from 'react-bootstrap';

import './styles.css';
import Map from '../Map';

const Camera = ({ title, description, latitude, longitude, status }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Col xs="4">
      <Card className="text-center camera">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className={`status-${status}`}>{status}</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Button variant="secondary" onClick={handleShow}>
            Show map
          </Button>
          <Button variant="primary" href="/">
            Manage camera
          </Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Map {...{ longitude, latitude }} />
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default Camera;
