import React from 'react'
import { Skeleton } from 'web3uikit'

export default function SceletonCatalogue({ howMuchToDisplay }) {
  const sceletonsAmount = howMuchToDisplay === 'all' ? 12 : howMuchToDisplay
  const sceletonsArr = new Array(sceletonsAmount).fill(0)

  return (
    <div className='catalogue'>
      {sceletonsArr.map((item, i) => (
        <div key={`catScel_${i}`} className='sceletonContainer'>
          <Skeleton
            borderRadius='1rem'
            height='85%'
            theme='image'
            width='100%'
          />
          <div
            style={{
              height: '15%',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Skeleton
              style={{
                marginBottom: '0.3rem',
              }}
              borderRadius='1rem'
              height='33%'
              theme='text'
              width='20%'
            />
            <Skeleton
              borderRadius='1rem'
              height='33%'
              theme='text'
              width='90%'
            />
          </div>
        </div>
      ))}
    </div>
  )
}
