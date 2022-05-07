import React, { useContext, useState } from 'react'

import { getColor } from './colors'

import {
  getAnimationClasses,
  getAnimationName,
  getDecorationClasses,
  getDecorationName,
  getEyesShapeClass,
  getEyesShapeName,
} from './helpers'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import { Kitty } from './Kitty'

export const defaultKittyDNA = {
  head_bodyClr: '10',
  mouth_belly_tailClr: '13',
  eyesClr: '76',
  ears_pawClr: '10',
  eyesShape: '1',
  decoration: '1',
  middleDotClr: '13',
  sideDotsClr: '13',
  animation: '1',
}

function Factory() {
  const { web3, kittyContract, selectedAccount } = useContext(Web3Context)

  const range9keys = ['eyesShape', 'decoration', 'animation']

  const [dna, setDna] = useState(defaultKittyDNA)

  const handleSetDNA = (field, value) => {
    if (!range9keys.includes(field) & (value.length < 2)) {
      value = '0' + value
    }

    const updatedField = { [field]: value }
    setDna(prevDNA => ({
      ...prevDNA,
      ...updatedField,
    }))
  }

  function rangeInput(field, min, max) {
    return (
      <input
        value={dna[field]}
        onMouseUp={e => handleSetDNA(field, e.target.value)}
        onChange={e => handleSetDNA(field, e.target.value)}
        type='range'
        min={min}
        max={max}
      />
    )
  }

  const getRandomKitty = () => {
    const randomDNA = dna

    Object.keys(randomDNA).forEach(key => {
      randomDNA[key] = Math.ceil(Math.random() * 99)
      if (range9keys.includes(key)) {
        randomDNA[key] = Math.floor(randomDNA[key] / 10)
      }
      if (!range9keys.includes(key) & (randomDNA[key].toString().length < 2)) {
        randomDNA[key] = '0' + randomDNA[key]
      }
    })
    setDna({ ...randomDNA })
  }

  const createKitty = () => {
    const genes = Number(Object.values(dna).join(''))
    console.log(genes)
    console.log(typeof genes)
    kittyContract.methods.createKittyGen0(genes).send({ from: selectedAccount })
  }

  return (
    <div className='factory'>
      <h1>Factory</h1>
      <div className='colors'>
        <h2>Colors</h2>
        <div>
          <span>Head and body</span>
          <span> {dna.head_bodyClr}</span>
        </div>
        {rangeInput('head_bodyClr', 0, 99)}
        <div>
          <span>Mouth | Belly | Tail</span>
          <span> {dna.mouth_belly_tailClr}</span>
        </div>
        {rangeInput('mouth_belly_tailClr', 0, 99)}
        <div>
          <span>Eyes color</span>
          <span> {dna.eyesClr}</span>
        </div>
        {rangeInput('eyesClr', 0, 99)}
        <div>
          <span>Ears | Paw</span>
          <span> {dna.ears_pawClr}</span>
        </div>
        {rangeInput('ears_pawClr', 0, 99)}
      </div>
      <div className='cattributes'>
        <h2>Cattributes</h2>
        <div>
          <span>Eyes shape</span>
          <span> {getEyesShapeName(dna.eyesShape)}</span>
        </div>
        {rangeInput('eyesShape', 0, 9)}
        <div>
          <span>Decoration pattern</span>
          <span> {getDecorationName(dna.decoration)}</span>
        </div>
        {rangeInput('decoration', 0, 9)}

        <div>Decoration color pattern</div>

        <div>
          <span>Middle color</span>
          <span> {dna.middleDotClr}</span>
        </div>
        {rangeInput('middleDotClr', 0, 99)}

        <div>
          <span>Sides color</span>
          <span> {dna.sideDotsClr}</span>
        </div>
        {rangeInput('sideDotsClr', 0, 99)}

        <div>
          <span>Animation</span>
          <span> {getAnimationName(dna.animation)}</span>
        </div>
        {rangeInput('animation', 0, 9)}
      </div>
      <div>
        <h2>finalDNA</h2>
        <div>
          {Object.keys(dna).map((key, i) => (
            <span key={`${i}_${key}`}>{dna[key]} </span>
          ))}
        </div>
      </div>
      <button onClick={getRandomKitty}>GetRandomKitty</button>
      <button onClick={() => setDna(defaultKittyDNA)}>Default kitty</button>
      <button onClick={createKitty}>Create Kitty</button>

      {/* kitty itself */}
      <Kitty dna={dna} />
    </div>
  )
}

export default Factory
