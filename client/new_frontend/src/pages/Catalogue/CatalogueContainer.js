import React, { useContext, useEffect, useReducer } from 'react'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import Catalogue from './Catalogue'

import './catalogue.css'

function CatalogueContainer({ kittiesState }) {
  const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]

  return <Catalogue arr={arr} kitties={kittiesState} />
}

export default CatalogueContainer
