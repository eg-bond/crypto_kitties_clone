import React, { useContext, useEffect } from 'react'
import { fetchTokenIdsOnSale, getKitties } from '../../helpers'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import Catalogue from '../Catalogue/Catalogue'

function Marketplace({ kittiesOnSale, kittieIdsOnSale, dispatch }) {
  const { kittyContract, marketplaceContract } = useContext(Web3Context)

  useEffect(() => {
    fetchTokenIdsOnSale(marketplaceContract, dispatch)
  }, [])

  useEffect(() => {
    getKitties(kittyContract, kittieIdsOnSale, dispatch)
  }, [kittieIdsOnSale])

  return <Catalogue kitties={kittiesOnSale} />
}

export default Marketplace
