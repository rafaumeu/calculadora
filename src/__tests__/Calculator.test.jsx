import React from 'react'
import { render } from '@testing-library/react'
import Calculator from '../components/Calculator'

test('renders calculator component', () => {
  const { getByText } = render(<Calculator />)

  // Verifica se o componente é renderizado
  const calculatorElement = getByText('=') // Adapte o seletor conforme necessário para um elemento do seu componente

  expect(calculatorElement).toBeInTheDocument
})
