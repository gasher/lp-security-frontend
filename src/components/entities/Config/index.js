import React, { useState } from 'react';
import { Col, Card, Button } from 'react-bootstrap';

import './styles.css';
import ModalComponent from '../Modal';

const Config = ({ id, name, routine, camera, ConfigForm }) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  return (
    <Col xs="4">
      <Card className="text-center config">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Button variant="primary" onClick={handleShowEdit}>
            Manage Config
          </Button>{' '}
        </Card.Body>
      </Card>
      <ModalComponent
        show={showEdit}
        handleClose={handleCloseEdit}
        title={name}
        BodyComponent={
          <ConfigForm
            {...{
              id,
              name,
              routine,
              camera,
            }}
          />
        }
      />
    </Col>
  );
};

export default Config;
