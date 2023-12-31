import React from 'react'

import { tagType, thirdweb } from '../assets'
import { daysLeft } from '../utils'

const FundCard = ({ owner, title, description, category, target, deadline, amountCollected, image, handleClick }) => {

    const remainingDays = daysLeft(deadline)

    return (
        <div
            className='sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer'
            onClick={handleClick}
        >
            <img
                src={image}
                alt="fund"
                className='w-full h-[180px] object-cover rounded-t-[15px]'
            />
            <div
                className='flex flex-col p-4'
            >
                <div
                    className='flex flex-row items-center mb-[10px]'
                >
                    <img
                        src={tagType}
                        alt="tag"
                        className='w-[17px] h-[17px] object-contain'
                    />
                    <p
                        className='ml-[12px] mt-[2px] font-epilogue font-semibold text-[12px] text-[#909181]'
                    >{category}
                    </p>
                </div>
                <div
                    className='block'
                >
                    <h3
                        className='font-epilogue font-semibold text-[18px] text-white text-left leading-[22px] truncate'
                    >
                        {title}</h3>
                    <p
                        className='mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[15px] truncate'
                    >
                        {description}
                    </p>
                </div>
                <div
                    className='flex justify-between flex-wrap mt-[15px] gap-2'
                >
                    <div
                        className='flex flex-col'
                    >
                        <h4
                            className='font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'
                        >{amountCollected}
                        </h4>
                        <p
                            className='mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191]
                            sm:max-w-[120px] truncate'
                        >Recaudado de {target}</p>
                    </div>

                    <div
                        className='flex flex-col'
                    >
                        <h4
                            className='font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'
                        >{remainingDays}
                        </h4>
                        <p
                            className='mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191]
                            sm:max-w-[120px] truncate'
                        >Dias restantes</p>
                    </div>

                </div>

                <div
                    className='flex items-center mt-[20px] gap-[12px]'
                >
                    <div
                        className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#1c1c24] border-2 border-[#b2b3bd] border-solid'
                    >
                        <img
                            src={thirdweb}
                            alt="user"
                            className='w-1/2 h-1/2 object-contain rounded-full'
                        />
                    </div>
                    <p
                        className='flex-1 font-epilogue font-normal text-[12px] text-[#808191] leading-[18px] truncate'
                    >
                        Por <span className='text-[#b2b3bd]'>{owner}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default FundCard