import React, { useState } from 'react';
import { Col, Card, Modal, Button } from 'react-bootstrap';

import './styles.css';
import RoutineForm from '../RoutineForm';

const Routine = ({ id, name }) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  return (
    <Col xs="4">
      <Card className="text-center routine">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Button variant="primary" onClick={handleShowEdit}>
            Manage Routine
          </Button>{' '}
        </Card.Body>
      </Card>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <RoutineForm
            {...{
              id,
              name,
            }}
          />
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default Routine;
