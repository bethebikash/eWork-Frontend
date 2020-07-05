import { useState } from 'react'

const useInput = (initialVal) => {
  const [value, setValue] = useState(initialVal)
  const handelChange = (e) => {
    setValue(e.target.value)
  }
  const reset = () => {
    setValue('')
  }
  return [ value, handelChange, reset ]
}

export default useInput
