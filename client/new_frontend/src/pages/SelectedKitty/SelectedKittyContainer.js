import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Skeleton } from 'web3uikit'
import { fetchTokenIdsOnSale, getOwnedKitties } from '../../helpers'
import { options } from '../../options'
import { useMarketplace } from '../../OtherComponents/Web3/useMarketplace'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import { parseGenes } from '../Catalogue/CatalogueParts'

import SelectedKitty from './SelectedKitty'

export default function UpperContainer({
  myKitties,
  kittieIdsOnSale,
  dispatch,
}) {
  const { currentChainName } = useContext(Web3Context)

  if (currentChainName !== options.baseChain) {
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

  window.kitty = kittyContract
  const [thisKittyOwner, setThisKittyOwner] = useState('')
  const [fetched, setFetched] = useState(false)
  const [selectedKitty, setSelectedKitty] = useState(null)
  const [price, setPrice] = useState('')
  const [onSale, setOnSale] = useState(false)

  const { id } = useParams()

  const { getKitty, getKittyPrice, getKittyOwner } = useMarketplace()

  // if we didn't fetch for kitties
  if (!fetched && connectedAccount !== 0) {
    getOwnedKitties(kittyContract, connectedAccount, dispatch).then(() =>
      setFetched(true)
    )
  }

  useEffect(() => {
    fetchTokenIdsOnSale(marketplaceContract, dispatch)
    getKittyOwner(id).then(setThisKittyOwner)
  }, [])

  useEffect(() => {
    if (kittieIdsOnSale.includes(id)) {
      setOnSale(true)
    } else {
      setOnSale(false)
    }
  }, [kittieIdsOnSale])

  useEffect(() => {
    if (onSale) {
      getKittyPrice(id).then(setPrice)
    }
  }, [onSale])

  if (!selectedKitty) {
    getKitty(id).then(setSelectedKitty)
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
      price={price}
      id={id}
      onSale={onSale}
      thisKittyOwner={thisKittyOwner}
      setThisKittyOwner={setThisKittyOwner}
    />
  )
}
