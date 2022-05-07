import React, { useContext, useEffect, useReducer } from 'react'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import Catalogue from './Catalogue'

import './catalogue.css'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_KITTIES':
      return [...action.payload]

    default:
      return state
  }
}

function CatalogueContainer() {
  const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]

  const { web3, kittyContract, selectedAccount } = useContext(Web3Context)

  const [kittiesState, dispatch] = useReducer(reducer, [])

  const getKitties = async () => {
    if (selectedAccount) {
      const kittyIds = await kittyContract.methods
        .getKittyByOwner(selectedAccount)
        .call({ from: selectedAccount })
      // .then(kittyIds => {
      //   console.log(kittyIds)
      // })
      const promises = []
      kittyIds.forEach(id =>
        promises.push(
          kittyContract.methods
            .getKitty(id)
            .call({ from: selectedAccount })
            .then(kittyObj => kittyObj.genes)
        )
      )
      Promise.all(promises).then(genesArray => {
        dispatch({ type: 'SET_KITTIES', payload: genesArray })
      })
    }
  }

  useEffect(() => {
    getKitties()
  }, [selectedAccount])

  return (
    <>
      <Catalogue arr={arr} kitties={kittiesState} />
    </>
  )
}

export default CatalogueContainer
