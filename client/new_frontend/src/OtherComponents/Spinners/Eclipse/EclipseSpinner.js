import './eclipseSpinner.css'
// preloader
export default function EclipseSpinner() {
  return (
    <div className='absoluteContainer'>
      <div className='eclipseSpinner__flex'>
        <div className='eclipseSpinner'></div>
      </div>
    </div>
  )
}
