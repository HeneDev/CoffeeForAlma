const router = require("express").Router();
import { Application, Request, Response, NextFunction} from 'express'
const Coffee = require("../../models/Coffee");


// Add new coffee to the list
router.post("/add", async (req: Request, res: Response) => {
  const newCoffee = new Coffee({
    name: req.body.name,
    price: req.body.price,
    weight: req.body.weight,
    roastGrade: req.body.roastGrade
  })
})

// Get all coffees from the list
router.get("/", async (req: Request, res: Response) => {
  try {

  } catch (err) {
   res.status(500).json(err); 
  }
})