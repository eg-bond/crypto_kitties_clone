import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { shortenAccount } from '../../helpers'

import { Web3Context } from '../Web3/Web3Provider'
import './navigation.css'

const NavItem = ({ url, title }) => (
  <NavLink
    to={url}
    className={({ isActive }) => 'fill_button' + (isActive ? ' active' : '')}>
    {title}
  </NavLink>
)

const Navigation = () => {
  const { connectedAccount } = useContext(Web3Context)

  return (
    <nav role='navigation' className='navigation'>
      <div className={'navigation__homeLink'}>
        {/* this NavItem title in the 'content' area in CSS */}
        <NavItem url='/' title='' />
      </div>
      <div className={'navigation__menu'}>
        <NavItem url='marketplace' title='Marketplace' />
        {connectedAccount !== 0 && (
          <>
            <NavItem url='my_kitties' title='My kitties' />
            <NavItem url='breed' title='Breed' />
          </>
        )}
        <NavItem url='factory' title='Factory' />
        <ConnectButton />
      </div>
    </nav>
  )
}

function ConnectButton() {
  const { connectedAccount, login, logout } = useContext(Web3Context)

  return (
    <>
      {connectedAccount ? (
        <div className='connectButton connectButton--logout'>
          <div onClick={logout} class='connectButton__content'>
            {connectedAccount && (
              <span>{shortenAccount(connectedAccount, 4)}</span>
            )}
            {/* <span>{shortAccount()}</span> */}
            <span>Logout</span>
          </div>
        </div>
      ) : (
        <div onClick={login} className='connectButton connectButton--login'>
          Login
        </div>
      )}
    </>
  )
}

export default Navigation
