import React, { useState } from 'react';
import { Col, Card, Button } from 'react-bootstrap';

import './styles.css';
import ModalComponent from '../Modal';

const Routine = ({ id, name, file, RoutineForm }) => {
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
      <ModalComponent
        show={showEdit}
        handleClose={handleCloseEdit}
        title={name}
        BodyComponent={
          <RoutineForm
            {...{
              id,
              name,
              file,
              closeModal: () => handleCloseEdit(),
            }}
          />
        }
      />
    </Col>
  );
};

export default Routine;
