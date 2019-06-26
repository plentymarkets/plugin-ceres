(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (process){
function detect() {
  var nodeVersion = getNodeVersion();
  if (nodeVersion) {
    return nodeVersion;
  } else if (typeof navigator !== 'undefined') {
    return parseUserAgent(navigator.userAgent);
  }

  return null;
}

function detectOS(userAgentString) {
  var rules = getOperatingSystemRules();
  var detected = rules.filter(function (os) {
    return os.rule && os.rule.test(userAgentString);
  })[0];

  return detected ? detected.name : null;
}

function getNodeVersion() {
  var isNode = typeof navigator === 'undefined' && typeof process !== 'undefined';
  return isNode ? {
    name: 'node',
    version: process.version.slice(1),
    os: require('os').type().toLowerCase()
  } : null;
}

function parseUserAgent(userAgentString) {
  var browsers = getBrowserRules();
  if (!userAgentString) {
    return null;
  }

  var detected = browsers.map(function(browser) {
    var match = browser.rule.exec(userAgentString);
    var version = match && match[1].split(/[._]/).slice(0,3);

    if (version && version.length < 3) {
      version = version.concat(version.length == 1 ? [0, 0] : [0]);
    }

    return match && {
      name: browser.name,
      version: version.join('.')
    };
  }).filter(Boolean)[0] || null;

  if (detected) {
    detected.os = detectOS(userAgentString);
  }

  if (/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/i.test(userAgentString)) {
    detected = detected || {};
    detected.bot = true;
  }

  return detected;
}

function getBrowserRules() {
  return buildRules([
    [ 'aol', /AOLShield\/([0-9\._]+)/ ],
    [ 'edge', /Edge\/([0-9\._]+)/ ],
    [ 'yandexbrowser', /YaBrowser\/([0-9\._]+)/ ],
    [ 'vivaldi', /Vivaldi\/([0-9\.]+)/ ],
    [ 'kakaotalk', /KAKAOTALK\s([0-9\.]+)/ ],
    [ 'samsung', /SamsungBrowser\/([0-9\.]+)/ ],
    [ 'chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/ ],
    [ 'phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/ ],
    [ 'crios', /CriOS\/([0-9\.]+)(:?\s|$)/ ],
    [ 'firefox', /Firefox\/([0-9\.]+)(?:\s|$)/ ],
    [ 'fxios', /FxiOS\/([0-9\.]+)/ ],
    [ 'opera', /Opera\/([0-9\.]+)(?:\s|$)/ ],
    [ 'opera', /OPR\/([0-9\.]+)(:?\s|$)$/ ],
    [ 'ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/ ],
    [ 'ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/ ],
    [ 'ie', /MSIE\s(7\.0)/ ],
    [ 'bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/ ],
    [ 'android', /Android\s([0-9\.]+)/ ],
    [ 'ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/ ],
    [ 'safari', /Version\/([0-9\._]+).*Safari/ ],
    [ 'facebook', /FBAV\/([0-9\.]+)/],
    [ 'instagram', /Instagram\ ([0-9\.]+)/],
    [ 'ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/]
  ]);
}

function getOperatingSystemRules() {
  return buildRules([
    [ 'iOS', /iP(hone|od|ad)/ ],
    [ 'Android OS', /Android/ ],
    [ 'BlackBerry OS', /BlackBerry|BB10/ ],
    [ 'Windows Mobile', /IEMobile/ ],
    [ 'Amazon OS', /Kindle/ ],
    [ 'Windows 3.11', /Win16/ ],
    [ 'Windows 95', /(Windows 95)|(Win95)|(Windows_95)/ ],
    [ 'Windows 98', /(Windows 98)|(Win98)/ ],
    [ 'Windows 2000', /(Windows NT 5.0)|(Windows 2000)/ ],
    [ 'Windows XP', /(Windows NT 5.1)|(Windows XP)/ ],
    [ 'Windows Server 2003', /(Windows NT 5.2)/ ],
    [ 'Windows Vista', /(Windows NT 6.0)/ ],
    [ 'Windows 7', /(Windows NT 6.1)/ ],
    [ 'Windows 8', /(Windows NT 6.2)/ ],
    [ 'Windows 8.1', /(Windows NT 6.3)/ ],
    [ 'Windows 10', /(Windows NT 10.0)/ ],
    [ 'Windows ME', /Windows ME/ ],
    [ 'Open BSD', /OpenBSD/ ],
    [ 'Sun OS', /SunOS/ ],
    [ 'Linux', /(Linux)|(X11)/ ],
    [ 'Mac OS', /(Mac_PowerPC)|(Macintosh)/ ],
    [ 'QNX', /QNX/ ],
    [ 'BeOS', /BeOS/ ],
    [ 'OS/2', /OS\/2/ ],
    [ 'Search Bot', /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/ ]
  ]);
}

function buildRules(ruleTuples) {
  return ruleTuples.map(function(tuple) {
    return {
      name: tuple[0],
      rule: tuple[1]
    };
  });
}

module.exports = {
  detect: detect,
  detectOS: detectOS,
  getNodeVersion: getNodeVersion,
  parseUserAgent: parseUserAgent
};

}).call(this,require('_process'))

},{"_process":137,"os":135}],2:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],3:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.4.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2019-05-01T21:04Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.4.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code, options ) {
		DOMEval( code, { nonce: options && options.nonce } );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.4
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2019-04-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) &&

				// Support: IE 8 only
				// Exclude object elements
				(nodeType !== 1 || context.nodeName.toLowerCase() !== "object") ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 && rdescend.test( selector ) ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = (elem.ownerDocument || elem).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( typeof elem.contentDocument !== "undefined" ) {
			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();
						return result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								} );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	// Support: IE 9-11 only
	// Also use offsetWidth/offsetHeight for when box sizing is unreliable
	// We use getClientRects() to check for hidden/disconnected.
	// In those cases, the computed value can be trusted to be border-box
	if ( ( !support.boxSizingReliable() && isBorderBox ||
		val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url, options ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{}],4:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;

},{"./_getNative":68,"./_root":104}],5:[function(require,module,exports){
var hashClear = require('./_hashClear'),
    hashDelete = require('./_hashDelete'),
    hashGet = require('./_hashGet'),
    hashHas = require('./_hashHas'),
    hashSet = require('./_hashSet');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

},{"./_hashClear":75,"./_hashDelete":76,"./_hashGet":77,"./_hashHas":78,"./_hashSet":79}],6:[function(require,module,exports){
var listCacheClear = require('./_listCacheClear'),
    listCacheDelete = require('./_listCacheDelete'),
    listCacheGet = require('./_listCacheGet'),
    listCacheHas = require('./_listCacheHas'),
    listCacheSet = require('./_listCacheSet');

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

},{"./_listCacheClear":87,"./_listCacheDelete":88,"./_listCacheGet":89,"./_listCacheHas":90,"./_listCacheSet":91}],7:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":68,"./_root":104}],8:[function(require,module,exports){
var mapCacheClear = require('./_mapCacheClear'),
    mapCacheDelete = require('./_mapCacheDelete'),
    mapCacheGet = require('./_mapCacheGet'),
    mapCacheHas = require('./_mapCacheHas'),
    mapCacheSet = require('./_mapCacheSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

},{"./_mapCacheClear":92,"./_mapCacheDelete":93,"./_mapCacheGet":94,"./_mapCacheHas":95,"./_mapCacheSet":96}],9:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;

},{"./_getNative":68,"./_root":104}],10:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":68,"./_root":104}],11:[function(require,module,exports){
var MapCache = require('./_MapCache'),
    setCacheAdd = require('./_setCacheAdd'),
    setCacheHas = require('./_setCacheHas');

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;

},{"./_MapCache":8,"./_setCacheAdd":105,"./_setCacheHas":106}],12:[function(require,module,exports){
var ListCache = require('./_ListCache'),
    stackClear = require('./_stackClear'),
    stackDelete = require('./_stackDelete'),
    stackGet = require('./_stackGet'),
    stackHas = require('./_stackHas'),
    stackSet = require('./_stackSet');

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

},{"./_ListCache":6,"./_stackClear":108,"./_stackDelete":109,"./_stackGet":110,"./_stackHas":111,"./_stackSet":112}],13:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":104}],14:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

},{"./_root":104}],15:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;

},{"./_getNative":68,"./_root":104}],16:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],17:[function(require,module,exports){
/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],18:[function(require,module,exports){
var baseIndexOf = require('./_baseIndexOf');

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;

},{"./_baseIndexOf":33}],19:[function(require,module,exports){
/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;

},{}],20:[function(require,module,exports){
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isIndex = require('./_isIndex'),
    isTypedArray = require('./isTypedArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;

},{"./_baseTimes":44,"./_isIndex":83,"./isArguments":117,"./isArray":118,"./isBuffer":120,"./isTypedArray":128}],21:[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],22:[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],23:[function(require,module,exports){
var baseAssignValue = require('./_baseAssignValue'),
    eq = require('./eq');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

},{"./_baseAssignValue":27,"./eq":116}],24:[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":116}],25:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    keys = require('./keys');

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;

},{"./_copyObject":55,"./keys":129}],26:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    keysIn = require('./keysIn');

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;

},{"./_copyObject":55,"./keysIn":130}],27:[function(require,module,exports){
var defineProperty = require('./_defineProperty');

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

},{"./_defineProperty":60}],28:[function(require,module,exports){
var Stack = require('./_Stack'),
    arrayEach = require('./_arrayEach'),
    assignValue = require('./_assignValue'),
    baseAssign = require('./_baseAssign'),
    baseAssignIn = require('./_baseAssignIn'),
    cloneBuffer = require('./_cloneBuffer'),
    copyArray = require('./_copyArray'),
    copySymbols = require('./_copySymbols'),
    copySymbolsIn = require('./_copySymbolsIn'),
    getAllKeys = require('./_getAllKeys'),
    getAllKeysIn = require('./_getAllKeysIn'),
    getTag = require('./_getTag'),
    initCloneArray = require('./_initCloneArray'),
    initCloneByTag = require('./_initCloneByTag'),
    initCloneObject = require('./_initCloneObject'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isMap = require('./isMap'),
    isObject = require('./isObject'),
    isSet = require('./isSet'),
    keys = require('./keys');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });

    return result;
  }

  if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });

    return result;
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;

},{"./_Stack":12,"./_arrayEach":16,"./_assignValue":23,"./_baseAssign":25,"./_baseAssignIn":26,"./_cloneBuffer":49,"./_copyArray":54,"./_copySymbols":56,"./_copySymbolsIn":57,"./_getAllKeys":65,"./_getAllKeysIn":66,"./_getTag":73,"./_initCloneArray":80,"./_initCloneByTag":81,"./_initCloneObject":82,"./isArray":118,"./isBuffer":120,"./isMap":124,"./isObject":125,"./isSet":127,"./keys":129}],29:[function(require,module,exports){
var isObject = require('./isObject');

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;

},{"./isObject":125}],30:[function(require,module,exports){
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],31:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    isArray = require('./isArray');

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;

},{"./_arrayPush":21,"./isArray":118}],32:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":13,"./_getRawTag":70,"./_objectToString":102}],33:[function(require,module,exports){
var baseFindIndex = require('./_baseFindIndex'),
    baseIsNaN = require('./_baseIsNaN'),
    strictIndexOf = require('./_strictIndexOf');

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;

},{"./_baseFindIndex":30,"./_baseIsNaN":38,"./_strictIndexOf":113}],34:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

},{"./_baseGetTag":32,"./isObjectLike":126}],35:[function(require,module,exports){
var baseIsEqualDeep = require('./_baseIsEqualDeep'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;

},{"./_baseIsEqualDeep":36,"./isObjectLike":126}],36:[function(require,module,exports){
var Stack = require('./_Stack'),
    equalArrays = require('./_equalArrays'),
    equalByTag = require('./_equalByTag'),
    equalObjects = require('./_equalObjects'),
    getTag = require('./_getTag'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isTypedArray = require('./isTypedArray');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;

},{"./_Stack":12,"./_equalArrays":61,"./_equalByTag":62,"./_equalObjects":63,"./_getTag":73,"./isArray":118,"./isBuffer":120,"./isTypedArray":128}],37:[function(require,module,exports){
var getTag = require('./_getTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;

},{"./_getTag":73,"./isObjectLike":126}],38:[function(require,module,exports){
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;

},{}],39:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./_isMasked":85,"./_toSource":114,"./isFunction":122,"./isObject":125}],40:[function(require,module,exports){
var getTag = require('./_getTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;

},{"./_getTag":73,"./isObjectLike":126}],41:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

},{"./_baseGetTag":32,"./isLength":123,"./isObjectLike":126}],42:[function(require,module,exports){
var isPrototype = require('./_isPrototype'),
    nativeKeys = require('./_nativeKeys');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;

},{"./_isPrototype":86,"./_nativeKeys":99}],43:[function(require,module,exports){
var isObject = require('./isObject'),
    isPrototype = require('./_isPrototype'),
    nativeKeysIn = require('./_nativeKeysIn');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;

},{"./_isPrototype":86,"./_nativeKeysIn":100,"./isObject":125}],44:[function(require,module,exports){
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

},{}],45:[function(require,module,exports){
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;

},{}],46:[function(require,module,exports){
var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    cacheHas = require('./_cacheHas'),
    createSet = require('./_createSet'),
    setToArray = require('./_setToArray');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"./_SetCache":11,"./_arrayIncludes":18,"./_arrayIncludesWith":19,"./_cacheHas":47,"./_createSet":59,"./_setToArray":107}],47:[function(require,module,exports){
/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;

},{}],48:[function(require,module,exports){
var Uint8Array = require('./_Uint8Array');

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;

},{"./_Uint8Array":14}],49:[function(require,module,exports){
var root = require('./_root');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

},{"./_root":104}],50:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer');

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;

},{"./_cloneArrayBuffer":48}],51:[function(require,module,exports){
/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;

},{}],52:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;

},{"./_Symbol":13}],53:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer');

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;

},{"./_cloneArrayBuffer":48}],54:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;

},{}],55:[function(require,module,exports){
var assignValue = require('./_assignValue'),
    baseAssignValue = require('./_baseAssignValue');

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;

},{"./_assignValue":23,"./_baseAssignValue":27}],56:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    getSymbols = require('./_getSymbols');

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;

},{"./_copyObject":55,"./_getSymbols":71}],57:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    getSymbolsIn = require('./_getSymbolsIn');

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;

},{"./_copyObject":55,"./_getSymbolsIn":72}],58:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":104}],59:[function(require,module,exports){
var Set = require('./_Set'),
    noop = require('./noop'),
    setToArray = require('./_setToArray');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;

},{"./_Set":10,"./_setToArray":107,"./noop":131}],60:[function(require,module,exports){
var getNative = require('./_getNative');

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;

},{"./_getNative":68}],61:[function(require,module,exports){
var SetCache = require('./_SetCache'),
    arraySome = require('./_arraySome'),
    cacheHas = require('./_cacheHas');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;

},{"./_SetCache":11,"./_arraySome":22,"./_cacheHas":47}],62:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    Uint8Array = require('./_Uint8Array'),
    eq = require('./eq'),
    equalArrays = require('./_equalArrays'),
    mapToArray = require('./_mapToArray'),
    setToArray = require('./_setToArray');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;

},{"./_Symbol":13,"./_Uint8Array":14,"./_equalArrays":61,"./_mapToArray":97,"./_setToArray":107,"./eq":116}],63:[function(require,module,exports){
var getAllKeys = require('./_getAllKeys');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;

},{"./_getAllKeys":65}],64:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],65:[function(require,module,exports){
var baseGetAllKeys = require('./_baseGetAllKeys'),
    getSymbols = require('./_getSymbols'),
    keys = require('./keys');

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;

},{"./_baseGetAllKeys":31,"./_getSymbols":71,"./keys":129}],66:[function(require,module,exports){
var baseGetAllKeys = require('./_baseGetAllKeys'),
    getSymbolsIn = require('./_getSymbolsIn'),
    keysIn = require('./keysIn');

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;

},{"./_baseGetAllKeys":31,"./_getSymbolsIn":72,"./keysIn":130}],67:[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;

},{"./_isKeyable":84}],68:[function(require,module,exports){
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":39,"./_getValue":74}],69:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":103}],70:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":13}],71:[function(require,module,exports){
var arrayFilter = require('./_arrayFilter'),
    stubArray = require('./stubArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;

},{"./_arrayFilter":17,"./stubArray":132}],72:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    getPrototype = require('./_getPrototype'),
    getSymbols = require('./_getSymbols'),
    stubArray = require('./stubArray');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;

},{"./_arrayPush":21,"./_getPrototype":69,"./_getSymbols":71,"./stubArray":132}],73:[function(require,module,exports){
var DataView = require('./_DataView'),
    Map = require('./_Map'),
    Promise = require('./_Promise'),
    Set = require('./_Set'),
    WeakMap = require('./_WeakMap'),
    baseGetTag = require('./_baseGetTag'),
    toSource = require('./_toSource');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;

},{"./_DataView":4,"./_Map":7,"./_Promise":9,"./_Set":10,"./_WeakMap":15,"./_baseGetTag":32,"./_toSource":114}],74:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],75:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

},{"./_nativeCreate":98}],76:[function(require,module,exports){
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

},{}],77:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":98}],78:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

},{"./_nativeCreate":98}],79:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

},{"./_nativeCreate":98}],80:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],81:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer'),
    cloneDataView = require('./_cloneDataView'),
    cloneRegExp = require('./_cloneRegExp'),
    cloneSymbol = require('./_cloneSymbol'),
    cloneTypedArray = require('./_cloneTypedArray');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;

},{"./_cloneArrayBuffer":48,"./_cloneDataView":50,"./_cloneRegExp":51,"./_cloneSymbol":52,"./_cloneTypedArray":53}],82:[function(require,module,exports){
var baseCreate = require('./_baseCreate'),
    getPrototype = require('./_getPrototype'),
    isPrototype = require('./_isPrototype');

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;

},{"./_baseCreate":29,"./_getPrototype":69,"./_isPrototype":86}],83:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;

},{}],84:[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;

},{}],85:[function(require,module,exports){
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":58}],86:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

},{}],87:[function(require,module,exports){
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

},{}],88:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;

},{"./_assocIndexOf":24}],89:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

},{"./_assocIndexOf":24}],90:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

},{"./_assocIndexOf":24}],91:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

},{"./_assocIndexOf":24}],92:[function(require,module,exports){
var Hash = require('./_Hash'),
    ListCache = require('./_ListCache'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;

},{"./_Hash":5,"./_ListCache":6,"./_Map":7}],93:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

},{"./_getMapData":67}],94:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

},{"./_getMapData":67}],95:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

},{"./_getMapData":67}],96:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

},{"./_getMapData":67}],97:[function(require,module,exports){
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

},{}],98:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":68}],99:[function(require,module,exports){
var overArg = require('./_overArg');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

},{"./_overArg":103}],100:[function(require,module,exports){
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;

},{}],101:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

},{"./_freeGlobal":64}],102:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],103:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],104:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":64}],105:[function(require,module,exports){
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;

},{}],106:[function(require,module,exports){
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;

},{}],107:[function(require,module,exports){
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

},{}],108:[function(require,module,exports){
var ListCache = require('./_ListCache');

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;

},{"./_ListCache":6}],109:[function(require,module,exports){
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;

},{}],110:[function(require,module,exports){
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

},{}],111:[function(require,module,exports){
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

},{}],112:[function(require,module,exports){
var ListCache = require('./_ListCache'),
    Map = require('./_Map'),
    MapCache = require('./_MapCache');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

},{"./_ListCache":6,"./_Map":7,"./_MapCache":8}],113:[function(require,module,exports){
/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;

},{}],114:[function(require,module,exports){
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],115:[function(require,module,exports){
var baseClone = require('./_baseClone');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;

},{"./_baseClone":28}],116:[function(require,module,exports){
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],117:[function(require,module,exports){
var baseIsArguments = require('./_baseIsArguments'),
    isObjectLike = require('./isObjectLike');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

},{"./_baseIsArguments":34,"./isObjectLike":126}],118:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],119:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

},{"./isFunction":122,"./isLength":123}],120:[function(require,module,exports){
var root = require('./_root'),
    stubFalse = require('./stubFalse');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

},{"./_root":104,"./stubFalse":133}],121:[function(require,module,exports){
var baseIsEqual = require('./_baseIsEqual');

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;

},{"./_baseIsEqual":35}],122:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObject = require('./isObject');

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

},{"./_baseGetTag":32,"./isObject":125}],123:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],124:[function(require,module,exports){
var baseIsMap = require('./_baseIsMap'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;

},{"./_baseIsMap":37,"./_baseUnary":45,"./_nodeUtil":101}],125:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],126:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],127:[function(require,module,exports){
var baseIsSet = require('./_baseIsSet'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;

},{"./_baseIsSet":40,"./_baseUnary":45,"./_nodeUtil":101}],128:[function(require,module,exports){
var baseIsTypedArray = require('./_baseIsTypedArray'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;

},{"./_baseIsTypedArray":41,"./_baseUnary":45,"./_nodeUtil":101}],129:[function(require,module,exports){
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeys = require('./_baseKeys'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

},{"./_arrayLikeKeys":20,"./_baseKeys":42,"./isArrayLike":119}],130:[function(require,module,exports){
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeysIn = require('./_baseKeysIn'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;

},{"./_arrayLikeKeys":20,"./_baseKeysIn":43,"./isArrayLike":119}],131:[function(require,module,exports){
/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;

},{}],132:[function(require,module,exports){
/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;

},{}],133:[function(require,module,exports){
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

},{}],134:[function(require,module,exports){
var baseUniq = require('./_baseUniq');

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return (array && array.length) ? baseUniq(array) : [];
}

module.exports = uniq;

},{"./_baseUniq":46}],135:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};

},{}],136:[function(require,module,exports){
(function (global){
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.15.0
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Popper = factory());
}(this, (function () { 'use strict';

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

return Popper;

})));


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],137:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],138:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],139:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./support/isBuffer":138,"_process":137,"inherits":2}],140:[function(require,module,exports){
/*!
  * vue-script2 v2.0.3
  * (c) 2016-2018 Greg Slepak
  * @license MIT License
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueScript2 = factory());
}(this, (function () { 'use strict';

  var Script2 = {
    installed: false,
    p: Promise.resolve(),
    version: '2.0.3', // grunt will overwrite to match package.json
    loaded: {}, // keys are the scripts that have been loaded
    install: function install(Vue) {

      if (Script2.installed) return;
      var customAttrs = ['unload'];
      // from: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
      // 'async' and 'defer' don't allow document.write according to:
      // http://www.html5rocks.com/en/tutorials/speed/script-loading/
      // we ignore 'defer' and handle 'async' specially.
      var props = customAttrs.concat(['src', 'type', 'async', 'integrity', 'text', 'crossorigin']);
      Vue.component('script2', {
        props: props,
        // <slot> is important, see: http://vuejs.org/guide/components.html#Named-Slots
        // template: '<div style="display:none"><slot></slot></div>',
        // NOTE: Instead of using `template` we can use the `render` function like so:
        render: function render(h) {
          return h('div', { style: 'display:none' }, this.$slots.default);
        },
        mounted: function mounted() {
          var _this = this;

          var parent = this.$el.parentElement;
          if (!this.src) {
            Script2.p = Script2.p.then(function () {
              var s = document.createElement('script');
              var h = _this.$el.innerHTML;
              h = h.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&amp;/gi, '&');
              s.type = 'text/javascript';
              s.appendChild(document.createTextNode(h));
              parent.appendChild(s);
            });
          } else {
            var opts = _.omitBy(_.pick(this, props), _.isUndefined);
            opts.parent = parent;
            // this syntax results in an implicit return
            var load = function load() {
              return Script2.load(_this.src, opts);
            };
            _.isUndefined(this.async) ? Script2.p = Script2.p.then(load) // serialize execution
            : load(); // inject immediately
          }
          // see: https://vuejs.org/v2/guide/migration.html#ready-replaced
          this.$nextTick(function () {
            // code that assumes this.$el is in-document
            // NOTE: we could've done this.$el.remove(), but IE sucks, see:
            //       https://github.com/taoeffect/vue-script2/pull/17
            _this.$el.parentElement.removeChild(_this.$el); // remove dummy template <div>
          });
        },
        destroyed: function destroyed() {
          if (this.unload) {
            new Function(this.unload)(); // eslint-disable-line
            delete Script2.loaded[this.src];
          }
        }
      });
      Script2.installed = true;
    },
    load: function load(src) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { parent: document.head };

      return Script2.loaded[src] ? Promise.resolve(src) : new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        // omit the special options that Script2 supports
        _.defaults2(s, _.omit(opts, ['unload', 'parent']), { type: 'text/javascript' });
        // according to: http://www.html5rocks.com/en/tutorials/speed/script-loading/
        // async does not like 'document.write' usage, which we & vue.js make
        // heavy use of based on the SPA style. Also, async can result
        // in code getting executed out of order from how it is inlined on the page.
        s.async = false; // therefore set this to false
        s.src = src;
        // crossorigin in HTML and crossOrigin in the DOM per HTML spec
        // https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-crossorigin
        if (opts.crossorigin) {
          s.crossOrigin = opts.crossorigin;
        }
        // inspiration from: https://github.com/eldargab/load-script/blob/master/index.js
        // and: https://github.com/ded/script.js/blob/master/src/script.js#L70-L82
        s.onload = function () {
          Script2.loaded[src] = 1;resolve(src);
        };
        // IE should now support onerror and onload. If necessary, take a look
        // at this to add older IE support: http://stackoverflow.com/a/4845802/1781435
        s.onerror = function () {
          return reject(new Error(src));
        };
        opts.parent.appendChild(s);
      });
    }
  };

  var _ = {
    isUndefined: function isUndefined(x) {
      return x === undefined;
    },
    pick: function pick(o, props) {
      var x = {};
      props.forEach(function (k) {
        x[k] = o[k];
      });
      return x;
    },
    omit: function omit(o, props) {
      var x = {};
      Object.keys(o).forEach(function (k) {
        if (props.indexOf(k) === -1) x[k] = o[k];
      });
      return x;
    },
    omitBy: function omitBy(o, pred) {
      var x = {};
      Object.keys(o).forEach(function (k) {
        if (!pred(o[k])) x[k] = o[k];
      });
      return x;
    },

    // custom defaults function suited to our specific purpose
    defaults2: function defaults2(o) {
      for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
      }

      sources.forEach(function (s) {
        Object.keys(s).forEach(function (k) {
          if (_.isUndefined(o[k]) || o[k] === '') o[k] = s[k];
        });
      });
    }
  };

  return Script2;

})));

},{}],141:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ModalService = require("services/ModalService");

Vue.component("add-item-to-basket-overlay", {
  delimiters: ["${", "}"],
  props: {
    template: {
      type: String,
      "default": "#vue-add-item-to-basket-overlay"
    },
    defaultTimeToClose: {
      type: Number,
      "default": 15
    }
  },
  data: function data() {
    return {
      currency: "",
      price: 0
    };
  },
  computed: _objectSpread({
    isLastBasketEntrySet: function isLastBasketEntrySet() {
      return Object.keys(this.latestBasketEntry.item).length !== 0;
    },
    itemName: function itemName() {
      if (this.isLastBasketEntrySet) {
        return this.$options.filters.itemName(this.latestBasketEntry.item);
      }

      return "";
    },
    imageUrl: function imageUrl() {
      if (this.isLastBasketEntrySet) {
        var images = this.$options.filters.itemImages(this.latestBasketEntry.item.images, "urlPreview");
        var img = this.$options.filters.itemImage(images);
        return img;
      }

      return "";
    },
    imageAlternativeText: function imageAlternativeText() {
      if (this.isLastBasketEntrySet) {
        var images = this.$options.filters.itemImages(this.latestBasketEntry.item.images, "urlPreview");
        return this.$options.filters.itemImageAlternativeText(images);
      }

      return "";
    }
  }, Vuex.mapState({
    latestBasketEntry: function latestBasketEntry(state) {
      return state.basket.latestEntry;
    }
  })),
  watch: {
    latestBasketEntry: function latestBasketEntry() {
      if (App.config.basket.addItemToBasketConfirm === "overlay") {
        this.setPriceFromData();
        ModalService.findModal(document.getElementById("add-item-to-basket-overlay")).setTimeout(this.defaultTimeToClose * 1000).show();
      }
    }
  },
  methods: {
    setPriceFromData: function setPriceFromData() {
      if (this.latestBasketEntry.item.prices) {
        this.currency = this.latestBasketEntry.item.prices["default"].currency;
        var graduatedPrice = this.$options.filters.graduatedPrice(this.latestBasketEntry.item, this.latestBasketEntry.quantity);
        var propertySurcharge = this.$options.filters.propertySurchargeSum(this.latestBasketEntry.item);
        this.price = this.$options.filters.specialOffer(graduatedPrice, this.latestBasketEntry.item.prices, "price", "value") + propertySurcharge;
      }
    },
    orderParamValue: function orderParamValue(propertyId) {
      var orderParams = this.latestBasketEntry.orderParams;

      if ((0, _utils.isNullOrUndefined)(orderParams)) {
        return "";
      }

      var property = this.latestBasketEntry.item.properties.find(function (property) {
        return parseInt(property.property.id) === parseInt(propertyId);
      });

      if ((0, _utils.isNullOrUndefined)(property) || !property.property.isOderProperty) {
        return "";
      }

      var orderParam = orderParams.find(function (param) {
        return parseInt(param.property.id) === parseInt(propertyId);
      });
      var orderParamValue = orderParam.property.value;

      if (property.property.valueType === "selection" && orderParamValue) {
        return orderParam.property.selectionValues[orderParamValue].name;
      }

      return orderParamValue;
    }
  }
});

},{"../../helper/utils":271,"services/ModalService":278}],142:[function(require,module,exports){
"use strict";

var _ExceptionMap = _interopRequireDefault(require("exceptions/ExceptionMap"));

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

var _UrlService = require("services/UrlService");

var _utils = require("../../helper/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NotificationService = require("services/NotificationService");

Vue.component("add-to-basket", {
  props: {
    template: {
      type: String,
      "default": "#vue-add-to-basket"
    },
    itemUrl: String,
    showQuantity: {
      type: Boolean,
      "default": false
    },
    useLargeScale: {
      type: Boolean,
      "default": false
    },
    missingOrderProperties: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    variationId: {
      type: Number
    },
    isSalable: {
      type: Boolean,
      "default": false
    },
    hasChildren: {
      type: Boolean,
      "default": false
    },
    intervalQuantity: {
      type: Number,
      "default": 1
    },
    minimumQuantity: {
      type: Number,
      "default": 0
    },
    maximumQuantity: {
      type: Number,
      "default": null
    },
    orderProperties: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    hasPrice: {
      type: Boolean,
      "default": true
    }
  },
  computed: _objectSpread({
    canBeAddedToBasket: function canBeAddedToBasket() {
      return this.isSalable && !this.hasChildren && !(this.minimumQuantity != 1 || this.intervalQuantity != 1) && !this.requiresProperties && this.hasPrice;
    },
    requiresProperties: function requiresProperties() {
      return App.config.item.requireOrderProperties && this.orderProperties.filter(function (property) {
        return property.property.isShownOnItemPage;
      }).length > 0;
    }
  }, Vuex.mapState({
    isBasketLoading: function isBasketLoading(state) {
      return state.basket.isBasketLoading;
    },
    isVariationSelected: function isVariationSelected(state) {
      return state.item.isVariationSelected;
    }
  })),
  data: function data() {
    return {
      quantity: 1,
      buttonLockState: false,
      waiting: false
    };
  },
  methods: {
    /**
     * add an item to basket-resource
     */
    addToBasket: function addToBasket() {
      var _this = this;

      if (this.missingOrderProperties.length) {
        this.showMissingPropertiesError();
      } else if (this.isSalable) {
        this.waiting = true;
        this.orderProperties.forEach(function (orderProperty) {
          if (orderProperty.property.valueType === "float" && !(0, _utils.isNullOrUndefined)(orderProperty.property.value) && orderProperty.property.value.slice(-1) === App.decimalSeparator) {
            orderProperty.property.value = orderProperty.property.value.substr(0, orderProperty.property.value.length - 1);
          }
        });
        var basketObject = {
          variationId: this.variationId,
          quantity: this.quantity,
          basketItemOrderParams: this.orderProperties
        };
        this.$store.dispatch("addBasketItem", basketObject).then(function (response) {
          var basketItem = response.find(function (item) {
            return item.variationId === _this.variationId;
          });
          var variation = !(0, _utils.isNullOrUndefined)(basketItem) ? basketItem.variation.data : null;
          var orderParams = !(0, _utils.isNullOrUndefined)(basketObject) ? basketObject.basketItemOrderParams : null;
          document.dispatchEvent(new CustomEvent("afterBasketItemAdded", {
            detail: basketObject
          }));
          _this.waiting = false;

          _this.openAddToBasketOverlay(basketObject.quantity, variation, orderParams);
        }, function (error) {
          _this.waiting = false;

          if (error.data) {
            NotificationService.error(_TranslationService["default"].translate("Ceres::Template." + _ExceptionMap["default"].get(error.data.exceptionCode.toString()))).closeAfter(5000);
          }
        });
      }
    },
    showMissingPropertiesError: function showMissingPropertiesError() {
      this.$store.commit("setVariationMarkInvalidProps", true);
      var propertyNames = this.missingOrderProperties.map(function (property) {
        return property.property.names.name;
      });
      var errorMsgContent = "";
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = propertyNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;
          errorMsgContent += name + "<br>";
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      NotificationService.error(_TranslationService["default"].translate("Ceres::Template.singleItemMissingOrderPropertiesError").replace("<properties>", errorMsgContent));
    },
    directToItem: function directToItem() {
      (0, _UrlService.navigateTo)(this.itemUrl);
    },
    handleButtonState: function handleButtonState(value) {
      this.buttonLockState = value;
    },

    /**
     * open the AddItemToBasketOverlay
     */
    openAddToBasketOverlay: function openAddToBasketOverlay(stashedQuantity, item, orderParams) {
      var latestBasketEntry = {
        item: item,
        quantity: stashedQuantity,
        orderParams: orderParams
      };
      this.$store.commit("setLatestBasketEntry", latestBasketEntry);
    },

    /**
     * update the property quantity of the current instance
     * @param value
     */
    updateQuantity: function updateQuantity(value) {
      this.quantity = value;
    }
  },
  watch: {
    quantity: function quantity(newValue, oldValue) {
      this.$store.commit("setVariationOrderQuantity", newValue);
    }
  }
});

},{"../../helper/utils":271,"exceptions/ExceptionMap":240,"services/NotificationService":279,"services/TranslationService":280,"services/UrlService":281}],143:[function(require,module,exports){
"use strict";

var _ApiService = _interopRequireDefault(require("services/ApiService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.component("basket-preview", {
  delimiters: ["${", "}"],
  props: {
    template: {
      type: String,
      "default": "#vue-basket-preview"
    },
    showNetPrices: {
      type: Boolean,
      "default": false
    }
  },
  computed: Vuex.mapState({
    basket: function basket(state) {
      return state.basket.data;
    },
    basketItems: function basketItems(state) {
      return state.basket.items;
    },
    basketNotifications: function basketNotifications(state) {
      return state.basket.basketNotifications;
    },
    latestBasketEntry: function latestBasketEntry(state) {
      return state.basket.latestEntry;
    }
  }),
  created: function created() {
    this.$store.dispatch("loadBasketData");
    this.$store.commit("setShowNetPrices", this.showNetPrices);
  },

  /**
   * Bind to basket and bind the basket items
   */
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _ApiService["default"].listen("AfterBasketChanged", function (data) {
        _this.$store.commit("setBasket", data.basket);

        _this.$store.commit("setShowNetPrices", data.showNetPrices);
      });
    });
  },
  watch: {
    latestBasketEntry: function latestBasketEntry() {
      if (App.config.basket.addItemToBasketConfirm === "preview" && Object.keys(this.latestBasketEntry.item).length !== 0) {
        setTimeout(function () {
          var vueApp = document.querySelector("#vue-app");
          var basketOpenClass = App.config.basket.previewType === "right" ? "open-right" : "open-hover";

          if (vueApp) {
            vueApp.classList.add(basketOpenClass);
          }
        }, 1);
      }
    }
  }
});

},{"services/ApiService":275}],144:[function(require,module,exports){
"use strict";

Vue.component("basket-totals", {
  props: {
    template: {
      type: String,
      "default": "#vue-basket-totals"
    },
    visibleFields: {
      type: Array,
      "default": function _default() {
        return ["basketValueNet", "basketValueGross", "rebate", "shippingCostsNet", "shippingCostsGross", "totalSumNet", "promotionCoupon", "vats", "totalSumGross", "salesCoupon", "openAmount"];
      }
    }
  },
  computed: Vuex.mapState({
    basket: function basket(state) {
      return state.basket.data;
    },
    isBasketLoading: function isBasketLoading(state) {
      return state.basket.isBasketLoading;
    },
    showNetPrices: function showNetPrices(state) {
      return state.basket.showNetPrices;
    }
  }),
  methods: {
    calculateBaseValue: function calculateBaseValue(value, percent) {
      return value / (100 - percent) * 100;
    }
  }
});

},{}],145:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NotificationService = require("services/NotificationService");

Vue.component("coupon", {
  props: {
    template: {
      type: String,
      "default": "#vue-coupon"
    }
  },
  data: function data() {
    return {
      waiting: false,
      couponCode: ""
    };
  },
  watch: {
    redeemedCouponCode: function redeemedCouponCode(val) {
      this.couponCode = val;
    }
  },
  computed: _objectSpread({
    disabled: function disabled() {
      if (this.redeemedCouponCode) {
        return true;
      }

      return false;
    }
  }, Vuex.mapState({
    redeemedCouponCode: function redeemedCouponCode(state) {
      return state.basket.data.couponCode;
    },
    isBasketLoading: function isBasketLoading(state) {
      return state.basket.isBasketLoading;
    },
    isCheckoutReadonly: function isCheckoutReadonly(state) {
      return state.checkout.readOnly;
    }
  })),
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.redeemedCouponCode) {
        _this.couponCode = _this.redeemedCouponCode;
      }
    });
  },
  methods: {
    redeemCode: function redeemCode() {
      var _this2 = this;

      // remove whitespaces
      this.couponCode = this.couponCode.replace(/\s/g, "");

      if (this.couponCode.length > 0) {
        this.waiting = true;
        this.$store.dispatch("redeemCouponCode", this.couponCode).then(function (response) {
          _this2.waiting = false;
          NotificationService.success(_TranslationService["default"].translate("Ceres::Template.couponRedeemSuccess")).closeAfter(10000);
        }, function (error) {
          _this2.waiting = false;
          NotificationService.error(_this2.getCouponRedemtionErrorMessage(error)).closeAfter(10000);
        });
      } else {
        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.couponIsEmpty")).closeAfter(10000);
      }
    },
    removeCode: function removeCode() {
      var _this3 = this;

      this.waiting = true;
      this.$store.dispatch("removeCouponCode", this.couponCode).then(function (response) {
        _this3.waiting = false;
        NotificationService.success(_TranslationService["default"].translate("Ceres::Template.couponRemoveSuccess")).closeAfter(10000);
      }, function (error) {
        _this3.waiting = false;
        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.couponRemoveFailure")).closeAfter(10000);
      });
    },
    getCouponRedemtionErrorMessage: function getCouponRedemtionErrorMessage(error) {
      var errorMessageKeys = {
        18: "couponMinOrderValueNotReached",
        51: "couponnotUsableForSpecialOffer",
        70: "couponAlreadyUsedOrInvalidCouponCode",
        78: "couponCampaignExpired",
        126: "couponNoMatchingItemInBasket",
        329: "couponOnlySubscription",
        330: "couponOnlySingleUsage",
        331: "couponNoOpenAmount",
        332: "couponExpired",
        334: "couponOnlyForNewCustomers",
        335: "couponOnlyForExistingCustomers",
        336: "couponWrongCustomerGroup",
        337: "couponWrongCustomerType",
        338: "couponNoCustomerTypeProvided",
        339: "couponNoCustomerTypeActivated",
        340: "couponNoCustomerGroupActivated",
        341: "couponCampaignNoWebstoreActivated",
        342: "couponCampaignWrongWebstoreId",
        343: "couponCampaignNoWebstoreIdGiven"
      };

      if (error && error.error && error.code && errorMessageKeys[error.code]) {
        return _TranslationService["default"].translate("Ceres::Template." + errorMessageKeys[error.code]);
      }

      return _TranslationService["default"].translate("Ceres::Template.couponRedeemFailure");
    }
  }
});

},{"services/NotificationService":279,"services/TranslationService":280}],146:[function(require,module,exports){
"use strict";

Vue.component("basket-list", {
  props: {
    template: {
      type: String,
      "default": "#vue-basket-list"
    },
    size: {
      type: String,
      "default": "small"
    },
    isPreview: {
      type: Boolean,
      "default": false
    }
  },
  computed: Vuex.mapState({
    basketItems: function basketItems(state) {
      return state.basket.items;
    },
    isBasketInitiallyLoaded: function isBasketInitiallyLoaded(state) {
      return state.basket.isBasketInitiallyLoaded;
    }
  })
});

},{}],147:[function(require,module,exports){
"use strict";

var _ExceptionMap = _interopRequireDefault(require("exceptions/ExceptionMap"));

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

var _utils = require("../../../helper/utils");

var _VariationPropertyService = require("../../../services/VariationPropertyService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NotificationService = require("services/NotificationService");

Vue.component("basket-list-item", {
  props: ["basketItem", "size", "language", "template", "isPreview"],
  data: function data() {
    return {
      waiting: false,
      waitingForDelete: false,
      itemCondition: "",
      showMoreInformation: false
    };
  },
  computed: _objectSpread({
    image: function image() {
      var itemImages = this.$options.filters.itemImages(this.basketItem.variation.data.images, "urlPreview");
      return this.$options.filters.itemImage(itemImages);
    },
    altText: function altText() {
      var images = this.$options.filters.itemImages(this.basketItem.variation.data.images, "urlPreview");
      var altText = this.$options.filters.itemImageAlternativeText(images);

      if (altText) {
        return altText;
      }

      return this.itemName;
    },
    itemName: function itemName() {
      return this.$options.filters.itemName(this.basketItem.variation.data);
    },
    isInputLocked: function isInputLocked() {
      return this.waiting || this.isBasketLoading;
    },
    propertySurchargeSum: function propertySurchargeSum() {
      var sum = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.basketItem.basketItemOrderParams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var property = _step.value;
          sum += this.$options.filters.propertySurcharge(this.basketItem.variation.data.properties, property.propertyId);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return sum;
    },
    itemTotalPrice: function itemTotalPrice() {
      return this.basketItem.quantity * this.basketItem.price;
    },
    unitPrice: function unitPrice() {
      if (!(0, _utils.isNullOrUndefined)(this.basketItem.variation.data.prices.specialOffer)) {
        return this.basketItem.variation.data.prices.specialOffer.unitPrice.value;
      }

      return this.basketItem.variation.data.prices["default"].unitPrice.value;
    },
    basePrice: function basePrice() {
      if (!(0, _utils.isNullOrUndefined)(this.basketItem.variation.data.prices.specialOffer)) {
        return this.basketItem.variation.data.prices.specialOffer.basePrice;
      }

      return this.basketItem.variation.data.prices["default"].basePrice;
    },
    transformedVariationProperties: function transformedVariationProperties() {
      return (0, _VariationPropertyService.transformBasketItemProperties)(this.basketItem, ["empty"], "displayInOrderProcess");
    }
  }, Vuex.mapState({
    isBasketLoading: function isBasketLoading(state) {
      return state.basket.isBasketLoading;
    },
    isCheckoutReadonly: function isCheckoutReadonly(state) {
      return state.checkout.readOnly;
    },
    showNetPrice: function showNetPrice(state) {
      return state.basket.showNetPrices;
    }
  })),
  methods: {
    /**
     * Delete item from basket
     */
    deleteItem: function deleteItem() {
      var _this = this;

      if (!this.waiting && !this.waitingForDelete && !this.isBasketLoading) {
        this.waitingForDelete = true;
        this.$store.dispatch("removeBasketItem", this.basketItem.id).then(function (response) {
          document.dispatchEvent(new CustomEvent("afterBasketItemRemoved", {
            detail: _this.basketItem
          }));
          _this.waitingForDelete = false;
        }, function (error) {
          _this.waitingForDelete = false;
        });
      }
    },

    /**
     * Update item quantity in basket
     * @param quantity
     */
    updateQuantity: function updateQuantity(quantity) {
      var _this2 = this;

      if (this.basketItem.quantity !== quantity) {
        this.waiting = true;
        var origQty = this.basketItem.quantity;
        this.$store.dispatch("updateBasketItemQuantity", {
          basketItem: this.basketItem,
          quantity: quantity
        }).then(function (response) {
          document.dispatchEvent(new CustomEvent("afterBasketItemQuantityUpdated", {
            detail: _this2.basketItem
          }));
          _this2.waiting = false;
        }, function (error) {
          _this2.basketItem.quantity = origQty;

          if (_this2.isPreview) {
            _this2.$store.dispatch("addBasketNotification", {
              type: "error",
              message: _TranslationService["default"].translate("Ceres::Template." + _ExceptionMap["default"].get(error.data.exceptionCode.toString()))
            });
          } else {
            NotificationService.error(_TranslationService["default"].translate("Ceres::Template." + _ExceptionMap["default"].get(error.data.exceptionCode.toString()))).closeAfter(5000);
          }

          _this2.waiting = false;
        });
      }
    },
    isPropertyVisible: function isPropertyVisible(propertyId) {
      var property = this.basketItem.variation.data.properties.find(function (property) {
        return property.property.id === parseInt(propertyId);
      });

      if (property) {
        return property.property.isShownAtCheckout;
      }

      return false;
    }
  }
});

},{"../../../helper/utils":271,"../../../services/VariationPropertyService":283,"exceptions/ExceptionMap":240,"services/NotificationService":279,"services/TranslationService":280}],148:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NotificationService = require("services/NotificationService");

Vue.component("accept-gtc-check", {
  props: {
    template: {
      type: String,
      "default": "#vue-accept-gtc-check"
    },
    hideCheckbox: {
      type: Boolean
    },
    isPreselected: {
      type: Boolean
    },
    isRequired: {
      type: Boolean,
      "default": true
    },
    customText: {
      type: String,
      "default": ""
    }
  },
  data: function data() {
    return {
      isChecked: this.isPreselected
    };
  },
  computed: _objectSpread({}, Vuex.mapState({
    showError: function showError(state) {
      return state.checkout.validation.gtc.showError;
    }
  })),
  created: function created() {
    if (this.hideCheckbox) {
      this.isChecked = true;
    } else if (this.isRequired) {
      this.$store.commit("setGtcValidator", this.validate);
    }
  },
  methods: {
    validate: function validate() {
      var showError = !this.isChecked;
      this.$store.commit("setGtcShowError", showError);

      if (showError) {
        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.checkoutCheckAcceptGtc"));
      }
    }
  },
  watch: {
    isChecked: function isChecked() {
      if (this.showError) {
        this.validate();
      }
    }
  }
});

},{"services/NotificationService":279,"services/TranslationService":280}],149:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

var _UrlService = require("../../services/UrlService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ApiService = require("services/ApiService");

var NotificationService = require("services/NotificationService");

var _isEqual = require("lodash/isEqual");

Vue.component("checkout", {
  props: {
    template: {
      type: String,
      "default": "#vue-checkout"
    },
    initialCheckout: {
      type: Object,
      required: true
    },
    deliveryAddressList: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    selectedDeliveryAddress: {
      type: Number,
      "default": -99
    },
    billingAddressList: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    selectedBillingAddress: {
      type: Number,
      "default": 0
    }
  },
  computed: Vuex.mapState({
    checkout: function checkout(state) {
      return state.checkout;
    },
    deliveryAddressId: function deliveryAddressId(state) {
      return state.address.deliveryAddressId;
    }
  }),
  created: function created() {
    this.$store.dispatch("setCheckout", this.initialCheckout);
    this.$store.dispatch("initBillingAddress", {
      id: this.selectedBillingAddress,
      addressList: this.billingAddressList
    });
    this.$store.dispatch("initDeliveryAddress", {
      id: this.selectedDeliveryAddress,
      addressList: this.deliveryAddressList
    });
    this.addEventHandler();
    (0, _UrlService.removeUrlParam)("readonlyCheckout");
  },
  methods: {
    addEventHandler: function addEventHandler() {
      var _this = this;

      ApiService.listen("CheckoutChanged", function (checkout) {
        _this.handleCheckoutChangedEvent(checkout.checkout);
      });
      document.addEventListener("afterPaymentMethodChanged", function (event) {
        var newMethodOfPaymentId = event.detail;

        if (newMethodOfPaymentId !== _this.checkout.payment.methodOfPaymentId) {
          _this.updateCheckoutAndBasket();
        }
      });
    },
    updateCheckoutAndBasket: function updateCheckoutAndBasket() {
      var _this2 = this;

      this.$store.commit("setIsBasketLoading", true);
      var reloadBasketPromise = this.$store.dispatch("refreshBasket");
      var reloadCheckoutPromise = this.$store.dispatch("refreshCheckout");
      Promise.all([reloadBasketPromise, reloadCheckoutPromise]).then(function (data) {
        _this2.$store.commit("setIsBasketLoading", false);
      });
    },
    handleCheckoutChangedEvent: function handleCheckoutChangedEvent(checkout) {
      if (!this.isEquals(this.checkout.payment.methodOfPaymentList, checkout.paymentDataList, "id")) {
        NotificationService.info(_TranslationService["default"].translate("Ceres::Template.checkoutMethodOfPaymentListChanged"));
        this.$store.commit("setMethodOfPaymentList", checkout.paymentDataList);
      }

      if (this.hasShippingProfileListChanged(this.checkout.shipping.shippingProfileList, checkout.shippingProfileList.slice())) {
        this.$store.commit("setShippingProfileList", checkout.shippingProfileList);
      }

      if (this.checkout.payment.methodOfPaymentId !== checkout.methodOfPaymentId) {
        NotificationService.warn(_TranslationService["default"].translate("Ceres::Template.checkoutMethodOfPaymentChanged"));
        this.$store.commit("setMethodOfPayment", checkout.methodOfPaymentId);
      }

      if (this.checkout.shipping.shippingProfileId !== checkout.shippingProfileId) {
        NotificationService.warn(_TranslationService["default"].translate("Ceres::Template.checkoutShippingProfileChanged"));
        this.$store.commit("setShippingProfile", checkout.shippingProfileId);
      }

      if (this.checkout.shipping.shippingCountryId !== checkout.shippingCountryId) {
        this.$store.commit("setShippingCountryId", checkout.shippingCountryId);
      }

      var responseDeliveryAddressId = checkout.deliveryAddressId !== 0 ? checkout.deliveryAddressId : -99;

      if (this.deliveryAddressId !== responseDeliveryAddressId) {
        NotificationService.warn(_TranslationService["default"].translate("Ceres::Template.addressChangedWarning"));
        this.$store.commit("selectDeliveryAddressById", responseDeliveryAddressId);
      }

      if (!_isEqual(this.checkout.shipping.maxDeliveryDays, checkout.maxDeliveryDays)) {
        this.$store.commit("setMaxDeliveryDays", checkout.maxDeliveryDays);
      }

      if (this.checkout.readOnly !== checkout.readOnly) {
        this.$store.commit("setIsCheckoutReadonly", checkout.readOnly);
        window.location.href = App.urls.checkout;
      }
    },
    hasShippingProfileListChanged: function hasShippingProfileListChanged(oldList, newList) {
      if (oldList.length !== newList.length) {
        NotificationService.info(_TranslationService["default"].translate("Ceres::Template.checkoutShippingProfileListChanged"));
        return true;
      }

      this.sortList(oldList, "parcelServicePresetId");
      this.sortList(newList, "parcelServicePresetId");

      for (var index in oldList) {
        if (oldList[index].parcelServicePresetId !== newList[index].parcelServicePresetId) {
          NotificationService.info(_TranslationService["default"].translate("Ceres::Template.checkoutShippingProfileListChanged"));
          return true;
        } else if (oldList[index].shippingAmount !== newList[index].shippingAmount) {
          NotificationService.info(_TranslationService["default"].translate("Ceres::Template.checkoutShippingProfilePriceChanged"));
          return true;
        } else if (oldList[index].shippingPrivacyInformation !== newList[index].shippingPrivacyInformation) {
          return true;
        }
      }

      return false;
    },
    isEquals: function isEquals(oldList, newList, fieldToCompare) {
      if (oldList.length !== newList.length) {
        return false;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var oldListItem = _step.value;

          if (newList.findIndex(function (newListItem) {
            return newListItem[fieldToCompare] === oldListItem[fieldToCompare];
          }) === -1) {
            return {
              v: false
            };
          }
        };

        for (var _iterator = oldList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ret = _loop();

          if (_typeof(_ret) === "object") return _ret.v;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return true;
    },
    sortList: function sortList(list, field) {
      list.sort(function (valueA, valueB) {
        if (valueA[field] > valueB[field]) {
          return 1;
        }

        if (valueA[field] < valueB[field]) {
          return -1;
        }

        return 0;
      });
    },
    showModal: function showModal(content) {
      $(this.$refs.checkoutModalContent).html(content);
      $(this.$refs.checkoutModal).modal("show");
    }
  }
});

},{"../../services/UrlService":281,"lodash/isEqual":121,"services/ApiService":275,"services/NotificationService":279,"services/TranslationService":280}],150:[function(require,module,exports){
"use strict";

Vue.component("contact-wish-input", {
  props: {
    template: {
      type: String,
      "default": "#vue-contact-wish-input"
    }
  },
  computed: Vuex.mapState({
    contactWish: function contactWish(state) {
      return state.checkout.contactWish;
    }
  }),
  methods: {
    updateContactWish: function updateContactWish(event) {
      this.$store.commit("setContactWish", event.srcElement.value);
    }
  }
});

},{}],151:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NotificationService = require("services/NotificationService");

Vue.component("payment-provider-select", {
  props: {
    template: {
      type: String,
      "default": "#vue-payment-provider-select"
    },
    paddingClasses: {
      type: String,
      "default": null
    },
    paddingInlineStyles: {
      type: String,
      "default": null
    }
  },
  computed: Vuex.mapState({
    methodOfPaymentList: function methodOfPaymentList(state) {
      return state.checkout.payment.methodOfPaymentList;
    },
    methodOfPaymentId: function methodOfPaymentId(state) {
      return state.checkout.payment.methodOfPaymentId;
    },
    showError: function showError(state) {
      return state.checkout.validation.paymentProvider.showError;
    },
    isBasketLoading: function isBasketLoading(state) {
      return state.basket.isBasketLoading;
    },
    isCheckoutReadonly: function isCheckoutReadonly(state) {
      return state.checkout.readOnly;
    }
  }),

  /**
   * Initialise the event listener
   */
  created: function created() {
    this.$store.commit("setPaymentProviderValidator", this.validate);
  },
  methods: {
    /**
     * Event when changing the payment provider
     */
    onPaymentProviderChange: function onPaymentProviderChange(newMethodOfPayment) {
      var _this = this;

      this.$store.dispatch("selectMethodOfPayment", newMethodOfPayment.id).then(function (data) {
        document.dispatchEvent(new CustomEvent("afterPaymentMethodChanged", {
          detail: _this.methodOfPaymentId
        }));
      }, function (error) {
        console.log("error");
      });
      this.validate();
    },
    validate: function validate() {
      var showError = !(this.methodOfPaymentId > 0);
      this.$store.commit("setPaymentProviderShowError", showError);

      if (showError) {
        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.checkoutCheckPaymentProvider"));
      }
    }
  }
});

},{"services/NotificationService":279,"services/TranslationService":280}],152:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

var _UrlService = require("services/UrlService");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ApiService = require("services/ApiService");

var NotificationService = require("services/NotificationService");

Vue.component("place-order", {
  props: {
    template: {
      type: String,
      "default": "#vue-place-order"
    },
    targetContinue: {
      type: String
    },
    buttonSize: {
      type: [String, null],
      "default": null,
      validator: function validator(value) {
        return ["sm", "lg"].indexOf(value) !== -1;
      }
    },
    paddingClasses: {
      type: String,
      "default": null
    },
    paddingInlineStyles: {
      type: String,
      "default": null
    }
  },
  data: function data() {
    return {
      waiting: false
    };
  },
  computed: _objectSpread({
    buttonClasses: function buttonClasses() {
      var classes = [];

      if ((0, _utils.isDefined)(this.buttonSize)) {
        classes.push("btn-".concat(this.buttonSize));
      }

      if ((0, _utils.isDefined)(this.paddingClasses)) {
        classes.push(this.paddingClasses.split(" "));
      }

      return classes;
    },
    activeNewsletterSubscriptions: function activeNewsletterSubscriptions() {
      var activeNewsletterSubscriptions = [];

      for (var emailFolder in this.newsletterSubscription) {
        var emailFolderValue = this.newsletterSubscription[emailFolder];

        if (emailFolderValue) {
          activeNewsletterSubscriptions.push(emailFolder);
        }
      }

      return activeNewsletterSubscriptions;
    }
  }, Vuex.mapState({
    checkoutValidation: function checkoutValidation(state) {
      return state.checkout.validation;
    },
    contactWish: function contactWish(state) {
      return state.checkout.contactWish;
    },
    isBasketLoading: function isBasketLoading(state) {
      return state.basket.isBasketLoading;
    },
    basketItemQuantity: function basketItemQuantity(state) {
      return state.basket.data.itemQuantity;
    },
    isBasketInitiallyLoaded: function isBasketInitiallyLoaded(state) {
      return state.basket.isBasketInitiallyLoaded;
    },
    shippingPrivacyHintAccepted: function shippingPrivacyHintAccepted(state) {
      return state.checkout.shippingPrivacyHintAccepted;
    },
    newsletterSubscription: function newsletterSubscription(state) {
      return state.checkout.newsletterSubscription;
    }
  })),
  methods: {
    placeOrder: function placeOrder() {
      var _this = this;

      this.waiting = true;
      var url = "/rest/io/order/additional_information";
      var params = {
        orderContactWish: this.contactWish,
        shippingPrivacyHintAccepted: this.shippingPrivacyHintAccepted,
        newsletterSubscriptions: this.activeNewsletterSubscriptions
      };
      var options = {
        supressNotifications: true
      };
      ApiService.post(url, params, options).always(function () {
        _this.preparePayment();
      });
    },
    preparePayment: function preparePayment() {
      var _this2 = this;

      this.waiting = true;

      if (this.validateCheckout() && this.basketItemQuantity > 0) {
        ApiService.post("/rest/io/checkout/payment").done(function (response) {
          _this2.afterPreparePayment(response);
        }).fail(function (error) {
          _this2.waiting = false;
        });
      } else {
        this.waiting = false;
      }
    },
    validateCheckout: function validateCheckout() {
      var isValid = true;

      for (var index in this.checkoutValidation) {
        if (this.checkoutValidation[index].validate) {
          this.checkoutValidation[index].validate();

          if (this.checkoutValidation[index].showError) {
            isValid = !this.checkoutValidation[index].showError;
          }
        }
      }

      return isValid;
    },
    afterPreparePayment: function afterPreparePayment(response) {
      var paymentType = response.type || "errorCode";
      var paymentValue = response.value || "";

      switch (paymentType) {
        case "continue":
          var target = this.targetContinue;

          if (target) {
            (0, _UrlService.navigateTo)(target);
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
          this.waiting = false;
          break;

        default:
          NotificationService.error("Unknown response from payment provider: " + paymentType);
          this.waiting = false;
          break;
      }
    },
    showModal: function showModal(content, isExternalContent) {
      if (isExternalContent) {
        this.$emit("payment-response", "<iframe src=\"" + content + "\">");
      } else {
        this.$emit("payment-response", content);
      }
    }
  }
});

},{"../../helper/utils":271,"services/ApiService":275,"services/NotificationService":279,"services/UrlService":281}],153:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NotificationService = require("services/NotificationService");

Vue.component("shipping-privacy-hint-check", {
  props: {
    template: {
      type: String,
      "default": "#vue-shipping-privacy-hint-check"
    }
  },
  computed: _objectSpread({
    currentShippingProfile: function currentShippingProfile() {
      var _this = this;

      return this.shippingProfileList.find(function (profile) {
        return profile.parcelServicePresetId === _this.shippingProfileId;
      });
    },
    currentPrivacyHints: function currentPrivacyHints() {
      if (this.currentShippingProfile && this.currentShippingProfile.shippingPrivacyInformation) {
        return this.currentShippingProfile.shippingPrivacyInformation.filter(function (entry) {
          return !!entry.showDataPrivacyAgreementHint;
        });
      }

      return [];
    },
    privacyHintContent: function privacyHintContent() {
      var andTranslation = _TranslationService["default"].translate("Ceres::Template.checkoutShippingPrivacyHintAnd");

      var parcelServiceInformation = "";
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.currentPrivacyHints[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var hint = _step.value;

          if (parcelServiceInformation !== "") {
            parcelServiceInformation += " ".concat(andTranslation, " ");
          }

          parcelServiceInformation += "<strong>".concat(hint.parcelServiceName, ", ").concat(hint.parcelServiceAddress, "</strong>");
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _TranslationService["default"].translate("Ceres::Template.checkoutShippingPrivacyHint", {
        parcelServiceInformation: parcelServiceInformation
      });
    }
  }, Vuex.mapState({
    shippingProfileList: function shippingProfileList(state) {
      return state.checkout.shipping.shippingProfileList;
    },
    shippingProfileId: function shippingProfileId(state) {
      return state.checkout.shipping.shippingProfileId;
    },
    shippingPrivacyHintAccepted: function shippingPrivacyHintAccepted(state) {
      return state.checkout.shippingPrivacyHintAccepted;
    }
  })),
  methods: {
    setValue: function setValue(value) {
      this.$store.commit("setShippingPrivacyHintAccepted", value);
    }
  },
  watch: {
    currentShippingProfile: function currentShippingProfile(value, oldValue) {
      if (this.shippingPrivacyHintAccepted && value.parcelServiceId !== oldValue.parcelServiceId) {
        this.setValue(false);
        $(this.$refs.formCheck).fadeTo(100, 0.1).fadeTo(400, 1.0);
        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.checkoutShippingPrivacyReseted"));
      } else if (!value.shippingPrivacyInformation[0].showDataPrivacyAgreementHint) {
        this.setValue(false);
      }
    }
  }
});

},{"services/NotificationService":279,"services/TranslationService":280}],154:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NotificationService = require("services/NotificationService");

Vue.component("shipping-profile-select", {
  props: {
    template: {
      type: String,
      "default": "#vue-shipping-profile-select"
    },
    paddingClasses: {
      type: String,
      "default": null
    },
    paddingInlineStyles: {
      type: String,
      "default": null
    }
  },
  computed: Vuex.mapState({
    shippingProfileList: function shippingProfileList(state) {
      return state.checkout.shipping.shippingProfileList;
    },
    maxDeliveryDays: function maxDeliveryDays(state) {
      return state.checkout.shipping.maxDeliveryDays;
    },
    shippingProfileId: function shippingProfileId(state) {
      return state.checkout.shipping.shippingProfileId;
    },
    showError: function showError(state) {
      return state.checkout.validation.shippingProfile.showError;
    },
    isBasketLoading: function isBasketLoading(state) {
      return state.basket.isBasketLoading;
    },
    isCheckoutReadonly: function isCheckoutReadonly(state) {
      return state.checkout.readOnly;
    }
  }),

  /**
   * Add a shipping provider
   * Initialise the event listener
   */
  created: function created() {
    this.$store.commit("setShippingProfileValidator", this.validate);
  },
  methods: {
    /**
     * Method on shipping profile changed
     */
    onShippingProfileChange: function onShippingProfileChange(shippingProfileId) {
      var _this = this;

      this.$store.dispatch("selectShippingProfile", this.shippingProfileList.find(function (shippingProfile) {
        return shippingProfile.parcelServicePresetId === shippingProfileId;
      })).then(function (data) {
        document.dispatchEvent(new CustomEvent("afterShippingProfileChanged", {
          detail: _this.shippingProfileId
        }));
      }, function (error) {
        console.log("error");
      });
      this.validate();
    },
    validate: function validate() {
      var showError = this.shippingProfileId <= 0 || this.shippingProfileList.length <= 0;
      this.$store.commit("setShippingProfileShowError", showError);

      if (showError) {
        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.checkoutCheckShippingProfile"));
      }
    }
  }
});

},{"services/NotificationService":279,"services/TranslationService":280}],155:[function(require,module,exports){
"use strict";

var _NotificationService = _interopRequireDefault(require("services/NotificationService"));

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.component("subscribe-newsletter-check", {
  props: {
    template: {
      type: String,
      "default": "#vue-subscribe-newsletter-check"
    },
    emailFolder: {
      type: Number,
      "default": 0
    },
    hideCheckbox: {
      type: Boolean
    },
    isPreselected: {
      type: Boolean
    },
    isRequired: {
      type: Boolean,
      "default": true
    },
    customText: {
      type: String,
      "default": ""
    }
  },
  computed: Vuex.mapState({
    newsletterSubscription: function newsletterSubscription(state) {
      return state.checkout.newsletterSubscription[this.emailFolder];
    },
    showError: function showError(state) {
      if (state.checkout.validation["subscribeNewsletter_".concat(this.emailFolder)]) {
        return state.checkout.validation["subscribeNewsletter_".concat(this.emailFolder)].showError;
      }

      return null;
    }
  }),
  created: function created() {
    if (this.isPreselected || this.hideCheckbox) {
      this.setValue(true);
    }

    if (this.isRequired) {
      this.$store.commit("addSubscribeNewsletterValidate", {
        emailFolder: this.emailFolder,
        validator: this.validate
      });
    }
  },
  methods: {
    setValue: function setValue(value) {
      this.$store.commit("setSubscribeNewsletterCheck", {
        emailFolder: this.emailFolder,
        value: value
      });
    },
    validate: function validate() {
      var showError = this.isRequired && !this.newsletterSubscription;
      this.$store.commit("setSubscribeNewsletterShowErr", {
        emailFolder: this.emailFolder,
        showError: showError
      });

      if (showError) {
        _NotificationService["default"].error(_TranslationService["default"].translate("Ceres::Template.checkoutCheckAcceptNewsletterSubscription"));
      }
    }
  },
  watch: {
    newsletterSubscription: function newsletterSubscription() {
      if (this.showError) {
        this.validate();
      }
    }
  }
});

},{"services/NotificationService":279,"services/TranslationService":280}],156:[function(require,module,exports){
"use strict";

Vue.component("tab-item", {
  render: function render(createElement) {
    return createElement("div", {
      staticClass: "tab-pane",
      "class": {
        active: this.localActive
      },
      attrs: {
        role: "tabpanel"
      }
    }, [this.$slots["default"]]);
  },
  props: {
    active: {
      type: Boolean,
      "default": false
    },
    title: {
      type: String,
      "default": null
    },
    dataBuilderClickable: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      localActive: this.active
    };
  },
  methods: {
    setActive: function setActive(isActive) {
      this.localActive = isActive;
    }
  }
});

},{}],157:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

var TabNavItem = {
  name: "tab-nav-item",
  render: function render(createElement) {
    var _this = this;

    var anchorAttrs = {
      role: "tab",
      href: ""
    };

    if (this.tab.dataBuilderClickable) {
      anchorAttrs["data-builder-clickable"] = "";
    }

    var anchor = createElement("a", {
      staticClass: "nav-link text-appearance",
      "class": {
        active: this.tab.localActive
      },
      attrs: anchorAttrs,
      on: {
        click: function click(evt) {
          evt.preventDefault();

          _this.$emit("click", evt);
        }
      }
    }, [this.tab.$slots.title || this.tab.title]);
    return createElement("li", {
      staticClass: "nav-item"
    }, [anchor]);
  },
  props: {
    tab: {
      type: Object,
      "default": null
    },
    tabIndex: {
      type: Number,
      "default": null
    }
  }
};
Vue.component("tab-list", {
  render: function render(createElement) {
    var _this2 = this;

    var navElements = this.tabs.map(function (tab, index) {
      return createElement(TabNavItem, {
        props: {
          tab: tab,
          tabIndex: index
        },
        on: {
          click: function click(evt) {
            if (!tab.localActive) {
              _this2.activateTab(tab, evt);
            }
          }
        }
      });
    });
    var nav = createElement("ul", {
      staticClass: "nav nav-tabs",
      "class": ["widget-" + this.appearance],
      attrs: {
        role: "tablist"
      }
    }, [navElements]);
    var content = createElement("div", {
      staticClass: "tab-content"
    }, [this.$slots["default"]]);
    return createElement("div", {}, [nav, content]);
  },
  props: {
    appearance: {
      type: String,
      "default": "none"
    }
  },
  data: function data() {
    return {
      tabs: []
    };
  },
  created: function created() {
    var _this3 = this;

    this.$nextTick(function () {
      _this3.updateTabs();
    });
  },
  methods: {
    getTabs: function getTabs() {
      var tabs = this.$slots["default"] || [];
      var tabComps = tabs.map(function (vnode) {
        return vnode.componentInstance;
      });
      return tabComps.filter(function (tab) {
        return (0, _utils.isDefined)(tab) && (0, _utils.isDefined)(tab.$slots["default"]);
      });
    },
    updateTabs: function updateTabs() {
      this.tabs = this.getTabs();
    },
    activateTab: function activateTab(tab, event) {
      var activeTab = this.tabs.find(function (tab) {
        return tab.localActive;
      });
      tab.setActive(true);

      if (tab !== activeTab) {
        activeTab.setActive(false);
      }
    }
  }
});

},{"../../helper/utils":271}],158:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

Vue.component("last-seen-item-list", {
  props: {
    template: {
      type: String,
      "default": "#vue-last-seen-item-list"
    },
    itemsPerPage: {
      type: Number,
      "default": 4
    },
    maxItems: {
      type: Number,
      "default": 4
    },
    paddingClasses: {
      type: String,
      "default": null
    },
    paddingInlineStyles: {
      type: String,
      "default": null
    }
  },
  computed: Vuex.mapState({
    items: function items(state) {
      return state.lastSeen.lastSeenItems.slice(0, this.maxItems);
    },
    containers: function containers(state) {
      return state.lastSeen.containers;
    }
  }),
  beforeMount: function beforeMount() {
    this.$store.dispatch("getLastSeenItems");
  },
  methods: {
    getContainerContentById: function getContainerContentById(variationId, containerKey) {
      var containersById = this.containers[variationId];

      if ((0, _utils.isDefined)(containersById)) {
        var container = containersById[containerKey];

        if ((0, _utils.isDefined)(container)) {
          return container;
        }
      }

      return "";
    }
  }
});

},{"../../helper/utils":271}],159:[function(require,module,exports){
"use strict";

Vue.component("accept-privacy-policy-check", {
  props: {
    template: {
      type: String,
      "default": "#vue-accept-privacy-policy-check"
    },
    value: {
      type: Boolean
    },
    showError: {
      type: Boolean
    }
  },
  methods: {
    onValueChanged: function onValueChanged(value) {
      this.$emit("input", value);
    }
  }
});

},{}],160:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("address-input-group", {
  delimiters: ["${", "}"],
  props: {
    defaultCountry: {
      type: String,
      "default": "DE"
    },
    addressType: String,
    modalType: String,
    template: String,
    value: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    optionalAddressFields: {
      type: Object,
      "default": function _default() {
        return {
          de: [],
          uk: []
        };
      }
    },
    requiredAddressFields: {
      type: Object,
      "default": function _default() {
        return {
          de: [],
          uk: []
        };
      }
    },
    defaultSalutation: {
      type: String,
      "default": "male"
    }
  },
  computed: _objectSpread({
    isPickupStation: function isPickupStation() {
      return this.value && this.value.address1 === "PACKSTATION" && this.isParcelBoxAvailable;
    },
    isPostOffice: function isPostOffice() {
      return this.value && this.value.address1 === "POSTFILIALE" && this.isPostOfficeAvailable;
    },
    isParcelOrOfficeAvailable: function isParcelOrOfficeAvailable() {
      return (this.isParcelBoxAvailable || this.isPostOfficeAvailable) && this.selectedCountry && this.selectedCountry.isoCode2 === "DE" && this.addressType === "2";
    }
  }, Vuex.mapState({
    isParcelBoxAvailable: function isParcelBoxAvailable(state) {
      return state.checkout.shipping.isParcelBoxAvailable;
    },
    isPostOfficeAvailable: function isPostOfficeAvailable(state) {
      return state.checkout.shipping.isPostOfficeAvailable;
    }
  })),
  data: function data() {
    return {
      stateList: [],
      countryLocaleList: ["DE", "GB"],
      localeToShow: this.defaultCountry,
      selectedCountry: null
    };
  },
  methods: {
    /**
     * Update the address input group to show.
     * @param shippingCountry
     */
    onSelectedCountryChanged: function onSelectedCountryChanged(shippingCountry) {
      this.selectedCountry = shippingCountry;

      if (this.countryLocaleList.indexOf(shippingCountry.isoCode2) >= 0) {
        this.localeToShow = shippingCountry.isoCode2;
      } else {
        this.localeToShow = this.defaultCountry;
      }

      this.emitInputEvent("countryId", shippingCountry.id);

      if (this.isPickupStation || this.isPostOffice) {
        this.togglePickupStation(false);
      }
    },
    togglePickupStation: function togglePickupStation(showPickupStation) {
      var emitInputs = {
        address1: "",
        address2: "",
        address3: "",
        showPickupStation: showPickupStation
      };

      if (showPickupStation) {
        emitInputs.address1 = this.isParcelBoxAvailable ? "PACKSTATION" : "POSTFILIALE";
      }

      for (var input in emitInputs) {
        this.emitInputEvent(input, emitInputs[input]);
      }
    },

    /**
     * @param {string} field
     * @param {number} value
     */
    emitInputEvent: function emitInputEvent(field, value) {
      this.$emit("input", {
        field: field,
        value: value
      });
    },
    isInOptionalFields: function isInOptionalFields(locale, key) {
      return this.optionalAddressFields[locale].includes(key);
    },
    isInRequiredFields: function isInRequiredFields(locale, key) {
      return this.requiredAddressFields && this.requiredAddressFields[locale] && this.requiredAddressFields[locale].includes(key);
    },
    transformTranslation: function transformTranslation(translationKey, locale, addressKey) {
      var translation = _TranslationService["default"].translate(translationKey);

      var isRequired = this.isInRequiredFields(locale, addressKey);
      return translation + (isRequired ? "*" : "");
    },
    areNameFieldsShown: function areNameFieldsShown(locale, keyPrefix) {
      var isSalutationActive = this.isInOptionalFields(locale, "".concat(keyPrefix, ".salutation"));
      var isContactPersonActive = this.isInOptionalFields(locale, "".concat(keyPrefix, ".contactPerson"));
      var isName1Active = this.isInOptionalFields(locale, "".concat(keyPrefix, ".name1"));
      var isSelectedSalutationCompany = this.value.gender === "company";
      var condition1 = isSalutationActive && isContactPersonActive && isSelectedSalutationCompany;
      var condition2 = !isSalutationActive && isName1Active && isContactPersonActive;
      return !(condition1 || condition2);
    },
    areNameFieldsRequired: function areNameFieldsRequired(locale, keyPrefix) {
      var isSalutationActive = this.isInOptionalFields(locale, "".concat(keyPrefix, ".salutation"));
      var isName1Active = this.isInOptionalFields(locale, "".concat(keyPrefix, ".name1"));
      var isContactPersonRequired = this.isInRequiredFields(locale, "".concat(keyPrefix, ".contactPerson"));
      var isSelectedSalutationCompany = this.value.gender === "company";
      var condition1 = isSalutationActive && !isSelectedSalutationCompany;
      var condition2 = isSalutationActive && isSelectedSalutationCompany && isContactPersonRequired;
      var condition3 = !isSalutationActive && isName1Active && isContactPersonRequired;
      var condition4 = !isSalutationActive && !isName1Active;
      return condition1 || condition2 || condition3 || condition4;
    }
  }
});

},{"services/TranslationService":280}],161:[function(require,module,exports){
"use strict";

Vue.component("address-header", {
  props: {
    template: {
      type: String,
      "default": "#vue-address-header"
    },
    address: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCountryName: function getCountryName(countryId) {
      return this.$store.getters.getCountryName(countryId);
    }
  },
  filters: {
    optionType: function optionType(selectedAddress, typeId) {
      // TODO DUPLICATE (Address Select) - move to vuex
      if (selectedAddress && selectedAddress.options) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = selectedAddress.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var optionType = _step.value;

            if (optionType.typeId === typeId) {
              return optionType.value;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return "";
    }
  }
});

},{}],162:[function(require,module,exports){
"use strict";

var _utils = require("../../../helper/utils");

var _ValidationService = _interopRequireDefault(require("services/ValidationService"));

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ApiService = require("services/ApiService");

var ModalService = require("services/ModalService");

Vue.component("address-select", {
  props: {
    template: {
      type: String,
      "default": "#vue-address-select"
    },
    addressType: {
      type: String,
      required: true
    },
    showError: Boolean,
    optionalAddressFields: {
      type: Object,
      "default": function _default() {
        return {
          de: [],
          gb: []
        };
      }
    },
    requiredAddressFields: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    defaultSalutation: {
      type: String,
      "default": "male"
    },
    paddingClasses: {
      type: String,
      "default": null
    },
    paddingInlineStyles: {
      type: String,
      "default": null
    }
  },
  data: function data() {
    return {
      addressModal: {},
      modalType: "",
      headline: "",
      addressToEdit: {
        gender: this.defaultSalutation,
        countryId: this.shippingCountryId
      },
      addressToDelete: {},
      deleteModal: "",
      deleteModalWaiting: false,
      addressOptionTypeFieldMap: {
        1: "vatNumber",
        4: "telephone",
        6: "postNumber",
        9: "birthday",
        11: "title",
        12: "contactPerson"
      }
    };
  },
  computed: _objectSpread({
    selectedAddress: function selectedAddress() {
      return this.$store.getters.getSelectedAddress(this.addressType);
    },
    addressList: function addressList() {
      return this.$store.getters.getAddressList(this.addressType);
    },
    shippingCountryId: function shippingCountryId() {
      return this.$store.state.localization.shippingCountryId;
    },
    isAddAddressEnabled: function isAddAddressEnabled() {
      if (this.addressType === "1") {
        return this.$store.getters.isLoggedIn || this.addressList.length < 1;
      }

      return this.$store.getters.isLoggedIn || this.addressList.length < 2;
    },
    isAddressListEmpty: function isAddressListEmpty() {
      return !(this.addressList && this.addressList.length > 0);
    },
    isSalutationEnabled: function isSalutationEnabled() {
      var countryId = parseInt(this.addressToEdit.countryId) || 1;
      var addressKey = parseInt(this.addressType) === 1 ? "billing_address" : "delivery_address";
      var countryKey = countryId === 12 ? "gb" : "de";
      return this.optionalAddressFields[countryKey].includes("".concat(addressKey, ".salutation"));
    }
  }, Vuex.mapState({
    countryList: function countryList(state) {
      return state.localization.shippingCountries;
    },
    isBasketLoading: function isBasketLoading(state) {
      return state.basket.isBasketLoading;
    },
    isCheckoutReadonly: function isCheckoutReadonly(state) {
      return state.checkout.readOnly;
    }
  })),

  /**
   *  Check whether the address list is not empty and select the address with the matching ID
   */
  created: function created() {
    this.addEventListener();
  },

  /**
   * Select the address modal
   */
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.addressModal = ModalService.findModal(_this.$refs.addressModal);
      _this.deleteModal = ModalService.findModal(_this.$refs.deleteModal);
    });
  },
  methods: {
    /**
     * Add the event listener
     */
    addEventListener: function addEventListener() {
      var _this2 = this;

      ApiService.listen("AfterAccountContactLogout", function () {
        _this2.$store.commit("resetAddress", _this2.addressType);
      });
    },

    /**
     * Update the selected address
     * @param index
     */
    onAddressChanged: function onAddressChanged(address) {
      this.$emit("address-changed", address);
    },

    /**
     * Show the add modal
     */
    showAddModal: function showAddModal(type) {
      this.modalType = type || "create";

      if (this.isSalutationEnabled) {
        this.addressToEdit = {
          gender: this.defaultSalutation,
          countryId: this.shippingCountryId,
          showPickupStation: false
        };
      } else {
        this.addressToEdit = {
          countryId: this.shippingCountryId
        };
      }

      this.updateHeadline();

      if (this.modalType === "create") {
        _ValidationService["default"].unmarkAllFields($(this.$refs.addressModal));
      }

      this.addressModal.show();
    },

    /**
     * Show the edit modal
     * @param address
     */
    showEditModal: function showEditModal(address) {
      this.modalType = "update";
      this.addressToEdit = this.getAddressToEdit(address);

      if ((0, _utils.isDefined)(this.addressToEdit.address1) && (this.addressToEdit.address1 === "PACKSTATION" || this.addressToEdit.address1 === "POSTFILIALE") && this.$store.getters.isParcelOrOfficeAvailable) {
        this.addressToEdit.showPickupStation = true;
      }

      this.updateHeadline();

      _ValidationService["default"].unmarkAllFields($(this.$refs.addressModal));

      this.addressModal.show();
    },
    getAddressToEdit: function getAddressToEdit(address) {
      // Creates a tmp address to prevent unwanted two-way binding
      var addressToEdit = JSON.parse(JSON.stringify(address));

      if (addressToEdit.options) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = addressToEdit.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var option = _step.value;
            var optionName = this.addressOptionTypeFieldMap[option.typeId];
            addressToEdit[optionName] = option.value || null;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return addressToEdit;
    },

    /**
     * Show the delete modal
     * @param address
     */
    showDeleteModal: function showDeleteModal(address) {
      this.modalType = "delete";
      this.addressToDelete = address;
      this.updateHeadline();
      this.deleteModal.show();
    },

    /**
     * Delete the address selected before
     */
    deleteAddress: function deleteAddress() {
      var _this3 = this;

      this.deleteModalWaiting = true;
      this.$store.dispatch("deleteAddress", {
        address: this.addressToDelete,
        addressType: this.addressType
      }).then(function (response) {
        _this3.closeDeleteModal();

        _this3.deleteModalWaiting = false;
      }, function (error) {
        _this3.deleteModalWaiting = false;
      });
    },

    /**
     * Close the current create/update address modal
     */
    closeAddressModal: function closeAddressModal() {
      this.addressModal.hide();
    },

    /**
     * Close the current delete address modal
     */
    closeDeleteModal: function closeDeleteModal() {
      this.deleteModal.hide();
    },

    /**
     * Dynamically create the header line in the modal
     */
    updateHeadline: function updateHeadline() {
      var headline;

      if (this.modalType === "initial") {
        headline = _TranslationService["default"].translate("Ceres::Template.addressInvoiceAddressInitial");
      } else if (this.addressType === "2") {
        if (this.modalType === "update") {
          headline = _TranslationService["default"].translate("Ceres::Template.addressShippingAddressEdit");
        } else if (this.modalType === "create") {
          headline = _TranslationService["default"].translate("Ceres::Template.addressShippingAddressCreate");
        } else {
          headline = _TranslationService["default"].translate("Ceres::Template.addressShippingAddressDelete");
        }
      } else if (this.modalType === "update") {
        headline = _TranslationService["default"].translate("Ceres::Template.addressInvoiceAddressEdit");
      } else if (this.modalType === "create") {
        headline = _TranslationService["default"].translate("Ceres::Template.addressInvoiceAddressCreate");
      } else {
        headline = _TranslationService["default"].translate("Ceres::Template.addressInvoiceAddressDelete");
      }

      this.headline = headline;
    },

    /**
     * @param countryId
     * @returns string
     */
    getCountryName: function getCountryName(countryId) {
      return this.$store.getters.getCountryName(countryId);
    },
    setAddressToEditField: function setAddressToEditField(_ref) {
      var field = _ref.field,
          value = _ref.value;
      this.addressToEdit[field] = value;
      this.addressToEdit = Object.assign({}, this.addressToEdit);
    },
    onDropdownClicked: function onDropdownClicked(event) {
      if (this.isAddressListEmpty || parseInt(this.addressType) === 2 && this.addressList.length === 1) {
        event.preventDefault();
        event.stopPropagation();
        this.showAddModal();
      }
    }
  },
  filters: {
    optionType: function optionType(selectedAddress, typeId) {
      if (selectedAddress && selectedAddress.options) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = selectedAddress.options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var optionType = _step2.value;

            if (optionType.typeId === typeId) {
              return optionType.value;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      return "";
    }
  },
  watch: {
    isSalutationEnabled: function isSalutationEnabled(newVal) {
      if (!newVal) {
        delete this.addressToEdit.gender;
      }
    }
  }
});

},{"../../../helper/utils":271,"services/ApiService":275,"services/ModalService":278,"services/TranslationService":280,"services/ValidationService":282}],163:[function(require,module,exports){
"use strict";

var _ValidationService = _interopRequireDefault(require("services/ValidationService"));

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NotificationService = require("services/NotificationService");

Vue.component("create-update-address", {
  delimiters: ["${", "}"],
  props: {
    addressData: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    addressModal: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    modalType: String,
    addressType: String,
    template: String,
    optionalAddressFields: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    requiredAddressFields: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    defaultSalutation: {
      type: String,
      "default": "male"
    }
  },
  data: function data() {
    return {
      waiting: false
    };
  },
  computed: {
    addressList: function addressList() {
      this.$store.getters.getAddressList(this.addressType);
    }
  },
  methods: {
    /**
     * Validate the address fields
     */
    validate: function validate() {
      var _this = this;

      _ValidationService["default"].validate(this.$refs.addressForm).done(function () {
        _this.saveAddress();
      }).fail(function (invalidFields) {
        var fieldNames = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = invalidFields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var field = _step.value;
            var fieldName = field.lastElementChild.innerHTML.trim();
            fieldName = fieldName.slice(-1) === "*" ? fieldName.slice(0, fieldName.length - 1) : fieldName;
            fieldNames.push(fieldName);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        _ValidationService["default"].markInvalidFields(invalidFields, "error");

        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.checkoutCheckAddressFormFields", {
          fields: fieldNames.join(", ")
        }));
      });
    },

    /**
     * Save the new address or update an existing one
     */
    saveAddress: function saveAddress() {
      if (this.modalType === "initial" || this.modalType === "create") {
        this.createAddress();
      } else if (this.modalType === "update") {
        this.updateAddress();
      }
    },

    /**
     * Update an address
     */
    updateAddress: function updateAddress() {
      var _this2 = this;

      this.waiting = true;

      this._syncOptionTypesAddressData();

      this.$store.dispatch("updateAddress", {
        address: this.addressData,
        addressType: this.addressType
      }).then(function (resolve) {
        _this2.addressModal.hide();

        _this2.waiting = false;
      }, function (error) {
        _this2.waiting = false;

        if (error.validation_errors) {
          _this2._handleValidationErrors(error.validation_errors);
        } else if (error.error) {
          _this2._handleError(error.error);
        }
      });
    },

    /**
     * Create a new address
     */
    createAddress: function createAddress() {
      var _this3 = this;

      this.waiting = true;

      this._syncOptionTypesAddressData();

      this.$store.dispatch("createAddress", {
        address: this.addressData,
        addressType: this.addressType
      }).then(function (response) {
        _this3.addressModal.hide();

        _this3.waiting = false;
      }, function (error) {
        _this3.waiting = false;

        if (error.validation_errors) {
          _this3._handleValidationErrors(error.validation_errors);
        } else if (error.error) {
          _this3._handleError(error.error);
        }
      });
    },
    _handleValidationErrors: function _handleValidationErrors(validationErrors) {
      _ValidationService["default"].markFailedValidationFields(this.$refs.addressForm, validationErrors);

      var errorMessage = "";

      for (var _i = 0, _Object$values = Object.values(validationErrors); _i < _Object$values.length; _i++) {
        var value = _Object$values[_i];
        errorMessage += value + "<br>";
      }

      NotificationService.error(errorMessage);
    },
    _handleError: function _handleError(error) {
      if (error.code === 11) {
        NotificationService.error({
          code: error.code,
          message: ""
        });
        window.location.reload();
      } else this._handleValidationErrors(error);
    },
    _syncOptionTypesAddressData: function _syncOptionTypesAddressData() {
      if (typeof this.addressData.options !== "undefined") {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.addressData.options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var optionType = _step2.value;

            switch (optionType.typeId) {
              case 1:
                {
                  if (this.addressData.vatNumber && this.addressData.vatNumber !== optionType.value) {
                    optionType.value = this.addressData.vatNumber;
                  }

                  break;
                }

              case 4:
                {
                  if (this.addressData.telephone && this.addressData.telephone !== optionType.value) {
                    optionType.value = this.addressData.telephone;
                  }

                  break;
                }

              case 6:
                {
                  if (this.addressData.postNumber && this.addressData.postNumber !== optionType.value) {
                    optionType.value = this.addressData.postNumber;
                  }

                  break;
                }

              case 9:
                {
                  if (this.addressData.birthday && this.addressData.birthday !== optionType.value) {
                    optionType.value = this.addressData.birthday;
                  }

                  break;
                }

              case 11:
                {
                  if (this.addressData.title && this.addressData.title !== optionType.value) {
                    optionType.value = this.addressData.title;
                  }

                  break;
                }

              case 12:
                {
                  if (this.addressData.contactPerson && this.addressData.contactPerson !== optionType.value) {
                    optionType.value = this.addressData.contactPerson;
                  }

                  break;
                }
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    },
    emitInputEvent: function emitInputEvent(event) {
      this.$emit("input", event);
      this.checkInputEventForUnmarkFields(event);
    },
    checkInputEventForUnmarkFields: function checkInputEventForUnmarkFields(event) {
      var genderCondition = event.field === "gender" && event.field.value !== this.addressData.gender;
      var countryCondition = event.field === "countryId" && event.field.value !== this.addressData.countryId;
      var pickupCondition = event.field === "showPickupStation" && event.field.value !== this.addressData.showPickupStation;

      if (genderCondition || countryCondition || pickupCondition) {
        _ValidationService["default"].unmarkAllFields(this.$refs.addressForm);
      }
    }
  }
});

},{"services/NotificationService":279,"services/TranslationService":280,"services/ValidationService":282}],164:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NotificationService = require("services/NotificationService");

Vue.component("invoice-address-select", {
  delimiters: ["${", "}"],
  template: "\n        <address-select \n            ref=\"invoice\"\n            @address-changed=\"addressChanged\"\n            address-type=\"1\"\n            :show-error=\"showError\"\n            :optional-address-fields=\"optionalAddressFields\"\n            :required-address-fields=\"requiredAddressFields\"\n            :default-salutation=\"defaultSalutation\"\n            :padding-classes=\"paddingClasses\"\n            :padding-inline-styles=\"paddingInlineStyles\">\n        </address-select>\n    ",
  props: {
    optionalAddressFields: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    requiredAddressFields: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    defaultSalutation: {
      type: String,
      "default": "male"
    },
    hasToValidate: {
      type: Boolean,
      "default": false
    },
    paddingClasses: {
      type: String,
      "default": null
    },
    paddingInlineStyles: {
      type: String,
      "default": null
    }
  },
  computed: Vuex.mapState({
    billingAddressId: function billingAddressId(state) {
      return state.address.billingAddressId;
    },
    billingAddressList: function billingAddressList(state) {
      return state.address.billingAddressList;
    },
    showError: function showError(state) {
      return state.checkout.validation.invoiceAddress.showError;
    }
  }),

  /**
   * Initialise the event listener
   */
  created: function created() {
    if (this.hasToValidate) {
      this.$store.commit("setInvoiceAddressValidator", this.validate);
    }
  },

  /**
   * If no address is related to the user, a popup will open to add an address
   */
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (!App.isShopBuilder && App.isCheckoutView && _this.billingAddressList && _this.billingAddressList.length <= 0) {
        _this.$refs.invoice.showAddModal("initial");
      }
    });
  },
  methods: {
    /**
     * Update the invoice address
     * @param selectedAddress
     */
    addressChanged: function addressChanged(selectedAddress) {
      var _this2 = this;

      this.$store.dispatch("selectAddress", {
        selectedAddress: selectedAddress,
        addressType: "1"
      }).then(function (response) {
        document.dispatchEvent(new CustomEvent("afterInvoiceAddressChanged", {
          detail: _this2.billingAddressId
        }));
      }, function (error) {});

      if (this.hasToValidate) {
        this.validate();
      }
    },
    validate: function validate() {
      var showError = this.billingAddressId <= 0;
      this.$store.commit("setInvoiceAddressShowError", showError);

      if (showError) {
        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.checkoutCheckInvoiceAddress"));
      }
    }
  },
  watch: {
    billingAddressId: function billingAddressId() {
      if (this.hasToValidate && this.showError) {
        this.validate();
      }
    }
  }
});

},{"services/NotificationService":279,"services/TranslationService":280}],165:[function(require,module,exports){
"use strict";

Vue.component("shipping-address-select", {
  delimiters: ["${", "}"],
  template: "\n        <address-select\n            ref:shipping-address-select\n            template=\"#vue-address-select\"\n            @address-changed=\"addressChanged\"\n            address-type=\"2\"\n            :optional-address-fields=\"optionalAddressFields\"\n            :required-address-fields=\"requiredAddressFields\"\n            :default-salutation=\"defaultSalutation\"\n            :padding-classes=\"paddingClasses\"\n            :padding-inline-styles=\"paddingInlineStyles\">\n        </address-select>\n    ",
  props: {
    optionalAddressFields: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    requiredAddressFields: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    defaultSalutation: {
      type: String,
      "default": "male"
    },
    paddingClasses: {
      type: String,
      "default": null
    },
    paddingInlineStyles: {
      type: String,
      "default": null
    }
  },
  computed: Vuex.mapState({
    deliveryAddressId: function deliveryAddressId(state) {
      return state.address.deliveryAddressId;
    }
  }),
  methods: {
    /**
     * Update the delivery address
     * @param selectedAddress
     */
    addressChanged: function addressChanged(selectedAddress) {
      var _this = this;

      this.$store.dispatch("selectAddress", {
        selectedAddress: selectedAddress,
        addressType: "2"
      }).then(function (response) {
        document.dispatchEvent(new CustomEvent("afterDeliveryAddressChanged", {
          detail: _this.deliveryAddressId
        }));
      }, function (error) {});
    }
  }
});

},{}],166:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ApiService = require("services/ApiService");

var NotificationService = require("services/NotificationService");

Vue.component("change-email-form", {
  props: {
    template: {
      type: String,
      "default": "#vue-change-email-form"
    },
    contactId: {
      type: Number,
      required: true
    },
    hash: {
      type: String,
      required: true
    },
    newMail: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      password: "",
      isDisabled: false
    };
  },
  methods: {
    /**
     * Send the login data
     */
    submit: function submit() {
      var _this = this;

      this.isDisabled = true;
      ApiService.put("/rest/io/customer/mail/" + this.contactId, {
        password: this.password,
        hash: this.hash
      }).done(function (response) {
        NotificationService.success(_TranslationService["default"].translate("Ceres::Template.myAccountChangeEmailSuccessful"));
        window.location.assign(window.location.origin);
      }).fail(function () {
        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.myAccountChangeEmailFailed")).closeAfter(10000);
      }).always(function () {
        _this.isDisabled = false;
      });
    }
  }
});

},{"services/ApiService":275,"services/NotificationService":279,"services/TranslationService":280}],167:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

var _ValidationService = _interopRequireDefault(require("services/ValidationService"));

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ApiService = require("services/ApiService");

var NotificationService = require("services/NotificationService");

Vue.component("contact-form", {
  props: ["template"],
  data: function data() {
    return {
      name: "",
      userMail: "",
      subject: "",
      message: "",
      orderId: "",
      cc: false,
      waiting: false,
      privacyPolicyAccepted: false,
      privacyPolicyShowError: false,
      enableConfirmingPrivacyPolicy: App.config.contact.enableConfirmingPrivacyPolicy
    };
  },
  created: function created() {
    window.sendMail = this.sendMail;
  },
  methods: {
    validate: function validate(useCapture) {
      var _this = this;

      _ValidationService["default"].validate($("#contact-form")).done(function () {
        if (!_this.enableConfirmingPrivacyPolicy || _this.privacyPolicyAccepted) {
          if (useCapture) {
            window.grecaptcha.execute();
          } else {
            _this.sendMail();
          }
        } else {
          _this.privacyPolicyShowError = true;
          NotificationService.error(_TranslationService["default"].translate("Ceres::Template.contactAcceptFormPrivacyPolicy", {
            hyphen: "&shy;"
          }));
        }
      }).fail(function (invalidFields) {
        _ValidationService["default"].markInvalidFields(invalidFields, "error");

        if (_this.enableConfirmingPrivacyPolicy && !_this.privacyPolicyAccepted) {
          _this.privacyPolicyShowError = true;
          NotificationService.error(_TranslationService["default"].translate("Ceres::Template.contactAcceptFormPrivacyPolicy", {
            hyphen: "&shy;"
          }));
        }

        var invalidFieldNames = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = invalidFields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var invalidField = _step.value;
            var invalidFieldName = invalidField.lastElementChild.innerHTML;
            invalidFieldName = invalidFieldName.slice(-1) === "*" ? invalidFieldName.slice(0, invalidFieldName.length - 1) : invalidFieldName;
            invalidFieldNames.push(invalidFieldName);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.contactCheckFormFields", {
          fields: invalidFieldNames.join(", ")
        }));
      });
    },
    sendMail: function sendMail() {
      var _this2 = this;

      var recaptchaToken = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.waiting = true;
      var mailObj = {
        subject: this.subject,
        name: this.name,
        message: this.message,
        orderId: this.orderId,
        userMail: this.userMail,
        cc: this.cc
      };
      ApiService.post("/rest/io/customer/contact/mail", {
        contactData: mailObj,
        template: "Ceres::Customer.Components.Contact.ContactMail",
        recaptchaToken: recaptchaToken
      }, {
        supressNotifications: true
      }).done(function (response) {
        _this2.waiting = false;

        _this2.clearFields();

        NotificationService.success(_TranslationService["default"].translate("Ceres::Template.contactSendSuccess"));
        document.dispatchEvent(new CustomEvent("onContactFormSend", {
          detail: mailObj
        }));
      }).fail(function (response) {
        _this2.waiting = false;

        if (response.validation_errors) {
          _this2._handleValidationErrors(response.validation_errors);
        } else {
          NotificationService.error(_TranslationService["default"].translate("Ceres::Template.contactSendFail"));
        }
      }).always(function () {
        if (!(0, _utils.isNullOrUndefined)(window.grecaptcha)) {
          window.grecaptcha.reset();
        }
      });
    },
    clearFields: function clearFields() {
      this.name = "";
      this.userMail = "";
      this.subject = "";
      this.message = "";
      this.orderId = "";
      this.cc = false;
      this.privacyPolicyAccepted = false;
    },
    _handleValidationErrors: function _handleValidationErrors(validationErrors) {
      _ValidationService["default"].markFailedValidationFields($("#contact-form"), validationErrors);

      var errorMessage = "";

      for (var _i = 0, _Object$values = Object.values(validationErrors); _i < _Object$values.length; _i++) {
        var value = _Object$values[_i];
        errorMessage += value + "<br>";
      }

      NotificationService.error(errorMessage);
    },
    privacyPolicyValueChanged: function privacyPolicyValueChanged(value) {
      this.privacyPolicyAccepted = value;

      if (value) {
        this.privacyPolicyShowError = false;
      }
    }
  }
});

},{"../../helper/utils":271,"services/ApiService":275,"services/NotificationService":279,"services/TranslationService":280,"services/ValidationService":282}],168:[function(require,module,exports){
"use strict";

Vue.component("contact-map", {
  props: ["mapZoom", "zip", "street", "googleApiKey", "template"],
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (!document.getElementById("maps-api")) {
        _this.addScript("https://maps.googleapis.com/maps/api/js?key=" + _this.googleApiKey);
      }
    });
  },
  methods: {
    initMap: function initMap() {
      var coordinates = {
        lat: -34.397,
        lng: 150.644
      };
      var gMap = new google.maps.Map(document.getElementById("contact-map"), {
        center: coordinates,
        zoom: parseInt(this.mapZoom)
      });
      this.getLatLngByAddress(new google.maps.Geocoder(), gMap);
    },
    getLatLngByAddress: function getLatLngByAddress(geocoder, resultsMap) {
      var addressData = this.zip + " " + this.street;
      geocoder.geocode({
        address: addressData
      }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          resultsMap.setCenter(results[0].geometry.location); // eslint-disable-next-line

          var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
        } else {
          console.log("Not possible to get Ltd and Lng for the given address. State: " + status);
        }
      });
    },
    addScript: function addScript(path) {
      var _this2 = this;

      var head = document.getElementsByTagName("head")[0];
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = path;
      script.id = "contact-map-api";

      if (script.readyState) {
        script.onreadystatechange = function () {
          if (script.readyState === "loaded" || script.readyState === "complete") {
            script.onreadystatechange = null;

            _this2.initMap();
          }
        };
      } else {
        script.onload = function () {
          _this2.initMap();
        };
      }

      head.appendChild(script);
    }
  }
});

},{}],169:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

var _utils = require("../../helper/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("country-select", {
  delimiters: ["${", "}"],
  props: {
    selectedCountryId: Number,
    selectedStateId: Number,
    template: {
      type: String,
      "default": "#vue-country-select"
    },
    addressType: {
      type: String,
      required: true
    },
    optionalAddressFields: {
      type: Object,
      "default": function _default() {}
    },
    requiredAddressFields: {
      type: Object,
      "default": function _default() {}
    }
  },
  jsonDataFields: ["countryList"],
  data: function data() {
    return {
      stateList: [],
      selectedCountry: {}
    };
  },
  computed: _objectSpread({
    addressKeyPrefix: function addressKeyPrefix() {
      return this.addressType === "1" ? "billing_address." : "delivery_address.";
    },
    optionalFields: function optionalFields() {
      var iso = this.selectedCountry.isoCode2.toLowerCase();

      if ((0, _utils.isNullOrUndefined)(this.optionalAddressFields[iso])) {
        return this.optionalAddressFields.de;
      }

      return this.optionalAddressFields[iso];
    },
    requiredFields: function requiredFields() {
      var iso = this.selectedCountry.isoCode2.toLowerCase();

      if ((0, _utils.isNullOrUndefined)(this.requiredAddressFields[iso])) {
        return this.requiredAddressFields.de;
      }

      return this.requiredAddressFields[iso];
    }
  }, Vuex.mapState({
    shippingCountryId: function shippingCountryId(state) {
      return state.localization.shippingCountryId;
    }
  })),

  /**
   * Get the shipping countries
   */
  created: function created() {
    this.countryList.sort(function (first, second) {
      if (first.currLangName < second.currLangName) {
        return -1;
      }

      if (first.currLangName > second.currLangName) {
        return 1;
      }

      return 0;
    });
    this.updateSelectedCountry();
  },
  methods: {
    /**
     * Method to fire when the country has changed
     */
    countryChanged: function countryChanged(value) {
      this.$emit("country-changed", this.getCountryById(parseInt(value)));
      this.$emit("state-changed", null);
    },

    /**
     * @param {*} value
     */
    stateChanged: function stateChanged(value) {
      this.$emit("state-changed", parseInt(value));
    },

    /**
     * @param countryId
     * @returns {*}
     */
    getCountryById: function getCountryById(countryId) {
      return this.countryList.find(function (country) {
        if (country.id === countryId) {
          return country;
        }

        return null;
      });
    },
    updateSelectedCountry: function updateSelectedCountry() {
      var countryId = this.selectedCountryId || this.shippingCountryId;
      this.selectedCountry = this.getCountryById(countryId);

      if (this.selectedCountry) {
        this.stateList = this.selectedCountry.states || [];
      }

      this.countryChanged(countryId);
    },
    isInOptionalFields: function isInOptionalFields(key) {
      return this.optionalFields.includes(this.addressKeyPrefix + key);
    },
    isInRequiredFields: function isInRequiredFields(key) {
      return this.requiredFields.includes(this.addressKeyPrefix + key);
    },
    transformTranslation: function transformTranslation(translationKey, addressKey) {
      var translation = _TranslationService["default"].translate(translationKey);

      var isRequired = this.isInRequiredFields(addressKey);
      return translation + (isRequired ? "*" : "");
    }
  },
  watch: {
    selectedCountryId: function selectedCountryId() {
      this.updateSelectedCountry();
    }
  }
});

},{"../../helper/utils":271,"services/TranslationService":280}],170:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

var _ValidationService = _interopRequireDefault(require("services/ValidationService"));

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

var _UrlService = require("services/UrlService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ApiService = require("services/ApiService");

var NotificationService = require("services/NotificationService");

var ModalService = require("services/ModalService");

Vue.component("registration", {
  delimiters: ["${", "}"],
  props: {
    modalElement: String,
    guestMode: {
      type: Boolean,
      "default": false
    },
    isSimpleRegistration: {
      type: Boolean,
      "default": false
    },
    template: String,
    backlink: String
  },
  data: function data() {
    return {
      password: "",
      passwordRepeat: "",
      username: "",
      billingAddress: {
        countryId: null,
        stateId: null,
        gender: "male"
      },
      isDisabled: false,
      privacyPolicyAccepted: false,
      privacyPolicyShowError: false,
      enableConfirmingPrivacyPolicy: App.config.global.registrationRequirePrivacyPolicyConfirmation
    };
  },
  methods: {
    /**
     * Validate the registration form
     */
    validateRegistration: function validateRegistration() {
      var _this = this;

      _ValidationService["default"].validate($("#registration" + this._uid)).done(function () {
        if (!_this.enableConfirmingPrivacyPolicy || _this.privacyPolicyAccepted) {
          _this.sendRegistration();
        } else {
          _this.privacyPolicyShowError = true;
          NotificationService.error(_TranslationService["default"].translate("Ceres::Template.contactAcceptFormPrivacyPolicy", {
            hyphen: "&shy;"
          }));
        }
      }).fail(function (invalidFields) {
        if (!(0, _utils.isNullOrUndefined)(_this.$refs.passwordHint) && invalidFields.indexOf(_this.$refs.passwordInput) >= 0) {
          _this.$refs.passwordHint.showPopper();
        }

        _ValidationService["default"].markInvalidFields(invalidFields, "error");

        if (_this.enableConfirmingPrivacyPolicy && !_this.privacyPolicyAccepted) {
          _this.privacyPolicyShowError = true;
          NotificationService.error(_TranslationService["default"].translate("Ceres::Template.contactAcceptFormPrivacyPolicy", {
            hyphen: "&shy;"
          }));
        }
      });
    },

    /**
     * Send the registration
     */
    sendRegistration: function sendRegistration() {
      var _this2 = this;

      var userObject = this.getUserObject();
      this.isDisabled = true;
      ApiService.post("/rest/io/customer", userObject).done(function (response) {
        ApiService.setToken(response);
        document.dispatchEvent(new CustomEvent("onSignUpSuccess", {
          detail: userObject
        }));

        if (!response.code) {
          NotificationService.success(_TranslationService["default"].translate("Ceres::Template.regSuccessful")).closeAfter(3000);

          if (document.getElementById(_this2.modalElement) !== null) {
            ModalService.findModal(document.getElementById(_this2.modalElement)).hide();
          }

          if (_this2.backlink !== null && _this2.backlink) {
            (0, _UrlService.navigateTo)(decodeURIComponent(_this2.backlink));
          } else {
            location.reload();
          }
        } else {
          NotificationService.error(_TranslationService["default"].translate("Ceres::Template.regError")).closeAfter(10000);
        }

        _this2.isDisabled = false;
      }).fail(function () {
        _this2.isDisabled = false;
      });
    },
    setAddressDataField: function setAddressDataField(_ref) {
      var field = _ref.field,
          value = _ref.value;
      this.billingAddress[field] = value;
      this.billingAddress = Object.assign({}, this.billingAddress);
    },

    /**
     * Handle the user object which is send to the server
     * @returns {{contact: {referrerId: number, typeId: number, options: {typeId: {typeId: number, subTypeId: number, value: *, priority: number}}}}|{contact: {referrerId: number, typeId: number, password: *, options: {typeId: {typeId: number, subTypeId: number, value: *, priority: number}}}}}
     */
    getUserObject: function getUserObject() {
      var userObject = {
        contact: {
          referrerId: 1,
          typeId: 1,
          options: {
            typeId: {
              typeId: 2,
              subTypeId: 4,
              value: this.username,
              priority: 0
            }
          }
        }
      };

      if (!this.guestMode) {
        userObject.contact.password = this.password;
      }

      if (!this.isSimpleRegistration) {
        userObject.billingAddress = this.billingAddress;
      }

      return userObject;
    },
    privacyPolicyValueChanged: function privacyPolicyValueChanged(value) {
      this.privacyPolicyAccepted = value;

      if (value) {
        this.privacyPolicyShowError = false;
      }
    }
  }
});

},{"../../helper/utils":271,"services/ApiService":275,"services/ModalService":278,"services/NotificationService":279,"services/TranslationService":280,"services/UrlService":281,"services/ValidationService":282}],171:[function(require,module,exports){
"use strict";

var _ValidationService = _interopRequireDefault(require("services/ValidationService"));

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

var _UrlService = require("services/UrlService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ApiService = require("services/ApiService");

var NotificationService = require("services/NotificationService");

Vue.component("reset-password-form", {
  props: ["contactId", "hash", "template"],
  data: function data() {
    return {
      passwordFirst: "",
      passwordSecond: "",
      isDisabled: false
    };
  },
  methods: {
    validatePassword: function validatePassword() {
      var _this = this;

      _ValidationService["default"].validate(this.$refs.resetPasswordForm).done(function () {
        _this.saveNewPassword();
      }).fail(function (invalidFields) {
        _ValidationService["default"].markInvalidFields(invalidFields, "has-error");
      });
    },
    saveNewPassword: function saveNewPassword() {
      var _this2 = this;

      this.isDisabled = true;
      ApiService.post("/rest/io/customer/password", {
        password: this.passwordFirst,
        password2: this.passwordSecond,
        contactId: this.contactId,
        hash: this.hash
      }).done(function () {
        (0, _UrlService.navigateTo)(window.location.origin);
        NotificationService.success(_TranslationService["default"].translate("Ceres::Template.resetPwChangePasswordSuccessful")).closeAfter(3000);
      }).fail(function () {
        _this2.isDisabled = false;
        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.resetPwChangePasswordFailed")).closeAfter(5000);
      });
    }
  }
});

},{"services/ApiService":275,"services/NotificationService":279,"services/TranslationService":280,"services/UrlService":281,"services/ValidationService":282}],172:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.component("salutation-select", {
  props: {
    template: {
      type: String,
      "default": "#vue-salutation-select"
    },
    addressData: {
      type: Object,
      required: true
    },
    addressType: {
      type: [Number, String],
      "default": 1
    },
    enabledAddressFields: {
      type: Object,
      "default": function _default() {
        return [];
      }
    },
    defaultSalutation: {
      type: String,
      "default": "male"
    }
  },
  data: function data() {
    return {
      salutations: [{
        key: "male",
        name: "addressSalutationMale"
      }, {
        key: "female",
        name: "addressSalutationFemale"
      }, {
        key: "diverse",
        name: "addressSalutationDiverse"
      }, {
        key: "company",
        name: "addressSalutationCompany"
      }]
    };
  },
  computed: {
    currentSalutation: function currentSalutation() {
      var countryId = parseInt(this.addressData.countryId) || 1;
      var addressKey = parseInt(this.addressType) === 1 ? "billing_address" : "delivery_address";
      var countryKey = countryId === 12 ? "gb" : "de";
      var salutations = this.salutations.map(function (salutation) {
        return {
          key: salutation.key,
          name: _TranslationService["default"].translate("Ceres::Template." + salutation.name)
        };
      });

      if (this.enabledAddressFields[countryKey].includes("".concat(addressKey, ".name1"))) {
        return salutations;
      }

      return salutations.filter(function (salutation) {
        return salutation.key !== "company";
      });
    }
  },

  /**
   * Get the shipping countries
   */
  created: function created() {
    this.$options.template = this.template;
    var selectedSalutation = this.defaultSalutation;

    if ((0, _utils.isNullOrUndefined)(selectedSalutation)) {
      selectedSalutation = this.currentSalutation[0].key;
    }

    this.emitInputEvent(selectedSalutation);
  },
  methods: {
    emitInputEvent: function emitInputEvent(value) {
      this.$emit("input", {
        field: "gender",
        value: value
      });
      this.$emit("input", {
        field: "name1",
        value: ""
      });
      this.$emit("input", {
        field: "name2",
        value: ""
      });
      this.$emit("input", {
        field: "name3",
        value: ""
      });
      this.$emit("input", {
        field: "vatNumber",
        value: ""
      });
      this.$emit("input", {
        field: "contactPerson",
        value: ""
      });
    },
    checkGenderCompany: function checkGenderCompany(gender) {
      if (gender === "company") {
        return this.addressData.name1 !== null || this.addressData.name1 !== "";
      }

      return true;
    }
  },
  watch: {
    currentSalutation: function currentSalutation(newVal, oldVal) {
      if (newVal !== oldVal) {
        var selectedSalutation = this.addressData.gender; // cleanse the current selected salutation, if it's not longer included in the choice

        if (!newVal.map(function (salutation) {
          return salutation.key;
        }).includes(selectedSalutation)) {
          this.emitInputEvent(newVal[0].key);
        }
      }
    }
  }
});

},{"../../helper/utils":271,"services/TranslationService":280}],173:[function(require,module,exports){
"use strict";

var _ValidationService = _interopRequireDefault(require("services/ValidationService"));

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

var _UrlService = _interopRequireDefault(require("services/UrlService"));

var _utils = require("../../../helper/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ApiService = require("services/ApiService");

var NotificationService = require("services/NotificationService");

var ModalService = require("services/ModalService");

Vue.component("forgot-password-modal", {
  delimiters: ["${", "}"],
  props: {
    template: {
      type: String,
      "default": "#vue-forgot-password-modal"
    }
  },
  data: function data() {
    return {
      password: "",
      username: "",
      isDisabled: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      $(_this.$refs.pwdModal).on("hidden.bs.modal", function () {
        _this.username = "";
      });

      var urlParams = _UrlService["default"].getUrlParams(document.location.search);

      if (!(0, _utils.isNullOrUndefined)(urlParams.show) && urlParams.show === "forgotPassword") {
        ModalService.findModal(_this.$refs.pwdModal).show();
        _this.username = !(0, _utils.isNullOrUndefined)(urlParams.email) ? urlParams.email : "";
      }
    });
  },
  watch: {
    username: function username(val, oldVal) {
      this.resetError();
    }
  },
  methods: {
    validateResetPwd: function validateResetPwd() {
      var _this2 = this;

      _ValidationService["default"].validate(this.$refs.pwdModal).done(function () {
        _this2.sendResetPwd();
      }).fail(function (invalidFields) {
        _ValidationService["default"].markInvalidFields(invalidFields, "error");
      });
    },

    /**
     *  Reset password
     */
    sendResetPwd: function sendResetPwd() {
      var _this3 = this;

      this.isDisabled = true;
      ApiService.post("/rest/io/customer/password_reset", {
        email: this.username
      }).done(function () {
        ModalService.findModal(_this3.$refs.pwdModal).hide();
        _this3.isDisabled = false;
        NotificationService.success(_TranslationService["default"].translate("Ceres::Template.loginSendEmailOk")).closeAfter(5000);
      }).fail(function () {
        _this3.isDisabled = false;
        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.loginResetPwDErrorOnSendEmail")).closeAfter(5000);
      });
    },
    cancelResetPwd: function cancelResetPwd() {
      this.resetError();
      ModalService.findModal(this.$refs.pwdModal).hide().then(function () {
        ModalService.findModal(document.getElementById("login")).show();
      });
    },
    resetError: function resetError() {
      _ValidationService["default"].unmarkAllFields(this.$refs.pwdModal);
    }
  }
});

},{"../../../helper/utils":271,"services/ApiService":275,"services/ModalService":278,"services/NotificationService":279,"services/TranslationService":280,"services/UrlService":281,"services/ValidationService":282}],174:[function(require,module,exports){
"use strict";

var _ValidationService = _interopRequireDefault(require("services/ValidationService"));

var _UrlService = require("services/UrlService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ApiService = require("services/ApiService");

Vue.component("guest-login", {
  delimiters: ["${", "}"],
  props: ["template", "backlink"],
  data: function data() {
    return {
      email: "",
      isDisabled: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      $("#guestLogin").on("hidden.bs.modal", function () {
        _this.email = "";

        _this.resetError();
      });
    });
  },
  methods: {
    validate: function validate() {
      _ValidationService["default"].validate($("#guest-login-form-" + this._uid)).done(function () {
        this.sendEMail();
      }.bind(this)).fail(function (invalidFields) {
        _ValidationService["default"].markInvalidFields(invalidFields, "error");
      });
    },
    sendEMail: function sendEMail() {
      this.isDisabled = true;
      ApiService.post("/rest/io/guest", {
        email: this.email
      }).done(function () {
        if (this.backlink !== null && this.backlink) {
          (0, _UrlService.navigateTo)(decodeURIComponent(this.backlink));
        } else {
          // Go back to Homepage
          (0, _UrlService.navigateTo)(window.location.origin);
        }
      }.bind(this));
    },
    resetError: function resetError() {
      _ValidationService["default"].unmarkAllFields($("#guest-login-form-" + this._uid));
    }
  }
});

},{"services/ApiService":275,"services/UrlService":281,"services/ValidationService":282}],175:[function(require,module,exports){
"use strict";

var _ValidationService = _interopRequireDefault(require("services/ValidationService"));

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ApiService = require("services/ApiService");

var NotificationService = require("services/NotificationService");

var ModalService = require("services/ModalService");

var AutoFocusService = require("services/AutoFocusService");

Vue.component("login", {
  delimiters: ["${", "}"],
  props: ["modalElement", "backlink", "hasToForward", "template"],
  data: function data() {
    return {
      password: "",
      username: "",
      loginFields: [],
      isDisabled: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.loginFields = $(".login-container").find(".input-unit");

      _this.removeLoginModal();

      AutoFocusService.triggerAutoFocus();
    });
  },
  watch: {
    password: function password(val, oldVal) {
      this.resetError();
    },
    username: function username(val, oldVal) {
      this.resetError();
    }
  },
  methods: {
    /**
     * Open the login modal
     */
    showLogin: function showLogin() {
      ModalService.findModal(document.getElementById(this.modalElement)).show();
    },
    validateLogin: function validateLogin() {
      var _this2 = this;

      _ValidationService["default"].validate($("#login-form-" + this._uid)).done(function () {
        _this2.sendLogin();
      }).fail(function (invalidFields) {
        _ValidationService["default"].markInvalidFields(invalidFields, "error");
      });
    },
    removeLoginModal: function removeLoginModal() {
      if (!this.modalElement) {
        var loginModal = document.getElementById("login");
        loginModal.parentNode.removeChild(loginModal);
      }
    },

    /**
     * Send the login data
     */
    sendLogin: function sendLogin() {
      var _this3 = this;

      this.isDisabled = true;
      ApiService.post("/rest/io/customer/login", {
        email: this.username,
        password: this.password
      }, {
        supressNotifications: true
      }).done(function (response) {
        ApiService.setToken(response);
        NotificationService.success(_TranslationService["default"].translate("Ceres::Template.loginSuccessful")).closeAfter(10000);

        if (_this3.backlink !== null && _this3.backlink) {
          location.assign(decodeURIComponent(_this3.backlink));
        } else if (_this3.hasToForward) {
          location.assign(location.origin);
        } else {
          location.reload();
        }
      }).fail(function (response) {
        _this3.isDisabled = false;

        switch (response.error.code) {
          case 401:
            _this3.loginFields.addClass("has-login-error");

            var translationKey = "Ceres::Template.loginFailed";

            if (response.error.message.length > 0 && response.error.message === "user is blocked") {
              translationKey = "Ceres::Template.loginBlocked";
            }

            NotificationService.error(_TranslationService["default"].translate(translationKey)).closeAfter(10000);
            break;

          default:
            return;
        }
      });
    },
    showResetPwdView: function showResetPwdView() {
      this.resetError();

      if (this.modalElement) {
        ModalService.findModal(document.getElementById(this.modalElement)).hide().then(function () {
          ModalService.findModal(document.getElementById("resetPwd")).show();
        });
      } else {
        ModalService.findModal(document.getElementById("resetPwd")).show();
      }
    },
    resetError: function resetError() {
      this.loginFields.removeClass("has-login-error");

      _ValidationService["default"].unmarkAllFields($("#login-form-" + this._uid));
    }
  }
});

},{"services/ApiService":275,"services/AutoFocusService":276,"services/ModalService":278,"services/NotificationService":279,"services/TranslationService":280,"services/ValidationService":282}],176:[function(require,module,exports){
"use strict";

var ModalService = require("services/ModalService");

Vue.component("login-view", {
  delimiters: ["${", "}"],
  props: ["template"],
  methods: {
    openGuestModal: function openGuestModal() {
      ModalService.findModal(document.getElementById("guestLogin")).show();
    }
  }
});

},{"services/ModalService":278}],177:[function(require,module,exports){
"use strict";

var _utils = require("../../../helper/utils");

var _ValidationService = _interopRequireDefault(require("services/ValidationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ApiService = require("services/ApiService");

Vue.component("user-login-handler", {
  delimiters: ["${", "}"],
  props: {
    template: {
      type: String,
      "default": "#vue-user-login-handler"
    },
    showRegistration: {
      type: Boolean,
      "default": true
    }
  },
  computed: Vuex.mapGetters(["username", "isLoggedIn"]),
  created: function created() {
    var _this = this;

    ApiService.get("/rest/io/customer", {}, {
      keepOriginalResponse: true
    }).done(function (response) {
      if ((0, _utils.isDefined)(response.data)) {
        _this.$store.commit("setUserData", response.data);
      }
    });
  },

  /**
   * Add the global event listener for login and logout
   */
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.addEventListeners();
    });
  },
  methods: {
    /**
     * Adds login/logout event listeners
     */
    addEventListeners: function addEventListeners() {
      var _this3 = this;

      ApiService.listen("AfterAccountAuthentication", function (userData) {
        _this3.$store.commit("setUserData", userData.accountContact);
      });
      ApiService.listen("AfterAccountContactLogout", function () {
        _this3.$store.commit("setUserData", null);
      });
    },
    unmarkInputFields: function unmarkInputFields() {
      _ValidationService["default"].unmarkAllFields($("#login"));

      _ValidationService["default"].unmarkAllFields($("#registration"));
    }
  }
});

},{"../../../helper/utils":271,"services/ApiService":275,"services/ValidationService":282}],178:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

var _utils = require("../../helper/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NotificationService = require("services/NotificationService");

Vue.component("add-to-wish-list", {
  props: {
    template: {
      type: String,
      "default": "#vue-add-to-wish-list"
    },
    variationId: Number
  },
  data: function data() {
    return {
      isLoading: false
    };
  },
  computed: _objectSpread({
    isVariationInWishList: function isVariationInWishList() {
      return this.wishListIds.includes(this.currentVariationId);
    },
    currentVariationId: function currentVariationId() {
      return !(0, _utils.isNullOrUndefined)(this.variationId) ? this.variationId : this.currentVariationVariationId;
    }
  }, Vuex.mapState({
    currentVariationVariationId: function currentVariationVariationId(state) {
      var currentVariation = state.item.variation && state.item.variation.documents && state.item.variation.documents[0].data;

      if ((0, _utils.isNullOrUndefined)(currentVariation)) {
        return null;
      }

      return currentVariation && currentVariation.variation && currentVariation.variation.id;
    },
    wishListIds: function wishListIds(state) {
      return state.wishList.wishListIds;
    }
  })),
  methods: {
    switchState: function switchState() {
      if (this.isVariationInWishList) {
        this.removeFromWishList();
      } else {
        this.addToWishList();
      }
    },
    addToWishList: function addToWishList() {
      var _this = this;

      if (!this.isLoading) {
        this.isLoading = true;
        this.$store.dispatch("addToWishList", parseInt(this.currentVariationId)).then(function (response) {
          _this.isLoading = false;
          NotificationService.success(_TranslationService["default"].translate("Ceres::Template.singleItemWishListAdded"));
        }, function (error) {
          _this.isLoading = false;
        });
      }
    },
    removeFromWishList: function removeFromWishList() {
      var _this2 = this;

      if (!this.isLoading) {
        this.isLoading = true;
        this.$store.dispatch("removeWishListItem", {
          id: parseInt(this.currentVariationId)
        }).then(function (response) {
          _this2.isLoading = false;
          NotificationService.success(_TranslationService["default"].translate("Ceres::Template.singleItemWishListRemoved"));
        }, function (error) {
          _this2.isLoading = false;
        });
      }
    },
    changeTooltipText: function changeTooltipText() {
      var tooltipText = _TranslationService["default"].translate("Ceres::Template.".concat(this.isVariationInWishList ? "singleItemWishListRemove" : "singleItemWishListAdd"));

      $(".add-to-wish-list").attr("data-original-title", tooltipText).tooltip("hide").tooltip("setContent");
    }
  },
  watch: {
    isVariationInWishList: function isVariationInWishList() {
      this.changeTooltipText();
    }
  }
});

},{"../../helper/utils":271,"services/NotificationService":279,"services/TranslationService":280}],179:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("graduated-prices", {
  props: {
    template: {
      type: String,
      "default": "#vue-graduated-prices"
    },
    paddingClasses: {
      type: String,
      "default": null
    },
    paddingInlineStyles: {
      type: String,
      "default": null
    }
  },
  computed: _objectSpread({
    graduatedPrices: function graduatedPrices() {
      var prices = this.$store.state.item.variation.documents[0].data.prices.graduatedPrices;
      var minQuantity = this.$store.state.item.variation.documents[0].data.variation.minimumOrderQuantity;
      prices = prices.filter(function (price) {
        return price.minimumOrderQuantity > minQuantity;
      });
      return _toConsumableArray(prices).sort(function (priceA, priceB) {
        return priceA.minimumOrderQuantity - priceB.minimumOrderQuantity;
      });
    },
    activeGraduationIndex: function activeGraduationIndex() {
      var _this = this;

      var prices = this.graduatedPrices.filter(function (price) {
        return _this.variationOrderQuantity >= price.minimumOrderQuantity;
      });

      if (!prices.length) {
        return -1;
      }

      var price = prices.reduce(function (prev, current) {
        return prev.minimumOrderQuantity > current.minimumOrderQuantity ? prev : current;
      });
      return this.graduatedPrices.indexOf(price);
    }
  }, Vuex.mapState({
    variationOrderQuantity: function variationOrderQuantity(state) {
      return state.item.variationOrderQuantity;
    }
  }))
});

},{}],180:[function(require,module,exports){
"use strict";

Vue.component("item-bundle", {
  props: {
    template: {
      type: String,
      "default": "#vue-item-bundle"
    },
    bundleType: String,
    bundleComponents: Array
  },
  data: function data() {
    return {
      bundleSetting: null,
      showItemBundleItems: true
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.$refs.bundleSetting) {
        _this.bundleSetting = _this.$refs.bundleSetting.innerText;
        _this.showItemBundleItems = _this.bundleSetting !== "1" && _this.bundleType === "bundle";
      }
    });
  },
  methods: {
    getBundleInnerText: function getBundleInnerText(item) {
      item.variation.bundleType = null;
      return item;
    }
  }
});

},{}],181:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("item-image-carousel", {
  props: {
    template: {
      type: String,
      "default": "#vue-item-image-carousel"
    },
    maxQuantity: {
      type: Number,
      "default": 10
    },
    imageUrlAccessor: {
      type: String,
      "default": "url"
    },
    showThumbs: {
      type: Boolean,
      "default": true
    },
    showDots: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {
      currentItem: 0
    };
  },
  computed: _objectSpread({
    carouselImages: function carouselImages() {
      return this.orderByPosition(this.$options.filters.itemImages(this.currentVariation.documents[0].data.images, "urlPreview")).slice(0, this.maxQuantity);
    },
    singleImages: function singleImages() {
      return this.orderByPosition(this.$options.filters.itemImages(this.currentVariation.documents[0].data.images, this.imageUrlAccessor)).slice(0, this.maxQuantity);
    }
  }, Vuex.mapState({
    currentVariation: function currentVariation(state) {
      return state.item.variation;
    }
  })),
  watch: {
    currentVariation: {
      handler: function handler(val, oldVal) {
        var _this = this;

        if (val !== oldVal) {
          setTimeout(function () {
            _this.reInitialize();
          }, 1);
        }
      },
      deep: true
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.initCarousel();

      _this2.initThumbCarousel();
    });
  },
  methods: {
    getImageCount: function getImageCount() {
      return this.carouselImages.length > this.maxQuantity ? this.maxQuantity : this.carouselImages.length;
    },
    reInitialize: function reInitialize() {
      var $owl = $(this.$refs.single);
      $owl.trigger("destroy.owl.carousel");
      $owl.html($owl.find(".owl-stage-outer").html()).removeClass("owl-loaded");
      $owl.find(".owl-item").remove();
      var $thumbs = $(this.$refs.thumbs);
      $thumbs.trigger("destroy.owl.carousel");
      $thumbs.html($thumbs.find(".owl-stage-outer").html()).removeClass("owl-loaded");
      $thumbs.find(".owl-item").remove();
      this.initCarousel();
      this.initThumbCarousel();
    },
    initCarousel: function initCarousel() {
      var _this3 = this;

      var imageCount = this.getImageCount();
      $(this.$refs.single).owlCarousel({
        autoHeight: true,
        dots: this.showDots,
        items: 1,
        lazyLoad: true,
        loop: true,
        margin: 10,
        mouseDrag: imageCount > 1,
        nav: imageCount > 1,
        navClass: ["owl-single-item-nav left carousel-control", "owl-single-item-nav right carousel-control"],
        navContainerClass: "",
        navText: ["<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>", "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"],
        smartSpeed: 350,
        onChanged: function onChanged(event) {
          var $thumb = $(_this3.$refs.thumbs);
          $thumb.trigger("to.owl.carousel", [event.page.index, 350]);
        }
      });

      if (!(0, _utils.isNullOrUndefined)(window.lightbox)) {
        window.lightbox.option({
          wrapAround: true
        });

        window.lightbox.imageCountLabel = function (current, total) {
          if ((0, _utils.isNullOrUndefined)(imageCount) || imageCount <= 1) {
            return "";
          }

          current -= (total - imageCount) / 2;

          while (current <= 0) {
            current += imageCount;
          }

          while (current > imageCount) {
            current -= imageCount;
          }

          return _TranslationService["default"].translate("Ceres::Template.singleItemImagePreviewCaption", {
            current: current,
            total: imageCount
          });
        };

        var originalFn = window.lightbox.changeImage;

        window.lightbox.changeImage = function (imageNumber) {
          if (window.lightbox.currentImageIndex === 0 && imageNumber === window.lightbox.album.length - 1) {
            imageNumber--;
          } else if (window.lightbox.currentImageIndex === window.lightbox.album.length - 1 && imageNumber === 0) {
            imageNumber++;
          }

          return originalFn.call(window.lightbox, imageNumber);
        };
      }

      $(this.$refs.single).on("changed.owl.carousel", function (event) {
        _this3.currentItem = event.page.index;
      });
    },
    initThumbCarousel: function initThumbCarousel() {
      $(this.$refs.thumbs).owlCarousel({
        autoHeight: true,
        dots: false,
        items: 5,
        lazyLoad: true,
        loop: false,
        margin: 10,
        mouseDrag: false,
        center: false,
        nav: true,
        navClass: ["owl-single-item-nav left carousel-control", "owl-single-item-nav right carousel-control"],
        navContainerClass: "",
        navText: ["<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>", "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"],
        smartSpeed: 350
      });
    },
    goTo: function goTo(index) {
      var $owl = $(this.$refs.single);
      $owl.trigger("to.owl.carousel", [index, 350]);
    },
    orderByPosition: function orderByPosition(list) {
      return list.sort(function (entryA, entryB) {
        if (entryA.position > entryB.position) {
          return 1;
        }

        if (entryA.position < entryB.position) {
          return -1;
        }

        return 0;
      });
    },
    getAltText: function getAltText(image) {
      var altText = image && image.alternate ? image.alternate : this.$options.filters.itemName(this.currentVariation.documents[0].data);
      return altText;
    },
    getItemName: function getItemName() {
      return this.$options.filters.itemName(this.currentVariation.documents[0].data);
    }
  }
});

},{"../../helper/utils":271,"services/TranslationService":280}],182:[function(require,module,exports){
"use strict";

Vue.component("order-properties", {
  props: ["template"],
  computed: Vuex.mapState({
    properties: function properties(state) {
      return state.item.variation.documents[0].data.properties;
    }
  }),
  methods: Vuex.mapMutations(["setVariationOrderProperty"])
});

},{}],183:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("order-property-list", {
  props: {
    template: {
      type: String,
      "default": "#vue-order-property-list"
    }
  },
  data: function data() {
    return {
      activeSlide: 0,
      touchedSlides: {
        0: true
      }
    };
  },
  computed: _objectSpread({
    sortedGroupedProperties: function sortedGroupedProperties() {
      var groupedProperties = JSON.parse(JSON.stringify(this.variationGroupedProperties));
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = groupedProperties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var group = _step.value;
          this.sortGroupProperties(group);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this.getSortedGroups(groupedProperties);
    },
    missingPropertyGroupIds: function missingPropertyGroupIds() {
      if (this.variationMarkInvalidProperties) {
        return _toConsumableArray(new Set(this.variationMissingProperties.map(function (property) {
          return property.group && property.group.id;
        })));
      }

      return [];
    }
  }, Vuex.mapState({
    variationMarkInvalidProperties: function variationMarkInvalidProperties(state) {
      return state.item.variationMarkInvalidProperties;
    }
  }), Vuex.mapGetters(["variationGroupedProperties", "variationMissingProperties"])),
  methods: {
    sortGroupProperties: function sortGroupProperties(group) {
      return group.properties.sort(function (prev, current) {
        if (prev.position > current.position) {
          return 1;
        }

        if (prev.position < current.position) {
          return -1;
        }

        return 0;
      });
    },
    getSortedGroups: function getSortedGroups(groups) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = groups[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var group = _step2.value;
          var lowestPosition = group.properties.reduce(function (prev, current) {
            return prev.position < current.position ? prev : current;
          });
          group.lowestPosition = lowestPosition.position;
          var groupId = group.group ? group.group.id : null;

          if (this.variationMarkInvalidProperties && this.missingPropertyGroupIds.includes(groupId)) {
            group.hasError = true;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return groups.sort(function (prev, current) {
        if (prev.lowestPosition > current.lowestPosition) {
          return 1;
        }

        if (prev.lowestPosition < current.lowestPosition) {
          return -1;
        }

        return 0;
      });
    },
    slideTo: function slideTo(position) {
      if (position >= 0 && position < this.sortedGroupedProperties.length) {
        this.activeSlide = position;
        this.touchedSlides[this.activeSlide] = true;
      }
    }
  }
});

},{}],184:[function(require,module,exports){
"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("order-property-list-group", {
  props: {
    template: {
      type: String,
      "default": "#vue-order-property-list-group"
    },
    propertyGroup: Object
  },
  computed: {
    isShownOnItemPageCount: function isShownOnItemPageCount() {
      var properties = this.propertyGroup.properties.filter(function (property) {
        return property.isShownOnItemPage;
      });
      return properties.length;
    }
  },
  methods: _objectSpread({
    unsetDeselectedRadios: function unsetDeselectedRadios(propertyId) {
      var _this = this;

      var propertiesToUnselect = this.propertyGroup.properties.filter(function (property) {
        return property.id !== propertyId && _this.isPropertyTypeRadio(property);
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = propertiesToUnselect[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var property = _step.value;
          this.setVariationOrderProperty({
            propertyId: property.id,
            value: null
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    },
    isPropertyTypeRadio: function isPropertyTypeRadio(property) {
      var orderPropertyGroupingType = this.propertyGroup.group ? this.propertyGroup.group.orderPropertyGroupingType : null;
      var valueType = property.valueType;

      if (valueType === "empty" && orderPropertyGroupingType === "single") {
        return true;
      }

      return false;
    }
  }, Vuex.mapMutations(["setVariationOrderProperty"]))
});

},{}],185:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ApiService = require("services/ApiService");

var NotificationService = require("services/NotificationService");

Vue.component("order-property-list-item", {
  props: {
    template: {
      type: String,
      "default": "#vue-order-property-list-item"
    },
    group: Object,
    property: Object
  },
  data: function data() {
    return {
      inputValue: "",
      selectedFile: null,
      waiting: false,
      selectionValue: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    document.addEventListener("onVariationChanged", function () {
      if (_this.property.valueType !== "file") {
        _this.inputValue = "";
      } else {
        _this.clearSelectedFile();
      }

      _this.setVariationOrderProperty({
        propertyId: _this.property.id,
        value: null
      });
    });
  },
  computed: _objectSpread({
    inputType: function inputType() {
      var orderPropertyGroupingType = this.group ? this.group.orderPropertyGroupingType : null;
      var valueType = this.property.valueType;

      if (valueType === "empty") {
        if (!orderPropertyGroupingType || orderPropertyGroupingType === "none" || orderPropertyGroupingType === "multi") {
          return "checkbox";
        }

        return "radio";
      }

      return valueType;
    },
    selectedFileName: function selectedFileName() {
      if (this.selectedFile) {
        return this.selectedFile.name;
      }

      return "";
    },
    hasError: function hasError() {
      var _this2 = this;

      if (this.variationMarkInvalidProperties && this.inputType === "radio") {
        return this.variationMissingProperties.find(function (property) {
          return property.property.id === _this2.property.id;
        });
      }

      return this.variationMarkInvalidProperties && !this.property.value;
    },
    surcharge: function surcharge() {
      return this.property.itemSurcharge || this.property.surcharge;
    },
    selectedDescription: function selectedDescription() {
      if (this.inputType !== "selection" || (0, _utils.isNullOrUndefined)(this.selectionValue)) {
        return null;
      }

      var selectedProperty = this.property.selectionValues[this.selectionValue];
      return selectedProperty.description;
    }
  }, Vuex.mapState({
    isBasketLoading: function isBasketLoading(state) {
      return state.basket.isBasketLoading;
    },
    variationMarkInvalidProperties: function variationMarkInvalidProperties(state) {
      return state.item.variationMarkInvalidProperties;
    }
  }), Vuex.mapGetters(["variationMissingProperties"])),
  methods: _objectSpread({
    onInputValueChanged: function onInputValueChanged(value) {
      if (this.inputType === "int") {
        value = this.validateInt(value);
      } else if (this.inputType === "float") {
        value = this.validateFloat(value);
      } else if (this.inputType === "checkbox") {
        if (!value) {
          value = null;
        }
      } else if (this.inputType === "radio") {
        this.$emit("radio-change", this.property.id);
      } else if (this.inputType === "selection") {
        if ((0, _utils.isNullOrUndefined)(value) || value.length <= 0) {
          value = null;
        }
      }

      this.setVariationOrderProperty({
        propertyId: this.property.id,
        value: value
      });
    },
    validateInt: function validateInt(value) {
      value = parseInt(value);

      if (isNaN(value)) {
        value = null;
      }

      this.inputValue = value;
      return value;
    },
    validateFloat: function validateFloat(value) {
      var lastChar = value.slice(-1);
      value = parseFloat(value.replace(App.decimalSeparator, "."));

      if (isNaN(value)) {
        value = null;
      } else {
        if (lastChar === "." || lastChar === App.decimalSeparator) {
          value += lastChar;
        }

        value = value.toString().replace(".", App.decimalSeparator);
      }

      this.inputValue = value;
      return value;
    }
  }, Vuex.mapMutations(["setVariationOrderProperty", "setIsBasketLoading"]), {
    setPropertyFile: function setPropertyFile(event) {
      if (event.target && event.target.files && event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
        this.uploadPropertyFile(this.selectedFile);
      }
    },
    uploadPropertyFile: function uploadPropertyFile(file) {
      var _this3 = this;

      this.setIsBasketLoading(true);
      this.waiting = true;
      var fileData = new FormData();
      fileData.append("fileData", file);
      ApiService.post("/rest/io/order/property/file", fileData, {
        processData: false,
        contentType: false,
        cache: false,
        async: true,
        timeout: 60000,
        supressNotifications: true
      }).done(function (response) {
        _this3.setVariationOrderProperty({
          propertyId: _this3.property.id,
          value: response
        });
      }).fail(function (error) {
        _this3.clearSelectedFile();

        _this3._handleValidationErrors(error);
      }).always(function (response) {
        _this3.setIsBasketLoading(false);

        _this3.waiting = false;
      });
    },
    clearSelectedFile: function clearSelectedFile() {
      this.selectedFile = null;
      this.setVariationOrderProperty({
        propertyId: this.property.id,
        value: null
      });
      this.$refs.fileInput.value = "";
    },
    _handleValidationErrors: function _handleValidationErrors(error) {
      if (error.hasOwnProperty("validation_errors")) {
        for (var _i = 0, _Object$values = Object.values(error.validation_errors); _i < _Object$values.length; _i++) {
          var err = _Object$values[_i];
          NotificationService.error(err[0]);
        }
      }
    }
  })
});

},{"../../helper/utils":271,"services/ApiService":275,"services/NotificationService":279}],186:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("order-property-value", {
  props: {
    template: {
      type: String,
      "default": "#vue-order-property-value"
    },
    property: {
      type: Object,
      required: true
    }
  },
  computed: _objectSpread({
    valueLabel: function valueLabel() {
      if (this.property.type === "selection") {
        var propertyId = parseInt(this.property.propertyId);
        var basketItemId = parseInt(this.property.basketItemId);
        var basketItem = this.basketItems.find(function (basketItem) {
          return basketItem.id === basketItemId;
        });

        if ((0, _utils.isDefined)(basketItem)) {
          var properties = basketItem.variation.data.properties;
          var property = properties.find(function (property) {
            return property.property.id === propertyId;
          });

          if ((0, _utils.isDefined)(property)) {
            return property.property.selectionValues[this.property.value].name;
          }
        }
      } // exclude properties of type 'none' (checkboxes)
      else if ((0, _utils.isDefined)(this.property.type) && this.property.type.length) {
          return this.property.value;
        }

      return null;
    }
  }, Vuex.mapState({
    basketItems: function basketItems(state) {
      return state.basket.items;
    }
  }))
});

},{"../../helper/utils":271}],187:[function(require,module,exports){
"use strict";

var _number = require("../../helper/number");

var _utils = require("../../helper/utils");

var _TranslationService = _interopRequireDefault(require("../../services/TranslationService"));

var _debounce = require("../../helper/debounce");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("quantity-input", {
  delimiters: ["${", "}"],
  props: {
    value: {
      type: Number,
      required: true
    },
    timeout: {
      type: Number,
      required: false,
      "default": 500
    },
    min: {
      type: Number,
      required: false,
      "default": 0
    },
    max: {
      type: Number,
      required: false
    },
    interval: {
      type: Number,
      required: false,
      "default": 1
    },
    template: {
      type: String,
      required: true
    },
    waiting: {
      type: Boolean,
      required: false
    },
    variationId: {
      type: Number,
      required: false
    }
  },
  data: function data() {
    return {
      compValue: this.value,
      compMin: this.min,
      compMax: this.max,
      compInterval: this.interval,
      compDecimals: 0,
      onValueChanged: null
    };
  },
  created: function created() {
    var _this = this;

    this.compInterval = (0, _utils.defaultValue)(this.compInterval, 1);
    this.compInterval = this.compInterval === 0 ? 1 : this.compInterval;
    this.compDecimals = (0, _number.floatLength)(this.compInterval);
    this.onValueChanged = (0, _debounce.debounce)(function () {
      _this.$emit("quantity-change", _this.compValue);
    }, (0, _utils.defaultValue)(this.timeout, 500));

    if (!(0, _utils.isNullOrUndefined)(this.variationId)) {
      this.fetchQuantityFromBasket();
    }
  },
  computed: _objectSpread({
    variationBasketQuantity: function variationBasketQuantity() {
      var _this2 = this;

      if ((0, _utils.isNullOrUndefined)(this.variationId)) {
        return 0;
      }

      var basketObject = this.$store.state.basket.items.find(function (variations) {
        return variations.variationId === _this2.variationId;
      });
      return basketObject ? basketObject.quantity : 0;
    },
    isMinimum: function isMinimum() {
      return (0, _utils.isDefined)(this.compMin) && this.compValue - this.compInterval < this.compMin;
    },
    isMaximum: function isMaximum() {
      return (0, _utils.isDefined)(this.compMax) && this.compValue + this.compInterval > this.compMax;
    },
    minimumHint: function minimumHint() {
      return _TranslationService["default"].translate("Ceres::Template.singleItemQuantityMin", {
        min: this.min
      });
    },
    maximumHint: function maximumHint() {
      return _TranslationService["default"].translate("Ceres::Template.singleItemQuantityMax", {
        max: this.max
      });
    },
    displayValue: function displayValue() {
      return this.$options.filters.numberFormat(this.compValue);
    }
  }, Vuex.mapState({
    basketItems: function basketItems(state) {
      return state.basket.items;
    }
  })),
  watch: {
    basketItems: {
      handler: function handler(newValue, oldValue) {
        if ((0, _utils.isDefined)(this.variationId) && (0, _utils.isDefined)(oldValue) && JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          this.fetchQuantityFromBasket();
        }
      },
      deep: true
    },
    min: function min(newValue) {
      this.compMin = newValue;
      this.fetchQuantityFromBasket();
    },
    max: function max(newValue) {
      this.compMax = newValue;
      this.fetchQuantityFromBasket();
    },
    value: function value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.setValue(newValue);
      }
    }
  },
  methods: {
    increaseValue: function increaseValue() {
      var newValue = (0, _number.formatFloat)(this.compValue + this.compInterval, this.compDecimals);

      if (((0, _utils.isNullOrUndefined)(this.compMax) || newValue <= this.compMax) && !this.waiting) {
        this.setValue(newValue);
      }
    },
    decreaseValue: function decreaseValue() {
      var newValue = (0, _number.formatFloat)(this.compValue - this.compInterval, this.compDecimals);

      if (((0, _utils.isNullOrUndefined)(this.compMin) || newValue >= this.compMin) && !this.waiting) {
        this.setValue(newValue);
      }
    },
    setValue: function setValue(value) {
      // consider the configured decimal seperator (if the input is typed in the input field)
      if (typeof value === "string") {
        value = value.replace(App.decimalSeparator || ",", ".");
      }

      value = parseFloat(value);

      if (isNaN(value)) {
        value = (0, _utils.defaultValue)(this.compMin, 1);
      } // limit new value to min/ max value


      value = (0, _number.limit)(value, this.compMin, this.compMax); // make sure, new value is an even multiple of interval

      var diff = (0, _number.formatFloat)(value % this.compInterval, this.compDecimals, true);

      if (diff > 0 && diff !== this.compInterval) {
        if (diff < this.compInterval / 2) {
          value -= diff;
        } else {
          value += this.compInterval - diff;
        }

        value = (0, _number.limit)(value, this.compMin, this.compMax);
      } // cut fraction


      value = (0, _number.formatFloat)(value, this.compDecimals);

      if (value !== this.compValue) {
        this.compValue = value;
        this.onValueChanged();
      } else if (!(0, _utils.isNullOrUndefined)(this.$refs.quantityInputField)) {
        this.$refs.quantityInputField.value = value;
      }
    },
    fetchQuantityFromBasket: function fetchQuantityFromBasket() {
      if (!(0, _utils.isNullOrUndefined)(this.min) && this.variationBasketQuantity >= this.min) {
        // minimum quantity already in basket
        this.compMin = this.compInterval;
      }

      if (!(0, _utils.isNullOrUndefined)(this.max)) {
        // decrease maximum quantity by quantity of variations already in basket
        this.compMax = this.max - this.variationBasketQuantity;

        if (this.variationBasketQuantity + this.compInterval > this.max) {
          this.compMin = 0;
          this.compMax = 0;
          this.$emit("out-of-stock", true);
        } else {
          this.$emit("out-of-stock", false);
        }
      }

      this.setValue(this.compMin);
    }
  }
});

},{"../../helper/debounce":265,"../../helper/number":268,"../../helper/utils":271,"../../services/TranslationService":280}],188:[function(require,module,exports){
"use strict";

var _VariationPropertyService = require("../../services/VariationPropertyService");

var _get = require("../../helper/get");

var _utils = require("../../helper/utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("single-item", {
  delimiters: ["${", "}"],
  props: ["template", "attributeNameMap", "variationUnits"],
  jsonDataFields: ["itemData", "variationListData"],
  computed: _objectSpread({
    isDescriptionTabActive: function isDescriptionTabActive() {
      return App.config.item.itemData.includes("item.description") && !!this.currentVariation.texts.description.length;
    },
    isTechnicalDataTabActive: function isTechnicalDataTabActive() {
      return App.config.item.itemData.includes("item.technical_data") && !!this.currentVariation.texts.technicalData.length;
    },
    transformedVariationProperties: function transformedVariationProperties() {
      return (0, _VariationPropertyService.transformVariationProperties)(this.currentVariation, ["empty"], "showInItemListing");
    }
  }, Vuex.mapState({
    currentVariation: function currentVariation(state) {
      return state.item.variation.documents[0].data;
    },
    variations: function variations(state) {
      return state.item.variationList;
    },
    isVariationSelected: function isVariationSelected(state) {
      return state.item.isVariationSelected;
    }
  }), Vuex.mapGetters(["variationTotalPrice", "variationMissingProperties", "variationGroupedProperties", "variationGraduatedPrice"])),
  created: function created() {
    this.$store.commit("setVariation", this.itemData);
    this.$store.commit("setVariationList", this.variationListData);
    this.$store.dispatch("addLastSeenItem", this.currentVariation.variation.id);
  },
  methods: {
    setIsVariationSelected: function setIsVariationSelected(event) {
      this.$store.commit("setIsVariationSelected", event);
    },
    getDataField: function getDataField(field) {
      return (0, _get.get)(this.currentVariation, field);
    },
    getFilteredDataField: function getFilteredDataField(field, filter) {
      if (!(0, _utils.isNullOrUndefined)(this.$options.filters[filter])) {
        return this.$options.filters[filter](this.getDataField(field));
      }

      return this.getDataField(field);
    }
  }
});

},{"../../helper/get":267,"../../helper/utils":271,"../../services/VariationPropertyService":283}],189:[function(require,module,exports){
"use strict";

var _util = require("util");

var _dom = require("../../helper/dom");

var _uniq = _interopRequireDefault(require("lodash/uniq"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ApiService = require("services/ApiService"); // cache loaded variation data for reuse


var VariationData = {};
Vue.component("variation-select", {
  delimiters: ["${", "}"],
  props: ["attributes", "variations", "variationUnits", "preselect", "unitPreselect", "template"],
  data: function data() {
    return {
      // Collection of currently selected variation attributes.
      selectedAttributes: {},
      possibleUnitIds: [],
      selectedUnitId: 0
    };
  },
  computed: _objectSpread({
    hasEmptyOption: function hasEmptyOption() {
      var _this = this;

      var hasEmptyVariation = this.variations.some(function (variation) {
        return variation.attributes.length <= 0;
      });
      var preselectedVariationExists = this.variations.some(function (variation) {
        return variation.id === _this.preselect;
      });

      if (hasEmptyVariation || !preselectedVariationExists) {
        // main variation is selectable
        return true;
      } // Check if all possible combinations can be selected or if an empty option is required to reset the current selection


      var attributeCombinationCount = Object.keys(this.attributes).map(function (attributeId) {
        return Object.keys(_this.attributes[attributeId].values).length;
      }).reduce(function (prod, current) {
        return prod * current;
      }, 1);
      return attributeCombinationCount * Object.keys(this.variationUnits).length !== this.variations.length;
    }
  }, Vuex.mapState({
    currentVariation: function currentVariation(state) {
      return state.item.variation;
    }
  })),
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      // initialize selected attributes to be tracked by change detection
      var attributes = {};

      for (var attributeId in _this2.attributes) {
        attributes[attributeId] = null;
      }

      _this2.selectedAttributes = attributes; // set attributes of preselected variation if exists

      if (_this2.preselect) {
        // find variation by id
        var preselectedVariation = _this2.variations.filter(function (variation) {
          // eslint-disable-next-line eqeqeq
          return variation.variationId == _this2.preselect;
        });

        if (!!preselectedVariation && preselectedVariation.length === 1) {
          var _attributes = _this2.attributes; // set attributes of preselected variation

          _this2.setAttributes(preselectedVariation[0]);

          if (preselectedVariation[0].attributes.length > 0 && _this2.unitPreselect > 0 || _attributes.length === 0) {
            var possibleVariations = _this2.filterVariations(_this2.selectedAttributes);

            if (possibleVariations.length > 1) {
              _this2.setUnits(possibleVariations);

              _this2.selectedUnitId = _this2.unitPreselect;
            } else if (_this2.variations.length > 1 && _this2.attributes.length === 0) {
              _this2.setUnits(_this2.variations);

              _this2.selectedUnitId = _this2.unitPreselect;
            }
          }
        }
      }
    });
  },
  methods: {
    /**
     * Finds all variations matching a given set of attributes.
     * @param {{[int]: int}}  attributes   A map containing attributeIds and attributeValueIds. Used to filter variations
     * @returns {array}                    A list of matching variations.
     */
    filterVariations: function filterVariations(attributes) {
      var _this3 = this;

      attributes = attributes || this.selectedAttributes;
      return this.variations.filter(function (variation) {
        for (var i = 0; i < variation.attributes.length; i++) {
          var id = variation.attributes[i].attributeId;
          var val = variation.attributes[i].attributeValueId;

          if (!!attributes[id] && attributes[id] != val) {
            return false;
          }
        }

        return variation.attributes.length > 0 || _this3.possibleUnitIds.length > 0;
      }).filter(function (variation) {
        return _this3.selectedUnitId === 0 || _this3.selectedUnitId === variation.unitCombinationId;
      });
    },

    /**
     * Tests if a given attribute value is not available depending on the current selection.
     * @param {int}     attributeId         The id of the attribute
     * @param {int}     attributeValueId    The valueId of the attribute
     * @returns {boolean}                   True if the value can be combined with the current selection.
     */
    isEnabled: function isEnabled(attributeId, attributeValueId) {
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
    setAttributes: function setAttributes(variation) {
      var hasChanges = false;

      for (var i = 0; i < variation.attributes.length; i++) {
        var id = variation.attributes[i].attributeId;
        var val = variation.attributes[i].attributeValueId;

        if (this.selectedAttributes[id] !== val) {
          this.selectedAttributes[id] = val;
          hasChanges = true;
        }
      }

      return hasChanges;
    },
    isTextCut: function isTextCut(name) {
      if (this.$refs.labelBoxRef) {
        return (0, _dom.textWidth)(name, "Custom-Font, Helvetica, Arial, sans-serif") > this.$refs.labelBoxRef[0].clientWidth;
      }

      return false;
    },
    onSelectionChange: function onSelectionChange(event) {
      this.$emit("is-valid-change", false);

      if ((0, _util.isNull)(event)) {
        var values = Object.values(this.selectedAttributes);

        var uniqueValues = _toConsumableArray(new Set(values));

        if (uniqueValues.length === 1 && (0, _util.isNull)(uniqueValues[0])) {
          var mainVariation = this.variations.find(function (variation) {
            return !variation.attributes.length;
          });

          if (mainVariation) {
            this.setVariation(mainVariation.variationId);
          }
        }
      } else {
        // search variations matching current selection
        var possibleVariations = this.filterVariations();

        if (possibleVariations.length === 1) {
          if (!this.selectedUnitId > 0) {
            this.possibleUnitIds = [];
          } // only 1 matching variation remaining:
          // set remaining attributes if not set already. Will trigger this method again.


          if (!this.setAttributes(possibleVariations[0])) {
            // all attributes are set => load variation data
            this.setVariation(possibleVariations[0].variationId);
          } else {
            this.onSelectionChange();
          }
        } else if (possibleVariations.length > 1) {
          this.setUnits(possibleVariations);
        } else {
          this.setUnits([]);
        }
      }
    },
    setVariation: function setVariation(variationId) {
      var _this4 = this;

      if (VariationData[variationId]) {
        // reuse cached variation data
        this.$store.commit("setVariation", VariationData[variationId]);
        document.dispatchEvent(new CustomEvent("onVariationChanged", {
          detail: {
            attributes: VariationData[variationId].attributes,
            documents: VariationData[variationId].documents
          }
        }));
        this.$emit("is-valid-change", true);
      } else {
        // get variation data from remote
        ApiService.get("/rest/io/variations/" + variationId, {
          template: "Ceres::Item.SingleItem"
        }).done(function (response) {
          // store received variation data for later reuse
          VariationData[variationId] = response;

          _this4.$store.commit("setVariation", response);

          document.dispatchEvent(new CustomEvent("onVariationChanged", {
            detail: {
              attributes: response.attributes,
              documents: response.documents
            }
          }));

          _this4.$emit("is-valid-change", true);
        });
      }
    },
    setUnits: function setUnits(possibleVariations) {
      var possibleUnitIds = [];

      if (possibleVariations.length > 0) {
        possibleUnitIds = (0, _uniq["default"])(possibleVariations.map(function (variation) {
          return variation.unitCombinationId;
        }));
      }

      if (possibleUnitIds.length > 1) {
        this.possibleUnitIds = possibleUnitIds;
      } else {
        this.selectedUnitId = 0;
      }
    }
  },
  watch: {
    currentVariation: {
      handler: function handler(newVariation, oldVariation) {
        if (oldVariation) {
          var url = this.$options.filters.itemURL(newVariation.documents[0].data);
          var title = document.getElementsByTagName("title")[0].innerHTML;
          window.history.replaceState({}, title, url);
          document.dispatchEvent(new CustomEvent("onHistoryChanged", {
            detail: {
              title: title,
              url: url
            }
          }));
        }
      },
      deep: true
    }
  }
});

},{"../../helper/dom":266,"lodash/uniq":134,"services/ApiService":275,"util":139}],190:[function(require,module,exports){
"use strict";

Vue.component("category-image-carousel", {
  delimiters: ["${", "}"],
  props: {
    imageUrlsData: {
      type: Array
    },
    itemUrl: {
      type: String
    },
    altText: {
      type: String
    },
    titleText: {
      type: String
    },
    showDots: {
      type: Boolean,
      "default": App.config.item.categoryShowDots
    },
    showNav: {
      type: Boolean,
      "default": App.config.item.categoryShowNav
    },
    disableLazyLoad: {
      type: Boolean,
      "default": false
    },
    disableCarouselOnMobile: {
      type: Boolean
    },
    enableCarousel: {
      type: Boolean
    },
    template: {
      type: String
    }
  },
  data: function data() {
    return {
      $_enableCarousel: false
    };
  },
  computed: {
    imageUrls: function imageUrls() {
      return this.imageUrlsData.sort(function (imageUrlA, imageUrlB) {
        if (imageUrlA.position > imageUrlB.position) {
          return 1;
        }

        if (imageUrlA.position < imageUrlB.position) {
          return -1;
        }

        return 0;
      });
    }
  },
  created: function created() {
    var isMobile = window.matchMedia("(max-width: 768px)").matches;
    var shouldCarouselBeEnabled = this.enableCarousel && this.imageUrls.length > 1;
    this.$_enableCarousel = this.disableCarouselOnMobile && isMobile ? false : shouldCarouselBeEnabled;
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.$_enableCarousel) {
        _this.initializeCarousel();
      }
    });
  },
  methods: {
    initializeCarousel: function initializeCarousel() {
      var _this2 = this;

      $("#owl-carousel-" + this._uid).owlCarousel({
        dots: !!this.showDots,
        items: 1,
        mouseDrag: false,
        loop: this.imageUrls.length > 1,
        lazyLoad: !this.disableLazyLoad,
        margin: 10,
        nav: !!this.showNav,
        navText: ["<i id=\"owl-nav-text-left-".concat(this._uid, "\" class='fa fa-chevron-left' aria-hidden='true'></i>"), "<i id=\"owl-nav-text-right-".concat(this._uid, "\" class='fa fa-chevron-right' aria-hidden='true'></i>")],
        onTranslated: function onTranslated(event) {
          var target = $(event.currentTarget);
          var owlItem = $(target.find(".owl-item.active"));
          owlItem.find(".img-fluid.lazy").show().lazyload({
            threshold: 100
          });
        },
        onInitialized: function onInitialized(event) {
          if (_this2.showNav) {
            document.querySelector("#owl-nav-text-left-".concat(_this2._uid)).parentElement.onclick = function (event) {
              return event.preventDefault();
            };

            document.querySelector("#owl-nav-text-right-".concat(_this2._uid)).parentElement.onclick = function (event) {
              return event.preventDefault();
            };
          }
        }
      });
    },
    getAltText: function getAltText(image) {
      var altText = image && image.alternate ? image.alternate : this.altText;
      return altText;
    },
    loadFirstImage: function loadFirstImage() {
      var itemLazyImage = this.$refs.itemLazyImage;

      if (itemLazyImage) {
        if (itemLazyImage.loadImage) {
          itemLazyImage.loadImage();
        } else if (itemLazyImage[0] && itemLazyImage[0].loadImage) {
          itemLazyImage[0].loadImage();
        }
      }
    }
  }
});

},{}],191:[function(require,module,exports){
"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("category-item", {
  props: {
    template: {
      type: String,
      "default": "#vue-category-item"
    },
    decimalCount: {
      type: Number,
      "default": 0
    },
    imageUrlAccessor: {
      type: String,
      "default": "urlMiddle"
    },
    itemData: {
      type: Object
    },
    disableCarouselOnMobile: {
      type: Boolean
    },
    paddingClasses: {
      type: String,
      "default": null
    },
    paddingInlineStyles: {
      type: String,
      "default": null
    }
  },
  jsonDataFields: ["itemDataRef"],
  computed: _objectSpread({
    item: function item() {
      return this.itemData || this.itemDataRef;
    },

    /**
     * returns itemData.item.storeSpecial
     */
    storeSpecial: function storeSpecial() {
      return this.item.item.storeSpecial;
    },

    /**
     * returns itemData.texts
     */
    texts: function texts() {
      return this.item.texts;
    }
  }, Vuex.mapState({
    showNetPrices: function showNetPrices(state) {
      return state.basket.showNetPrices;
    }
  })),
  methods: {
    loadFirstImage: function loadFirstImage() {
      var categoryImageCarousel = this.$refs.categoryImageCarousel;

      if (categoryImageCarousel) {
        categoryImageCarousel.loadFirstImage();
      }
    }
  }
});

},{}],192:[function(require,module,exports){
"use strict";

Vue.component("item-lazy-img", {
  delimiters: ["${", "}"],
  props: ["imageUrl", "template"],
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      setTimeout(function () {
        $(_this.$refs.lazyImg).show().lazyload({
          threshold: 100
        });
      }, 1);
    });
  },
  methods: {
    loadImage: function loadImage() {
      $(this.$refs.lazyImg).trigger("appear");
    }
  }
});

},{}],193:[function(require,module,exports){
"use strict";

var _ApiService = _interopRequireDefault(require("services/ApiService"));

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

var _UrlService = _interopRequireDefault(require("services/UrlService"));

var _utils = require("../../helper/utils");

var _url = require("../../helper/url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.component("item-search", {
  props: {
    template: {
      type: String,
      "default": "#vue-item-search"
    },
    showItemImages: {
      type: Boolean,
      "default": false
    },
    forwardToSingleItem: {
      type: Boolean,
      "default": App.config.search.forwardToSingleItem
    }
  },
  data: function data() {
    return {
      autocompleteRequest: null,
      autocompleteResult: [],
      selectedAutocompleteIndex: -1,
      isSearchFocused: false
    };
  },
  computed: {
    selectedAutocompleteItem: function selectedAutocompleteItem() {
      var selectedAutocompleteItem = this.autocompleteResult[this.selectedAutocompleteIndex];

      if (this.selectedAutocompleteIndex < 0 || !selectedAutocompleteItem) {
        return null;
      }

      return selectedAutocompleteItem;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      var urlParams = _UrlService["default"].getUrlParams(document.location.search);

      _this.$store.commit("setItemListSearchString", urlParams.query);

      _this.$refs.searchInput.value = !(0, _utils.isNullOrUndefined)(urlParams.query) ? urlParams.query : "";
    });
  },
  methods: {
    prepareSearch: function prepareSearch() {
      if (this.selectedAutocompleteItem) {
        if (this.forwardToSingleItem) {
          window.open(this.selectedAutocompleteItem.url, "_self", false);
        } else {
          this.$refs.searchInput.value = this.selectedAutocompleteItem.name;
          this.$store.commit("setItemListSearchString", this.$refs.searchInput.value);
          this.search();
        }
      } else {
        this.search();
      }

      $("#searchBox").collapse("hide");
    },
    search: function search() {
      if (this.$refs.searchInput.value.length) {
        if ((0, _url.pathnameEquals)(App.urls.search)) {
          this.updateTitle(this.$refs.searchInput.value);
          this.$store.dispatch("searchItems", this.$refs.searchInput.value);
          this.selectedAutocompleteIndex = -1;
          this.autocompleteResult = [];
        } else {
          window.open("".concat(App.urls.search, "?query=").concat(this.$refs.searchInput.value), "_self", false);
        }
      } else {
        this.preventSearch = false;
      }
    },
    updateTitle: function updateTitle(searchString) {
      var searchPageTitle = document.querySelector("#searchPageTitle");
      var title = _TranslationService["default"].translate("Ceres::Template.itemSearchResults") + " " + searchString;

      if (!(0, _utils.isNullOrUndefined)(searchPageTitle)) {
        searchPageTitle.innerHTML = "";
        searchPageTitle.appendChild(document.createTextNode(title));
      }

      document.title = "".concat(title, " | ").concat(_TranslationService["default"].translate("Ceres::Template.headerCompanyName"));
    },
    autocomplete: function autocomplete(searchString) {
      var _this2 = this;

      if (searchString.length >= 2) {
        if (!(0, _utils.isNullOrUndefined)(this.autocompleteRequest) && typeof this.autocompleteRequest.abort === "function") {
          this.autocompleteRequest.abort();
        }

        this.autocompleteRequest = _ApiService["default"].get("/rest/io/item/search/autocomplete", {
          template: "Ceres::ItemList.Components.ItemSearch",
          query: searchString
        });
        this.autocompleteRequest.done(function (response) {
          _this2.autocompleteRequest = null;
          _this2.autocompleteResult = [];
          _this2.selectedAutocompleteIndex = -1;

          if (response && response.documents.length) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = response.documents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                var images = _this2.$options.filters.itemImages(item.data.images, "urlPreview");

                var img = _this2.$options.filters.itemImage(images);

                var url = _this2.$options.filters.itemURL(item.data);

                var name = _this2.$options.filters.itemName(item.data);

                var displayName = name;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = searchString.split(" ")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var split = _step2.value;
                    displayName = displayName.replace(split, "<strong>".concat(split, "</strong>"));
                  }
                } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                      _iterator2["return"]();
                    }
                  } finally {
                    if (_didIteratorError2) {
                      throw _iteratorError2;
                    }
                  }
                }

                _this2.autocompleteResult.push({
                  img: img,
                  url: url,
                  name: name,
                  displayName: displayName
                });
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
        });
      } else {
        this.autocompleteResult = [];
      }
    },
    selectAutocompleteItem: function selectAutocompleteItem(item) {
      if (this.forwardToSingleItem) {
        window.open(item.url, "_self", false);
      } else {
        this.$refs.searchInput.value = item.name;
        this.$store.commit("setItemListSearchString", this.$refs.searchInput.value);
        this.search();
      }
    },
    keyup: function keyup() {
      this.selectedAutocompleteIndex--;

      if (this.selectedAutocompleteIndex < 0) {
        this.selectedAutocompleteIndex = 0;
      }
    },
    keydown: function keydown() {
      this.selectedAutocompleteIndex++;

      if (this.selectedAutocompleteIndex > this.autocompleteResult.length - 1) {
        this.selectedAutocompleteIndex = this.autocompleteResult.length - 1;
      }
    },
    // hide autocomplete after 100ms to make clicking on it possible
    setIsSearchFocused: function setIsSearchFocused(value) {
      var _this3 = this;

      setTimeout(function () {
        _this3.isSearchFocused = !!value;
      }, 100);
    }
  }
});

},{"../../helper/url":270,"../../helper/utils":271,"services/ApiService":275,"services/TranslationService":280,"services/UrlService":281}],194:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

var _TranslationService = _interopRequireDefault(require("../../services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.component("item-store-special", {
  delimiters: ["${", "}"],
  template: "#vue-item-store-special",
  props: ["storeSpecial", "recommendedRetailPrice", "variationRetailPrice", "decimalCount", "bundleType"],
  data: function data() {
    return {
      tagClass: "",
      label: "",
      tagClasses: {
        1: "badge-offer badge-danger",
        2: "badge-new badge-primary",
        3: "badge-top badge-success",
        "default": "badge-success"
      },
      labels: {
        1: _TranslationService["default"].translate("Ceres::Template.storeSpecialOffer"),
        2: _TranslationService["default"].translate("Ceres::Template.storeSpecialNew"),
        3: _TranslationService["default"].translate("Ceres::Template.storeSpecialTop")
      }
    };
  },
  created: function created() {
    this.initializeStoreSpecial();
  },
  methods: {
    initializeStoreSpecial: function initializeStoreSpecial() {
      if (!(0, _utils.isNullOrUndefined)(this.storeSpecial)) {
        this.tagClass = this.tagClasses[this.storeSpecial.id] || this.tagClasses["default"];
      } else {
        this.tagClass = this.tagClasses["default"];
      }

      this.label = this.getLabel();
    },
    getLabel: function getLabel() {
      if (((0, _utils.isNullOrUndefined)(this.storeSpecial) || this.storeSpecial.id === 1) && !(0, _utils.isNullOrUndefined)(this.recommendedRetailPrice)) {
        return this.getPercentageSale();
      }

      if ((0, _utils.isNullOrUndefined)(this.storeSpecial)) {
        return "";
      }

      return this.labels[this.storeSpecial.id] || this.storeSpecial.names.name;
    },
    getPercentageSale: function getPercentageSale() {
      // eslint-disable-next-line
      var percent = (1 - this.variationRetailPrice.unitPrice.value / this.recommendedRetailPrice.unitPrice.value) * -100;

      if (percent < 0) {
        return percent.toFixed(this.decimalCount).replace(".", App.decimalSeparator) + "%";
      }

      return "";
    }
  },
  watch: {
    storeSpecial: function storeSpecial() {
      this.initializeStoreSpecial();
    }
  }
});

},{"../../helper/utils":271,"../../services/TranslationService":280}],195:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("item-filter", {
  delimiters: ["${", "}"],
  props: {
    template: {
      type: String,
      "default": "#vue-item-filter"
    },
    facet: {
      type: Object
    }
  },
  computed: _objectSpread({
    facets: function facets() {
      return this.facet.values.sort(function (facetA, facetB) {
        if (facetA.position > facetB.position) {
          return 1;
        }

        if (facetA.position < facetB.position) {
          return -1;
        }

        return 0;
      });
    },
    facetName: function facetName() {
      if (this.facet.translationKey && this.facet.translationKey.length > 0) {
        return _TranslationService["default"].translate("Ceres::Template." + this.facet.translationKey);
      }

      return this.facet.name;
    }
  }, Vuex.mapState({
    selectedFacets: function selectedFacets(state) {
      return state.itemList.selectedFacets;
    },
    isLoading: function isLoading(state) {
      return state.itemList.isLoading;
    }
  })),
  methods: {
    updateFacet: function updateFacet(facetValue) {
      this.$store.dispatch("selectFacet", {
        facetValue: facetValue
      });
    },
    isSelected: function isSelected(facetValueId) {
      return this.selectedFacets.findIndex(function (selectedFacet) {
        return selectedFacet.id === facetValueId;
      }) > -1;
    }
  }
});

},{"services/TranslationService":280}],196:[function(require,module,exports){
"use strict";

var _UrlService = _interopRequireDefault(require("services/UrlService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("item-filter-list", {
  delimiters: ["${", "}"],
  props: {
    template: {
      type: String,
      "default": "#vue-item-filter-list"
    },
    facetData: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      initialSelectedFacets: [],
      initialPriceMin: "",
      initialPriceMax: "",
      isActive: false
    };
  },
  computed: _objectSpread({
    isInitialFacetSelectionActive: function isInitialFacetSelectionActive() {
      var _this = this;

      if (!this.isInitialPriceFacetActive) {
        return false;
      }

      var selectedFacetIds = this.selectedFacets.map(function (facet) {
        return facet.id;
      });

      if (this.initialSelectedFacets.length === selectedFacetIds.length) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop = function _loop() {
            var selectedFacetId = _step.value;

            if (!_this.initialSelectedFacets.find(function (initialFacetId) {
              return initialFacetId.toString() === selectedFacetId.toString();
            })) {
              return {
                v: false
              };
            }
          };

          for (var _iterator = selectedFacetIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ret = _loop();

            if (_typeof(_ret) === "object") return _ret.v;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return true;
      }

      return false;
    },
    isInitialPriceFacetActive: function isInitialPriceFacetActive() {
      var currentPriceFacet = this.selectedFacets.filter(function (facet) {
        return facet.id === "price";
      })[0]; // no initial price facet and no current one

      if (!this.initialPriceMin && !this.initialPriceMax && !currentPriceFacet) {
        return true;
      }

      if (currentPriceFacet) {
        if (currentPriceFacet.priceMin === this.initialPriceMin && currentPriceFacet.priceMax === this.initialPriceMax) {
          return true;
        }
      }

      return false;
    }
  }, Vuex.mapState({
    facets: function facets(state) {
      return state.itemList.facets.sort(function (facetA, facetB) {
        if (facetA.position > facetB.position) {
          return 1;
        }

        if (facetA.position < facetB.position) {
          return -1;
        }

        return 0;
      });
    },
    isLoading: function isLoading(state) {
      return state.itemList.isLoading;
    },
    selectedFacets: function selectedFacets(state) {
      return state.itemList.selectedFacets;
    }
  })),
  created: function created() {
    this.$store.commit("setFacets", this.facetData);

    var urlParams = _UrlService["default"].getUrlParams(document.location.search);

    var selectedFacets = [];

    if (urlParams.facets) {
      selectedFacets = urlParams.facets.split(",");
    }

    if (urlParams.priceMin || urlParams.priceMax) {
      var priceMin = urlParams.priceMin || "";
      var priceMax = urlParams.priceMax || "";
      this.$store.commit("setPriceFacet", {
        priceMin: priceMin,
        priceMax: priceMax
      });
      this.initialPriceMin = priceMin;
      this.initialPriceMax = priceMax;
      selectedFacets.push("price");
    }

    if (selectedFacets.length > 0) {
      this.$store.commit("setSelectedFacetsByIds", selectedFacets);
    }

    this.initialSelectedFacets = selectedFacets;
  },
  methods: {
    toggleOpeningState: function toggleOpeningState() {
      var _this2 = this;

      window.setTimeout(function () {
        if (_this2.isActive && !_this2.isInitialFacetSelectionActive) {
          _this2.$store.dispatch("loadItemList");
        }

        _this2.isActive = !_this2.isActive;
      }, 300);
    }
  }
});

},{"services/UrlService":281}],197:[function(require,module,exports){
"use strict";

var _UrlService = _interopRequireDefault(require("services/UrlService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("item-filter-price", {
  delimiters: ["${", "}"],
  props: {
    template: {
      type: String,
      "default": "#vue-item-filter-price"
    }
  },
  data: function data() {
    return {
      priceMin: "",
      priceMax: "",
      currency: App.activeCurrency
    };
  },
  created: function created() {
    var urlParams = _UrlService["default"].getUrlParams(document.location.search);

    this.priceMin = urlParams.priceMin || "";
    this.priceMax = urlParams.priceMax || "";
  },
  computed: _objectSpread({
    isDisabled: function isDisabled() {
      return this.priceMin === "" && this.priceMax === "" || parseInt(this.priceMin) >= parseInt(this.priceMax) || this.isLoading;
    }
  }, Vuex.mapState({
    isLoading: function isLoading(state) {
      return state.itemList.isLoading;
    }
  })),
  methods: {
    selectAll: function selectAll(event) {
      event.target.select();
    },
    triggerFilter: function triggerFilter() {
      if (!this.isDisabled) {
        this.$store.dispatch("selectPriceFacet", {
          priceMin: this.priceMin,
          priceMax: this.priceMax
        });
      }
    }
  }
});

},{"services/UrlService":281}],198:[function(require,module,exports){
"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("item-filter-tag-list", {
  props: {
    template: {
      type: String,
      "default": "#vue-item-filter-tag-list"
    }
  },
  computed: Vuex.mapState({
    tagList: function tagList(state) {
      return state.itemList.selectedFacets;
    }
  }),
  methods: _objectSpread({
    removeTag: function removeTag(tag) {
      this.selectFacet({
        facetValue: tag
      });
      this.loadItemList();
    },
    resetAllTags: function resetAllTags() {
      this.resetAllSelectedFacets();
      this.loadItemList();
    }
  }, Vuex.mapMutations(["resetAllSelectedFacets"]), Vuex.mapActions(["selectFacet", "loadItemList"]))
});

},{}],199:[function(require,module,exports){
"use strict";

Vue.component("live-shopping-details", {
  props: {
    template: {
      type: String,
      "default": "#vue-live-shopping-details"
    },
    liveShoppingData: {
      type: Object,
      required: true
    },
    displaySettings: {
      type: Object,
      "default": function _default() {
        return {
          showCrossPrice: true,
          showStock: true,
          showStockProgress: true,
          showTimer: true,
          showTimerProgress: true
        };
      }
    },
    prices: {
      type: Object,
      required: true
    },
    isActiveByStock: {
      type: Boolean
    }
  },
  data: function data() {
    return {
      currentInterval: null,
      duration: null,
      hasClosed: null,
      hasStarted: null,
      itemPriceRebatePercentage: 0,
      itemQuantityRemaining: 0,
      momentBegin: null,
      momentEnd: null,
      quantitySoldPercentage: 0,
      timePercentage: 0
    };
  },
  created: function created() {
    this.initializeDataAndTimer();
  },
  methods: {
    initializeDataAndTimer: function initializeDataAndTimer() {
      var _this = this;

      var momentNow = moment(Date.now());
      this.momentBegin = moment.unix(this.liveShoppingData.liveShopping.fromTime);
      this.momentEnd = moment.unix(this.liveShoppingData.liveShopping.toTime);
      this.hasStarted = this.momentBegin < momentNow;
      this.hasClosed = this.momentEnd < momentNow;
      this.setQuantitySoldPercentage();

      if (this.hasStarted && !this.hasClosed) {
        this.setItemPriceRebatePercentage();
      }

      clearInterval(this.currentInterval);
      this.calculations();
      this.currentInterval = setInterval(function () {
        _this.calculations();
      }, 1000);
    },
    setQuantitySoldPercentage: function setQuantitySoldPercentage() {
      var data = this.liveShoppingData.liveShopping;
      var percentage = 100 - data.quantitySold / data.quantityMax * 100;
      this.itemQuantityRemaining = data.quantityMax - data.quantitySold;
      this.quantitySoldPercentage = percentage.toFixed(App.config.item.storeSpecial);
    },
    setItemPriceRebatePercentage: function setItemPriceRebatePercentage() {
      var specialOfferPrice = this.prices.price.price.value;
      var defaultPrice = this.prices.rrp.price.value;

      if (defaultPrice === 0) {
        this.itemPriceRebatePercentage = 0;
      } else {
        var percentage = 100 - specialOfferPrice / defaultPrice * 100;
        percentage = percentage.toFixed(App.config.item.storeSpecial);
        percentage = percentage.replace(".", App.decimalSeparator);
        this.itemPriceRebatePercentage = percentage;
      }
    },
    calculations: function calculations() {
      var momentNow = moment(Date.now());
      var fullSeconds = 0;
      var remainSeconds = 0;

      if (this.hasStarted) {
        fullSeconds = this.momentEnd.diff(this.momentBegin, "seconds");
        remainSeconds = this.momentEnd.diff(momentNow, "seconds");
      } else {
        fullSeconds = this.momentBegin.diff(this.momentNow, "seconds");
        remainSeconds = this.momentBegin.diff(momentNow, "seconds");
      }

      this.timePercentage = (remainSeconds / fullSeconds * 100).toFixed(App.config.item.storeSpecial);
      this.duration = this.getDuration(remainSeconds);
      var hasToStart = !this.hasStarted && this.momentBegin < momentNow;
      var hasToClose = !this.hasClosed && this.momentEnd < momentNow;

      if (hasToStart || hasToClose) {
        clearInterval(this.currentInterval);
        this.$emit("reload-offer");
      }
    },
    getDuration: function getDuration(seconds) {
      var duration = moment.duration(seconds, "seconds");
      return {
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds()
      };
    }
  },
  watch: {
    liveShoppingData: function liveShoppingData() {
      this.initializeDataAndTimer();
    }
  }
});

},{}],200:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimeEnum = Object.freeze({
  past: 1,
  now: 2,
  future: 3
});
Vue.component("live-shopping-item", {
  props: {
    template: {
      type: String,
      "default": "#vue-live-shopping-item"
    },
    liveShoppingId: {
      type: Number,
      required: true,
      validator: function validator(value) {
        return value % 1 === 0 && value >= 1 && value <= 10;
      }
    },
    displaySettings: {
      type: Object
    },
    paddingClasses: {
      type: String,
      "default": null
    },
    paddingInlineStyles: {
      type: String,
      "default": null
    }
  },
  computed: _objectSpread({
    currentOffer: function currentOffer() {
      return this.liveShoppingOffers[this.liveShoppingId];
    },
    isActive: function isActive() {
      return this.isActiveByTime && this.isActiveByStock;
    },
    isActiveByTime: function isActiveByTime() {
      if (!(0, _utils.isNullOrUndefined)(this.currentOffer)) {
        var momentBegin = moment.unix(this.currentOffer.liveShopping.fromTime);
        var momentEnd = moment.unix(this.currentOffer.liveShopping.toTime);
        var momentNow = moment(Date.now());
        return momentBegin < momentNow && momentNow < momentEnd;
      }

      return false;
    },
    isActiveByStock: function isActiveByStock() {
      if (!(0, _utils.isNullOrUndefined)(this.currentOffer)) {
        var liveShopping = this.currentOffer.liveShopping;
        return liveShopping.quantitySold < liveShopping.quantityMax;
      }

      return false;
    },
    storeSpecial: function storeSpecial() {
      if (!(0, _utils.isNullOrUndefined)(this.currentOffer)) {
        if (this.isActive) {
          return {
            id: 1
          };
        }

        var offerTime = this.whenIsCurrentOffer();
        var name = "";

        if (offerTime === TimeEnum.past) {
          name = _TranslationService["default"].translate("Ceres::Template.liveShoppingOfferClosed");
        } else if (offerTime === TimeEnum.future) {
          name = _TranslationService["default"].translate("Ceres::Template.liveShoppingNextOffer");
        } else if (offerTime === TimeEnum.now) {
          name = _TranslationService["default"].translate("Ceres::Template.liveShoppingOfferSoldOut");
        }

        return {
          id: 2,
          names: {
            name: name
          }
        };
      }

      return null;
    },
    prices: function prices() {
      var itemPrices = this.currentOffer.item.prices;
      var prices = {
        price: itemPrices["default"],
        rrp: itemPrices.rrp,
        isRrpDefaultPrice: false
      };

      if (!(0, _utils.isNullOrUndefined)(itemPrices.specialOffer)) {
        prices.price = itemPrices.specialOffer;
        prices.rrp = itemPrices["default"] || itemPrices.rrp;
        prices.isRrpDefaultPrice = !!itemPrices["default"];
      }

      return prices;
    }
  }, Vuex.mapState({
    liveShoppingOffers: function liveShoppingOffers(state) {
      return state.liveShopping.liveShoppingOffers;
    }
  })),
  created: function created() {
    this.$store.dispatch("retrieveLiveShoppingOffer", this.liveShoppingId);
  },
  methods: {
    whenIsCurrentOffer: function whenIsCurrentOffer() {
      var momentBegin = moment.unix(this.currentOffer.liveShopping.fromTime);
      var momentEnd = moment.unix(this.currentOffer.liveShopping.toTime);
      var momentNow = moment(Date.now());

      if (momentBegin < momentNow && momentNow > momentEnd) {
        return TimeEnum.past;
      }

      if (momentBegin < momentNow && momentNow < momentEnd) {
        return TimeEnum.now;
      }

      return TimeEnum.future;
    },
    reloadOffer: function reloadOffer() {
      this.$store.dispatch("retrieveLiveShoppingOffer", this.liveShoppingId);
    }
  }
});

},{"../../helper/utils":271,"services/TranslationService":280}],201:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ModalService = require("services/ModalService");

var APIService = require("services/ApiService");

var NotificationService = require("services/NotificationService");

var ValidationService = require("services/ValidationService");

Vue.component("account-settings", {
  props: {
    template: {
      type: String,
      "default": "#vue-account-settings"
    },
    userData: {
      type: Object,
      // eslint-disable-next-line
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      isLoading: false,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      newMail: "",
      newMail2: "",
      accountSettingsClass: "",
      accountEmailModal: null,
      accountPasswordModal: {}
    };
  },

  /**
   * Initialise the account settings modal
   */
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.$refs.accountEmailModal) {
        _this.accountEmailModal = ModalService.findModal(_this.$refs.accountEmailModal);
      }

      _this.accountPasswordModal = ModalService.findModal(_this.$refs.accountPasswordModal);
    });
  },
  computed: {
    /**
     * Check whether the data matches
     * @returns {boolean}
     */
    matchEmail: function matchEmail() {
      return this.newMail2.length <= 0 || this.newMail === this.newMail2;
    },
    matchPassword: function matchPassword() {
      return this.confirmPassword.length <= 0 || this.newPassword === this.confirmPassword;
    },
    isValidEmail: function isValidEmail() {
      return this.newMail.length > 0 && this.newMail === this.newMail2 && this.newMail !== this.userData.email;
    },
    isValidPassword: function isValidPassword() {
      return this.oldPassword.length > 0 && this.newPassword.length > 0 && this.newPassword === this.confirmPassword;
    }
  },
  methods: {
    /**
     * Open the change mail modal
     */
    showChangeAccountEmail: function showChangeAccountEmail() {
      this.accountEmailModal.show();
    },

    /**
     * Open the change password modal
     */
    showChangeAccountPassword: function showChangeAccountPassword() {
      this.accountPasswordModal.show();
    },

    /**
     * Checks the new password to see if it meets the password requirements
     */
    validatePassword: function validatePassword() {
      var _this2 = this;

      ValidationService.validate(this.$refs.passwordFormControl).done(function () {
        _this2.saveAccountPassword();
      }).fail(function (invalidFields) {
        ValidationService.markInvalidFields(invalidFields, "error");
        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.resetPwInvalidPassword")).closeAfter(5000);

        _this2.$refs.passwordHint.showPopper();
      });
    },

    /**
     * Save the new password
     */
    saveAccountPassword: function saveAccountPassword() {
      var _this3 = this;

      if (this.isValidPassword) {
        this.isLoading = true;
        APIService.post("/rest/io/customer/password", {
          oldPassword: this.oldPassword,
          password: this.newPassword,
          password2: this.confirmPassword
        }).done(function (response) {
          _this3.clearFieldsAndClose();

          NotificationService.success(_TranslationService["default"].translate("Ceres::Template.myAccountChangePasswordSuccessful")).closeAfter(3000);
        }).fail(function (response) {
          NotificationService.error(_TranslationService["default"].translate("Ceres::Template.myAccountChangePasswordFailed")).closeAfter(5000);
        }).always(function () {
          _this3.isLoading = false;
        });
      }
    },

    /**
     * Save the new email
     */
    saveAccountEmail: function saveAccountEmail() {
      var _this4 = this;

      if (this.isValidEmail) {
        this.isLoading = true;
        APIService.post("/rest/io/customer/mail", {
          newMail: this.newMail,
          newMail2: this.newMail2
        }).done(function (response) {
          _this4.clearFieldsAndClose();

          NotificationService.success(_TranslationService["default"].translate("Ceres::Template.myAccountChangeEmailConfirmationSent")).closeAfter(3000);
        }).fail(function (response, status) {
          var message = _TranslationService["default"].translate("Ceres::Template.myAccountChangeEmailFailed");

          if (status === 400) {
            message = _TranslationService["default"].translate("Ceres::Template.regError");
          }

          NotificationService.error(message).closeAfter(5000);
        }).always(function () {
          _this4.isLoading = false;
        });
      }
    },

    /**
     * Clear the password fields in the modal
     */
    clearFields: function clearFields() {
      this.oldPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.newMail = "";
      this.newMail2 = "";
    },

    /**
     * Clear the fields and close the modal
     */
    clearFieldsAndClose: function clearFieldsAndClose() {
      if (this.accountEmailModal) {
        this.accountEmailModal.hide();
      }

      this.accountPasswordModal.hide();
      this.clearFields();
    }
  }
});

},{"services/ApiService":275,"services/ModalService":278,"services/NotificationService":279,"services/TranslationService":280,"services/ValidationService":282}],202:[function(require,module,exports){
"use strict";

var _ValidationService = _interopRequireDefault(require("services/ValidationService"));

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ApiService = require("services/ApiService");

var NotificationService = require("services/NotificationService");

var ModalService = require("services/ModalService");

Vue.component("bank-data-select", {
  props: {
    template: {
      type: String,
      "default": "#vue-bank-data-select"
    },
    userBankData: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    contactId: {
      type: String
    }
  },
  data: function data() {
    return {
      bankInfoModal: {},
      bankDeleteModal: {},
      updateBankData: {},
      selectedBankData: null,
      updateBankIndex: 0,
      doUpdate: null,
      headline: ""
    };
  },

  /**
   * Select the modals
   */
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.bankInfoModal = ModalService.findModal(_this.$refs.bankInfoModal);
      _this.bankDeleteModal = ModalService.findModal(_this.$refs.bankDeleteModal);
    });
  },
  methods: {
    /**
     * Set the selected bank-data
     */
    changeSelecting: function changeSelecting(bankData) {
      this.selectedBankData = bankData;
    },

    /**
     * Open the modal to add new bank-data
     */
    openAddBank: function openAddBank() {
      this.headline = _TranslationService["default"].translate("Ceres::Template.myAccountBankAddDataTitle");
      this.openModal(false);
    },

    /**
     * Set data to update and open the modal
     * @param index
     * @param bankdata
     */
    openUpdateBank: function openUpdateBank(index, bankData) {
      this.headline = _TranslationService["default"].translate("Ceres::Template.myAccountBankUpdateDataTitle");
      this.setUpdateData(index, bankData);
      this.openModal(true);
    },

    /**
     * Set data to remove and open the modal
     * @param index
     * @param bankdata
     */
    openDeleteBank: function openDeleteBank(index, bankData) {
      this.setUpdateData(index, bankData);
      this.doUpdate = false;
      this.bankDeleteModal.show();
    },

    /**
     * Open the modal
     * @param doUpdate
     */
    openModal: function openModal(doUpdate) {
      if (!doUpdate) {
        this.resetData();
      }

      this.doUpdate = doUpdate;

      _ValidationService["default"].unmarkAllFields($(this.$refs.bankInfoModal));

      this.bankInfoModal.show();
    },

    /**
     * Set data to change
     * @param index
     * @param bankdata
     */
    setUpdateData: function setUpdateData(index, bankData) {
      this.updateBankData = JSON.parse(JSON.stringify(bankData));
      this.updateBankIndex = index;
    },

    /**
     * Validate the input-fields-data
     */
    validateInput: function validateInput() {
      var _this2 = this;

      _ValidationService["default"].validate($("#my-bankForm")).done(function () {
        if (_this2.doUpdate) {
          _this2.updateBankInfo();
        } else {
          _this2.addBankInfo();
        }
      }).fail(function (invalidFields) {
        _ValidationService["default"].markInvalidFields(invalidFields, "error");
      });
    },

    /**
     * Update bank-data
     */
    updateBankInfo: function updateBankInfo() {
      var _this3 = this;

      this.updateBankData.lastUpdateBy = "customer";
      ApiService.put("/rest/io/customer/bank_data/" + this.updateBankData.id, this.updateBankData).done(function (response) {
        _this3.userBankData.splice(_this3.updateBankIndex, 1, response);

        _this3.checkBankDataSelection();

        _this3.closeModal();

        NotificationService.success(_TranslationService["default"].translate("Ceres::Template.myAccountBankDataUpdated")).closeAfter(3000);
      }).fail(function () {
        _this3.closeModal();

        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.myAccountBankDataNotUpdated")).closeAfter(5000);
      });
    },

    /**
     * Add new bank-data
     */
    addBankInfo: function addBankInfo() {
      var _this4 = this;

      this.updateBankData.lastUpdateBy = "customer";
      this.updateBankData.contactId = this.contactId;
      ApiService.post("/rest/io/customer/bank_data", this.updateBankData).done(function (response) {
        _this4.userBankData.push(response);

        _this4.checkBankDataSelection(true);

        _this4.closeModal();

        NotificationService.success(_TranslationService["default"].translate("Ceres::Template.myAccountBankDataAdded")).closeAfter(3000);
      }).fail(function () {
        _this4.closeModal();

        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.myAccountBankDataNotAdded")).closeAfter(5000);
      });
    },

    /**
     * Delete bank-data
     */
    removeBankInfo: function removeBankInfo() {
      var _this5 = this;

      ApiService["delete"]("/rest/io/customer/bank_data/" + this.updateBankData.id).done(function (response) {
        _this5.checkBankDataSelection(false);

        _this5.closeDeleteModal();

        _this5.userBankData.splice(_this5.updateBankIndex, 1);

        NotificationService.success(_TranslationService["default"].translate("Ceres::Template.myAccountBankDataDeleted")).closeAfter(3000);
      }).fail(function () {
        _this5.closeDeleteModal();

        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.myAccountBankDataNotDeleted")).closeAfter(5000);
      });
    },

    /**
     * Check selection on delete and on add bank-data
     */
    checkBankDataSelection: function checkBankDataSelection(addData) {
      if (addData && !this.doUpdate && this.userBankData.length < 1) {
        this.selectedBankData = this.userBankData[0];
      }

      if (!addData && this.selectedBankData && this.selectedBankData.id === this.updateBankData.id) {
        if (!this.doUpdate) {
          this.selectedBankData = null;
        } else {
          this.selectedBankData = this.userBankData[this.updateBankIndex];
        }
      }
    },

    /**
     * Reset the updateBankData and updateBankIndex
     */
    resetData: function resetData() {
      this.updateBankData = {};
      this.updateBankIndex = 0;
      this.doUpdate = false;
    },

    /**
     * Close the current bank-modal
     */
    closeModal: function closeModal() {
      this.bankInfoModal.hide();
      this.resetData();
    },

    /**
     * Close the current bank-delete-modal
     */
    closeDeleteModal: function closeDeleteModal() {
      this.bankDeleteModal.hide();
      this.resetData();
    }
  }
});

},{"services/ApiService":275,"services/ModalService":278,"services/NotificationService":279,"services/TranslationService":280,"services/ValidationService":282}],203:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ModalService = require("services/ModalService");

var ApiService = require("services/ApiService");

Vue.component("change-payment-method", {
  props: {
    template: {
      type: String,
      "default": "#vue-change-payment-method"
    },
    currentOrder: {
      type: Object
    },
    allowedPaymentMethods: {
      type: Array
    },
    changePossible: {
      type: Boolean
    },
    paymentStatus: {
      type: String
    },
    currentTemplate: {
      type: String
    },
    currentPaymentMethodName: {
      type: String
    }
  },
  data: function data() {
    return {
      compAllowedPaymentMethods: this.allowedPaymentMethods,
      changePaymentModal: {},
      paymentMethod: 0,
      isPending: false,
      showErrorMessage: false
    };
  },

  /**
   * Initialize the change payment modal
   */
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.changePaymentModal = ModalService.findModal(_this.$refs.changePaymentModal);
    });
  },
  methods: {
    checkChangeAllowed: function checkChangeAllowed() {
      var _this2 = this;

      ApiService.get("/rest/io/order/payment", {
        orderId: this.currentOrder.id,
        paymentMethodId: this.paymentMethod
      }).done(function (response) {
        // TODO: research - if response should be false, it returns an object
        _this2.changePossible = _typeof(response) === "object" ? response.data : response;
      }).fail(function () {
        _this2.changePossible = false;
      });
    },
    openPaymentChangeModal: function openPaymentChangeModal() {
      this.changePaymentModal.show();
    },
    getPaymentStateText: function getPaymentStateText(paymentStates) {
      return _TranslationService["default"].translate("Ceres::Template.orderHistoryPaymentStatus_" + paymentStates.find(function (paymentState) {
        return paymentState.typeId === 4;
      }).value);
    },
    getPaymentId: function getPaymentId(paymentIds) {
      var paymentId = paymentIds.find(function (paymentId) {
        return paymentId.typeId === 3;
      }).value;

      if (paymentId) {
        return paymentId;
      }

      return "";
    },
    closeModal: function closeModal() {
      this.changePaymentModal.hide();
      this.isPending = false;
    },
    updateOrderHistory: function updateOrderHistory(updatedOrder) {
      document.getElementById("payment_name_" + this.currentOrder.id).innerHTML = updatedOrder.paymentMethodName;
      document.getElementById("payment_state_" + this.currentOrder.id).innerHTML = this.getPaymentStateText(updatedOrder.order.properties);
      document.getElementById("current_payment_method_name_" + this.currentOrder.id).innerHTML = updatedOrder.paymentMethodName;
      this.checkChangeAllowed();
      this.closeModal();
    },
    updateAllowedPaymentMethods: function updateAllowedPaymentMethods(paymentMethodId) {
      var _this3 = this;

      ApiService.get("/rest/io/order/paymentMethods", {
        orderId: this.currentOrder.id,
        paymentMethodId: paymentMethodId
      }).done(function (response) {
        _this3.compAllowedPaymentMethods = response;
      }).fail(function () {});
    },
    changePaymentMethod: function changePaymentMethod() {
      var _this4 = this;

      this.isPending = true;
      ApiService.post("/rest/io/order/payment", {
        orderId: this.currentOrder.id,
        paymentMethodId: this.paymentMethod
      }).done(function (response) {
        document.dispatchEvent(new CustomEvent("historyPaymentMethodChanged", {
          detail: {
            oldOrder: _this4.currentOrder,
            newOrder: response
          }
        }));

        _this4.updateOrderHistory(response);

        _this4.updateAllowedPaymentMethods(_this4.getPaymentId(response.order.properties));
      }).fail(function () {// TODO add error msg
      });
    }
  },
  computed: {
    showIsSwitchableWarning: function showIsSwitchableWarning() {
      var _this5 = this;

      var currentPaymentMethod = this.compAllowedPaymentMethods.find(function (paymentMethod) {
        return paymentMethod.id === _this5.paymentMethod;
      });

      if (currentPaymentMethod) {
        return !currentPaymentMethod.isSwitchableFrom;
      }

      return false;
    }
  }
});

},{"services/ApiService":275,"services/ModalService":278,"services/TranslationService":280}],204:[function(require,module,exports){
"use strict";

Vue.component("history", {
  props: {
    template: String,
    ordersPerPage: Number,
    isReturnActive: Boolean,
    contactHasReturns: Boolean
  },
  data: function data() {
    return {
      returnsFirstOpened: false
    };
  },
  methods: {
    returnsTabsOpened: function returnsTabsOpened() {
      if (!this.returnsFirstOpened) {
        this.returnsFirstOpened = true;
        vueEventHub.$emit("returns-first-opening");
      }
    }
  }
});

},{}],205:[function(require,module,exports){
"use strict";

Vue.component("my-account", {
  template: "\n    <div>\n        <slot>\n        </slot>\n    </div>\n    ",
  props: {
    deliveryAddressList: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    selectedDeliveryAddress: {
      type: Number,
      "default": -99
    },
    billingAddressList: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    selectedBillingAddress: {
      type: Number,
      "default": 0
    }
  },
  created: function created() {
    this.$store.dispatch("initBillingAddress", {
      id: this.selectedBillingAddress,
      addressList: this.billingAddressList
    });
    this.$store.dispatch("initDeliveryAddress", {
      id: this.selectedDeliveryAddress,
      addressList: this.deliveryAddressList
    });
  }
});

},{}],206:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.component("order-documents", {
  props: {
    template: {
      type: String,
      "default": "#vue-order-documents"
    },
    documents: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    type: {
      type: String,
      "default": "order"
    },
    allowedTypesForOrders: {
      type: Array,
      "default": function _default() {
        return ["invoice", "invoice_external", "delivery_note", "order_confirmation", "pickup_delivery", "reversal_document"];
      }
    },
    allowedTypesForReturns: {
      type: Array,
      "default": function _default() {
        return ["return_note"];
      }
    }
  },
  computed: {
    activeDocuments: function activeDocuments() {
      var _this = this;

      if (this.type === "order") {
        return this.documents.filter(function (document) {
          return _this.allowedTypesForOrders.includes(document.type);
        });
      }

      return this.documents.filter(function (document) {
        return _this.allowedTypesForReturns.includes(document.type);
      });
    }
  },
  methods: {
    getTypeName: function getTypeName(type) {
      return {
        correction_document: _TranslationService["default"].translate("Ceres::Template.myAccountOrderDocumentsCorrectionDocument"),
        credit_note: _TranslationService["default"].translate("Ceres::Template.myAccountOrderDocumentsCreditNote"),
        delivery_note: _TranslationService["default"].translate("Ceres::Template.myAccountOrderDocumentsDeliveryNote"),
        dunning_letter: _TranslationService["default"].translate("Ceres::Template.myAccountOrderDocumentsDunningLetter"),
        invoice_external: _TranslationService["default"].translate("Ceres::Template.myAccountOrderDocumentsInvoiceExternal"),
        invoice: _TranslationService["default"].translate("Ceres::Template.myAccountOrderDocumentsInvoice"),
        offer: _TranslationService["default"].translate("Ceres::Template.myAccountOrderDocumentsOffer"),
        order_confirmation: _TranslationService["default"].translate("Ceres::Template.myAccountOrderDocumentsOrderConfirmation"),
        pickup_delivery: _TranslationService["default"].translate("Ceres::Template.myAccountOrderDocumentsPickupDelivery"),
        pro_forma_invoice: _TranslationService["default"].translate("Ceres::Template.myAccountOrderDocumentsProFormaInvoice"),
        receipt: _TranslationService["default"].translate("Ceres::Template.myAccountOrderDocumentsReceipt"),
        return_note: _TranslationService["default"].translate("Ceres::Template.myAccountOrderDocumentsReturnNote"),
        success_confirmation: _TranslationService["default"].translate("Ceres::Template.myAccountOrderDocumentsSuccessConfirmation"),
        reversal_document: _TranslationService["default"].translate("Ceres::Template.myAccountOrderDocumentsReversalDocument")
      }[type];
    },
    getDownloadTooltip: function getDownloadTooltip(type) {
      return _TranslationService["default"].translate("Ceres::Template.orderHistoryOpenDocument", {
        documentName: this.getTypeName(type)
      });
    }
  }
});

},{"services/TranslationService":280}],207:[function(require,module,exports){
"use strict";

var ApiService = require("services/ApiService");

Vue.component("order-history", {
  delimiters: ["${", "}"],
  props: {
    template: {
      type: String,
      "default": "#vue-order-history"
    },
    orderDetailsTemplate: {
      type: String,
      "default": "Ceres::Checkout.OrderDetails"
    }
  },
  data: function data() {
    return {
      currentOrder: null,
      isLoading: false
    };
  },
  methods: {
    setCurrentOrder: function setCurrentOrder(order) {
      var _this = this;

      $("#dynamic-twig-content").html("");
      this.isLoading = true;
      this.currentOrder = order;
      Vue.nextTick(function () {
        $(_this.$refs.orderDetails).modal("show");
      });
      ApiService.get("/rest/io/order/template?template=" + this.orderDetailsTemplate + "&orderId=" + order.order.id).done(function (response) {
        _this.isLoading = false;
        $("#dynamic-twig-content").html(response);
      });
    }
  }
});

},{"services/ApiService":275}],208:[function(require,module,exports){
"use strict";

var _ApiService = _interopRequireDefault(require("services/ApiService"));

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

var _NotificationService = _interopRequireDefault(require("services/NotificationService"));

var _utils = require("../../helper/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.component("order-history-list", {
  props: {
    template: {
      type: String,
      "default": "#vue-order-history-list"
    },
    ordersPerPage: {
      type: Number,
      "default": 5
    },
    allowPaymentProviderChange: {
      type: Boolean,
      "default": false
    },
    allowReturn: {
      type: Boolean,
      "default": true
    },
    initialData: {
      type: Object,
      "default": null
    }
  },
  data: function data() {
    return {
      waiting: false,
      orderList: {},
      page: 1
    };
  },
  created: function created() {
    if (!(0, _utils.isNullOrUndefined)(this.initialData)) {
      this.orderList = this.initialData;
    } else {
      this.setPage(1);
    }
  },
  computed: {
    showTrackingColumn: function showTrackingColumn() {
      if ((0, _utils.isDefined)(this.orderList.entries)) {
        return this.orderList.entries.filter(function (entry) {
          return !!entry.trackingURL;
        }).length;
      }

      return false;
    }
  },
  methods: {
    setPage: function setPage() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      if (!this.waiting) {
        this.waiting = true;
        var lastPage = this.orderList.page;
        this.orderList.page = page;

        _ApiService["default"].get("/rest/io/customer/order/list", {
          page: page,
          items: this.ordersPerPage
        }).done(function (response) {
          _this.waiting = false;
          _this.orderList = response;
        }).fail(function (response) {
          _this.waiting = false;
          _this.orderList.page = lastPage;

          _NotificationService["default"].error(_TranslationService["default"].translate("Ceres::Template.returnHistoryOops"));
        });
      }
    }
  }
});

},{"../../helper/utils":271,"services/ApiService":275,"services/NotificationService":279,"services/TranslationService":280}],209:[function(require,module,exports){
"use strict";

var _ApiService = _interopRequireDefault(require("services/ApiService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.component("order-history-list-item", {
  props: {
    template: {
      type: String,
      "default": "#vue-order-history-list-item"
    },
    orderDetailsTemplate: {
      type: String,
      "default": "Ceres::MyAccount.Partials.OrderHistoryListItemDetails"
    },
    order: {
      type: Object,
      required: true
    },
    allowPaymentProviderChange: {
      type: Boolean,
      "default": true
    },
    allowReturn: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {
      waiting: false,
      isDataLoaded: false,
      showAllOrderItems: false
    };
  },
  methods: {
    loadOrderDetailTemplate: function loadOrderDetailTemplate() {
      var _this = this;

      if (!this.waiting && !this.isDataLoaded) {
        this.waiting = true;

        _ApiService["default"].get("/rest/io/order/template?template=" + this.orderDetailsTemplate + "&orderId=" + this.order.id).done(function (orderDetails) {
          var compiled = Vue.compile(orderDetails);
          var component = new Vue({
            data: {
              showAllOrderItems: _this.showAllOrderItems,
              allowPaymentProviderChange: _this.allowPaymentProviderChange,
              allowReturn: _this.allowReturn
            },
            store: window.ceresStore,
            render: compiled.render,
            staticRenderFns: compiled.staticRenderFns
          });
          component.$mount(_this.$refs.orderDetailsContainer);
          _this.isDataLoaded = true;
        }).always(function () {
          _this.waiting = true;
        });
      }
    }
  }
});

},{"services/ApiService":275}],210:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ApiService = require("services/ApiService");

var NotificationService = require("services/NotificationService");

Vue.component("order-return-history", {
  props: ["template", "itemsPerPage", "showFirstPage", "showLastPage"],
  data: function data() {
    return {
      waiting: false,
      returnsList: {
        page: 1
      }
    };
  },
  created: function created() {
    var _this = this;

    this.itemsPerPage = this.itemsPerPage || 10;
    vueEventHub.$on("returns-first-opening", function () {
      return _this.setPage(1);
    });
  },
  methods: {
    setPage: function setPage(page) {
      var _this2 = this;

      if (!this.waiting) {
        this.waiting = true;
        var lastPage = this.returnsList.page;
        this.returnsList.page = page;
        ApiService.get("/rest/io/customer/order/return", {
          page: page,
          items: this.itemsPerPage
        }).done(function (response) {
          _this2.waiting = false;
          _this2.returnsList = response;
        }).fail(function (response) {
          _this2.waiting = false;
          _this2.returnsList.page = lastPage;
          NotificationService.error(_TranslationService["default"].translate("Ceres::Template.returnHistoryOops"));
        });
      }
    }
  }
});

},{"services/ApiService":275,"services/NotificationService":279,"services/TranslationService":280}],211:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.component("order-return-history-item", {
  props: {
    template: {
      type: String,
      "default": "#vue-order-return-history-item"
    },
    returnOrder: {
      type: Object,
      "default": function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      itemsToRender: []
    };
  },
  created: function created() {
    this.itemsToRender = this.returnOrder.order.orderItems.slice(0, 4);
  },
  methods: {
    toggleNaming: function toggleNaming(element) {
      if (document.getElementById(element).innerText === _TranslationService["default"].translate("Ceres::Template.returnHistoryReturnShowMore")) {
        this.itemsToRender = this.returnOrder.order.orderItems;
        document.getElementById(element).innerText = _TranslationService["default"].translate("Ceres::Template.returnHistoryReturnShowLess");
      } else {
        this.itemsToRender = this.returnOrder.order.orderItems.slice(0, 4);
        document.getElementById(element).innerText = _TranslationService["default"].translate("Ceres::Template.returnHistoryReturnShowMore");
      }
    },
    getOriginOrderId: function getOriginOrderId(order) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = order.orderReferences[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var orderRef = _step.value;

          if (orderRef.referenceType === "parent") {
            return orderRef.referenceOrderId;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return "-";
    }
  }
});

},{"services/TranslationService":280}],212:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ApiService = require("services/ApiService");

var NotificationService = require("services/NotificationService");

Vue.component("order-return-history-list", {
  props: {
    template: {
      type: String,
      "default": "#vue-order-return-history-list"
    },
    returnsPerPage: {
      type: Number,
      "default": 5
    },
    initialData: {
      type: Object,
      "default": null
    }
  },
  data: function data() {
    return {
      waiting: false,
      returnsList: {
        page: 1
      }
    };
  },
  created: function created() {
    if (!(0, _utils.isNullOrUndefined)(this.initialData)) {
      this.returnsList = this.initialData;
    } else {
      this.setPage(1);
    }
  },
  methods: {
    setPage: function setPage(page) {
      var _this = this;

      if (!this.waiting) {
        this.waiting = true;
        var lastPage = this.returnsList.page;
        this.returnsList.page = page;
        ApiService.get("/rest/io/customer/order/return", {
          page: page,
          items: this.returnsPerPage
        }).done(function (response) {
          _this.waiting = false;
          _this.returnsList = response;
        }).fail(function (response) {
          _this.waiting = false;
          _this.returnsList.page = lastPage;
          NotificationService.error(_TranslationService["default"].translate("Ceres::Template.returnHistoryOops"));
        });
      }
    }
  }
});

},{"../../helper/utils":271,"services/ApiService":275,"services/NotificationService":279,"services/TranslationService":280}],213:[function(require,module,exports){
"use strict";

Vue.component("order-return-history-list-item", {
  props: {
    template: {
      type: String,
      "default": "#vue-order-return-history-list-item"
    },
    returnOrder: {
      type: Object,
      // eslint-disable-next-line
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      itemsToRender: [],
      showAllOrderItems: false
    };
  },
  created: function created() {
    this.itemsToRender = this.returnOrder.order.orderItems.slice(0, 5);
  },
  methods: {
    toggleShowAllOrderItems: function toggleShowAllOrderItems() {
      this.showAllOrderItems = !this.showAllOrderItems;

      if (this.showAllOrderItems) {
        this.itemsToRender = this.returnOrder.order.orderItems;
      } else {
        this.itemsToRender = this.returnOrder.order.orderItems.slice(0, 5);
      }
    },
    getOriginOrderId: function getOriginOrderId(order) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = order.orderReferences[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var orderRef = _step.value;

          if (orderRef.referenceType === "parent") {
            return orderRef.referenceOrderId;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return "-";
    }
  }
});

},{}],214:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

var _ValidationService = _interopRequireDefault(require("services/ValidationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ApiService = require("services/ApiService");

var NotificationService = require("services/NotificationService");

Vue.component("newsletter-input", {
  props: {
    template: {
      type: String,
      "default": "#vue-newsletter-input"
    },
    showNameInputs: {
      type: Boolean,
      "default": false
    },
    showPrivacyPolicyCheckbox: {
      type: Boolean,
      "default": true
    },
    emailFolder: {
      type: Number,
      "default": 0
    }
  },
  data: function data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      isDisabled: false,
      privacyPolicyValue: false
    };
  },
  methods: {
    validateData: function validateData() {
      var _this = this;

      this.isDisabled = true;

      _ValidationService["default"].validate($("#newsletter-input-form_" + this._uid)).done(function () {
        _this.save();
      }).fail(function (invalidFields) {
        _ValidationService["default"].markInvalidFields(invalidFields, "error");

        _this.isDisabled = false;
      });
    },
    save: function save() {
      var _this2 = this;

      ApiService.post("/rest/io/customer/newsletter", {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        emailFolder: this.emailFolder
      }).done(function () {
        NotificationService.success(_TranslationService["default"].translate("Ceres::Template.newsletterSuccessMessage")).closeAfter(3000);

        _this2.resetInputs();
      }).fail(function () {
        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.newsletterErrorMessage")).closeAfter(5000);
      }).always(function () {
        _this2.isDisabled = false;
      });
    },
    resetInputs: function resetInputs() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.privacyPolicyValue = false;
    }
  }
});

},{"services/ApiService":275,"services/NotificationService":279,"services/TranslationService":280,"services/ValidationService":282}],215:[function(require,module,exports){
"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("order-return", {
  props: ["initOrderData", "template"],
  data: function data() {
    return {
      isLoading: false
    };
  },
  created: function created() {
    this.$store.commit("setOrderReturnData", this.initOrderData);
  },
  computed: Vuex.mapState({
    orderData: function orderData(state) {
      return state.orderReturn.orderData;
    },
    orderReturnItems: function orderReturnItems(state) {
      return state.orderReturn.orderReturnItems;
    },
    isDisabled: function isDisabled(state) {
      return state.orderReturn.orderReturnItems.length === 0;
    }
  }),
  methods: _objectSpread({
    showConfirmationModal: function showConfirmationModal() {
      $(this.$refs.orderReturnConfirmation).modal("show");
    },
    sendReturnItems: function sendReturnItems() {
      var _this = this;

      this.isLoading = true;
      this.sendOrderReturn().then(function (response) {
        window.open("/return-confirmation", "_self");
        $(_this.$refs.orderReturnConfirmation).modal("hide");
      }, function (error) {
        _this.isLoading = false;
        $(_this.$refs.orderReturnConfirmation).modal("hide");
      });
    },
    selectAllItems: function selectAllItems() {
      vueEventHub.$emit("select-all-items");
    }
  }, Vuex.mapMutations(["updateOrderReturnNote"]), Vuex.mapActions(["sendOrderReturn"]))
});

},{}],216:[function(require,module,exports){
"use strict";

Vue.component("order-return-item", {
  props: ["orderItem", "template"],
  data: function data() {
    return {
      isChecked: false,
      returnCount: 0
    };
  },
  created: function created() {
    var _this = this;

    vueEventHub.$on("select-all-items", function () {
      return _this.selectItem();
    });
  },
  computed: {
    orderItemImage: function orderItemImage() {
      return this.$store.getters.getOrderItemImage(this.orderItem.itemVariationId);
    },
    orderItemURL: function orderItemURL() {
      return this.$store.getters.getOrderItemURL(this.orderItem.itemVariationId);
    }
  },
  methods: {
    validateValue: function validateValue() {
      if (this.returnCount > this.orderItem.quantity) {
        this.returnCount = this.orderItem.quantity;
      } else if (this.returnCount <= 0) {
        this.returnCount = 1;
      }

      this.$store.commit("updateOrderReturnItems", {
        quantity: parseInt(this.returnCount),
        orderItem: this.orderItem
      });
    },
    selectItem: function selectItem() {
      this.isChecked = true;
      this.updateValue();
    },
    updateValue: function updateValue() {
      if (this.isChecked) {
        this.returnCount = this.orderItem.quantity;
      } else {
        this.returnCount = 0;
      }

      this.$store.commit("updateOrderReturnItems", {
        quantity: parseInt(this.returnCount),
        orderItem: this.orderItem
      });
    }
  }
});

},{}],217:[function(require,module,exports){
"use strict";

Vue.component("carousel", {
  components: {
    SlotComponent: {
      functional: true,
      render: function render(createElement, context) {
        return context.props.vnode;
      }
    }
  },
  props: {
    template: {
      type: String,
      "default": "#vue-carousel"
    },
    itemsPerPage: {
      type: Number,
      "default": 4
    }
  },
  data: function data() {
    return {
      itemCount: 0
    };
  },
  computed: {
    columnWidths: function columnWidths() {
      var itemsPerPage = this.itemsPerPage;

      if (itemsPerPage < 1) {
        itemsPerPage = 1;
      } else if (itemsPerPage > 4) {
        itemsPerPage = 4;
      }

      return ["col-12", itemsPerPage === 1 ? "col-sm-12" : "col-sm-6", "col-md-" + 12 / itemsPerPage];
    }
  },
  created: function created() {
    if (this.$slots.items) {
      this.itemCount = this.$slots.items.length;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.itemCount > _this.itemsPerPage) {
        _this.initializeCarousel();
      }
    });
  },
  methods: {
    initializeCarousel: function initializeCarousel() {
      var self = this;
      $(this.$refs.carouselContainer).owlCarousel({
        autoHeight: true,
        dots: true,
        items: self.itemsPerPage,
        responsive: {
          0: {
            items: 1
          },
          576: {
            items: self.itemsPerPage > 1 ? 2 : 1
          },
          768: {
            items: self.itemsPerPage > 3 ? 3 : self.itemsPerPage
          },
          992: {
            items: self.itemsPerPage
          }
        },
        lazyLoad: false,
        loop: false,
        margin: 30,
        mouseDrag: true,
        nav: true,
        navClass: ["owl-single-item-nav left carousel-control list-control-special", "owl-single-item-nav right carousel-control list-control-special"],
        navContainerClass: "",
        navText: ["<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>", "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"],
        smartSpeed: 350,
        onChanged: function onChanged(property) {
          var begin = property.item.index;
          var end = begin + property.page.size;

          for (var i = begin; i < end; i++) {
            var childComponent = self.$children[i];

            if (childComponent && childComponent.loadFirstImage) {
              childComponent.loadFirstImage();
            }
          }
        }
      });
    }
  }
});

},{}],218:[function(require,module,exports){
"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("mobile-navigation", {
  props: ["template", "initialCategory"],
  jsonDataFields: ["navigationTreeData"],
  data: function data() {
    return {
      dataContainer1: [],
      dataContainer2: [],
      useFirstContainer: false,
      breadcrumbs: []
    };
  },
  computed: _objectSpread({
    parentCategories: function parentCategories() {
      var dataContainer = this.useFirstContainer ? this.dataContainer2 : this.dataContainer1;

      if (dataContainer[0] && dataContainer[0].parent) {
        if (dataContainer[0].parent.parent) {
          // returns upper level
          return dataContainer[0].parent.parent.children;
        } // return highest level of navigation


        return this.navigationTree;
      }

      return false;
    }
  }, Vuex.mapState({
    navigationTree: function navigationTree(state) {
      return state.navigation.tree;
    }
  })),
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.initNavigation();
    });
  },
  methods: {
    initNavigation: function initNavigation() {
      this.$store.dispatch("initNavigationTree", this.navigationTreeData);

      if (this.initialCategory && this.initialCategory.id) {
        if (this.initialCategory.linklist === "N") {
          this.$store.commit("setCurrentCategory", this.initialCategory);
        } else {
          this.$store.dispatch("setCurrentCategoryById", {
            categoryId: parseInt(this.initialCategory.id)
          });
          this.initialSlide(this.$store.state.navigation.currentCategory);
        }
      }

      this.dataContainer1 = this.navigationTree;
    },
    initialSlide: function initialSlide(currentCategory) {
      if (currentCategory) {
        if (currentCategory.children && currentCategory.showChildren) {
          this.slideTo(currentCategory.children);
        } else if (currentCategory.parent) {
          this.slideTo(currentCategory.parent.children);
        }
      }
    },
    slideTo: function slideTo(children, back) {
      back = !!back;

      if (this.useFirstContainer) {
        this.dataContainer1 = children;
        $("#menu-2").trigger("menu-deactivated", {
          back: back
        });
        $("#menu-1").trigger("menu-activated", {
          back: back
        });
      } else {
        this.dataContainer2 = children;
        $("#menu-1").trigger("menu-deactivated", {
          back: back
        });
        $("#menu-2").trigger("menu-activated", {
          back: back
        });
      }

      this.useFirstContainer = !this.useFirstContainer;
      this.buildBreadcrumbs();
    },
    buildBreadcrumbs: function buildBreadcrumbs() {
      this.breadcrumbs = [];
      var root = this.useFirstContainer ? this.dataContainer2[0] : this.dataContainer1[0];

      while (root.parent) {
        this.breadcrumbs.unshift({
          name: root.parent.details[0].name,
          layer: root.parent ? root.parent.children : this.navigationTree
        });
        root = root.parent;
      }
    },
    closeNavigation: function closeNavigation() {
      document.querySelector(".mobile-navigation").classList.remove("open");
      document.querySelector("body").classList.remove("menu-is-visible");
    }
  },
  directives: {
    menu: {
      bind: function bind(el) {
        // add "activated" classes when menu is activated
        $(el).on("menu-activated", function (event, params) {
          $(event.target).addClass("menu-active");
          $(event.target).addClass(params.back ? "animate-inFromLeft" : "animate-inFromRight");
        }); // add "deactivated" classes when menu is deactivated

        $(el).on("menu-deactivated", function (event, params) {
          $(event.target).removeClass("menu-active");
          $(event.target).addClass(params.back ? "animate-outToRight" : "animate-outToLeft");
        }); // this removes the animation class automatically after the animation has completed

        $(el).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
          $(".mainmenu").removeClass(function (index, className) {
            return (className.match(/(^|\s)animate-\S+/g) || []).join(" ");
          });
        });
      }
    }
  }
});

},{}],219:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

var NotificationService = require("services/NotificationService");

Vue.component("notifications", {
  delimiters: ["${", "}"],
  props: ["initialNotifications", "template"],
  data: function data() {
    return {
      notifications: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      NotificationService.listen(function (notifications) {
        Vue.set(_this, "notifications", notifications);
      });

      _this.showInitialNotifications();
    });
  },
  methods: {
    /**
     * Dissmiss the notification
     * @param notification
     */
    dismiss: function dismiss(notification) {
      NotificationService.getNotifications().remove(notification);
    },

    /**
     * show initial notifications from server
     */
    showInitialNotifications: function showInitialNotifications() {
      for (var type in this.initialNotifications) {
        var notification = this.initialNotifications[type];

        if ((0, _utils.isNullOrUndefined)(notification)) {
          continue;
        } // type cannot be undefined


        if (!(0, _utils.isNullOrUndefined)(NotificationService[type]) && typeof NotificationService[type] === "function") {
          NotificationService[type](notification);
        } else {
          // unkown type
          NotificationService.log(notification);
        }
      }
    }
  }
});

},{"../../helper/utils":271,"services/NotificationService":279}],220:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

var _dom = require("../../helper/dom");

var Popper = require("popper.js");

var ModalService = require("services/ModalService");

Vue.component("popper", {
  delimiters: ["${", "}"],
  props: {
    template: {
      type: String,
      "default": "#vue-popper"
    },
    placement: {
      type: String,
      "default": "auto"
    },
    trigger: {
      type: String,
      "default": "click"
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (!(0, _utils.isNullOrUndefined)(_this.$refs.node) && !(0, _utils.isNullOrUndefined)(_this.$refs.handle)) {
        var node = _this.$refs.node;
        node.parentElement.removeChild(node);
        document.body.appendChild(node);
        _this.popper = new Popper(_this.$refs.handle, node, {
          placement: _this.placement,
          modifiers: {
            arrow: {
              element: _this.$refs.arrow
            }
          }
        });
        var handle = _this.$refs.handle.firstElementChild || _this.$refs.handle;

        if (_this.trigger === "focus") {
          handle.addEventListener("focus", function () {
            _this.showPopper();
          });
          handle.addEventListener("blur", function () {
            _this.hidePopper();
          });
        } else {
          handle.addEventListener(_this.trigger, function () {
            _this.togglePopper();
          });
        }
      }

      var parentModal = (0, _dom.findParent)(_this.$el, ".modal");

      if (!(0, _utils.isNullOrUndefined)(parentModal)) {
        ModalService.findModal(parentModal).on("hide.bs.modal", function () {
          _this.hidePopper();
        });
      }
    });
  },
  data: function data() {
    return {
      isVisible: false,
      popper: null
    };
  },
  methods: {
    togglePopper: function togglePopper() {
      this.isVisible = !this.isVisible;
      this.update();
    },
    showPopper: function showPopper() {
      this.isVisible = true;
      this.update();
    },
    hidePopper: function hidePopper() {
      this.isVisible = false;
      this.update();
    },
    update: function update() {
      if (!(0, _utils.isNullOrUndefined)(this.popper)) {
        this.popper.scheduleUpdate();
      }
    }
  }
});

},{"../../helper/dom":266,"../../helper/utils":271,"popper.js":136,"services/ModalService":278}],221:[function(require,module,exports){
"use strict";

var _UrlService = require("../../services/UrlService");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.component("shipping-country-select", {
  props: {
    template: {
      type: String,
      "default": "#vue-shipping-country-select"
    },
    disableInput: {
      type: Boolean
    },
    openBasketPreview: {
      type: Boolean
    }
  },
  computed: _objectSpread({
    isDisabled: function isDisabled() {
      return !!this.basket.customerInvoiceAddressId || !!this.basket.customerShippingAddressId || this.disableInput;
    }
  }, Vuex.mapState({
    localization: function localization(state) {
      return state.localization;
    },
    basket: function basket(state) {
      return state.basket.data;
    }
  }), Vuex.mapGetters(["getCountryName"])),
  created: function created() {
    (0, _UrlService.removeUrlParam)("openBasketPreview");
  },
  methods: {
    setShippingCountry: function setShippingCountry(id) {
      if (!this.isDisabled) {
        this.$store.dispatch("selectShippingCountry", {
          shippingCountryId: id,
          openBasketPreview: this.openBasketPreview
        });
      }
    }
  }
});

},{"../../services/UrlService":281}],222:[function(require,module,exports){
"use strict";

var ApiService = require("services/ApiService");

Vue.component("shop-country-settings", {
  template: "<div><slot></slot></div>",
  props: {
    shippingCountryId: Number
  },
  jsonDataFields: ["shippingCountries"],
  created: function created() {
    var _this = this;

    this.$store.commit("setShippingCountries", this.shippingCountries);
    this.$store.commit("setShippingCountryId", this.shippingCountryId);
    ApiService.listen("LocalizationChanged", function (data) {
      _this.$store.commit("setShippingCountries", data.localization.activeShippingCountries);

      _this.$store.commit("setShippingCountryId", data.localization.currentShippingCountryId);
    });
  }
});

},{"services/ApiService":275}],223:[function(require,module,exports){
"use strict";

var WaitScreenService = require("services/WaitScreenService");
/**
*
* CURRENTLY NOT IN USE
* MAY BE USEFUL LATER
*
*/


Vue.component("wait-screen", {
  // template: "#vue-wait-screen", NEED TO IMPLEMENT TEMPLATE IN COMPONENT
  delimiters: ["${", "}"],
  props: ["template"],
  data: function data() {
    return {
      overlay: WaitScreenService.getOverlay()
    };
  },
  computed: {
    /**
     * Show an overlay over the page
     * @returns {boolean}
     */
    visible: function visible() {
      return this.overlay.count > 0;
    }
  }
});

},{"services/WaitScreenService":284}],224:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NotificationService = require("services/NotificationService");

Vue.component("wish-list", {
  delimiters: ["${", "}"],
  props: ["template", "initIds"],
  data: function data() {
    return {
      isLoading: false,
      wishListCount: {}
    };
  },
  computed: Vuex.mapState({
    wishListItems: function wishListItems(state) {
      return state.wishList.wishListItems;
    },
    wishListIds: function wishListIds(state) {
      return state.wishList.wishListIds;
    }
  }),
  created: function created() {
    var _this = this;

    this.$store.commit("setWishListIds", this.initIds);
    this.isLoading = true;
    this.initWishListItems(this.wishListIds).then(function (response) {
      _this.isLoading = false;
    }, function (error) {
      _this.isLoading = false;
    });
  },
  methods: _objectSpread({
    removeItem: function removeItem(item) {
      this.removeWishListItem(item).then(function () {
        return NotificationService.success(_TranslationService["default"].translate("Ceres::Template.wishListRemoved"));
      });
    }
  }, Vuex.mapActions(["initWishListItems", "removeWishListItem"]))
});

},{"services/NotificationService":279,"services/TranslationService":280}],225:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

var ApiService = require("services/ApiService");

Vue.component("wish-list-count", {
  props: {
    template: {
      type: String,
      "default": "#vue-wish-list-count"
    }
  },
  computed: {
    wishListCount: function wishListCount() {
      return this.$store.getters.wishListCount;
    }
  },
  created: function created() {
    var _this = this;

    ApiService.get("/rest/io/itemWishList", {}, {
      keepOriginalResponse: true
    }).done(function (response) {
      if ((0, _utils.isDefined)(response.data)) {
        _this.$store.commit("setWishListIds", response.data);
      }
    });
  }
});

},{"../../helper/utils":271,"services/ApiService":275}],226:[function(require,module,exports){
"use strict";

var _number = require("../../helper/number");

var _utils = require("../../helper/utils");

Vue.directive("basket-item-quantity", {
  update: function update(el, binding) {
    var value = (0, _utils.defaultValue)(binding.value, 0);
    var decimals = (0, _number.floatLength)(value);
    el.innerHTML = value.toFixed(decimals).replace(".", App.decimalSeparator);
  }
});

},{"../../helper/number":268,"../../helper/utils":271}],227:[function(require,module,exports){
"use strict";

Vue.directive("basket-item-sum", {
  update: function update(el, binding) {
    el.innerHTML = Vue.filter("currency").apply(Object, [binding.value]);
  }
});

},{}],228:[function(require,module,exports){
"use strict";

Vue.directive("toggle-basket-preview", {
  bind: function bind(el) {
    el.addEventListener("click", function (event) {
      var vueApp = document.querySelector("#vue-app");

      if (vueApp) {
        var basketOpenClass = App.config.basket.previewType === "right" ? "open-right" : "open-hover";
        vueApp.classList.toggle(basketOpenClass || "open-hover");
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }
});

},{}],229:[function(require,module,exports){
"use strict";

var _UrlService = require("services/UrlService");

var ApiService = require("services/ApiService");

Vue.directive("logout", {
  bind: function bind(el) {
    /**
     * Logout the current user
     */
    $(el).click(function (event) {
      $(el).addClass("disabled");
      ApiService.post("/rest/io/customer/logout").done(function () {
        var url = window.location.origin;

        if (App.defaultLanguage != App.language) {
          url = url + "/" + App.language;

          if (App.urlTrailingSlash) {
            url += "/";
          }
        }

        (0, _UrlService.navigateTo)(url);
      }).fail(function () {
        $(el).removeClass("disabled");
      });
      event.preventDefault();
    });
  }
});

},{"services/ApiService":275,"services/UrlService":281}],230:[function(require,module,exports){
"use strict";

var _index = _interopRequireDefault(require("../../store/index"));

var _utils = require("../../helper/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.directive("populate-store", {
  bind: function bind(el, binding) {
    var name = binding.value.name;
    var data = binding.value.data;
    var type = binding.arg;

    if ((0, _utils.isDefined)(name)) {
      if (type === "action") {
        _index["default"].dispatch(name, data);
      } else if (type === "mutation") {
        _index["default"].commit(name, data);
      }
    }
  }
});

},{"../../helper/utils":271,"../../store/index":285}],231:[function(require,module,exports){
"use strict";

Vue.directive("validate", {
  bind: function bind(el, binding) {
    if (binding.value !== false) {
      el.dataset.validate = binding.arg || "";
    }
  },
  update: function update(el, binding) {
    if (binding.value === false) {
      delete el.dataset.validate;
    } else {
      el.dataset.validate = binding.arg || "";
    }
  }
});

},{}],232:[function(require,module,exports){
"use strict";

Vue.directive("waiting-animation", {
  bind: function bind(el) {
    el.initialClass = el.className;
    el.waitingClass = el.getAttribute("waiting-class") || "fa fa-circle-o-notch fa-spin";
  },
  update: function update(el, binding) {
    if (binding.value) {
      el.className = "";
      el.className = el.waitingClass;

      if (el.initialClass.includes("fa-lg")) {
        el.className += " fa-lg";
      }
    } else {
      el.className = el.initialClass;
    }
  }
});

},{}],233:[function(require,module,exports){
"use strict";

Vue.directive("waiting-animation-infinite", {
  bind: function bind(el) {
    $(el).click(function (event) {
      event.currentTarget.classList.add("disabled");
      event.currentTarget.children[0].className = "";
      event.currentTarget.children[0].className = "fa fa-circle-o-notch fa-spin";
    });
  }
});

},{}],234:[function(require,module,exports){
"use strict";

Vue.directive("navigation-touch-handler", {
  bind: function bind(el) {
    if (document.body.classList.contains("touch")) {
      var className = "hover";
      el.addEventListener("click", function (event) {
        var isHover = el.classList.contains(className);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = document.querySelectorAll(".ddown.hover")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var element = _step.value;
            element.classList.remove(className);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (isHover) {
          el.classList.remove(className);
        } else {
          el.classList.add(className);
          event.preventDefault();
        }
      });
    }
  }
});

},{}],235:[function(require,module,exports){
"use strict";

Vue.directive("open-mobile-navigation", {
  bind: function bind(el, binding) {
    el.onclick = function (event) {
      document.querySelector(".mobile-navigation").classList.add("open");
      document.querySelector("body").classList.add("menu-is-visible");
    };
  }
});

},{}],236:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* !
 * A polyfill for object-fit
 *
 * @author: Toni Pinel
 *
 */
var copyComputedStyle = function copyComputedStyle(from, to) {
  var computedStyleObject = false; // trying to figure out which style object we need to use depense on the browser support
  // so we try until we have one

  computedStyleObject = from.currentStyle || document.defaultView.getComputedStyle(from, null); // if the browser dose not support both methods we will return null

  if (!computedStyleObject) {
    return;
  }

  var stylePropertyValid = function stylePropertyValid(value) {
    // checking that the value is not a undefined
    return typeof value !== "undefined" && _typeof(value) !== "object" && typeof value !== "function" && value.length > 0 && value !== parseInt(value);
  }; // we iterating the computed style object and compy the style props and the values


  for (var property in computedStyleObject) {
    // checking if the property and value we get are valid sinse browser have different implementations
    if (stylePropertyValid(computedStyleObject[property])) {
      // applying the style property to the target element
      to.style[property] = computedStyleObject[property];
    }
  }
};

var createDiv = function createDiv(el, binding) {
  var replacementDiv = document.createElement("div");
  copyComputedStyle(el, replacementDiv);
  replacementDiv.style.display = "block";
  replacementDiv.style.backgroundImage = "url( ".concat(el.src, " )");
  replacementDiv.style.backgroundPosition = "center center";
  replacementDiv.style.className = el.className;
  replacementDiv.style.backgroundRepeat = "no-repeat";

  switch (binding.value) {
    case "cover":
      replacementDiv.style.backgroundSize = "cover";
      break;

    case "contain":
      replacementDiv.style.backgroundSize = "contain";
      break;

    case "fill":
      replacementDiv.style.backgroundSize = "100% 100%";
      break;

    case "none":
      replacementDiv.style.backgroundSize = "auto";
      break;

    default:
      console.log("no object-fit");
  }

  el.parentNode.replaceChild(replacementDiv, el);
};

Vue.directive("ie-objectfit-polyfill", {
  inserted: function inserted(el, binding) {
    if (document.documentElement.classList.contains("ie")) {
      if (document.readyState === "complete" || document.readyState === "loaded") {
        createDiv(el, binding);
      } else {
        document.addEventListener("DOMContentLoaded", function () {
          createDiv(el, binding);
        });
      }
    }
  }
});

},{}],237:[function(require,module,exports){
"use strict";

Vue.directive("scroll-to-top", {
  bind: function bind(el, binding) {
    el.onclick = function (event) {
      $("html, body").animate({
        scrollTop: 0
      }, "slow");
    };
  }
});

},{}],238:[function(require,module,exports){
"use strict";

var _utils = require("../../helper/utils");

var _StickyElement = require("../../helper/StickyElement");

Vue.directive("stick-in-parent", {
  bind: function bind(el, binding, vnode) {
    el.__sticky = new _StickyElement.StickyElement(el, vnode.context, parseInt(binding.arg) || 768);

    if (binding.value === false) {
      el.__sticky.disable();
    } else {
      el.__sticky.enable();
    }
  },
  update: function update(el, binding) {
    if (!(0, _utils.isNullOrUndefined)(el.__sticky)) {
      el.__sticky.minWidth = parseInt(binding.arg) || 768;

      if (binding.value === false) {
        el.__sticky.disable();
      } else {
        el.__sticky.enable();
      }

      el.__sticky.checkMinWidth();
    }
  },
  unbind: function unbind(el) {
    if (!(0, _utils.isNullOrUndefined)(el.__sticky)) {
      el.__sticky.destroy();

      el.__sticky = null;
    }
  }
});

},{"../../helper/StickyElement":264,"../../helper/utils":271}],239:[function(require,module,exports){
"use strict";

var toggleTooltip = function toggleTooltip(el, disable) {
  $(el).tooltip(disable ? "disable" : "enable");
};

Vue.directive("tooltip", {
  unbind: function unbind(el) {
    $(el).tooltip("dispose");
  },
  update: function update(el, binding) {
    toggleTooltip(el, binding.value === false);
  },
  bind: function bind(el, binding) {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setTimeout(function () {
        $(el).tooltip();
        toggleTooltip(el, binding.value === false);
      }, 1);
    }
  }
});

},{}],240:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.exceptionMap = void 0;
var exceptionMap = new Map([["0", "errorActionIsNotExecuted"], ["1", "notificationsItemNotAdded"], ["2", "notificationsNotEnoughStockItem"], ["3", "notificationsInvalidResetPasswordUrl"], ["4", "notificationsCheckPassword"], ["5", "notificationsItemBundleSplitted"], ["6", "notificationsItemOutOfStock"], ["7", "newsletterOptOutSuccessMessage"], ["8", "newsletterOptInMessage"], ["9", "notificationsBasketItemsRemoved"], ["10", "notificationsBasketItemsRemovedForLanguage"], ["11", "notificationsNoEmailEntered"], ["110", "errorBasketItemVariationNotFound"], ["111", "errorBasketItemNotEnoughStockForVariation"], ["112", "errorBasketItemMaximumQuantityReachedForItem"], ["113", "errorBasketItemMaximumQuantityReachedForVariation"], ["114", "errorBasketItemMinimumQuantityNotReachedForVariation"], ["115", "errorCreateOrderRetryTimeNotReached"], ["301", "notificationRemoveCouponMinimumOrderValueIsNotReached"], ["302", "couponNoMatchingItemInBasket"], ["401", "notificationsCalculateShippingFailed"]]);
exports.exceptionMap = exceptionMap;
var _default = exceptionMap;
exports["default"] = _default;

},{}],241:[function(require,module,exports){
"use strict";

Vue.filter("arrayFirst", function (array) {
  return array[0];
});

},{}],242:[function(require,module,exports){
"use strict";

Vue.filter("attachText", function (item, text) {
  return text + item;
});

},{}],243:[function(require,module,exports){
"use strict";

var _MonetaryFormatter = _interopRequireDefault(require("../helper/MonetaryFormatter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var formatter = new _MonetaryFormatter["default"]();
Vue.filter("currency", function (price) {
  if (price === "N / A") {
    return price;
  }

  return formatter.format(parseFloat(price), App.activeCurrency);
});

},{"../helper/MonetaryFormatter":263}],244:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// for docs see https://github.com/brockpetrie/vue-moment
var dateFilter = function dateFilter() {
  var args = Array.prototype.slice.call(arguments);
  var input = args.shift();
  var date;

  if (isNaN(new Date(input).getTime())) {
    return input;
  }

  if (Array.isArray(input) && typeof input[0] === "string") {
    // If input is array, assume we're being passed a format pattern to parse against.
    // Format pattern will accept an array of potential formats to parse against.
    // Date string should be at [0], format pattern(s) should be at [1]
    date = moment(string = input[0], formats = input[1], true);
  } else {
    // Otherwise, throw the input at moment and see what happens...
    date = moment(input);
  }

  if (!date.isValid()) {
    // Log a warning if moment couldn't reconcile the input. Better than throwing an error?
    console.warn("Could not build a valid `moment` object from input.");
    return input;
  }

  function parse() {
    var args = Array.prototype.slice.call(arguments);
    var method = args.shift();

    switch (method) {
      case "add":
        // Mutates the original moment by adding time.
        // http://momentjs.com/docs/#/manipulating/add/
        var addends = args.shift().split(",").map(Function.prototype.call, String.prototype.trim);
        obj = {};

        for (var aId = 0; aId < addends.length; aId++) {
          var addend = addends[aId].split(" ");
          obj[addend[1]] = addend[0];
        }

        date = date.add(obj);
        break;

      case "subtract":
        // Mutates the original moment by subtracting time.
        // http://momentjs.com/docs/#/manipulating/subtract/
        var subtrahends = args.shift().split(",").map(Function.prototype.call, String.prototype.trim);
        obj = {};

        for (var sId = 0; sId < subtrahends.length; sId++) {
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

        if (moment(args[0]).isValid()) {
          // If valid, assume it is a date we want the output computed against.
          from = moment(args.shift());
        }

        var removeSuffix = false;

        if (args[0] === true) {
          args.shift();
          removeSuffix = true;
        }

        if (from != "now") {
          date = date.from(from, removeSuffix);
          break;
        }

        date = date.fromNow(removeSuffix);
        break;

      case "calendar":
        // Formats a date with different strings depending on how close to a certain date (today by default) the date is.
        // http://momentjs.com/docs/#/displaying/calendar-time/
        var referenceTime = moment();

        if (moment(args[0]).isValid()) {
          // If valid, assume it is a date we want the output computed against.
          referenceTime = moment(args.shift());
        }

        date = date.calendar(referenceTime);
        break;

      default:
        // Format
        // Formats a date by taking a string of tokens and replacing them with their corresponding values.
        // http://momentjs.com/docs/#/displaying/format/
        var format = method || _TranslationService["default"].translate("Ceres::Template.devDateFormatMoment");

        date = date.format(format);
    }

    if (args.length) parse.apply(parse, args);
  }

  parse.apply(parse, args);
  return date;
};

Vue.filter("moment", dateFilter);
Vue.filter("date", dateFilter);

},{"services/TranslationService":280}],245:[function(require,module,exports){
"use strict";

var _utils = require("../helper/utils");

Vue.filter("fileName", function (path) {
  var splitPath = path.split("/");
  var fileName = splitPath[splitPath.length - 1];
  var match = /^(Item\w+)_(Char\d+)_(\d{4})_(.*)$/.exec(fileName);

  if (!(0, _utils.isNullOrUndefined)(match) && !(0, _utils.isNullOrUndefined)(match[4])) {
    return match[4];
  }

  match = /^\w+_\d+_(.*)$/.exec(fileName);

  if (!(0, _utils.isNullOrUndefined)(match) && !(0, _utils.isNullOrUndefined)(match[1])) {
    return match[1];
  }

  return fileName;
});

},{"../helper/utils":271}],246:[function(require,module,exports){
"use strict";

Vue.filter("fileUploadPath", function (path) {
  var position = path.lastIndexOf("/");
  var prefix = App.urls.includeLanguage ? "/" + App.language : "";

  if (position <= 0) {
    return prefix + "/?GetOrderParamsFileName=" + path;
  }

  return prefix + "/order-property-file/" + path.substring(0, position) + "?filename=" + path.substring(position + 1);
});

},{}],247:[function(require,module,exports){
"use strict";

Vue.filter("graduatedPrice", function (item, quantity) {
  var graduatedPrices = item.prices.graduatedPrices;
  var returnPrice;

  if (graduatedPrices && graduatedPrices[0]) {
    var prices = graduatedPrices.filter(function (price) {
      return parseFloat(quantity) >= price.minimumOrderQuantity;
    });

    if (prices[0]) {
      returnPrice = prices.reduce(function (prev, current) {
        return prev.minimumOrderQuantity > current.minimumOrderQuantity ? prev : current;
      });
      returnPrice = returnPrice.unitPrice.value;
    }
  }

  return returnPrice || item.prices["default"].unitPrice.value;
});

},{}],248:[function(require,module,exports){
"use strict";

var _utils = require("../helper/utils");

Vue.filter("hasItemDefaultPrice", function (itemData) {
  var defaultPrice = itemData.prices["default"];
  return (0, _utils.isDefined)(defaultPrice) && !isNaN(defaultPrice.price.value);
});

},{"../helper/utils":271}],249:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.filter("inputUnit", function (basketItem) {
  var shortString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var result = "";

  if (shortString) {
    if (basketItem.inputWidth > 0) {
      result = "(" + _TranslationService["default"].translate("Ceres::Template.itemInputWidth");

      if (basketItem.inputLength > 0) {
        result += "/" + _TranslationService["default"].translate("Ceres::Template.itemInputLength") + ")";
      } else {
        result += ")";
      }
    } else if (basketItem.inputLength > 0) {
      result = "(" + _TranslationService["default"].translate("Ceres::Template.Length") + ")";
    }
  } else if (basketItem.inputWidth > 0) {
    result = basketItem.inputWidth + basketItem.variation.data.unit.htmlUnit;

    if (basketItem.inputLength > 0) {
      result += " * " + basketItem.inputLength + basketItem.variation.data.unit.htmlUnit;
    }
  } else if (basketItem.inputLength > 0) {
    result = basketItem.inputLength + basketItem.variation.data.unit.htmlUnit;
  }

  return result;
});

},{"services/TranslationService":280}],250:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.filter("itemBundleName", function (item) {
  var prefixName;

  if (item.bundleType === "bundle") {
    prefixName = item.orderItemName.replace("[BUNDLE]", "").trim();
    prefixName = _TranslationService["default"].translate("Ceres::Template.itemBundleName", {
      itemName: prefixName
    });
  } else if (item.bundleType == "bundle_item") {
    prefixName = item.orderItemName.replace("[-]", "").trim();
  } else {
    prefixName = item.orderItemName;
  }

  return prefixName;
});

},{"services/TranslationService":280}],251:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("../services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.filter("itemCrossPrice", function (crossPrice, isSpecialOffer) {
  if (isSpecialOffer) {
    return _TranslationService["default"].translate("Ceres::Template.crossPriceSpecialOffer", {
      price: crossPrice
    });
  }

  return _TranslationService["default"].translate("Ceres::Template.crossPriceRRP", {
    price: crossPrice
  });
});

},{"../services/TranslationService":280}],252:[function(require,module,exports){
"use strict";

Vue.filter("itemImage", function (itemImages, highestPosition) {
  if (itemImages.length === 0) {
    return "";
  }

  if (itemImages.length === 1) {
    return itemImages[0].url;
  }

  if (highestPosition) {
    return itemImages.reduce(function (prev, current) {
      return prev.position > current.position ? prev : current;
    }).url;
  }

  return itemImages.reduce(function (prev, current) {
    return prev.position < current.position ? prev : current;
  }).url;
});

},{}],253:[function(require,module,exports){
"use strict";

Vue.filter("itemImageAlternativeText", function (itemImages, highestPosition) {
  if (itemImages.length === 0) {
    return "";
  }

  if (itemImages.length === 1) {
    return itemImages[0].alternate;
  }

  if (highestPosition) {
    return itemImages.reduce(function (prev, current) {
      return prev.position > current.position ? prev : current;
    }).alternate;
  }

  return itemImages.reduce(function (prev, current) {
    return prev.position < current.position ? prev : current;
  }).alternate;
});

},{}],254:[function(require,module,exports){
"use strict";

Vue.filter("itemImages", function (images, accessor) {
  if (!images) {
    return [];
  }

  var imageUrls = [];
  var imagesAccessor = "all";

  if (images.variation && images.variation.length) {
    imagesAccessor = "variation";
  }

  for (var image in images[imagesAccessor]) {
    var imageUrl = images[imagesAccessor][image][accessor];
    var alternate = images[imagesAccessor][image].names ? images[imagesAccessor][image].names.alternate : null;
    imageUrls.push({
      url: imageUrl,
      position: images[imagesAccessor][image].position,
      alternate: alternate
    });
  }

  return imageUrls;
});

},{}],255:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.filter("itemName", function (_ref) {
  var _ref$texts = _ref.texts,
      name1 = _ref$texts.name1,
      name2 = _ref$texts.name2,
      name3 = _ref$texts.name3,
      _ref$variation = _ref.variation,
      name = _ref$variation.name,
      bundleType = _ref$variation.bundleType;
  var selectedName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : App.config.item.itemName;
  var itemDisplayName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : App.config.item.displayName;
  var itemName = "";

  if (selectedName === 1 && name2 !== "") {
    itemName = name2;
  } else if (selectedName === 2 && name3 !== "") {
    itemName = name3;
  } else {
    itemName = name1;
  }

  if (itemDisplayName === "itemNameVariationName" && name && name.length) {
    itemName = "".concat(itemName, " ").concat(name);
  }

  if (itemDisplayName === "variationName" && name && name.length) {
    itemName = name;
  }

  if (bundleType === "bundle") {
    itemName = _TranslationService["default"].translate("Ceres::Template.itemBundleName", {
      itemName: itemName
    });
  }

  return itemName;
});

},{"services/TranslationService":280}],256:[function(require,module,exports){
"use strict";

Vue.filter("specialOffer", function (defaultPrice, prices, priceType, exact) {
  var price;

  if (prices.specialOffer) {
    if (exact) {
      price = prices.specialOffer[priceType][exact] ? prices.specialOffer[priceType][exact] : defaultPrice;
    } else {
      price = prices.specialOffer[priceType] ? prices.specialOffer[priceType] : defaultPrice;
    }
  } else {
    price = defaultPrice;
  }

  return price;
});

},{}],257:[function(require,module,exports){
"use strict";

var _utils = require("../helper/utils");

Vue.filter("itemURL", function (item) {
  var enableOldUrlPattern = App.config.global.enableOldUrlPattern;
  var urlPath = item.texts.urlPath || "";
  var includeLanguage = !(0, _utils.isNullOrUndefined)(item.texts.lang) && App.defaultLanguage != item.texts.lang;
  var link = "";

  if (urlPath.charAt(0) !== "/") {
    link = "/";
  }

  if (includeLanguage) {
    link += item.texts.lang + "/";
  }

  if (urlPath && urlPath.length) {
    link += urlPath;
  }

  var suffix = "";

  if (enableOldUrlPattern) {
    suffix = "/a-" + item.item.id;
  } else {
    suffix = "_" + item.item.id + "_" + item.variation.id;
  }

  var trailingSlash = "";

  if (App.urlTrailingSlash) {
    trailingSlash = "/";
  }

  if (link.substr(link.length - suffix.length, suffix.length) === suffix) {
    return link + trailingSlash;
  }

  return link + suffix + trailingSlash;
});

},{"../helper/utils":271}],258:[function(require,module,exports){
"use strict";

var _utils = require("../helper/utils");

var _number = require("../helper/number");

Vue.filter("numberFormat", function (number, decimals, separator) {
  number = parseFloat(number);

  if (isNaN(number)) {
    return "";
  }

  if ((0, _utils.isNullOrUndefined)(decimals)) {
    decimals = (0, _number.floatLength)(number);
  }

  if ((0, _utils.isNullOrUndefined)(separator)) {
    separator = App.decimalSeparator;
  }

  return number.toFixed(decimals).replace(".", separator);
});

},{"../helper/number":268,"../helper/utils":271}],259:[function(require,module,exports){
"use strict";

Vue.filter("propertySurcharge", function (properties, propertyId) {
  var property = properties.find(function (prop) {
    return prop.property.id === parseInt(propertyId);
  });

  if (property) {
    if (property.surcharge > 0) {
      return property.surcharge;
    } else if (property.property.surcharge > 0) {
      return property.property.surcharge;
    }
  }

  return 0;
});

},{}],260:[function(require,module,exports){
"use strict";

Vue.filter("propertySurchargeSum", function (item) {
  var sum = 0;

  if (item.properties) {
    var addedProperties = item.properties.filter(function (property) {
      return property.property.isOderProperty && property.property.value;
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = addedProperties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var property = _step.value;
        sum += property.property.surcharge;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return sum;
});

},{}],261:[function(require,module,exports){
"use strict";

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.filter("translate", function (value, params) {
  return _TranslationService["default"].translate(value, params);
});

},{"services/TranslationService":280}],262:[function(require,module,exports){
"use strict";

Vue.filter("truncate", function (string, value) {
  if (string.length > value) {
    return string.substring(0, value) + "...";
  }

  return string;
});

},{}],263:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("./utils");

var MonetaryFormatter = function () {
  var T_DIGIT = 0;
  var T_DECIMAL = 1;
  var T_CURRENCY = 2;
  var T_SIGN = 3;
  var T_CHAR = 4;

  function MonetaryFormatter() {
    this.setPattern(App.currencyPattern.pattern);
    this.separatorThousands = App.currencyPattern.separator_thousands;
    this.separatorDecimals = App.currencyPattern.separator_decimal;
    this.sign = "-";
  }

  function _parse(pattern) {
    var parsed = [];

    while (pattern.length > 0) {
      if (pattern.indexOf("\xA4") === 0) {
        parsed.push({
          type: T_CURRENCY
        });
        pattern = pattern.substr(1);
      } else if (pattern.indexOf("#,##0") === 0) {
        parsed.push({
          type: T_DIGIT
        });
        pattern = pattern.substr(5);
      } else if (/^\.0+/.test(pattern)) {
        var match = /^\.(0+)/.exec(pattern);
        parsed.push({
          type: T_DECIMAL,
          value: match[1].length
        });
        pattern = pattern.substr(match[0].length);
      } else if (pattern.indexOf("-") === 0) {
        parsed.push({
          type: T_SIGN
        });
        pattern = pattern.substr(1);
      } else {
        parsed.push({
          type: T_CHAR,
          value: pattern.charAt(0)
        });
        pattern = pattern.substr(1);
      }
    }

    return parsed;
  }

  MonetaryFormatter.prototype.setPattern = function (pattern) {
    var _this = this;

    this.pattern = [];
    pattern.split(";").forEach(function (subpattern) {
      _this.pattern.push(_parse(subpattern));
    });
  };

  MonetaryFormatter.prototype.setSeparators = function (separatorThousands, separatorDecimals) {
    this.separatorThousands = separatorThousands;
    this.separatorDecimals = separatorDecimals;
  };

  MonetaryFormatter.prototype.setSign = function (sign) {
    this.sign = sign;
  };

  MonetaryFormatter.prototype.format = function (value, currency) {
    var _this2 = this;

    var patternIndex = 0;
    var prefix = "";

    if ((0, _utils.isNullOrUndefined)(value) || Number.isNaN(parseFloat(value))) {
      value = 0;
    }

    if (value < 0) {
      if (this.pattern.length > 1) {
        patternIndex = 1;
      } else {
        prefix = this.sign;
      }
    }

    return prefix + this.pattern[patternIndex].map(function (partial, index, pattern) {
      switch (partial.type) {
        case T_DIGIT:
          {
            if (value < 0) {
              value *= -1;
            } // check if pattern include decimals to decide if digits should be rounded or not


            var roundDigits = !pattern.some(function (subpattern) {
              return subpattern.type === T_DECIMAL;
            }); // cut decimal places instead of rounding
            // revert the value to insert thousands separators next

            var digits = (roundDigits ? Math.round(value * 100) / 100 : parseInt(value)).toFixed(0).split("").reverse().join(""); // insert thousands separator

            for (var i = 3; i < digits.length; i += 4) {
              digits = digits.substr(0, i) + _this2.separatorThousands + digits.substr(i);
            } // revert back again


            digits = digits.split("").reverse().join("");
            return digits;
          }

        case T_DECIMAL:
          {
            var numberOfDecimals = parseInt(partial.value);
            var result = Math.round(value * Math.pow(10, numberOfDecimals)).toFixed(0).substr(-1 * numberOfDecimals, numberOfDecimals);

            while (result.length < numberOfDecimals) {
              result = "0" + result;
            }

            return _this2.separatorDecimals + result;
          }

        case T_CURRENCY:
          {
            return currency;
          }

        case T_SIGN:
          {
            return _this2.sign;
          }

        case T_CHAR:
          {
            return partial.value;
          }

        default:
          {
            console.warn("Unkown pattern type: " + partial.type);
            return "";
          }
      }
    }).join("");
  };

  return MonetaryFormatter;
}();

var _default = MonetaryFormatter;
exports["default"] = _default;

},{"./utils":271}],264:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StickyElement = void 0;

var _utils = require("./utils");

var _dom = require("./dom");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var STICKY_EVENTS = ["resize", "scroll", "touchstart", "touchmove", "touchend", "pageshow", "load", "move-sticky"];

var StickyElement =
/*#__PURE__*/
function () {
  function StickyElement(el, vm, minWidth) {
    var _this = this;

    _classCallCheck(this, StickyElement);

    this.el = el;
    this.vm = vm;
    this.offsetTop = 0;
    this.minWidth = minWidth;
    this.isMinWidth = true;
    this.resizeListener = this.checkMinWidth.bind(this);
    window.addEventListener("resize", this.resizeListener);
    this.checkMinWidth();
    this.vm.$nextTick(function () {
      var containerElement = _this.getContainerElement();

      containerElement.__stickyElements = _this.getContainerElement().__stickyElements || [];

      containerElement.__stickyElements.push(_this);

      containerElement.__stickyElements.forEach(function (stickyElement) {
        return stickyElement.calculateOffset();
      });
    });
    el.classList.add("sticky-element");
  }

  _createClass(StickyElement, [{
    key: "enable",
    value: function enable() {
      var _this2 = this;

      this.vm.$nextTick(function () {
        if (_this2.enabled || _this2.isMinWidth || App.isShopBuilder) {
          return;
        }

        _this2.animationFrame = 0;
        _this2.placeholder = document.createElement("DIV");

        _this2.el.parentNode.insertBefore(_this2.placeholder, _this2.el);

        _this2.eventListener = _this2.tick.bind(_this2);
        document.addEventListener("storeChanged", _this2.eventListener);
        STICKY_EVENTS.forEach(function (event) {
          window.addEventListener(event, _this2.eventListener);
        });
        _this2.enabled = true;

        _this2.calculateOffset();

        _this2.tick();
      });
    }
  }, {
    key: "disable",
    value: function disable() {
      var _this3 = this;

      this.vm.$nextTick(function () {
        if (!(0, _utils.isNullOrUndefined)(_this3.placeholder)) {
          _this3.getContainerElement().removeChild(_this3.placeholder);
        }

        _this3.placeholder = null;
      });
      (0, _dom.applyStyles)(this.el, {
        position: null,
        top: null,
        left: null,
        width: null,
        zIndex: null
      });
      document.removeEventListener("storeChanged", this.eventListener);
      STICKY_EVENTS.forEach(function (event) {
        window.removeEventListener(event, _this3.eventListener);
      });
      this.eventListener = null;
      this.animationFrame = 0;
      this.enabled = false;
    }
  }, {
    key: "tick",
    value: function tick() {
      var _this4 = this;

      if (this.enabled && !this.isMinWidth) {
        if (this.animationFrame > 0) {
          cancelAnimationFrame(this.animationFrame);
        }

        this.animationFrame = requestAnimationFrame(function () {
          _this4.checkElement();

          _this4.updateStyles();

          _this4.animationFrame = 0;
        });
      }
    }
  }, {
    key: "checkElement",
    value: function checkElement(skipOffsetCalculation) {
      /*
      if (isNullOrUndefined(this.el) || isNullOrUndefined(this.placeholder))
      {
          return;
      }
      */
      var oldValue = this.position || {};
      var elementRect = this.el.getBoundingClientRect();
      var placeholderRect = this.placeholder.getBoundingClientRect();
      var containerRect = this.getContainerElement().getBoundingClientRect();
      var maxBottom = Math.min(containerRect.bottom - elementRect.height - this.offsetTop - this.offsetBottom, 0);

      if (oldValue.height !== elementRect.height && !skipOffsetCalculation) {
        this.calculateOffset();
      }

      this.position = {
        height: elementRect.height,
        width: placeholderRect.width,
        // eslint-disable-next-line id-length
        x: placeholderRect.left,
        // eslint-disable-next-line id-length
        y: maxBottom + this.offsetTop,
        origY: placeholderRect.top,
        isSticky: elementRect.height < containerRect.height && placeholderRect.top <= this.offsetTop
      };
    }
  }, {
    key: "calculateOffset",
    value: function calculateOffset() {
      var _this5 = this;

      if (!this.enabled) {
        return;
      }

      this.offsetTop = 0;

      if (document.getElementById("page-header-parent")) {
        var headerChildren = document.getElementById("page-header-parent").children;

        for (var i = 0; i < headerChildren.length; i++) {
          if (!headerChildren[i].classList.contains("unfixed")) {
            this.offsetTop += headerChildren[i].getBoundingClientRect().height;
          }
        }
      }

      this.offsetBottom = 0;

      if ((0, _utils.isNullOrUndefined)(this.position)) {
        this.checkElement(true);
      }

      this.getSiblingStickies().forEach(function (stickyElement) {
        if ((0, _utils.isNullOrUndefined)(stickyElement.position)) {
          stickyElement.checkElement(true);
        }

        if (stickyElement.position.origY + stickyElement.position.height <= _this5.position.origY) {
          _this5.offsetTop += stickyElement.position.height;
        } else if (stickyElement.position.origY >= _this5.position.origY + _this5.position.height) {
          _this5.offsetBottom += stickyElement.position.height;
        }
      });
    }
  }, {
    key: "updateStyles",
    value: function updateStyles() {
      var styles = {
        position: null,
        top: null,
        left: null,
        width: null,
        zIndex: null
      };
      var placeholderStyles = {
        paddingTop: null
      };

      if (this.position.isSticky) {
        styles = {
          position: "fixed",
          top: this.position.y + "px",
          left: this.position.x + "px",
          width: this.position.width + "px"
        };
        placeholderStyles = {
          paddingTop: this.position.height + "px"
        };
        this.el.classList.add("is-sticky");
      } else {
        this.el.classList.remove("is-sticky");
      }

      (0, _dom.applyStyles)(this.el, styles);
      (0, _dom.applyStyles)(this.placeholder, placeholderStyles);
    }
  }, {
    key: "checkMinWidth",
    value: function checkMinWidth() {
      this.isMinWidth = !window.matchMedia("(min-width: " + this.minWidth + "px)").matches;
    }
  }, {
    key: "getSiblingStickies",
    value: function getSiblingStickies() {
      var container = this.getContainerElement();

      if ((0, _utils.isNullOrUndefined)(container)) {
        return [];
      }

      if ((0, _utils.isNullOrUndefined)(container.__stickyElements)) {
        container.__stickyElements = [];
      }

      return container.__stickyElements;
    }
  }, {
    key: "getContainerElement",
    value: function getContainerElement() {
      if (this.el.dataset.hasOwnProperty("stickyContainer")) {
        var container = document.querySelector(this.el.dataset.stickyContainer);

        if (!(0, _utils.isNullOrUndefined)(container)) {
          return container;
        }
      }

      return this.el.parentElement;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      window.removeEventListener("resize", this.resizeListener);
      var idx = this.getSiblingStickies().indexOf(this);

      if (idx >= 0) {
        this.getContainerElement().__stickyElements.splice(idx, 1);
      }

      this.el.classList.remove("sticky-element");
    }
  }]);

  return StickyElement;
}();

exports.StickyElement = StickyElement;

},{"./dom":266,"./utils":271}],265:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;

var _utils = require("./utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Makes a function executed after defined timeout.
 *
 * @param {function}    callback  The function to be executed after timeout
 * @param {number}      timeout   The timeout
 *
 * @returns {function}
 */
function debounce(callback, timeout) {
  timeout = (0, _utils.defaultValue)(timeout, 0);

  if (timeout > 0) {
    return function () {
      var args = arguments;

      if (!(0, _utils.isNullOrUndefined)(callback.__timeout)) {
        window.clearTimeout(callback.__timeout);
      }

      callback.__timeout = window.setTimeout(function () {
        callback.apply(void 0, _toConsumableArray(args));
      }, timeout);
    };
  }

  return callback;
}

},{"./utils":271}],266:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findParent = findParent;
exports.is = is;
exports.textWidth = textWidth;
exports.applyStyles = applyStyles;

var _utils = require("./utils");

/**
 * Get first parent element which matches a given selector
 *
 * @param {HTMLElement}     element           The element to get the parent for
 * @param {string}          parentSelector    Selector to match parent element
 *
 * @returns {HTMLElement}
 */
function findParent(element, parentSelector) {
  // eslint-disable-next-line brace-style
  while ((element = element.parentElement) && !is(element, parentSelector)) {}

  return element;
}
/**
 * Check if element matches a given selector
 *
 * @param {HTMLElement} element   The element to check
 * @param {string}      selector  The selector to match on given element
 *
 * @returns {boolean}
 */
// eslint-disable-next-line complexity


function is(element, selector) {
  // polyfill from https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (sel) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(sel);
      var i = matches.length; // eslint-disable-next-line brace-style

      while (--i >= 0 && matches.item(i) !== this) {}

      return i > -1;
    };
  }

  return element.matches(selector);
}
/**
 * Get the width of a specified text depending on the font-family
 *
 * @param {string} text
 * @param {string} fontFamily
 *
 * @returns {integer}
 */


function textWidth(text, fontFamily) {
  var tag = document.createElement("div");
  tag.style.position = "absolute";
  tag.style.left = "-99in";
  tag.style.whiteSpace = "nowrap";
  tag.style.font = fontFamily;
  tag.innerHTML = text;
  document.body.appendChild(tag);
  var result = tag.clientWidth;
  document.body.removeChild(tag);
  return result;
}

function applyStyles(el, styles) {
  Object.keys(styles).forEach(function (key) {
    var value = styles[key];

    if ((0, _utils.isNullOrUndefined)(value)) {
      var propertyName = key.replace(/[A-Z]/g, function (match) {
        return "-" + match.toLowerCase();
      });
      el.style.removeProperty(propertyName);
    } else {
      el.style[key] = value;
    }
  });
}

},{"./utils":271}],267:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;

var _utils = require("./utils");

function get(object, path) {
  var fields = path.split(".");
  var key = fields.shift();

  while (!(0, _utils.isNullOrUndefined)(object) && !(0, _utils.isNullOrUndefined)(key)) {
    object = readField(object, key);
    key = fields.shift();
  }

  return object;
}

function readField(object, field) {
  if ((0, _utils.isNullOrUndefined)(object)) {
    return null;
  }

  var match = /^{\s*(\S+)\s*,\s*(\S+)\s*}$/.exec(field);

  if (!(0, _utils.isNullOrUndefined)(match)) {
    var searchKey = match[1];
    var searchValue = match[2];
    return Array.prototype.slice.call(object).find(function (entry) {
      return entry[searchKey] + "" === searchValue;
    });
  }

  return object[field];
}

},{"./utils":271}],268:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.floatLength = floatLength;
exports.limit = limit;
exports.formatFloat = formatFloat;

var _utils = require("./utils");

/**
 * Get the number of decimal places of a float value.
 *
 * @param value     The float value to count decimal places for
 * @returns {number}
 */
function floatLength(value) {
  var match = ("" + value).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

  if (!match) {
    return 0;
  }

  return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? match[2] : 0));
}
/**
 * Limit a numeric value on a defined interval.
 * If value is smaller than minimum, minimum value will be returned.
 * If value is greater than maximum, maximum value will be returned.
 * If value is between minimum and maximum, the value will be returned.
 *
 * @param {number}  value     The value to check against min and max
 * @param {number}  min       Minimum value
 * @param {number}  max       Maximum value
 *
 * @returns {number}
 */


function limit(value, min, max) {
  if (isNaN(value)) {
    return value;
  }

  if (!(0, _utils.isNullOrUndefined)(min) && value < min) {
    return min;
  }

  if (!(0, _utils.isNullOrUndefined)(max) && value > max) {
    return max;
  }

  return value;
}
/**
 * Format float value by cutting decimal places.
 *
 * @param {number}  value       The value to be formatted
 * @param {number}  decimals    Number of decimal places to keep
 * @param {boolean} round       Flag indicating if original value should be rounded before cutting decimal values
 *
 * @returns {number}
 */


function formatFloat(value, decimals, round) {
  value = parseFloat(value);

  if (round) {
    var factor = Math.pow(10, decimals);
    var scaledValue = Math.round((value + 1 / (factor * 10)) * factor);
    value = scaledValue / factor;
  }

  if (isNaN(value)) {
    // return NaN
    return 1 / 0;
  }

  return parseFloat(value.toFixed(decimals));
}

},{"./utils":271}],269:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceAll = replaceAll;
exports.capitalize = capitalize;

var _utils = require("./utils");

/**
 * Replace all occurrences of a string
 *
 * @param {string}  input           The string to apply replacements on
 * @param {string}  search          Substring to be replaced
 * @param {string}  replacement     String to replace each match with
 *
 * @returns {string}
 */
function replaceAll(input, search, replacement) {
  if ((0, _utils.isNullOrUndefined)(input)) {
    return input;
  }

  return (input + "").split(search).join(replacement);
}
/**
 * Capitalize first letter of a string
 *
 * @param {string}  input   The string to capitalize
 *
 * @returns {string}
 */


function capitalize(input) {
  if ((0, _utils.isNullOrUndefined)(input)) {
    return input;
  }

  return ("" + input).charAt(0).toUpperCase() + ("" + input).substr(1);
}

},{"./utils":271}],270:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeUrl = normalizeUrl;
exports.pathnameEquals = pathnameEquals;

var _utils = require("./utils");

function normalizeUrl(url) {
  var urlParts = url.split("?");
  var urlParams = urlParts[1];
  var urlPath = urlParts[0];

  if (App.urlTrailingSlash && urlPath.substr(-1, 1) !== "/") {
    urlPath += "/";
  } else if (!App.urlTrailingSlash && urlPath.substr(-1, 1) === "/") {
    urlPath = url.substr(0, url.length - 1);
  }

  var targetUrl = urlPath;

  if (!(0, _utils.isNullOrUndefined)(urlParams) && urlParams.length > 0) {
    targetUrl += "?" + urlParams;
  }

  return targetUrl;
}

function pathnameEquals(pathname) {
  return window.location.pathname === pathname || window.location.pathname === pathname + "/" || window.location.pathname + "/" === pathname;
}

},{"./utils":271}],271:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNull = isNull;
exports.isUndefined = isUndefined;
exports.isNullOrUndefined = isNullOrUndefined;
exports.isDefined = isDefined;
exports.defaultValue = defaultValue;
exports.orderArrayByKey = orderArrayByKey;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Check if a given value equals to null
 *
 * @param {*}   object
 *
 * @returns {boolean}
 */
function isNull(object) {
  return object === null;
}
/**
 * Check if a given value is undefined
 *
 * @param {*} object
 *
 * @returns {boolean}
 */


function isUndefined(object) {
  // eslint-disable-next-line
  return _typeof(object) === _typeof(void 0);
}
/**
 * Check if a given value is null or undefined
 *
 * @param {*}   object
 *
 * @returns {boolean}
 */


function isNullOrUndefined(object) {
  return isNull(object) || isUndefined(object);
}
/**
 * Check if a given value is defined. This is a shorthand function for `!isNullOrUndefined(value)`
 * @param {*}   object
 *
 * @returns {boolean}
 */


function isDefined(object) {
  return !isNullOrUndefined(object);
}
/**
 * Check if a given value is defined. Otherwise return a default value
 *
 * @param {*}   input
 * @param {*}   defaultValue
 *
 * @returns {*}
 */


function defaultValue(input, defaultValue) {
  if (isNullOrUndefined(input)) {
    return defaultValue;
  }

  return input;
}

function orderArrayByKey(array, key, desc) {
  return array.sort(function (valueA, valueB) {
    if (valueA[key] > valueB[key]) {
      return 1;
    }

    if (valueA[key] < valueB[key]) {
      return -1;
    }

    return 0;
  });
}

},{}],272:[function(require,module,exports){
"use strict";

var browserDetect = require("detect-browser");

var NotificationService = require("services/NotificationService");

var AutoFocusService = require("services/AutoFocusService"); // Frontend end scripts
// eslint-disable-next-line


var init = function ($, window, document) {
  var headerCollapses = [];

  function HeaderCollapse(selector) {
    headerCollapses.push(selector);
    $(document).ready(function () {
      $(selector).on("show.bs.collapse", function () {
        headerCollapses.forEach(function (element) {
          if (!$(element).is(selector)) {
            $(element).collapse("hide");
          }
        });
      });
    });
  }

  function CeresMain() {
    var browser = browserDetect.detect();

    if (browser && browser.name) {
      $("html").addClass(browser.name);
    } else {
      $("html").addClass("unkown-os");
    } // Detect Facebook integrated Browser


    if (typeof navigator !== "undefined" && /FBA[NV]\/([0-9\.]+)/.test(navigator.userAgent)) {
      document.body.classList.add("facebook");
    }

    $(window).scroll(function () {
      if ($(".wrapper-main").hasClass("isSticky")) {
        if ($(this).scrollTop() > 1) {
          $(".wrapper-main").addClass("sticky");
        } else {
          $(".wrapper-main").removeClass("sticky");
        }
      }
    });

    window.onpopstate = function (event) {
      if (event.state && event.state.requireReload) {
        window.location.reload();
      }
    }; // init bootstrap tooltips


    $("[data-toggle=\"tooltip\"]").tooltip();
    HeaderCollapse("#countrySettings");
    HeaderCollapse("#currencySelect");
    HeaderCollapse("#searchBox");
    var $toggleListView = $(".toggle-list-view");
    var $mainNavbarCollapse = $("#mainNavbarCollapse");
    $(document).on("click", function (evt) {
      var basketOpenClass = App.config.basket.previewType === "right" ? "open-right" : "open-hover";

      if ($("#vue-app").hasClass(basketOpenClass)) {
        if (evt.target != $(".basket-preview") && evt.target != document.querySelector(".basket-preview-hover") && evt.target.classList[0] != "message" && $(evt.target).parents(".basket-preview").length <= 0 && $(evt.target).parents(".basket-preview-hover").length <= 0) {
          evt.preventDefault();
          $("#vue-app").toggleClass(basketOpenClass || "open-hover");
        }
      }

      headerCollapses.forEach(function (element) {
        if (evt.target !== element && $(evt.target).parents(element).length <= 0) {
          $(element).collapse("hide");
        }
      });
    });
    $toggleListView.on("click", function (evt) {
      evt.preventDefault(); // toggle it's own state

      $toggleListView.toggleClass("grid"); // toggle internal style of thumbs

      $(".product-list, .cmp-product-thumb").toggleClass("grid");
    });
    $mainNavbarCollapse.collapse("hide"); // Add click listener outside the navigation to close it

    $mainNavbarCollapse.on("show.bs.collapse", function () {
      $(".main").one("click", closeNav);
    });
    $mainNavbarCollapse.on("hide.bs.collapse", function () {
      $(".main").off("click", closeNav);
    });

    function closeNav() {
      $("#mainNavbarCollapse").collapse("hide");
    }

    $(document).ready(function () {
      var offset = 250;
      var duration = 300;
      var isDesktop = window.matchMedia("(min-width: 768px)").matches;
      AutoFocusService.autoFocus();
      $("#searchBox").on("shown.bs.collapse", function () {
        var searchInput = document.querySelector("input.search-input");

        if (searchInput) {
          searchInput.focus();
        }
      });
      $(window).scroll(function () {
        if (isDesktop) {
          if ($(this).scrollTop() > offset) {
            $(".back-to-top").fadeIn(duration);
            $(".back-to-top-center").fadeIn(duration);
          } else {
            $(".back-to-top").fadeOut(duration);
            $(".back-to-top-center").fadeOut(duration);
          }
        }
      });
      window.addEventListener("resize", function () {
        isDesktop = window.matchMedia("(min-width: 768px)").matches;
      });
      $(".back-to-top").click(function (event) {
        event.preventDefault();
        $("html, body").animate({
          scrollTop: 0
        }, duration);
        return false;
      });
      $(".back-to-top-center").click(function (event) {
        event.preventDefault();
        $("html, body").animate({
          scrollTop: 0
        }, duration);
        return false;
      });
      $("#accountMenuList").click(function () {
        $("#countrySettings").collapse("hide");
        $("#searchBox").collapse("hide");
        $("#currencySelect").collapse("hide");
      });
    });
  }

  window.CeresMain = new CeresMain();
  window.CeresNotification = NotificationService;

  var showShopNotification = function showShopNotification(event) {
    if (event.detail.type) {
      switch (event.detail.type) {
        case "info":
          NotificationService.info(event.detail.message);
          break;

        case "log":
          NotificationService.log(event.detail.message);
          break;

        case "error":
          NotificationService.error(event.detail.message);
          break;

        case "success":
          NotificationService.success(event.detail.message);
          break;

        case "warning":
          NotificationService.warn(event.detail.message);
          break;

        default:
          console.log("no type such as:" + event.detail.type);
          break;
      }
    }
  };

  document.addEventListener("showShopNotification", showShopNotification);
}(jQuery, window, document);

},{"detect-browser":1,"services/AutoFocusService":276,"services/NotificationService":279}],273:[function(require,module,exports){
"use strict";

var _utils = require("../helper/utils");

Vue.config.optionMergeStrategies.jsonDataFields = function (parent, child, vm) {
  return child || [];
};

Vue.mixin({
  created: function created() {
    var _this = this;

    if (!(0, _utils.isNullOrUndefined)(this.$options.jsonDataFields)) {
      this.$options.jsonDataFields.forEach(function (dataField) {
        var attrKey = dataField.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase();
        var uid = _this.$attrs[attrKey];
        var element = document.getElementById(uid);

        if (!(0, _utils.isNullOrUndefined)(element)) {
          _this[dataField] = JSON.parse(element.textContent);
        }
      });
    }
  }
});

},{"../helper/utils":271}],274:[function(require,module,exports){
"use strict";

Vue.mixin({
  created: function created() {
    if (this.$props && this.$props.template) {
      this.$options.template = this.$props.template;
    }
  }
});

},{}],275:[function(require,module,exports){
"use strict";

var _url = require("../helper/url");

var _utils = require("../helper/utils");

var NotificationService = require("services/NotificationService");

var WaitScreenService = require("services/WaitScreenService");

module.exports = function ($) {
  var _eventListeners = {};
  $(document).ajaxComplete(function (ajaxEvent, xhr, options) {
    var response;

    try {
      response = JSON.parse(xhr.responseText);
    } catch (exception) {}

    if (response) {
      for (var event in response.events) {
        _triggerEvent(event, response.events[event]);
      }

      if (!options.supressNotifications) {
        _printMessages(response);
      }
    }
  });
  return {
    get: _get,
    put: _put,
    post: _post,
    "delete": _delete,
    send: _send,
    setToken: _setToken,
    getToken: _getToken,
    listen: _listen
  };

  function _listen(event, handler) {
    _eventListeners[event] = _eventListeners[event] || [];

    _eventListeners[event].push(handler);
  }

  function _triggerEvent(event, payload) {
    if (_eventListeners[event]) {
      for (var i = 0; i < _eventListeners[event].length; i++) {
        var listener = _eventListeners[event][i];

        if (typeof listener !== "function") {
          continue;
        }

        listener.call(Object, payload);
      }
    }
  }

  function _get(url, data, config) {
    config = config || {};
    config.method = "GET";
    return _send(url, data, config);
  }

  function _put(url, data, config) {
    config = config || {};
    config.method = "PUT";
    return _send(url, data, config);
  }

  function _post(url, data, config) {
    config = config || {};
    config.method = "POST";
    return _send(url, data, config);
  }

  function _delete(url, data, config) {
    config = config || {};
    config.method = "DELETE";
    return _send(url, data, config);
  }

  function _send(url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var config = arguments.length > 2 ? arguments[2] : undefined;
    var deferred = $.Deferred();
    data = (0, _utils.isDefined)(data) ? data : {};
    url = (0, _url.normalizeUrl)(url);
    config = config || {};
    config.dataType = config.dataType || "json";
    config.contentType = typeof config.contentType !== "undefined" ? config.contentType : "application/x-www-form-urlencoded; charset=UTF-8";
    config.doInBackground = !!config.doInBackground;
    config.supressNotifications = !!config.supressNotifications;
    config.keepOriginalResponse = !!config.keepOriginalResponse;
    config.headers = config.headers || {
      "Accept-Language": App.language
    };
    data.templateEvent = App.templateEvent;
    config.data = data;

    if (!config.doInBackground) {
      WaitScreenService.showWaitScreen();
    }

    var request = $.ajax(url, config).done(function (response) {
      if (config.keepOriginalResponse) {
        deferred.resolve(response);
      } else {
        deferred.resolve(response.data || response);
      }
    }).fail(function (jqXHR) {
      var response = jqXHR.responseText ? $.parseJSON(jqXHR.responseText) : {};
      deferred.reject(response, jqXHR.status);
    }).always(function () {
      if (!config.doInBackground) {
        WaitScreenService.hideWaitScreen();
      }
    });
    deferred.abort = request.abort;
    return deferred;
  }

  function _printMessages(response) {
    var notification;

    if (response.error && response.error.message.length > 0) {
      notification = NotificationService.error(response.error);
    }

    if (response.success && response.success.message.length > 0) {
      notification = NotificationService.success(response.success);
    }

    if (response.warn && response.warn.message.length > 0) {
      notification = NotificationService.warn(response.warn);
    }

    if (response.info && response.info.message.length > 0) {
      notification = NotificationService.info(response.info);
    }

    if (response.debug && response.debug["class"].length > 0) {
      notification.trace(response.debug.file + "(" + response.debug.line + "): " + response.debug["class"]);

      for (var i = 0; i < response.debug.trace.length; i++) {
        notification.trace(response.debug.trace[i]);
      }
    }
  }

  function _setToken(token) {
    this._token = token;
  }

  function _getToken() {
    return this._token;
  }
}(jQuery);

},{"../helper/url":270,"../helper/utils":271,"services/NotificationService":279,"services/WaitScreenService":284}],276:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoFocus = autoFocus;
exports.triggerAutoFocus = triggerAutoFocus;
exports["default"] = void 0;

var _ModalService = _interopRequireDefault(require("services/ModalService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function autoFocus() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = document.getElementsByClassName("modal")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var modal = _step.value;

      if (_typeof(modal) === "object") {
        (function () {
          var currentModal = _ModalService["default"].findModal(modal);

          if (currentModal) {
            currentModal.on("shown.bs.modal", function () {
              triggerAutoFocus(currentModal);
            });
          }
        })();
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  triggerAutoFocus();
}

function triggerAutoFocus(modal) {
  var focusElements;

  if (modal) {
    focusElements = modal.getModalContainer()[0].querySelectorAll("[data-autofocus]");
  } else {
    focusElements = document.querySelectorAll("[data-autofocus]");
  }

  setTimeout(function () {
    if (focusElements[0]) focusElements[0].focus();
  }, 0);
}

var _default = {
  autoFocus: autoFocus,
  triggerAutoFocus: triggerAutoFocus
};
exports["default"] = _default;

},{"services/ModalService":278}],277:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemListUrlParams = getItemListUrlParams;
exports["default"] = void 0;

var _UrlService = _interopRequireDefault(require("services/UrlService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getItemListUrlParams(searchParams) {
  var urlParams = {};
  var defaultItemsPerPage = App.config.pagination.columnsPerPage * App.config.pagination.rowsPerPage[0];
  urlParams.query = searchParams.query && searchParams.query.length > 0 ? searchParams.query : null;
  urlParams.items = searchParams.items !== defaultItemsPerPage ? searchParams.items : null;
  urlParams.page = searchParams.page > 1 ? searchParams.page : null;
  urlParams.facets = searchParams.facets.length > 0 ? searchParams.facets : null;
  urlParams.priceMin = searchParams.priceMin.length > 0 ? searchParams.priceMin : null;
  urlParams.priceMax = searchParams.priceMax.length > 0 ? searchParams.priceMax : null;

  if (App.isSearch) {
    urlParams.sorting = searchParams.sorting !== App.config.sorting.defaultSortingSearch ? searchParams.sorting : null;
  } else {
    urlParams.sorting = searchParams.sorting !== App.config.sorting.defaultSorting ? searchParams.sorting : null;
  }

  var newUrlParams = _UrlService["default"].getUrlParams(document.location.search);

  for (var urlParamKey in urlParams) {
    if (urlParams[urlParamKey] !== null) {
      newUrlParams[urlParamKey] = urlParams[urlParamKey];
    } else {
      delete newUrlParams[urlParamKey];
    }
  }

  return newUrlParams;
}

var _default = {
  getItemListUrlParams: getItemListUrlParams
};
exports["default"] = _default;

},{"services/UrlService":281}],278:[function(require,module,exports){
"use strict";

module.exports = function ($) {
  var paused = false;
  var timeout = -1;
  var interval;
  var timeRemaining;
  var timeStart;
  return {
    findModal: findModal
  };

  function findModal(element) {
    return new Modal(element);
  }

  function Modal(element) {
    var self = this;
    var $bsModal;

    if ($(element).is(".modal")) {
      $bsModal = $(element);
    } else {
      $bsModal = $(element).find(".modal").first();
    }

    return {
      show: show,
      hide: hide,
      setTimeout: setTimeout,
      startTimeout: startTimeout,
      pauseTimeout: pauseTimeout,
      continueTimeout: continueTimeout,
      stopTimeout: stopTimeout,
      getModalContainer: getModalContainer,
      on: on
    };

    function show() {
      return new Promise(function (resolve, reject) {
        $bsModal.modal("show");

        if ($bsModal.timeout > 0) {
          startTimeout();
        }

        $bsModal.one("shown.bs.modal", function () {
          resolve(self);
        });
      });
    }

    function hide() {
      return new Promise(function (resolve, reject) {
        $bsModal.modal("hide");
        $bsModal.one("hidden.bs.modal", function () {
          resolve(self);
        });
      });
    }

    function getModalContainer() {
      return $bsModal;
    }

    function setTimeout(timeout) {
      $bsModal.timeout = timeout;
      $bsModal.find(".modal-content").mouseover(function () {
        pauseTimeout();
      });
      $bsModal.find(".modal-content").mouseout(function () {
        continueTimeout();
      });
      return this;
    }

    function startTimeout() {
      timeRemaining = $bsModal.timeout;
      timeStart = new Date().getTime();
      timeout = window.setTimeout(function () {
        window.clearInterval(interval);
        hide();
      }, $bsModal.timeout);
      $bsModal.find(".timer").text(timeRemaining / 1000);
      interval = window.setInterval(function () {
        if (!paused) {
          var secondsRemaining = timeRemaining - new Date().getTime() + timeStart;
          secondsRemaining = Math.round(secondsRemaining / 1000);
          $bsModal.find(".timer").text(secondsRemaining);
        }
      }, 1000);
    }

    function pauseTimeout() {
      paused = true;
      timeRemaining -= new Date().getTime() - timeStart;
      window.clearTimeout(timeout);
    }

    function continueTimeout() {
      paused = false;
      timeStart = new Date().getTime();
      timeout = window.setTimeout(function () {
        hide();
        window.clearInterval(interval);
      }, timeRemaining);
    }

    function stopTimeout() {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    }

    function on(event, callback) {
      $bsModal.on(event, callback);
    }
  }
}(jQuery);

},{}],279:[function(require,module,exports){
"use strict";

var _ExceptionMap = require("exceptions/ExceptionMap");

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function ($) {
  var notificationCount = 0;
  var notifications = new NotificationList();
  var handlerList = [];
  return {
    log: _log,
    info: _info,
    warn: _warn,
    error: _error,
    success: _success,
    getNotifications: getNotifications,
    listen: _listen
  };

  function _listen(handler) {
    handlerList.push(handler);
  }

  function trigger() {
    for (var i = 0; i < handlerList.length; i++) {
      handlerList[i].call({}, notifications.all());
    }
  }

  function _log(message, prefix) {
    var notification = new Notification(message);

    if (App.config.log.data.indexOf("log_messages") >= 0) {
      console.log((prefix || "") + "[" + notification.code + "] " + notification.message);

      for (var i = 0; i < notification.stackTrace.length; i++) {
        _log(notification.stackTrace[i], " + ");
      }
    }

    return notification;
  }

  function _info(message) {
    var notification = new Notification(message, "info");

    if (App.config.log.data.indexOf("print_infos") >= 0) {
      _printNotification(notification);
    }

    return notification;
  }

  function _warn(message) {
    var notification = new Notification(message, "warning");

    if (App.config.log.data.indexOf("print_warnings") >= 0) {
      _printNotification(notification);
    }

    return notification;
  }

  function _error(message) {
    var notification = new Notification(message, "danger");

    if (App.config.log.data.indexOf("print_errors") >= 0) {
      _printNotification(notification);
    }

    return notification;
  }

  function _success(message) {
    var notification = new Notification(message, "success");

    if (App.config.log.data.indexOf("print_success") >= 0) {
      _printNotification(notification);
    }

    return notification;
  }

  function getNotifications() {
    return notifications;
  }

  function _printNotification(notification) {
    if (notification.code > 0 && _ExceptionMap.exceptionMap.has(notification.code.toString())) {
      notification.message = _TranslationService["default"].translate("Ceres::Template." + _ExceptionMap.exceptionMap.get(notification.code.toString()));
    }

    notifications.add(notification);

    _log(notification);

    trigger();
    return notification;
  }

  function Notification(data, context) {
    if (App.config.log.data.indexOf("print_stack_trace") < 0 && _typeof(data) === "object") {
      data.stackTrace = [];
    }

    var id = notificationCount++;
    var self = {
      id: id,
      code: data.code || 0,
      message: data.message || data || "",
      context: context || "info",
      stackTrace: data.stackTrace || [],
      close: close,
      closeAfter: closeAfter,
      trace: trace
    };
    return self;

    function close() {
      notifications.remove(self);
      trigger();
    }

    function closeAfter(timeout) {
      setTimeout(function () {
        notifications.remove(self);
        trigger();
      }, timeout);
    }

    function trace(message, code) {
      if (App.config.log.data.indexOf("print_stack_trace") >= 0) {
        self.stackTrace.push({
          code: code || 0,
          message: message
        });
      }
    }
  }

  function NotificationList() {
    var elements = [];
    return {
      all: all,
      add: add,
      remove: remove
    };

    function all() {
      return elements;
    }

    function add(notification) {
      elements.push(notification);
    }

    function remove(notification) {
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].id === notification.id) {
          elements.splice(i, 1);
          break;
        }
      }
    }
  }
}(jQuery);

},{"exceptions/ExceptionMap":240,"services/TranslationService":280}],280:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../helper/utils");

var _strings = require("../helper/strings");

var TranslationService = function ($) {
  var _translations = {}; // initialize translations

  _readTranslations();

  return {
    translate: _translate
  };

  function _readTranslations() {
    var identifierPattern = /^(\w+)::(\w+)$/;
    var tags = document.querySelectorAll("script[data-translation]");

    for (var i = 0; i < tags.length; i++) {
      var identifier = tags[i].dataset.translation;

      if (!identifier || !identifierPattern.test(identifier)) {
        console.error("Cannot read translations from script tag. Identifier is not valid");
      }

      var match = identifierPattern.exec(identifier);
      var namespace = match[1];
      var group = match[2];

      if (_translations.hasOwnProperty(namespace)) {
        console.warn("Cannot override namespace \"" + namespace + "\"");
        continue;
      }

      _translations[namespace] = {};

      if (_translations[namespace].hasOwnProperty(group)) {
        console.warn("Cannot override group \"" + namespace + "::" + group);
        continue;
      }

      try {
        _translations[namespace][group] = JSON.parse(tags[i].innerHTML);
      } catch (err) {
        console.error("Error while parsing translations (" + identifier + ")");
      }
    }
  }

  function _translate(key, params) {
    var identifier = _parseKey(key);

    if (identifier === null) {
      return key;
    }

    var namespace = _translations[identifier.namespace];

    if ((0, _utils.isNullOrUndefined)(namespace)) {
      return key;
    }

    var group = namespace[identifier.group];

    if ((0, _utils.isNullOrUndefined)(group)) {
      return key;
    }

    var value = group[identifier.key];

    if (!(0, _utils.isNullOrUndefined)(value)) {
      return _replacePlaceholders(value, params);
    }

    return key;
  }

  function _replacePlaceholders(input, values) {
    values = values || {};
    Object.keys(values).sort(function (keyA, keyB) {
      return keyB.length - keyA.length;
    }).forEach(function (key) {
      var value = "" + (0, _utils.defaultValue)(values[key], "");
      input = (0, _strings.replaceAll)(input, ":" + key, value);
      input = (0, _strings.replaceAll)(input, ":" + (0, _strings.capitalize)(key), (0, _strings.capitalize)(value));
      input = (0, _strings.replaceAll)(input, ":" + key.toUpperCase(), value.toUpperCase());
    });
    return input;
  }

  function _parseKey(key) {
    var keyPattern = /^(\w+)::(\w+)\.(\w+)$/;

    if (keyPattern.test(key)) {
      var match = keyPattern.exec(key);
      return {
        namespace: match[1],
        group: match[2],
        key: match[3]
      };
    }

    return null;
  }
}(jQuery);

var _default = TranslationService;
exports["default"] = _default;

},{"../helper/strings":269,"../helper/utils":271}],281:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlParams = getUrlParams;
exports.setUrlParams = setUrlParams;
exports.setUrlParam = setUrlParam;
exports.removeUrlParam = removeUrlParam;
exports.removeUrlParams = removeUrlParams;
exports.navigateTo = navigateTo;
exports.navigateToParams = navigateToParams;
exports.encodeParams = encodeParams;
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _utils = require("../helper/utils");

var _url = require("../helper/url");

var _index = _interopRequireDefault(require("../store/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getUrlParams(urlParams) {
  if ((0, _utils.isNullOrUndefined)(urlParams) && (0, _utils.isDefined)(document.location.search)) {
    urlParams = document.location.search;
  }

  if ((0, _utils.isNullOrUndefined)(urlParams)) {
    return {};
  }

  urlParams = urlParams.split("+").join(" ");
  var result = {};
  var params = (window.location.search.split("?")[1] || "").split("&");

  for (var param in params) {
    if (params.hasOwnProperty(param)) {
      var paramParts = params[param].split("=");
      result[paramParts[0]] = decodeURIComponent(paramParts[1] || "");
    }
  }

  if (result.hasOwnProperty("")) {
    delete result[""];
  }

  return result;
}

function setUrlParams(urlParams) {
  var pushState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var pathName = (0, _utils.isDefined)(_index["default"].state.navigation.currentCategory) && (0, _utils.isDefined)(_index["default"].state.navigation.currentCategory.url) ? _index["default"].state.navigation.currentCategory.url : window.location.pathname;
  var params = _jquery["default"].isEmptyObject(urlParams) ? "" : "?" + _jquery["default"].param(urlParams);
  var titleElement = document.getElementsByTagName("title")[0];

  if (pushState) {
    window.history.pushState({
      requireReload: true
    }, titleElement ? titleElement.innerHTML : "", pathName + params);
  } else {
    window.history.replaceState({
      requireReload: true
    }, titleElement ? titleElement.innerHTML : "", pathName + params);
  }

  document.dispatchEvent(new CustomEvent("onHistoryChanged", {
    detail: {
      title: titleElement ? titleElement.innerHTML : "",
      url: pathName + params
    }
  }));
  (0, _jquery["default"])("a[href][data-update-url]").each(function (i, element) {
    var $element = (0, _jquery["default"])(element);
    var href = /^([^?]*)(\?.*)?$/.exec($element.attr("href"));

    if (href && href[1]) {
      $element.attr("href", href[1] + params);
    }
  });
}

function setUrlParam(urlParam) {
  var urlParams = getUrlParams();

  for (var key in urlParam) {
    urlParams[key] = urlParam[key];
  }

  setUrlParams(urlParams, false);
}

function removeUrlParam(urlParamToDelete) {
  removeUrlParams([urlParamToDelete]);
}

function removeUrlParams(urlParamsToDelete) {
  var urlParams = getUrlParams();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = urlParamsToDelete[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var param = _step.value;
      delete urlParams[param];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  setUrlParams(urlParams, false);
}

function navigateTo(url) {
  url = (0, _url.normalizeUrl)(url);
  window.location.assign(url);
}

function navigateToParams(urlParams) {
  var pathName = (0, _utils.isDefined)(_index["default"].state.navigation.currentCategory) && (0, _utils.isDefined)(_index["default"].state.navigation.currentCategory.url) ? _index["default"].state.navigation.currentCategory.url : window.location.pathname;
  var url = (0, _url.normalizeUrl)(pathName + "?" + encodeParams(urlParams));
  window.location.assign(url);
}

function encodeParams(params, prefix) {
  if ((0, _utils.isNullOrUndefined)(params)) {
    return "";
  }

  if (Array.isArray(params)) {
    return params.map(function (listValue, i) {
      return encodeParams(listValue, "".concat(prefix, "[").concat(i, "]"));
    }).join("&");
  } else if (_typeof(params) === "object") {
    return Object.keys(params).filter(function (key) {
      return !(isNaN(params[key]) && typeof params[key] === "number") && !(0, _utils.isNullOrUndefined)(params[key]);
    }).map(function (key) {
      return encodeParams(params[key], !(0, _utils.isNullOrUndefined)(prefix) ? "".concat(prefix, "[").concat(key, "]") : key);
    }).join("&");
  }

  if ((0, _utils.isNullOrUndefined)(prefix)) {
    return encodeURIComponent(params);
  }

  return prefix + "=" + encodeURIComponent(params);
}

var _default = {
  setUrlParams: setUrlParams,
  getUrlParams: getUrlParams,
  navigateTo: navigateTo,
  setUrlParam: setUrlParam,
  removeUrlParams: removeUrlParams,
  removeUrlParam: removeUrlParam
};
exports["default"] = _default;

},{"../helper/url":270,"../helper/utils":271,"../store/index":285,"jquery":3}],282:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
exports.getInvalidFields = getInvalidFields;
exports.markInvalidFields = markInvalidFields;
exports.markFailedValidationFields = markFailedValidationFields;
exports.unmarkAllFields = unmarkAllFields;
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _utils = require("../helper/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var $form;

function validate(form) {
  var deferred = _jquery["default"].Deferred();

  var invalidFields = getInvalidFields(form);

  if (invalidFields.length > 0) {
    deferred.rejectWith(form, [invalidFields]);
  } else {
    deferred.resolveWith(form);
  }

  return deferred;
}

function getInvalidFields(form) {
  $form = (0, _jquery["default"])(form);
  var invalidFormControls = [];
  $form.find("[data-validate]").each(function (i, elem) {
    if (!_validateElement((0, _jquery["default"])(elem))) {
      invalidFormControls.push(elem);
    }
  });
  return invalidFormControls;
}

function markInvalidFields(fields, errorClass) {
  errorClass = errorClass || "error";
  (0, _jquery["default"])(fields).each(function (i, elem) {
    var $elem = (0, _jquery["default"])(elem);
    $elem.addClass(errorClass);

    _findFormControls($elem).on("click.removeErrorClass keyup.removeErrorClass change.removeErrorClass", function () {
      if (_validateElement($elem)) {
        $elem.removeClass(errorClass);

        if ($elem.is("[type=\"radio\"], [type=\"checkbox\"]")) {
          var groupName = $elem.attr("name");
          (0, _jquery["default"])("." + errorClass + "[name=\"" + groupName + "\"]").removeClass(errorClass);
        }

        _findFormControls($elem).off("click.removeErrorClass keyup.removeErrorClass change.removeErrorClass");
      }
    });
  });
}

function markFailedValidationFields(form, validationErrors, errorClass) {
  $form = (0, _jquery["default"])(form);
  errorClass = errorClass || "error";
  $form.find("[data-model]").each(function (i, elem) {
    var $elem = (0, _jquery["default"])(elem);
    var attribute = $elem.attr("data-model");

    if (attribute in validationErrors) {
      $elem.addClass(errorClass);
      var fieldLabel = $elem.find("label")[0].innerHTML.replace("*", "");

      if (fieldLabel) {
        var attributeCamel = attribute.replace(/([A-Z])/g, " $1").toLowerCase();
        validationErrors[attribute][0] = validationErrors[attribute][0].replace(attributeCamel.replace("_", " "), fieldLabel);
      }
    }
  });
}

function unmarkAllFields(form) {
  $form = (0, _jquery["default"])(form);
  $form.find("[data-validate]").each(function (i, elem) {
    var $elem = (0, _jquery["default"])(elem);
    $elem.removeClass("error");

    _findFormControls($elem).off("click.removeErrorClass keyup.removeErrorClass change.removeErrorClass");
  });
}

function _validateElement(elem) {
  var $elem = (0, _jquery["default"])(elem);
  /** return if the attribute data-validate is not present on the element */

  if (!$elem[0].attributes.hasOwnProperty("data-validate")) {
    return true;
  }

  var validationKeys = $elem.attr("data-validate").split("|").map(function (i) {
    return i.trim();
  }) || ["text"];
  var hasError = false;

  _findFormControls($elem).each(function (i, formControl) {
    var $formControl = (0, _jquery["default"])(formControl);
    var validationKey = validationKeys[i] || validationKeys[0];

    if (!_isActive($formControl)) {
      // continue loop
      return true;
    }

    if ($formControl.is("[type=\"checkbox\"], [type=\"radio\"]")) {
      if (!_validateGroup($formControl, validationKey)) {
        hasError = true;
      }

      return true;
    }

    if ($formControl.is("select")) {
      if (!_validateSelect($formControl, validationKey)) {
        hasError = true;
      }

      return true;
    }

    if (!_validateInput($formControl, validationKey)) {
      hasError = true;
    }

    return false;
  });

  return !hasError;
}

function _validateGroup($formControl, validationKey) {
  var groupName = $formControl.attr("name");
  var $group = $form.find("[name=\"" + groupName + "\"]");
  var range = _eval(validationKey) || {
    min: 1,
    max: 1
  };
  var checked = $group.filter(":checked").length;
  return checked >= range.min && checked <= range.max;
}

function _validateSelect($formControl, validationKey) {
  return _jquery["default"].trim($formControl.val()) !== validationKey;
}

function _validateInput($formControl, validationKey) {
  switch (validationKey) {
    case "text":
      return _hasValue($formControl);

    case "number":
      return _hasValue($formControl) && _jquery["default"].isNumeric(_jquery["default"].trim($formControl.val()));

    case "ref":
      return _compareRef(_jquery["default"].trim($formControl.val()), _jquery["default"].trim($formControl.attr("data-validate-ref")));

    case "date":
      return _isValidDate($formControl);

    case "mail":
      return _isMail($formControl);

    case "password":
      return _isPassword($formControl);

    case "regex":
      {
        var ref = $formControl.attr("data-validate-ref");
        var regex = ref.startsWith("/") ? _eval(ref) : new RegExp(ref);
        return _hasValue($formControl) && regex.test(_jquery["default"].trim($formControl.val()));
      }

    default:
      console.error("Form validation error: unknown validation property: \"" + validationKey + "\"");
      return true;
  }
}

function _hasValue($formControl) {
  return _jquery["default"].trim($formControl.val()).length > 0;
}
/**
 * @param {any} $formControl - Input inside Formular
 * @returns value is valid date
 */


function _isValidDate($formControl) {
  var string = $formControl.val();
  var match = string.match(/^(?:(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{4}))|(?:(\d{4})[.\/-](\d{1,2})[.\/-](\d{1,2}))$/); // If match is null date is not valid

  if ((0, _utils.isNull)(match)) {
    return false;
  }

  var year = match[3] || match[4];
  var month = match[2] || match[5];
  var day = match[1] || match[6]; // Additional checks

  if (year >= 1901 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
    return true;
  }

  return false;
}
/**
 * @param {any} value
 * @returns value is valid mail
 */


function _isMail($formControl) {
  var mailRegEx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\x7f-\xff\-0-9]+\.)+[a-zA-Z\x7f-\xff]{2,}))$/);
  return mailRegEx.test($formControl.val());
}
/**
 * Minimum eight characters, at least one letter and one number
 *
 * @param {any} value
 * @returns value is valid password
 */


function _isPassword($formControl) {
  var passwordRegEx = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)\S{8,}$/);
  return passwordRegEx.test($formControl.val());
}

function _compareRef(value, ref) {
  if ((0, _jquery["default"])(ref).length > 0) {
    ref = _jquery["default"].trim((0, _jquery["default"])(ref).val());
  }

  return value === ref;
}

function _findFormControls($elem) {
  if ($elem.is("input, select, textarea")) {
    return $elem;
  }

  return $elem.find("input, select, textarea");
}

function _isActive($elem) {
  return $elem.is(":visible") && $elem.is(":enabled");
}

function _eval(input) {
  // eslint-disable-next-line
  return new Function("return ".concat(input, ";"))();
}

var _default = {
  validate: validate,
  getInvalidFields: getInvalidFields,
  markInvalidFields: markInvalidFields,
  markFailedValidationFields: markFailedValidationFields,
  unmarkAllFields: unmarkAllFields
};
exports["default"] = _default;

},{"../helper/utils":271,"jquery":3}],283:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformVariationProperties = transformVariationProperties;
exports.transformBasketItemProperties = transformBasketItemProperties;
exports["default"] = void 0;

var _utils = require("../helper/utils");

var PROPERTY_ORDER_BY_KEY = "position";
var _cachedVariationProperties = {};

function transformVariationProperties(item) {
  var propertyTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var displaySetting = arguments.length > 2 ? arguments[2] : undefined;
  var variationId = item.variation.id;
  var variationProperties = item.variationProperties;
  var variationPropertyGroups = item.variationPropertyGroups;
  var cacheKey = "".concat(variationId, "_").concat(propertyTypes.toString(), "_").concat(displaySetting);

  if (_cachedVariationProperties[cacheKey]) {
    return _cachedVariationProperties[cacheKey];
  }

  if (!((0, _utils.isDefined)(variationProperties) && variationProperties.length)) {
    return [];
  }

  var groupedProperties = {
    ungrouped: []
  };
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = variationProperties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var property = _step.value;
      property = property.property;
      var matchDisplaySetting = (0, _utils.isDefined)(displaySetting) && displaySetting.length ? property.display.includes(displaySetting) : true;
      var isCorrectType = (0, _utils.isDefined)(propertyTypes) && propertyTypes.length ? propertyTypes.includes(property.cast) : true;

      if (!matchDisplaySetting || !isCorrectType) {
        continue;
      }

      if (property.groups.length > 0) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = property.groups[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var group = _step3.value;

            if (!groupedProperties[group.id]) {
              groupedProperties[group.id] = [];
            }

            groupedProperties[group.id].push(property);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      } else {
        groupedProperties.ungrouped.push(property);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var groups = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = variationPropertyGroups[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _group = _step2.value;

      if ((0, _utils.isDefined)(groupedProperties[_group.id])) {
        groups.push({
          id: _group.id,
          position: _group.position,
          name: _group.names.name,
          description: _group.names.description,
          properties: (0, _utils.orderArrayByKey)(groupedProperties[_group.id], PROPERTY_ORDER_BY_KEY)
        });
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  if (groupedProperties.ungrouped.length) {
    groups.push({
      properties: (0, _utils.orderArrayByKey)(groupedProperties.ungrouped, PROPERTY_ORDER_BY_KEY),
      position: -1
    });
  }

  _cachedVariationProperties[cacheKey] = (0, _utils.orderArrayByKey)(groups, PROPERTY_ORDER_BY_KEY);
  return _cachedVariationProperties[cacheKey];
}

function transformBasketItemProperties(basketItem) {
  var propertyTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var displaySetting = arguments.length > 2 ? arguments[2] : undefined;
  return transformVariationProperties(basketItem.variation.data, propertyTypes, displaySetting);
}

var _default = {
  transformVariationProperties: transformVariationProperties,
  transformBasketItemProperties: transformBasketItemProperties
};
exports["default"] = _default;

},{"../helper/utils":271}],284:[function(require,module,exports){
"use strict";

module.exports = function ($) {
  var overlay = {
    count: 0,
    isVisible: false
  };
  return {
    getOverlay: getOverlay,
    showWaitScreen: showWaitScreen,
    hideWaitScreen: hideWaitScreen
  };

  function getOverlay() {
    return overlay;
  }

  function showWaitScreen() {
    overlay.count = overlay.count || 0;
    overlay.count++;
    overlay.isVisible = true;
  }

  function hideWaitScreen(force) {
    overlay.count = overlay.count || 0;

    if (overlay.count > 0) {
      overlay.count--;
    }

    if (force) {
      overlay.count = 0;
    }

    if (overlay.count <= 0) {
      overlay.count = 0;
      overlay.visible = false;
    }
  }
}(jQuery);

},{}],285:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AddressModule = _interopRequireDefault(require("store/modules/AddressModule"));

var _BasketModule = _interopRequireDefault(require("store/modules/BasketModule"));

var _CheckoutModule = _interopRequireDefault(require("store/modules/CheckoutModule"));

var _SingleItemModule = _interopRequireDefault(require("store/modules/SingleItemModule"));

var _ItemListModule = _interopRequireDefault(require("store/modules/ItemListModule"));

var _LastSeenModule = _interopRequireDefault(require("store/modules/LastSeenModule"));

var _LiveShoppingModule = _interopRequireDefault(require("store/modules/LiveShoppingModule"));

var _LocalizationModule = _interopRequireDefault(require("store/modules/LocalizationModule"));

var _NavigationModule = _interopRequireDefault(require("store/modules/NavigationModule"));

var _OrderReturnModule = _interopRequireDefault(require("store/modules/OrderReturnModule"));

var _UserModule = _interopRequireDefault(require("store/modules/UserModule"));

var _WishListModule = _interopRequireDefault(require("store/modules/WishListModule"));

var _EventPropagationPlugin = _interopRequireDefault(require("store/plugins/EventPropagationPlugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.use(require("vue-script2"));
Vue.options.delimiters = ["${", "}"]; // eslint-disable-next-line

var store = new Vuex.Store({
  modules: {
    address: _AddressModule["default"],
    basket: _BasketModule["default"],
    checkout: _CheckoutModule["default"],
    item: _SingleItemModule["default"],
    itemList: _ItemListModule["default"],
    lastSeen: _LastSeenModule["default"],
    liveShopping: _LiveShoppingModule["default"],
    localization: _LocalizationModule["default"],
    navigation: _NavigationModule["default"],
    orderReturn: _OrderReturnModule["default"],
    user: _UserModule["default"],
    wishList: _WishListModule["default"]
  },
  plugins: [_EventPropagationPlugin["default"]]
});
window.ceresStore = store;
var _default = store;
exports["default"] = _default;

},{"store/modules/AddressModule":286,"store/modules/BasketModule":287,"store/modules/CheckoutModule":288,"store/modules/ItemListModule":289,"store/modules/LastSeenModule":290,"store/modules/LiveShoppingModule":291,"store/modules/LocalizationModule":292,"store/modules/NavigationModule":293,"store/modules/OrderReturnModule":294,"store/modules/SingleItemModule":295,"store/modules/UserModule":296,"store/modules/WishListModule":297,"store/plugins/EventPropagationPlugin":298,"vue-script2":140}],286:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiService = _interopRequireDefault(require("services/ApiService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  billingAddressId: null,
  billingAddress: null,
  billingAddressList: [],
  deliveryAddressId: null,
  deliveryAddress: null,
  deliveryAddressList: []
};
var mutations = {
  setBillingAddressList: function setBillingAddressList(state, billingAddressList) {
    if (Array.isArray(billingAddressList)) {
      state.billingAddressList = billingAddressList;
    }
  },
  selectBillingAddress: function selectBillingAddress(state, billingAddress) {
    if (billingAddress) {
      state.billingAddressId = billingAddress.id;
      state.billingAddress = billingAddress;
      document.dispatchEvent(new CustomEvent("billingAddressChanged", state.billingAddress));
    }
  },
  selectBillingAddressById: function selectBillingAddressById(state, billingAddressId) {
    if (billingAddressId) {
      var billingAddress = state.billingAddressList.find(function (address) {
        return address.id === billingAddressId;
      });

      if (billingAddress) {
        state.billingAddressId = billingAddress.id;
        state.billingAddress = billingAddress;
        document.dispatchEvent(new CustomEvent("billingAddressChanged", state.billingAddress));
      }
    }
  },
  selectDeliveryAddressById: function selectDeliveryAddressById(state, deliveryAddressId) {
    if (!deliveryAddressId) {
      deliveryAddressId = -99;
    }

    if (deliveryAddressId) {
      var deliveryAddress = state.deliveryAddressList.find(function (address) {
        return address.id === deliveryAddressId;
      });

      if (deliveryAddress) {
        state.deliveryAddressId = deliveryAddress.id;
        state.deliveryAddress = deliveryAddress;
        document.dispatchEvent(new CustomEvent("deliveryAddressChanged", state.deliveryAddress));
      }
    }
  },
  setDeliveryAddressList: function setDeliveryAddressList(state, deliveryAddressList) {
    if (Array.isArray(deliveryAddressList)) {
      state.deliveryAddressList = deliveryAddressList;
    }
  },
  selectDeliveryAddress: function selectDeliveryAddress(state, deliveryAddress) {
    if (deliveryAddress) {
      state.deliveryAddressId = deliveryAddress.id;
      state.deliveryAddress = deliveryAddress;
      document.dispatchEvent(new CustomEvent("deliveryAddressChanged", state.deliveryAddress));
    }
  },
  removeBillingAddress: function removeBillingAddress(state, billingAddress) {
    var index = state.billingAddressList.indexOf(billingAddress);

    if (index !== -1) {
      state.billingAddressList.splice(index, 1);

      if (state.billingAddress === billingAddress) {
        state.billingAddress = null;
        state.billingAddressId = null;
        document.dispatchEvent(new CustomEvent("billingAddressChanged", null));
      }
    }
  },
  removeDeliveryAddress: function removeDeliveryAddress(state, deliveryAddress) {
    var index = state.deliveryAddressList.indexOf(deliveryAddress);

    if (index !== -1) {
      state.deliveryAddressList.splice(index, 1);

      if (state.deliveryAddress === deliveryAddress) {
        state.deliveryAddress = state.deliveryAddressList.find(function (address) {
          return address.id === -99;
        });
        state.deliveryAddressId = -99;
        document.dispatchEvent(new CustomEvent("deliveryAddressChanged", state.deliveryAddress));
      }
    }
  },
  addBillingAddress: function addBillingAddress(state, _ref) {
    var billingAddress = _ref.billingAddress,
        addressIndex = _ref.addressIndex;

    if (billingAddress) {
      if (addressIndex) {
        state.billingAddressList.splice(addressIndex, 0, billingAddress);
      } else {
        state.billingAddressList.push(billingAddress);
        state.billingAddressId = billingAddress.id;
        state.billingAddress = billingAddress;
        document.dispatchEvent(new CustomEvent("billingAddressChanged", state.billingAddress));
      }
    }
  },
  addDeliveryAddress: function addDeliveryAddress(state, _ref2) {
    var deliveryAddress = _ref2.deliveryAddress,
        addressIndex = _ref2.addressIndex;

    if (deliveryAddress) {
      if (addressIndex) {
        state.deliveryAddressList.splice(addressIndex, 0, deliveryAddress);
      } else {
        state.deliveryAddressList.push(deliveryAddress);
        state.deliveryAddressId = deliveryAddress.id;
        state.deliveryAddress = deliveryAddress;
        document.dispatchEvent(new CustomEvent("deliveryAddressChanged", state.deliveryAddress));
      }
    }
  },
  updateBillingAddress: function updateBillingAddress(state, billingAddress) {
    if (billingAddress) {
      var indexToUpdate = state.billingAddressList.findIndex(function (entry) {
        return entry.id === billingAddress.id;
      }); // using this "trick" to trigger the address list to render again

      state.billingAddressList.splice(indexToUpdate, 1);
      state.billingAddressList.splice(indexToUpdate, 0, billingAddress);

      if (billingAddress.id === state.billingAddressId) {
        state.billingAddress = billingAddress;
        document.dispatchEvent(new CustomEvent("billingAddressChanged", state.billingAddress));
      }
    }
  },
  updateDeliveryAddress: function updateDeliveryAddress(state, deliveryAddress) {
    if (deliveryAddress) {
      var indexToUpdate = state.deliveryAddressList.findIndex(function (entry) {
        return entry.id === deliveryAddress.id;
      }); // using this "trick" to trigger the address list to render again

      state.deliveryAddressList.splice(indexToUpdate, 1);
      state.deliveryAddressList.splice(indexToUpdate, 0, deliveryAddress);

      if (deliveryAddress.id === state.deliveryAddressId) {
        state.deliveryAddress = deliveryAddress;
        document.dispatchEvent(new CustomEvent("deliveryAddressChanged", state.deliveryAddress));
      }
    }
  },
  resetAddress: function resetAddress(state, addressType) {
    if (addressType === "1") {
      state.billingAddress = null;
      state.billingAddressId = null;
      state.billingAddressList = [];
      document.dispatchEvent(new CustomEvent("billingAddressChanged", null));
    } else if (addressType === "2") {
      state.deliveryAddressList = [{
        id: -99
      }];
      state.deliveryAddress = state.deliveryAddressList[0];
      state.deliveryAddressId = state.deliveryAddressList[0].id;
      document.dispatchEvent(new CustomEvent("deliveryAddressChanged", state.deliveryAddress));
    }
  }
};
var actions = {
  initBillingAddress: function initBillingAddress(_ref3, _ref4) {
    var commit = _ref3.commit;
    var id = _ref4.id,
        addressList = _ref4.addressList;
    commit("setBillingAddressList", addressList);
    commit("selectBillingAddress", addressList.find(function (address) {
      return address.id === id;
    }));
  },
  initDeliveryAddress: function initDeliveryAddress(_ref5, _ref6) {
    var commit = _ref5.commit;
    var id = _ref6.id,
        addressList = _ref6.addressList;
    addressList.unshift({
      id: -99
    });

    if (addressList.every(function (address) {
      return address.id !== id;
    })) {
      id = -99;
    }

    commit("setDeliveryAddressList", addressList);
    commit("selectDeliveryAddress", addressList.find(function (address) {
      return address.id === id;
    }));
  },
  selectAddress: function selectAddress(_ref7, _ref8) {
    var commit = _ref7.commit,
        state = _ref7.state,
        rootState = _ref7.rootState,
        dispatch = _ref7.dispatch;
    var selectedAddress = _ref8.selectedAddress,
        addressType = _ref8.addressType;
    return new Promise(function (resolve, reject) {
      var oldAddress = {};

      if (addressType === "1") {
        oldAddress = state.billingAddress;
        commit("selectBillingAddress", selectedAddress);
      } else if (addressType === "2") {
        oldAddress = state.deliveryAddress;
        commit("selectDeliveryAddress", selectedAddress);
      }

      commit("setIsBasketLoading", true);

      _ApiService["default"].put("/rest/io/customer/address/" + selectedAddress.id + "?typeId=" + addressType, {
        supressNotifications: true
      }).done(function (response) {
        commit("setIsBasketLoading", false);
        return resolve(response);
      }).fail(function (error) {
        if (addressType === "1") {
          commit("selectBillingAddress", oldAddress);
        } else if (addressType === "2") {
          commit("selectDeliveryAddress", oldAddress);
        }

        commit("setIsBasketLoading", false);
        reject(error);
      });
    });
  },
  deleteAddress: function deleteAddress(_ref9, _ref10) {
    var dispatch = _ref9.dispatch,
        state = _ref9.state,
        commit = _ref9.commit;
    var address = _ref10.address,
        addressType = _ref10.addressType;
    return new Promise(function (resolve, reject) {
      var addressIndex = -1;

      if (addressType === "1") {
        addressIndex = state.billingAddressList.indexOf(address);
        commit("removeBillingAddress", address);
      } else if (addressType === "2") {
        addressIndex = state.deliveryAddressList.indexOf(address);
        commit("removeDeliveryAddress", address);
      }

      _ApiService["default"]["delete"]("/rest/io/customer/address/" + address.id + "?typeId=" + addressType, null, {
        keepOriginalResponse: true
      }).done(function (response) {
        if (addressType === "1" && response.events && response.events.CheckoutChanged && response.events.CheckoutChanged.checkout) {
          var billingAddressId = response.events.CheckoutChanged.checkout.billingAddressId;
          commit("selectBillingAddressById", billingAddressId);
        }

        resolve(response);
      }).fail(function (error) {
        if (addressType === "1") {
          commit("addBillingAddress", {
            billingAddress: address,
            addressIndex: addressIndex
          });
        } else if (addressType === "2") {
          commit("addDeliveryAddress", {
            deliveryAddress: address,
            addressIndex: addressIndex
          });
        }

        reject(error);
      });
    });
  },
  createAddress: function createAddress(_ref11, _ref12) {
    var commit = _ref11.commit,
        dispatch = _ref11.dispatch;
    var address = _ref12.address,
        addressType = _ref12.addressType;
    return new Promise(function (resolve, reject) {
      _ApiService["default"].post("/rest/io/customer/address?typeId=" + addressType, address, {
        supressNotifications: true
      }).done(function (response) {
        if (addressType === "1") {
          commit("addBillingAddress", {
            billingAddress: response
          });
        } else if (addressType === "2") {
          commit("addDeliveryAddress", {
            deliveryAddress: response
          });
        }

        resolve(response);
      }).fail(function (error) {
        reject(error);
      });
    });
  },
  updateAddress: function updateAddress(_ref13, _ref14) {
    var commit = _ref13.commit,
        dispatch = _ref13.dispatch;
    var address = _ref14.address,
        addressType = _ref14.addressType;
    return new Promise(function (resolve, reject) {
      _ApiService["default"].post("/rest/io/customer/address?typeId=" + addressType, address, {
        supressNotifications: true,
        keepOriginalResponse: true
      }).done(function (response) {
        if (addressType === "1") {
          commit("updateBillingAddress", address);

          if (addressType === "1" && response.events && response.events.CheckoutChanged && response.events.CheckoutChanged.checkout) {
            var billingAddressId = response.events.CheckoutChanged.checkout.billingAddressId;
            commit("selectBillingAddressById", billingAddressId);
          }
        } else if (addressType === "2") {
          commit("updateDeliveryAddress", address);
        }

        resolve(response);
      }).fail(function (error) {
        reject(error);
      });
    });
  }
};
var getters = {
  getSelectedAddress: function getSelectedAddress(state) {
    return function (addressType) {
      var selectedAddress;

      if (addressType === "1") {
        selectedAddress = state.billingAddress;
      } else if (addressType === "2") {
        selectedAddress = state.deliveryAddress;
      }

      return selectedAddress;
    };
  },
  getAddressList: function getAddressList(state) {
    return function (addressType) {
      var addressList = [];

      if (addressType === "1") {
        addressList = state.billingAddressList;
      } else if (addressType === "2") {
        addressList = state.deliveryAddressList;
      }

      return addressList;
    };
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;

},{"services/ApiService":275}],287:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiService = _interopRequireDefault(require("services/ApiService"));

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

var _UrlService = require("../../services/UrlService");

var _url = require("../../helper/url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NotificationService = require("services/NotificationService");

var state = {
  data: {},
  items: [],
  showNetPrices: false,
  latestEntry: {
    item: {},
    quantity: null
  },
  isBasketLoading: false,
  isBasketInitiallyLoaded: false,
  basketNotifications: []
};
var mutations = {
  setBasket: function setBasket(state, basket) {
    if (state.data.id && JSON.stringify(basket) !== JSON.stringify(state.data)) {
      document.dispatchEvent(new CustomEvent("afterBasketChanged", {
        detail: basket
      }));
    }

    state.data = basket;
  },
  setBasketItems: function setBasketItems(state, basketItems) {
    state.items = basketItems;
  },
  addBasketItem: function addBasketItem(state, basketItem) {
    var basketItemIndex = state.items.findIndex(function (item) {
      return basketItem.id === item.id;
    });

    if (basketItemIndex !== -1) {
      state.items.splice(basketItemIndex, 1);
      state.items.splice(basketItemIndex, 0, basketItem);
    } else {
      state.items.push(basketItem);
    }
  },
  addBasketNotification: function addBasketNotification(state, _ref) {
    var type = _ref.type,
        message = _ref.message;
    state.basketNotifications.push({
      type: type,
      message: message
    });
  },
  clearOldestNotification: function clearOldestNotification(state) {
    state.basketNotifications.splice(0, 1);
  },
  updateBasketItemQuantity: function updateBasketItemQuantity(state, _ref2) {
    var basketItem = _ref2.basketItem,
        quantity = _ref2.quantity;
    var item = state.items.find(function (item) {
      return basketItem.id === item.id;
    });
    item.quantity = quantity;
  },
  removeBasketItem: function removeBasketItem(state, basketItemId) {
    state.items = state.items.filter(function (item) {
      return item.id !== basketItemId;
    });
  },
  setLatestBasketEntry: function setLatestBasketEntry(state, latestBasketEntry) {
    state.latestEntry = latestBasketEntry;
  },
  setCouponCode: function setCouponCode(state, couponCode) {
    state.data.couponCode = couponCode;
  },
  setIsBasketLoading: function setIsBasketLoading(state, isBasketLoading) {
    state.isBasketLoading = !!isBasketLoading;
  },
  setIsBasketInitiallyLoaded: function setIsBasketInitiallyLoaded(state) {
    state.isBasketInitiallyLoaded = true;
  },
  setShowNetPrices: function setShowNetPrices(state, showNetPrices) {
    state.showNetPrices = showNetPrices;
  }
};
var actions = {
  loadBasketData: function loadBasketData(_ref3) {
    var commit = _ref3.commit,
        state = _ref3.state;
    jQuery.when(_ApiService["default"].get("/rest/io/basket", {}, {
      cache: false
    }), _ApiService["default"].get("/rest/io/basket/items", {
      template: "Ceres::Basket.Basket"
    }, {
      cache: false
    })).then(function (basket, basketItems) {
      commit("setBasket", basket);
      commit("setBasketItems", basketItems);
      commit("setIsBasketInitiallyLoaded");
    })["catch"](function (error, status) {
      console.log(error, status);

      if (status > 0) {
        NotificationService.error(_TranslationService["default"].translate("Ceres::Template.basketOops")).closeAfter(10000);
      }
    });

    _ApiService["default"].listen("AfterBasketChanged", function (data) {
      commit("setBasket", data.basket);
      commit("setShowNetPrices", data.showNetPrices);
      commit("setBasketItems", data.basketItems);
    });
  },
  addBasketNotification: function addBasketNotification(_ref4, _ref5) {
    var commit = _ref4.commit;
    var type = _ref5.type,
        message = _ref5.message;
    commit("addBasketNotification", {
      type: type,
      message: message
    });
    setTimeout(function () {
      commit("clearOldestNotification");
    }, 5000);
  },
  addBasketItem: function addBasketItem(_ref6, basketItem) {
    var commit = _ref6.commit;
    return new Promise(function (resolve, reject) {
      commit("setIsBasketLoading", true);
      basketItem.template = "Ceres::Basket.Basket";

      _ApiService["default"].post("/rest/io/basket/items/", basketItem).done(function (basketItems) {
        commit("setBasketItems", basketItems);
        commit("setIsBasketLoading", false);
        resolve(basketItems);
      }).fail(function (error) {
        commit("setIsBasketLoading", false);
        reject(error);
      });
    });
  },
  updateBasketItemQuantity: function updateBasketItemQuantity(_ref7, _ref8) {
    var commit = _ref7.commit;
    var basketItem = _ref8.basketItem,
        quantity = _ref8.quantity;
    return new Promise(function (resolve, reject) {
      commit("updateBasketItemQuantity", {
        basketItem: basketItem,
        quantity: quantity
      });
      commit("setIsBasketLoading", true);
      basketItem.template = "Ceres::Basket.Basket";

      _ApiService["default"].put("/rest/io/basket/items/" + basketItem.id, basketItem).done(function (data) {
        commit("setBasketItems", data);
        commit("setIsBasketLoading", false);
        resolve(data);
      }).fail(function (error) {
        commit("setIsBasketLoading", false);
        reject(error);
      });
    });
  },
  removeBasketItem: function removeBasketItem(_ref9, basketItemId) {
    var commit = _ref9.commit;
    return new Promise(function (resolve, reject) {
      commit("setIsBasketLoading", true);

      _ApiService["default"]["delete"]("/rest/io/basket/items/" + basketItemId, {
        template: "Ceres::Basket.Basket"
      }).done(function (basketItems) {
        commit("setBasketItems", basketItems);
        commit("setIsBasketLoading", false);
        resolve(basketItems);

        if ((0, _url.pathnameEquals)(App.urls.checkout) && !basketItems.length) {
          (0, _UrlService.navigateTo)(App.urls.basket);
        }
      }).fail(function (error) {
        commit("setIsBasketLoading", false);
        reject(error);
      });
    });
  },
  redeemCouponCode: function redeemCouponCode(_ref10, couponCode) {
    var state = _ref10.state,
        commit = _ref10.commit;
    return new Promise(function (resolve, reject) {
      commit("setIsBasketLoading", true);

      _ApiService["default"].post("/rest/io/coupon", {
        couponCode: couponCode
      }, {
        supressNotifications: true
      }).done(function (data) {
        commit("setCouponCode", couponCode);
        commit("setIsBasketLoading", false);
        resolve(data);
      }).fail(function (error) {
        commit("setIsBasketLoading", false);
        reject(error);
      });
    });
  },
  removeCouponCode: function removeCouponCode(_ref11, couponCode) {
    var state = _ref11.state,
        commit = _ref11.commit;
    return new Promise(function (resolve, reject) {
      commit("setIsBasketLoading", true);

      _ApiService["default"]["delete"]("/rest/io/coupon/" + couponCode).done(function (data) {
        commit("setCouponCode", null);
        commit("setIsBasketLoading", false);
        resolve(data);
      }).fail(function (error) {
        commit("setIsBasketLoading", false);
        reject(error);
      });
    });
  },
  refreshBasket: function refreshBasket(_ref12) {
    var commit = _ref12.commit;
    return new Promise(function (resolve, reject) {
      _ApiService["default"].get("/rest/io/basket/").done(function (basket) {
        commit("setBasket", basket);
        resolve(basket);
      }).fail(function (error) {
        reject(error);
      });
    });
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions
};
exports["default"] = _default;

},{"../../helper/url":270,"../../services/UrlService":281,"services/ApiService":275,"services/NotificationService":279,"services/TranslationService":280}],288:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiService = _interopRequireDefault(require("services/ApiService"));

var _utils = require("../../helper/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  shipping: {
    isParcelBoxAvailable: false,
    isPostOfficeAvailable: false,
    selectedShippingProfile: null,
    shippingProfileId: null,
    shippingProfileList: [],
    maxDeliveryDays: null
  },
  payment: {
    methodOfPaymentId: null,
    methodOfPaymentList: []
  },
  contactWish: null,
  shippingPrivacyHintAccepted: false,
  validation: {
    gtc: {
      showError: false,
      validate: null
    },
    invoiceAddress: {
      showError: false,
      validate: null
    },
    paymentProvider: {
      showError: false,
      validate: null
    },
    shippingProfile: {
      showError: false,
      validate: null
    }
  },
  newsletterSubscription: {},
  readOnly: false
};
var mutations = {
  setShippingProfile: function setShippingProfile(state, shippingProfileId) {
    if (shippingProfileId) {
      state.shipping.shippingProfileId = shippingProfileId;
    }
  },
  setSelectedShippingProfile: function setSelectedShippingProfile(state, shippingProfile) {
    state.shipping.selectedShippingProfile = shippingProfile;
  },
  setShippingProfileList: function setShippingProfileList(state, shippingProfileList) {
    if (Array.isArray(shippingProfileList)) {
      state.shipping.shippingProfileList = shippingProfileList;
    }
  },
  setMaxDeliveryDays: function setMaxDeliveryDays(state, maxDeliveryDays) {
    state.shipping.maxDeliveryDays = maxDeliveryDays;
  },
  setMethodOfPayment: function setMethodOfPayment(state, methodOfPaymentId) {
    if (methodOfPaymentId) {
      state.payment.methodOfPaymentId = methodOfPaymentId;
    }
  },
  setMethodOfPaymentList: function setMethodOfPaymentList(state, methodOfPaymentList) {
    if (Array.isArray(methodOfPaymentList)) {
      state.payment.methodOfPaymentList = methodOfPaymentList;
    }
  },
  setContactWish: function setContactWish(state, contactWish) {
    state.contactWish = contactWish;
  },
  setShippingPrivacyHintAccepted: function setShippingPrivacyHintAccepted(state, value) {
    state.shippingPrivacyHintAccepted = value;
  },
  setPaymentProviderValidator: function setPaymentProviderValidator(state, paymentProviderValidator) {
    state.validation.paymentProvider.validate = paymentProviderValidator;
  },
  setPaymentProviderShowError: function setPaymentProviderShowError(state, showError) {
    state.validation.paymentProvider.showError = showError;
  },
  setShippingProfileValidator: function setShippingProfileValidator(state, shippingProfileValidator) {
    state.validation.shippingProfile.validate = shippingProfileValidator;
  },
  setShippingProfileShowError: function setShippingProfileShowError(state, showError) {
    state.validation.shippingProfile.showError = showError;
  },
  setGtcValidator: function setGtcValidator(state, gtcValidator) {
    state.validation.gtc.validate = gtcValidator;
  },
  setGtcShowError: function setGtcShowError(state, showError) {
    state.validation.gtc.showError = showError;
  },
  setInvoiceAddressValidator: function setInvoiceAddressValidator(state, invoiceAddressValidator) {
    state.validation.invoiceAddress.validate = invoiceAddressValidator;
  },
  setInvoiceAddressShowError: function setInvoiceAddressShowError(state, showError) {
    state.validation.invoiceAddress.showError = showError;
  },
  setParcelBoxAvailability: function setParcelBoxAvailability(state, availability) {
    state.shipping.isParcelBoxAvailable = availability;
  },
  setPostOfficeAvailability: function setPostOfficeAvailability(state, availability) {
    state.shipping.isPostOfficeAvailable = availability;
  },
  setSubscribeNewsletterCheck: function setSubscribeNewsletterCheck(state, _ref) {
    var emailFolder = _ref.emailFolder,
        value = _ref.value;
    Vue.set(state.newsletterSubscription, emailFolder, value);
  },
  addSubscribeNewsletterValidate: function addSubscribeNewsletterValidate(state, _ref2) {
    var emailFolder = _ref2.emailFolder,
        validator = _ref2.validator;
    Vue.set(state.validation, "subscribeNewsletter_".concat(emailFolder), {
      validate: validator,
      showError: false
    });
  },
  setSubscribeNewsletterShowErr: function setSubscribeNewsletterShowErr(state, _ref3) {
    var emailFolder = _ref3.emailFolder,
        showError = _ref3.showError;
    Vue.set(state.validation["subscribeNewsletter_".concat(emailFolder)], "showError", showError);
  },
  setIsCheckoutReadonly: function setIsCheckoutReadonly(state, readOnly) {
    state.readOnly = !!readOnly;
  }
};
var actions = {
  setCheckout: function setCheckout(_ref4, checkout) {
    var commit = _ref4.commit,
        dispatch = _ref4.dispatch;
    commit("setShippingCountryId", checkout.shippingCountryId);
    commit("setShippingProfile", checkout.shippingProfileId);
    commit("setShippingProfileList", checkout.shippingProfileList);
    commit("setMaxDeliveryDays", checkout.maxDeliveryDays);
    commit("setMethodOfPaymentList", checkout.paymentDataList);
    commit("setMethodOfPayment", checkout.methodOfPaymentId);
    commit("setIsCheckoutReadonly", checkout.readOnly);
    dispatch("setShippingProfileById", checkout.shippingProfileId);
    dispatch("initProfileAvailabilities");
  },
  setShippingProfileById: function setShippingProfileById(_ref5, shippingProfileId) {
    var state = _ref5.state,
        commit = _ref5.commit;
    var shippingProfile = state.shipping.shippingProfileList.find(function (profile) {
      return profile.parcelServicePresetId === shippingProfileId;
    });

    if (!(0, _utils.isNullOrUndefined)(shippingProfile)) {
      commit("setSelectedShippingProfile", shippingProfile);
    }
  },
  selectMethodOfPayment: function selectMethodOfPayment(_ref6, methodOfPaymentId) {
    var commit = _ref6.commit,
        dispatch = _ref6.dispatch;
    return new Promise(function (resolve, reject) {
      var oldMethodOfPayment = state.payment.methodOfPaymentId;
      commit("setIsBasketLoading", true);
      commit("setMethodOfPayment", methodOfPaymentId);

      _ApiService["default"].post("/rest/io/checkout/paymentId/", {
        paymentId: methodOfPaymentId
      }).done(function (response) {
        commit("setIsBasketLoading", false);
        resolve(response);
      }).fail(function (error) {
        commit("setIsBasketLoading", false);
        commit("setMethodOfPayment", oldMethodOfPayment);
        reject(error);
      });
    });
  },
  selectShippingProfile: function selectShippingProfile(_ref7, shippingProfile) {
    var commit = _ref7.commit,
        dispatch = _ref7.dispatch,
        getters = _ref7.getters;
    return new Promise(function (resolve, reject) {
      var oldShippingProfile = state.shipping.shippingProfileId;
      commit("setIsBasketLoading", true);
      commit("setShippingProfile", shippingProfile.parcelServicePresetId);

      _ApiService["default"].post("/rest/io/checkout/shippingId/", {
        shippingId: shippingProfile.parcelServicePresetId
      }).done(function (response) {
        commit("setSelectedShippingProfile", shippingProfile);
        commit("setIsBasketLoading", false);
        resolve(response);
      }).fail(function (error) {
        commit("setIsBasketLoading", false);
        commit("setShippingProfile", oldShippingProfile);
        reject(error);
      });
    });
  },
  refreshCheckout: function refreshCheckout(_ref8) {
    var commit = _ref8.commit,
        dispatch = _ref8.dispatch;
    return new Promise(function (resolve, reject) {
      _ApiService["default"].get("/rest/io/checkout/").done(function (checkout) {
        dispatch("setCheckout", checkout);
        resolve(checkout);
      }).fail(function (error) {
        reject(error);
      });
    });
  },
  initProfileAvailabilities: function initProfileAvailabilities(_ref9) {
    var commit = _ref9.commit,
        state = _ref9.state;
    commit("setParcelBoxAvailability", !(0, _utils.isNullOrUndefined)(state.shipping.shippingProfileList.find(function (shipping) {
      return shipping.isParcelBox;
    })));
    commit("setPostOfficeAvailability", !(0, _utils.isNullOrUndefined)(state.shipping.shippingProfileList.find(function (shipping) {
      return shipping.isPostOffice;
    })));
  }
};
var getters = {
  isParcelOrOfficeAvailable: function isParcelOrOfficeAvailable(state) {
    return state.shipping.isParcelBoxAvailable || state.shipping.isPostOfficeAvailable;
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;

},{"../../helper/utils":271,"services/ApiService":275}],289:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiService = _interopRequireDefault(require("services/ApiService"));

var _ItemListUrlService = require("services/ItemListUrlService");

var _UrlService = require("services/UrlService");

var _TranslationService = _interopRequireDefault(require("services/TranslationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  facets: [],
  selectedFacets: [],
  page: null,
  sorting: "texts.name1_asc",
  isLoading: false,
  itemsPerPage: null,
  searchString: null,
  items: [],
  totalItems: null
};
var mutations = {
  setFacets: function setFacets(state, facets) {
    state.facets = facets || [];
  },
  setPriceFacet: function setPriceFacet(state, _ref) {
    var priceMin = _ref.priceMin,
        priceMax = _ref.priceMax;
    var priceMinFormatted = Vue.filter("currency").apply(Object, [priceMin]);
    var priceMaxFormatted = Vue.filter("currency").apply(Object, [priceMax]);
    var priceFacet = {
      id: "price",
      priceMin: priceMin,
      priceMax: priceMax
    };

    if (!priceMax.length) {
      priceFacet.name = _TranslationService["default"].translate("Ceres::Template.itemFrom") + priceMinFormatted;
    } else if (!priceMin.length) {
      priceFacet.name = _TranslationService["default"].translate("Ceres::Template.itemTo") + priceMaxFormatted;
    } else {
      priceFacet.name = priceMinFormatted + " - " + priceMaxFormatted;
    }

    state.facets.find(function (facet) {
      return facet.type === "price";
    }).values[0] = priceFacet;
  },
  setPriceFacetTag: function setPriceFacetTag(state) {
    var priceFacet = state.facets.find(function (facet) {
      return facet.type === "price";
    }).values[0];
    var selectedPriceFacet = state.selectedFacets.find(function (facet) {
      return facet.id === "price";
    });

    if (selectedPriceFacet) {
      Object.assign(selectedPriceFacet, priceFacet);
    } else {
      state.selectedFacets.push(priceFacet);
    }
  },
  removePriceFacet: function removePriceFacet(state) {
    state.selectedFacets = state.selectedFacets.filter(function (facet) {
      return facet.id !== "price";
    });
  },
  setSelectedFacetsByIds: function setSelectedFacetsByIds(state, selectedFacetIds) {
    var selectedFacets = [];

    if (selectedFacetIds.length > 0) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = state.facets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var facet = _step.value;
          selectedFacets = selectedFacets.concat(facet.values.filter(function (facetValue) {
            return selectedFacetIds.some(function (facetId) {
              return facetId === facetValue.id + "";
            });
          }));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    state.selectedFacets = selectedFacets;
  },
  toggleSelectedFacet: function toggleSelectedFacet(state, facetValue) {
    if (!state.selectedFacets.find(function (selectedFacet) {
      return selectedFacet.id === facetValue.id;
    })) {
      state.selectedFacets.push(facetValue);
    } else {
      state.selectedFacets = state.selectedFacets.filter(function (selectedFacet) {
        return selectedFacet.id !== facetValue.id;
      });
    }
  },
  resetAllSelectedFacets: function resetAllSelectedFacets(state) {
    state.selectedFacets = [];
  },
  setItemListPage: function setItemListPage(state, page) {
    state.page = page;
  },
  setItemListSorting: function setItemListSorting(state, sorting) {
    state.sorting = sorting;
  },
  setItemsPerPage: function setItemsPerPage(state, itemsPerPage) {
    state.itemsPerPage = parseInt(itemsPerPage);
  },
  setIsItemListLoading: function setIsItemListLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setItemListSearchString: function setItemListSearchString(state, searchString) {
    state.searchString = searchString;
  },
  setItemListItems: function setItemListItems(state, items) {
    state.items = items;
  },
  setItemListTotalItems: function setItemListTotalItems(state, totalItems) {
    state.totalItems = totalItems;
  }
};
var actions = {
  selectFacet: function selectFacet(_ref2, _ref3) {
    var dispatch = _ref2.dispatch,
        commit = _ref2.commit;
    var facetValue = _ref3.facetValue;

    if (facetValue.id === "price") {
      commit("removePriceFacet");
    } else {
      commit("toggleSelectedFacet", facetValue);
    }

    commit("setItemListPage", 1);
    dispatch("loadFacets");
  },
  selectPriceFacet: function selectPriceFacet(_ref4, _ref5) {
    var dispatch = _ref4.dispatch,
        commit = _ref4.commit;
    var priceMin = _ref5.priceMin,
        priceMax = _ref5.priceMax;
    commit("setPriceFacet", {
      priceMin: priceMin,
      priceMax: priceMax
    });
    commit("setPriceFacetTag");
    commit("setItemListPage", 1);
    dispatch("loadFacets");
  },
  selectItemListPage: function selectItemListPage(_ref6, page) {
    var dispatch = _ref6.dispatch,
        commit = _ref6.commit;
    commit("setItemListPage", page);
    dispatch("loadItemList");
  },
  selectItemListSorting: function selectItemListSorting(_ref7, sorting) {
    var dispatch = _ref7.dispatch,
        commit = _ref7.commit;
    commit("setItemListSorting", sorting);
    commit("setItemListPage", 1);
    dispatch("loadItemList");
  },
  selectItemsPerPage: function selectItemsPerPage(_ref8, itemsPerPage) {
    var dispatch = _ref8.dispatch,
        commit = _ref8.commit;
    commit("setItemsPerPage", itemsPerPage);
    commit("setItemListPage", 1);
    dispatch("loadItemList");
  },
  searchItems: function searchItems(_ref9, searchString) {
    var dispatch = _ref9.dispatch,
        commit = _ref9.commit;
    commit("setItemListSearchString", searchString);
    commit("setItemListPage", 1);
    commit("setSelectedFacetsByIds", []);
    dispatch("loadItemList");
  },
  loadFacets: function loadFacets(_ref10) {
    var commit = _ref10.commit,
        getters = _ref10.getters,
        rootState = _ref10.rootState;
    var selectedPriceFacet = state.selectedFacets.find(function (facet) {
      return facet.id === "price";
    });
    var params = {
      categoryId: rootState.navigation.currentCategory ? rootState.navigation.currentCategory.id : null,
      facets: getters.selectedFacetIdsForUrl.toString(),
      priceMax: selectedPriceFacet ? selectedPriceFacet.priceMax : "",
      priceMin: selectedPriceFacet ? selectedPriceFacet.priceMin : "",
      query: state.searchString
    };
    commit("setIsItemListLoading", true);
    return new Promise(function (resolve, reject) {
      _ApiService["default"].get("/rest/io/facet", params).done(function (data) {
        commit("setFacets", data.facets);
        commit("setIsItemListLoading", false);
        resolve(data);
      }).fail(function (error) {
        commit("setIsItemListLoading", false);
        reject(error);
      });
    });
  },
  loadItemList: function loadItemList(_ref11) {
    var state = _ref11.state,
        commit = _ref11.commit,
        getters = _ref11.getters;
    var selectedPriceFacet = state.selectedFacets.find(function (facet) {
      return facet.id === "price";
    });
    var searchParams = {
      query: state.searchString,
      items: parseInt(state.itemsPerPage),
      sorting: state.sorting,
      page: state.page,
      facets: getters.selectedFacetIdsForUrl.toString(),
      priceMin: selectedPriceFacet ? selectedPriceFacet.priceMin : "",
      priceMax: selectedPriceFacet ? selectedPriceFacet.priceMax : ""
    };
    commit("setIsItemListLoading", true);
    (0, _UrlService.navigateToParams)((0, _ItemListUrlService.getItemListUrlParams)(searchParams));
  }
};
var getters = {
  selectedFacetIds: function selectedFacetIds(state) {
    var selectedFacetIds = [];
    state.selectedFacets.every(function (facet) {
      return selectedFacetIds.push(facet.id);
    });
    return selectedFacetIds;
  },
  selectedFacetIdsForUrl: function selectedFacetIdsForUrl(state) {
    var selectedFacetIds = [];
    state.selectedFacets.every(function (facet) {
      return selectedFacetIds.push(facet.id);
    });
    return selectedFacetIds.filter(function (facet) {
      return facet !== "price";
    });
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;

},{"services/ApiService":275,"services/ItemListUrlService":277,"services/TranslationService":280,"services/UrlService":281}],290:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiService = _interopRequireDefault(require("services/ApiService"));

var _utils = require("../../helper/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  containers: {},
  isLastSeenItemsLoading: false,
  lastSeenItems: []
};
var mutations = {
  setLastSeenItems: function setLastSeenItems(state, lastSeenItems) {
    state.lastSeenItems = lastSeenItems;
  },
  setIsLastSeenItemsLoading: function setIsLastSeenItemsLoading(state, isLoading) {
    state.isLastSeenItemsLoading = isLoading;
  },
  setLastSeenItemContainers: function setLastSeenItemContainers(state, containers) {
    state.containers = containers;
  }
};
var actions = {
  addLastSeenItem: function addLastSeenItem(_ref, variationId) {
    var commit = _ref.commit,
        state = _ref.state;

    if (!state.isLastSeenItemsLoading) {
      return new Promise(function (resolve, reject) {
        commit("setIsLastSeenItemsLoading", true);

        _ApiService["default"].put("/rest/io/item/last_seen/".concat(variationId)).done(function (response) {
          if ((0, _utils.isDefined)(response.lastSeenItems)) {
            commit("setLastSeenItems", response.lastSeenItems.documents);
            commit("setLastSeenItemContainers", response.containers);
            commit("setIsLastSeenItemsLoading", false);
            resolve(response.lastSeenItems.documents);
          } else {
            resolve(null);
          }
        }).fail(function (error) {
          commit("setIsLastSeenItemsLoading", false);
          reject(error);
        });
      });
    }

    return null;
  },
  getLastSeenItems: function getLastSeenItems(_ref2) {
    var commit = _ref2.commit;

    if (!state.isLastSeenItemsLoading) {
      return new Promise(function (resolve, reject) {
        commit("setIsLastSeenItemsLoading", true);

        _ApiService["default"].get("/rest/io/item/last_seen").done(function (response) {
          if ((0, _utils.isDefined)(response) && (0, _utils.isDefined)(response.lastSeenItems)) {
            commit("setLastSeenItems", response.lastSeenItems.documents);
            commit("setLastSeenItemContainers", response.containers);
            commit("setIsLastSeenItemsLoading", false);
            resolve(response.lastSeenItems.documents);
          } else {
            resolve(null);
          }
        }).fail(function (error) {
          commit("setIsLastSeenItemsLoading", false);
          reject(error);
        });
      });
    }

    return null;
  }
};
var _default = {
  state: state,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;

},{"../../helper/utils":271,"services/ApiService":275}],291:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiService = _interopRequireDefault(require("services/ApiService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  liveShoppingOffers: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null
  }
};
var mutations = {
  setLiveShoppingOffer: function setLiveShoppingOffer(state, _ref) {
    var liveShoppingId = _ref.liveShoppingId,
        liveShoppingOffer = _ref.liveShoppingOffer;
    state.liveShoppingOffers[liveShoppingId] = liveShoppingOffer;
  }
};
var actions = {
  retrieveLiveShoppingOffer: function retrieveLiveShoppingOffer(_ref2, liveShoppingId) {
    var commit = _ref2.commit;
    return new Promise(function (resolve, reject) {
      _ApiService["default"].get("/rest/io/live-shopping/" + liveShoppingId).done(function (liveShoppingOffer) {
        if (liveShoppingOffer.item) {
          commit("setLiveShoppingOffer", {
            liveShoppingId: liveShoppingId,
            liveShoppingOffer: liveShoppingOffer
          });
        } else {
          commit("setLiveShoppingOffer", {
            liveShoppingId: liveShoppingId,
            liveShoppingOffer: null
          });
        }

        resolve(liveShoppingOffer);
      }).fail(function (error) {
        reject(error);
      });
    });
  }
};
var getters = {};
var _default = {
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters
};
exports["default"] = _default;

},{"services/ApiService":275}],292:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiService = _interopRequireDefault(require("services/ApiService"));

var _utils = require("../../helper/utils");

var _UrlService = require("services/UrlService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  shippingCountries: [],
  shippingCountryId: null
};
var mutations = {
  setShippingCountries: function setShippingCountries(state, shippingCountries) {
    state.shippingCountries = shippingCountries;
  },
  setShippingCountryId: function setShippingCountryId(state, shippingCountryId) {
    if (shippingCountryId !== state.shippingCountryId) {
      document.dispatchEvent(new CustomEvent("afterShippingCountryChanged", {
        detail: shippingCountryId
      }));
    }

    state.shippingCountryId = shippingCountryId;
  }
};
var actions = {
  selectShippingCountry: function selectShippingCountry(_ref, _ref2) {
    var commit = _ref.commit,
        state = _ref.state;
    var shippingCountryId = _ref2.shippingCountryId,
        openBasketPreview = _ref2.openBasketPreview;
    return new Promise(function (resolve, reject) {
      var oldShippingCountryId = state.shippingCountryId;
      commit("setShippingCountryId", shippingCountryId);

      _ApiService["default"].post("/rest/io/shipping/country", {
        shippingCountryId: shippingCountryId
      }).done(function (data) {
        if ((0, _utils.isNullOrUndefined)(oldShippingCountryId) || oldShippingCountryId !== data) {
          if (openBasketPreview) {
            (0, _UrlService.setUrlParam)({
              openBasketPreview: 1
            });
          }

          window.location.reload();
        }

        resolve(data);
      }).fail(function (error) {
        commit("setShippingCountryId", oldShippingCountryId);
        reject(error);
      });
    });
  }
};
var getters = {
  getCountryName: function getCountryName(state) {
    return function (countryId) {
      if (countryId > 0) {
        var country = state.shippingCountries.find(function (country) {
          return country.id === countryId;
        });

        if (!(0, _utils.isNullOrUndefined)(country)) {
          return country.currLangName;
        }
      }

      return "";
    };
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;

},{"../../helper/utils":271,"services/ApiService":275,"services/UrlService":281}],293:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var state = {
  tree: [],
  currentCategory: null
};
var mutations = {
  setNavigationTree: function setNavigationTree(state, navigationTree) {
    state.tree = navigationTree;
  },
  setCurrentCategory: function setCurrentCategory(state, category) {
    state.currentCategory = category;
  }
};
var actions = {
  initNavigationTree: function initNavigationTree(_ref, navigationTree) {
    var dispatch = _ref.dispatch,
        commit = _ref.commit;

    if (navigationTree) {
      dispatch("buildNavigationTreeItem", {
        navigationTree: navigationTree
      });
    }

    commit("setNavigationTree", navigationTree);
  },
  buildNavigationTreeItem: function buildNavigationTreeItem(_ref2, _ref3) {
    var state = _ref2.state,
        commit = _ref2.commit,
        dispatch = _ref2.dispatch;
    var navigationTree = _ref3.navigationTree,
        parent = _ref3.parent;
    var showChildren = false;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = navigationTree[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var category = _step.value;
        category.parent = parent; // hide category if there is no translation

        if (!category.details[0]) {
          category.hideCategory = true;
        } else {
          var parentUrl = "";

          if (parent) {
            parentUrl = parent.url;

            if (App.urlTrailingSlash) {
              parentUrl = parentUrl.substring(0, parentUrl.length - 1);
            }
          } else if (App.defaultLanguage != category.details[0].lang) {
            parentUrl = "/" + category.details[0].lang;
          }

          category.url = parentUrl + "/" + category.details[0].nameUrl;

          if (App.urlTrailingSlash) {
            category.url += "/";
          }

          showChildren = true;

          if (category.children) {
            dispatch("buildNavigationTreeItem", {
              navigationTree: category.children,
              parent: category
            });
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (parent) {
      parent.showChildren = showChildren;
    }
  },
  setCurrentCategoryById: function setCurrentCategoryById(_ref4, _ref5) {
    var state = _ref4.state,
        commit = _ref4.commit,
        dispatch = _ref4.dispatch;
    var categoryId = _ref5.categoryId,
        categories = _ref5.categories;
    categories = categories || state.tree;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = categories[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var category = _step2.value;

        if (category.id === categoryId) {
          commit("setCurrentCategory", category);
          return;
        } else if (category.children) {
          dispatch("setCurrentCategoryById", {
            categoryId: categoryId,
            categories: category.children
          });
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
};
var getters = {
  breadcrumbs: function breadcrumbs(state) {
    var breadcrumbs = [];

    if (state.currentCategory) {
      var currentIteration = state.currentCategory;

      while (currentIteration) {
        breadcrumbs.unshift(currentIteration);
        currentIteration = currentIteration.parent;
      }
    }

    return breadcrumbs;
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;

},{}],294:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiService = _interopRequireDefault(require("services/ApiService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  orderData: {},
  orderReturnItems: [],
  orderReturnNote: ""
};
var mutations = {
  setOrderReturnData: function setOrderReturnData(state, orderData) {
    orderData.order.orderItems = orderData.order.orderItems.filter(function (orderItem) {
      return orderItem.quantity !== 0;
    });
    state.orderData = orderData;
  },
  updateOrderReturnItems: function updateOrderReturnItems(state, _ref) {
    var quantity = _ref.quantity,
        orderItem = _ref.orderItem;

    if (quantity <= orderItem.quantity) {
      var orderItemIndex = state.orderReturnItems.findIndex(function (entry) {
        return entry.orderItem.itemVariationId === orderItem.itemVariationId;
      });

      if (quantity !== 0) {
        if (orderItemIndex === -1) {
          state.orderReturnItems.push({
            quantity: quantity,
            orderItem: orderItem
          });
        } else {
          state.orderReturnItems.splice(orderItemIndex, 1);
          state.orderReturnItems.splice(orderItemIndex, 0, {
            quantity: quantity,
            orderItem: orderItem
          });
        }
      } else {
        state.orderReturnItems.splice(orderItemIndex, 1);
      }
    }
  },
  updateOrderReturnNote: function updateOrderReturnNote(state, orderReturnNote) {
    state.orderReturnNote = orderReturnNote;
  }
};
var actions = {
  sendOrderReturn: function sendOrderReturn(_ref2) {
    var state = _ref2.state;
    return new Promise(function (resolve, reject) {
      if (state.orderReturnItems.length > 0) {
        var variationIds = {};

        for (var index in state.orderReturnItems) {
          variationIds[state.orderReturnItems[index].orderItem.itemVariationId] = state.orderReturnItems[index].quantity;
        }

        _ApiService["default"].post("/rest/io/order/return", {
          orderId: state.orderData.order.id,
          variationIds: variationIds,
          returnNote: state.orderReturnNote
        }).done(function (data) {
          resolve(data);
        }).fail(function (error) {
          reject(error);
        });
      } else {
        reject();
      }
    });
  }
};
var getters = {
  getOrderItemImage: function getOrderItemImage(state) {
    return function (orderItemId) {
      return state.orderData.itemImages[orderItemId];
    };
  },
  getOrderItemURL: function getOrderItemURL(state) {
    return function (orderItemId) {
      return state.orderData.itemURLs[orderItemId];
    };
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;

},{"services/ApiService":275}],295:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../../helper/utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
  variation: {},
  variationList: [],
  variationOrderQuantity: 1,
  variationMarkInvalidProperties: false,
  isVariationSelected: true
};
var mutations = {
  setVariation: function setVariation(state, variation) {
    state.variation = variation;

    if (variation.documents.length > 0 && variation.documents[0].data.variation) {
      state.variationOrderQuantity = variation.documents[0].data.variation.minimumOrderQuantity || 1;
    }
  },
  setVariationList: function setVariationList(state, variationList) {
    state.variationList = variationList;
  },
  setVariationOrderProperty: function setVariationOrderProperty(state, _ref) {
    var propertyId = _ref.propertyId,
        value = _ref.value;
    var index = state.variation.documents[0].data.properties.findIndex(function (property) {
      return property.property.id === propertyId;
    });

    if (index >= 0) {
      Vue.set(state.variation.documents[0].data.properties[index], "property", _objectSpread({}, state.variation.documents[0].data.properties[index].property, {
        value: value
      }));
    }
  },
  setVariationOrderQuantity: function setVariationOrderQuantity(state, quantity) {
    state.variationOrderQuantity = quantity;
  },
  setVariationMarkInvalidProps: function setVariationMarkInvalidProps(state, markFields) {
    state.variationMarkInvalidProperties = !!markFields;
  },
  setIsVariationSelected: function setIsVariationSelected(state, isVariationSelected) {
    state.isVariationSelected = !!isVariationSelected;
  }
};
var actions = {};
var getters = {
  variationPropertySurcharge: function variationPropertySurcharge(state) {
    if (!state || !state.variation.documents) {
      return 0;
    }

    var sum = 0;

    if (state.variation.documents[0].data.properties) {
      var addedProperties = state.variation.documents[0].data.properties.filter(function (property) {
        return !!property.property.value;
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = addedProperties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var property = _step.value;
          sum += property.surcharge || property.property.surcharge;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    return sum;
  },
  variationGraduatedPrice: function variationGraduatedPrice(state) {
    if (!state || !state.variation.documents) {
      return null;
    }

    var calculatedPrices = state.variation.documents[0].data.prices;
    var graduatedPrices = calculatedPrices.graduatedPrices;
    var returnPrice;

    if (graduatedPrices && graduatedPrices[0]) {
      var prices = graduatedPrices.filter(function (price) {
        return parseFloat(state.variationOrderQuantity) >= price.minimumOrderQuantity;
      });

      if (prices[0]) {
        returnPrice = prices.reduce(function (prev, current) {
          return prev.minimumOrderQuantity > current.minimumOrderQuantity ? prev : current;
        }); // returnPrice = returnPrice.unitPrice.value;
      }
    }

    return returnPrice || calculatedPrices["default"];
  },
  variationTotalPrice: function variationTotalPrice(state, getters, rootState, rootGetters) {
    var graduatedPrice = getters.variationGraduatedPrice ? getters.variationGraduatedPrice.unitPrice.value : 0;

    if (!(0, _utils.isNullOrUndefined)(graduatedPrice) && state.variation.documents) {
      var specialOfferPrice = Vue.filter("specialOffer").apply(Object, [graduatedPrice, state.variation.documents[0].data.prices, "price", "value"]);
      return specialOfferPrice === "N / A" ? specialOfferPrice : getters.variationPropertySurcharge + specialOfferPrice;
    }

    return null;
  },
  variationGroupedProperties: function variationGroupedProperties(state) {
    if (!state || !state.variation.documents) {
      return [];
    }

    if (state.variation.documents[0].data.properties) {
      var orderPropertyList = state.variation.documents[0].data.properties.filter(function (property) {
        return property.property.isShownOnItemPage && property.property.isOderProperty;
      });

      var groupIds = _toConsumableArray(new Set(orderPropertyList.map(function (property) {
        return property.group && property.group.id;
      })));

      var groups = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function _loop() {
          var id = _step2.value;
          var groupProperties = orderPropertyList.filter(function (property) {
            return property.group === id || property.group && property.group.id === id;
          });
          groups.push({
            touched: false,
            group: groupProperties[0].group,
            properties: groupProperties.map(function (property) {
              return _objectSpread({}, property.property, {
                itemSurcharge: property.surcharge
              });
            })
          });
        };

        for (var _iterator2 = groupIds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return groups;
    }

    return [];
  },
  variationMissingProperties: function variationMissingProperties(state, getters) {
    if (state && state.variation.documents && state.variation.documents[0].data.properties && App.config.item.requireOrderProperties) {
      var missingProperties = state.variation.documents[0].data.properties.filter(function (property) {
        return property.property.isShownOnItemPage && !property.property.value && property.property.valueType !== "file" && property.property.isOderProperty;
      });

      if (missingProperties.length) {
        var radioInformation = state.variation.documents[0].data.properties.map(function (property) {
          if (property.group && property.group.orderPropertyGroupingType === "single" && property.property.valueType === "empty") {
            return {
              groupId: property.group.id,
              propertyId: property.property.id,
              hasValue: !!property.property.value
            };
          }

          return null;
        });
        radioInformation = _toConsumableArray(new Set(radioInformation.filter(function (id) {
          return id;
        })));
        var radioIdsToRemove = [];

        var _loop2 = function _loop2() {
          var radioGroupId = _arr[_i];
          var radioGroupToClean = radioInformation.find(function (radio) {
            return radio.groupId === radioGroupId && radio.hasValue;
          });

          if (radioGroupToClean) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = radioInformation.filter(function (radio) {
                return radio.groupId === radioGroupToClean.groupId && !radio.hasValue;
              })[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var radio = _step3.value;
                radioIdsToRemove.push(radio.propertyId);
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        };

        for (var _i = 0, _arr = _toConsumableArray(new Set(radioInformation.map(function (radio) {
          return radio.groupId;
        }))); _i < _arr.length; _i++) {
          _loop2();
        }

        missingProperties = missingProperties.filter(function (property) {
          return !radioIdsToRemove.includes(property.property.id);
        });
      }

      return missingProperties;
    }

    return [];
  },
  currentItemVariation: function currentItemVariation(state) {
    return state.variation.documents && state.variation.documents[0] && state.variation.documents[0].data;
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;

},{"../../helper/utils":271}],296:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../../helper/utils");

var state = {
  userData: null
};
var mutations = {
  setUserData: function setUserData(state, userData) {
    state.userData = userData;
  }
};
var getters = {
  username: function username(state) {
    var username = "";

    if ((0, _utils.isDefined)(state.userData)) {
      if (state.userData.firstName.length) {
        username = state.userData.firstName + " ";
      }

      if (state.userData.lastName.length) {
        username += state.userData.lastName;
      }

      if (!username.length) {
        var emailOption = state.userData.options.find(function (option) {
          return option.typeId === 2 && option.subTypeId === 4;
        });

        if (emailOption) {
          username = emailOption.value;
        }
      }
    }

    return username.trim();
  },
  isLoggedIn: function isLoggedIn(state) {
    return (0, _utils.isDefined)(state.userData) && state.userData.id > 0;
  }
};
var _default = {
  state: state,
  mutations: mutations,
  getters: getters
};
exports["default"] = _default;

},{"../../helper/utils":271}],297:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiService = _interopRequireDefault(require("services/ApiService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  wishListIds: [],
  wishListItems: []
};
var mutations = {
  setWishListItems: function setWishListItems(state, wishListItems) {
    state.wishListItems = wishListItems;
  },
  setWishListIds: function setWishListIds(state, wishListIds) {
    state.wishListIds = wishListIds.map(Number);
  },
  removeWishListItem: function removeWishListItem(state, wishListItem) {
    state.wishListItems = state.wishListItems.filter(function (item) {
      return item !== wishListItem;
    });
  },
  removeWishListId: function removeWishListId(state, id) {
    state.wishListIds = state.wishListIds.filter(function (wishListId) {
      return wishListId !== id;
    });
  },
  addWishListItemToIndex: function addWishListItemToIndex(state, wishListItem, index) {
    state.wishListItems.splice(index, 0, wishListItem);
  },
  addWishListId: function addWishListId(state, id) {
    state.wishListIds.push(id);
  }
};
var actions = {
  initWishListItems: function initWishListItems(_ref, ids) {
    var commit = _ref.commit;
    return new Promise(function (resolve, reject) {
      if (ids && ids[0]) {
        commit("setWishListIds", ids);

        _ApiService["default"].get("/rest/io/variations/", {
          variationIds: ids,
          template: "Ceres::WishList.WishList"
        }).done(function (data) {
          commit("setWishListItems", data.documents);
          resolve(data);
        }).fail(function (error) {
          reject(error);
        });
      } else {
        resolve();
      }
    });
  },
  removeWishListItem: function removeWishListItem(_ref2, _ref3) {
    var commit = _ref2.commit;
    var id = _ref3.id,
        wishListItem = _ref3.wishListItem,
        index = _ref3.index;
    return new Promise(function (resolve, reject) {
      if (wishListItem) {
        commit("removeWishListItem", wishListItem);
      }

      _ApiService["default"]["delete"]("/rest/io/itemWishList/" + id).done(function (data) {
        commit("removeWishListId", id);
        resolve(data);
      }).fail(function (error) {
        if (index) {
          commit("addWishListItemToIndex", wishListItem, index);
        }

        reject(error);
      });
    });
  },
  addToWishList: function addToWishList(_ref4, id) {
    var commit = _ref4.commit;
    return new Promise(function (resolve, reject) {
      commit("addWishListId", id);

      _ApiService["default"].post("/rest/io/itemWishList", {
        variationId: id
      }).done(function (data) {
        resolve(data);
      }).fail(function (error) {
        commit("removeWishListId", id);
        reject(error);
      });
    });
  }
};
var getters = {
  wishListCount: function wishListCount(state) {
    return state.wishListIds.length;
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;

},{"services/ApiService":275}],298:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var NotificationService = require("services/NotificationService");

var cloneDeep = require("lodash/cloneDeep");

function _default(store) {
  var oldState = cloneDeep(store.state);
  store.subscribe(function (mutation, state) {
    var nextState = cloneDeep(state);
    var eventName = "on" + mutation.type.charAt(0).toUpperCase() + mutation.type.substr(1);
    var event = new CustomEvent(eventName, {
      detail: {
        payload: mutation.payload,
        newState: nextState,
        oldState: oldState
      }
    });
    document.dispatchEvent(event);
    document.dispatchEvent(new CustomEvent("storeChanged", {
      detail: {
        payload: mutation.payload,
        newState: nextState,
        oldState: oldState
      }
    }));
    NotificationService.log(eventName);
    oldState = nextState;
  });
}

},{"lodash/cloneDeep":115,"services/NotificationService":279}]},{},[272,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,173,174,175,176,177,170,171,172,178,179,180,181,182,183,184,185,186,187,188,189,190,191,195,196,197,198,192,193,194,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,265,266,267,263,268,264,269,270,271,273,274,285,286,287,288,289,290,291,292,293,294,295,296,297,298])


//# sourceMappingURL=ceres-app.js.map
