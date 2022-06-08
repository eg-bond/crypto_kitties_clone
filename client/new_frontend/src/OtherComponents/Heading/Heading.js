import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'web3uikit'
import { options } from '../../options'
import { Web3Context } from '../Web3/Web3Provider'
import './heading.css'

function Heading({
  title,
  linkTitle = null,
  goTo = null,
  additionalClasses = null,
}) {
  const { currentChainName } = useContext(Web3Context)

  return (
    <div className='headerContainer'>
      <h2>{title}</h2>
      {currentChainName !== options.baseChain ? (
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

export default Heading
