import { capitalizeFirstLetter } from '../../helpers'
import { options } from '../../options'
import { parseGenes } from '../Catalogue/CatalogueParts'
import { getColor } from '../Factory/colors'
import {
  getAnimationName,
  getDecorationName,
  getEyesShapeName,
} from '../Factory/helpers'
import { Kitty } from '../Factory/Kitty'

function BreedItem({
  role,
  myKitties,
  breed,
  openModal,
  currentChainName,
  choseKittyForBreed,
}) {
  const selectedKitty = myKitties[breed[role]]

  let dna = null
  if (selectedKitty) {
    dna = parseGenes(selectedKitty.genes)
  }

  const breedContainerClass = () =>
    currentChainName !== options.baseChain
      ? 'breedContainer--disabled'
      : 'breedContainer'

  return (
    <div className={role}>
      <h2>{capitalizeFirstLetter(role)}</h2>
      {/* <p>This kitty will be the {role}</p> */}

      {breed[role] === null ? (
        <div
          onClick={() => openModal(role)}
          className={`${breedContainerClass()} empty`}>
          <img className='transition400' src='../images/egg.png' alt='egg' />
          <div className='bold transition400'>
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
          <button
            className='squareButton squareButton--red'
            onClick={() => choseKittyForBreed(null, role)}>
            Clear
          </button>
        </>
      )}
    </div>
  )
}

export default BreedItem
