import React, { useContext, useEffect } from 'react'
import { getColor } from '../Factory/colors'
import { defaultKittyDNA } from '../Factory/Factory'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Kitty } from '../Factory/Kitty'

import './catalogue.css'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import { Skeleton } from 'web3uikit'

export function Catalogue({ haveFreeKitty, kitties }) {
  let navigate = useNavigate()
  let { pathname } = useLocation()

  const selectKitty = id => {
    navigate(`/selected_kitty/${id}`)
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
      {pathname === '/catalogue' && (
        <AdditionalItem haveFreeKitty={haveFreeKitty} kitties={kitties} />
      )}
    </div>
  )
}
//   return (
//     <div className='catalogue'>
//       {/* {pathname === '/catalogue' && (
//         <div className='headerContainer'>
//           <h1>Your kitties</h1>
//         </div>
//       )} */}
//       <div className='kitties'>
//         {Object.keys(kitties).map(id => (
//           <KittieItem
//             key={Math.random() * 10}
//             dnaString={kitties[id].genes}
//             generation={kitties[id].generation}
//             onClickHandler={selectKitty}
//             id={id}
//           />
//         ))}
//         {pathname === '/catalogue' && (
//           <AdditionalItem haveFreeKitty={haveFreeKitty} kitties={kitties} />
//         )}
//       </div>
//     </div>
//   )
// }

function AdditionalItem({ haveFreeKitty, kitties }) {
  if (!haveFreeKitty) {
    return (
      <Link to={'/factory'} className='kittyContainer catalogue__additional'>
        <div className='catalogue__additional__sign'>
          <div className='plus'>
            <span className='plus__horizontal'></span>
            <span className='plus__vertical'></span>
          </div>
        </div>
        Get Your free kitty
      </Link>
    )
  }
  if (Object.keys(kitties).length === 0) {
    return (
      <Link
        to={'/marketplace'}
        className='kittyContainer catalogue__additional'>
        <div className='catalogue__additional__sign'>
          <div className='plus'>
            <span className='plus__horizontal'></span>
            <span className='plus__vertical'></span>
          </div>
        </div>
        Buy kitty
      </Link>
    )
  }
}

export function KittieItem({ dnaString, onClickHandler, generation, id }) {
  const dna = parseGenes(dnaString)

  return (
    <div className='kittyContainer'>
      <div
        className='containerBackground'
        style={{ backgroundColor: getColor(dna.eyesClr) }}></div>
      <div onClick={() => onClickHandler(id)} className='kittyContainerContent'>
        <div className='kitty'>
          <Kitty dna={dna} />
        </div>
        <div className='kitty__info'>
          <div className='kitty__info__head'># {id}</div>
          <div className='kitty__info__details'>
            <span>DNA: {dnaString}</span>
            <span>Gen: {generation}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function parseGenes(dnaString) {
  const lengths = Object.values(defaultKittyDNA).map(num => num.length)
  const dnaObj = {}
  // temporary measure for 0 dna
  if (dnaString === '0') {
    return defaultKittyDNA
  }

  Object.keys(defaultKittyDNA).reduce((start, key, i) => {
    dnaObj[key] = dnaString.substr(start, lengths[i])
    return start + lengths[i]
  }, 0)

  return dnaObj
}

export default Catalogue
