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
        dispatch={dispatch}
        howMuchToDisplay={'all'}
        kittieIdsOnSale={kittieIdsOnSale}
        kittiePrices={kittiePrices}
        kittiesOnSale={kittiesOnSale}
        page={page}
      />
    </div>
  )
}

export default MarketplacePage
