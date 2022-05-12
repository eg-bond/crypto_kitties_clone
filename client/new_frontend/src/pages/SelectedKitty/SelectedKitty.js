import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getKitties } from '../../App'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import { parseGenes } from '../Catalogue/Catalogue'
import { Kitty } from '../Factory/Kitty'

function SelectedKitty({ myKitties, kittiesOnSale, dispatch }) {
  const { web3, kittyContract, marketplaceContract, selectedAccount } =
    useContext(Web3Context)
  const [ownThisKitty, setOwnership] = useState(false)
  const [fetched, setFetched] = useState(false)
  const [selectedKitty, setSelectedKitty] = useState(null)
  // const [price, setPrice] = useState('')
  const [approved, setApproved] = useState(false)
  const [onSale, setOnSale] = useState(false)

  const { id } = useParams()

  // if we didnt fetch for kitties
  if (!fetched) {
    console.log('fetch')
    getKitties(kittyContract, selectedAccount, dispatch).then(() =>
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

  const fetchTokensOnSale = () => {
    marketplaceContract.methods
      .getAllTokenOnSale()
      .call()
      .then(idsArray =>
        dispatch({ type: 'SET_ALL_TOKENS_ON_SALE', payload: idsArray })
      )
  }

  const getKitty = async () => {
    kittyContract.methods.getKitty(id).call().then(setSelectedKitty)
  }

  const sellKitty = price => {
    let weiPrice = web3.utils.toWei(price, 'ether')

    marketplaceContract.methods
      .setOffer(weiPrice, id)
      .send({ from: selectedAccount })
      .then(() => fetchTokensOnSale())
  }

  const removeOffer = () => {
    marketplaceContract.methods
      .removeOffer(id)
      .send({ from: selectedAccount })
      .then(() => fetchTokensOnSale())
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

    fetchTokensOnSale()
  }, [])

  useEffect(() => {
    if (kittiesOnSale.includes(id)) {
      setOnSale(true)
    } else {
      setOnSale(false)
    }
  }, [kittiesOnSale])

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
}) {
  const [price, setPrice] = useState('')

  if (!ownThisKitty) {
    return null
  }

  function input() {
    if (onSale) {
      return (
        <>
          <span>On sale</span>
          <button onClick={removeOffer}>Remove offer</button>
        </>
      )
    }

    return (
      <>
        <input
          type='textarea'
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <span>ETH</span>
        <button onClick={() => sellKitty(price)}>Sell me</button>
      </>
    )
  }

  return (
    <div>
      {approved ? (
        input()
      ) : (
        <>
          <div>U need to approve first</div>
          <button onClick={() => approve()}>Approve</button>
        </>
      )}
    </div>
  )
}

export default SelectedKitty
