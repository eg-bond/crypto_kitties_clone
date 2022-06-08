import React, { useContext } from 'react'
import Heading from '../../OtherComponents/Heading/Heading'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import Catalogue from './Catalogue'

import './catalogue.css'

function MyKittiesPage({ myKitties, haveFreeKitty }) {
  const { connectedAccount, login } = useContext(Web3Context)

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
      <Catalogue kitties={myKitties} haveFreeKitty={haveFreeKitty} />
    </div>
  )
}

export default MyKittiesPage
