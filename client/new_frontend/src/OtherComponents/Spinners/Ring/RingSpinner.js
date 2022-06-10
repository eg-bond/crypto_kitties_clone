import './ringSpinner.css'

export default function RingSpinner() {
  return (
    <div className='ringSpinner__flex'>
      <div className='ringSpinner'>
        <div className='ringSpinner__item'></div>
        <div className='ringSpinner__item'></div>
        <div className='ringSpinner__item'></div>
        <div className='ringSpinner__item'></div>
      </div>
    </div>
  )
}
