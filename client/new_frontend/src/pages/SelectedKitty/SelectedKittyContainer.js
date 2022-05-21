import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Skeleton } from 'web3uikit'
import { fetchTokenIdsOnSale, getOwnedKitties } from '../../helpers'
import { useMarketplace } from '../../OtherComponents/Web3/useMarketplace'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import { parseGenes } from '../Catalogue/Catalogue'
import SelectedKitty from './SelectedKitty'

export default function UpperContainer({
  myKitties,
  kittieIdsOnSale,
  dispatch,
}) {
  const { currentChainName } = useContext(Web3Context)

  if (currentChainName !== 'ganache') {
    return (
      <div
        style={{
          paddingTop: '0.5rem',
        }}
        className='selectedKitty__infoContainer'>
        <Button
          style={{
            margin: '0 auto 0.5rem auto',
          }}
          color='red'
          icon='exclamation'
          iconLayout='leading'
          id='test-button-primary'
          // switch network onclick
          onClick={function noRefCheck() {}}
          size='large'
          text='Please switch the network'
          theme='colored'
          type='button'
        />
        <Skeleton
          borderRadius='1rem'
          height='300px'
          theme='image'
          width='250px'
        />
        {new Array(3).fill(0).map(() => (
          <div className='selectedKitty__section'>
            <Skeleton
              style={{
                marginBottom: '0.3rem',
              }}
              borderRadius='1rem'
              height='40px'
              theme='image'
              width='20%'
            />
            <Skeleton
              borderRadius='1rem'
              height='25px'
              theme='image'
              width='100%'
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <SelectedKittyContainer
      myKitties={myKitties}
      kittieIdsOnSale={kittieIdsOnSale}
      dispatch={dispatch}
    />
  )
}

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
