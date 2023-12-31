import React from 'react'
import './Calculator.css'

const Calculator = () => {
  const keypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const operations = ['+', '-', '*', '/']
  return (
    <div className='calculator'>
      <div className='complete-operation'>3 + 3 = 6</div>
      <div className='display'>6</div>
      <div className='buttons'>
        <button>AC</button>
        {keypadNumbers.map((num) => (
          <button key={num} data-testid={`button-${num}`}>
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
