import React, { useContext, useEffect } from 'react'
import { Skeleton } from 'web3uikit'
import { fetchTokenIdsOnSale, getKitties } from '../../helpers'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import Catalogue from '../Catalogue/Catalogue'

function MarketplaceContainer({
  kittiesOnSale,
  kittieIdsOnSale,
  dispatch,
  howMuchToDisplay = 'all',
}) {
  const { currentChainName } = useContext(Web3Context)
  const sceletonsAmount = howMuchToDisplay === 'all' ? 12 : 4
  const sceletonsArr = new Array(sceletonsAmount).fill(0)

  if (currentChainName !== 'ganache') {
    return (
      <div className='catalogue'>
        {sceletonsArr.map(() => (
          <div className='sceletonContainer'>
            <Skeleton
              borderRadius='1rem'
              height='85%'
              theme='image'
              width='100%'
            />
            <div
              style={{
                height: '15%',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Skeleton
                style={{
                  marginBottom: '0.3rem',
                }}
                borderRadius='1rem'
                height='33%'
                theme='text'
                width='20%'
              />
              <Skeleton
                borderRadius='1rem'
                height='33%'
                theme='text'
                width='90%'
              />
            </div>
          </div>
        ))}
      </div>
    )
  }
  // if (currentChainName !== 'ganache') {
  //   return (
  //     <>
  //       <div>U need to switch network</div>
  //       <button>Switch network</button>
  //     </>
  //   )
  // }

  return (
    <Marketplace
      kittiesOnSale={kittiesOnSale}
      kittieIdsOnSale={kittieIdsOnSale}
      dispatch={dispatch}
      howMuchToDisplay={howMuchToDisplay}
    />
  )
}

function Marketplace({
  kittiesOnSale,
  kittieIdsOnSale,
  dispatch,
  howMuchToDisplay,
}) {
  const { kittyContract, marketplaceContract } = useContext(Web3Context)

  useEffect(() => {
    fetchTokenIdsOnSale(marketplaceContract, dispatch)
  }, [])

  useEffect(() => {
    getKitties(kittyContract, kittieIdsOnSale, dispatch)
  }, [kittieIdsOnSale])

  if (howMuchToDisplay !== 'all') {
    const slicedEntries = Object.entries(kittiesOnSale).slice(
      0,
      howMuchToDisplay
    )
    return <Catalogue kitties={Object.fromEntries(slicedEntries)} />
  }

  return <Catalogue kitties={kittiesOnSale} />
}

export default MarketplaceContainer
