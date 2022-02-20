import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

test('Renders the App components', () => {
  render(<App />)
  const linkElement = screen.getByText('Coffee for Alma')
  expect(linkElement).toBeInTheDocument()
})