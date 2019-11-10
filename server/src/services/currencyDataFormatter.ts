'use strict';

interface OFormatCurrencies {
  [key: string]: Array<{
    date: string;
    time: string;
    price: number;
  }>;
}
// Class for formatting currency data
export default class CurrencyDataFormatter {
  currencies: Array<Object>;
  // Initialise currencies
  constructor(currencies){
    this.currencies = currencies;
  }
  /*
    Function for formatting currency data
    The function does not take any arguments
    The function returns an object containing the best possible buy and sell price that maximises the profit. The object has the following structure
    {
      <CurrencyName>: [{date: <date>, time: <time>, price: <profit>}]
    }
  */
  formatCurrencies(): OFormatCurrencies{
    let result = {};
    this.currencies.forEach(currencyDay => {
      currencyDay['quotes'].forEach(currency => {
        if(currencyDay['currency'] in result)
          result[currencyDay['currency']].push({date: currencyDay['date'], time: currency['time'], price: parseFloat(currency['price'])});
        else
          result[currencyDay['currency']] = [{date: currencyDay['date'], time: currency['time'], price: parseFloat(currency['price'])}];
      });
    });
    return result;
  }
}
