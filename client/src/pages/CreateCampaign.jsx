import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'

import { money } from '../assets'
import { CustomButton, FormField } from '../components'
import { checkIfImage } from '../utils'

const handleSubmit = () => { }


const CreateCampaign = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  })

  return (
    <div
      className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'
    >
      {isLoading && 'Cargando...'}
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
            handleChange={() => { }}
          />
          <FormField
            labelName="Nombre de campaña *"
            placeholder="Escribe un titulo"
            inputType="text"
            value={form.title}
            handleChange={() => { }}
          />
        </div>

        <FormField
          labelName="Historia *"
          placeholder="Escribe tu historia"
          isTextArea
          value={form.description}
          handleChange={() => { }}
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
            handleChange={() => { }}
          />
          <FormField
            labelName="Fecha de termino *"
            placeholder="Fecha de termino"
            inputType="date"
            value={form.deadline}
            handleChange={() => { }}
          />
        </div>

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
    </div>
  )
}

export default CreateCampaign