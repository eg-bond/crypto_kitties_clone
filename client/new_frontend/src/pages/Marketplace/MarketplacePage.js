import React from 'react'
import Marketplace from './Marketplace'
import './marketplace.css'

function MarketplacePage({ kittiesOnSale, kittieIdsOnSale, dispatch }) {
  return (
    <div className='marketplacePage'>
      <div className='headerContainer'>
        <h1>Marketplace</h1>
      </div>
      <Marketplace
        kittiesOnSale={kittiesOnSale}
        kittieIdsOnSale={kittieIdsOnSale}
        dispatch={dispatch}
      />
    </div>
  )
}

export default MarketplacePage
