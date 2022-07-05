import React, { useCallback, useContext, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Web3Context } from '../../OtherComponents/Web3/Web3Provider'
import SceletonCatalogue from './SceletonCatalogue'
import { AdditionalItem, KittieItem } from './CatalogueParts'
import './catalogue.css'

export function Catalogue({
  haveFreeKitty = false,
  howMuchToDisplay = 'all',
  kitties,
  doubleKitties,
}) {
  const { currentChainName } = useContext(Web3Context)
  let navigate = useNavigate()
  let { pathname } = useLocation()
  const kittiesArr = Object.keys(kitties)

  const selectKitty = id => {
    navigate(`/selected_kitty/${id}`)
  }

  const observer = useRef()
  const lastKittieRef = useCallback(node => {
    observer.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          console.log(entries)
          doubleKitties()
          // console.log('')
        }
      },
      {
        threshold: 1,
        // rootMargin: '150px',
      }
    )
    if (node) observer.current.observe(node)
  })

  if (currentChainName !== 'ganache') {
    return <SceletonCatalogue howMuchToDisplay={howMuchToDisplay} />
  }

  return (
    <div className='catalogue'>
      {kittiesArr.map((id, index) => {
        if (kittiesArr.length === index + 1) {
          return (
            <div ref={lastKittieRef} className='last' key={Math.random() * 10}>
              <KittieItem
                dnaString={kitties[id][0]}
                // dnaString={kitties[id].genes}
                generation={kitties[id].generation}
                onClickHandler={selectKitty}
                id={id}
              />
            </div>
          )
        } else {
          return (
            <KittieItem
              key={Math.random() * 10}
              dnaString={kitties[id][0]}
              // dnaString={kitties[id].genes}
              generation={kitties[id].generation}
              onClickHandler={selectKitty}
              id={id}
            />
          )
        }
      })}
      {pathname === '/my_kitties' && (
        <AdditionalItem haveFreeKitty={haveFreeKitty} kitties={kitties} />
      )}
    </div>
  )
}
// export function Catalogue({
//   haveFreeKitty = false,
//   howMuchToDisplay = 'all',
//   kitties,
// }) {
//   const { currentChainName } = useContext(Web3Context)
//   let navigate = useNavigate()
//   let { pathname } = useLocation()

//   const selectKitty = id => {
//     navigate(`/selected_kitty/${id}`)
//   }

//   if (currentChainName !== 'ganache') {
//     return <SceletonCatalogue howMuchToDisplay={howMuchToDisplay} />
//   }

//   return (
//     <div className='catalogue'>
//       {Object.keys(kitties).map(id => (
//         <KittieItem
//           key={Math.random() * 10}
//           dnaString={kitties[id].genes}
//           generation={kitties[id].generation}
//           onClickHandler={selectKitty}
//           id={id}
//         />
//       ))}
//       {pathname === '/my_kitties' && (
//         <AdditionalItem haveFreeKitty={haveFreeKitty} kitties={kitties} />
//       )}
//     </div>
//   )
// }

export default Catalogue
