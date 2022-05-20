import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../OtherComponents/Header/Header'
import MarketplaceContainer from '../Marketplace/Marketplace'
import './index_page.css'

function IndexPage({
  haveFreeKitty,
  kitties,
  kittiesOnSale,
  kittieIdsOnSale,
  dispatch,
}) {
  return (
    <div className='index'>
      <div className='landing'>
        <div className='landing__cover'></div>
        <div className='landing__header'>
          <h1>CryptoKittiesClone</h1>
          <h3>Collect and breed furrever friends!</h3>
        </div>
        <img src='./images/group.png' alt='group' />

        <GetYourKittyLink haveFreeKitty={haveFreeKitty} kitties={kitties} />
      </div>
      <div className='marketplacePreview'>
        <Header
          title={'Kitties for sale'}
          linkTitle={'See all available kitties'}
          goTo={'/marketplace'}
        />
        <MarketplaceContainer
          kittiesOnSale={kittiesOnSale}
          kittieIdsOnSale={kittieIdsOnSale}
          dispatch={dispatch}
          howMuchToDisplay={4}
        />
      </div>
    </div>
  )
}

function GetYourKittyLink({ haveFreeKitty, kitties }) {
  if (!haveFreeKitty) {
    return (
      <Link className='button--white' to={'/factory'}>
        Get your own kitty
      </Link>
    )
  }
  if (Object.keys(kitties).length === 0) {
    return (
      <Link className='button--white' to={'/marketplace'}>
        Get your own kitty
      </Link>
    )
  }
}

export default IndexPage
