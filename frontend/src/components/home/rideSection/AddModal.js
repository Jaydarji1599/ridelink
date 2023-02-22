import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRide } from '../../../actions/rides';

export default function AddModal({show, close}) {
    return (
        <>
            <Modal
                show={show}
                onHide={close}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Add your Trip!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="gap-3">
                    <Form className="gap-3">
                        <Form.Group>
                            <Form.Label>Source</Form.Label>
                            <Form.Control as="select">
                                <option>HALIFAX</option>
                                <option>ANTIGONISH</option>
                                <option>SYDNEY</option>
                                <option>MONCTION</option>
                                <option>TRURO</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Destination</Form.Label>
                            <Form.Control as="select">
                                <option>HALIFAX</option>
                                <option>ANTIGONISH</option>
                                <option>SYDNEY</option>
                                <option>MONCTION</option>
                                <option>TRURO</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="time" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={close}>
                    Post
                </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}