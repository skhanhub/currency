'use struct';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Class for formatting currency data
var CurrencyDataFormatter = /** @class */ (function () {
    // Initialise currencies
    function CurrencyDataFormatter(currencies) {
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
    CurrencyDataFormatter.prototype.formatCurrencies = function () {
        var result = {};
        this.currencies.forEach(function (currencyDay) {
            currencyDay['quotes'].forEach(function (currency) {
                if (currencyDay['currency'] in result)
                    result[currencyDay['currency']].push({ date: currencyDay['date'], time: currency['time'], price: currency['price'] });
                else
                    result[currencyDay['currency']] = [{ date: currencyDay['date'], time: currency['time'], price: currency['price'] }];
            });
        });
        return result;
    };
    return CurrencyDataFormatter;
}());
exports.default = CurrencyDataFormatter;
//# sourceMappingURL=currencyDataFormatter.js.map