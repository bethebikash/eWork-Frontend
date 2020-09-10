import React from 'react'
import { Spinner as MySpinner } from 'react-bootstrap'

const Spinner = () => {
  return (
    <div className="m-5 text-center">
      <MySpinner className="spinner-border text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </MySpinner>
    </div>
  )
}

export default Spinner