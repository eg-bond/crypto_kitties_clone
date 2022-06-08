import React, { useContext } from 'react'
import Heading from '../../OtherComponents/Heading/Heading'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import Catalogue from './Catalogue'

import './catalogue.css'

function CatalogueContainer({ myKitties, haveFreeKitty }) {
  const { connectedAccount, login } = useContext(Web3Context)

  if (connectedAccount === 0) {
    return (
      <div className='cataloguePage'>
        <Heading title={'Your kitties'} />
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
    <div className='cataloguePage'>
      <Heading title={'Your kitties'} />
      <Catalogue kitties={myKitties} haveFreeKitty={haveFreeKitty} />
    </div>
  )
}

export default CatalogueContainer
