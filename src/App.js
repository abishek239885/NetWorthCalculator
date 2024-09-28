import React, { useState } from 'react';
import AddAssetModal from './components/AddAssetModal';
import AddLiabilityModal from './components/AddLiabilityModal';
import { Container, Stack, Button, Row, Col } from 'react-bootstrap';
import { useNetWorth } from './context/NetWorthContext';
import AssetLiabilityCard from './components/AssetLiabilityCard';
import NetWorthCard from './components/NetWorthCard';

function getGroup(group1, group2) {
    if ((group1 == null || group1.length == 0) && (group2 == null || group2.length == 0))
        return <></>
    let nameArr = []
    for (let i = 0, j = 0; i < group1.length || j < group2.length; i++, j++) {

        const tag = <div className="d-flex flex-wrap">
            {i < group1.length && <div className="me-auto p-2"><AssetLiabilityCard groupName={group1[i].name} groupAmount={group1[i].amount} groupID={group1[i].id} isAsset={true} /> </div>}
            {j < group2.length && <div className="p-2"><AssetLiabilityCard groupName={group2[i].name} groupAmount={group2[i].amount} groupID={group2[i].id} isAsset={false} /></div>}
        </div>;
        nameArr.push(tag)
    }
    return nameArr;
}

function App() {

    const [openAssetModal, setOpenAssetModal] = useState(false);
    const [openLiablityModal, setOpenLiablityModal] = useState(false);
    const { assetGroup, liabilityGroup } = useNetWorth()
   
    return (
        <React.Fragment>
            <Container className="my-4">
                <Stack direction="horizontal" gap="2" className="mb-4">
                    <h1 className="me-auto text-nowrap"> Calculate Net Worth </h1>
                    <Button onClick={() => setOpenAssetModal(true)} variant="primary">Asset Group</Button>
                    <Button onClick={() => setOpenLiablityModal(true)} variant="danger">Liability Group</Button>
                </Stack>

                <Stack direction="vertical" gap={5}>
                {
                    getGroup(assetGroup, liabilityGroup)
                }

                <NetWorthCard />
                </Stack>
            </Container>
            <AddAssetModal show={openAssetModal} handleClose={() => setOpenAssetModal(false)} isGroup={true} />
            <AddLiabilityModal show={openLiablityModal} handleClose={() => setOpenLiablityModal(false)} isGroup={true} />
        </React.Fragment>)
}

export default App;