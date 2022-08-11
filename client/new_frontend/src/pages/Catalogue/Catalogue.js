import React, { useCallback, useContext, useRef } from 'react'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import SceletonCatalogue from './SceletonCatalogue'
import { AdditionalItem, KittieItem } from './CatalogueParts'
import './catalogue.css'

export function Catalogue({
  haveFreeKitty = false,
  howMuchToDisplay = 'all',
  kitties,
  kittiePrices = [],
  loading,
  page,
  hasMore,
  onClickHandler,
  mode,
  dispatch,
}) {
  const { currentChainName } = useContext(Web3Context)
  const kittiesArr = Object.keys(kitties)

  const increasePageAC = () => dispatch({ type: 'SET_PAGE', payload: page + 1 })

  const observer = useRef()
  const lastKittieRef = useCallback(
    node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            increasePageAC()
          }
        },
        {
          threshold: 1,
        }
      )

      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  if (currentChainName !== 'ganache') {
    return <SceletonCatalogue howMuchToDisplay={howMuchToDisplay} />
  }

  return (
    <div className='catalogue'>
      {kittiesArr.map(id => (
        <KittieItem
          key={'kittie_item' + id}
          // dnaString={kitties[id][0]}
          dnaString={kitties[id].genes}
          generation={kitties[id].generation}
          onClickHandler={onClickHandler}
          id={id}
          price={kittiePrices[id] || null}
        />
      ))}
      {mode === 'MyKitties' && (
        <AdditionalItem haveFreeKitty={haveFreeKitty} kitties={kitties} />
      )}
      <div
        ref={lastKittieRef}
        className='last'
        // style={{ display: 'none' }}
      ></div>
    </div>
  )
}

export default Catalogue
