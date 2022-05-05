import React, { useState } from 'react'

function Factory() {
  const defaultKittyDNA = {
    head_bodyClr: '10',
    mouth_belly_tailClr: '13',
    eyesClr: '76',
    ears_pawClr: '10',
    eyesShape: '1',
    decoration: '1',
    middleColor: '13',
    sides_color: '13',
    animation: '1',
  }
  const [dna, setDna] = useState(defaultKittyDNA)

  const handleSetDNA = (field, value) => {
    const updatedField = { [field]: value }
    setDna(prevDNA => ({
      ...prevDNA,
      ...updatedField,
    }))
  }

  function rangeInput(field, min, max) {
    return (
      <input
        value={dna[field]}
        onMouseUp={e => handleSetDNA(field, e.target.value)}
        onChange={e => handleSetDNA(field, e.target.value)}
        type='range'
        min={min}
        max={max}
      />
    )
  }

  const getRandomKitty = () => {
    const randomDNA = dna
    const range10keys = ['eyesShape', 'decoration', 'animation']
    Object.keys(randomDNA).forEach(key => {
      randomDNA[key] = 10 + Math.floor(Math.random() * 90)
      if (range10keys.includes(key)) {
        randomDNA[key] = Math.ceil(randomDNA[key] / 10)
      }
    })
    console.log(randomDNA)
  }

  return (
    <div className='factory'>
      <h1>Factory</h1>
      <div className='colors'>
        <h2>Colors</h2>
        <div>Head and body</div>
        {rangeInput('head_bodyClr', 10, 98)}
        <div>Mouth | Belly | Tail</div>
        {rangeInput('mouth_belly_tailClr', 10, 98)}
        <div>Eyes color</div>
        {rangeInput('eyesClr', 10, 98)}
        <div>Ears | Paw</div>
        {rangeInput('ears_pawClr', 10, 98)}
      </div>
      <div className='cattributes'>
        <h2>Cattributes</h2>
        <div>Eyes shape</div>
        {rangeInput('eyesShape', 1, 10)}
        <div>Decoration pattern</div>
        {rangeInput('decoration', 1, 10)}

        <div>Decoration color pattern</div>
        <div>Middle color</div>
        {rangeInput('middleColor', 10, 98)}
        <div>Sides color</div>
        {rangeInput('sides_color', 10, 98)}
        <div>Animation</div>
        {rangeInput('animation', 1, 6)}
      </div>
      <div>
        <h2>finalDNA</h2>
        <div>
          {Object.keys(dna).map((key, i) => (
            <span key={`${i}_${key}`}>{dna[key]} </span>
          ))}
        </div>
      </div>
      <button onClick={getRandomKitty}>GetRandomKitty</button>
      {/* <button onClick={getDefaultKitty}>Default kitty</button> */}
      <button>Create Kitty</button>
    </div>
  )
}

export default Factory
