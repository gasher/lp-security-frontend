import React, { useState } from 'react';
import { Col, Card, Modal, Button } from 'react-bootstrap';

import './styles.css';
import CameraForm from '../CameraForm';
import Map from '../Map';

const Camera = ({ id, title, description, latitude, longitude, status }) => {
  const [showMap, setShowMap] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseMap = () => setShowMap(false);
  const handleShowMap = () => setShowMap(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  return (
    <Col xs="4">
      <Card className="text-center camera">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className={`status-${status}`}>{status}</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Button variant="secondary" onClick={handleShowMap}>
            Show map
          </Button>
          <Button variant="primary" onClick={handleShowEdit}>
            Manage camera
          </Button>
        </Card.Body>
      </Card>
      <Modal show={showMap} onHide={handleCloseMap}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Map {...{ longitude, latitude }} />
        </Modal.Body>
      </Modal>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CameraForm
            {...{ id, title, description, latitude, longitude, status }}
          />
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default Camera;
