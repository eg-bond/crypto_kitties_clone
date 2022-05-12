import React from 'react'
import { getColor } from '../Factory/colors'
import { defaultKittyDNA } from '../Factory/Factory'
import { Link, useNavigate } from 'react-router-dom'
import {
  getAnimationName,
  getDecorationName,
  getEyesShapeName,
} from '../Factory/helpers'
import { Kitty } from '../Factory/Kitty'

import './catalogue.css'

export function Catalogue({ arr, kitties }) {
  let navigate = useNavigate()

  const selectKitty = id => {
    navigate(`/selected_kitty/${id}`)
  }

  return (
    <div className='catalogue'>
      <Link to='/breed'>Breed</Link>
      <div className='kitties'>
        {Object.keys(kitties).map(id => (
          <KittieItem
            key={Math.random() * 10}
            dnaString={kitties[id].genes}
            generation={kitties[id].generation}
            onClickHandler={selectKitty}
            id={id}
          />
        ))}
      </div>
    </div>
  )
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
        <div className='info'>
          <p>• Genes: {dnaString}</p>
          <p>• Generation: {generation}</p>
          <p>• {getEyesShapeName(dna.eyesShape)} eyes</p>
          <p>• {getAnimationName(dna.animation)} animation</p>
          <p>• {getDecorationName(dna.decoration)} decoration</p>
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
