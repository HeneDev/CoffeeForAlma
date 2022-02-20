import React, { useState, useEffect } from 'react'
import AppNavbar from './components/Navbar/Navbar'
import CoffeeForm from './components/Form/CoffeeForm'
import CoffeeList from './components/CoffeeList/CoffeeList'
import { Col, Container, Row } from 'react-bootstrap'
import dataService from './services/data'
import { ICoffee } from './interfaces/ICoffee'

const App: React.FC = () => {
  const [coffeeList, setCoffeeList] = useState<ICoffee[]>([])
  const [loading, setLoading] = useState<boolean>(false) // This is used to showing a "loading.." message on CoffeeList if we aren't done getting all the data

  // First time the page loads, retrieve all data from the server
  useEffect(() => {
    // Fix to memory leak warning for tests
    let cancel = false

    const getCoffees = async () => {
      try {
        // Used to make sure the component unmounts after it completes the task. Mainly used for testing.
        if (cancel) return
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

    // Ensures that the component unmounts after its done
    return () => {
      cancel = true
    }
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