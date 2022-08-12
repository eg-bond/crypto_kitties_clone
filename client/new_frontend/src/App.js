import './variables.css'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/Index/IndexPage'
import BreedPage from './pages/Breed/BreedPage'
import Factory from './pages/Factory/Factory'
import React, { useContext, useEffect, useReducer } from 'react'
import { Web3Context } from './OtherComponents/Web3/Web3Provider'
import { initialState, reducer } from './storage/mainReducer'
import Navigation from './OtherComponents/Navigation/Navigation'
import Footer from './OtherComponents/Footer/Footer'
import MarketplacePage from './pages/Marketplace/MarketplacePage'
import SelectedKittyContainer from './pages/SelectedKitty/SelectedKittyContainer'
import MyKittiesPage from './pages/Catalogue/MyKittiesPage'
import EclipseSpinner from './OtherComponents/Spinners/Eclipse/EclipseSpinner'
import { getOwnedKittiesIds } from './helpers'
import { options } from './options'

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

  // fetches for user owned kitties every time wallet is changed
  useEffect(() => {
    if (connectedAccount && currentChainName === options.baseChain) {
      //new
      getOwnedKittiesIds(kittyContract, connectedAccount).then(payload =>
        dispatch({ type: 'SET_KITTIES_IDS_OWNED', payload })
      )
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
                // kitties={kittiesState.myKitties}
                dispatch={dispatch}
                haveFreeKitty={kittiesState.haveFreeKitty}
                kittieIdsOnSale={kittiesState.kittieIdsOnSale}
                kittiePrices={kittiesState.kittiePrices}
                kittiesOnSale={kittiesState.myKitties}
                kittieIdsOwned={kittiesState.kittieIdsOwned}
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
                kittieIdsOwned={kittiesState.kittieIdsOwned}
                page={kittiesState.page}
                myKitties={kittiesState.myKitties}
                kittiePrices={kittiesState.kittiePrices}
                haveFreeKitty={kittiesState.haveFreeKitty}
                dispatch={dispatch}
              />
            }
          />
          <Route
            path='marketplace'
            element={
              <MarketplacePage
                // kittiesOnSale={kittiesState.kittiesOnSale}
                dispatch={dispatch}
                kittieIdsOnSale={kittiesState.kittieIdsOnSale}
                kittiePrices={kittiesState.kittiePrices}
                kittiesOnSale={kittiesState.myKitties}
                page={kittiesState.page}
              />
            }
          />
          <Route
            path='breed'
            element={
              <BreedPage
                kittieIdsOwned={kittiesState.kittieIdsOwned}
                myKitties={kittiesState.myKitties}
                page={kittiesState.page}
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
