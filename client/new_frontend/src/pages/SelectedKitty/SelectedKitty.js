import React, { useContext } from 'react'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import { getColor } from '../Factory/colors'
import {
  getAnimationName,
  getDecorationName,
  getEyesShapeName,
} from '../Factory/helpers'
import { Kitty } from '../Factory/Kitty'
import TradeKitty from './TradeKitty'
import './selected_kitty.css'

function SelectedKitty({
  selectedKitty,
  dispatch,
  dna,
  ownThisKitty,
  price,
  id,
  onSale,
}) {
  const { connectedAccount, login } = useContext(Web3Context)

  return (
    <div className='selectedKitty'>
      <div className='selectedKitty__kittyContainer'>
        <div
          style={{ backgroundColor: getColor(dna.eyesClr) }}
          className='selectedKitty__background'></div>
        <div className='selected_kitty__kitty'>
          <Kitty dna={dna} />
        </div>
      </div>
      <div className='selectedKitty__infoContainer'>
        <div className='selectedKitty__section'>
          <h1>Kitty #{id}</h1>
          <div className='selectedKitty__info__details'>
            <div>
              <span>DNA: {selectedKitty.genes}</span>
              <span className='ml_1rem'>Gen: {selectedKitty.generation}</span>
            </div>
            <span>Owner: 0x34...E08</span>
          </div>
        </div>

        <div className='selectedKitty__section'>
          <h1>Cattributes</h1>
          <div className='selectedKitty__cattributes'>
            <div>
              <span className='bold'>Eyes: </span>
              {getEyesShapeName(dna.eyesShape)}
            </div>
            <div>
              <span className='bold'>Animation: </span>
              {getAnimationName(dna.animation)}
            </div>
            <div>
              <span className='bold'>Decoration: </span>
              {getDecorationName(dna.decoration)}
            </div>
          </div>
        </div>

        <div className='selectedKitty__section'>
          <h1>Trading</h1>
          <div className='selectedKitty__saleInput'>
            {connectedAccount !== 0 ? (
              <TradeKitty
                ownThisKitty={ownThisKitty}
                price={price}
                id={id}
                dispatch={dispatch}
                onSale={onSale}
              />
            ) : (
              <button
                onClick={login}
                style={{ marginTop: '1rem' }}
                className='button--white'>
                Connect wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectedKitty
