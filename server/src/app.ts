import express, { Application, Request, Response, NextFunction} from 'express'
const coffeeRoute = require('./routes/coffees')

const app: Application = express();

app.use(express.json());
app.use('/coffees', coffeeRoute);

app.listen(5000, () => console.log("Server running on port 5000"));