import { Link } from 'react-router-dom'
import { getColor } from '../Factory/colors'
import { defaultKittyDNA } from '../Factory/Factory'
import { Kitty } from '../Factory/Kitty'
import { pageCapacity } from './MyKittiesPage'

export function KittieItem({
  dnaString,
  onClickHandler,
  generation,
  id,
  index,
  price,
}) {
  const dna = parseGenes(dnaString)

  const delay = 0.05 * (index % pageCapacity)

  return (
    <div
      className={'kittyContainer'}
      style={{ animationDelay: delay.toString() + 's' }}>
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
          {price && <div>{price}</div>}
        </div>
      </div>
    </div>
  )
}

export function AdditionalItem({ haveFreeKitty, kitties }) {
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
