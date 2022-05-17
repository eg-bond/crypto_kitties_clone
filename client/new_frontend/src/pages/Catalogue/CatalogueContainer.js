import React from 'react'
import Catalogue from './Catalogue'

import './catalogue.css'

function CatalogueContainer({ myKitties, haveFreeKitty }) {
  return (
    <div className='cataloguePage'>
      <div className='headerContainer'>
        <h1>Your kitties</h1>
      </div>
      <Catalogue kitties={myKitties} haveFreeKitty={haveFreeKitty} />
    </div>
  )
}

export default CatalogueContainer
