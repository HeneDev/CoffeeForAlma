import express, { Application } from 'express'
import cors from 'cors'
import coffeeRouter from './routes/coffees'
import bodyParser from 'body-parser'

const app: Application = express()

app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors())
app.use(express.json())
app.use('/coffees', coffeeRouter)

app.listen(5000, () => console.log("Server running on port 5000"))

export { app }