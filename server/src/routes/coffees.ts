const router = require("express").Router();
import { Request, Response} from 'express'
import fs from 'fs'
import path from 'path';
import { Coffee } from '../models/CoffeeModel'
import csv from 'csv-parser';


async function readCsvFile() {
  const csvFilePath = path.resolve(__dirname, '../assets/coffee-data.csv');
  let promiseData: any = []
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', function(data) {
      promiseData.push(data)
    })
    .on('end', () => {
      resolve(promiseData);
    })
  })
}

function writeCsvFile(data: Coffee) {
  const csvFilePath = path.resolve(__dirname, '../assets/coffee-data.csv');

  //Get file information
  const file = fs.statSync(csvFilePath);
  const isFileEmpty = file.size === 0 ? false : true;

  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
      { id: 'name', title: 'name' },
      { id: 'price', title: 'price' },
      { id: 'weight', title: 'weight' },
      { id: 'roastGrade', title: 'roastGrade' },
    ],
    append: isFileEmpty // If file is empty, add headers to the file. If not then append.
  });

  const records = [
    { name: data.name, price: data.price, weight: data.weight, roastGrade: data.roastGrade },
  ]

  csvWriter.writeRecords(records)      
} 

// Add new coffee to the list
router.post("/add", async (req: Request, res: Response) => {
  try {
    const { name, price, weight, roastGrade } = req.body

    const newCoffee = new Coffee();
    newCoffee.name = name;
    newCoffee.price = price;
    newCoffee.weight = weight;
    newCoffee.roastGrade = roastGrade;

    writeCsvFile(newCoffee);
    res.status(200).json(newCoffee);
  } catch (err) {
    res.status(500).json(err);
  }

})

// Get all coffees from the list
router.get("/", async (req: Request, res: Response) => {
  try {
    let promiseData = await readCsvFile();
    res.status(200).json(promiseData)
  } catch(err) {
    res.status(500).json(err);
  }
})

module.exports = router;