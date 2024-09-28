import  currencyFormatter  from '../utilities/utils';
import React, { useState } from 'react';
import AddAssetModal from './AddAssetModal';
import AddLiabilityModal from './AddLiabilityModal';
import ViewModal from './ViewModal';
import { Card, Stack, Button } from 'react-bootstrap';

function AssetLiabilityCard({ groupName, groupAmount, groupID, isAsset }) {

    const [openAssetModal, setOpenAssetModal] = useState(false);
    const [openLiablityModal, setOpenLiablityModal] = useState(false);
    const [openViewModal, setViewModal] = useState(false);

    const buttonName = isAsset ? "Asset" : "Liability";
    const classNames = []
    if (isAsset) {
        classNames.push("bg-light")
    }
    else {
        classNames.push("bg-danger", "bg-opacity-10")
    }

    return (
        <React.Fragment>
            <Card className={classNames.join(" ")} style={{ width: '24rem' }}>
                <Card.Body>
                    <Card.Title className="d-flex">
                        <span className="me-auto p-1">{groupName}</span>
                        <span className="p-1">{currencyFormatter.format(groupAmount)}</span>
                    </Card.Title>
                    <Stack direction="horizontal" gap="2" className="mt-4">
                        <Button variant="outline-primary" className="ms-auto" onClick={() => { isAsset ? setOpenAssetModal(true) : setOpenLiablityModal(true) }}> Add {buttonName}</Button>
                        <Button variant="outline-secondary" onClick={() => { setViewModal(true) }}> View {buttonName}</Button>
                    </Stack>
                </Card.Body>
            </Card>

            <AddAssetModal show={openAssetModal} handleClose={() => setOpenAssetModal(false)} isGroup={false} groupID={groupID} />
            <AddLiabilityModal show={openLiablityModal} handleClose={() => setOpenLiablityModal(false)} isGroup={false} groupID={groupID} />
            <ViewModal show={openViewModal} handleClose={() => setViewModal(false)} groupID={groupID} isAsset={isAsset} />
        </React.Fragment>
        );
}


export default AssetLiabilityCard;