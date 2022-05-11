import React, { useRef, useState } from 'react'
import './breed.css'
import { Modal } from 'web3uikit'
import { KittieItem } from '../Catalogue/Catalogue'

function Breed({ myKitties, dispatch, breed }) {
  const [visible, setVisible] = useState(false)
  const breedRole = useRef()
  console.log(breed)
  const openModal = role => {
    breedRole.current = role
    setVisible(true)
  }

  const choseKittyForBreed = id => {
    dispatch({
      type: 'CHOSE_KITTY_FOR_BREED',
      payload: { id, role: breedRole.current },
    })
    setVisible(false)
  }

  return (
    <div className='breed'>
      <h1>Cats breeding</h1>
      <div className='breedGrid'>
        <div className='dame'>
          <h2>Dame</h2>
          <p>This kitty will be preggers</p>
          <div onClick={() => openModal('dame')} className='breedContainer'>
            Select a cat as a Dame DameId: {breed.dame}
          </div>
        </div>
        <div className='sire'>
          <h2>Sire</h2>
          <p>This kitty will be the sire</p>
          <div onClick={() => openModal('sire')} className='breedContainer'>
            Select a cat as a Sire SireId: {breed.sire}
          </div>
        </div>
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
    </div>
  )
}

export default Breed
