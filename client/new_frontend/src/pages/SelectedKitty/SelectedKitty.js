import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchTokenIdsOnSale, getOwnedKitties } from '../../helpers'

import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import { parseGenes } from '../Catalogue/Catalogue'
import { Kitty } from '../Factory/Kitty'

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
      <Kitty dna={dna} />
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
          <span>On sale for {price} ETH</span>
          <button onClick={removeOffer}>Remove offer</button>
        </>
      )
    }

    return (
      <>
        <input
          type='textarea'
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
        />

        <span>ETH</span>
        <button onClick={() => sellKitty(inputVal)}>Sell me</button>
      </>
    )
  }

  if (!ownThisKitty) {
    if (onSale) {
      return (
        <div>
          <span>Buy this kitty for {price} ETH</span>
          <button onClick={buyKitty}>Buy</button>
        </div>
      )
    }

    return null
  }

  return (
    <div>
      {approved ? (
        input()
      ) : (
        <>
          <div>If U want to sell this kitty U need to approve first</div>
          <button onClick={() => approve()}>Approve</button>
        </>
      )}
    </div>
  )
}

export default SelectedKitty
