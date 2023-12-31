import React, { useState } from 'react'
import './Calculator.css'

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState('0')
  const [pendingOperation, setPendingOperation] = useState(null)
  const [pendingValue, setPendingValue] = useState(null)
  const [completeOperation, setCompleteOperation] = useState('')
  const keypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const operations = ['+', '-', '*', '/']
  const handleClick = (val) => {
    setCurrentValue((prevValue) => {
      if (prevValue === '0') {
        return val
      } else {
        return prevValue + val
      }
    })
    setCompleteOperation((prevOperation) => prevOperation + val)
  }
  const handleClear = () => {
    setCurrentValue('0')
    setPendingOperation(null)
    setPendingValue(null)
    setCompleteOperation('')
  }
  return (
    <div className='calculator'>
      <div className='complete-operation'>{completeOperation}</div>
      <div className='display' data-testid={`display`}>
        {currentValue}
      </div>
      <div className='buttons'>
        <button onClick={handleClear}>AC</button>
        {keypadNumbers.map((num) => (
          <button
            key={num}
            data-testid={`button-${num}`}
            onClick={() => handleClick(num)}
          >
            {num}
          </button>
        ))}
        {operations.map((operation) => (
          <button key={operation}>{operation}</button>
        ))}
        <button>=</button>
      </div>
    </div>
  )
}

export default Calculator
