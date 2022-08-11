import React from 'react'
import Heading from '../../OtherComponents/Heading/Heading'
import Marketplace from './Marketplace'
import './marketplace.css'

function MarketplacePage({
  kittiesOnSale,
  kittieIdsOnSale,
  dispatch,
  page,
  kittiePrices,
}) {
  return (
    <div className='marketplacePage'>
      <Heading title={'Marketplace'} />
      <Marketplace
        kittiesOnSale={kittiesOnSale}
        kittiePrices={kittiePrices}
        kittieIdsOnSale={kittieIdsOnSale}
        howMuchToDisplay={'all'}
        page={page}
        dispatch={dispatch}
      />
    </div>
  )
}

export default MarketplacePage
