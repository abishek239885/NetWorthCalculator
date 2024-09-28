import React from 'react';
import { useNetWorth } from '../context/NetWorthContext';
import { Card, ProgressBar } from 'react-bootstrap';
import currencyFormatter from '../utilities/utils';

function NetWorthCard() {

    const { assetGroup, liabilityGroup } = useNetWorth()
    let assetAmount = 0, liabilityAmount = 0
    for (let asset in assetGroup) {
        assetAmount += Number.parseInt(assetGroup[asset].amount);
    }
    for (let liability in liabilityGroup) {
        liabilityAmount += Number.parseInt(liabilityGroup[liability].amount);
    }
    let totalAmount = assetAmount + liabilityAmount;
    let totalNetWorth = assetAmount - liabilityAmount;
    return (
        <React.Fragment>
            <Card style={{ width: '24rem' }}>
                <Card.Body>
                    <Card.Title className="d-flex">
                        <span className="me-auto p-1">Total Net Worth</span>
                        <span className="p-1">{currencyFormatter.format(totalNetWorth)}</span>
                    </Card.Title>
                    {totalAmount != 0 && <ProgressBar className="rounded-pill" variant={getProgressBarVariant(liabilityAmount, assetAmount)} max={Math.abs(totalAmount)} now={Math.abs(totalNetWorth)} min={0} />}
                </Card.Body>
            </Card>
        </React.Fragment>
        )

}
function getProgressBarVariant(liabilityAmount, assetAmount) {
    if (liabilityAmount < assetAmount) return "primary";
    if (liabilityAmount == assetAmount) return "warning";
    return "danger";
}

export default NetWorthCard;