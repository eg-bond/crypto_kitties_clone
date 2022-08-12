import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../OtherComponents/Heading/Heading'
import Marketplace from '../Marketplace/Marketplace'
import './index_page.css'

function IndexPage({
  // kitties,
  dispatch,
  haveFreeKitty,
  kittieIdsOnSale,
  kittiePrices,
  kittiesOnSale,
  kittieIdsOwned,
}) {
  return (
    <div className='index'>
      <div className='landing'>
        <div className='landing__cover'></div>
        <div className='landing__header'>
          <h1>CryptoKittiesClone</h1>
          <h3>Collect and breed furrever friends!</h3>
        </div>
        <img className='landing__img' src='./images/group.png' alt='group' />

        <GetYourKittyLink
          haveFreeKitty={haveFreeKitty}
          kittieIdsOwned={kittieIdsOwned}
        />
      </div>
      <div className='marketplacePreview'>
        <Heading
          title={'Kitties for sale'}
          linkTitle={'See all available kitties'}
          goTo={'/marketplace'}
        />
        <Marketplace
          dispatch={dispatch}
          howMuchToDisplay={4}
          kittieIdsOnSale={kittieIdsOnSale}
          kittiePrices={kittiePrices}
          kittiesOnSale={kittiesOnSale}
          page={1}
        />
      </div>
    </div>
  )
}

function GetYourKittyLink({ haveFreeKitty, kittieIdsOwned }) {
  if (!haveFreeKitty) {
    return (
      <Link className='button--white' to={'/factory'}>
        Get your own kitty
      </Link>
    )
  }
  // if user got his free kitty, but sold it
  if (Object.keys(kittieIdsOwned).length === 0) {
    return (
      <Link className='button--white' to={'/marketplace'}>
        Get your own kitty
      </Link>
    )
  }
}

export default IndexPage
