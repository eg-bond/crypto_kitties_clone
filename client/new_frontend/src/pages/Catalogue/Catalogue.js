import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import SceletonCatalogue from './SceletonCatalogue'
import { AdditionalItem, KittieItem } from './CatalogueParts'
import './catalogue.css'

export function Catalogue({
  haveFreeKitty = false,
  howMuchToDisplay = 'all',
  kitties,
}) {
  const { currentChainName } = useContext(Web3Context)
  let navigate = useNavigate()
  let { pathname } = useLocation()

  const selectKitty = id => {
    navigate(`/selected_kitty/${id}`)
  }

  if (currentChainName !== 'ganache') {
    return <SceletonCatalogue howMuchToDisplay={howMuchToDisplay} />
  }

  return (
    <div className='catalogue'>
      {Object.keys(kitties).map(id => (
        <KittieItem
          key={Math.random() * 10}
          dnaString={kitties[id].genes}
          generation={kitties[id].generation}
          onClickHandler={selectKitty}
          id={id}
        />
      ))}
      {pathname === '/my_kitties' && (
        <AdditionalItem haveFreeKitty={haveFreeKitty} kitties={kitties} />
      )}
    </div>
  )
}

export default Catalogue
