(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * accounting.js v0.4.1
 * Copyright 2014 Open Exchange Rates
 *
 * Freely distributable under the MIT license.
 * Portions of accounting.js are inspired or borrowed from underscore.js
 *
 * Full details and documentation:
 * http://openexchangerates.github.io/accounting.js/
 */

(function(root, undefined) {

	/* --- Setup --- */

	// Create the local library object, to be exported or referenced globally later
	var lib = {};

	// Current version
	lib.version = '0.4.1';


	/* --- Exposed settings --- */

	// The library's settings configuration object. Contains default parameters for
	// currency and number formatting
	lib.settings = {
		currency: {
			symbol : "$",		// default currency symbol is '$'
			format : "%s%v",	// controls output: %s = symbol, %v = value (can be object, see docs)
			decimal : ".",		// decimal point separator
			thousand : ",",		// thousands separator
			precision : 2,		// decimal places
			grouping : 3		// digit grouping (not implemented yet)
		},
		number: {
			precision : 0,		// default precision on numbers is 0
			grouping : 3,		// digit grouping (not implemented yet)
			thousand : ",",
			decimal : "."
		}
	};


	/* --- Internal Helper Methods --- */

	// Store reference to possibly-available ECMAScript 5 methods for later
	var nativeMap = Array.prototype.map,
		nativeIsArray = Array.isArray,
		toString = Object.prototype.toString;

	/**
	 * Tests whether supplied parameter is a string
	 * from underscore.js
	 */
	function isString(obj) {
		return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
	}

	/**
	 * Tests whether supplied parameter is a string
	 * from underscore.js, delegates to ECMA5's native Array.isArray
	 */
	function isArray(obj) {
		return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]';
	}

	/**
	 * Tests whether supplied parameter is a true object
	 */
	function isObject(obj) {
		return obj && toString.call(obj) === '[object Object]';
	}

	/**
	 * Extends an object with a defaults object, similar to underscore's _.defaults
	 *
	 * Used for abstracting parameter handling from API methods
	 */
	function defaults(object, defs) {
		var key;
		object = object || {};
		defs = defs || {};
		// Iterate over object non-prototype properties:
		for (key in defs) {
			if (defs.hasOwnProperty(key)) {
				// Replace values with defaults only if undefined (allow empty/zero values):
				if (object[key] == null) object[key] = defs[key];
			}
		}
		return object;
	}

	/**
	 * Implementation of `Array.map()` for iteration loops
	 *
	 * Returns a new Array as a result of calling `iterator` on each array value.
	 * Defers to native Array.map if available
	 */
	function map(obj, iterator, context) {
		var results = [], i, j;

		if (!obj) return results;

		// Use native .map method if it exists:
		if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);

		// Fallback for native .map:
		for (i = 0, j = obj.length; i < j; i++ ) {
			results[i] = iterator.call(context, obj[i], i, obj);
		}
		return results;
	}

	/**
	 * Check and normalise the value of precision (must be positive integer)
	 */
	function checkPrecision(val, base) {
		val = Math.round(Math.abs(val));
		return isNaN(val)? base : val;
	}


	/**
	 * Parses a format string or object and returns format obj for use in rendering
	 *
	 * `format` is either a string with the default (positive) format, or object
	 * containing `pos` (required), `neg` and `zero` values (or a function returning
	 * either a string or object)
	 *
	 * Either string or format.pos must contain "%v" (value) to be valid
	 */
	function checkCurrencyFormat(format) {
		var defaults = lib.settings.currency.format;

		// Allow function as format parameter (should return string or object):
		if ( typeof format === "function" ) format = format();

		// Format can be a string, in which case `value` ("%v") must be present:
		if ( isString( format ) && format.match("%v") ) {

			// Create and return positive, negative and zero formats:
			return {
				pos : format,
				neg : format.replace("-", "").replace("%v", "-%v"),
				zero : format
			};

		// If no format, or object is missing valid positive value, use defaults:
		} else if ( !format || !format.pos || !format.pos.match("%v") ) {

			// If defaults is a string, casts it to an object for faster checking next time:
			return ( !isString( defaults ) ) ? defaults : lib.settings.currency.format = {
				pos : defaults,
				neg : defaults.replace("%v", "-%v"),
				zero : defaults
			};

		}
		// Otherwise, assume format was fine:
		return format;
	}


	/* --- API Methods --- */

	/**
	 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
	 * Alias: `accounting.parse(string)`
	 *
	 * Decimal must be included in the regular expression to match floats (defaults to
	 * accounting.settings.number.decimal), so if the number uses a non-standard decimal 
	 * separator, provide it as the second argument.
	 *
	 * Also matches bracketed negatives (eg. "$ (1.99)" => -1.99)
	 *
	 * Doesn't throw any errors (`NaN`s become 0) but this may change in future
	 */
	var unformat = lib.unformat = lib.parse = function(value, decimal) {
		// Recursively unformat arrays:
		if (isArray(value)) {
			return map(value, function(val) {
				return unformat(val, decimal);
			});
		}

		// Fails silently (need decent errors):
		value = value || 0;

		// Return the value as-is if it's already a number:
		if (typeof value === "number") return value;

		// Default decimal point comes from settings, but could be set to eg. "," in opts:
		decimal = decimal || lib.settings.number.decimal;

		 // Build regex to strip out everything except digits, decimal point and minus sign:
		var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
			unformatted = parseFloat(
				("" + value)
				.replace(/\((.*)\)/, "-$1") // replace bracketed values with negatives
				.replace(regex, '')         // strip out any cruft
				.replace(decimal, '.')      // make sure decimal point is standard
			);

		// This will fail silently which may cause trouble, let's wait and see:
		return !isNaN(unformatted) ? unformatted : 0;
	};


	/**
	 * Implementation of toFixed() that treats floats more like decimals
	 *
	 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
	 * problems for accounting- and finance-related software.
	 */
	var toFixed = lib.toFixed = function(value, precision) {
		precision = checkPrecision(precision, lib.settings.number.precision);
		var power = Math.pow(10, precision);

		// Multiply up by precision, round accurately, then divide and use native toFixed():
		return (Math.round(lib.unformat(value) * power) / power).toFixed(precision);
	};


	/**
	 * Format a number, with comma-separated thousands and custom precision/decimal places
	 * Alias: `accounting.format()`
	 *
	 * Localise by overriding the precision and thousand / decimal separators
	 * 2nd parameter `precision` can be an object matching `settings.number`
	 */
	var formatNumber = lib.formatNumber = lib.format = function(number, precision, thousand, decimal) {
		// Resursively format arrays:
		if (isArray(number)) {
			return map(number, function(val) {
				return formatNumber(val, precision, thousand, decimal);
			});
		}

		// Clean up number:
		number = unformat(number);

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(precision) ? precision : {
					precision : precision,
					thousand : thousand,
					decimal : decimal
				}),
				lib.settings.number
			),

			// Clean up precision
			usePrecision = checkPrecision(opts.precision),

			// Do some calc:
			negative = number < 0 ? "-" : "",
			base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "",
			mod = base.length > 3 ? base.length % 3 : 0;

		// Format the number:
		return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
	};


	/**
	 * Format a number into currency
	 *
	 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
	 * defaults: (0, "$", 2, ",", ".", "%s%v")
	 *
	 * Localise by overriding the symbol, precision, thousand / decimal separators and format
	 * Second param can be an object matching `settings.currency` which is the easiest way.
	 *
	 * To do: tidy up the parameters
	 */
	var formatMoney = lib.formatMoney = function(number, symbol, precision, thousand, decimal, format) {
		// Resursively format arrays:
		if (isArray(number)) {
			return map(number, function(val){
				return formatMoney(val, symbol, precision, thousand, decimal, format);
			});
		}

		// Clean up number:
		number = unformat(number);

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(symbol) ? symbol : {
					symbol : symbol,
					precision : precision,
					thousand : thousand,
					decimal : decimal,
					format : format
				}),
				lib.settings.currency
			),

			// Check format (returns object with pos, neg and zero):
			formats = checkCurrencyFormat(opts.format),

			// Choose which format to use for this value:
			useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;

		// Return with currency symbol added:
		return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
	};


	/**
	 * Format a list of numbers into an accounting column, padding with whitespace
	 * to line up currency symbols, thousand separators and decimals places
	 *
	 * List should be an array of numbers
	 * Second parameter can be an object containing keys that match the params
	 *
	 * Returns array of accouting-formatted number strings of same length
	 *
	 * NB: `white-space:pre` CSS rule is required on the list container to prevent
	 * browsers from collapsing the whitespace in the output strings.
	 */
	lib.formatColumn = function(list, symbol, precision, thousand, decimal, format) {
		if (!list) return [];

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(symbol) ? symbol : {
					symbol : symbol,
					precision : precision,
					thousand : thousand,
					decimal : decimal,
					format : format
				}),
				lib.settings.currency
			),

			// Check format (returns object with pos, neg and zero), only need pos for now:
			formats = checkCurrencyFormat(opts.format),

			// Whether to pad at start of string or after currency symbol:
			padAfterSymbol = formats.pos.indexOf("%s") < formats.pos.indexOf("%v") ? true : false,

			// Store value for the length of the longest string in the column:
			maxLength = 0,

			// Format the list according to options, store the length of the longest string:
			formatted = map(list, function(val, i) {
				if (isArray(val)) {
					// Recursively format columns if list is a multi-dimensional array:
					return lib.formatColumn(val, opts);
				} else {
					// Clean up the value
					val = unformat(val);

					// Choose which format to use for this value (pos, neg or zero):
					var useFormat = val > 0 ? formats.pos : val < 0 ? formats.neg : formats.zero,

						// Format this value, push into formatted list and save the length:
						fVal = useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(val), checkPrecision(opts.precision), opts.thousand, opts.decimal));

					if (fVal.length > maxLength) maxLength = fVal.length;
					return fVal;
				}
			});

		// Pad each number in the list and send back the column of numbers:
		return map(formatted, function(val, i) {
			// Only if this is a string (not a nested array, which would have already been padded):
			if (isString(val) && val.length < maxLength) {
				// Depending on symbol position, pad after symbol or at index 0:
				return padAfterSymbol ? val.replace(opts.symbol, opts.symbol+(new Array(maxLength - val.length + 1).join(" "))) : (new Array(maxLength - val.length + 1).join(" ")) + val;
			}
			return val;
		});
	};


	/* --- Module Definition --- */

	// Export accounting for CommonJS. If being loaded as an AMD module, define it as such.
	// Otherwise, just add `accounting` to the global object
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = lib;
		}
		exports.accounting = lib;
	} else if (typeof define === 'function' && define.amd) {
		// Return the library as an AMD module:
		define([], function() {
			return lib;
		});
	} else {
		// Use accounting.noConflict to restore `accounting` back to its original value.
		// Returns a reference to the library's `accounting` object;
		// e.g. `var numbers = accounting.noConflict();`
		lib.noConflict = (function(oldAccounting) {
			return function() {
				// Reset the value of the root's `accounting` variable:
				root.accounting = oldAccounting;
				// Delete the noConflict method:
				lib.noConflict = undefined;
				// Return reference to the library to re-assign it:
				return lib;
			};
		})(root.accounting);

		// Declare `fx` on the root (global/window) object:
		root['accounting'] = lib;
	}

	// Root will be `window` in browser or `global` on the server:
}(this));

},{}],2:[function(require,module,exports){
var currencySymbolMap = require('./map');

var symbolCurrencyMap = {};
for (var key in currencySymbolMap) {
  if (currencySymbolMap.hasOwnProperty(key)) {
    var currency = key;
    var symbol = currencySymbolMap[currency];
    symbolCurrencyMap[symbol] = currency;
  }
}

function getSymbolFromCurrency(currencyCode) {
  if (currencySymbolMap.hasOwnProperty(currencyCode)) {
    return currencySymbolMap[currencyCode];
  } else {
    return undefined;
  }
}

function getCurrencyFromSymbol(symbol) {
  if (symbolCurrencyMap.hasOwnProperty(symbol)) {
    return symbolCurrencyMap[symbol];
  } else {
    return undefined;
  }
}

function getSymbol(currencyCode) {
  //Deprecated
  var symbol = getSymbolFromCurrency(currencyCode);
  return symbol !== undefined ? symbol : '?';
}

module.exports = getSymbol; //Backward compatibility
module.exports.getSymbolFromCurrency = getSymbolFromCurrency;
module.exports.getCurrencyFromSymbol = getCurrencyFromSymbol;
module.exports.symbolCurrencyMap = symbolCurrencyMap;
module.exports.currencySymbolMap = currencySymbolMap;

},{"./map":3}],3:[function(require,module,exports){
module.exports =
{ "ALL": "L"
, "AFN": "؋"
, "ARS": "$"
, "AWG": "ƒ"
, "AUD": "$"
, "AZN": "₼"
, "BSD": "$"
, "BBD": "$"
, "BYR": "p."
, "BZD": "BZ$"
, "BMD": "$"
, "BOB": "Bs."
, "BAM": "KM"
, "BWP": "P"
, "BGN": "лв"
, "BRL": "R$"
, "BND": "$"
, "KHR": "៛"
, "CAD": "$"
, "KYD": "$"
, "CLP": "$"
, "CNY": "¥"
, "COP": "$"
, "CRC": "₡"
, "HRK": "kn"
, "CUP": "₱"
, "CZK": "Kč"
, "DKK": "kr"
, "DOP": "RD$"
, "XCD": "$"
, "EGP": "£"
, "SVC": "$"
, "EEK": "kr"
, "EUR": "€"
, "FKP": "£"
, "FJD": "$"
, "GHC": "₵"
, "GIP": "£"
, "GTQ": "Q"
, "GGP": "£"
, "GYD": "$"
, "HNL": "L"
, "HKD": "$"
, "HUF": "Ft"
, "ISK": "kr"
, "INR": "₹"
, "IDR": "Rp"
, "IRR": "﷼"
, "IMP": "£"
, "ILS": "₪"
, "JMD": "J$"
, "JPY": "¥"
, "JEP": "£"
, "KES": "KSh"
, "KZT": "лв"
, "KPW": "₩"
, "KRW": "₩"
, "KGS": "лв"
, "LAK": "₭"
, "LVL": "Ls"
, "LBP": "£"
, "LRD": "$"
, "LTL": "Lt"
, "MKD": "ден"
, "MYR": "RM"
, "MUR": "₨"
, "MXN": "$"
, "MNT": "₮"
, "MZN": "MT"
, "NAD": "$"
, "NPR": "₨"
, "ANG": "ƒ"
, "NZD": "$"
, "NIO": "C$"
, "NGN": "₦"
, "NOK": "kr"
, "OMR": "﷼"
, "PKR": "₨"
, "PAB": "B/."
, "PYG": "Gs"
, "PEN": "S/."
, "PHP": "₱"
, "PLN": "zł"
, "QAR": "﷼"
, "RON": "lei"
, "RUB": "₽"
, "SHP": "£"
, "SAR": "﷼"
, "RSD": "Дин."
, "SCR": "₨"
, "SGD": "$"
, "SBD": "$"
, "SOS": "S"
, "ZAR": "R"
, "LKR": "₨"
, "SEK": "kr"
, "CHF": "CHF"
, "SRD": "$"
, "SYP": "£"
, "TZS": "TSh"
, "TWD": "NT$"
, "THB": "฿"
, "TTD": "TT$"
, "TRY": ""
, "TRL": "₤"
, "TVD": "$"
, "UGX": "USh"
, "UAH": "₴"
, "GBP": "£"
, "USD": "$"
, "UYU": "$U"
, "UZS": "лв"
, "VEF": "Bs"
, "VND": "₫"
, "YER": "﷼"
, "ZWD": "Z$"
}

},{}],4:[function(require,module,exports){
var ResourceService     = require("services/ResourceService");
var ModalService        = require("services/ModalService");

Vue.component("add-item-to-basket-overlay", {

    props: [
        "showOverlay",
        "template"
    ],

    data: function()
    {
        return {
            basketItem: {currentBasketItem: { }},
            timeToClose: 0,
            price: 0,
            currency: ""
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        ResourceService.bind("basketItem", this);
    },

    watch: {
        basketItem: function()
        {
            if (this.showOverlay)
            {
                ModalService.findModal(document.getElementById("add-item-to-basket-overlay")).show();
            }
        }
    },

    methods: {

        /**
         * check if current basket object exist and start rendering
         */
        startRendering: function()
        {
            var render = Object.keys(this.basketItem.currentBasketItem).length != 0;

            if (render)
            {
                this.startCounter();
            }

            this.setPriceFromData();

            return render;
        },

        setPriceFromData: function()
        {
            if (this.basketItem.currentBasketItem.calculatedPrices)
            {
                this.price = this.basketItem.currentBasketItem.calculatedPrices.default.price;
                this.currency = this.basketItem.currentBasketItem.calculatedPrices.default.currency;
            }
        },

        /**
         * @returns {string}
         */
        getImage: function()
        {
            var path = "";

            for (var i = 0; i < this.basketItem.currentBasketItem.variationImageList.length; i++)
            {
                if (this.basketItem.currentBasketItem.variationImageList[i].path !== "")
                {
                    path = this.basketItem.currentBasketItem.variationImageList[i].path;
                }
            }

            return "/" + path;
        },

        startCounter: function()
        {
            this.timeToClose = 10;

            var timerVar = setInterval(countTimer, 1000);

            var self = this;

            function countTimer()
            {
                self.timeToClose -= 1;

                if (self.timeToClose === 0)
                {
                    ModalService.findModal(document.getElementById("add-item-to-basket-overlay")).hide();

                    clearInterval(timerVar);
                }
            }
        }
    },

    computed:
    {
        /**
         * returns itemData.texts[0]
         */
        texts: function()
        {
            return this.basketItem.currentBasketItem.texts[0];
        }
    }
});

},{"services/ModalService":72,"services/ResourceService":74}],5:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.component("add-to-basket", {

    props: [
        "item",
        "itemUrl",
        "showQuantity",
        "template"
    ],

    data: function()
    {
        return {
            quantity: 1
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    computed:
    {
        /**
         * returns item.variation.id
         */
        variationId: function()
        {
            return this.item.variation.id;
        }
    },

    methods:
    {
        /**
         * add an item to basket-resource
         */
        addToBasket: function()
        {
            var basketObject =
                {
                    variationId: this.variationId,
                    quantity   : this.quantity
                };

            ResourceService
                .getResource("basketItems")
                .push(basketObject);

            this.openAddToBasketOverlay();
        },

        directToItem: function()
        {
            window.location.assign(this.itemUrl);
        },

        /**
         * open the AddItemToBasketOverlay
         */
        openAddToBasketOverlay: function()
        {
            var currentBasketObject =
                {
                    currentBasketItem: this.item,
                    quantity         : this.quantity
                };

            ResourceService
                .getResource("basketItem")
                .set(currentBasketObject);
        },

        /**
         * update the property quantity of the current instance
         * @param value
         */
        updateQuantity: function(value)
        {
            this.quantity = value;
        }
    }
});

},{"services/ResourceService":74}],6:[function(require,module,exports){
var ResourceService       = require("services/ResourceService");

Vue.component("basket-preview", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            basket: {},
            basketItems: []
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    /**
     * Bind to basket and bind the basket items
     */
    ready: function()
    {
        ResourceService.bind("basket", this);
        ResourceService.bind("basketItems", this);
    }
});

},{"services/ResourceService":74}],7:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.component("basket-totals", {

    props: [
        "config",
        "template"
    ],

    data: function()
    {
        return {
            basket: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    /**
     * Bind to basket
     */
    ready: function()
    {
        ResourceService.bind("basket", this);
    },

    methods:
    {
        /**
         * TODO
         * @param name
         * @returns {boolean}
         */
        showProperty: function(name)
        {
            return !this.config || this.config.indexOf(name) >= 0 || this.config.indexOf("all") >= 0;
        }
    }
});

},{"services/ResourceService":74}],8:[function(require,module,exports){
var ApiService = require("services/ApiService");
var ResourceService = require("services/ResourceService");
var NotificationService = require("services/NotificationService");

Vue.component("coupon", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            couponCode: "",
            basket: {},
            waiting: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
        ResourceService.bind("basket", this);
    },

    ready: function()
    {
        if (this.disabled)
        {
            this.couponCode = this.basket.couponCode;
        }
    },

    methods:
    {
        redeemCode: function()
        {
            this.waiting = true;
            var self = this;

            ApiService.post("/rest/io/coupon", {couponCode: this.couponCode})
                .always(function()
                {
                    self.waiting = false;
                })
                .done(function(response)
                {
                    NotificationService.success(Translations.Template.couponRedeemSuccess).closeAfter(10000);
                })
                .fail(function(response)
                {
                    NotificationService.error(Translations.Template.couponRedeemFailure).closeAfter(10000);
                });
        },

        removeCode: function()
        {
            this.waiting = true;
            var self = this;

            ApiService.delete("/rest/io/coupon/" + this.basket.couponCode)
                .always(function()
                {
                    self.waiting = false;
                })
                .done(function(response)
                {
                    self.couponCode = "";
                    NotificationService.success(Translations.Template.couponRemoveSuccess).closeAfter(10000);
                })
                .fail(function(response)
                {
                    NotificationService.error(Translations.Template.couponRemoveFailure).closeAfter(10000);
                });
        }
    },

    computed:
    {
        disabled: function()
        {
            if (this.basket.couponCode)
            {
                return true;
            }

            return false;
        }
    }
});

},{"services/ApiService":68,"services/NotificationService":73,"services/ResourceService":74}],9:[function(require,module,exports){
var ResourceService       = require("services/ResourceService");

Vue.component("basket-list", {

    props: [
        "size",
        "template"
    ],

    data: function()
    {
        return {
            basketItems: []
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    /**
     * Bind to basket and show the items in a small or large list
     */
    ready: function()
    {
        ResourceService.bind("basketItems", this);
        this.size = this.size || "large";

        if (this.size === "small")
        {
            ResourceService.watch("basket", function(newValue)
            {
                document.dispatchEvent(new CustomEvent("afterBasketChanged", {detail: newValue}));
            });
        }
    }
});

},{"services/ResourceService":74}],10:[function(require,module,exports){
var ResourceService       = require("services/ResourceService");
// var ApiService          = require("services/ApiService");
// var NotificationService = require("services/NotificationService");

Vue.component("basket-list-item", {

    props: [
        "basketItem",
        "size",
        "language",
        "template"
    ],

    data: function()
    {
        return {
            waiting: false,
            deleteConfirmed: false,
            deleteConfirmedTimeout: null,
            itemCondition: ""
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    methods: {

        /**
         * Delete item from basket
         */
        deleteItem: function()
        {
            var self = this;

            if (!this.deleteConfirmed)
            {
                this.deleteConfirmed = true;
                this.deleteConfirmedTimeout = window.setTimeout(
                    function()
                    {
                        self.resetDelete();
                    },
                    5000
                );
            }
            else
            {
                this.waiting = true;
                ResourceService
                    .getResource("basketItems")
                    .remove(this.basketItem.id)
                    .fail(function()
                    {
                        self.resetDelete();
                        self.waiting = false;
                    });
            }
        },

        /**
         * Update item quantity in basket
         * @param quantity
         */
        updateQuantity: function(quantity)
        {
            if (this.basketItem.quantity === quantity)
            {
                return;
            }

            this.basketItem.quantity = quantity;
            this.waiting = true;

            ResourceService
                .getResource("basketItems")
                .set(this.basketItem.id, this.basketItem)
                .fail(function()
                {
                    this.waiting = false;
                }.bind(this));
        },

        /**
         * Cancel delete
         */
        resetDelete: function()
        {
            this.deleteConfirmed = false;
            if (this.deleteConfirmedTimeout)
            {
                window.clearTimeout(this.deleteConfirmedTimeout);
            }
        }
    }
});

},{"services/ResourceService":74}],11:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.component("accept-gtc-check", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            isChecked: false,
            checkoutValidation: {gtc: {}}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
        ResourceService.bind("checkoutValidation", this);
        this.checkoutValidation.gtc.validate = this.validate;
    },

    methods:
    {
        validate: function()
        {
            this.checkoutValidation.gtc.showError = !this.isChecked;
        }
    },

    watch:
    {
        isChecked: function()
        {
            this.checkoutValidation.gtc.showError = false;
        }
    }
});

},{"services/ResourceService":74}],12:[function(require,module,exports){
Vue.component("order-details", {

    props: [
        "orderData",
        "totalsConfig",
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template;
    },

    computed: {
        orderItems: function()
        {
            if (this.orderData !== null)
            {
                return this.orderData.order.orderItems.filter(function(item)
                {
                    return item.itemVariationId > 0;
                });
            }

            return [];
        },

        shippingDate: function()
        {
            if (this.orderData !== null)
            {
                for (var date in this.orderData.order.dates)
                {
                    if (date.typeId === 8)
                    {
                        return date;
                    }
                }
            }
            return null;
        },

        paymentStatus: function()
        {
            if (this.orderData !== null)
            {
                for (var propertyKey in this.orderData.order.properties)
                {
                    var property = this.orderData.order.properties[propertyKey];

                    if (property.typeId === 13 && property.subTypeId === 3)
                    {
                        return property.value;
                    }
                }
            }
            return "";
        },

        totals: function()
        {
            if (this.orderData !== null)
            {
                var itemSum = 0;
                var itemSumNet = 0;
                var shippingCosts = 0;
                var shippingCostsNet = 0;
                var couponValue = 0;

                for (var i in this.orderData.order.orderItems)
                {
                    var orderItem = this.orderData.order.orderItems[i];

                    switch (orderItem.typeId)
                    {
                    // Item
                    case 1:
                        itemSum += orderItem.amounts[0].priceGross;
                        itemSumNet += orderItem.amounts[0].priceNet;
                        break;
                    // Bundle
                    case 2:

                        break;
                    // Bundle-component
                    case 3:

                        break;
                    // Aktionsgutschein
                    case 4:
                        couponValue += orderItem.amounts[0].priceGross;
                        break;
                    // Verkaufsgutschein
                    case 5:
                        couponValue += orderItem.amounts[0].priceGross;
                        break;
                    // Shipping-costs
                    case 6:
                        shippingCosts += orderItem.amounts[0].priceGross;
                        shippingCostsNet += orderItem.amounts[0].priceNet;
                        break;
                    // Peyment-fee
                    case 7:

                        break;
                    // Geschenke
                    case 8:

                        break;
                    // Pfand
                    case 10:

                        break;
                    }
                }

                return {
                    currency: this.orderData.order.amounts[0].currency,
                    itemSum: itemSum,
                    itemSumNet: itemSumNet,
                    shippingAmount: shippingCosts,
                    shippingAmountNet: shippingCostsNet,
                    vat: this.orderData.order.amounts[0].vatTotal,
                    couponValue: couponValue,
                    totalAmount: this.orderData.order.amounts[0].grossTotal,
                    totalAmountNet: this.orderData.order.amounts[0].netTotal
                };
            }

            return {
                currency: "EUR",
                itemSum: 0,
                itemSumNet: 0,
                shippingAmount: 0,
                shippingAmountNet: 0,
                vat: 0,
                couponValue: 0,
                totalAmount: 0,
                totalAmountNet: 0
            };
        }
    },

    methods: {
        showProperty: function(name)
        {
            return !this.totalsConfig || this.totalsConfig.indexOf(name) >= 0 || this.totalsConfig.indexOf("all") >= 0;
        }
    }
});

},{}],13:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.component("payment-provider-select", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            checkout: {},
            checkoutValidation: {paymentProvider: {}}
        };
    },

    /**
     * Initialise the event listener
     */
    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("checkout", this);
        ResourceService.bind("checkoutValidation", this);

        this.checkoutValidation.paymentProvider.validate = this.validate;

        this.initDefaultPaymentProvider();
    },

    methods: {
        /**
         * Event when changing the payment provider
         */
        onPaymentProviderChange: function()
        {
            ResourceService.getResource("checkout")
                .set(this.checkout)
                .done(function()
                {
                    document.dispatchEvent(new CustomEvent("afterPaymentMethodChanged", {detail: this.checkout.methodOfPaymentId}));
                }.bind(this));

            this.validate();
        },

        validate: function()
        {
            this.checkoutValidation.paymentProvider.showError = !(this.checkout.methodOfPaymentId > 0);
        },

        initDefaultPaymentProvider: function()
        {
            // todo get entry from config | select first payment provider
            if (this.checkout.methodOfPaymentId == 0 && this.checkout.paymentDataList.length > 0)
            {
                this.checkout.methodOfPaymentId = this.checkout.paymentDataList[0].id;

                ResourceService.getResource("checkout").set(this.checkout);
            }
        }
    }
});

},{"services/ResourceService":74}],14:[function(require,module,exports){
var ApiService = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ResourceService = require("services/ResourceService");

(function($)
{
    Vue.component("place-order", {

        props: [
            "targetContinue",
            "template"
        ],

        data: function()
        {
            return {
                waiting: false,
                checkout: {},
                checkoutValidation: {}
            };
        },

        created: function()
        {
            this.$options.template = this.template;

            ResourceService.bind("checkout", this);
            ResourceService.bind("checkoutValidation", this);
        },

        methods: {

            preparePayment: function()
            {
                this.waiting = true;
                var self = this;

                if (self.validateCheckout())
                {
                    ApiService.post("/rest/io/checkout/payment")
                        .done(function(response)
                        {
                            self.afterPreparePayment(response);
                        })
                        .fail(function(response)
                        {
                            self.waiting = false;
                        });
                }
                else
                {
                    NotificationService.error(Translations.Template.generalCheckEntries);
                    this.waiting = false;
                }
            },

            validateCheckout: function()
            {
                for (var validator in this.checkoutValidation)
                {
                    if (this.checkoutValidation[validator].validate)
                    {
                        this.checkoutValidation[validator].validate();
                    }
                }

                for (var i in this.checkoutValidation)
                {
                    if (this.checkoutValidation[i].showError)
                    {
                        return false;
                    }
                }

                return true;
            },

            afterPreparePayment: function(response)
            {
                var paymentType = response.type || "errorCode";
                var paymentValue = response.value || "";

                switch (paymentType)
                {
                case "continue":
                    var target = this.targetContinue;

                    if (target)
                        {
                        window.location.assign(target);
                    }
                    break;
                case "redirectUrl":
                        // redirect to given payment provider
                    window.location.assign(paymentValue);
                    break;
                case "externalContentUrl":
                        // show external content in iframe
                    this.showModal(paymentValue, true);
                    break;
                case "htmlContent":
                    this.showModal(paymentValue, false);
                    break;

                case "errorCode":
                    NotificationService.error(paymentValue);
                    break;
                default:
                    NotificationService.error("Unknown response from payment provider: " + paymentType);
                    break;
                }
            },

            showModal: function(content, isExternalContent)
            {
                var $modal = $(this.$els.modal);
                var $modalBody = $(this.$els.modalContent);

                if (isExternalContent)
                {
                    $modalBody.html("<iframe src=\"" + content + "\">");
                }
                else
                {
                    $modalBody.html(content);
                }

                $modal.modal("show");
            }
        }
    });
})(jQuery);

},{"services/ApiService":68,"services/NotificationService":73,"services/ResourceService":74}],15:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.component("shipping-profile-select", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            checkout: {},
            checkoutValidation: {shippingProfile: {}}
        };
    },

    /**
     * Add a shipping provider
     * Initialise the event listener
     */
    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("checkout", this);
        ResourceService.bind("checkoutValidation", this);

        this.checkoutValidation.shippingProfile.validate = this.validate;
    },

    methods: {
        /**
         * Method on shipping profile changed
         */
        onShippingProfileChange: function()
        {
            ResourceService.getResource("checkout")
                .set(this.checkout)
                .done(function()
                {
                    document.dispatchEvent(new CustomEvent("afterShippingProfileChanged", {detail: this.checkout.shippingProfileId}));
                }.bind(this));

            this.validate();
        },

        validate: function()
        {
            this.checkoutValidation.shippingProfile.showError = !(this.checkout.shippingProfileId > 0);
        }
    }
});

},{"services/ResourceService":74}],16:[function(require,module,exports){
Vue.component("address-input-group", {

    props: [
        "addressData",
        "defaultCountry",
        "template"
    ],

    data: function()
    {
        return {
            stateList  : [],
            countryLocaleList: ["DE", "GB"],
            localeToShow: ""
        };
    },

    /**
     * Check whether the address data exists. Else, create an empty one
     */
    created: function()
    {
        this.$options.template = this.template;

        if (!this.addressData)
        {
            this.addressData = {};
        }

        this.defaultCountry = "DE";
    },

    methods:
    {
        /**
         * Update the address input group to show.
         * @param value
         */
        onSelectedCountryChanged: function(value)
        {
            if (this.countryLocaleList.indexOf(value) > 0)
            {
                this.localeToShow = value;
            }
            else
            {
                this.localeToShow = this.defaultCountry;
            }
        }
    }
});

},{}],17:[function(require,module,exports){
var ApiService = require("services/ApiService");
var ModalService = require("services/ModalService");
var AddressService = require("services/AddressService");

Vue.component("address-select", {

    props: [
        "addressList",
        "addressType",
        "selectedAddressId",
        "template",
        "showError"
    ],

    data: function()
    {
        return {
            selectedAddress: {},
            addressModal   : {},
            modalType      : "",
            headline       : "",
            addressToEdit  : {},
            addressToDelete: {},
            deleteModal: ""
        };
    },

    /**
     *  Check whether the address list is not empty and select the address with the matching ID
     */
    created: function()
    {
        this.$options.template = this.template;

        this.addEventListener();
    },

    /**
     * Select the address modal
     */
    ready: function()
    {
        if (!this.isAddressListEmpty())
        {
            this.loadSelectedAddress();
        }
        else
        {
            this.addressList = [];
        }

        this.addressModal = ModalService.findModal(this.$els.addressModal);
        this.deleteModal = ModalService.findModal(this.$els.deleteModal);
    },

    methods: {
        /**
         * Add the event listener
         */
        addEventListener: function()
        {
            var self = this;

            ApiService.listen("AfterAccountContactLogout",
                function()
                {
                    self.cleanUserAddressData();
                });
        },

        /**
         * Load the address filtered by selectedId into selectedAddress
         */
        loadSelectedAddress: function()
        {
            var isSelectedAddressSet = false;

            for (var index in this.addressList)
            {
                if (this.addressList[index].id === this.selectedAddressId)
                {
                    this.selectedAddress = this.addressList[index];
                    isSelectedAddressSet = true;
                    this.$dispatch("address-changed", this.selectedAddress);
                }
            }

            if (!isSelectedAddressSet)
            {
                this.selectedAddressId = null;
            }
        },

        /**
         * Remove all user related addresses from the component
         */
        cleanUserAddressData: function()
        {
            this.addressList = this.addressList.filter(function(value)
            {
                return value.id === -99;
            });

            if (this.selectedAddressId !== -99)
            {
                this.selectedAddress = {};
                this.selectedAddressId = "";
            }
        },

        /**
         * Update the selected address
         * @param index
         */
        onAddressChanged: function(index)
        {
            this.selectedAddress = this.addressList[index];

            this.$dispatch("address-changed", this.selectedAddress);
        },

        /**
         * Check whether the address list is empty
         * @returns {boolean}
         */
        isAddressListEmpty: function()
        {
            return !(this.addressList && this.addressList.length > 0);
        },

        /**
         * Check whether a company name exists and show it in bold
         * @returns {boolean}
         */
        showNameStrong: function()
        {
            return !this.selectedAddress.name1 || this.selectedAddress.name1.length === 0;
        },

        /**
         * Show the add modal
         */
        showAddModal: function()
        {
            this.modalType = "create";
            this.addressToEdit = {};
            this.updateHeadline();
            this.addressModal.show();
        },

        /**
         * Show the edit modal
         * @param address
         */
        showEditModal: function(address)
        {
            this.modalType = "update";
            // Creates a tmp address to prevent unwanted two-way binding
            this.addressToEdit = JSON.parse(JSON.stringify(address));
            this.updateHeadline();
            this.addressModal.show();
        },

        /**
         * Show the delete modal
         * @param address
         */
        showDeleteModal: function(address)
        {
            this.modalType = "delete";
            this.addressToDelete = address;
            this.updateHeadline();
            this.deleteModal.show();
        },

        /**
         * Delete the address selected before
         */
        deleteAddress: function()
        {
            var self = this;
            var address = this.addressToDelete;
            var addressType = this.addressType;

            AddressService.deleteAddress(address.id, addressType)
                .done(function()
                {
                    self.closeDeleteModal();
                    self.removeIdFromList(address.id);
                });

        },

        /**
         * Close the current create/update address modal
         */
        closeAddressModal: function()
        {
            this.addressModal.hide();
        },

        /**
         * Close the current delete address modal
         */
        closeDeleteModal: function()
        {
            this.deleteModal.hide();
        },

        /**
         * Dynamically create the header line in the modal
         */
        updateHeadline: function()
        {
            var headline;

            if (this.addressType === "2")
            {
                if (this.modalType === "update")
                {
                    headline = Translations.Template.orderShippingAddressEdit;
                }
                else if (this.modalType === "create")
                {
                    headline = Translations.Template.orderShippingAddressCreate;
                }
                else
                {
                    headline = Translations.Template.orderShippingAddressDelete;
                }
            }
            else if (this.modalType === "update")
            {
                headline = Translations.Template.orderInvoiceAddressEdit;
            }
            else if (this.modalType === "create")
            {
                headline = Translations.Template.orderInvoiceAddressCreate;
            }
            else
            {
                headline = Translations.Template.orderInvoiceAddressDelete;
            }

            this.headline = headline;
        },

        /**
         * Remove an address from the addressList by ID
         * @param id
         */
        removeIdFromList: function(id)
        {
            for (var i in this.addressList)
            {
                if (this.addressList[i].id === id)
                {
                    this.addressList.splice(i, 1);

                    if (this.selectedAddressId && this.selectedAddressId.toString() === id.toString())
                    {
                        this.selectedAddress = {};
                        this.selectedAddressId = "";

                        break;
                    }
                }
            }
        },

        /**
         * Update the selected address when a new address is created
         * @param addressData
         */
        onAddressCreated: function(addressData)
        {
            if (!this.selectedAddressId)
            {
                this.selectedAddressId = addressData.id;

                this.loadSelectedAddress();
            }
        }
    }
});

},{"services/AddressService":67,"services/ApiService":68,"services/ModalService":72}],18:[function(require,module,exports){
var AddressService    = require("services/AddressService");
var ValidationService = require("services/ValidationService");

Vue.component("create-update-address", {

    props: [
        "addressData",
        "addressModal",
        "addressList",
        "modalType",
        "addressType",
        "template"
    ],

    data: function()
    {
        return {
            waiting: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    methods: {
        /**
         * Validate the address fields
         */
        validate: function()
        {
            var self = this;

            ValidationService.validate($("#my-form"))
                .done(function()
                {
                    self.saveAddress();
                })
                .fail(function(invalidFields)
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        /**
         * Save the new address or update an existing one
         */
        saveAddress: function()
        {
            if (this.modalType === "create")
            {
                this.createAddress();
            }
            else if (this.modalType === "update")
            {
                this.updateAddress();
            }
        },

        /**
         * Update an address
         */
        updateAddress: function()
        {
            this.waiting = true;

            AddressService
                .updateAddress(this.addressData, this.addressType)
                .done(function()
                {
                    this.addressModal.hide();

                    for (var key in this.addressList)
                    {
                        var address = this.addressList[key];

                        if (address.id === this.addressData.id)
                        {
                            for (var attribute in this.addressList[key])
                            {
                                this.addressList[key][attribute] = this.addressData[attribute];
                            }

                            break;
                        }
                    }

                    this.waiting = false;
                }.bind(this));
        },

        /**
         * Create a new address
         */
        createAddress: function()
        {
            this.waiting = true;

            AddressService
                .createAddress(this.addressData, this.addressType, true)
                .done(function(newAddress)
                {
                    this.addressData = newAddress;

                    this.addressModal.hide();
                    this.addressList.push(this.addressData);

                    this.$dispatch("new-address-created", this.addressData);

                    this.waiting = false;
                }.bind(this));
        }
    }

});

},{"services/AddressService":67,"services/ValidationService":76}],19:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.component("invoice-address-select", {

    template: "<address-select template=\"#vue-address-select\" v-on:address-changed=\"addressChanged\" address-type=\"1\" :address-list=\"addressList\" :selected-address-id=\"selectedAddressId\" :show-error='checkoutValidation.invoiceAddress.showError'></address-select>",

    props: [
        "addressList",
        "hasToValidate",
        "selectedAddressId"
    ],

    data: function()
    {
        return {
            checkout: {},
            checkoutValidation: {invoiceAddress: {}}
        };
    },

    /**
     * Initialise the event listener
     */
    created: function()
    {
        ResourceService.bind("checkout", this);

        if (this.hasToValidate)
        {
            ResourceService.bind("checkoutValidation", this);

            this.checkoutValidation.invoiceAddress.validate = this.validate;
        }
    },

    methods:
    {
        /**
         * Update the invoice address
         * @param selectedAddress
         */
        addressChanged: function(selectedAddress)
        {
            this.checkout.billingAddressId = selectedAddress.id;

            ResourceService.getResource("checkout")
                .set(this.checkout)
                .done(function()
                {
                    document.dispatchEvent(new CustomEvent("afterInvoiceAddressChanged", {detail: this.checkout.billingAddressId}));
                }.bind(this));

            if (this.hasToValidate)
            {
                this.validate();
            }
        },

        validate: function()
        {
            this.checkoutValidation.invoiceAddress.showError = this.checkout.billingAddressId <= 0;
        }
    }
});

},{"services/ResourceService":74}],20:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.component("shipping-address-select", {

    template: "<address-select template=\"#vue-address-select\" v-on:address-changed=\"addressChanged\" address-type=\"2\" :address-list=\"addressList\" :selected-address-id=\"selectedAddressId\"></address-select>",

    props: [
        "addressList",
        "selectedAddressId"
    ],

    data: function()
    {
        return {
            checkout: {}
        };
    },

    /**
     * Initialise the event listener
     */
    created: function()
    {
        ResourceService.bind("checkout", this);

        if (!this.addressList)
        {
            this.addressList = [];
        }

        // Adds the dummy entry for "delivery address same as invoice address"
        this.addressList.unshift({
            id: -99
        });

        // if there is no selection for delivery address, the dummy entry will be selected
        if (this.selectedAddressId === 0)
        {
            this.selectedAddressId = -99;
            this.checkout.deliveryAddressId = -99;
            ResourceService.getResource("checkout").set(this.checkout);
        }
    },

    methods: {
        /**
         * Update the delivery address
         * @param selectedAddress
         */
        addressChanged: function(selectedAddress)
        {
            this.checkout.deliveryAddressId = selectedAddress.id;
            ResourceService.getResource("checkout")
                .set(this.checkout)
                .done(function()
                {
                    document.dispatchEvent(new CustomEvent("afterDeliveryAddressChanged", {detail: this.checkout.deliveryAddressId}));
                }.bind(this));
        }
    }
});

},{"services/ResourceService":74}],21:[function(require,module,exports){
var CountryService = require("services/CountryService");
var ResourceService = require("services/ResourceService");

Vue.component("country-select", {

    props: [
        "countryList",
        "countryNameMap",
        "selectedCountryId",
        "selectedStateId",
        "template"
    ],

    data: function()
    {
        return {
            stateList  : [],
            selectedCountry: {},
            localization: {}
        };
    },

    /**
     * Get the shipping countries
     */
    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("localization", this);
        this.selectedCountryId = this.selectedCountryId || this.localization.currentShippingCountryId;

        CountryService.translateCountryNames(this.countryNameMap, this.countryList);
        CountryService.sortCountries(this.countryList);
    },

    methods: {
        /**
         * Method to fire when the country has changed
         */
        countryChanged: function()
        {
            this.selectedStateId = null;
        },

        /**
         * @param countryId
         * @returns {*}
         */
        getCountryById: function(countryId)
        {
            return this.countryList.find(
                function(country)
                {
                    if (country.id === countryId)
                    {
                        return country;
                    }

                    return null;
                });
        }
    },

    watch: {
        /**
         * Add watcher to handle the country changed
         */
        selectedCountryId: function()
        {
            this.selectedCountryId = this.selectedCountryId || this.localization.currentShippingCountryId;
            this.selectedCountry = this.getCountryById(this.selectedCountryId);

            if (this.selectedCountry)
            {
                this.stateList = CountryService.parseShippingStates(this.countryList, this.selectedCountryId);

                this.$dispatch("selected-country-changed", this.selectedCountry.isoCode2);
            }
        }
    }
});

},{"services/CountryService":70,"services/ResourceService":74}],22:[function(require,module,exports){
var ApiService          = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ModalService        = require("services/ModalService");

var ValidationService = require("services/ValidationService");

Vue.component("registration", {

    props: {
        modalElement: String,
        guestMode: {type: Boolean, default: false},
        isSimpleRegistration: {type: Boolean, default: false},
        template: String,
        backlink: String
    },

    data: function()
    {
        return {
            password      : "",
            passwordRepeat: "",
            username      : "",
            billingAddress: {},
            isDisabled: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    methods: {
        /**
         * Validate the registration form
         */
        validateRegistration: function()
        {
            var self = this;

            ValidationService.validate($("#registration" + this._uid))
                .done(function()
                {
                    self.sendRegistration();
                })
                .fail(function(invalidFields)
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        /**
         * Send the registration
         */
        sendRegistration: function()
        {
            var userObject = this.getUserObject();
            var component  = this;

            this.isDisabled = true;

            ApiService.post("/rest/io/customer", userObject)
                .done(function(response)
                {
                    ApiService.setToken(response);

                    if (document.getElementById(component.modalElement) !== null)
                    {
                        ModalService.findModal(document.getElementById(component.modalElement)).hide();
                    }

                    NotificationService.success(Translations.Template.accRegistrationSuccessful).closeAfter(3000);

                    if (component.backlink !== null && component.backlink)
                    {
                        window.location.assign(component.backlink);
                    }

                    component.isDisabled = false;
                })
                .fail(function()
                {
                    component.isDisabled = false;
                });
        },

        /**
         * Handle the user object which is send to the server
         * @returns {{contact: {referrerId: number, typeId: number, options: {typeId: {typeId: number, subTypeId: number, value: *, priority: number}}}}|{contact: {referrerId: number, typeId: number, password: *, options: {typeId: {typeId: number, subTypeId: number, value: *, priority: number}}}}}
         */
        getUserObject: function()
        {
            var userObject =
                {
                    contact: {
                        referrerId: 1,
                        typeId    : 1,
                        options   : {
                            typeId: {
                                typeId   : 2,
                                subTypeId: 4,
                                value    : this.username,
                                priority : 0
                            }
                        }
                    }
                };

            if (!this.guestMode)
            {
                userObject.contact.password = this.password;
            }

            if (!this.isSimpleRegistration)
            {
                userObject.billingAddress = this.billingAddress;
            }

            return userObject;
        }
    }
});

},{"services/ApiService":68,"services/ModalService":72,"services/NotificationService":73,"services/ValidationService":76}],23:[function(require,module,exports){
var ValidationService = require("services/ValidationService");
var ApiService = require("services/ApiService");

Vue.component("guest-login", {

    props: [
        "template",
        "backlink"
    ],

    data: function()
    {
        return {
            email: "",
            isDisabled: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    methods: {
        validate: function()
        {
            ValidationService.validate($("#guest-login-form-" + this._uid))
                .done(function()
                {
                    this.sendEMail();
                }.bind(this))
                .fail(function(invalidFields)
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        sendEMail: function()
        {
            this.isDisabled = true;

            ApiService.post("/rest/io/guest", {email: this.email})
                .done(function()
                {
                    if (this.backlink !== null && this.backlink)
                    {
                        window.location.assign(this.backlink);
                    }

                    this.isDisabled = false;
                }.bind(this));
        }
    }
});

},{"services/ApiService":68,"services/ValidationService":76}],24:[function(require,module,exports){
var ApiService          = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ModalService        = require("services/ModalService");
var ValidationService = require("services/ValidationService");

Vue.component("login", {

    props: [
        "modalElement",
        "backlink",
        "hasToForward",
        "template"
    ],

    data: function()
    {
        return {
            password: "",
            username: "",
            isDisabled: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    methods: {
        /**
         * Open the login modal
         */
        showLogin: function()
        {
            ModalService.findModal(document.getElementById(this.modalElement)).show();
        },

        validateLogin: function()
        {
            var self = this;

            ValidationService.validate($("#login-form-" + this._uid))
                .done(function()
                {
                    self.sendLogin();
                })
                .fail(function(invalidFields)
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        /**
         * Send the login data
         */
        sendLogin: function()
        {
            var self = this;

            this.isDisabled = true;

            ApiService.post("/rest/io/customer/login", {email: this.username, password: this.password}, {supressNotifications: true})
                .done(function(response)
                {
                    ApiService.setToken(response);

                    if (document.getElementById(self.modalElement) !== null)
                    {
                        ModalService.findModal(document.getElementById(self.modalElement)).hide();
                    }

                    NotificationService.success(Translations.Template.accLoginSuccessful).closeAfter(10000);

                    if (self.backlink !== null && self.backlink)
                    {
                        location.assign(self.backlink);
                    }
                    else if (self.hasToForward)
                    {
                        location.assign(location.origin);
                    }
                    else
                    {
                        location.reload();
                    }

                    self.isDisabled = false;
                })
                .fail(function(response)
                {
                    switch (response.code)
                    {
                    case 401:
                        NotificationService.error(Translations.Template.accLoginFailed).closeAfter(10000);
                        break;
                    default:
                        return;
                    }

                    self.isDisabled = false;
                });
        }
    }
});

},{"services/ApiService":68,"services/ModalService":72,"services/NotificationService":73,"services/ValidationService":76}],25:[function(require,module,exports){
Vue.component("login-view", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            isGuestMode: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    }
});

},{}],26:[function(require,module,exports){
var ApiService = require("services/ApiService");
var ResourceService = require("services/ResourceService");

Vue.component("user-login-handler", {

    props: [
        "userData",
        "template"
    ],

    data: function()
    {
        return {
            username: "",
            isLoggedIn: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    /**
     * Add the global event listener for login and logout
     */
    ready: function()
    {
        ResourceService.bind("user", this, "isLoggedIn");

        this.setUsername(this.userData);
        this.addEventListeners();
    },

    methods: {
        /**
         * Set the current user logged in
         * @param userData
         */
        setUsername: function(userData)
        {
            if (userData)
            {
                if (userData.firstName.length > 0 && userData.lastName.length > 0)
                {
                    this.username = userData.firstName + " " + userData.lastName;
                }
                else
                {
                    this.username = userData.options[0].value;
                }
            }
        },

        /**
         * Adds login/logout event listeners
         */
        addEventListeners: function()
        {
            var self = this;

            ApiService.listen("AfterAccountAuthentication",
                function(userData)
                {
                    self.setUsername(userData.accountContact);
                    ResourceService.getResource("user").set({isLoggedIn: true});
                });

            ApiService.listen("AfterAccountContactLogout",
                function()
                {
                    self.username = "";
                    ResourceService.getResource("user").set({isLoggedIn: false});
                });
        }
    }
});

},{"services/ApiService":68,"services/ResourceService":74}],27:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.component("item-image-carousel", {

    props: [
        "imageUrlAccessor",
        "template"
    ],

    data: function()
    {
        return {
            init            : false,
            currentVariation: {},
            currentItem     : 0
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ResourceService.watch("currentVariation", function(newValue)
        {
            this.currentVariation = newValue;

            var self = this;

            if (!this.init)
            {
                $(window).load(function()
                {
                    self.initCarousel();

                    self.init = true;
                });
            }

            else
            {
                setTimeout(function()
                {
                    self.reInitialize();
                }, 1);
            }

        }.bind(this));
    },

    methods:
    {
        getImageCount: function()
        {
            var images = this.currentVariation.documents[0].data.images;

            return images.variation.length || images.all.length;
        },

        reInitialize: function()
        {
            var $owl = $(this.$els.single);

            $owl.trigger("destroy.owl.carousel");
            $owl.html($owl.find(".owl-stage-outer").html()).removeClass("owl-loaded");
            $owl.find(".owl-item").remove();

            this.initCarousel();
        },

        initCarousel: function()
        {
            var imageCount = this.getImageCount();

            $(this.$els.single).owlCarousel({
                autoHeight       : true,
                dots             : true,
                items            : 1,
                lazyLoad         : true,
                loop             : true,
                margin           : 10,
                mouseDrag        : imageCount > 1,
                nav              : imageCount > 1,
                navClass         : [
                    "owl-single-item-nav left carousel-control",
                    "owl-single-item-nav right carousel-control"
                ],
                navContainerClass: "",
                navText          : [
                    "<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>",
                    "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"
                ],
                smartSpeed       : 350
            });

            $(this.$els.single).on("changed.owl.carousel", function(event)
            {
                this.currentItem = event.page.index;
            }.bind(this));
        },

        goTo: function(index)
        {
            var $owl = $(this.$els.single);

            $owl.trigger("to.owl.carousel", [
                index,
                350
            ]);
        }
    }
});

},{"services/ResourceService":74}],28:[function(require,module,exports){
Vue.component("quantity-input", {

    props: [
        "value",
        "timeout",
        "min",
        "max",
        "vertical",
        "template",
        "waiting"
    ],

    data: function()
    {
        return {
            timeoutHandle: null
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    /**
     * TODO
     */
    ready: function()
    {
        this.timeout = this.timeout || 300;
        this.min = this.min || 1;
        this.max = this.max || 999;
        this.vertical = this.vertical || false;

        this.$watch("value", function(newValue)
        {
            if (newValue < this.min)
            {
                this.value = this.min;
            }

            if (newValue > this.max)
            {
                this.value = this.max;
            }

            if (this.timeoutHandle)
            {
                window.clearTimeout(this.timeoutHandle);
            }

            var self = this;

            this.timeoutHandle = window.setTimeout(
                function()
                {
                    self.$dispatch("quantity-change", newValue);
                },
                this.timeout
            );
        });
    }

});

},{}],29:[function(require,module,exports){
var ApiService = require("services/ApiService");
var ResourceService = require("services/ResourceService");

// cache loaded variation data for reuse
var VariationData = {};

Vue.component("variation-select", {

    props: [
        "attributes",
        "variations",
        "preselect",
        "template"
    ],

    data: function()
    {
        return {
            // Collection of currently selected variation attributes.
            selectedAttributes: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        // initialize selected attributes to be tracked by change detection
        var attributes = {};

        for (var attributeId in this.attributes)
        {
            attributes[attributeId] = null;
        }
        this.selectedAttributes = attributes;

        // set attributes of preselected variation if exists
        if (this.preselect)
        {
            // find variation by id
            var preselectedVariation = this.variations.filter(function(variation)
            {
                // eslint-disable-next-line eqeqeq
                return variation.variationId == this.preselect;
            }.bind(this));

            if (!!preselectedVariation && preselectedVariation.length === 1)
            {
                // set attributes of preselected variation
                this.setAttributes(preselectedVariation[0]);
            }
        }

        // search for matching variation on each change of attribute selection
        this.$watch("selectedAttributes", function()
        {

            // search variations matching current selection
            var possibleVariations = this.filterVariations();

            if (possibleVariations.length === 1)
            {
                // only 1 matching variation remaining:
                // set remaining attributes if not set already. Will trigger this watcher again.
                if (!this.setAttributes(possibleVariations[0]))
                {
                    // all attributes are set => load variation data
                    var variationId = possibleVariations[0].variationId;

                    if (VariationData[variationId])
                    {
                        // reuse cached variation data
                        ResourceService
                            .getResource("currentVariation")
                            .set(VariationData[variationId]);
                    }
                    else
                    {
                        // get variation data from remote
                        ApiService
                            .get("/rest/io/variations/" + variationId)
                            .done(function(response)
                            {
                                // store received variation data for later reuse
                                VariationData[variationId] = response;
                                ResourceService
                                    .getResource("currentVariation")
                                    .set(response);
                            });
                    }

                }

            }
        }, {
            deep: true
        });

        // watch for changes on selected variation to adjust url
        ResourceService.watch("currentVariation", function(newVariation, oldVariation)
        {

            // replace variation id in url
            var url = window.location.pathname;
            var title = document.getElementsByTagName("title")[0].innerHTML;
            // ItemURLs should match: "/<ITEM_NAME>/<ITEM_ID>/<VARIATION_ID>/"
            var match = url.match(/\/([^\/]*)\/([\d]+)\/?([\d]*)/);

            if (match)
            {
                url = "/" + match[1] + "/" + match[2] + "/" + newVariation.documents[0].id;
            }

            window.history.replaceState({}, title, url);

        });
    },

    methods: {

        /**
         * Finds all variations matching a given set of attributes.
         * @param {{[int]: int}}  attributes   A map containing attributeIds and attributeValueIds. Used to filter variations
         * @returns {array}                    A list of matching variations.
         */
        filterVariations: function(attributes)
        {
            attributes = attributes || this.selectedAttributes;
            return this.variations.filter(function(variation)
            {

                for (var i = 0; i < variation.attributes.length; i++)
                {
                    var id = variation.attributes[i].attributeId;
                    var val = variation.attributes[i].attributeValueId;

                    if (!!attributes[id] && attributes[id] != val)
                    {
                        return false;
                    }
                }
                return true;

            });
        },

        /**
         * Tests if a given attribute value is not available depending on the current selection.
         * @param {int}     attributeId         The id of the attribute
         * @param {int}     attributeValueId    The valueId of the attribute
         * @returns {boolean}                   True if the value can be combined with the current selection.
         */
        isEnabled: function(attributeId, attributeValueId)
        {
            // clone selectedAttributes to avoid touching objects bound to UI
            var attributes = JSON.parse(JSON.stringify(this.selectedAttributes));

            attributes[attributeId] = attributeValueId;
            return this.filterVariations(attributes).length > 0;
        },

        /**
         * Set selected attributes by a given variation.
         * @param {*}           variation   The variation to set as selected
         * @returns {boolean}               true if at least one attribute has been changed
         */
        setAttributes: function(variation)
        {
            var hasChanges = false;

            for (var i = 0; i < variation.attributes.length; i++)
            {
                var id = variation.attributes[i].attributeId;
                var val = variation.attributes[i].attributeValueId;

                if (this.selectedAttributes[id] !== val)
                {
                    this.selectedAttributes[id] = val;
                    hasChanges = true;
                }
            }

            return hasChanges;
        }

    }

});

},{"services/ApiService":68,"services/ResourceService":74}],30:[function(require,module,exports){
Vue.component("category-image-carousel", {

    props: [
        "imageUrls",
        "itemUrl",
        "showDots",
        "showNav",
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        if (this.imageUrls && this.imageUrls.length > 0)
        {
            $(".owl-carousel").owlCarousel({
                dots     : (this.showDots === "true"),
                items    : 1,
                loop     : this.imageUrls.length > 1,
                lazyLoad : true,
                margin   : 10,
                nav      : (this.showNav === "true"),
                navText  : [
                    "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
                    "<i class='fa fa-chevron-right' aria-hidden='true'></i>"
                ]
            });
        }
    }
});

},{}],31:[function(require,module,exports){
Vue.component("category-item", {

    template: "#vue-category-item",

    props: [
        "decimalCount",
        "itemData",
        "imageUrlAccessor"
    ],

    data: function()
    {
        return {
            recommendedRetailPrice: 0,
            variationRetailPrice  : 0
        };
    },

    created: function()
    {
        this.recommendedRetailPrice = this.itemData.calculatedPrices.rrp.price;
        this.variationRetailPrice = this.itemData.calculatedPrices.default.price;
    },

    computed:
    {
        /**
         * returns itemData.item.storeSpecial
         */
        storeSpecial: function()
        {
            return this.itemData.item.storeSpecial;
        },

        /**
         * returns itemData.texts[0]
         */
        texts: function()
        {
            return this.itemData.texts[0];
        }
    }
});

},{}],32:[function(require,module,exports){
Vue.component("item-lazy-img", {

    props: [
        "imageUrl",
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        var self = this;

        setTimeout(function()
        {
            $(self.$els.lazyImg).show().lazyload({
                effect: "fadeIn"
            });
        }, 1);
    }
});

},{}],33:[function(require,module,exports){
var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-list", {

    props: [
        "categoryId",
        "template"
    ],

    data: function()
    {
        return {
            itemList: {},
            isLoading: false,
            filterListState: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ItemListService.setCategoryId(this.categoryId);
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
        ResourceService.bind("isLoading", this);
    }
});

},{"services/ItemListService":71,"services/ResourceService":74}],34:[function(require,module,exports){
var ItemListService = require("services/ItemListService");
var UrlService = require("services/UrlService");

Vue.component("item-list-sorting", {

    props: [
        "sortData",
        "template"
    ],

    data: function()
    {
        return {
            selectedSorting: {},
            dataTranslationMapping:
            {
                "item.id_asc"                : "itemId_asc",
                "item.id_desc"               : "itemId_desc",
                "texts.name1_asc"            : "itemName_asc",
                "texts.name1_desc"           : "itemName_desc",
                "item.position_asc"          : "itemPosition_asc",
                "item.position_desc"         : "itemPosition_desc",
                "item.salesPrice.price_asc"  : "itemPrice_asc",
                "item.salesPrice.price_desc" : "itemPrice_desc",
                "variation.createdAt_asc"    : "variationCreateTimestamp_asc",
                "variation.createdAt_desc"   : "variationCreateTimestamp_desc",
                "variation.id_asc"           : "variationId_asc",
                "variation.id_desc"          : "variationId_desc",
                "variation.number_asc"       : "variationCustomNumber_asc",
                "variation.number_desc"      : "variationCustomNumber_desc",
                "variation.updatedAt_asc"    : "variationLastUpdateTimestamp_asc",
                "variation.updatedAt_desc"   : "variationLastUpdateTimestamp_desc",
                "variation.position_asc"     : "variationPosition_asc",
                "variation.position_desc"    : "variationPosition_desc",
                "variation.isActive_asc"     : "variationActive_asc",
                "variation.isActive_desc"    : "variationActive_desc",
                "variation.isMain_asc"       : "variationPrimary_asc",
                "variation.isMain_desc"      : "variationPrimary_desc",
                "item.manufacturer.name_asc" : "itemProducerName_asc",
                "item.manufacturer.name_desc": "itemProducerName_desc"
            }
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        this.buildData();
        this.selectedSorting = this.sortData[0];

        this.setSelectedValueByUrl();
    },

    methods:
    {
        buildData: function()
        {
            for (var i in this.sortData)
            {
                var data = this.sortData[i];
                var sortItem =
                    {
                        value      : data,
                        displayName: Translations.Template[this.dataTranslationMapping[data]]
                    };

                this.sortData[i] = sortItem;
            }
        },

        updateSorting: function()
        {
            ItemListService.setOrderBy(this.selectedSorting.value);
            ItemListService.getItemList();
        },

        setSelectedValueByUrl: function()
        {
            var urlParams = UrlService.getUrlParams(document.location.search);

            if (urlParams.sorting)
            {
                for (var i in this.sortData)
                {
                    if (this.sortData[i].value === urlParams.sorting)
                    {
                        this.selectedSorting = this.sortData[i];
                        ItemListService.setOrderBy(this.selectedSorting.value);
                    }
                }
            }
        }
    }
});

},{"services/ItemListService":71,"services/UrlService":75}],35:[function(require,module,exports){
var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");
var UrlService = require("services/UrlService");

Vue.component("item-search", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            searchString: "",
            itemSearch: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        ResourceService.bind("itemSearch", this);
        this.initAutocomplete();

        var urlParams = UrlService.getUrlParams(document.location.search);

        this.itemSearch.query = urlParams.query;

        if (this.itemSearch.query)
        {
            ItemListService.updateSearchString(this.itemSearch.query);
        }
    },

    methods:
    {
        search: function()
        {
            if (document.location.pathname === "/search")
            {
                ItemListService.setSearchString(this.itemSearch.query);
                ItemListService.getItemList();
            }
            else
            {
                window.open("/search?query=" + this.itemSearch.query, "_self", false);
            }
        },

        initAutocomplete: function()
        {
            var self = this;

            $(".search-input").autocomplete({
                serviceUrl: "/rest/io/item/search/autocomplete",
                paramName: "query",
                params: {template: "Ceres::ItemList.Components.ItemSearch"},
                width: $(".search-box-shadow-frame").width(),
                zIndex: 1070,
                maxHeight: 310,
                minChars: 2,
                preventBadQueries: false,
                onSelect: function(suggestion)
                {
                    self.itemSearch.query = suggestion.value;
                    self.search();
                },
                beforeRender: function()
                {
                    $(".autocomplete-suggestions").width($(".search-box-shadow-frame").width());
                },
                transformResult: function(response)
                {
                    return self.transformSuggestionResult(response);
                }
            });

            $(window).resize(function()
            {
                $(".autocomplete-suggestions").width($(".search-box-shadow-frame").width());
            });
        },

        transformSuggestionResult: function(result)
        {
            result = JSON.parse(result);
            var suggestions =
                {
                    suggestions: $.map(result.data.documents, function(dataItem)
                    {
                        var value = dataItem.data.texts[0].name1;

                        return {
                            value: value,
                            data : value
                        };
                    })
                };

            return suggestions;
        }
    }
});

},{"services/ItemListService":71,"services/ResourceService":74,"services/UrlService":75}],36:[function(require,module,exports){
var ResourceService = require("services/ResourceService");
var accounting = require("accounting");

Vue.component("item-store-special", {

    template: "#vue-item-store-special",

    props: [
        "storeSpecial",
        "recommendedRetailPrice",
        "variationRetailPrice",
        "decimalCount"
    ],

    data: function()
    {
        return {
            tagClassPrefix: "bg-",
            localization  : {}
        };
    },

    created: function()
    {
        ResourceService.bind("localization", this);
    },

    methods: {
        getPercentageSale: function()
        {
            var percent = 100 - (this.recommendedRetailPrice / this.variationRetailPrice * 100);

            return accounting.formatNumber(percent, this.decimalCount, "");
        }
    },

    computed: {
        label: function()
        {
            if (this.storeSpecial.id === 1)
            {
                var percent = this.getPercentageSale();

                if (percent <= 0)
                {
                    return percent + "%";
                }
            }

            for (var i in this.storeSpecial.names)
            {
                var name = this.storeSpecial.names[i];

                if (name.lang === this.localization.shopLanguage)
                {
                    return name.name;
                }
            }

            return this.storeSpecial.names[0].name;
        },

        tagClass: function()
        {
            if (this.storeSpecial.id === 1)
            {
                return this.tagClassPrefix + "danger";
            }
            else if (this.storeSpecial.id === 2)
            {
                return this.tagClassPrefix + "primary";
            }
            return this.tagClassPrefix + "success";
        }
    }
});

},{"accounting":1,"services/ResourceService":74}],37:[function(require,module,exports){
var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");
var UrlService = require("services/UrlService");

Vue.component("items-per-page", {

    props: [
        "paginationValues",
        "template"
    ],

    data: function()
    {
        return {
            itemSearch: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("itemSearch", this);

        this.setSelectedValueByUrl();
    },

    methods:
    {
        itemsPerPageChanged: function()
        {
            ItemListService.setItemsPerPage(this.itemSearch.items);
            ItemListService.setPage(1);
            ItemListService.getItemList();
        },

        setSelectedValueByUrl: function()
        {
            var urlParams = UrlService.getUrlParams(document.location.search);

            if (urlParams.items)
            {
                if (this.paginationValues.indexOf(urlParams.items) > -1)
                {
                    this.itemSearch.items = urlParams.items;
                }
                else
                {
                    this.itemSearch.items = App.config.defaultItemsPerPage;
                }
            }
            else
            {
                this.itemSearch.items = App.config.defaultItemsPerPage;
            }

            ItemListService.setItemsPerPage(this.itemSearch.items);
        }
    }
});

},{"services/ItemListService":71,"services/ResourceService":74,"services/UrlService":75}],38:[function(require,module,exports){
var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");
var UrlService = require("services/UrlService");

Vue.component("pagination", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            itemSearch : {},
            itemList   : {},
            lastPageMax: 0
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("itemSearch", this);
        ResourceService.bind("itemList", this);

        var urlParams = UrlService.getUrlParams(document.location.search);

        this.itemSearch.page = urlParams.page;
    },

    methods:
    {
        setPage: function(page)
        {
            ItemListService.setPage(page);
            ItemListService.getItemList();
        }
    },

    computed:
    {
        page: function()
        {
            return parseInt(this.itemSearch.page) || 1;
        },

        pageMax: function()
        {
            if (this.itemSearch.isLoading)
            {
                return this.lastPageMax;
            }

            var pageMax = this.itemList.total / this.itemSearch.itemsPerPage;

            if (this.itemList.total % this.itemSearch.itemsPerPage > 0)
            {
                pageMax += 1;
            }

            this.lastPageMax = parseInt(pageMax) || 1;
            return parseInt(pageMax) || 1;
        }
    }
});

},{"services/ItemListService":71,"services/ResourceService":74,"services/UrlService":75}],39:[function(require,module,exports){
var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-filter", {

    props: [
        "template",
        "facet"
    ],

    data: function()
    {
        return {
            facetParams: [],
            isLoading: false
        };
    },

    created: function()
    {
        this.$options.template = this.template || "#vue-item-filter";
        ResourceService.bind("facetParams", this);
    },

    ready: function()
    {
        ResourceService.bind("isLoading", this);
    },

    methods:
    {
        updateFacet: function()
        {
            ResourceService.getResource("facetParams").set(this.facetParams);
            ItemListService.setFacets(this.facetParams);
            ItemListService.getItemList();
        }
    }
});

},{"services/ItemListService":71,"services/ResourceService":74}],40:[function(require,module,exports){
var ResourceService = require("services/ResourceService");
var UrlService = require("services/UrlService");

Vue.component("item-filter-list", {

    props: [
        "template",
        "facets"
    ],

    data: function()
    {
        return {
            isActive: false
        };
    },

    created: function()
    {
        ResourceService.bind("facets", this);

        this.$options.template = this.template || "#vue-item-filter-list";

        var urlParams = UrlService.getUrlParams(document.location.search);

        if (urlParams.facets)
        {
            ResourceService.getResource("facetParams").set(urlParams.facets.split(","));
        }
    },

    methods:
    {
        toggleOpeningState: function()
        {
            window.setTimeout(function()
            {
                this.isActive = !this.isActive;
            }.bind(this), 300);
        }
    }
});

},{"services/ResourceService":74,"services/UrlService":75}],41:[function(require,module,exports){
var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-filter-tag-list", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            facets: {},
            facetParams: []
        };
    },

    created: function()
    {
        this.$options.template = this.template || "#vue-item-filter-tag-list";
        ResourceService.bind("facetParams", this);
    },

    ready: function()
    {
        ResourceService.bind("facets", this);
    },

    methods:
    {
        removeTag: function(tagId)
        {
            this.facetParams.splice(this.facetParams.indexOf(tagId.toString()), 1);

            ResourceService.getResource("facetParams").set(this.facetParams);
            ItemListService.setFacets(this.facetParams);
            ItemListService.getItemList();
        }
    },

    computed:
    {
        tagList: function()
        {
            var tagList = [];

            if (this.facetParams.length > 0)
            {
                for (var facetKey in this.facets)
                {
                    for (var facetItemKey in this.facets[facetKey].values)
                    {
                        if (this.facetParams.indexOf(this.facets[facetKey].values[facetItemKey].id.toString()) > -1)
                        {
                            tagList.push(this.facets[facetKey].values[facetItemKey]);
                        }
                    }
                }
            }

            return tagList;
        }
    }
});

},{"services/ItemListService":71,"services/ResourceService":74}],42:[function(require,module,exports){
var ModalService        = require("services/ModalService");
var APIService          = require("services/APIService");
var NotificationService = require("services/NotificationService");

Vue.component("account-settings", {

    props: [
        "userData",
        "template"
    ],

    data: function()
    {
        return {
            newPassword         : "",
            confirmPassword     : "",
            accountSettingsClass: "",
            accountSettingsModal: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    /**
     * Initialise the account settings modal
     */
    ready: function()
    {
        this.accountSettingsModal = ModalService.findModal(this.$els.accountSettingsModal);
    },

    computed: {
        /**
         * Check whether the passwords match
         * @returns {boolean}
         */
        matchPassword: function()
        {
            if (this.confirmPassword !== "")
            {
                return this.newPassword === this.confirmPassword;
            }
            return true;
        }
    },

    methods: {

        /**
         * Open the account settings modal
         */
        showChangeAccountSettings: function()
        {
            this.accountSettingsModal.show();
        },

        /**
         * Save the new password
         */
        saveAccountSettings: function()
        {
            var self = this;

            if (this.newPassword !== "" && (this.newPassword === this.confirmPassword))
            {
                APIService.post("/rest/io/customer/password", {password: this.newPassword})
                    .done(function(response)
                    {
                        self.clearFieldsAndClose();
                        NotificationService.success(Translations.Template.accChangePasswordSuccessful).closeAfter(3000);
                    }).fail(function(response)
                    {
                        self.clearFieldsAndClose();
                        NotificationService.error(Translations.Template.accChangePasswordFailed).closeAfter(5000);
                    });
            }
        },

        /**
         * Clear the password fields in the modal
         */
        clearFields: function()
        {
            this.newPassword = "";
            this.confirmPassword = "";
        },

        /**
         * Clear the fields and close the modal
         */
        clearFieldsAndClose: function()
        {
            this.accountSettingsModal.hide();
            this.clearFields();
        },

        /**
         * Get the current email address of the user
         * @returns {*}
         */
        getEmail: function()
        {
            return this.userData.options[0].value;
        }
    }

});

},{"services/APIService":66,"services/ModalService":72,"services/NotificationService":73}],43:[function(require,module,exports){
var ApiService          = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ModalService        = require("services/ModalService");
var ValidationService   = require("services/ValidationService");

Vue.component("bank-data-select", {

    props: [
        "userBankData",
        "contactId",
        "template"
    ],

    data: function()
    {
        return {
            bankInfoModal: {},
            bankDeleteModal: {},
            updateBankData: {},
            selectedBankData: null,
            updateBankIndex: 0,
            doUpdate: null,
            headline : ""
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    /**
     * Select the modals
     */
    ready: function()
    {
        this.bankInfoModal = ModalService.findModal(this.$els.bankInfoModal);
        this.bankDeleteModal = ModalService.findModal(this.$els.bankDeleteModal);
    },

    methods: {

        /**
         * Set the selected bank-data
         */
        changeSelecting: function(bankData)
        {
            this.selectedBankData = bankData;
        },

        /**
         * Open the modal to add new bank-data
         */
        openAddBank: function()
        {
            this.headline = Translations.Template.bankAddDataTitle;
            this.openModal(false);
        },

        /**
         * Set data to update and open the modal
         * @param index
         * @param bankdata
         */
        openUpdateBank: function(index, bankData)
        {
            this.headline = Translations.Template.bankUpdateDataTitle;

            this.setUpdateData(index, bankData);
            this.openModal(true);
        },

        /**
         * Set data to remove and open the modal
         * @param index
         * @param bankdata
         */
        openDeleteBank: function(index, bankData)
        {
            this.setUpdateData(index, bankData);

            this.doUpdate = false;
            this.bankDeleteModal.show();
        },

        /**
         * Open the modal
         * @param doUpdate
         */
        openModal: function(doUpdate)
        {
            this.doUpdate = doUpdate;
            this.bankInfoModal.show();
        },

        /**
         * Set data to change
         * @param index
         * @param bankdata
         */
        setUpdateData: function(index, bankData)
        {
            this.updateBankData = JSON.parse(JSON.stringify(bankData));
            this.updateBankIndex = index;
        },

        /**
         * Validate the input-fields-data
         */
        validateInput: function()
        {
            var _self = this;

            ValidationService.validate($("#my-bankForm"))
                .done(function()
                {
                    if (_self.doUpdate)
                    {
                        _self.updateBankInfo();
                    }
                    else
                    {
                        _self.addBankInfo();
                    }
                })
                .fail(function(invalidFields)
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        /**
         * Update bank-data
         */
        updateBankInfo: function()
        {
            var _self = this;

            this.updateBankData.lastUpdateBy = "customer";

            ApiService.put("/rest/io/customer/bank_data/" + this.updateBankData.id, this.updateBankData)
                .done(function(response)
                {
                    _self.userBankData.splice(_self.updateBankIndex, 1, response);
                    _self.checkBankDataSelection();
                    _self.closeModal();

                    NotificationService.success(Translations.Template.bankDataUpdated).closeAfter(3000);
                })
                .fail(function()
                {
                    _self.closeModal();

                    NotificationService.error(Translations.Template.bankDataNotUpdated).closeAfter(5000);
                });
        },

        /**
         * Add new bank-data
         */
        addBankInfo: function()
        {
            var _self = this;

            this.updateBankData.lastUpdateBy = "customer";
            this.updateBankData.contactId = this.contactId;

            ApiService.post("/rest/io/customer/bank_data", this.updateBankData)
                .done(function(response)
                {
                    _self.userBankData.push(response);
                    _self.checkBankDataSelection(true);
                    _self.closeModal();

                    NotificationService.success(Translations.Template.bankDataAdded).closeAfter(3000);
                })
                .fail(function()
                {
                    _self.closeModal();

                    NotificationService.error(Translations.Template.bankDataNotAdded).closeAfter(5000);
                });
        },

        /**
         * Delete bank-data
         */
        removeBankInfo: function()
        {
            var _self = this;

            ApiService.delete("/rest/io/customer/bank_data/" + this.updateBankData.id)
                .done(function(response)
                {
                    _self.checkBankDataSelection(false);
                    _self.closeDeleteModal();
                    _self.userBankData.splice(_self.updateBankIndex, 1);

                    NotificationService.success(Translations.Template.bankDataDeleted).closeAfter(3000);
                })
                .fail(function()
                {
                    _self.closeDeleteModal();

                    NotificationService.error(Translations.Template.bankDataNotDeleted).closeAfter(5000);
                });
        },

        /**
         * Check selection on delete and on add bank-data
         */
        checkBankDataSelection: function(addData)
        {
            if (addData && !this.doUpdate && this.userBankData.length < 1)
            {
                this.selectedBankData = this.userBankData[0];
            }

            if (!addData && this.selectedBankData && this.selectedBankData.id == this.updateBankData.id)
            {
                if (!this.doUpdate)
                {
                    this.selectedBankData = null;
                }
                else
                {
                    this.selectedBankData = this.userBankData[this.updateBankIndex];
                }
            }
        },

        /**
         * Reset the updateBankData and updateBankIndex
         */
        resetData: function()
        {
            this.updateBankData = {};
            this.updateBankIndex = 0;
            this.doUpdate = false;
        },

        /**
         * Close the current bank-modal
         */
        closeModal: function()
        {
            this.bankInfoModal.hide();
            this.resetData();
        },

        /**
         * Close the current bank-delete-modal
         */
        closeDeleteModal: function()
        {
            this.bankDeleteModal.hide();
            this.resetData();
        }
    }
});

},{"services/ApiService":68,"services/ModalService":72,"services/NotificationService":73,"services/ValidationService":76}],44:[function(require,module,exports){
var ApiService = require("services/ApiService");

(function($)
{
    Vue.component("order-history", {

        props: [
            "orderList",
            "itemsPerPage",
            "showFirstPage",
            "showLastPage",
            "template"
        ],

        data: function()
        {
            return {
                page: 1,
                pageMax: 1,
                countStart: 0,
                countEnd: 0,
                currentOrder: null
            };
        },

        created: function()
        {
            this.$options.template = this.template;
        },

        ready: function()
        {
            this.itemsPerPage = this.itemsPerPage || 10;
            this.pageMax = Math.ceil(this.orderList.totalsCount / this.itemsPerPage);
            this.setOrders(this.orderList);
        },

        methods: {

            setOrders: function(orderList)
            {
                this.$set("orderList", orderList);
                this.page = this.orderList.page;
                this.countStart = ((this.orderList.page - 1) * this.itemsPerPage) + 1;
                this.countEnd = this.orderList.page * this.itemsPerPage;

                if (this.countEnd > this.orderList.totalsCount)
                {
                    this.countEnd = this.orderList.totalsCount;
                }

            },

            setCurrentOrder: function(order)
            {
                this.currentOrder = order;
                var self = this;

                Vue.nextTick(function()
                {
                    $(self.$els.orderDetails).modal("show");
                });
            },

            showPage: function(page)
            {
                var self = this;

                if (page <= 0 || page > this.pageMax)
                {
                    return;
                }

                ApiService
                    .get("rest/io/order?page=" + page + "&items=" + this.itemsPerPage)
                    .done(function(response)
                    {
                        self.setOrders(response);
                    });
            }
        }
    });
})(jQuery);

},{"services/ApiService":68}],45:[function(require,module,exports){
var NotificationService = require("services/NotificationService");

Vue.component("notifications", {

    props: [
        "initialNotifications",
        "template"
    ],

    data: function()
    {
        return {
            notifications: []
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        var self = this;

        NotificationService.listen(
            function(notifications)
            {
                self.$set("notifications", notifications);
            });

        self.showInitialNotifications();
    },

    methods : {
        /**
         * Dissmiss the notification
         * @param notification
         */
        dismiss: function(notification)
        {
            NotificationService.getNotifications().remove(notification);
        },

        /**
         * show initial notifications from server
         */
        showInitialNotifications: function()
        {
            for (var key in this.initialNotifications)
            {
                // set default type top 'log'
                var type = this.initialNotifications[key].type || "log";
                var message = this.initialNotifications[key].message;

                // type cannot be undefined
                if (message)
                {
                    if (NotificationService[type] && typeof NotificationService[type] === "function")
                    {
                        NotificationService[type](message);
                    }
                    else
                    {
                        // unkown type
                        NotificationService.log(message);
                    }
                }
            }
        }
    }
});

},{"services/NotificationService":73}],46:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.component("shipping-country-select", {

    props: [
        "countryFlagPrefix",
        "template"
    ],

    data: function()
    {
        return {
            localization: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("localization", this);

        for (var i in this.localization.activeShippingCountries)
        {
            var country = this.localization.activeShippingCountries[i];

            country.countryFlagClass = this.countryFlagPrefix + country.isoCode2.toLowerCase();
        }
    }
});

},{"services/ResourceService":74}],47:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.component("shop-language-select", {

    props: [
        "countryFlagPrefix",
        "template"
    ],

    data: function()
    {
        return {
            localization: {},
            languageList: []
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("localization", this);

        for (var i in this.localization.activeShopLanguageList)
        {
            var languageKey = this.localization.activeShopLanguageList[i];
            var languageName = Translations.Template[languageKey];
            var language =
                {
                    key: languageKey,
                    name: languageName,
                    flagClass: this.countryFlagPrefix + languageKey
                };

            this.languageList.push(language);
        }
    }
});

},{"services/ResourceService":74}],48:[function(require,module,exports){
var WaitScreenService = require("services/WaitScreenService");

/**
*
* CURRENTLY NOT IN USE
* MAY BE USEFUL LATER
*
*/

Vue.component("wait-screen", {

    // template: "#vue-wait-screen", NEED TO IMPLEMENT TEMPLATE IN COMPONENT

    props: [
        "template"
    ],

    data: function()
    {
        return {
            overlay: WaitScreenService.getOverlay()
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    computed: {
        /**
         * Show an overlay over the page
         * @returns {boolean}
         */
        visible: function()
        {
            return this.overlay.count > 0;
        }
    }
});

},{"services/WaitScreenService":77}],49:[function(require,module,exports){
var ApiService = require("services/ApiService");

Vue.directive("logout", function()
{
    /**
     * Logout the current user
     */
    $(this.el).click(
        function(event)
        {
            $(this.el).addClass("disabled");

            ApiService.post("/rest/io/customer/logout")
                .done(
                    function()
                    {
                        window.location.assign(window.location.origin);
                    })
                .fail(
                    function()
                    {
                        $(this.el).removeClass("disabled");
                    }.bind(this));

            event.preventDefault();
        }.bind(this));
});

},{"services/ApiService":68}],50:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.directive("is-loading-watcher",
    {
        bind: function()
        {
            var firstRendering = true;

            ResourceService.watch("isLoading", function()
            {
                if (!firstRendering && document.getElementById("twig-rendered-item-list") !== null)
                {
                    $("#twig-rendered-item-list").remove();

                    document.getElementById("vue-rendered-item-list").style.removeProperty("display");
                }
                else
                {
                    firstRendering = false;
                }
            });
        }
    });

},{"services/ResourceService":74}],51:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.elementDirective("resource", {
    priority: 10000,
    params  : [
        "name",
        "route",
        "data",
        "events",
        "responseTemplate"
    ],
    bind    : function()
    {
        var resource = ResourceService.registerResource(
            this.params.name,
            this.params.route,
            this.params.data,
            this.params.responseTemplate
        );
        var events = this.params.events || [];

        for (var i = 0; i < events.length; i++)
        {
            var event = events[i].split("!");
            var usePayload;

            if (event.length > 1)
            {
                usePayload = event[1];
            }

            resource.listen(event[0], usePayload);
        }
    }

});

Vue.elementDirective("resource-list", {
    priority: 10000,
    params  : [
        "name",
        "route",
        "data",
        "events",
        "responseTemplate"

    ],
    bind    : function()
    {
        var resource = ResourceService.registerResourceList(
            this.params.name,
            this.params.route,
            this.params.data,
            this.params.responseTemplate
        );
        var events = this.params.events || [];

        for (var i = 0; i < events.length; i++)
        {
            var event = events[i].split("!");
            var usePayload;

            if (event.length > 1)
            {
                usePayload = event[1];
            }

            resource.listen(event[0], usePayload);
        }
    }
});

},{"services/ResourceService":74}],52:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.directive("resource-bind", {

    params: [
        "filters"
    ],

    bind: function()
    {
        var self = this;

        ResourceService.watch(this.arg, function(value)
        {
            var paths = self.expression.split(".");

            for (var i = 0; i < paths.length; i++)
            {
                var path = paths[i];

                value = value[path];
            }

            var filters = self.params.filters || [];

            for (var j = 0; j < filters.length; j++)
            {
                var filter = Vue.filter(self.params.filters[j]);

                value = filter.apply(Object, [value]);
            }

            self.el.innerHTML = value;
        });
    }

});

},{"services/ResourceService":74}],53:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.directive("resource-if", {

    bind: function()
    {
        var self = this;
        var display = window.getComputedStyle(this.el, null).getPropertyValue("display");

        ResourceService.watch(this.arg, function(value)
        {

            var keys = Object.keys(value);
            var values = keys.map(function(key)
            {
                return value[key];
            });

            // eslint-disable-next-line
            var condition = new Function(keys, "return " + self.expression);

            if (condition.apply(null, values))
            {
                self.el.style.display = display;
            }
            else
            {
                self.el.style.display = "none";
            }
        });
    }

});

},{"services/ResourceService":74}],54:[function(require,module,exports){
var ResourceService = require("services/ResourceService");

Vue.directive("resource-push", {

    params: [
        "dataAccessor",
        "resource"
    ],

    bind: function()
    {
        var self = this;

        ResourceService.watch(this.params.resource, function(newValue, oldValue)
        {
            if (self.params.dataAccessor)
            {
                self.el.__vue__[self.arg] = newValue.documents[0].data;
            }
            else
            {
                self.el.__vue__[self.arg] = newValue;
            }
        });
    }

});

},{"services/ResourceService":74}],55:[function(require,module,exports){
Vue.directive("change-lang", function(value)
{
    $(this.el).click(function(event)
    {
        var subPath = window.location.pathname.split("/");

        subPath = subPath[1] == value.currLang ? window.location.pathname.substring(3) : window.location.pathname;

        window.location.assign(window.location.origin + "/" + value.lang + "" + subPath);
    });
});

},{}],56:[function(require,module,exports){
var CheckoutService = require("services/CheckoutService");

Vue.directive("shipping-country", function(value)
{
    $(this.el).click(function(event)
    {
        event.preventDefault();
        CheckoutService.setShippingCountryId(value);
    });
});

},{"services/CheckoutService":69}],57:[function(require,module,exports){
Vue.directive("tooltip", {

    bind: function()
    {
        setTimeout(function()
        {
            $("[data-toggle=\"tooltip\"]").tooltip();
        }, 1);
    }
});

},{}],58:[function(require,module,exports){
Vue.filter("arrayFirst", function(array)
{
    return array[0];
});

},{}],59:[function(require,module,exports){
Vue.filter("attachText", function(item, text)
{
    return text + item;
});

},{}],60:[function(require,module,exports){
var ResourceService   = require("services/ResourceService");
var currencySymbolMap = require("currency-symbol-map");
var accounting        = require("accounting");

Vue.filter("currency", function(price, customCurrency)
{
    var basket = ResourceService.getResource("basket").val();

    var currency = customCurrency || basket.currency;

    if (currency)
    {
        var currencySymbol = currencySymbolMap.getSymbolFromCurrency(currency);

        if (currencySymbol)
        {
            currency = currencySymbol;
        }
    }

    // (%v = value, %s = symbol)
    var options = {
        symbol   : currency,
        decimal  : ",",
        thousand : ".",
        precision: 2,
        format   : "%v %s"
    };

    return accounting.formatMoney(price, options);
});

},{"accounting":1,"currency-symbol-map":2,"services/ResourceService":74}],61:[function(require,module,exports){
// for docs see https://github.com/brockpetrie/vue-moment

var dateFilter = function()
{
    var args = Array.prototype.slice.call(arguments);
    var input = args.shift();
    var date;

    if (isNaN(new Date(input).getTime()))
    {
        return input;
    }

    if (Array.isArray(input) && typeof input[0] === "string")
    {
        // If input is array, assume we're being passed a format pattern to parse against.
        // Format pattern will accept an array of potential formats to parse against.
        // Date string should be at [0], format pattern(s) should be at [1]
        date = moment(string = input[0], formats = input[1], true);
    }
    else
    {
        // Otherwise, throw the input at moment and see what happens...
        date = moment(input);
    }

    if (!date.isValid())
    {
        // Log a warning if moment couldn't reconcile the input. Better than throwing an error?
        console.warn("Could not build a valid `moment` object from input.");
        return input;
    }

    function parse()
    {
        var args = Array.prototype.slice.call(arguments);
        var method = args.shift();

        switch (method)
        {
        case "add":

            // Mutates the original moment by adding time.
            // http://momentjs.com/docs/#/manipulating/add/

            var addends = args.shift()
                .split(",")
                .map(Function.prototype.call, String.prototype.trim);

            obj = {};
            for (var aId = 0; aId < addends.length; aId++)
            {
                var addend = addends[aId].split(" ");

                obj[addend[1]] = addend[0];
            }
            date = date.add(obj);
            break;

        case "subtract":

            // Mutates the original moment by subtracting time.
            // http://momentjs.com/docs/#/manipulating/subtract/

            var subtrahends = args.shift()
                .split(",")
                .map(Function.prototype.call, String.prototype.trim);

            obj = {};
            for (var sId = 0; sId < subtrahends.length; sId++)
            {
                var subtrahend = subtrahends[sId].split(" ");

                obj[subtrahend[1]] = subtrahend[0];
            }
            date = date.subtract(obj);
            break;

        case "from":

            // Display a moment in relative time, either from now or from a specified date.
            // http://momentjs.com/docs/#/displaying/fromnow/

            var from = "now";

            if (args[0] === "now") args.shift();

            if (moment(args[0]).isValid())
            {
                // If valid, assume it is a date we want the output computed against.
                from = moment(args.shift());
            }

            var removeSuffix = false;

            if (args[0] === true)
            {
                args.shift();
                removeSuffix = true;

            }

            if (from != "now")
            {
                date = date.from(from, removeSuffix);
                break;
            }

            date = date.fromNow(removeSuffix);
            break;

        case "calendar":

            // Formats a date with different strings depending on how close to a certain date (today by default) the date is.
            // http://momentjs.com/docs/#/displaying/calendar-time/

            var referenceTime = moment();

            if (moment(args[0]).isValid())
            {
                // If valid, assume it is a date we want the output computed against.
                referenceTime = moment(args.shift());
            }

            date = date.calendar(referenceTime);
            break;

        default:
            // Format
            // Formats a date by taking a string of tokens and replacing them with their corresponding values.
            // http://momentjs.com/docs/#/displaying/format/

            var format = method;

            date = date.format(format);
        }

        if (args.length) parse.apply(parse, args);
    }

    parse.apply(parse, args);

    return date;
};

Vue.filter("moment", dateFilter);
Vue.filter("date", dateFilter);

},{}],62:[function(require,module,exports){
Vue.filter("itemImage", function(item, baseUrl)
{
    var imageList = item.variationImageList;

    baseUrl = baseUrl || "/";

    if (baseUrl.charAt(baseUrl.length - 1) !== "/")
    {
        baseUrl += "/";
    }

    if (!!imageList && imageList.length > 0)
    {
        for (var i = 0; i < imageList.length; i++)
        {
            var image = imageList[i];

            if (!!image.path && image.path.length > 0)
            {
                return baseUrl + image.path;
            }
        }
    }

    return "";

});

},{}],63:[function(require,module,exports){
Vue.filter("itemImages", function(images, accessor)
{
    var imageUrls = [];
    var imagesAccessor = "all";

    if (images.variation.length)
    {
        imagesAccessor = "variation";
    }

    for (var i in images[imagesAccessor])
    {
        var imageUrl = images[imagesAccessor][i][accessor];

        imageUrls.push(imageUrl);
    }

    return imageUrls;
});

},{}],64:[function(require,module,exports){
Vue.filter("itemName", function(item, selectedName)
{

    if (selectedName === "0" && item.name1 !== "")
    {
        return item.name1;
    }
    else if (selectedName === "1" && item.name2 !== "")
    {
        return item.name2;
    }
    else if (selectedName === "2" && item.name3 !== "")
    {
        return item.name3;
    }

    return item.name1;
});

},{}],65:[function(require,module,exports){
Vue.filter("itemURL", function(item)
{

    var urlContent = item.texts[0].urlPath.split("/");
    var i          = urlContent.length - 1;

    if (urlContent[i].length > 0)
    {
        return "/" + urlContent[i] + "/" + item.variation.itemId + "/" + item.variation.id;
    }
    return "/" + item.variation.itemId + "/" + item.variation.id;

});

},{}],66:[function(require,module,exports){
var NotificationService = require("services/NotificationService");
var WaitScreenService   = require("services/WaitScreenService");

module.exports = (function($)
{

    var _eventListeners = {};

    return {
        get     : _get,
        put     : _put,
        post    : _post,
        delete  : _delete,
        send    : _send,
        setToken: _setToken,
        getToken: _getToken,
        listen  : _listen
    };

    function _listen(event, handler)
    {
        _eventListeners[event] = _eventListeners[event] || [];
        _eventListeners[event].push(handler);
    }

    function _triggerEvent(event, payload)
    {
        if (_eventListeners[event])
        {
            for (var i = 0; i < _eventListeners[event].length; i++)
            {
                var listener = _eventListeners[event][i];

                if (typeof listener !== "function")
                {
                    continue;
                }
                listener.call(Object, payload);
            }
        }
    }

    function _get(url, data, config)
    {
        config = config || {};
        config.method = "GET";
        return _send(url, data, config);
    }

    function _put(url, data, config)
    {
        config = config || {};
        config.method = "PUT";
        return _send(url, data, config);
    }

    function _post(url, data, config)
    {
        config = config || {};
        config.method = "POST";
        return _send(url, data, config);
    }

    function _delete(url, data, config)
    {
        config = config || {};
        config.method = "DELETE";
        return _send(url, data, config);
    }

    function _send(url, data, config)
    {
        var deferred = $.Deferred();

        config = config || {};
        config.data = data || null;
        config.dataType = config.dataType || "json";
        config.contentType = config.contentType || "application/x-www-form-urlencoded; charset=UTF-8";
        config.doInBackground = !!config.doInBackground;
        config.supressNotifications = !!config.supressNotifications;

        if (!config.doInBackground)
        {
            WaitScreenService.showWaitScreen();
        }
        $.ajax(url, config)
            .done(function(response)
            {
                if (!config.supressNotifications)
                {
                    printMessages(response);
                }
                for (var event in response.events)
                {
                    _triggerEvent(event, response.events[event]);
                }
                deferred.resolve(response.data || response);
            })
            .fail(function(jqXHR)
            {
                var response = jqXHR.responseText ? $.parseJSON(jqXHR.responseText) : {};

                if (!config.supressNotifications)
                {
                    printMessages(response);
                }
                deferred.reject(response.error);
            })
            .always(function()
            {
                if (!config.doInBackground)
                {
                    WaitScreenService.hideWaitScreen();
                }
            });

        return deferred;
    }

    function printMessages(response)
    {
        var notification;

        if (response.error && response.error.message.length > 0)
        {
            notification = NotificationService.error(response.error);
        }

        if (response.success && response.success.message.length > 0)
        {
            notification = NotificationService.success(response.success);
        }

        if (response.warning && response.warning.message.length > 0)
        {
            notification = NotificationService.warning(response.warning);
        }

        if (response.info && response.info.message.length > 0)
        {
            notification = NotificationService.info(response.info);
        }

        if (response.debug && response.debug.class.length > 0)
        {
            notification.trace(response.debug.file + "(" + response.debug.line + "): " + response.debug.class);
            for (var i = 0; i < response.debug.trace.length; i++)
            {
                notification.trace(response.debug.trace[i]);
            }
        }
    }

    function _setToken(token)
    {
        this._token = token;
    }

    function _getToken()
    {
        return this._token;
    }

})(jQuery);

},{"services/NotificationService":73,"services/WaitScreenService":77}],67:[function(require,module,exports){
var ApiService      = require("services/ApiService");
var CheckoutService = require("services/CheckoutService");

module.exports = (function($)
{

    return {
        createAddress: createAddress,
        updateAddress: updateAddress,
        deleteAddress: deleteAddress
    };

    /**
     * Create a new address
     * @param address
     * @param addressType
     * @param setActive
     * @returns {*}
     */
    function createAddress(address, addressType, setActive)
    {
        return ApiService.post("rest/io/customer/address?typeId=" + addressType, address).done(function(response)
        {
            if (setActive)
            {
                if (addressType === 1)
                {
                    CheckoutService.setBillingAddressId(response.id);
                }
                else if (addressType === 2)
                {
                    CheckoutService.setDeliveryAddressId(response.id);
                }
            }
        });
    }

    /**
     * Update an existing address
     * @param newData
     * @param addressType
     * @returns {*|Entry|undefined}
     */
    function updateAddress(newData, addressType)
    {
        addressType = addressType || newData.pivot.typeId;
        return ApiService.put("rest/io/customer/address/" + newData.id + "?typeId=" + addressType, newData);
    }

    /**
     * Delete an existing address
     * @param addressId
     * @param addressType
     * @returns {*}
     */
    function deleteAddress(addressId, addressType)
    {
        return ApiService.delete("rest/io/customer/address/" + addressId + "?typeId=" + addressType);
    }
})(jQuery);

},{"services/ApiService":68,"services/CheckoutService":69}],68:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"dup":66,"services/NotificationService":73,"services/WaitScreenService":77}],69:[function(require,module,exports){
var ApiService = require("services/ApiService");

module.exports = (function($)
{

    var checkout = {};
    var initPromise;

    return {
        init                : init,
        setCheckout         : setCheckout,
        setDeliveryAddressId: setDeliveryAddressId,
        setBillingAddressId : setBillingAddressId,
        setMethodOfPaymentId: setMethodOfPaymentId,
        setShippingCountryId: setShippingCountryId,
        setShippingProfileId: setShippingProfileId
    };

    function init(checkoutData)
    {
        if (!initPromise)
        {
            if (checkoutData)
            {
                initPromise = $.Deferred();
                checkout = checkoutData;
                initPromise.resolve();
            }
            else
            {
                initPromise = ApiService.get("/rest/io/checkout").done(function(response)
                {
                    checkout = response;
                });
            }
        }
        return initPromise;
    }

    function _set(property, value)
    {
        checkout[property] = value;
        return ApiService.post("/rest/io/checkout/", checkout).done(function(response)
        {
            checkout = response;
        });
    }

    function setCheckout(checkoutData)
    {
        var properties = Object.keys(checkoutData);

        for (var i = 0; i < properties.length; i++)
        {
            checkout[properties[i]] = checkoutData[properties[i]];
        }

        return ApiService.post("/rest/io/checkout/", checkout).done(function(response)
        {
            checkout = response;
        });
    }

    function setDeliveryAddressId(deliveryAddressId)
    {
        return _set("deliveryAddressId", deliveryAddressId);
    }

    function setBillingAddressId(billingAddressId)
    {
        return _set("billingAddressId", billingAddressId);
    }

    function setMethodOfPaymentId(methodOfPaymentId)
    {
        return _set("methodOfPaymentId", methodOfPaymentId);
    }

    function setShippingCountryId(shippingCountryId)
    {
        return _set("shippingCountryId", shippingCountryId);
    }

    function setShippingProfileId(shippingProfileId)
    {
        return _set("shippingProfileId", shippingProfileId);
    }

})(jQuery);

},{"services/ApiService":68}],70:[function(require,module,exports){
module.exports = (function($)
{

    return {
        parseShippingCountries: parseShippingCountries,
        parseShippingStates   : parseShippingStates,
        translateCountryNames : translateCountryNames,
        sortCountries         : sortCountries
    };

    function parseShippingCountries(countryList, id)
    {
        var deliveryCountries = [];

        if (countryList === null)
        {
            return deliveryCountries;
        }

        for (var key in countryList)
        {
            var country     = countryList[key];
            var option      = {id: country.id, name: country.name, locale: country.isoCode2, selected: false};

            option.selected = (id === country.id);
            deliveryCountries.push(option);
        }

        return deliveryCountries;
    }

    function translateCountryNames(countryNameMap, countryList)
    {
        if (countryNameMap === null)
        {
            return;
        }
        for (var countryId in countryNameMap)
        {
            var countryName = countryNameMap[countryId];

            for (var index in countryList)
            {
                var country = countryList[index];

                if (country.id === parseInt(countryId))
                {
                    country.name = countryName;
                    break;
                }
            }
        }
    }

    function sortCountries(countries)
    {
        countries.sort(function(first, second)
        {
            if (first.name < second.name)
            {
                return -1;
            }
            if (first.name > second.name)
            {
                return 1;
            }
            return 0;
        });
    }

    function parseShippingStates(countryList, countryID)
    {
        var states      = [];

        for (var key in countryList)
        {
            var country = countryList[key];

            if (country.id === countryID)
            {
                states = country.states;
                break;
            }
        }

        return states;
    }

})(jQuery);

},{}],71:[function(require,module,exports){
var ApiService = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ResourceService = require("services/ResourceService");
var UrlService = require("services/UrlService");

module.exports = (function($)
{
    var searchParams =
        {
            query       : "",
            items       : App.config.defaultItemsPerPage,
            sorting     : App.config.defaultSorting,
            page        : 1,
            facets      : "",
            categoryId  : null,
            template    : ""
        };

    return {
        getItemList       : getItemList,
        updateSearchString: updateSearchString,
        setSearchString   : setSearchString,
        setItemsPerPage   : setItemsPerPage,
        setOrderBy        : setOrderBy,
        setPage           : setPage,
        setSearchParams   : setSearchParams,
        setFacets         : setFacets,
        setCategoryId     : setCategoryId
    };

    function getItemList()
    {
        if (searchParams.categoryId || searchParams.query.length >= 3)
        {
            if (ResourceService.getResource("itemList").val())
            {
                ResourceService.getResource("itemList").val().total = 0;
            }

            var url = searchParams.categoryId ? "/rest/io/category" : "/rest/io/item/search";

            searchParams.template = "Ceres::ItemList.ItemListView";

            _setIsLoading(true);

            ApiService.get(url, searchParams)
                .done(function(response)
                {
                    _setIsLoading(false);

                    ResourceService.getResource("itemList").set(response);
                    ResourceService.getResource("facets").set(response.facets);
                })
                .fail(function(response)
                {
                    _setIsLoading(false);

                    NotificationService.error("Error while searching").closeAfter(5000);
                });
        }
    }

    function _setIsLoading(isLoading)
    {
        ResourceService.getResource("itemSearch").set(searchParams);
        ResourceService.getResource("isLoading").set(isLoading);
    }

    /**
     * ?searchString=searchString&itemsPerPage=itemsPerPage&orderBy=orderBy&orderByKey=orderByKey&page=page
     * @param urlParams
     */
    function setSearchParams(urlParams)
    {
        var queryParams = UrlService.getUrlParams(urlParams);

        for (var key in queryParams)
        {
            searchParams[key] = queryParams[key];
        }
    }

    function updateSearchString(query)
    {
        searchParams.query = query;

        query = (query.length > 0) ? query : null;
        UrlService.setUrlParam("query", query);
    }

    function setSearchString(query)
    {
        searchParams.query = query;
        searchParams.page = 1;

        setPage(1);
        setFacets("");

        ResourceService.getResource("facets").set({});
        ResourceService.getResource("facetParams").set([]);

        query = (query.length > 0) ? query : null;
        UrlService.setUrlParam("query", query);
    }

    function setItemsPerPage(items)
    {
        searchParams.items = items;

        items = (items !== App.config.defaultItemsPerPage) ? items : null;
        UrlService.setUrlParam("items", items);
    }

    function setOrderBy(sorting)
    {
        searchParams.sorting = sorting;

        sorting = (sorting !== App.config.defaultSorting) ? sorting : null;
        UrlService.setUrlParam("sorting", sorting);
    }

    function setPage(page)
    {
        searchParams.page = page;

        page = (page > 1) ? page : null;
        UrlService.setUrlParam("page", page);
    }

    function setFacets(facets)
    {
        searchParams.facets = facets.toString();

        facets = (facets.toString().length > 0) ? facets.toString() : null;

        setPage(1);

        UrlService.setUrlParam("facets", facets);
    }

    function setCategoryId(categoryId)
    {
        searchParams.categoryId = categoryId;
    }

})(jQuery);

},{"services/ApiService":68,"services/NotificationService":73,"services/ResourceService":74,"services/UrlService":75}],72:[function(require,module,exports){
module.exports = (function($)
{

    var paused  = false;
    var timeout = -1;
    var interval;
    var timeRemaining;
    var timeStart;

    return {
        findModal: findModal
    };

    function findModal(element)
    {
        return new Modal(element);
    }

    function Modal(element)
    {
        var self = this;
        var $bsModal;

        if ($(element).is(".modal"))
        {
            $bsModal = $(element);
        }
        else
        {
            $bsModal = $(element).find(".modal").first();
        }

        return {
            show             : show,
            hide             : hide,
            setTimeout       : setTimeout,
            startTimeout     : startTimeout,
            pauseTimeout     : pauseTimeout,
            continueTimeout  : continueTimeout,
            stopTimeout      : stopTimeout,
            getModalContainer: getModalContainer
        };

        function show()
        {
            $bsModal.modal("show");

            if ($bsModal.timeout > 0)
            {
                startTimeout();
            }

            return self;
        }

        function hide()
        {
            $bsModal.modal("hide");
            return self;
        }

        function getModalContainer()
        {
            return $bsModal;
        }

        function setTimeout(timeout)
        {
            $bsModal.timeout = timeout;

            $bsModal.find(".modal-content").mouseover(function()
            {
                pauseTimeout();
            });

            $bsModal.find(".modal-content").mouseout(function()
            {
                continueTimeout();
            });

            return this;
        }

        function startTimeout()
        {
            timeRemaining = $bsModal.timeout;
            timeStart = (new Date()).getTime();

            timeout = window.setTimeout(function()
            {
                window.clearInterval(interval);
                hide();
            }, $bsModal.timeout);

            $bsModal.find(".timer").text(timeRemaining / 1000);
            interval = window.setInterval(function()
            {
                if (!paused)
                {
                    var secondsRemaining = timeRemaining - (new Date()).getTime() + timeStart;

                    secondsRemaining = Math.round(secondsRemaining / 1000);
                    $bsModal.find(".timer").text(secondsRemaining);
                }
            }, 1000);
        }

        function pauseTimeout()
        {
            paused = true;
            timeRemaining -= (new Date()).getTime() - timeStart;
            window.clearTimeout(timeout);
        }

        function continueTimeout()
        {
            paused = false;
            timeStart = (new Date()).getTime();
            timeout = window.setTimeout(function()
            {
                hide();
                window.clearInterval(interval);
            }, timeRemaining);
        }

        function stopTimeout()
        {
            window.clearTimeout(timeout);
            window.clearInterval(interval);
        }
    }
})(jQuery);

},{}],73:[function(require,module,exports){
module.exports = (function($)
{

    var notificationCount = 0;
    var notifications     = new NotificationList();

    var handlerList = [];

    return {
        log             : _log,
        info            : _info,
        warn            : _warn,
        error           : _error,
        success         : _success,
        getNotifications: getNotifications,
        listen          : _listen
    };

    function _listen(handler)
    {
        handlerList.push(handler);
    }

    function trigger()
    {
        for (var i = 0; i < handlerList.length; i++)
        {
            handlerList[i].call({}, notifications.all());
        }
    }

    function _log(message, prefix)
    {
        var notification = new Notification(message);

        if (App.config.logMessages)
        {
            console.log((prefix || "") + "[" + notification.code + "] " + notification.message);

            for (var i = 0; i < notification.stackTrace.length; i++)
            {
                _log(notification.stackTrace[i], " + ");
            }
        }

        return notification;
    }

    function _info(message)
    {
        var notification = new Notification(message, "info");

        if (App.config.printInfos)
        {
            _printNotification(notification);
        }

        return notification;
    }

    function _warn(message)
    {
        var notification = new Notification(message, "warning");

        if (App.config.printWarnings)
        {
            _printNotification(notification);
        }

        return notification;
    }

    function _error(message)
    {
        var notification = new Notification(message, "danger");

        if (App.config.printErrors)
        {
            _printNotification(notification);
        }

        return notification;
    }

    function _success(message)
    {
        var notification = new Notification(message, "success");

        if (App.config.printSuccess)
        {
            _printNotification(notification);
        }

        return notification;
    }

    function getNotifications()
    {
        return notifications;
    }

    function _printNotification(notification)
    {
        notifications.add(notification);
        _log(notification);

        trigger();

        return notification;
    }

    function Notification(data, context)
    {
        if (!App.config.printStackTrace)
        {
            data.stackTrace = [];
        }
        var id   = notificationCount++;
        var self = {
            id        : id,
            code      : data.code || 0,
            message   : data.message || data || "",
            context   : context || "info",
            stackTrace: data.stackTrace || [],
            close     : close,
            closeAfter: closeAfter,
            trace     : trace
        };

        return self;

        function close()
        {
            notifications.remove(self);
            trigger();
        }

        function closeAfter(timeout)
        {
            setTimeout(function()
            {
                notifications.remove(self);
                trigger();
            }, timeout);
        }

        function trace(message, code)
        {
            if (App.config.printStackTrace)
            {
                self.stackTrace.push({
                    code   : code || 0,
                    message: message
                });
            }
        }
    }

    function NotificationList()
    {
        var elements = [];

        return {
            all   : all,
            add   : add,
            remove: remove
        };

        function all()
        {
            return elements;
        }

        function add(notification)
        {
            elements.push(notification);
        }

        function remove(notification)
        {
            for (var i = 0; i < elements.length; i++)
            {
                if (elements[i].id === notification.id)
                {
                    elements.splice(i, 1);
                    break;
                }
            }
        }
    }

})(jQuery);

},{}],74:[function(require,module,exports){
var ApiService = require("services/ApiService");

module.exports = (function($)
{

    var resources = {};

    return {
        registerResource    : registerResource,
        registerResourceList: registerResourceList,
        getResource         : getResource,
        watch               : watch,
        bind                : bind
    };

    /**
     * Register a new resource
     * @param {string}  name          The name of the resource. Must be a unique identifier
     * @param {string}  route         The route to bind the resource to
     * @param {*}       initialValue  The initial value to assign to the resource
     *
     * @returns {Resource} The created resource.
     */
    function registerResource(name, route, initialValue, responseTemplate)
    {
        if (!name)
        {
            throw new Error("Cannot register resource. Name is required.");
        }

        if (!route && typeof initialValue === "undefined")
        {
            throw new Error("Cannot register resource. Route or initial value is required.");
        }

        if (resources[name])
        {
            throw new Error("Resource '" + name + "' already exists.");
        }

        var data;

        try
        {
            data = $.parseJSON(initialValue);
        }
        catch (err)
        {
            data = initialValue;
        }

        name = name.toLowerCase();
        resources[name] = new Resource(route, data, responseTemplate);

        return resources[name];
    }

    /**
     * Register a new list resource
     * @param {string}  name          The name of the resource. Must be a unique identifier
     * @param {string}  route         The route to bind the resource to
     * @param {*}       initialValue  The initial value to assign to the resource
     *
     * @returns {Resource}            The created resource.
     */
    function registerResourceList(name, route, initialValue, responseTemplate)
    {
        if (!name)
        {
            throw new Error("Cannot register resource. Name is required.");
        }

        if (!route && typeof initialValue === "undefined")
        {
            throw new Error("Cannot register resource. Route or initial value is required.");
        }

        if (resources[name])
        {
            throw new Error("Resource '" + name + "' already exists.");
        }

        var data;

        try
        {
            data = $.parseJSON(initialValue);
        }
        catch (err)
        {
            data = initialValue;
        }

        name = name.toLowerCase();
        resources[name] = new ResourceList(route, data, responseTemplate);

        return resources[name];
    }

    /**
     * Receive a registered resource by its name
     * @param {string}  name    The name of the resource to receive
     *
     * @returns {Resource}      The resource
     */
    function getResource(name)
    {
        name = name.toLowerCase();

        if (!resources[name])
        {
            throw new Error("Unkown resource: " + name);
        }

        return resources[name];
    }

    /**
     * Track changes of a given resource.
     * @param {string}      name        The name of the resource to watch
     * @param {function}    callback    The handler to call on each change
     */
    function watch(name, callback)
    {
        getResource(name).watch(callback);
    }

    /**
     * Bind a resource to a property of a vue instance.
     * @param {string}  name        The name of the resource to bind
     * @param {Vue}     vue         The vue instance
     * @param {string}  property    The property of the vue instance. Optional if the property name is equal to the resource name.
     */
    function bind(name, vue, property)
    {
        property = property || name;
        getResource(name).bind(vue, property);
    }

    /**
     * @class Observable
     * Automatically notify all attached listeners on any changes.
     */
    function Observable()
    {
        var _value;
        var _watchers = [];

        return {
            get value()
            {
                return _value;
            },
            set value(newValue)
            {
                for (var i = 0; i < _watchers.length; i++)
                {
                    var watcher = _watchers[i];

                    watcher.apply({}, [newValue, _value]);
                }
                _value = newValue;
            },
            watch: function(cb)
            {
                _watchers.push(cb);
            }
        };
    }

    /**
     * @class Resource
     * @param {string}  url              The url to bind the resource to
     * @param {string}  initialValue     The initial value to assign to the resource
     * @param {string}  responseTemplate The path to the response fields file
     */
    function Resource(url, initialValue, responseTemplate)
    {
        var data = new Observable();
        var ready = false;

        // initialize resource
        if (typeof initialValue !== "undefined")
        {
            // Initial value that was given by constructor
            data.value = initialValue;
            ready = true;
        }
        else if (url)
        {
            // If no initial value was given, get the value from the URL
            ApiService
                .get(url, {template: this.responseTemplate})
                .done(function(response)
                {
                    data.value = response;
                    ready = true;
                });
        }
        else
        {
            throw new Error("Cannot initialize resource.");
        }

        return {
            watch: watch,
            bind: bind,
            val: val,
            set: set,
            update: update,
            listen: listen
        };

        /**
         * Update this resource on a given event triggered by ApiService.
         * @param {string} event        The event to listen on
         * @param {string} usePayload   A property of the payload to assign to this resource.
         *                              The resource will be updated by GET request if not set.
         */
        function listen(event, usePayload)
        {
            ApiService.listen(event, function(payload)
            {
                if (usePayload)
                {
                    update(payload[usePayload]);
                }
                else
                {
                    update();
                }
            });
        }

        /**
         * Add handler to track changes on this resource
         * @param {function} cb     The callback to call on each change
         */
        function watch(cb)
        {
            if (typeof cb !== "function")
            {
                throw new Error("Callback expected but got '" + (typeof cb) + "'.");
            }
            data.watch(cb);
            if (ready)
            {
                cb.apply({}, [data.value, null]);
            }
        }

        /**
         * Bind a property of a vue instance to this resource
         * @param {Vue}     vue         The vue instance
         * @param {string}   property    The property of the vue instance
         */
        function bind(vue, property)
        {
            if (!vue)
            {
                throw new Error("Vue instance not set.");
            }

            if (!property)
            {
                throw new Error("Cannot bind undefined property.");
            }

            watch(function(newValue)
            {
                vue.$set(property, newValue);
            });
        }

        /**
         * Receive the current value of this resource
         * @returns {*}
         */
        function val()
        {
            return data.value;
        }

        /**
         * Set the value of the resource.
         * @param {*}   value   The value to set.
         * @returns {Deferred}  The PUT request to the url of the resource
         */
        function set(value)
        {
            if (url)
            {
                value.template = responseTemplate;
                return ApiService
                    .put(url, value)
                    .done(function(response)
                    {
                        data.value = response;
                    });
            }

            var deferred = $.Deferred();

            data.value = value;
            deferred.resolve();
            return deferred;
        }

        /**
         * Update the value of the resource.
         * @param {*}           value   The new value to assign to this resource. Will receive current value from url if not set
         * @returns {Deferred}          The GET request to the url of the resource
         */
        function update(value)
        {
            if (value)
            {
                var deferred = $.Deferred();

                data.value = value;
                deferred.resolve();
                return deferred;
            }
            else if (url)
            {
                return ApiService
                    .get(url, {template: responseTemplate})
                    .done(function(response)
                    {
                        data.value = response;
                    });
            }

            throw new Error("Cannot update resource. Neither an URL nor a value is prodivded.");
        }
    }

    /**
     * @class ResourceList
     * @param {string}  url              The url to bind the resource to
     * @param {string}  initialValue     The initial value to assign to the resource
     * @param {string}  responseTemplate The path to the response fields file
     */
    function ResourceList(url, initialValue, responseTemplate)
    {
        var data = new Observable();
        var ready = false;

        if (url.charAt(url.length - 1) !== "/")
        {
            url += "/";
        }

        if (typeof initialValue !== "undefined")
        {
            data.value = initialValue;
            ready = true;
        }
        else if (url)
        {
            ApiService
                .get(url, {template: responseTemplate})
                .done(function(response)
                {
                    data.value = response;
                    ready = true;
                });
        }
        else
        {
            throw new Error("Cannot initialize resource.");
        }

        return {
            watch: watch,
            bind: bind,
            val: val,
            set: set,
            push: push,
            remove: remove,
            update: update,
            listen: listen
        };

        /**
         * Update this resource on a given event triggered by ApiService.
         * @param {string} event        The event to listen on
         * @param {string} usePayload   A property of the payload to assign to this resource.
         *                              The resource will be updated by GET request if not set.
         */
        function listen(event, usePayload)
        {
            ApiService.listen(event, function(payload)
            {
                if (usePayload)
                {
                    update(payload[usePayload]);
                }
                else
                {
                    update();
                }
            });
        }

        /**
         * Add handler to track changes on this resource
         * @param {function} cb     The callback to call on each change
         */
        function watch(cb)
        {
            if (typeof cb !== "function")
            {
                throw new Error("Callback expected but got '" + (typeof cb) + "'.");
            }
            data.watch(cb);

            if (ready)
            {
                cb.apply({}, [data.value, null]);
            }
        }

        /**
         * Bind a property of a vue instance to this resource
         * @param {Vue}     vue         The vue instance
         * @param {sting}   property    The property of the vue instance
         */
        function bind(vue, property)
        {
            if (!vue)
            {
                throw new Error("Vue instance not set.");
            }

            if (!property)
            {
                throw new Error("Cannot bind undefined property.");
            }

            watch(function(newValue)
            {
                vue.$set(property, newValue);
            });
        }

        /**
         * Receive the current value of this resource
         * @returns {*}
         */
        function val()
        {
            return data.value;
        }

        /**
         * Set the value of a single element of this resource.
         * @param {string|number}   key     The key of the element
         * @param {*}               value   The value to set.
         * @returns {Deferred}      The PUT request to the url of the resource
         */
        function set(key, value)
        {
            if (url)
            {
                value.template = responseTemplate;
                return ApiService
                    .put(url + key, value)
                    .done(function(response)
                    {
                        data.value = response;
                    });
            }
            var deferred = $.Deferred();

            data.value = value;
            deferred.resolve();
            return deferred;
        }

        /**
         * Add a new element to this resource
         * @param {*}   value   The element to add
         * @returns {Deferred}  The POST request to the url of the resource
         */
        function push(value)
        {
            if (url)
            {
                value.template = responseTemplate;
                return ApiService
                    .post(url, value)
                    .done(function(response)
                    {
                        data.value = response;
                    });
            }

            var deferred = $.Deferred();
            var list = data.value;

            list.push(value);
            data.value = list;

            deferred.resolve();
            return deferred;
        }

        /**
         * Remove an element from this resource
         * @param {string|number}   key     The key of the element
         * @returns {Deferred}              The DELETE request to the url of the resource
         */
        function remove(key)
        {
            if (url)
            {
                return ApiService
                    .delete(url + key, {template: responseTemplate})
                    .done(function(response)
                    {
                        data.value = response;
                    });
            }

            var deferred = $.Deferred();
            var list = data.value;

            list.splice(key, 1);
            data.value = list;

            deferred.resolve();
            return deferred;
        }

        /**
         * Update the value of the resource.
         * @param {*}           value   The new value to assign to this resource. Will receive current value from url if not set
         * @returns {Deferred}          The GET request to the url of the resource
         */
        function update(value)
        {
            if (value)
            {
                var deferred = $.Deferred();

                data.value = value;
                deferred.resolve();
                return deferred;
            }

            return ApiService
                .get(url, {template: responseTemplate})
                .done(function(response)
                {
                    data.value = response;
                });
        }
    }

})(jQuery);

},{"services/ApiService":68}],75:[function(require,module,exports){
module.exports = (function($)
{
    return {
        getUrlParams: _getUrlParams,
        setUrlParam: _setUrlParam
    };

    function _getUrlParams(urlParams)
    {
        if (urlParams)
        {
            var tokens;
            var params = {};
            var regex = /[?&]?([^=]+)=([^&]*)/g;

            urlParams = urlParams.split("+").join(" ");

            // eslint-disable-next-line
            while (tokens = regex.exec(urlParams))
            {
                params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
            }

            return params;
        }

        return {};
    }

    function _setUrlParams(urlParams)
    {
        var pathName = window.location.pathname;
        var params = $.isEmptyObject(urlParams) ? "" : "?" + $.param(urlParams);
        var title = document.getElementsByTagName("title")[0].innerHTML;

        window.history.replaceState({}, title, pathName + params);
    }

    function _setUrlParam(key, value)
    {
        urlParams = _getUrlParams(document.location.search);

        if (value !== null)
        {
            urlParams[key] = value;
        }
        else
        {
            delete urlParams[key];
        }

        _setUrlParams(urlParams);
    }

})(jQuery);

},{}],76:[function(require,module,exports){
module.exports = (function($)
{
    var $form;

    return {
        validate         : _validate,
        getInvalidFields : _getInvalidFields,
        markInvalidFields: _markInvalidFields
    };

    function _validate(form)
    {
        var deferred      = $.Deferred();
        var invalidFields = _getInvalidFields(form);

        if (invalidFields.length > 0)
        {
            deferred.rejectWith(form, [invalidFields]);
        }
        else
        {
            deferred.resolveWith(form);
        }

        return deferred;
    }

    function _getInvalidFields(form)
    {
        $form = $(form);
        var invalidFormControls = [];

        $form.find("[data-validate]").each(function(i, elem)
        {

            if (!_validateElement($(elem)))
            {
                invalidFormControls.push(elem);
            }
        });

        return invalidFormControls;
    }

    function _markInvalidFields(fields, errorClass)
    {
        errorClass = errorClass || "has-error";

        $(fields).each(function(i, elem)
        {
            var $elem = $(elem);

            $elem.addClass(errorClass);
            _findFormControls($elem).on("click.removeErrorClass keyup.removeErrorClass change.removeErrorClass", function()
            {
                if (_validateElement($elem))
                {
                    $elem.removeClass(errorClass);
                    if ($elem.is("[type=\"radio\"], [type=\"checkbox\"]"))
                    {
                        var groupName = $elem.attr("name");

                        $("." + errorClass + "[name=\"" + groupName + "\"]").removeClass(errorClass);
                    }
                    _findFormControls($elem).off("click.removeErrorClass keyup.removeErrorClass change.removeErrorClass");
                }
            });
        });
    }

    function _validateElement(elem)
    {
        var $elem          = $(elem);
        var validationKeys = $elem.attr("data-validate").split("|").map(function(i)
            {
            return i.trim();
        }) || ["text"];
        var hasError       = false;

        _findFormControls($elem).each(function(i, formControl)
        {
            var $formControl  = $(formControl);
            var validationKey = validationKeys[i] || validationKeys[0];

            if (!_isActive($formControl))
            {
                // continue loop
                return true;
            }

            if ($formControl.is("[type=\"checkbox\"], [type=\"radio\"]"))
            {

                if (!_validateGroup($formControl, validationKey))
                {
                    hasError = true;
                }

                return true;
            }

            if ($formControl.is("select"))
            {
                if (!_validateSelect($formControl, validationKey))
                {
                    hasError = true;
                }

                return true;
            }

            if (!_validateInput($formControl, validationKey))
            {
                hasError = true;
            }

            return false;
        });

        return !hasError;
    }

    function _validateGroup($formControl, validationKey)
    {
        var groupName = $formControl.attr("name");
        var $group    = $form.find("[name=\"" + groupName + "\"]");
        var range     = _eval(validationKey) || {min: 1, max: 1};
        var checked   = $group.filter(":checked").length;

        return checked >= range.min && checked <= range.max;

    }

    function _validateSelect($formControl, validationKey)
    {
        return $.trim($formControl.val()) !== validationKey;
    }

    function _validateInput($formControl, validationKey)
    {
        switch (validationKey)
        {
        case "text":
            return _hasValue($formControl);
        case "number":
            return _hasValue($formControl) && $.isNumeric($.trim($formControl.val()));
        case "ref":
            return _compareRef($.trim($formControl.val()), $.trim($formControl.attr("data-validate-ref")));
        case "regex":
            var ref   = $formControl.attr("data-validate-ref");
            var regex = ref.startsWith("/") ? _eval(ref) : new RegExp(ref);

            return _hasValue($formControl) && regex.test($.trim($formControl.val()));
        default:
            console.error("Form validation error: unknown validation property: \"" + validationKey + "\"");
            return true;
        }
    }

    function _hasValue($formControl)
    {
        return $.trim($formControl.val()).length > 0;
    }

    function _compareRef(value, ref)
    {
        if ($(ref).length > 0)
        {
            ref = $.trim($(ref).val());
        }

        return value === ref;
    }

    function _findFormControls($elem)
    {
        if ($elem.is("input, select, textarea"))
        {
            return $elem;
        }

        return $elem.find("input, select, textarea");
    }

    function _isActive($elem)
    {
        return $elem.is(":visible") && $elem.is(":enabled");
    }

    function _eval(input)
    {
        // eslint-disable-next-line
        return (new Function("return " + input))();
    }

})(jQuery);

},{}],77:[function(require,module,exports){
module.exports = (function($)
{

    var overlay = {
        count    : 0,
        isVisible: false
    };

    return {
        getOverlay    : getOverlay,
        showWaitScreen: showWaitScreen,
        hideWaitScreen: hideWaitScreen
    };

    function getOverlay()
    {
        return overlay;
    }

    function showWaitScreen()
    {
        overlay.count = overlay.count || 0;
        overlay.count++;
        overlay.isVisible = true;
    }

    function hideWaitScreen(force)
    {
        overlay.count = overlay.count || 0;
        if (overlay.count > 0)
        {
            overlay.count--;
        }

        if (force)
        {
            overlay.count = 0;
        }

        if (overlay.count <= 0)
        {
            overlay.count = 0;
            overlay.visible = false;
        }

    }

})(jQuery);

},{}]},{},[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,24,25,26,22,27,28,29,30,31,39,40,41,32,33,34,35,37,36,38,42,43,44,45,46,47,48,49,50,55,56,51,52,53,54,57,58,59,60,61,62,63,64,65])


