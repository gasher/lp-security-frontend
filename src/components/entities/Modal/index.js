import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalComponent = props => {
  const { show, handleClose, title, BodyComponent } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{BodyComponent}</Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
