import React from 'react'
import { getColor } from '../Factory/colors'
import { defaultKittyDNA } from '../Factory/Factory'
import {
  getAnimationName,
  getDecorationName,
  getEyesShapeName,
} from '../Factory/helpers'
import { Kitty } from '../Factory/Kitty'

import './catalogue.css'

function Catalogue({ arr, kitties }) {
  return (
    <div className='catalogue'>
      <div className='kitties'>
        {kitties.map(dnaString => (
          <KittieItem key={Math.random() * 10} dnaString={dnaString} />
        ))}
      </div>
    </div>
  )
}

function KittieItem({ dnaString }) {
  const dna = parseGenes(dnaString)

  return (
    <div
      className='kittyContainer'
      style={{ backgroundColor: getColor(dna.eyesClr) }}>
      <div className='kittyContainerContent'>
        <div className='kitty'>
          <Kitty dna={dna} />
        </div>
        <div className='info'>
          <p>• Genes: {dnaString}</p>
          <p>• {getEyesShapeName(dna.eyesShape)} eyes</p>
          <p>• {getAnimationName(dna.animation)} animation</p>
          <p>• {getDecorationName(dna.decoration)} decoration</p>
        </div>
      </div>
    </div>
  )
}

function parseGenes(dnaString) {
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
