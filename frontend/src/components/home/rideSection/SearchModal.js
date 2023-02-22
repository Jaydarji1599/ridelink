import { Modal, Button } from 'react-bootstrap';

export default function SearchModal({show, close}) {
    return (
        <>
            <Modal
                show={show}
                onHide={close}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Search Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                IExample data
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={close}>
                    Search
                </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}