'use struct';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary libraries
var util = require("util");
var fs = require("fs");
var path = require("path");
var profitAnalyser_1 = require("./profitAnalyser");
var currencyDataFormatter_1 = require("./currencyDataFormatter");
// promisify the async readfile function
var readFile = util.promisify(fs.readFile);
// Default path for CurrencyAnalyser class
var defaultPath = path.join(__dirname, '../../data/currency.json');
// Class for analysing currencies
var CurrencyAnalyser = /** @class */ (function () {
    // Initialise currencies and path
    function CurrencyAnalyser(currencies, path) {
        if (currencies === void 0) { currencies = []; }
        if (path === void 0) { path = defaultPath; }
        this.currencies = currencies;
        this.path = path;
    }
    /*
      Async function for reloading data from json file
      The function takes the path to the file to be read as an argument
      The function returns the json data read from the file
    */
    CurrencyAnalyser.prototype.reloadData = function (path) {
        if (path === void 0) { path = this.path; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, readFile(path, 'utf8')];
                    case 1:
                        data = _a.sent();
                        // If the file is empty then return an empty array
                        if (!data)
                            return [2 /*return*/, []];
                        // If the file is not empty then set currencies to the json data and return it
                        this.currencies = JSON.parse(data).data;
                        return [2 /*return*/, this.currencies];
                }
            });
        });
    };
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
    CurrencyAnalyser.prototype.annalyseCurrency = function (fromDate, toDate, currencyList) {
        if (fromDate === void 0) { fromDate = '20180507'; }
        if (toDate === void 0) { toDate = '20180508'; }
        if (currencyList === void 0) { currencyList = []; }
        // Filter the currency list based on the filter parameters
        var filteredCurrencies = this.currencies.filter(function (data) {
            return parseInt(data['date']) >= parseInt(fromDate) && parseInt(data['date']) < parseInt(toDate) && currencyList.includes(data['currency']);
        });
        // Instansiate the CurrencyDataFormatter object
        var currencyDataFormatter = new currencyDataFormatter_1.default(filteredCurrencies);
        // Format the currency data
        var formattedCurrencies = currencyDataFormatter.formatCurrencies();
        // Get all the currency names
        var keys = Object.keys(formattedCurrencies);
        // Get all the profits for each currencies and store them in profits
        var profits = {};
        keys.forEach(function (key) {
            var profitAnalyser = new profitAnalyser_1.default(formattedCurrencies[key]);
            profits[key] = profitAnalyser.getProfit();
        });
        // Return the profit data
        return profits;
    };
    /*
      Function for getting all the unique currency names
      The function does not take any arguments
      The function returns a list of currency names
    */
    CurrencyAnalyser.prototype.getCurrencies = function () {
        // Get the currency name from each currency object
        var currencyNames = Array.from(new Set(this.currencies.map(function (data) { return data['currency']; })));
        return currencyNames;
    };
    return CurrencyAnalyser;
}());
exports.default = CurrencyAnalyser;
//# sourceMappingURL=currencyAnalyser.js.map