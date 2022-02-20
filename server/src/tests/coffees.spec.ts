import axios from 'axios'


describe('Route testing', () => {
  const baseUrl = 'http://localhost:5000/coffees'

  test('GET/ route should status code 200', async() => {
    await axios.get(baseUrl)
    .then(r => {
      expect(r.status).toBeGreaterThanOrEqual(200)
      expect(r.status).toBeLessThan(300)
    })
  })

  test('POST/ route should allow posting new data', async() => {
    const dummyObject = {
      name: 'Saludo',
      price: 6.66,
      weight: 666,
      roastGrade: 5
    }
    await axios.post(baseUrl + '/add', dummyObject)
    .then(r => {
      expect(r.status).toBeGreaterThanOrEqual(200)
      expect(r.status).toBeLessThan(300)
      expect(r.data).toBeDefined()
    })
  })
})