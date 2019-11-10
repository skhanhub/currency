// This file handles the /api/profits route
"use strict";
// Import necessary libraries
import * as express from "express";
import * as path from "path";
import CurrencyAnalyser from '../services/currencyAnalyser'
// Use the express router function to create a new route
const router = express.Router();

/*
  Post route for retriving the best possible buy and sell price for the given data
  This route takse the interval fromDate and toDate as well as a list of currencies as the post body.
  It returns an object of the following structure
  {
    <CurrencyName>:
    {
      buy: {date: <Date of the best price>, time: '<Time of the best buy price>', price: <The price of the currency>},
      sell: {date: <Date of the best sell>, time: '<Time of the best buy sell>', price: <The price of the currency>},
      profit: <The actul profit made>
    }
  }
*/
router.post('/', async (req, res, next) => {
  try{
    // Extract all the data from post body
    const fromDate: string = req.body.fromDate;
    const toDate: string = req.body.toDate;
    const currencySelected: Array<string> = req.body.currencySelected;
    // Instansiate the CurrencyAnalyser object
    const currencyAnalyser = new CurrencyAnalyser([], path.join(__dirname, '../../data/currency.json'));
    // Load the most recent data
    await currencyAnalyser.reloadData()
    // Annalyse the currencies
    // throw new Error('error');
    const result = currencyAnalyser.annalyseCurrency(fromDate, toDate, currencySelected);
    // Return the profit data
    res.status(200).json(result); // Reply with the result object
  } catch(err) {
    // If there is an error then pass the error to the next function
    return next(err);
  }
})

// Export router as the default object
export default router;
