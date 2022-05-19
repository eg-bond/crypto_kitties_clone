import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchTokenIdsOnSale, getOwnedKitties } from '../../helpers'
import { useMarketplace } from '../../OtherComponents/Web3/useMarketplace'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import { parseGenes } from '../Catalogue/Catalogue'
import SelectedKitty from './SelectedKitty'

function SelectedKittyContainer({ myKitties, kittieIdsOnSale, dispatch }) {
  const { kittyContract, marketplaceContract, connectedAccount } =
    useContext(Web3Context)

  const [ownThisKitty, setOwnership] = useState(false)
  const [fetched, setFetched] = useState(false)
  const [selectedKitty, setSelectedKitty] = useState(null)
  const [price, setPrice] = useState('')
  const [onSale, setOnSale] = useState(false)

  const { id } = useParams()

  const { getKitty, getKittyPrice } = useMarketplace()

  // if we didnt fetch for kitties
  if (!fetched && connectedAccount !== 0) {
    getOwnedKitties(kittyContract, connectedAccount, dispatch).then(() =>
      setFetched(true)
    )
  }

  const checkOwnership = () => {
    if (myKitties[id]) {
      setOwnership(true)
      // get kitty from state
      setSelectedKitty(myKitties[id])
      return
    }
    setOwnership(false)
  }

  //get kitty from blockchain
  const handleGetKitty = () => {
    getKitty(id).then(setSelectedKitty)
  }

  const handleGetKittyPrice = () => {
    getKittyPrice(id).then(setPrice)
  }

  useEffect(() => {
    fetchTokenIdsOnSale(marketplaceContract, dispatch)
  }, [])

  useEffect(() => {
    if (kittieIdsOnSale.includes(id)) {
      setOnSale(true)
    } else {
      setOnSale(false)
    }
  }, [kittieIdsOnSale])

  useEffect(() => {
    checkOwnership()
  }, [myKitties])

  useEffect(() => {
    if (onSale) {
      handleGetKittyPrice()
    }
  }, [onSale])

  if (!selectedKitty) {
    handleGetKitty()
    // make preloader
    return null
  }

  const dna = parseGenes(selectedKitty.genes)

  return (
    <SelectedKitty
      myKitties={myKitties}
      selectedKitty={selectedKitty}
      kittieIdsOnSale={kittieIdsOnSale}
      dna={dna}
      dispatch={dispatch}
      ownThisKitty={ownThisKitty}
      price={price}
      id={id}
      onSale={onSale}
    />
  )
}

export default SelectedKittyContainer
