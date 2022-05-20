import React from 'react'
import Header from '../../OtherComponents/Header/Header'
import MarketplaceContainer from './Marketplace'
import './marketplace.css'

function MarketplacePage({ kittiesOnSale, kittieIdsOnSale, dispatch }) {
  return (
    <div className='marketplacePage'>
      <Header title={'Marketplace'} />
      <MarketplaceContainer
        kittiesOnSale={kittiesOnSale}
        kittieIdsOnSale={kittieIdsOnSale}
        dispatch={dispatch}
      />
    </div>
  )
}

export default MarketplacePage
