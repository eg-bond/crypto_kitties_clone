import React, { useState } from 'react'
import './breed.css'
import {
  Button,
  ConnectButton,
  Icon,
  Modal,
  Tab,
  TabList,
  useNotification,
} from 'web3uikit'
import Catalogue, { KittieItem } from '../Catalogue/Catalogue'

function Breed({ kittiesState }) {
  const [visible, setVisible] = useState(false)

  console.log(kittiesState)
  const choseKitty = () => {
    setVisible(false)
  }

  return (
    <div className='breed'>
      <h1>Cats breeding</h1>
      <div className='breedGrid'>
        <div className='dame'>
          <h2>Dame</h2>
          <p>This kitty will be preggers</p>
          <div onClick={() => setVisible(true)} className='breedContainer'>
            Select a cat as a Dame
          </div>
        </div>
        <div className='sire'>
          <h2>Sire</h2>
          <p>This kitty will be the sire</p>
          <div onClick={() => setVisible(true)} className='breedContainer'>
            Select a cat as a Sire
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
            {kittiesState.map(dnaString => (
              <KittieItem
                key={Math.random() * 10}
                dnaString={dnaString}
                onClickHandler={choseKitty}
              />
            ))}
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Breed
