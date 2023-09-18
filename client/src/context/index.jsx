import React, { useContext, createContext, useState } from 'react';
import { useAddress, useContract, useMetamask, useDisconnect, useContractWrite } from '@thirdweb-dev/react';
import { BigNumber, ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0xf814cFd5947b1a063fCA374293ED0a0b156eC58f')
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign')
    const [searchTextBox, setSearchTextBox] = useState('')
    const [campaigns, setCampaigns] = useState([])
    const [filterCampaign, setFilterCampaign] = useState(true)
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false)

    const address = useAddress();
    const connect = useMetamask();
    const disconnect = useDisconnect();

    const publishCampaign = async (form) => {

        try {
            const data = await createCampaign({
                args: [
                    address, // dueño de la campaña
                    form.title, // titulo de la campaña
                    form.description, // descripcion de la campaña
                    form.category,
                    form.target, // meta de la campaña
                    new Date(form.deadline).getTime(), // fecha de finalizacion de la campaña
                    form.image,
                ]// args de la funcion createCampaign
            })

            setOpenSuccessAlert(true)

            console.log("Llamada a la funcion createCampaign realizada con exito", data)

        } catch (error) {
            console.log("Llamada a la funcion createCampaign fallida", error)
        }


    }

    const getFilteredCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns')

        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            category: campaign.category,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }))

        // filtrar por titulo

        const filteredCampaigns = parsedCampaigns.filter((campaign) => campaign.title.toLowerCase().includes(searchTextBox.toLowerCase()))

        return filteredCampaigns
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns')

        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            category: campaign.category,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }))
        return parsedCampaigns
    }

    const getUserCampaigns = async () => {
        const Allcampaigns = await contract.call('getCampaigns')

        const filteredCampaigns = Allcampaigns.filter((campaign) => campaign.owner === address)

        const parsedFilteredCampaigns = filteredCampaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            category: campaign.category,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }))

        return parsedFilteredCampaigns
    }

    const donate = async (pId, amount) => {
        const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount) })
        return data
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', [pId])

        const numberOfDonations = donations[0].length

        const parsedDonations = []

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                amount: ethers.utils.formatEther(donations[1][i].toString()),
            })
        }

        return parsedDonations
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                disconnect,
                getCampaigns,
                getUserCampaigns,
                createCampaign: publishCampaign,
                donate,
                getDonations,
                getFilteredCampaigns,
                setSearchTextBox,
                searchTextBox,
                campaigns,
                setCampaigns,
                filterCampaign,
                setFilterCampaign,
                openSuccessAlert,
                setOpenSuccessAlert,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);