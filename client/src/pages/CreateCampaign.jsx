import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import Popup from 'reactjs-popup'

import { useStateContext } from '../context'
import { money } from '../assets'
import { CustomButton, FormField, Loader } from '../components'
import { checkIfImage } from '../utils'


const CreateCampaign = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { createCampaign } = useStateContext()
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    category: '',
    target: '',
    deadline: '',
    image: '',
  })

  const handleFormFLiedChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)
  const [modalText, setModalText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    checkIfImage(form.image, async (isImage) => {
      if (isImage) {
        setIsLoading(true)
        try {
          await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) })
        } catch (error) {
          setModalText('No se pudo realizar la transaccion')
          setOpen(o => !o)
        }
        navigate('/')
        setIsLoading(false)
      } else {
        setModalText('La url de la imagen no es valida')
        setOpen(o => !o)
        setForm({ ...form, image: '' })
      }
    }
    )
  }

  return (
    <div
      className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'
    >
      {isLoading && <Loader />}
      <div
        className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'
      >
        <h1
          className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'
        >
          Empieza una campaña
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className='w-full mt-[65px] flex flex-col gap-[30px]'
      >
        <div
          className='flex flex-wrap gap-[40px]'
        >
          <FormField
            labelName="Tu nombre *"
            placeholder="Juan Perez"
            inputType="text"
            value={form.name}
            handleChange={(e) => { handleFormFLiedChange('name', e) }}
          />
          <FormField
            labelName="Nombre de campaña *"
            placeholder="Escribe un titulo"
            inputType="text"
            value={form.title}
            handleChange={(e) => { handleFormFLiedChange('title', e) }}
          />
        </div>

        <FormField
          labelName="Categoria de campaña *"
          placeholder="Categoria"
          inputType="text"
          value={form.category}
          handleChange={(e) => { handleFormFLiedChange('category', e) }}
        />

        <FormField
          labelName="Historia *"
          placeholder="Escribe tu historia"
          isTextArea
          value={form.description}
          handleChange={(e) => { handleFormFLiedChange('description', e) }}
        />

        <div
          className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h[120px] rounded-[10px]'
        >
          <img
            src={money}
            alt="money"
            className='w-[40px] h-[40xp] object-contain'
          />
          <h4
            className='font-epilogue font-bold text-[25px] text-white ml-[20px]'
          >
            Obtendras el 100% del total recaudado
          </h4>
        </div>

        <div
          className='flex flex-wrap gap-[40px]'
        >
          <FormField
            labelName="Meta *"
            placeholder="ETH 0.5"
            inputType="text"
            value={form.target}
            handleChange={(e) => { handleFormFLiedChange('target', e) }}
          />
          <FormField
            labelName="Fecha de termino *"
            placeholder="Fecha de termino"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => { handleFormFLiedChange('deadline', e) }}
          />
        </div>

        <FormField
          labelName="Imagen de campaña *"
          placeholder="Ingresa la url de la imagen de tu campaña"
          inputType="url"
          value={form.image}
          handleChange={(e) => { handleFormFLiedChange('image', e) }}
        />

        <div
          className='flex justigfy-center items-center mt-[40px]'
        >
          <CustomButton
            btnType='submit'
            title="Crear campaña"
            styles="bg-[#1dc071]"
          />
        </div>

      </form>


      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal fixed bottom-3 right-3">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-5 rounded relative" role="alert">
            <strong className="font-bold">Algo salio mal!</strong>
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

export default CreateCampaign