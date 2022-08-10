import React, { useContext, useEffect } from 'react'
import {
  getKittiesByPage,
  getOwnedKittiesIds,
  useGetKittiesByPage,
} from '../../helpers'
import { options } from '../../options'
import Heading from '../../OtherComponents/Heading/Heading'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import Catalogue from './Catalogue'

import './catalogue.css'

export const pageCapacity = 12

function MyKittiesPage({
  kittieIdsOwned,
  page,
  myKitties,
  haveFreeKitty,
  dispatch,
}) {
  const { connectedAccount, login, kittyContract, currentChainName } =
    useContext(Web3Context)

  const { loading, hasMore } = useGetKittiesByPage(
    page,
    kittieIdsOwned,
    kittyContract,
    dispatch
  )

  useEffect(() => {
    if (connectedAccount && currentChainName === options.baseChain) {
      //new
      getOwnedKittiesIds(kittyContract, connectedAccount).then(payload =>
        dispatch({ type: 'SET_KITTIES_IDS_OWNED', payload })
      )
      //checks, if user got his free kitty or not
      kittyContract.methods
        .alreadyGotFreeKitty(connectedAccount)
        .call()
        .then(payload => dispatch({ type: 'SET_HAVE_FREE_KITTY', payload }))
    }
  }, [connectedAccount, currentChainName])

  if (connectedAccount === 0) {
    return (
      <div className='MyKittiesPage'>
        <Heading title={'My kitties'} />
        <button
          onClick={login}
          style={{ marginTop: '1rem' }}
          className='button--white'>
          Connect wallet
        </button>
      </div>
    )
  }

  const getKittiesByPageAC = page => {
    getKittiesByPage(page, kittyContract, kittieIdsOwned).then(payload => {
      dispatch({ type: 'ADD_KITTIES', payload })
    })
  }

  const increasePageAC = () => dispatch({ type: 'SET_PAGE', payload: page + 1 })
  console.log('hasMore', hasMore)
  return (
    <div className='MyKittiesPage'>
      <Heading title={'My kitties'} />
      <Catalogue
        kitties={myKitties}
        haveFreeKitty={haveFreeKitty}
        getKittiesByPageAC={getKittiesByPageAC}
        page={page}
        loading={loading}
        increasePageAC={increasePageAC}
        hasMore={hasMore}
      />
      {/* <Catalogue kitties={myKitties} haveFreeKitty={haveFreeKitty} /> */}
    </div>
  )
}

export default MyKittiesPage
