import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const NetWorthContext = React.createContext();


export function useNetWorth() {
    return useContext(NetWorthContext);
}

export const NetWorthProvider = ({ children }) => {
    const [assetGroup, setAssetGroup] = useLocalStorage("assets", [])
    const [liabilityGroup, setLiabilityGroup] = useLocalStorage("liablities", []);

    
    function addLiablitesGroup({ name }) {
        setLiabilityGroup(prevLiablityGroup => {
            if (prevLiablityGroup.find(liabilityGroup => liabilityGroup.name == name))
                return prevLiablityGroup;
            return [...prevLiablityGroup, { id: Math.floor(Math.random() * 100), name: name, amount: 0, value: [] }]
        })
    }

    function addAssetsGroup({ name }) {
        setAssetGroup(prevAssetGroup => {
            if (prevAssetGroup.find(assetGroup => assetGroup.name == name))
                return prevAssetGroup;
            return [...prevAssetGroup, { id: Math.floor(Math.random() * 100), name: name, amount: 0, value: [] }]
        })
    }

    function deleteAssetsGroup({ id }) {
        const tempGroup = []
        for (let index in assetGroup) {
            if (assetGroup[index].id == id)
                continue
            tempGroup.push(assetGroup[index])
        }
        setAssetGroup(tempGroup)
    }

    function deleteLiabilitiesGroup({ id }) {
        debugger;
        const tempGroup = []
        for (let index in liabilityGroup) {
            if (liabilityGroup[index].id == id)
                continue
            tempGroup.push(liabilityGroup[index])
        }
        setLiabilityGroup(tempGroup)
    }

    function addAssets({ id, name, amount }) {
        debugger;
        const group = assetGroup.find((asset) => asset.id == id);
        if (group.value.find((assetName) => assetName.name == name))
            return;
        else {
            const tempGroup = []
            for (let index in assetGroup) {
                if (assetGroup[index].id == id) {
                    const tempValue = {
                        name: name,
                        amount: amount
                    }
                    assetGroup[index].amount = Number.parseInt(assetGroup[index].amount) + Number.parseInt(amount);
                    assetGroup[index].value.push(tempValue);
                    
                }
                tempGroup.push(assetGroup[index]);
            }

          
            setAssetGroup(tempGroup);
        }
    }

    function deleteAssets({ id, name }) {
        debugger;
        const tempGroup = []
        for (let index in assetGroup) {
            if (assetGroup[index].id == id) {

                const value = assetGroup[index].value.filter((assetName) => assetName.name == name);
                const result = Number.parseInt(assetGroup[index].amount) - Number.parseInt(value[0].amount);

                assetGroup[index].amount = isNaN(result) ? 0 : result;
                assetGroup[index].value = assetGroup[index].value.filter((assetName) => assetName.name != name);
            }
            tempGroup.push(assetGroup[index])
        }
        setAssetGroup(tempGroup)
    }
    function addLiabilities({ id, name, amount }) {
        const group = liabilityGroup.find((liability) => liability.id == id);
        if (group.value.find((liabilityName) => liabilityName.name == name))
            return;
        else {
            const tempGroup = []
            for (let index in liabilityGroup) {
                if (liabilityGroup[index].id == id) {
                    const tempValue = {
                        name: name,
                        amount: amount,
                    }
                    liabilityGroup[index].amount = Number.parseInt(liabilityGroup[index].amount) + Number.parseInt(amount);
                    liabilityGroup[index].value.push(tempValue);
                }
                tempGroup.push(liabilityGroup[index]);
            }
            setLiabilityGroup(tempGroup);
        }
    }

    function deleteLiabilities({ id, name }) {
        const tempGroup = []
        for (let index in liabilityGroup) {
            if (liabilityGroup[index].id == id) {
                
                const value = liabilityGroup[index].value.filter((liabilityName) => liabilityName.name == name);
                const result = Number.parseInt(liabilityGroup[index].amount) - Number.parseInt(value[0].amount)

                debugger;
                liabilityGroup[index].amount = isNaN(result) ? 0 : result;
                liabilityGroup[index].value = liabilityGroup[index].value.filter((liabilityName) => liabilityName.name != name);
            }
            tempGroup.push(liabilityGroup[index])
        }
        setLiabilityGroup(tempGroup)
    }

    return (
        <NetWorthContext.Provider value={{
            assetGroup,
            liabilityGroup,
            addAssetsGroup,
            addLiablitesGroup,
            addAssets,
            addLiabilities,
            deleteAssetsGroup,
            deleteLiabilitiesGroup,
            deleteAssets,
            deleteLiabilities
        }}>{children}</NetWorthContext.Provider>
        )
}

export default { NetWorthProvider, useNetWorth };