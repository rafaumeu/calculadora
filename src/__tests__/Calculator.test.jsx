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
  test('Operação de adição (+)', () => {
    render(<Calculator />)

    // Simula a inserção dos números 5 e 6
    fireEvent.click(screen.getByTestId('button-5'))
    fireEvent.click(screen.getByTestId('button-6'))

    // Simula a operação de adição (+)
    fireEvent.click(screen.getByText('+'))

    // Verifica se a operação foi corretamente refletida no estado do componente
    expect(screen.getByTestId('display')).toHaveTextContent('0') // Valor resetado após inserir o 5 e 6
    expect(screen.getByText('56 +')).toBeInTheDocument()
  })

  // Testes para as outras operações (-, *, /) seguem a mesma lógica

  test('Operação de divisão (/)', () => {
    render(<Calculator />)

    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-0'))
    fireEvent.click(screen.getByText('/'))
    fireEvent.click(screen.getByTestId('button-5'))

    expect(screen.getByTestId('complete-operation')).toHaveTextContent('10 / 5')
    fireEvent.click(screen.getByText('='))
    expect(screen.getByTestId('display')).toHaveTextContent('2')
  })

  test('Operação de cálculo (=)', () => {
    render(<Calculator />)

    fireEvent.click(screen.getByTestId('button-9'))
    fireEvent.click(screen.getByTestId('button-3'))
    fireEvent.click(screen.getByText('/'))
    fireEvent.click(screen.getByTestId('button-0'))

    fireEvent.click(screen.getByText('='))

    // Verifica se a operação foi corretamente calculada e refletida no estado do componente
    expect(screen.getByTestId('complete-operation')).toHaveTextContent('Error') // Divisão por zero
    expect(screen.getByTestId('display')).toHaveTextContent('Error')
  })
  test('handleCalculate for addition', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByTestId('button-3'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByTestId('button-7'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByTestId('display')).toHaveTextContent('10')
    expect(screen.getByTestId('complete-operation')).toHaveTextContent('3 + 7')
  })
  test('handleOperation setPendingOperation and setCurrentValue', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByTestId('button-5'))
    fireEvent.click(screen.getByText('+'))
    expect(screen.getByText('5 +')).toBeInTheDocument()
    expect(screen.getByTestId('display')).toHaveTextContent('0')
  })
  test('handleCalculate retorna sem executar em caso de valores nulos', () => {
    render(<Calculator />)

    // Simula a inserção de um número, seguido da operação de cálculo sem operação pendente
    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByText('='))

    // Verifica se o display continua com o mesmo valor (sem alterações)
    expect(screen.getByTestId('display')).toHaveTextContent('1')
  })
  test('Operação de subtração (-)', () => {
    render(<Calculator />)

    fireEvent.click(screen.getByTestId('button-7'))
    fireEvent.click(screen.getByText('-'))
    fireEvent.click(screen.getByTestId('button-4'))
    fireEvent.click(screen.getByText('='))

    // Verifica se a subtração foi realizada corretamente
    expect(screen.getByTestId('display')).toHaveTextContent('3')
    expect(screen.getByText('7 - 4')).toBeInTheDocument()
  })
  test('Operação de multiplicação (*)', () => {
    render(<Calculator />)

    fireEvent.click(screen.getByTestId('button-5'))
    fireEvent.click(screen.getByText('*'))
    fireEvent.click(screen.getByTestId('button-6'))
    fireEvent.click(screen.getByText('='))

    // Verifica se a multiplicação foi realizada corretamente
    expect(screen.getByTestId('display')).toHaveTextContent('30')
    expect(screen.getByText('5 * 6')).toBeInTheDocument()
  })
})
