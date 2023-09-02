import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x05B16302012341Ea15c396B22fAF1C9B64A305c2')
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign')

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {

        try {
            const data = await createCampaign({
                args: [
                    address, // dueño de la campaña
                    form.title, // titulo de la campaña
                    form.description, // descripcion de la campaña
                    form.target, // meta de la campaña
                    new Date(form.deadline).getTime(), // fecha de finalizacion de la campaña
                    form.image,
                ]// args de la funcion createCampaign
            })

            console.log("Llamada a la funcion createCampaign realizada con exito", data)

        } catch (error) {
            console.log("Llamada a la funcion createCampaign fallida", error)
        }


    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns')

        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
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
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }))

        return parsedFilteredCampaigns
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                getCampaigns,
                getUserCampaigns,
                createCampaign: publishCampaign,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);