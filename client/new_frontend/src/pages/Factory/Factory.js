import React, { useState } from 'react'
import './cats.css'
import { getColor } from './colors'
import './colors.css'

function Factory() {
  const defaultKittyDNA = {
    head_bodyClr: '10',
    mouth_belly_tailClr: '13',
    eyesClr: '76',
    ears_pawClr: '10',
    eyesShape: '1',
    decoration: '1',
    middleClr: '13',
    sidesClr: '13',
    animation: '1',
  }
  const [dna, setDna] = useState(defaultKittyDNA)

  const handleSetDNA = (field, value) => {
    if (value.length < 2) {
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
    const range9keys = ['eyesShape', 'decoration', 'animation']
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

  return (
    <div className='factory'>
      <h1>Factory</h1>
      <div className='colors'>
        <h2>Colors</h2>
        <div>Head and body</div>
        {rangeInput('head_bodyClr', 0, 99)}
        <div>Mouth | Belly | Tail</div>
        {rangeInput('mouth_belly_tailClr', 0, 99)}
        <div>Eyes color</div>
        {rangeInput('eyesClr', 0, 99)}
        <div>Ears | Paw</div>
        {rangeInput('ears_pawClr', 0, 99)}
      </div>
      <div className='cattributes'>
        <h2>Cattributes</h2>
        <div>Eyes shape</div>
        {rangeInput('eyesShape', 0, 9)}
        <div>Decoration pattern</div>
        {rangeInput('decoration', 0, 9)}

        <div>Decoration color pattern</div>
        <div>Middle color</div>
        {rangeInput('middleClr', 0, 99)}
        <div>Sides color</div>
        {rangeInput('sidesClr', 0, 99)}
        <div>Animation</div>
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
      <button>Create Kitty</button>

      {/* kitty itself */}
      <Kitty dna={dna} />
    </div>
  )
}

function Kitty({ dna }) {
  return (
    <>
      <h1>Kitty</h1>
      <div className='cat'>
        <KittyEars earsClr={getColor(dna.ears_pawClr)} />

        <KittyHead
          headClr={getColor(dna.head_bodyClr)}
          eyesClr={getColor(dna.eyesClr)}
          mouthClr={getColor(dna.mouth_belly_tailClr)}
          eyesShape={dna.eyesShape}
        />

        <KittyBody
          bodyClr={getColor(dna.head_bodyClr)}
          pawClr={getColor(dna.ears_pawClr)}
          belly_tailClr={getColor(dna.mouth_belly_tailClr)}
        />
        {/* const defaultKittyDNA = {
          head_bodyClr: '10',
          mouth_belly_tailClr: '13',
          eyesClr: '76',
          ears_pawClr: '10',
          eyesShape: '1',
          decoration: '1',
          middleClr: '13',
          sidesClr: '13',
          animation: '1',
        } */}
      </div>
    </>
  )
}

function KittyEars({ earsClr }) {
  return (
    <div className='cat__ear'>
      <div className='cat__ear--left' style={{ backgroundColor: earsClr }}>
        <div className='cat__ear--left-inside'></div>
      </div>
      <div className='cat__ear--right' style={{ backgroundColor: earsClr }}>
        <div className='cat__ear--right-inside'></div>
      </div>
    </div>
  )
}

function KittyHead({ headClr, eyesClr, mouthClr, eyesShape }) {
  return (
    <div id='head' className='cat__head' style={{ backgroundColor: headClr }}>
      <div id='midDot' className='cat__head-dots'>
        <div id='leftDot' className='cat__head-dots_first'></div>
        <div id='rightDot' className='cat__head-dots_second'></div>
      </div>
      <div className='cat__eye'>
        <div className={`cat__eye--left eyesType${}`}>
          <span
            className='pupil-left'
            style={{ backgroundColor: eyesClr }}></span>
        </div>
        <div className='cat__eye--right'>
          <span
            className='pupil-right'
            style={{ backgroundColor: eyesClr }}></span>
        </div>
      </div>
      <div className='cat__nose'></div>

      <div
        className='cat__mouth-contour'
        style={{ backgroundColor: mouthClr }}></div>
      <div className='cat__mouth-left'></div>
      <div className='cat__mouth-right'></div>

      <div className='cat__whiskers-left'></div>
      <div className='cat__whiskers-right'></div>
    </div>
  )
}

function KittyBody({ bodyClr, pawClr, belly_tailClr }) {
  return (
    <div className='cat__body'>
      <div className='cat__chest' style={{ backgroundColor: bodyClr }}></div>

      <div
        className='cat__chest_inner'
        style={{ backgroundColor: belly_tailClr }}></div>

      <div className='cat__paw-left' style={{ backgroundColor: pawClr }}></div>
      <div
        className='cat__paw-left_inner'
        style={{ backgroundColor: pawClr }}></div>

      <div className='cat__paw-right' style={{ backgroundColor: pawClr }}></div>
      <div
        className='cat__paw-right_inner'
        style={{ backgroundColor: pawClr }}></div>

      <div
        id='tail'
        className='cat__tail'
        style={{ backgroundColor: belly_tailClr }}></div>
    </div>
  )
}

export default Factory
