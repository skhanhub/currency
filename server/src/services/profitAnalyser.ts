'use struct';
// Class for annalysing profits
export default class ProfitAnalyser {
  currency: Array<Object>;
  // Initialise currencies
  constructor(currency){
    this.currency = currency;
  }
  /*
    Function for getting the maximum profit for each currencies
    The function does not take anty
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
  getProfit(): Object{
    let result = {buy: {}, sell: {}, profit: Number.MIN_VALUE}
    const currency = this.currency;
    for(let i = 0; i < currency.length; i++){
      for(let j = i+1; j < currency.length; j++){
        if(result['profit']<currency[j]['price']-currency[i]['price'])
          result ={buy: {
              date: currency[i]['date'], time: currency[i]['time'], price: parseFloat(currency[i]['price'])
            },
            sell: {
              date: currency[j]['date'], time: currency[j]['time'], price: parseFloat(currency[j]['price'])
            },
            profit: parseFloat(currency[j]['price'])- parseFloat(currency[i]['price'])}
      }
    }

    return result;
  }
}

