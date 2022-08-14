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
import { useMarketplace } from '../../OtherComponents/Web3/useMarketplace'

function BreedPage({ myKitties, dispatch, breed, page, kittieIdsOwned }) {
  const [visible, setVisible] = useState(false)
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

  const breedCats = () => {
    kittyContract.methods
      .breed(breed.mother, breed.father)
      .send({ from: connectedAccount })
  }

  const handleBreeding = () => {
    setBreededKitty({})
    kittyContract.methods
      .breed(breed.mother.id, breed.father.id)
      .send({ from: connectedAccount })
      .then(() => getOwnedKittiesIds(kittyContract, connectedAccount))
      .then(payload => {
        getKitty(payload[payload.length - 1]).then(kitty =>
          setBreededKitty(kitty)
        )
        dispatch({ type: 'SET_KITTIES_IDS_OWNED', payload })
      })
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
        <button className='button--white' onClick={handleBreeding}>
          Ok, give them some privacy
        </button>
      )}
      <KittieItem
        dnaString={breededKitty.genes || '1013761011131311'}
        generation={breededKitty.generation || 0}
        onClickHandler={() => {}}
        id={10}
        // index={0}
        // price={kittiePrices[id] || null}
      />
    </div>
  )
}

export default BreedPage
