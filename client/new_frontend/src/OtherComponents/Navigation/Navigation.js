import React from 'react'
import { NavLink } from 'react-router-dom'
import './navigation.css'

const NavItem = ({ url, title }) => (
  <NavLink
    to={url}
    className={({ isActive }) => 'fill_button' + (isActive ? ' active' : '')}>
    {title}
  </NavLink>
)

const Navigation = () => {
  return (
    <nav role='navigation' className='navigation'>
      <div className={'navigation__homeLink'}>
        <NavItem url='/' title='CryptoKittiesClone' />
      </div>
      <div className={'navigation__menu'}>
        <NavItem url='marketplace' title='Marketplace' />
        <NavItem url='catalogue' title='Your kitties' />
        <NavItem url='factory' title='Factory' />
        <button>Connect wallet</button>
      </div>
    </nav>
  )
}

export default Navigation
