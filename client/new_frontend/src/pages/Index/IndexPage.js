import React from 'react'
import { Link } from 'react-router-dom'
import './index_page.css'

function IndexPage() {
  return (
    <div className='index'>
      <div className='landing'>
        <div className='landing__header'>
          <h1>CryptoKittiesClone</h1>
          <h3>Collect and breed furrever friends!</h3>
        </div>
        <img src='./images/group.png' alt='group' />
        <button className='landing__btn'>Get your own kitty</button>
      </div>
      <Link to='marketplace'>Get your own kitty</Link>
    </div>
  )
}

export default IndexPage
