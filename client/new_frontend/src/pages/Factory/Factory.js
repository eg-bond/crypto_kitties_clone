import React, { useState } from 'react'
import './cats.css'
import { getColor } from './colors'
import './colors.css'
import './eyes.css'
import './animations.css'
import './decoration.css'
import {
  getAnimationClasses,
  getDecorationClasses,
  getEyesShapeClass,
} from './helpers'

function Factory() {
  const defaultKittyDNA = {
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
          <span> {dna.eyesShape}</span>
        </div>
        {rangeInput('eyesShape', 0, 9)}
        <div>
          <span>Decoration pattern</span>
          <span> {dna.decoration}</span>
        </div>
        {rangeInput('decoration', 0, 9)}

        <div>Decoration color pattern</div>

        <div>
          <span>Middle color</span>
          <span> {dna.middleDotClr}</span>
        </div>
        {rangeInput('middleClr', 0, 99)}

        <div>
          <span>Sides color</span>
          <span> {dna.middleDotClr}</span>
        </div>
        {rangeInput('sidesClr', 0, 99)}

        <div>
          <span>Animation</span>
          <span> {dna.animation}</span>
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
        <KittyEars
          earsClr={getColor(dna.ears_pawClr)}
          animationClasses={getAnimationClasses(dna.animation)}
        />

        <KittyHead
          headClr={getColor(dna.head_bodyClr)}
          eyesClr={getColor(dna.eyesClr)}
          mouthClr={getColor(dna.mouth_belly_tailClr)}
          middleDotClr={getColor(dna.middleDotClr)}
          sideDotsClr={getColor(dna.sideDotsClr)}
          eyesShapeClass={getEyesShapeClass(dna.eyesShape)}
          animationClasses={getAnimationClasses(dna.animation)}
          decorationClasses={getDecorationClasses(dna.decoration)}
        />

        <KittyBody
          bodyClr={getColor(dna.head_bodyClr)}
          pawClr={getColor(dna.ears_pawClr)}
          belly_tailClr={getColor(dna.mouth_belly_tailClr)}
          animationClasses={getAnimationClasses(dna.animation)}
        />
      </div>
    </>
  )
}

function KittyEars({ earsClr, animationClasses }) {
  const { leftEarAnimation, rightEarAnimation } = animationClasses
  return (
    <div className='cat__ear'>
      <div
        className={`cat__ear--left ${leftEarAnimation}`}
        style={{ backgroundColor: earsClr }}>
        <div className='cat__ear--left-inside'></div>
      </div>
      <div
        className={`cat__ear--right ${rightEarAnimation}`}
        style={{ backgroundColor: earsClr }}>
        <div className='cat__ear--right-inside'></div>
      </div>
    </div>
  )
}

function KittyHead({
  headClr,
  eyesClr,
  mouthClr,
  middleDotClr,
  sideDotsClr,
  eyesShapeClass,
  animationClasses,
  decorationClasses,
}) {
  const { headAnimation } = animationClasses
  const { midDotDecoration, leftDotDecoration, rightDotDecoration } =
    decorationClasses
  return (
    <div
      id='head'
      className={`cat__head ${headAnimation}`}
      style={{ backgroundColor: headClr }}>
      <div
        id='midDot'
        className={`cat__head-dots ${midDotDecoration}`}
        style={{ backgroundColor: middleDotClr }}>
        <div
          id='leftDot'
          className={`cat__head-dots_first ${leftDotDecoration}`}
          style={{ backgroundColor: sideDotsClr }}></div>
        <div
          id='rightDot'
          className={`cat__head-dots_second ${rightDotDecoration}`}
          style={{ backgroundColor: sideDotsClr }}></div>
      </div>
      <div className='cat__eye'>
        <div className={`cat__eye--left`}>
          <span
            className={`pupil-left ${eyesShapeClass}`}
            style={{ backgroundColor: eyesClr }}></span>
        </div>
        <div className='cat__eye--right'>
          <span
            className={`pupil-right ${eyesShapeClass}`}
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

function KittyBody({ bodyClr, pawClr, belly_tailClr, animationClasses }) {
  const { tailAnimation } = animationClasses

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
        className={`cat__tail ${tailAnimation}`}
        style={{ backgroundColor: belly_tailClr }}></div>
    </div>
  )
}

export default Factory
