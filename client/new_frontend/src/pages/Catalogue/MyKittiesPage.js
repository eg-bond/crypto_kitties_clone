import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  kittiePrices,
  page,
  myKitties,
  haveFreeKitty,
  dispatch,
}) {
  const { connectedAccount, login, kittyContract, currentChainName } =
    useContext(Web3Context)

  useEffect(() => {
    if (connectedAccount && currentChainName === options.baseChain) {
      getOwnedKittiesIds(kittyContract, connectedAccount).then(payload =>
        dispatch({ type: 'SET_KITTIES_IDS_OWNED', payload })
      )
    }
  }, [])

  const { loading, hasMore } = useGetKittiesByPage(
    page,
    kittieIdsOwned,
    kittyContract,
    dispatch
  )

  let navigate = useNavigate()
  const selectKitty = id => {
    navigate(`/selected_kitty/${id}`)
  }

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

  return (
    <div className='MyKittiesPage'>
      <Heading title={'My kitties'} />
      <Catalogue
        kitties={myKitties}
        kittiePrices={kittiePrices}
        haveFreeKitty={haveFreeKitty}
        page={page}
        loading={loading}
        hasMore={hasMore}
        dispatch={dispatch}
        onClickHandler={selectKitty}
        mode={'MyKitties'}
      />
    </div>
  )
}

export default MyKittiesPage
