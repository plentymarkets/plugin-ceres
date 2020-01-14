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
const CURRENCY = "EUR";

global.App = {
    currencyPattern: {
        pattern: "#,##0.00 ¤",
        separator_thousands: ".",
        separator_decimal: ","
    }
};

const formatter = new MonetaryFormatter();
let errorCount = 0;

INPUT.forEach(input =>
{
    const result   = formatter.format(input[0], CURRENCY);
    const expected = input[1] + " " + CURRENCY;

    if (result !== expected)
    {
        errorCount++;
        console.error(`Error formatting ${input[0]}: Expected "${expected}" got "${result}"`);
    }
});

console.log(`Run ${INPUT.length} tests with ${errorCount} errors.`);
