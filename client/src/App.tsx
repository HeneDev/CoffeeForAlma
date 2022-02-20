import React, { useState, useEffect } from 'react'
import AppNavbar from './components/Navbar/Navbar'
import CoffeeForm from './components/Form/CoffeeForm'
import CoffeeList from './components/List/CoffeeList'
import { Col, Container, Row } from 'react-bootstrap'
import dataService from './services/data'
import { ICoffee } from './interfaces/ICoffee'

const App: React.FC = () => {
  const [coffeeList, setCoffeeList] = useState<ICoffee[]>([])
  const [loading, setLoading] = useState<boolean>(false) // This is used to showing a "loading.." message on CoffeeList if we aren't done getting all the data

  // First time the page loads, retrieve all data from the server
  useEffect(() => {
    const getCoffees = async () => {
      try {
        setLoading(true)
        const newList: ICoffee[] = []
        const response = await dataService.getAll()
        // Loop through the received response and add each object to a list
        for (let i = 0; i < response.length; i++) {
          newList.push(response[i])
        }
        setCoffeeList(newList)
      } catch (error) {
        console.log(error)
      }
    }
    setLoading(false)
    getCoffees()
  }, [])

  return (
    <>
      <AppNavbar />
      <br />
      <Container>
        <Row>
          <Col>
            <CoffeeForm 
            coffeeList={coffeeList}
            setCoffeeList={setCoffeeList}/>
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