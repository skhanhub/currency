'use struct';
// Import necessary libraries
import * as chai from 'chai';
import ProfitAnalyser from "../../src/services/profitAnalyser"
// Use expect from chai for assertion
const expect = chai.expect;
// Fake data for the test
const currencies: Array<Object> = [
  {"date": "20180507", "time":"0915", "price":"6"},
  {"date": "20180507", "time":"1045", "price":"8"},
  {"date": "20180507", "time":"1230", "price":"4"},
  {"date": "20180508", "time":"1400", "price":"10"},
  {"date": "20180508", "time":"1530", "price":"2"},
  {"date": "20180508", "time":"1600", "price":"5"}
]
describe("Test profitAnalyser class", function(){
  it('should return the best possible buy and sell price that maximises the profit for the given data', function() {
    // Initialise the unit under test
    let profitAnalyser: any = new ProfitAnalyser(currencies);
    let result: Object = profitAnalyser.getProfit();
    // Compare the result
    expect(result['buy']).to.deep.equal({date: '20180507', time: '1230', price: 4})
    expect(result['sell']).to.deep.equal({date: '20180508', time: '1400', price: 10})
    expect(result['profit']).to.equal(6)
  });
});

