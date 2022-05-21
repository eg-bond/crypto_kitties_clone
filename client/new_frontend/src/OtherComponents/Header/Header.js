import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'web3uikit'
import { Web3Context } from '../Web3/Web3Provider'
import './header.css'

function Header({
  title,
  linkTitle = null,
  goTo = null,
  additionalClasses = null,
}) {
  const { currentChainName } = useContext(Web3Context)

  return (
    <div className='headerContainer'>
      <h1>{title}</h1>
      {currentChainName !== 'ganache' ? (
        <Button
          color='red'
          icon='exclamation'
          iconLayout='leading'
          id='test-button-primary'
          // switch network onclick
          onClick={function noRefCheck() {}}
          size='large'
          text='Please switch the network'
          theme='colored'
          type='button'
        />
      ) : (
        goTo !== null && (
          <Link className='button--white' to={goTo}>
            {linkTitle}
          </Link>
        )
      )}
    </div>
  )
}

export default Header
