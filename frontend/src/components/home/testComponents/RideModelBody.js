import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function RideModalBody() {
  return (
    <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formSourceSelect">
                <Form.Label>Source:</Form.Label>
                <div />
                <Form.Control as="select">
                    <option>Select a Source...</option>
                    <option value="1">Halifax</option>
                    <option value="2">Truro</option>
                    <option value="3">New Glasgow</option>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDestinationSelect">
                <Form.Label>Destination:</Form.Label>
                <div />
                <Form.Control as="select">
                    <option>Select a Destination...</option>
                    <option value="1">Halifax</option>
                    <option value="2">Truro</option>
                    <option value="3">New Glasgow</option>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
                ROW TAG
                    COL TAG
                        <Form.Label>START DATE?:</Form.Label>
                        <Form.Control type="date"/>
                    /COL TAG
                    COL TAG
                        <Form.Label>END DATE?:</Form.Label>
                        <Form.Control type="date"/>
                    /COL TAG
            </Form.Group>

            ----- BELOW IS FOR REFFERENCE ONLY!!! -----
            <p />
            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
    </Modal.Body>
  );
}

export default RideModalBody;