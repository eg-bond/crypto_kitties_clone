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

const initialState = {
  myKitties: {},
  kittiesForSale: {},
  breed: { dame: null, sire: null },
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_KITTIES':
      return { ...state, myKitties: { ...action.payload } }
    case 'CHOSE_KITTY_FOR_BREED':
      const { id, role } = action.payload

      // if kitty is already chosen for breed as other parent
      if (Object.values(state.breed).includes(id)) {
        return { ...state, breed: { ...initialState.breed, [role]: id } }
      }
      return { ...state, breed: { ...state.breed, [role]: id } }

    default:
      return state
  }
}

function App() {
  const [kittiesState, dispatch] = useReducer(reducer, initialState)

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
            .then(kittyObj => {
              return { [id]: kittyObj }
            })
        )
      )
      Promise.all(promises).then(kittiesArray => {
        let payload = {}
        kittiesArray.forEach(
          indexedKittyObj => (payload = { ...payload, ...indexedKittyObj })
        )
        dispatch({ type: 'SET_KITTIES', payload })
      })
    }
  }

  useEffect(() => {
    getKitties()
  }, [selectedAccount])

  // console.log(kittiesState)
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
                kittiesState={kittiesState.myKitties}
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
        </Routes>
      </div>
    </div>
  )
}

export default App
