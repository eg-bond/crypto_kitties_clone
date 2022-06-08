import React from 'react'
import Heading from '../../OtherComponents/Heading/Heading'
import MarketplaceContainer from './Marketplace'
import './marketplace.css'

function MarketplacePage({ kittiesOnSale, kittieIdsOnSale, dispatch }) {
  return (
    <div className='marketplacePage'>
      <Heading title={'Marketplace'} />
      <MarketplaceContainer
        kittiesOnSale={kittiesOnSale}
        kittieIdsOnSale={kittieIdsOnSale}
        dispatch={dispatch}
      />
    </div>
  )
}

export default MarketplacePage
