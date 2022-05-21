import React, { useContext, useState } from 'react'
import {
  getAnimationName,
  getDecorationName,
  getEyesShapeName,
} from './helpers'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import { Kitty } from './Kitty'
import './factory.css'
import { getColor } from './colors'
import { Button } from 'web3uikit'
import Header from '../../OtherComponents/Header/Header'

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
  someProp: '1',
}

function Factory({ haveFreeKitty }) {
  const { kittyContract, connectedAccount, login, currentChainName } =
    useContext(Web3Context)

  const range9keys = ['eyesShape', 'decoration', 'animation', 'someProp']

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
    const randomDNA = { ...dna }

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
    kittyContract.methods
      .createKittyGen0(genes)
      .send({ from: connectedAccount })
  }

  return (
    <div className='factory'>
      <Header title={'Factory'} />

      <div className='factory__container'>
        <div className='factory__kitty'>
          <Kitty dna={dna} />
          <div>
            <h2>Kitty DNA</h2>
            <div>
              {Object.keys(dna).map((key, i) => (
                <span key={`${i}_${key}`}>{dna[key]} </span>
              ))}
            </div>
          </div>
        </div>

        <div className='factory__settings'>
          <div className='colors'>
            <h2>Colors</h2>
            <AttributeInput
              title={'Head and body'}
              dna={dna}
              attributeName={'head_bodyClr'}
              rangeInput={rangeInput}
              rangeMax={99}
            />
            <AttributeInput
              title={'Mouth | Belly | Tail'}
              dna={dna}
              attributeName={'mouth_belly_tailClr'}
              rangeInput={rangeInput}
              rangeMax={99}
            />
            <AttributeInput
              title={'Eyes color'}
              dna={dna}
              attributeName={'eyesClr'}
              rangeInput={rangeInput}
              rangeMax={99}
            />
            <AttributeInput
              title={'Ears | Paw'}
              dna={dna}
              attributeName={'ears_pawClr'}
              rangeInput={rangeInput}
              rangeMax={99}
            />

            <div>Decoration pattern color</div>
            <div className='factory__settings__decorationColors'>
              <AttributeInput
                title={'Middle color'}
                dna={dna}
                attributeName={'middleDotClr'}
                rangeInput={rangeInput}
                rangeMax={99}
              />
              <AttributeInput
                title={'Sides color'}
                dna={dna}
                attributeName={'sideDotsClr'}
                rangeInput={rangeInput}
                rangeMax={99}
              />
            </div>
          </div>
          <div className='cattributes'>
            <h2>Cattributes</h2>
            <AttributeInput
              title={'Eyes shape'}
              dna={dna}
              attributeName={'eyesShape'}
              rangeInput={rangeInput}
              rangeMax={9}
              badgeFunc={getEyesShapeName}
            />
            <AttributeInput
              title={'Decoration pattern'}
              dna={dna}
              attributeName={'decoration'}
              rangeInput={rangeInput}
              rangeMax={9}
              badgeFunc={getDecorationName}
            />
            <AttributeInput
              title={'Animation'}
              dna={dna}
              attributeName={'animation'}
              rangeInput={rangeInput}
              rangeMax={9}
              badgeFunc={getAnimationName}
            />
            <AttributeInput
              title={'SomeProp'}
              dna={dna}
              attributeName={'someProp'}
              rangeInput={rangeInput}
              rangeMax={9}
            />
          </div>

          <button className='button--blue ' onClick={getRandomKitty}>
            RandomKitty
          </button>

          <button
            className='button--blue ml_1rem'
            onClick={() => setDna(defaultKittyDNA)}>
            Default kitty
          </button>
        </div>
      </div>

      {connectedAccount !== 0 ? (
        currentChainName === 'ganache' && (
          <button
            style={{ marginTop: '1rem' }}
            className='button--white'
            disabled={haveFreeKitty}
            onClick={createKitty}>
            Create Kitty
          </button>
        )
      ) : (
        <button
          onClick={login}
          style={{ marginTop: '1rem' }}
          className='button--white'>
          Connect wallet
        </button>
      )}

      {haveFreeKitty && <div>You have already gotten your free kitty</div>}
    </div>
  )
}

function AttributeInput({
  title,
  dna,
  attributeName,
  rangeInput,
  rangeMax,
  badgeFunc = null,
}) {
  return (
    <div>
      <div className='attribute__info'>
        <span>{title}</span>
        {badgeFunc ? (
          <span className='badge'> {badgeFunc(dna[attributeName])}</span>
        ) : (
          <span className='badge'> {dna[attributeName]}</span>
        )}
      </div>
      {rangeInput(attributeName, 0, rangeMax)}
    </div>
  )
}

export default Factory
