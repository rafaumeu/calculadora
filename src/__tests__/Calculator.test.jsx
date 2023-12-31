import React from 'react'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import '../components/Calculator.css'
import Calculator from '../components/Calculator'
// Função de correspondência personalizada para encontrar o texto dentro dos botões
function findTextInsideButton(text) {
  return (content, element) => {
    const hasText = element.textContent === text
    const isButton = element.tagName.toLowerCase() === 'button'
    return hasText && isButton
  }
}
describe('Calculator component', () => {
  test('Is rendered AC button', () => {
    render(<Calculator />)
    // Verifica se o botão 'AC' está presente
    const acButton = screen.getByText('AC')
    expect(acButton).toBeInTheDocument()
  })
  test('Is rendered equals button', () => {
    render(<Calculator />)
    // Verifica se o botão '=' está presente
    const equalsButton = screen.getByText('=')
    expect(equalsButton).toBeInTheDocument()
  })

  test('renders numeric buttons', async () => {
    render(<Calculator />)
    const keypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

    await waitFor(() => {
      keypadNumbers.forEach((num) => {
        const numButton = screen.getByTestId(`button-${num}`)
        expect(numButton).toBeInTheDocument()
      })
    })
  })
  test('Is rendered operations pad', async () => {
    render(<Calculator />)
    // Verifica se todas as operações estão presentes nos botões
    const operations = ['+', '-', '*', '/']
    await waitFor(() => {
      operations.forEach((operation) => {
        const operationButton = screen.getByText(operation)
        expect(operationButton).toBeInTheDocument()
      })
    })
  })
  test('In click button set numbers on displays', async () => {
    render(<Calculator />)
    const keypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    await waitFor(() => {
      keypadNumbers.forEach((num) => {
        const numButton = screen.getByTestId(`button-${num}`) // Encontra o botão pelo texto numérico
        fireEvent.click(numButton) // Simula o clique no botão

        const displayCurrentValue = screen.getByText(num) // Procura o número atual no display
        expect(displayCurrentValue).toBeInTheDocument() // Verifica se o número está presente no display após o clique
      })
    })
  })
  test('is ac button clear the displays', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByTestId('button-5'))
    fireEvent.click(screen.getByTestId('button-6'))
    fireEvent.click(screen.getByText('AC')) //
    const displayCurrentValue = screen.getByTestId('display')
    expect(displayCurrentValue).toHaveTextContent('0')
  })
})
