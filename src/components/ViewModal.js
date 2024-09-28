import  currencyFormatter  from '../utilities/utils';
import React from 'react';
import { Modal, Button, Stack } from 'react-bootstrap';
import { useNetWorth } from '../context/NetWorthContext';

function ViewModal({ show, handleClose, groupID, isAsset }) {

    const { assetGroup, liabilityGroup, deleteAssetsGroup, deleteLiabilitiesGroup, deleteAssets, deleteLiabilities } = useNetWorth()
    const items = isAsset ? assetGroup.find((asset) => asset.id == groupID) : liabilityGroup.find((liability) => liability.id == groupID)
   
    function handleAssetsGroup() {
        deleteAssetsGroup({ id : groupID })
        handleClose();
    }

    function handleLiabilitiesGroup() {

        deleteLiabilitiesGroup({ id: groupID })
        handleClose();
    }

    function handleAssets(name) {
        
        deleteAssets({ id: groupID, name: name })
        handleClose();
    }

    function handleLiabilities(name) {
        
        deleteLiabilities({ id : groupID, name: name })
        handleClose();
    }

    function getItems()
    {
        if (items.value == null || items.value.length == 0)
            return

        const resultTag = []
        for (let item in items.value) {
            const tag = <div className="d-flex">
                <div className="me-auto fs-4">{items.value[item].name}</div>
                <div className="me-3 fs-5">{currencyFormatter.format(items.value[item].amount)} </div>
                <Button onClick={isAsset ? handleAssets.bind(this, items.value[item].name) : handleLiabilities.bind(this, items.value[item].name)} size="sm" variant="outline-danger">Delete</Button>
            </div>

            resultTag.push(tag);
        }

        return resultTag;
    }

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Stack direction="horizontal" gap="2">
                            <div> {items.name} </div>
                            <Button onClick={isAsset ? handleAssetsGroup : handleLiabilitiesGroup} variant="outline-danger"> Delete </Button>
                            </Stack>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Stack direction="vertical" gap="3">
                        {getItems()}
                        </Stack>
                    </Modal.Body>
            </Modal>
        </React.Fragment>

        );
}


export default ViewModal;