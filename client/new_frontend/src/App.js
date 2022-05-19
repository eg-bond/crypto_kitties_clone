import './App.css'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/Index/IndexPage'
import Breed from './pages/Breed/Breed'
import Factory from './pages/Factory/Factory'
import CatalogueContainer from './pages/Catalogue/CatalogueContainer'
import React, { useContext, useEffect, useReducer } from 'react'
import { Web3Context } from './OtherComponents/Web3/Web3Provider'
import SelectedKitty from './pages/SelectedKitty/SelectedKitty'
import { getOwnedKitties } from './helpers'
import { initialState, reducer } from './storage/mainReduser'
import Navigation from './OtherComponents/Navigation/Navigation'
import Footer from './OtherComponents/Footer/Footer'
import MarketplacePage from './pages/Marketplace/MarketplacePage'
import SelectedKittyContainer from './pages/SelectedKitty/SelectedKittyContainer'

function AppInit() {
  const { web3, kittyContract, connectedAccount, currentChainName } =
    useContext(Web3Context)

  return (
    <App
      web3={web3}
      kittyContract={kittyContract}
      connectedAccount={connectedAccount}
      currentChainName={currentChainName}
    />
  )
}

function App({ web3, kittyContract, connectedAccount, currentChainName }) {
  const [kittiesState, dispatch] = useReducer(reducer, initialState)

  // useEffect(() => {
  //   if (currentChainName !== 'ganache') {
  //     handleNetworkSwitch('ganache')
  //   }
  // }, [currentChainName])

  useEffect(() => {
    if (connectedAccount && currentChainName === 'ganache') {
      getOwnedKitties(kittyContract, connectedAccount, dispatch)
      //checks, if user got his free kitty or not
      kittyContract.methods
        .alreadyGotFreeKitty(connectedAccount)
        .call()
        .then(payload => dispatch({ type: 'SET_HAVE_FREE_KITTY', payload }))
    }
  }, [connectedAccount, currentChainName])

  return (
    <div className='App'>
      <Navigation />
      {/* <div className='separator'></div> */}
      <div className='mainContainer flex-wrapper'>
        <Routes>
          <Route
            path='/'
            element={
              <IndexPage
                haveFreeKitty={kittiesState.haveFreeKitty}
                kitties={kittiesState.myKitties}
                kittiesOnSale={kittiesState.kittiesOnSale}
                kittieIdsOnSale={kittiesState.kittieIdsOnSale}
                dispatch={dispatch}
              />
            }
          />
          <Route
            path='factory'
            element={<Factory haveFreeKitty={kittiesState.haveFreeKitty} />}
          />
          <Route
            path='catalogue'
            element={
              <CatalogueContainer
                myKitties={kittiesState.myKitties}
                haveFreeKitty={kittiesState.haveFreeKitty}
                dispatch={dispatch}
              />
            }
          />
          <Route
            path='marketplace'
            element={
              <MarketplacePage
                kittiesOnSale={kittiesState.kittiesOnSale}
                kittieIdsOnSale={kittiesState.kittieIdsOnSale}
                dispatch={dispatch}
              />
            }
          />
          <Route
            path='breed'
            element={
              <Breed
                myKitties={kittiesState.myKitties}
                dispatch={dispatch}
                breed={kittiesState.breed}
              />
            }
          />
          <Route
            path='selected_kitty/:id'
            element={
              <SelectedKittyContainer
                myKitties={kittiesState.myKitties}
                kittieIdsOnSale={kittiesState.kittieIdsOnSale}
                dispatch={dispatch}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default AppInit
