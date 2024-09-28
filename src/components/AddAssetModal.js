import React, { useRef } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useNetWorth } from '../context/NetWorthContext';

function AddAssetModal({ show, handleClose, isGroup, groupID }) {

    const assetNameRef = useRef();
    const assetAmountRef = useRef();
    const { addAssetsGroup, addAssets } = useNetWorth();

    function groupHandleSubmit() {

        let assetName = assetNameRef.current.value;
        addAssetsGroup({
            name: assetName,
        })
        handleClose();
    }

    function handleSubmit() {
        let assetName = assetNameRef.current.value;
        let assetAmount = assetAmountRef.current.value;

        addAssets({
            id: groupID,
            name: assetName,
            amount: assetAmount
        })
        handleClose();
    }

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                <Form >
                    <Modal.Header closeButton>
                        <Modal.Title>New Asset</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control ref={assetNameRef} type="text" required />
                        </Form.Group >
                        {!isGroup &&
                            <Form.Group className="mb-3" controlId="amount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control ref={assetAmountRef} type="number" required />
                            </Form.Group >
                        }
                        <div className="d-flex justify-content-end">
                            <Button onClick={isGroup? groupHandleSubmit : handleSubmit} type="submit" variant="primary">Add</Button>
                        </div>
                    </Modal.Body>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

export default AddAssetModal;