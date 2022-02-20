import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import dataService from '../../services/data'
import { ICoffee } from '../../interfaces/ICoffee'

interface Props {
  coffeeList: ICoffee[]
  setCoffeeList: (value: ICoffee[]) => void
}

const CoffeeForm: React.FC<Props> = ({coffeeList, setCoffeeList}) => {
  const [name, setName] = useState<string | undefined | null>()
  const [price, setPrice] = useState<number | undefined | null>()
  const [weight, setWeight] = useState<number | undefined | null>()
  const [roastGrade, setRoastGrade] = useState<number | undefined | null>(1)

  const onNameChange = (newName: string) => {
    setName(newName)
  }

  const onPriceChange = (newPrice: number) => {
    setPrice(newPrice)
  }

  const onWeightChange = (newWeight: number) => {
    setWeight(newWeight)
  }

  const onRoastGradeChange = (newRoastGrade: number) => {
    setRoastGrade(newRoastGrade)
  }

  const clearAllFields = () => {
    setName('')
    setPrice(undefined)
    setWeight(undefined)
    setRoastGrade(1)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const newObject: ICoffee = {
        name: name,
        price: price,
        weight: weight,
        roastGrade: roastGrade
      }

      await dataService.addNewCoffee(newObject)
      // After initializing the new object, reset all properties
      setName('')
      setPrice(null)
      setWeight(null)
      setRoastGrade(1)

      // The React way to concatinating arrays
      const newList: ICoffee[] = []
      newList.push(...coffeeList, newObject)
      setCoffeeList(newList)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control 
        type="text"
        data-testid="nameTest"
        placeholder="Enter name" 
        value={name ?? ''}
        onChange={(event) => onNameChange(event.target.value)}
        required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price in euros</Form.Label>
        <Form.Control 
        type="number"
        min={0}
        max={1000000}
        data-testid="priceTest"
        placeholder="Enter price" 
        value={price ?? ''} 
        onChange={(event) => {
          const { value } = event.target
          onPriceChange(value === '' ? undefined : +value)
        }}
        required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Weight in grams</Form.Label>
        <Form.Control 
        type="number"
        min={0}
        max={1000000}
        data-testid="weightTest" 
        placeholder="Enter weight" 
        value={weight ?? ''}
        onChange={(event) => {
          const { value } = event.target
          onWeightChange(value === '' ? undefined : +value)
        }}
        required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Roast grade from 1 to 5</Form.Label>
        <Form.Select
        value={roastGrade}
        data-testid="roastGradeTest"
        onChange={(event) => {
          const { value } = event.target
          onRoastGradeChange(value === '' ? undefined : +value)
        }}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit"> 
        Submit
      </Button>{' '}
      <Button variant="secondary" type="button" onClick={clearAllFields}>
        Clear
      </Button>
    </Form>
  )
}

export default CoffeeForm