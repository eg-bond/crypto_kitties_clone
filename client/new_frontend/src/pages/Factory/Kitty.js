import React from 'react'
import { getColor } from './colors'
import {
  getAnimationClasses,
  getDecorationClasses,
  getEyesShapeClass,
} from './helpers'
import './cats.css'
import './colors.css'
import './eyes.css'
import './animations.css'
import './decoration.css'

export function Kitty({ dna }) {
  console.log('dna', dna)
  return (
    <>
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
