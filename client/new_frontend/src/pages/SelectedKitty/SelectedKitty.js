import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchTokenIdsOnSale, getOwnedKitties } from '../../helpers'

import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import { parseGenes } from '../Catalogue/Catalogue'
import { getColor } from '../Factory/colors'
import {
  getAnimationName,
  getDecorationName,
  getEyesShapeName,
} from '../Factory/helpers'
import { Kitty } from '../Factory/Kitty'
import './selected_kitty.css'

function SelectedKitty({ myKitties, kittieIdsOnSale, dispatch }) {
  const { web3, kittyContract, marketplaceContract, selectedAccount } =
    useContext(Web3Context)
  const [ownThisKitty, setOwnership] = useState(false)
  const [fetched, setFetched] = useState(false)
  const [selectedKitty, setSelectedKitty] = useState(null)
  const [price, setPrice] = useState('')
  const [approved, setApproved] = useState(false)
  const [onSale, setOnSale] = useState(false)

  const { id } = useParams()

  // if we didnt fetch for kitties
  if (!fetched) {
    console.log('fetch')
    getOwnedKitties(kittyContract, selectedAccount, dispatch).then(() =>
      setFetched(true)
    )
  }

  const checkOwnership = () => {
    if (myKitties[id]) {
      setOwnership(true)
      setSelectedKitty(myKitties[id])
      return
    }
  }

  const getKitty = async () => {
    kittyContract.methods.getKitty(id).call().then(setSelectedKitty)
  }

  const getKittyPrice = () => {
    marketplaceContract.methods
      .getOffer(id)
      .call()
      .then(offer => setPrice(web3.utils.fromWei(offer.price, 'ether')))
  }

  const sellKitty = price => {
    let weiPrice = web3.utils.toWei(price, 'ether')

    marketplaceContract.methods
      .setOffer(weiPrice, id)
      .send({ from: selectedAccount })
      .then(() => fetchTokenIdsOnSale(marketplaceContract, dispatch))
  }

  const buyKitty = () => {
    marketplaceContract.methods
      .buyKitty(id)
      .send({ from: selectedAccount, value: web3.utils.toWei(price, 'ether') })
      .then(() => fetchTokenIdsOnSale(marketplaceContract, dispatch))
  }

  const removeOffer = () => {
    marketplaceContract.methods
      .removeOffer(id)
      .send({ from: selectedAccount })
      .then(() => fetchTokenIdsOnSale(marketplaceContract, dispatch))
  }

  const approve = () => {
    kittyContract.methods
      .setApprovalForAll(marketplaceContract._address, true)
      .send({ from: selectedAccount })
      .then(() => setApproved(true))
  }

  useEffect(() => {
    checkOwnership()
  }, [myKitties])

  useEffect(() => {
    kittyContract.methods
      .isApprovedForAll(selectedAccount, marketplaceContract._address)
      .call()
      .then(setApproved)

    fetchTokenIdsOnSale(marketplaceContract, dispatch)
  }, [])

  useEffect(() => {
    if (kittieIdsOnSale.includes(id)) {
      setOnSale(true)
    } else {
      setOnSale(false)
    }
  }, [kittieIdsOnSale])

  if (!selectedKitty) {
    getKitty()
    return null
  }

  const dna = parseGenes(selectedKitty.genes)

  return (
    <div className='selectedKitty'>
      <div className='selectedKitty__kittyContainer'>
        <div
          style={{ backgroundColor: getColor(dna.eyesClr) }}
          className='selectedKitty__background'></div>
        <div className='selected_kitty__kitty'>
          <Kitty dna={dna} />
        </div>
      </div>
      <div className='selectedKitty__infoContainer'>
        <div className='selectedKitty__section'>
          <h1>Kitty #{id}</h1>
          <div className='selectedKitty__info__details'>
            <div>
              <span>DNA: {selectedKitty.genes}</span>
              <span className='ml_1rem'>Gen: {selectedKitty.generation}</span>
            </div>
            <span>Owner: 0x3E51fFbde3da5d74fb568f21c9F9E96032cccE08</span>
          </div>
        </div>

        <div className='selectedKitty__section'>
          <h1>Trading</h1>
          <div className='selectedKitty__saleInput'>
            <SaleInput
              ownThisKitty={ownThisKitty}
              approved={approved}
              approve={approve}
              sellKitty={sellKitty}
              onSale={onSale}
              removeOffer={removeOffer}
              getKittyPrice={getKittyPrice}
              price={price}
              buyKitty={buyKitty}
            />
          </div>
        </div>

        <div className='selectedKitty__section'>
          <h1>Cattributes</h1>
          <div className='selectedKitty__cattributes'>
            <div>
              <span className='bold'>Eyes: </span>
              {getEyesShapeName(dna.eyesShape)}
            </div>
            <div>
              <span className='bold'>Animation: </span>
              {getAnimationName(dna.animation)}
            </div>
            <div>
              <span className='bold'>Decoration: </span>
              {getDecorationName(dna.decoration)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SaleInput({
  ownThisKitty,
  approved,
  approve,
  sellKitty,
  onSale,
  removeOffer,
  getKittyPrice,
  price,
  buyKitty,
}) {
  const [inputVal, setInputVal] = useState('')

  if (onSale) {
    getKittyPrice()
  }

  function input() {
    if (onSale) {
      return (
        <>
          <div className='saleInput__price'>
            <div>On sale for</div>
            <div style={{ fontWeight: 'bold' }}>{price} ETH</div>
          </div>
          <button className='saleInput__button' onClick={removeOffer}>
            Remove offer
          </button>
        </>
      )
    }

    return (
      <>
        <div className='saleInput__price'>
          <div>Sell this kitty for </div>
          <div>
            <input
              type='textarea'
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
            />
            <span> ETH</span>
          </div>
        </div>

        <button
          className='saleInput__button'
          onClick={() => sellKitty(inputVal)}>
          Sell me
        </button>
      </>
    )
  }

  if (!ownThisKitty) {
    if (onSale) {
      return (
        <>
          <span>
            Buy this kitty for{' '}
            <span style={{ fontWeight: 'bold' }}>{price} ETH</span>{' '}
          </span>
          <button className='saleInput__button' onClick={buyKitty}>
            Buy
          </button>
        </>
      )
    }

    return <div>This kitty is not for sale</div>
  }

  return (
    <>
      {approved ? (
        input()
      ) : (
        <>
          <div>If U want to sell this kitty U need to approve first</div>
          <button className='saleInput__button' onClick={() => approve()}>
            Approve
          </button>
        </>
      )}
    </>
  )
}

export default SelectedKitty
