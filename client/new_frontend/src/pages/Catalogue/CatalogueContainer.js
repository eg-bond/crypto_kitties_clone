import React from 'react'
import Catalogue from './Catalogue'

import './catalogue.css'

function CatalogueContainer({ myKitties, haveFreeKitty }) {
  return <Catalogue kitties={myKitties} haveFreeKitty={haveFreeKitty} />
}

export default CatalogueContainer
