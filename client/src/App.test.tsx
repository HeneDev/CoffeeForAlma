import React from 'react'
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import CoffeeList from './components/List/CoffeeList'
import CoffeeForm from './components/Form/CoffeeForm'
import { ICoffee } from './interfaces/ICoffee'

test('Renders the App component', async() => {
  render(<App />)
  const linkElement = screen.getByText('Coffee for Alma')
  expect(linkElement).toBeInTheDocument()
})

test('Form is rendered correctly', async () => {
  const coffeeList: ICoffee[] = []
  const setCoffeeList = jest.fn()
  render(<CoffeeForm coffeeList={coffeeList} setCoffeeList={setCoffeeList}/>)

  const nameInputEl = screen.getByTestId('nameTest')
  const priceInputEl = screen.getByTestId('priceTest')
  const weightInputEl = screen.getByTestId('weightTest')
  const roastGradeInputEl = screen.getByTestId('roastGradeTest')

  expect(nameInputEl).toBeInTheDocument()
  expect(priceInputEl).toBeInTheDocument()
  expect(weightInputEl).toBeInTheDocument()
  expect(roastGradeInputEl).toBeInTheDocument()
})

test('List is rendered correctly', async() => {
  const coffeeList: ICoffee[] = []
  const loading: boolean = true

  render(<CoffeeList coffeeList={coffeeList} loading={loading}/>)
  
  const nameHeader = screen.getByTestId('nameTest')
  const priceHeader = screen.getByTestId('priceTest')
  const weightHeader = screen.getByTestId('weightTest')
  const roastGradeHeader = screen.getByTestId('roastGradeTest')

  expect(nameHeader).toBeInTheDocument()
  expect(priceHeader).toBeInTheDocument()
  expect(weightHeader).toBeInTheDocument()
  expect(roastGradeHeader).toBeInTheDocument()
})

test('List with items is rendered correctly', async() => {
  const coffeeList: ICoffee[] = [{
    name: 'Saludo',
    price: 6.66,
    weight: 666,
    roastGrade: 5
  }]
  const loading: boolean = true

  render(<CoffeeList coffeeList={coffeeList} loading={loading}/>)

  const nameDataRow = screen.getByTestId('nameTdTest')
  const priceDataRow = screen.getByTestId('priceTdTest')
  const weightDataRow = screen.getByTestId('weightTdTest')
  const roastGradeDataRow = screen.getByTestId('roastGradeTdTest')

  expect(nameDataRow).toHaveTextContent('Saludo')
  expect(priceDataRow).toHaveTextContent('6.66')
  expect(weightDataRow).toHaveTextContent('666')
  expect(roastGradeDataRow).toHaveTextContent('5')
})