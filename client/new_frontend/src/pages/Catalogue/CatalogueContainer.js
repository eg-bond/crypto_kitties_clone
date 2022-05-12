import React from 'react'
import Catalogue from './Catalogue'

import './catalogue.css'

function CatalogueContainer({ myKitties }) {
  return <Catalogue kitties={myKitties} />
}

export default CatalogueContainer
