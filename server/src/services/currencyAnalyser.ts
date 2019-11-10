'use struct';
// Import necessary libraries
import * as util from 'util';
import * as fs from 'fs';
import * as path from "path";
import ProfitAnalyser from "./profitAnalyser";
import CurrencyDataFormatter from "./currencyDataFormatter";
// promisify the async readfile function
const readFile = util.promisify(fs.readFile);
// Default path for CurrencyAnalyser class
const defaultPath: string = path.join(__dirname, '../../data/currency.json')
// Class for analysing currencies
export default class CurrencyAnalyser {
  currencies: Array<Object>;
  path: string
  // Initialise currencies and path
  constructor(currencies = [], path = defaultPath){
    this.currencies = currencies;
    this.path = path;
  }
  /*
    Async function for reloading data from json file
    The function takes the path to the file to be read as an argument
    The function returns the json data read from the file
  */
  async reloadData(path: string = this.path): Promise<Array<Object>>{
    const data: string = await readFile(path, 'utf8');
    // If the file is empty then return an empty array
    if (!data) return [];
    // If the file is not empty then set currencies to the json data and return it
    this.currencies = JSON.parse(data).data;
    return this.currencies;
  }
  /*
    Function for analysing the currencies and finding the best possible buy and sell price that maximises the profit
    The function takes the interval fromDate and toDate as well as a list of currency names
    The function returns an object containing the best possible buy and sell price that maximises the profit. The object has the following structure
    {
      <CurrencyName>:
      {
        buy: {date: <Date of the best price>, time: '<Time of the best buy price>', price: <The price of the currency>},
        sell: {date: <Date of the best sell>, time: '<Time of the best buy sell>', price: <The price of the currency>},
        profit: <The actul profit made>
      }
    }
  */
  annalyseCurrency(fromDate: string = '20180507', toDate: string = '20180508', currencyList: Array<string> = []): Object{
    // Filter the currency list based on the filter parameters
    const filteredCurrencies: Array<Object> = this.currencies.filter((data) =>
      parseInt(data['date'])>=parseInt(fromDate)&&parseInt(data['date'])<parseInt(toDate)&&currencyList.includes(data['currency'])
    )
    // Instansiate the CurrencyDataFormatter object
    const currencyDataFormatter = new CurrencyDataFormatter(filteredCurrencies);
    // Format the currency data
    const formattedCurrencies = currencyDataFormatter.formatCurrencies();
    // Get all the currency names
    const keys = Object.keys(formattedCurrencies)
    // Get all the profits for each currencies and store them in profits
    const profits: Object = {};
    keys.forEach(key => {
      const profitAnalyser = new ProfitAnalyser(formattedCurrencies[key]);
      profits[key] =  profitAnalyser.getProfit()
    });
    // Return the profit data
    return profits;
  }
  /*
    Function for getting all the unique currency names
    The function does not take any arguments
    The function returns a list of currency names
  */
  getCurrencies(): Array<string>{
    // Get the currency name from each currency object
    const currencyNames = Array.from(new Set(this.currencies.map(data => data['currency'])));
    return currencyNames;
  }
}



