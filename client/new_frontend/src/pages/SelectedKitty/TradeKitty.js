import React, { useContext, useEffect, useState } from 'react'
import { fetchTokenIdsOnSale, getOwnedKitties } from '../../helpers'
import { useMarketplace } from '../../OtherComponents/Web3/useMarketplace'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'

export default function TradeKitty({
  ownThisKitty,
  price,
  id,
  dispatch,
  onSale,
}) {
  const [approved, setApproved] = useState(false)

  const { kittyContract, marketplaceContract, connectedAccount } =
    useContext(Web3Context)

  const { sellKitty, buyKitty, removeOffer, approve } = useMarketplace()

  const handleSellKitty = async price => {
    await sellKitty(price, id)
    // maybe make another action for adding single id to 'kittieIdsOnSale' array ???
    fetchTokenIdsOnSale(marketplaceContract, dispatch)
  }

  const handleBuyKitty = async () => {
    await buyKitty(id)
    // maybe make another action for adding single id to 'kittieIdsOnSale' array ???
    fetchTokenIdsOnSale(marketplaceContract, dispatch)
    getOwnedKitties(kittyContract, connectedAccount, dispatch)
  }

  const handleRemoveOffer = async () => {
    await removeOffer(id)
    // maybe make another action for adding/removing single id to 'kittieIdsOnSale' array ???
    fetchTokenIdsOnSale(marketplaceContract, dispatch)
  }

  const handleApprove = async () => {
    const isApproved = await approve()
    isApproved && setApproved(true)
  }

  useEffect(() => {
    if (connectedAccount !== 0) {
      kittyContract.methods
        .isApprovedForAll(connectedAccount, marketplaceContract._address)
        .call()
        .then(setApproved)
    }
  }, [connectedAccount])

  if (ownThisKitty) {
    return (
      <SellKitty
        approved={approved}
        approve={handleApprove}
        price={price}
        onSale={onSale}
        removeOffer={handleRemoveOffer}
        sellKitty={handleSellKitty}
      />
    )
  } else {
    return <BuyKitty onSale={onSale} price={price} buyKitty={handleBuyKitty} />
  }
}

function BuyKitty({ onSale, price, buyKitty }) {
  if (onSale) {
    return (
      <>
        <div className='saleInput__price'>
          <span>Buy this kitty for</span>
          <span style={{ fontWeight: 'bold' }}>{price} ETH</span>{' '}
        </div>
        <button className='saleInput__button' onClick={buyKitty}>
          Buy
        </button>
      </>
    )
  }

  return <div>This kitty is not for sale</div>
}

function SellKitty({
  approved,
  approve,
  onSale,
  price,
  removeOffer,
  sellKitty,
}) {
  const [inputVal, setInputVal] = useState('')

  // marketplace contract is not approved to be the operator
  if (!approved) {
    return (
      <>
        <div>If U want to sell this kitty U need to approve first</div>
        <button className='saleInput__button' onClick={() => approve()}>
          Approve
        </button>
      </>
    )
  }

  // Kitty is already put up for sale
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

  // Kitty is not for sale
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

      <button className='saleInput__button' onClick={() => sellKitty(inputVal)}>
        Sell me
      </button>
    </>
  )
}
