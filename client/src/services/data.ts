import axios from 'axios'
import { ICoffee } from '../App'
const baseUrl = 'http://localhost:5000/coffees'

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNewCoffee = async(newObject: ICoffee) => {
  const response = await axios.post(baseUrl + '/add', newObject)
  return response.data
}

export default {
  getAll, addNewCoffee
}