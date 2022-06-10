import './variables.css'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/Index/IndexPage'
import BreedPage from './pages/Breed/BreedPage'
import Factory from './pages/Factory/Factory'
import React, { useContext, useEffect, useReducer } from 'react'
import { Web3Context } from './OtherComponents/Web3/Web3Provider'
import { getOwnedKitties } from './helpers'
import { initialState, reducer } from './storage/mainReduser'
import Navigation from './OtherComponents/Navigation/Navigation'
import Footer from './OtherComponents/Footer/Footer'
import MarketplacePage from './pages/Marketplace/MarketplacePage'
import SelectedKittyContainer from './pages/SelectedKitty/SelectedKittyContainer'
import MyKittiesPage from './pages/Catalogue/MyKittiesPage'
import { options } from './options'
import EclipseSpinner from './OtherComponents/Spinners/Eclipse/EclipseSpinner'

function AppInit() {
  const { kittyContract, connectedAccount, currentChainName } =
    useContext(Web3Context)

  if (connectedAccount === 'notSet' || currentChainName === 'notSet') {
    return <EclipseSpinner />
  }

  return (
    <App
      kittyContract={kittyContract}
      connectedAccount={connectedAccount}
      currentChainName={currentChainName}
    />
  )
}

function App({ kittyContract, connectedAccount, currentChainName }) {
  const [kittiesState, dispatch] = useReducer(reducer, initialState)
  window.state = kittiesState
  // useEffect(() => {
  //   if (currentChainName !== options.baseChain) {
  //     handleNetworkSwitch(options.baseChain)
  //   }
  // }, [currentChainName])

  useEffect(() => {
    if (connectedAccount && currentChainName === options.baseChain) {
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
            element={
              <Factory
                haveFreeKitty={kittiesState.haveFreeKitty}
                dispatch={dispatch}
              />
            }
          />
          <Route
            path='my_kitties'
            element={
              <MyKittiesPage
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
              <BreedPage
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
