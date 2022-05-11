import React, { useContext, useEffect, useRef, useState } from 'react'
import './breed.css'
import { Modal } from 'web3uikit'
import { Kitty } from '../Factory/Kitty'
import { KittieItem, parseGenes } from '../Catalogue/Catalogue'
import { getColor } from '../Factory/colors'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'

function BreedItem({ role, myKitties, breed, openModal }) {
  const selectedKitty = myKitties[breed[role]]

  let dna = null
  if (selectedKitty) {
    dna = parseGenes(selectedKitty.genes)
  }

  return (
    <div className={role}>
      <h2>{role}</h2>
      <p>This kitty will be the {role}</p>

      {breed[role] === null ? (
        <div onClick={() => openModal(role)} className='breedContainer empty'>
          Select a cat as a Dame
        </div>
      ) : (
        <>
          <div onClick={() => openModal(role)} className='breedContainer'>
            <div
              className='containerBackground'
              style={{ backgroundColor: getColor(dna.eyesClr) }}></div>
            <Kitty dna={dna} />
          </div>
          <div className='info'>
            <p>Genes: {selectedKitty.genes}</p>
            <p>Generation: {selectedKitty.generation}</p>
          </div>
        </>
      )}
    </div>
  )
}

function Breed({ myKitties, dispatch, breed }) {
  const [visible, setVisible] = useState(false)
  const breedRole = useRef()
  const { kittyContract, selectedAccount } = useContext(Web3Context)

  const openModal = role => {
    breedRole.current = role
    setVisible(true)
  }

  const breedCats = () => {
    kittyContract.methods
      .breed(breed.dame, breed.sire)
      .send({ from: selectedAccount })
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

  return (
    <div className='breed'>
      <h1>Cats breeding</h1>
      <div className='breedGrid'>
        <BreedItem
          role={'dame'}
          myKitties={myKitties}
          breed={breed}
          openModal={openModal}
        />
        <BreedItem
          role={'sire'}
          myKitties={myKitties}
          breed={breed}
          openModal={openModal}
        />
      </div>
      {visible && (
        <Modal
          onCancel={() => setVisible(false)}
          onCloseButtonPressed={() => setVisible(false)}
          hasFooter={false}
          title='Chose kitty'>
          <div className='kitties'>
            {Object.keys(myKitties).map(id => (
              <KittieItem
                key={Math.random() * 10}
                dnaString={myKitties[id].genes}
                generation={myKitties[id].generation}
                onClickHandler={() => choseKittyForBreed(id)}
              />
            ))}
          </div>
        </Modal>
      )}
      <button onClick={breedCats}>Ok, give them some privacy</button>
    </div>
  )
}

export default Breed
