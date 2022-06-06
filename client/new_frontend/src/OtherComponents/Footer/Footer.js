import React from 'react'
import './footer.css'

function Footer() {
  return (
    <div className='footer'>
      {/* <div className='separator'></div> */}
      <div>
        Simple CryptoKitties clone (based on Moralis Academy{' '}
        <a href='https://academy.moralis.io/courses/ethereum-dapp-programming'>
          course
        </a>
        )
      </div>

      <div>
        <a href='https://github.com/eg-bond/crypto_kitties_clone'>
          Github link
        </a>
      </div>
    </div>
  )
}

export default Footer