// Frontend end scripts
// eslint-disable-next-line
var init = (function($, window, document)
{

    function CeresMain()
    {

        $(window).scroll(function()
        {
            if ($(".wrapper-main").hasClass("isSticky"))
            {
                if ($(this).scrollTop() > 1)
                {
                    $(".wrapper-main").addClass("sticky");
                }
                else
                {
                    $(".wrapper-main").removeClass("sticky");
                }
            }
        });

        // Replace all SVG images with inline SVG, class: svg
        $("img[src$=\".svg\"]").each(function()
        {
            var $img = jQuery(this);
            var imgURL = $img.attr("src");
            var attributes = $img.prop("attributes");

            $.get(imgURL, function(data)
            {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find("svg");

                // Remove any invalid XML tags
                $svg = $svg.removeAttr("xmlns:a");

                // Loop through IMG attributes and apply on SVG
                $.each(attributes, function()
                {
                    $svg.attr(this.name, this.value);
                });

                // Replace IMG with SVG
                $img.replaceWith($svg);
            }, "xml");
        });

        // Sticky sidebar single item
        if (window.matchMedia("(min-width: 768px)").matches)
        {
            var $singleRightside = $(".single-rightside");
            var $headHeight = $(".top-bar").height();

            $singleRightside.stick_in_parent({offset_top: $headHeight + 10});

            $singleRightside.on("sticky_kit:bottom", function()
            {
                $(this).parent().css("position", "static");
            })
                .on("sticky_kit:unbottom", function()
                {
                    $(this).parent().css("position", "relative");
                });
        }

        var $toggleListView = $(".toggle-list-view");
        var $mainNavbarCollapse = $("#mainNavbarCollapse");

        setTimeout(function()
        {
            var $toggleBasketPreview = $("#toggleBasketPreview, #closeBasketPreview");

            $toggleBasketPreview.on("click", function(evt)
            {
                evt.preventDefault();
                evt.stopPropagation();
                $("body").toggleClass("open-right");
            });
        }, 1);

        $(document).on("click", "body.open-right", function(evt)
        {
            if ($("body").hasClass("open-right"))
            {
                if ((evt.target != $(".basket-preview")) && ($(evt.target).parents(".basket-preview").length <= 0))
                {
                    evt.preventDefault();
                    $("body").toggleClass("open-right");
                }
            }
        });

        $("#searchBox").on("show.bs.collapse", function()
        {
            $("#countrySettings").collapse("hide");
        });

        $("#countrySettings").on("show.bs.collapse", function()
        {
            $("#searchBox").collapse("hide");
        });

        $toggleListView.on("click", function(evt)
        {
            evt.preventDefault();

            // toggle it's own state
            $toggleListView.toggleClass("grid");

            // toggle internal style of thumbs
            $(".product-list, .cmp-product-thumb").toggleClass("grid");
        });

        $mainNavbarCollapse.collapse("hide");

        // Add click listener outside the navigation to close it
        $mainNavbarCollapse.on("show.bs.collapse", function()
        {
            $(".main").one("click", closeNav);
        });

        $mainNavbarCollapse.on("hide.bs.collapse", function()
        {
            $(".main").off("click", closeNav);
        });

        function closeNav()
        {
            $("#mainNavbarCollapse").collapse("hide");
        }

        // initialize lazyload for articles
        $("img.lazy").show().lazyload({
            effect: "fadeIn"
        });
        // test, to delete
        $("img.testtest").show().lazyload({
            effect : "fadeIn"
        });

        $(".cmp-product-thumb").on("mouseover", function(event)
        {
            $(this).find("img").each(function(i, img)
            {
                var $img = $(img);

                if (!$img.attr("src"))
                {
                    $(img).lazyload();
                }
            });
        });
    }

    window.CeresMain = new CeresMain();

})(jQuery, window, document);

//# sourceMappingURL=ceres-app.js.map
