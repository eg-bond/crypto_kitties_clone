import React, { useContext, useEffect, useRef, useState } from 'react'
import './breed.css'
import { Modal } from 'web3uikit'
import { Kitty } from '../Factory/Kitty'
import { KittieItem, parseGenes } from '../Catalogue/Catalogue'
import { getColor } from '../Factory/colors'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import { capitalizeFirstLetter } from '../../helpers'
import {
  getAnimationName,
  getDecorationName,
  getEyesShapeName,
} from '../Factory/helpers'
import Header from '../../OtherComponents/Header/Header'

function BreedItem({ role, myKitties, breed, openModal, currentChainName }) {
  const selectedKitty = myKitties[breed[role]]

  let dna = null
  if (selectedKitty) {
    dna = parseGenes(selectedKitty.genes)
  }

  return (
    <div className={role}>
      <h2>{capitalizeFirstLetter(role)}</h2>
      {/* <p>This kitty will be the {role}</p> */}

      {currentChainName !== 'ganache' ? (
        <div className='breedContainer--disabled empty '>
          <img src='../images/egg.png' alt='egg' />
          <div className='bold'>
            Select a cat as a {capitalizeFirstLetter(role)}
          </div>
        </div>
      ) : breed[role] === null ? (
        <div onClick={() => openModal(role)} className='breedContainer empty'>
          <img src='../images/egg.png' alt='egg' />
          <div className='bold'>
            Select a cat as a {capitalizeFirstLetter(role)}
          </div>
        </div>
      ) : (
        <>
          <div onClick={() => openModal(role)} className='breedContainer'>
            <div
              className='containerBackground containerBackground--breed'
              style={{ backgroundColor: getColor(dna.eyesClr) }}></div>
            <Kitty dna={dna} />
          </div>
          <div className='breed__info'>
            <div>
              <span className='bold'>Genes: </span>
              {selectedKitty.genes}
            </div>
            <div>
              <span className='bold'>Gen: </span>
              {selectedKitty.generation}
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
        </>
      )}
    </div>
  )
}

function BreedPage({ myKitties, dispatch, breed }) {
  const [visible, setVisible] = useState(false)
  const breedRole = useRef()
  const { kittyContract, connectedAccount, login, currentChainName } =
    useContext(Web3Context)

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

  const breedCats = () => {
    kittyContract.methods
      .breed(breed.mother, breed.father)
      .send({ from: connectedAccount })
  }

  const choseKittyForBreed = id => {
    dispatch({
      type: 'CHOSE_KITTY_FOR_BREED',
      payload: { id, role: breedRole.current },
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
        <Header title={'Cats breeding'} />

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
      <Header title={'Cats breeding'} />
      <div className='breedGrid'>
        <BreedItem
          role={'mother'}
          myKitties={myKitties}
          breed={breed}
          openModal={openModal}
          currentChainName={currentChainName}
        />
        <BreedItem
          role={'father'}
          myKitties={myKitties}
          breed={breed}
          openModal={openModal}
          currentChainName={currentChainName}
        />
      </div>
      {visible && (
        <Modal
          className='breedModal'
          onCancel={() => setVisible(false)}
          onCloseButtonPressed={() => setVisible(false)}
          hasFooter={false}
          title='Chose kitty'>
          <div className='catalogue'>
            {Object.keys(myKitties).map(id => (
              <KittieItem
                key={Math.random() * 10}
                dnaString={myKitties[id].genes}
                generation={myKitties[id].generation}
                onClickHandler={() => choseKittyForBreed(id)}
                id={id}
              />
            ))}
          </div>
        </Modal>
      )}
      {bothKittiesIsSet() && (
        <button className='button--white' onClick={breedCats}>
          Ok, give them some privacy
        </button>
      )}
    </div>
  )
}

export default BreedPage