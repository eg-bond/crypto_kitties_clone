import React, { useContext, useEffect, useRef, useState } from 'react'
import './breed.css'
import { Modal } from 'web3uikit'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import { getOwnedKittiesIds, useGetKittiesByPage } from '../../helpers'
import Heading from '../../OtherComponents/Heading/Heading'
import { KittieItem } from '../Catalogue/CatalogueParts'
import { options } from '../../options'
import BreedItem from './BreedItem'
import Catalogue from '../Catalogue/Catalogue'

function BreedPage({ myKitties, dispatch, breed, page, kittieIdsOwned }) {
  const [visible, setVisible] = useState(false)
  const breedRole = useRef()
  const { kittyContract, connectedAccount, login, currentChainName } =
    useContext(Web3Context)

  useEffect(() => {
    if (connectedAccount && currentChainName === options.baseChain) {
      //new
      getOwnedKittiesIds(kittyContract, connectedAccount).then(payload =>
        dispatch({ type: 'SET_KITTIES_IDS_OWNED', payload })
      )
    }
  }, [connectedAccount, currentChainName])

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

  const breedCats = () => {
    kittyContract.methods
      .breed(breed.mother, breed.father)
      .send({ from: connectedAccount })
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
      {bothKittiesIsSet() && (
        <button className='button--white' onClick={breedCats}>
          Ok, give them some privacy
        </button>
      )}
    </div>
  )
}

export default BreedPage
