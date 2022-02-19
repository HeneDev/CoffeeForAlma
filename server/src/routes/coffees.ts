const router = require("express").Router();
import { Request, Response} from 'express'
import fs from 'fs'
import path from 'path';
import { ICoffee } from '../models/CoffeeModel'
import csv from 'csv-parser';

function createCsvFile() {
  const filePath = path.resolve(__dirname, '../assets/coffee-data.csv')
  // Creates an empty file to the assets folder
  fs.writeFile(filePath, "", (err) => {
    if (err) throw err;
  })
}

export async function readCsvFile() {
  const csvFilePath = path.resolve(__dirname, '../assets/coffee-data.csv');
  let promiseData: any = []
  // Due to async function, returns a Promise.
  return new Promise<ICoffee>((resolve) => {
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

export function writeCsvFile(data: ICoffee) {
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

  // Record is added to the csv file
  const records = [
    { name: data.name, price: data.price, weight: data.weight, roastGrade: data.roastGrade },
  ]
  // Writes to the file
  csvWriter.writeRecords(records)      
} 

// Add new coffee to the list
router.post("/add", async (req: Request, res: Response) => {
  try {
    const { name, price, weight, roastGrade } = req.body

    const newCoffee = new ICoffee();
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
  const csvFilePath = path.resolve(__dirname, '../assets/coffee-data.csv');

  try {
    //Check if the file exists. If it doesnt, create the file
    if (!fs.existsSync(csvFilePath)) {
      createCsvFile();
    }
    let promiseData = await readCsvFile();
    res.status(200).json(promiseData)
  } catch(err) {
    res.status(500).json(err);
  }
})

module.exports = router;