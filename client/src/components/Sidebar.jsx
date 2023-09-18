import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'

import { useStateContext } from '../context'
import { logo, sun } from '../assets'
import { navlinks } from '../constants'

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} 
      flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className='w-1/2 h-1/2' />
    ) : (
      <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
    )}
  </div>
)

const Sidebar = () => {

  const navigate = useNavigate()
  const [isActive, setIsActive] = useState('dashboard')
  const { filterCampaign, setFilterCampaign, setSearchTextBox, address, disconnect } = useStateContext()


  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)
  const [modalText, setModalText] = useState('')


  const handleHomeClick = () => {
    setSearchTextBox('')
    setFilterCampaign(!filterCampaign)
  }

  return (
    <div
      className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'
    >
      <Link
        onClick={handleHomeClick}
        to='/'
      >
        <Icon styles='w-[52px] h-[52px] bg-[#2c2f32]' imgUrl={logo} />
      </Link>

      <div
        className='flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12'
      >
        <div
          className='flex flex-col justify-center items-center gap-3'
        >
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {

                if (!link.disabled) {
                  if (!address & !link.name.includes("dashboard")) {
                    setModalText('Necesitas conectar tu wallet')
                    setOpen(o => !o)
                  } else if (link.name.includes("logout")) {
                    disconnect();
                    navigate("/")
                  } else {
                    setIsActive(link.name)
                    navigate(link.link)
                  }
                }
              }

              }
            />
          ))}
        </div>
        <Icon
          styles='bg-[#1c1c24] shadow-secondary'
          imgUrl={sun}
        />
      </div>

      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal fixed bottom-3 right-3">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-5 rounded relative" role="alert">
            <strong className="font-bold">Ups!</strong>
            <span className="block sm:inline"> {modalText}.</span>
            <span className="absolute top-0 bottom-0 right-0 px-1 py-1 mb-2">
              <svg onClick={closeModal} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
          </div>

        </div>
      </Popup>
    </div>
  )
}

export default Sidebar