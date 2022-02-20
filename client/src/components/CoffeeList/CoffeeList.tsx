import React from 'react'
import { Table } from 'react-bootstrap'
import { ICoffee } from '../../interfaces/ICoffee'

interface Props {
  coffeeList: ICoffee[]
  loading: boolean
}

const CoffeeList: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
    {!props.loading ? (<p>Loading...</p>) : (
          <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th data-testid="nameTest">Name</th>
              <th data-testid="priceTest">Price</th>
              <th data-testid="weightTest">Weight</th>
              <th data-testid="roastGradeTest">Roast Grade</th>
            </tr>
          </thead>
          <tbody>
          {props.coffeeList.map((item: ICoffee, i: number) => (
            <tr key={i}>
              <td data-testid="nameTdTest">{item.name}</td>
              <td data-testid="priceTdTest">{item.price}€</td>
              <td data-testid="weightTdTest">{item.weight}g</td>
              <td data-testid="roastGradeTdTest">{item.roastGrade}</td>
            </tr>
          ))}
          </tbody>
        </Table>
    )}
    </React.Fragment>
  )
}
export default CoffeeList