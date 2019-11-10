// This file handles the /api/currencies route
"use strict";
// Import necessary libraries
import * as express from "express";
import * as path from "path";
import CurrencyAnalyser from '../services/currencyAnalyser'
// Use the express router function to create a new route
const router = express.Router();

/*
  get route for fetching all the currency names
  This route does not take any arguments
  It returns the a list of currency names
*/
router.get('/', async (req, res, next) => {
  try{
    // Instansiate the CurrencyAnalyser object
    const currencyAnalyser = new CurrencyAnalyser([], path.join(__dirname, '../../data/currency.json'));
    // Load the most recent data
    await currencyAnalyser.reloadData()
    // Get all the currency names
    const result = currencyAnalyser.getCurrencies();
    // Return the currency list
    res.status(200).json(result); // Reply with the result object
  } catch(err) {
    // If there is an error then pass the error to the next function
    return next(err);
  }
})

// Export router as the default object
export default router;
