import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap'
import { ICoffee } from '../../App';

interface Props {
  coffeeList: ICoffee[]
  loading: Boolean
}

const CoffeeList: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
    {!props.loading ? (<p>Loading...</p>) : (
          <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Weight</th>
              <th>Roast Grade</th>
            </tr>
          </thead>
          <tbody>
          {props.coffeeList.map((item: ICoffee, i: number) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.price} €</td>
              <td>{item.weight} g</td>
              <td>{item.roastGrade} </td>
            </tr>
          ))}
          </tbody>
        </Table>
    )}
    </React.Fragment>
  )
}
export default CoffeeList;