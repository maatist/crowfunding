import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components'
import { useStateContext } from '../context'
import { search } from '../assets'


const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  /* const [campaigns, setCampaigns] = useState([]) */

  const { address, contract, getCampaigns, getFilteredCampaigns, campaigns, setCampaigns, filterCampaign, searchTextBox, setSearchTextBox, openSuccessAlert, setOpenSuccessAlert } = useStateContext()

  const fetchCampaigns = async () => {
    setIsLoading(true)
    const data = await getCampaigns()
    setCampaigns(data)
    setIsLoading(false)
  }

  const fetchFilteredCampaigns = async () => {
    setIsLoading(true)
    const data = await getFilteredCampaigns()
    setCampaigns(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (contract) fetchCampaigns()
  }, [address, contract])

  useEffect(() => {
    console.log(searchTextBox)
    if (contract && searchTextBox.length > 0) {
      fetchFilteredCampaigns()
    } else if (contract && searchTextBox.length === 0) {
      fetchCampaigns()
    }
  }, [filterCampaign])

  return (

    <DisplayCampaigns
      title="Todas las campañas"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home