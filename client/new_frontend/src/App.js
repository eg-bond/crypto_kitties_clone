import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import IndexPage from './pages/Index/IndexPage'
import Breed from './pages/Breed/Breed'
import Factory from './pages/Factory/Factory'
import CatalogueContainer from './pages/Catalogue/CatalogueContainer'
import { useContext, useEffect, useReducer } from 'react'
import { Web3Context } from './OtherComponents/Web3/Web3Provider'

const NavItem = ({ url, title }) => (
  <li>
    <NavLink
      to={url}
      className={({ isActive }) => 'fill_button' + (isActive ? ' active' : '')}>
      {title}
    </NavLink>
  </li>
)
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_KITTIES':
      return [...action.payload]

    default:
      return state
  }
}

function App() {
  const [kittiesState, dispatch] = useReducer(reducer, [])

  const { web3, kittyContract, selectedAccount } = useContext(Web3Context)

  const getKitties = async () => {
    if (selectedAccount) {
      const kittyIds = await kittyContract.methods
        .getKittyByOwner(selectedAccount)
        .call({ from: selectedAccount })
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
    <div className='App'>
      <div className='mainContainer'>
        <nav role='navigation' className={'navigation'}>
          <div className={'navigation__logo'}>
            <NavItem url='/' title='CryptoKittiesClone' />
          </div>
          <div className={'navigation__menu'}>
            <ul>
              <NavItem url='/' title='Home' />
              <NavItem url='marketplace' title='Marketplace' />
              <NavItem url='catalogue' title='Catalogue' />
              <NavItem url='factory' title='K-Factory' />
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<IndexPage />} />
          <Route path='factory' element={<Factory />} />
          <Route
            path='catalogue'
            element={
              <CatalogueContainer
                kittiesState={kittiesState}
                dispatch={dispatch}
              />
            }
          />
          <Route path='breed' element={<Breed kittiesState={kittiesState} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
