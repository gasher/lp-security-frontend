import React, { useState } from 'react';
import { Col, Card, Modal, Button } from 'react-bootstrap';

import './styles.css';
import CameraForm from '../CameraForm';
import Map from '../Map';
import VideoFeed from '../VideoFeed';

const Camera = ({ id, title, description, latitude, longitude, status }) => {
  const [showMap, setShowMap] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showFeed, setShowFeed] = useState(false);

  const handleCloseMap = () => setShowMap(false);
  const handleShowMap = () => setShowMap(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseFeed = () => setShowFeed(false);
  const handleShowFeed = () => setShowFeed(true);

  return (
    <Col xs="4">
      <Card className="text-center camera">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className={`status-${status}`}>{status}</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Button variant="secondary" onClick={handleShowMap}>
            Show map
          </Button>{' '}
          <Button variant="primary" onClick={handleShowEdit}>
            Manage camera
          </Button>{' '}
          <Button variant="info" onClick={handleShowFeed}>
            Show video feed
          </Button>{' '}
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
      <Modal show={showFeed} onHide={handleCloseFeed}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <VideoFeed
            {...{ id, title, description, latitude, longitude, status }}
          />
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default Camera;
