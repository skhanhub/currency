// Class for annalysing profits
interface Action {
  date: string;
  time: string;
  price: number;
}
interface OGetProfit {
  buy: Action;
  sell: Action;
  profit: number;
}

export default class ProfitAnalyser {
  currency: Array<Object>;
  // Initialise currencies
  constructor(currency){
    this.currency = currency;
  }
  /*
    Function for getting the maximum profit for each currencies
    The function does not take any arguments
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
  getProfit(): OGetProfit{
    let result = {
      buy: {date: '', time: '', price: 0},
      sell: {date: '', time: '', price: 0},
      profit: Number.MIN_VALUE
    }
    const currency = this.currency;
    for(let i = 0; i < currency.length; i++){
      for(let j = i+1; j < currency.length; j++){
        if(result['profit']<currency[j]['price']-currency[i]['price']){
          result ={
            buy: {
              date: currency[i]['date'], time: currency[i]['time'], price: (currency[i]['price'])
            },
            sell: {
              date: currency[j]['date'], time: currency[j]['time'], price: (currency[j]['price'])
            },
            profit: (currency[j]['price'])- (currency[i]['price'])
          }
        }
      }
    }
    // console.log(result)
    return result;
  }
}

