import MonetaryFormatter from "../resources/js/src/app/helper/MonetaryFormatter.js";

const INPUT = [
    [0, "0,00"],
    [1000, "1.000,00"],
    [0.5, "0,50"],
    [0.50, "0,50"],
    [0.05, "0,05"],
    [1.0050, "1,01"],
    [1.0049, "1,00"],
    [1.00499, "1,00"],
    [1.004999, "1,00"],
    [1.0099, "1,01"],
    [18.99, "18,99"],
    [18.9499, "18,95"],
    [99.99, "99,99"],
    [99.9949, "99,99"],
    [99.9950, "100,00"],
    [99.9999, "100,00"]
];

global.App = {
    currencyPattern: {
        pattern: "#,##0.00 ¤",
        separator_thousands: ".",
        separator_decimal: ",",
        symbols: {
            "EUR": "€"
        }
    },
    config: {
        currency: {
            format: "name"
        }
    }
};

const formatter = new MonetaryFormatter();
let errorCount = 0;
let testCount = 0;
let result;
let expected;

INPUT.forEach(input =>
{
    Object.keys(global.App.currencyPattern.symbols).forEach(currency =>
    {
        global.App.config.currency.format = "name";
        result   = formatter.format(input[0], currency);
        expected = input[1] + " " + currency;
        testCount++;


        if (result !== expected)
        {
            errorCount++;
            console.error(`Error formatting ${input[0]}: Expected "${expected}" got "${result}"`);
        }

        global.App.config.currency.format = "symbol";
        result   = formatter.format(input[0], currency);
        expected = input[1] + " " + global.App.currencyPattern.symbols[currency];
        testCount++;

        if (result !== expected)
        {
            errorCount++;
            console.error(`Error formatting ${input[0]}: Expected "${expected}" got "${result}"`);
        }
    });
});

console.log(`Run ${testCount} tests with ${errorCount} errors.`);
