import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import Popup from 'reactjs-popup'

import { useStateContext } from '../context'
import { CustomButton, CountBox, Loader } from '../components'
import { calculateBarPercentage, daysLeft } from '../utils'
import { thirdweb } from '../assets'


const CampaignDetails = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { donate, getDonations, contract, address, } = useStateContext()

  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [donators, setDonators] = useState([])

  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)

  const remainingDays = daysLeft(state.deadline)

  const fetchDonators = async () => {

    const data = await getDonations(state.pId)
    setDonators(data)

  }

  useEffect(() => {
    if (contract) {
      fetchDonators()
    }

  }, [contract, address])

  const handleDonate = async () => {
    setIsLoading(true)
    try {
      await donate(state.pId, amount)
      navigate('/')
    } catch (error) {
      setOpen(o => !o)
    }
    setIsLoading(false)
  }

  return (
    <div>
      {isLoading && <Loader />}

      <div
        className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'
      >
        <div
          className='flex-1 flex-col'
        >
          <img
            src={state.image}
            alt="campaign"
            className='w-full h-[410px] object-cover rounded-xl'
          />

          <div
            className='relative w-full h-[5px] bg-[#3a3a4e] rounded-xl mt-2'
          >
            <div
              className='absolute h-full bg-[#4acd8d] rounded-xl'
              style={{ whidth: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%' }}
            >

            </div>
          </div>
        </div>
        <div
          className='flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]'
        >
          <CountBox title='Días restantes' value={remainingDays} />
          <CountBox title={`Recaudado de ${state.target}`} value={state.amountCollected} />
          <CountBox title='Donadores totales' value={donators.length} />
        </div>
      </div>

      <div
        className='mt-[60px] flex lg:flex-row flex-col gap-5'
      >
        <div
          className='flex-[2] flex flex-col gap-[40px]'
        >
          <div>
            <h4
              className='font-epilogue font-semibold text-[18px] text-white p-3 uppercase'
            >
              Creador
            </h4>

            <div
              className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'
            >
              <div
                className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer'
              >
                <img src={thirdweb} alt="User" className='w-[60%] h-[60%] object-contain' />
              </div>
              <div>
                <h4 className='font-epilogue font-semibold text-[14px] text-white break-all'>{state.owner}</h4>
                <p className='mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]'>10 Capañas</p>
              </div>
            </div>
          </div>

          <div>
            <h4
              className='font-epilogue font-semibold text-[18px] text-white uppercase'
            >
              Historia
            </h4>
            <div
              className='mt-[20px]'
            >
              <p className='mt-[4px] font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>{state.description}</p>
            </div>

          </div>

          <div>
            <h4
              className='font-epilogue font-semibold text-[18px] text-white uppercase'
            >
              Donadores
            </h4>
            <div
              className='mt-[20px] flex flex-col gap-4'
            >
              {donators.length > 0 ? donators.map((donator, index) => (
                <div
                  key={`${donator.donator}-${index}`}
                  className='flex justify-between items-center gap-4'
                >
                  <p
                    className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all'
                  >{index + 1}. {donator.donator}
                  </p>
                  <p
                    className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all'
                  >{donator.amount}
                  </p>
                </div>
              )) : (
                <p className='mt-[4px] font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>No hay donadores. Se el primero!</p>

              )}
            </div>
          </div>
        </div>


        <div
          className='flex-1'
        >
          <div
            className='mt-[20px] ml-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]'
          >
            <p
              className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]'
            >
              Financia esta campaña
            </p>
            <div
              className='mt-[30px]'
            >
              <input
                type="number"
                placeholder='ETH 0.1'
                step='0.01'
                className='w-full h-[50px] py-[10px] sm:px[20px] px-[15px] bg-[#2c2f32] rounded-[10px] p-3 text-[#808191] font-epilogue font-normal text-[16px] leading-[26px] outline-none'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div
                className='my-[20px] p-4 bg-[#13131a] rounded-[10px]'
              >
                <h4 className='font-epilogue font-semibold text-[14px] leading-[22px] text-white'>Aporta porque crees en la campaña</h4>
                <p className='mt-[20px] font-epilogue font-normal leading-[22px] text-[#809191]'>Contribuye con el proyecto sin esperar nada a cambio</p>
              </div>

              <CustomButton
                btnType='button'
                title='Aporta a la campaña'
                styles='w-full bg-[#8c6dfd] py-[15px] rounded-[10px] font-epilogue text-[16px] leading-[26px]'
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>

      </div>


      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal fixed bottom-3 right-3">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-5 rounded relative" role="alert">
            <strong className="font-bold">Algo salio mal!</strong>
            <span className="block sm:inline"> Transaccion rechazada.</span>
            <span className="absolute top-0 bottom-0 right-0 px-1 py-1 mb-2">
              <svg onClick={closeModal} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
          </div>

        </div>
      </Popup>
    </div>
  )
}

export default CampaignDetails