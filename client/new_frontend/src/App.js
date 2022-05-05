import './App.css'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import IndexPage from './pages/Index/IndexPage'
import Breed from './pages/Breed/Breed'
import Factory from './pages/Factory/Factory'

const NavItem = ({ url, title }) => (
  <li>
    <NavLink
      to={url}
      className={({ isActive }) => 'fill_button' + (isActive ? ' active' : '')}>
      {title}
    </NavLink>
  </li>
)

function App() {
  return (
    <div className='App'>
      <div className='container'>
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
      </div>

      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='factory' element={<Factory />} />
      </Routes>
    </div>
  )
}

export default App
