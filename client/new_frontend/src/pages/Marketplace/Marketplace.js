import React, { useContext, useEffect, useState } from 'react'
import { fetchTokenIdsOnSale, getKitties } from '../../helpers'
import { options } from '../../options'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import Catalogue from '../Catalogue/Catalogue'

function MarketplaceContainer({
  kittiesOnSale,
  kittieIdsOnSale,
  dispatch,
  howMuchToDisplay = 'all',
}) {
  return (
    <Marketplace
      kittiesOnSale={kittiesOnSale}
      kittieIdsOnSale={kittieIdsOnSale}
      dispatch={dispatch}
      howMuchToDisplay={howMuchToDisplay}
    />
  )
}

function Marketplace({
  kittiesOnSale,
  kittieIdsOnSale,
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
      getKitties(kittyContract, kittieIdsOnSale, dispatch)
    }
  }, [kittieIdsOnSale])

  const kittiesToDisplay = () => {
    if (howMuchToDisplay !== 'all') {
      // for MarketPlace preview
      const slicedEntries = Object.entries(kittiesOnSale).slice(
        0,
        howMuchToDisplay
      )
      return Object.fromEntries(slicedEntries)
    } else {
      // for MarketPlacePage
      return kittiesOnSale
    }
  }

  return (
    <Catalogue
      kitties={kittiesToDisplay()}
      howMuchToDisplay={howMuchToDisplay}
    />
  )
}

export default MarketplaceContainer
