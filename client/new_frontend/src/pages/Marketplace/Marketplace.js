import React, { useContext, useEffect } from 'react'
import { fetchTokenIdsOnSale, getKitties } from '../../helpers'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import Catalogue from '../Catalogue/Catalogue'

function MarketplaceContainer({ kittiesOnSale, kittieIdsOnSale, dispatch }) {
  const { currentChainName, handleNetworkSwitch } = useContext(Web3Context)

  if (currentChainName !== 'ganache') {
    return (
      <>
        <div>U need to switch network</div>
        <button>Switch network</button>
      </>
    )
  }

  return (
    <Marketplace
      kittiesOnSale={kittiesOnSale}
      kittieIdsOnSale={kittieIdsOnSale}
      dispatch={dispatch}
    />
  )
}

function Marketplace({
  kittiesOnSale,
  kittieIdsOnSale,
  dispatch,
  howMuchToDisplay = 'all',
}) {
  const {
    kittyContract,
    marketplaceContract,
    currentChainName,
    handleNetworkSwitch,
  } = useContext(Web3Context)

  useEffect(() => {
    fetchTokenIdsOnSale(marketplaceContract, dispatch)
  }, [])

  useEffect(() => {
    getKitties(kittyContract, kittieIdsOnSale, dispatch)
  }, [kittieIdsOnSale])

  if (howMuchToDisplay !== 'all') {
    const slicedEntries = Object.entries(kittiesOnSale).slice(
      0,
      howMuchToDisplay
    )
    return <Catalogue kitties={Object.fromEntries(slicedEntries)} />
  }

  return <Catalogue kitties={kittiesOnSale} />
}

export default MarketplaceContainer
