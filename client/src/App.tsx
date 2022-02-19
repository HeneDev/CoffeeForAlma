import React, { useState, useEffect } from 'react'
import AppNavbar from './components/Navbar/Navbar'
import CoffeeForm from './components/Navbar/Form/CoffeeForm'
import CoffeeList from './components/CoffeeList/CoffeeList'
import { Col, Container, Row } from 'react-bootstrap'
import dataService from './services/data'

export type ICoffee = {
  name: string,
  price: number,
  weight: number,
  roastGrade: number  
}

const App: React.FC = () => {
  const [name, setName] = useState<string | undefined | null>()
  const [price, setPrice] = useState<number | undefined | null>()
  const [weight, setWeight] = useState<number | undefined | null>()
  const [roastGrade, setRoastGrade] = useState<number | undefined | null>()
  const [coffeeList, setCoffeeList] = useState<ICoffee[]>([])
  const [loading, setLoading] = useState<Boolean>(false)

  const handleAddingNewCoffee = async (e: any) => {
    e.preventDefault()
    try {
      const newObject: ICoffee = {
        name: name,
        price: price,
        weight: weight,
        roastGrade: roastGrade
      }

      await dataService.addNewCoffee(newObject)

      setName('')
      setPrice(null)
      setWeight(null)
      setRoastGrade(null)
      const newList = [newObject, ...coffeeList]
      setCoffeeList(newList);
    } catch(err) {
      console.log(err);
    }
  }

  // First time the page loads, retrieve all data from the server
  useEffect(() => {
    const getCoffees = async () => {
      try {
        setLoading(true);
        const newList: ICoffee[] = []
        const response = await dataService.getAll()
        for (let i = 0; i < response.length; i++) {
          newList.push(response[i])
        }
        setCoffeeList(newList)
      } catch (error) {
        console.log(error)
      }
    }
    setLoading(false)
    getCoffees();
  }, [])

  return (
    <>
      <AppNavbar />
      <br />
      <Container>
        <Row>
          <Col>
            <CoffeeForm 
            name={name} 
            setName={setName} 
            price={price} 
            setPrice={setPrice} 
            weight={weight} 
            setWeight={setWeight} 
            roastGrade={roastGrade} 
            setRoastGrade={setRoastGrade}
            handleAddingNewCoffee={handleAddingNewCoffee}/>
          </Col>
          <Col>
            <CoffeeList 
            coffeeList={coffeeList}
            loading={loading} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App