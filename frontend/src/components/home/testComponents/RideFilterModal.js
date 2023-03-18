import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import Form from 'react-bootstrap/Form';
import RideModalBody from './RideModelBody';

function RideFilterModal() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Ride Filter Modal
      </Button>

      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ride Search</Modal.Title>
          </Modal.Header>

          <RideModalBody />

          <Modal.Footer>
            <Button variant="secondary">DELETE THIS BUTTON</Button>
            <Button variant="primary">Search</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default RideFilterModal;