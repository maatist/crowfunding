import React from 'react'
import { useNavigate } from 'react-router-dom'

import FundCard from './FundCard'
import { loader } from '../assets'
import { daysLeft } from '../utils'



const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
    const navigate = useNavigate()

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign })
    }

    let myActiveCampaignsLength = 0;
    let myFinishedCampaignsLength = 0;
    for (let index = 0; index < campaigns.length; index++) {
        (daysLeft(campaigns[index].deadline) > 0) ? myActiveCampaignsLength++ : myFinishedCampaignsLength++
    }

    let myCampaignsScreen = false
    if (title.includes("Mis")) myCampaignsScreen = true

    return (
        <div

        >
            <h1
                className='font-epilogue font-semibold text-[18px] text-white text-left'
            >
                {title} Activas ({myActiveCampaignsLength})
            </h1>

            <div
                className='flex flex-wrap mt-[20px] gap-[26px]'
            >
                {isLoading && (
                    <img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain' />
                )}
                {!isLoading && campaigns.length === 0 && (
                    <p
                        className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'
                    >No existe ninguna campaña aun
                    </p>
                )}

                {!isLoading && campaigns.length > 0 &&
                    campaigns.map((campaign) => (
                        (parseInt(daysLeft(campaign.deadline)) > 0) &&
                        <FundCard
                            key={campaign.pId}
                            {...campaign}
                            handleClick={() => handleNavigate(campaign)}
                        />)
                    )
                }

            </div>


            {myFinishedCampaignsLength > 0 && myCampaignsScreen &&
                (

                    <div>
                        {/* Campañas finalizadas */}

                        <h1
                            className='font-epilogue font-semibold text-[18px] text-white text-left'
                        >
                            {title} finalizadas ({myFinishedCampaignsLength})
                        </h1>

                        <div
                            className='flex flex-wrap mt-[20px] gap-[26px]'
                        >
                            {isLoading && (
                                <img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain' />
                            )}
                            {!isLoading && campaigns.length === 0 && (
                                <p
                                    className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'
                                >No existe ninguna campaña aun
                                </p>
                            )}

                            {!isLoading && campaigns.length > 0 &&
                                campaigns.map((campaign) => (
                                    (parseInt(daysLeft(campaign.deadline)) <= 0) &&
                                    <FundCard
                                        key={campaign.pId}
                                        {...campaign}
                                        handleClick={() => handleNavigate(campaign)}
                                    />)
                                )
                            }

                        </div>
                    </div>

                )
            }



        </div>
    )
}

export default DisplayCampaigns