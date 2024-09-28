import React, { useRef } from 'react';
import { useNetWorth } from '../context/NetWorthContext';
import { Form, Modal, Button } from 'react-bootstrap';

function AddLiabilityModal({ show, handleClose, isGroup, groupID }) {

    const liabilityNameRef = useRef();
    const liabilityAmountRef = useRef();

    const { addLiablitesGroup, addLiabilities } = useNetWorth();


    function groupHandleSubmit() {
        let liabilityName = liabilityNameRef.current.value;
        addLiablitesGroup({
            name: liabilityName,
        })
        handleClose();
    }

    function handleSubmit() {
        let name = liabilityNameRef.current.value;
        let amount = liabilityAmountRef.current.value;
       
        addLiabilities({
            id: groupID,
            name: name,
            amount: amount
        })
        handleClose();
    }

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                <Form >
                    <Modal.Header closeButton>
                        <Modal.Title>New Liablity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control ref={liabilityNameRef} type="text" required />
                        </Form.Group >
                        {!isGroup &&
                            <Form.Group className="mb-3" controlId="amount">
                                <Form.Label>Amount</Form.Label>
                            <Form.Control ref={liabilityAmountRef} type="number" required />
                            </Form.Group >
                        }
                        <div className="d-flex justify-content-end">
                            <Button onClick={isGroup ? groupHandleSubmit : handleSubmit} type="submit" variant="primary">Add</Button>
                        </div>
                    </Modal.Body>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

export default AddLiabilityModal;