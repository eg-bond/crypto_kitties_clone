import React, { useContext, useEffect, useRef, useState } from 'react'
import './breed.css'
import { Modal } from 'web3uikit'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import { getOwnedKittiesIds, useGetKittiesByPage } from '../../helpers'
import Heading from '../../OtherComponents/Heading/Heading'
import { KittieItem, parseGenes } from '../Catalogue/CatalogueParts'
import { options } from '../../options'
import BreedItem from './BreedItem'
import Catalogue from '../Catalogue/Catalogue'
import { useMarketplace } from '../../OtherComponents/Web3/useMarketplace'
import EclipseSpinner from '../../OtherComponents/Spinners/Eclipse/EclipseSpinner'
import { Kitty } from '../Factory/Kitty'
import {
  getAnimationName,
  getDecorationName,
  getEyesShapeName,
} from '../Factory/helpers'

function BreedPage({ myKitties, dispatch, breed, page, kittieIdsOwned }) {
  const [visible, setVisible] = useState(false)
  const [breedingVisible, setBreedingVisible] = useState(false)
  const [breededKitty, setBreededKitty] = useState({})
  console.log('breededKitty', breededKitty)

  const breedRole = useRef()
  const { kittyContract, connectedAccount, login, currentChainName } =
    useContext(Web3Context)
  const { getKitty } = useMarketplace()

  useEffect(() => {
    if (connectedAccount && currentChainName === options.baseChain) {
      getOwnedKittiesIds(kittyContract, connectedAccount).then(payload =>
        dispatch({ type: 'SET_KITTIES_IDS_OWNED', payload })
      )
    }
  }, [])

  const { loading, hasMore } = useGetKittiesByPage(
    page,
    kittieIdsOwned,
    kittyContract,
    dispatch
  )

  const bothKittiesIsSet = () => {
    if ((breed.mother !== null) & (breed.father !== null)) {
      return true
    }
    return false
  }

  const openModal = role => {
    breedRole.current = role
    setVisible(true)
  }

  const closeBreedingModal = () => {
    setBreedingVisible(false)
    setBreededKitty({})
  }

  const handleBreeding = () => {
    setBreedingVisible(true)
    kittyContract.methods
      .breed(breed.mother.id, breed.father.id)
      .send({ from: connectedAccount })
      .on('transactionHash', () =>
        getOwnedKittiesIds(kittyContract, connectedAccount).then(payload => {
          getKitty(payload[payload.length - 1]).then(kitty =>
            setBreededKitty(kitty)
          )
          dispatch({ type: 'SET_KITTIES_IDS_OWNED', payload })
          dispatch({ type: 'ERASE_BREEDING' })
        })
      )
      .on('error', () => closeBreedingModal())
  }

  const choseKittyForBreed = (id, role = breedRole.current) => {
    dispatch({
      type: 'CHOSE_KITTY_FOR_BREED',
      payload: { id, role },
    })
    setVisible(false)
  }

  useEffect(() => {
    return () => {
      dispatch({
        type: 'ERASE_BREEDING',
      })
    }
  }, [])

  if (connectedAccount === 0) {
    return (
      <div className='breed'>
        <Heading title={'Cats breeding'} />

        <button
          onClick={login}
          style={{ marginTop: '1rem' }}
          className='button--white'>
          Connect wallet
        </button>
      </div>
    )
  }

  return (
    <div className='breed'>
      <Heading title={'Cats breeding'} />
      <div className='breedGrid'>
        <BreedItem
          role={'mother'}
          myKitties={myKitties}
          breed={breed}
          openModal={openModal}
          currentChainName={currentChainName}
          choseKittyForBreed={choseKittyForBreed}
        />
        <BreedItem
          role={'father'}
          myKitties={myKitties}
          breed={breed}
          openModal={openModal}
          currentChainName={currentChainName}
          choseKittyForBreed={choseKittyForBreed}
        />
      </div>
      {/* modal with myKitties */}
      {visible && (
        <Modal
          className='breedModal'
          onCancel={() => setVisible(false)}
          onCloseButtonPressed={() => setVisible(false)}
          hasFooter={false}
          title='Chose kitty'>
          <Catalogue
            kitties={myKitties}
            page={page}
            loading={loading}
            hasMore={hasMore}
            dispatch={dispatch}
            onClickHandler={choseKittyForBreed}
            mode={'Breed'}
          />
        </Modal>
      )}
      {/* modal with new breeded kitty */}
      {breedingVisible && (
        <Modal
          className='breedModal'
          onCancel={closeBreedingModal}
          onCloseButtonPressed={closeBreedingModal}
          hasFooter={false}>
          {breededKitty.genes ? (
            <BreededKitty
              genes={breededKitty.genes || '1013761011131311'}
              generation={breededKitty.generation || '0'}
            />
          ) : (
            <div style={{ height: '70vh', position: 'relative' }}>
              <EclipseSpinner />
            </div>
          )}
        </Modal>
      )}

      {bothKittiesIsSet() && (
        <button className='button--white' onClick={handleBreeding}>
          Ok, give them some privacy
        </button>
      )}
    </div>
  )
}

function BreededKitty({ genes, generation }) {
  const dna = parseGenes(genes)
  return (
    <div
      style={{
        height: '70vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <div>New member in your kitty family!</div>
      <Kitty dna={dna} />
      <div className='breed__info'>
        <div>
          <span className='bold'>Genes: </span>
          {genes}
        </div>
        <div>
          <span className='bold'>Gen: </span>
          {generation}
        </div>
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
  )
}

export default BreedPage
