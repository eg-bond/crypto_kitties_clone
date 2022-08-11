import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  fetchTokenIdsOnSale,
  getKitties,
  useGetKittiesByPage,
} from '../../helpers'
import { options } from '../../options'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import Catalogue from '../Catalogue/Catalogue'

function Marketplace({
  kittiesOnSale,
  kittieIdsOnSale,
  kittiePrices,
  page,
  dispatch,
  howMuchToDisplay,
}) {
  const { kittyContract, marketplaceContract, currentChainName } =
    useContext(Web3Context)

  useEffect(() => {
    if (currentChainName === options.baseChain) {
      fetchTokenIdsOnSale(marketplaceContract, dispatch)
    }
  }, [currentChainName])

  useEffect(() => {
    if (currentChainName === options.baseChain) {
      getKitties(kittyContract, kittieIdsOnSale).then(payload => {
        dispatch({ type: 'SET_ALL_KITTIES_ON_SALE', payload })
      })
    }
  }, [kittieIdsOnSale])

  const { loading, hasMore } = useGetKittiesByPage(
    page,
    kittieIdsOnSale,
    kittyContract,
    dispatch
  )

  const [kittieToShow, change] = useState(kittiesOnSale)

  useEffect(() => {
    change(kittiesOnSale)
  }, [kittiesOnSale])

  let navigate = useNavigate()
  const selectKitty = id => {
    navigate(`/selected_kitty/${id}`)
  }

  const kittiesToDisplay = () => {
    if (howMuchToDisplay !== 'all') {
      // for MarketPlace preview
      const slicedEntries = Object.entries(kittieToShow).slice(
        0,
        howMuchToDisplay
      )
      return Object.fromEntries(slicedEntries)
    } else {
      // for MarketPlacePage
      return kittieToShow
    }
  }

  return (
    <Catalogue
      kitties={kittiesToDisplay()}
      kittiePrices={kittiePrices}
      howMuchToDisplay={howMuchToDisplay}
      loading={loading}
      hasMore={hasMore}
      page={page}
      dispatch={dispatch}
      onClickHandler={selectKitty}
    />
  )
}

export default Marketplace
