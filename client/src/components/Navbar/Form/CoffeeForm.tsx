import { Form, Button } from 'react-bootstrap'

interface Props {
  name: string
  price: number | undefined
  weight: number | undefined
  roastGrade: number | undefined
  setName: (value: string) => void
  setPrice: (value: number) => void
  setWeight: (value: number) => void
  setRoastGrade: (value: number) => void
  handleAddingNewCoffee: (event: React.FormEvent<HTMLFormElement>) => void
}

const CoffeeForm: React.FC<Props> = ({
  name,
  price, 
  weight, 
  roastGrade, 
  setName, 
  setPrice, 
  setWeight, 
  setRoastGrade, 
  handleAddingNewCoffee
}) => {
  const onNameChange = (newName: string) => {
    setName(newName);
  }

  const onPriceChange = (newPrice: number) => {
    setPrice(newPrice);
  }

  const onWeightChange = (newWeight: number) => {
    setWeight(newWeight);
  }

  const onRoastGradeChange = (newRoastGrade: number) => {
    setRoastGrade(newRoastGrade);
  }

  const clearAllFields = () => {
    setName('')
    setPrice(undefined)
    setWeight(undefined)
    setRoastGrade(undefined)
  }

  return (
    <Form onSubmit={handleAddingNewCoffee}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control 
        type="text"
        placeholder="Enter name" 
        value={name ?? ''}
        onChange={(event) => onNameChange(event.target.value)}
        required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price in euros</Form.Label>
        <Form.Control 
        type="number" 
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
        <Form.Control 
        type="number"
        min={1}
        max={5}
        placeholder="Enter roast grade" 
        value={roastGrade ?? ''}
        onChange={(event) => {
          const { value } = event.target
          onRoastGradeChange(value === '' ? undefined : +value)
        }}
        required />
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