import React from 'react'
import { Link } from 'react-router-dom'
import './index_page.css'

function IndexPage() {
  return (
    <div className='mainIndexContainer'>
      <Link to='marketplace'>Get your own kitty</Link>
    </div>
  )
}

export default IndexPage
