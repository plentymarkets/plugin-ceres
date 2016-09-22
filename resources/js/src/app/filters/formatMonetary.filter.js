var currencySymbolMap = require('currency-symbol-map');
var accounting        = require('accounting');

Vue.filter( 'formatMonetary', function( price, currency ) {

  var currencySymbol = currencySymbolMap.getSymbolFromCurrency(currency);
  if (currencySymbol)
  {
      currency = currencySymbol;
  }

  // (%v = value, %s = symbol)
  var options = {
    symbol : currency,
    decimal : ",",
    thousand: ".",
    precision : 2,
    format: "%v %s"
  };

  return accounting.formatMoney(price, options);

});
