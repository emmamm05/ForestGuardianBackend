/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

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
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

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
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

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

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
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

	// Support: Android<4.1, IE<9
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
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
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

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
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
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
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
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
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
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

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

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

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

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
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

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

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
	var m, i, elem, nid, nidselect, match, groups, newSelector,
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
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
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
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
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
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

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
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
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
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
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
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
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

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
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
		} catch (e) {}
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
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
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
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

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
			var i = argument < 0 ? argument + length : argument;
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
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
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

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
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
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

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
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
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
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



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

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
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
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
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

					// scripts is true for back-compat
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
							if ( jQuery.isFunction( this[ match ] ) ) {
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

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
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
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
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
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
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
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

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
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
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
			locked = options.once;

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
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

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
				locked = true;
				if ( !memory ) {
					self.disable();
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


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
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
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
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
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

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

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
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

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
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

				// ensure a hooks for this queue
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
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
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


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
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
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
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

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
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
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

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
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
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

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
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

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
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

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

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
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

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

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

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

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
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

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
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

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

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
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
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
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
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

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
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

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

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
	},

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


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
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

						// Support: Android<4.1, PhantomJS<2
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
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
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
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
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

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
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

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

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
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
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

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
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

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
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
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

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


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

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

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
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


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
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
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
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

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
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
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
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

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
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
	},
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
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
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

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
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

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
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

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
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

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
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

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
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

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
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

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
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

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
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
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
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
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
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

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
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
				data = jQuery._data( this );

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

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
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
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
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
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
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
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
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
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
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

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

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

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
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




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

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

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
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
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
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
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
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
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
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

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
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

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

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

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
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


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

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

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

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
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
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
	var deep, key,
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
	var firstDataType, ct, finalDataType, type,
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
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
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
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
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
			"text json": jQuery.parseJSON,

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

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

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

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
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
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
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
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
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
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

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
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

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

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
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

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
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


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
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
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

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

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

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
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

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
	return s.join( "&" ).replace( r20, "+" );
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

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
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

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




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

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
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
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
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

		// force json dataType
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

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
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


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

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




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

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
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
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

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
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
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
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

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




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

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
/*! tether 1.4.0 */


(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.Tether = factory();
  }
}(this, function(require, exports, module) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TetherBase = undefined;
if (typeof TetherBase === 'undefined') {
  TetherBase = { modules: [] };
}

var zeroElement = null;

// Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
// if the element lies within a nested document (<frame> or <iframe>-like).
function getActualBoundingClientRect(node) {
  var boundingRect = node.getBoundingClientRect();

  // The original object returned by getBoundingClientRect is immutable, so we clone it
  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
  var rect = {};
  for (var k in boundingRect) {
    rect[k] = boundingRect[k];
  }

  if (node.ownerDocument !== document) {
    var _frameElement = node.ownerDocument.defaultView.frameElement;
    if (_frameElement) {
      var frameRect = getActualBoundingClientRect(_frameElement);
      rect.top += frameRect.top;
      rect.bottom += frameRect.top;
      rect.left += frameRect.left;
      rect.right += frameRect.left;
    }
  }

  return rect;
}

function getScrollParents(el) {
  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = getComputedStyle(el) || {};
  var position = computedStyle.position;
  var parents = [];

  if (position === 'fixed') {
    return [el];
  }

  var parent = el;
  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
    var style = undefined;
    try {
      style = getComputedStyle(parent);
    } catch (err) {}

    if (typeof style === 'undefined' || style === null) {
      parents.push(parent);
      return parents;
    }

    var _style = style;
    var overflow = _style.overflow;
    var overflowX = _style.overflowX;
    var overflowY = _style.overflowY;

    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
        parents.push(parent);
      }
    }
  }

  parents.push(el.ownerDocument.body);

  // If the node is within a frame, account for the parent window scroll
  if (el.ownerDocument !== document) {
    parents.push(el.ownerDocument.defaultView);
  }

  return parents;
}

var uniqueId = (function () {
  var id = 0;
  return function () {
    return ++id;
  };
})();

var zeroPosCache = {};
var getOrigin = function getOrigin() {
  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
  // jitter as the user scrolls that messes with our ability to detect if two positions
  // are equivilant or not.  We place an element at the top left of the page that will
  // get the same jitter, so we can cancel the two out.
  var node = zeroElement;
  if (!node || !document.body.contains(node)) {
    node = document.createElement('div');
    node.setAttribute('data-tether-id', uniqueId());
    extend(node.style, {
      top: 0,
      left: 0,
      position: 'absolute'
    });

    document.body.appendChild(node);

    zeroElement = node;
  }

  var id = node.getAttribute('data-tether-id');
  if (typeof zeroPosCache[id] === 'undefined') {
    zeroPosCache[id] = getActualBoundingClientRect(node);

    // Clear the cache when this position call is done
    defer(function () {
      delete zeroPosCache[id];
    });
  }

  return zeroPosCache[id];
};

function removeUtilElements() {
  if (zeroElement) {
    document.body.removeChild(zeroElement);
  }
  zeroElement = null;
};

function getBounds(el) {
  var doc = undefined;
  if (el === document) {
    doc = document;
    el = document.documentElement;
  } else {
    doc = el.ownerDocument;
  }

  var docEl = doc.documentElement;

  var box = getActualBoundingClientRect(el);

  var origin = getOrigin();

  box.top -= origin.top;
  box.left -= origin.left;

  if (typeof box.width === 'undefined') {
    box.width = document.body.scrollWidth - box.left - box.right;
  }
  if (typeof box.height === 'undefined') {
    box.height = document.body.scrollHeight - box.top - box.bottom;
  }

  box.top = box.top - docEl.clientTop;
  box.left = box.left - docEl.clientLeft;
  box.right = doc.body.clientWidth - box.width - box.left;
  box.bottom = doc.body.clientHeight - box.height - box.top;

  return box;
}

function getOffsetParent(el) {
  return el.offsetParent || document.documentElement;
}

var _scrollBarSize = null;
function getScrollBarSize() {
  if (_scrollBarSize) {
    return _scrollBarSize;
  }
  var inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '200px';

  var outer = document.createElement('div');
  extend(outer.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  var widthContained = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var widthScroll = inner.offsetWidth;

  if (widthContained === widthScroll) {
    widthScroll = outer.clientWidth;
  }

  document.body.removeChild(outer);

  var width = widthContained - widthScroll;

  _scrollBarSize = { width: width, height: width };
  return _scrollBarSize;
}

function extend() {
  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var args = [];

  Array.prototype.push.apply(args, arguments);

  args.slice(1).forEach(function (obj) {
    if (obj) {
      for (var key in obj) {
        if (({}).hasOwnProperty.call(obj, key)) {
          out[key] = obj[key];
        }
      }
    }
  });

  return out;
}

function removeClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.remove(cls);
      }
    });
  } else {
    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
    var className = getClassName(el).replace(regex, ' ');
    setClassName(el, className);
  }
}

function addClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.add(cls);
      }
    });
  } else {
    removeClass(el, name);
    var cls = getClassName(el) + (' ' + name);
    setClassName(el, cls);
  }
}

function hasClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    return el.classList.contains(name);
  }
  var className = getClassName(el);
  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
}

function getClassName(el) {
  // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
  // completely separately SVGAnimatedString base classes
  if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
    return el.className.baseVal;
  }
  return el.className;
}

function setClassName(el, className) {
  el.setAttribute('class', className);
}

function updateClasses(el, add, all) {
  // Of the set of 'all' classes, we need the 'add' classes, and only the
  // 'add' classes to be set.
  all.forEach(function (cls) {
    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
      removeClass(el, cls);
    }
  });

  add.forEach(function (cls) {
    if (!hasClass(el, cls)) {
      addClass(el, cls);
    }
  });
}

var deferred = [];

var defer = function defer(fn) {
  deferred.push(fn);
};

var flush = function flush() {
  var fn = undefined;
  while (fn = deferred.pop()) {
    fn();
  }
};

var Evented = (function () {
  function Evented() {
    _classCallCheck(this, Evented);
  }

  _createClass(Evented, [{
    key: 'on',
    value: function on(event, handler, ctx) {
      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if (typeof this.bindings === 'undefined') {
        this.bindings = {};
      }
      if (typeof this.bindings[event] === 'undefined') {
        this.bindings[event] = [];
      }
      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
    }
  }, {
    key: 'once',
    value: function once(event, handler, ctx) {
      this.on(event, handler, ctx, true);
    }
  }, {
    key: 'off',
    value: function off(event, handler) {
      if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
        return;
      }

      if (typeof handler === 'undefined') {
        delete this.bindings[event];
      } else {
        var i = 0;
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }, {
    key: 'trigger',
    value: function trigger(event) {
      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
        var i = 0;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        while (i < this.bindings[event].length) {
          var _bindings$event$i = this.bindings[event][i];
          var handler = _bindings$event$i.handler;
          var ctx = _bindings$event$i.ctx;
          var once = _bindings$event$i.once;

          var context = ctx;
          if (typeof context === 'undefined') {
            context = this;
          }

          handler.apply(context, args);

          if (once) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }]);

  return Evented;
})();

TetherBase.Utils = {
  getActualBoundingClientRect: getActualBoundingClientRect,
  getScrollParents: getScrollParents,
  getBounds: getBounds,
  getOffsetParent: getOffsetParent,
  extend: extend,
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  updateClasses: updateClasses,
  defer: defer,
  flush: flush,
  uniqueId: uniqueId,
  Evented: Evented,
  getScrollBarSize: getScrollBarSize,
  removeUtilElements: removeUtilElements
};
/* globals TetherBase, performance */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof TetherBase === 'undefined') {
  throw new Error('You must include the utils.js file before tether.js');
}

var _TetherBase$Utils = TetherBase.Utils;
var getScrollParents = _TetherBase$Utils.getScrollParents;
var getBounds = _TetherBase$Utils.getBounds;
var getOffsetParent = _TetherBase$Utils.getOffsetParent;
var extend = _TetherBase$Utils.extend;
var addClass = _TetherBase$Utils.addClass;
var removeClass = _TetherBase$Utils.removeClass;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;
var flush = _TetherBase$Utils.flush;
var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
var removeUtilElements = _TetherBase$Utils.removeUtilElements;

function within(a, b) {
  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  return a + diff >= b && b >= a - diff;
}

var transformKey = (function () {
  if (typeof document === 'undefined') {
    return '';
  }
  var el = document.createElement('div');

  var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
  for (var i = 0; i < transforms.length; ++i) {
    var key = transforms[i];
    if (el.style[key] !== undefined) {
      return key;
    }
  }
})();

var tethers = [];

var position = function position() {
  tethers.forEach(function (tether) {
    tether.position(false);
  });
  flush();
};

function now() {
  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
    return performance.now();
  }
  return +new Date();
}

(function () {
  var lastCall = null;
  var lastDuration = null;
  var pendingTimeout = null;

  var tick = function tick() {
    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
      // We voluntarily throttle ourselves if we can't manage 60fps
      lastDuration = Math.min(lastDuration - 16, 250);

      // Just in case this is the last event, remember to position just once more
      pendingTimeout = setTimeout(tick, 250);
      return;
    }

    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
      // Some browsers call events a little too frequently, refuse to run more than is reasonable
      return;
    }

    if (pendingTimeout != null) {
      clearTimeout(pendingTimeout);
      pendingTimeout = null;
    }

    lastCall = now();
    position();
    lastDuration = now() - lastCall;
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
      window.addEventListener(event, tick);
    });
  }
})();

var MIRROR_LR = {
  center: 'center',
  left: 'right',
  right: 'left'
};

var MIRROR_TB = {
  middle: 'middle',
  top: 'bottom',
  bottom: 'top'
};

var OFFSET_MAP = {
  top: 0,
  left: 0,
  middle: '50%',
  center: '50%',
  bottom: '100%',
  right: '100%'
};

var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (left === 'auto') {
    left = MIRROR_LR[relativeToAttachment.left];
  }

  if (top === 'auto') {
    top = MIRROR_TB[relativeToAttachment.top];
  }

  return { left: left, top: top };
};

var attachmentToOffset = function attachmentToOffset(attachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
    left = OFFSET_MAP[attachment.left];
  }

  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
    top = OFFSET_MAP[attachment.top];
  }

  return { left: left, top: top };
};

function addOffset() {
  var out = { top: 0, left: 0 };

  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
    offsets[_key] = arguments[_key];
  }

  offsets.forEach(function (_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (typeof top === 'string') {
      top = parseFloat(top, 10);
    }
    if (typeof left === 'string') {
      left = parseFloat(left, 10);
    }

    out.top += top;
    out.left += left;
  });

  return out;
}

function offsetToPx(offset, size) {
  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
  }
  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
  }

  return offset;
}

var parseOffset = function parseOffset(value) {
  var _value$split = value.split(' ');

  var _value$split2 = _slicedToArray(_value$split, 2);

  var top = _value$split2[0];
  var left = _value$split2[1];

  return { top: top, left: left };
};
var parseAttachment = parseOffset;

var TetherClass = (function (_Evented) {
  _inherits(TetherClass, _Evented);

  function TetherClass(options) {
    var _this = this;

    _classCallCheck(this, TetherClass);

    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
    this.position = this.position.bind(this);

    tethers.push(this);

    this.history = [];

    this.setOptions(options, false);

    TetherBase.modules.forEach(function (module) {
      if (typeof module.initialize !== 'undefined') {
        module.initialize.call(_this);
      }
    });

    this.position();
  }

  _createClass(TetherClass, [{
    key: 'getClass',
    value: function getClass() {
      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var classes = this.options.classes;

      if (typeof classes !== 'undefined' && classes[key]) {
        return this.options.classes[key];
      } else if (this.options.classPrefix) {
        return this.options.classPrefix + '-' + key;
      } else {
        return key;
      }
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      var _this2 = this;

      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      var defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto',
        classPrefix: 'tether'
      };

      this.options = extend(defaults, options);

      var _options = this.options;
      var element = _options.element;
      var target = _options.target;
      var targetModifier = _options.targetModifier;

      this.element = element;
      this.target = target;
      this.targetModifier = targetModifier;

      if (this.target === 'viewport') {
        this.target = document.body;
        this.targetModifier = 'visible';
      } else if (this.target === 'scroll-handle') {
        this.target = document.body;
        this.targetModifier = 'scroll-handle';
      }

      ['element', 'target'].forEach(function (key) {
        if (typeof _this2[key] === 'undefined') {
          throw new Error('Tether Error: Both element and target must be defined');
        }

        if (typeof _this2[key].jquery !== 'undefined') {
          _this2[key] = _this2[key][0];
        } else if (typeof _this2[key] === 'string') {
          _this2[key] = document.querySelector(_this2[key]);
        }
      });

      addClass(this.element, this.getClass('element'));
      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('target'));
      }

      if (!this.options.attachment) {
        throw new Error('Tether Error: You must provide an attachment');
      }

      this.targetAttachment = parseAttachment(this.options.targetAttachment);
      this.attachment = parseAttachment(this.options.attachment);
      this.offset = parseOffset(this.options.offset);
      this.targetOffset = parseOffset(this.options.targetOffset);

      if (typeof this.scrollParents !== 'undefined') {
        this.disable();
      }

      if (this.targetModifier === 'scroll-handle') {
        this.scrollParents = [this.target];
      } else {
        this.scrollParents = getScrollParents(this.target);
      }

      if (!(this.options.enabled === false)) {
        this.enable(pos);
      }
    }
  }, {
    key: 'getTargetBounds',
    value: function getTargetBounds() {
      if (typeof this.targetModifier !== 'undefined') {
        if (this.targetModifier === 'visible') {
          if (this.target === document.body) {
            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
          } else {
            var bounds = getBounds(this.target);

            var out = {
              height: bounds.height,
              width: bounds.width,
              top: bounds.top,
              left: bounds.left
            };

            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
            out.height = Math.min(innerHeight, out.height);
            out.height -= 2;

            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
            out.width = Math.min(innerWidth, out.width);
            out.width -= 2;

            if (out.top < pageYOffset) {
              out.top = pageYOffset;
            }
            if (out.left < pageXOffset) {
              out.left = pageXOffset;
            }

            return out;
          }
        } else if (this.targetModifier === 'scroll-handle') {
          var bounds = undefined;
          var target = this.target;
          if (target === document.body) {
            target = document.documentElement;

            bounds = {
              left: pageXOffset,
              top: pageYOffset,
              height: innerHeight,
              width: innerWidth
            };
          } else {
            bounds = getBounds(target);
          }

          var style = getComputedStyle(target);

          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

          var scrollBottom = 0;
          if (hasBottomScroll) {
            scrollBottom = 15;
          }

          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

          var out = {
            width: 15,
            height: height * 0.975 * (height / target.scrollHeight),
            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
          };

          var fitAdj = 0;
          if (height < 408 && this.target === document.body) {
            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
          }

          if (this.target !== document.body) {
            out.height = Math.max(out.height, 24);
          }

          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

          if (this.target === document.body) {
            out.height = Math.max(out.height, 24);
          }

          return out;
        }
      } else {
        return getBounds(this.target);
      }
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      this._cache = {};
    }
  }, {
    key: 'cache',
    value: function cache(k, getter) {
      // More than one module will often need the same DOM info, so
      // we keep a cache which is cleared on each position call
      if (typeof this._cache === 'undefined') {
        this._cache = {};
      }

      if (typeof this._cache[k] === 'undefined') {
        this._cache[k] = getter.call(this);
      }

      return this._cache[k];
    }
  }, {
    key: 'enable',
    value: function enable() {
      var _this3 = this;

      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('enabled'));
      }
      addClass(this.element, this.getClass('enabled'));
      this.enabled = true;

      this.scrollParents.forEach(function (parent) {
        if (parent !== _this3.target.ownerDocument) {
          parent.addEventListener('scroll', _this3.position);
        }
      });

      if (pos) {
        this.position();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      var _this4 = this;

      removeClass(this.target, this.getClass('enabled'));
      removeClass(this.element, this.getClass('enabled'));
      this.enabled = false;

      if (typeof this.scrollParents !== 'undefined') {
        this.scrollParents.forEach(function (parent) {
          parent.removeEventListener('scroll', _this4.position);
        });
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this5 = this;

      this.disable();

      tethers.forEach(function (tether, i) {
        if (tether === _this5) {
          tethers.splice(i, 1);
        }
      });

      // Remove any elements we were using for convenience from the DOM
      if (tethers.length === 0) {
        removeUtilElements();
      }
    }
  }, {
    key: 'updateAttachClasses',
    value: function updateAttachClasses(elementAttach, targetAttach) {
      var _this6 = this;

      elementAttach = elementAttach || this.attachment;
      targetAttach = targetAttach || this.targetAttachment;
      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
        // updateAttachClasses can be called more than once in a position call, so
        // we need to clean up after ourselves such that when the last defer gets
        // ran it doesn't add any extra classes from previous calls.
        this._addAttachClasses.splice(0, this._addAttachClasses.length);
      }

      if (typeof this._addAttachClasses === 'undefined') {
        this._addAttachClasses = [];
      }
      var add = this._addAttachClasses;

      if (elementAttach.top) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
      }
      if (elementAttach.left) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
      }
      if (targetAttach.top) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
      }
      if (targetAttach.left) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
      }

      var all = [];
      sides.forEach(function (side) {
        all.push(_this6.getClass('element-attached') + '-' + side);
        all.push(_this6.getClass('target-attached') + '-' + side);
      });

      defer(function () {
        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
          return;
        }

        updateClasses(_this6.element, _this6._addAttachClasses, all);
        if (!(_this6.options.addTargetClasses === false)) {
          updateClasses(_this6.target, _this6._addAttachClasses, all);
        }

        delete _this6._addAttachClasses;
      });
    }
  }, {
    key: 'position',
    value: function position() {
      var _this7 = this;

      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
      // tethers (in which case call Tether.Utils.flush yourself when you're done)

      if (!this.enabled) {
        return;
      }

      this.clearCache();

      // Turn 'auto' attachments into the appropriate corner or edge
      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

      this.updateAttachClasses(this.attachment, targetAttachment);

      var elementPos = this.cache('element-bounds', function () {
        return getBounds(_this7.element);
      });

      var width = elementPos.width;
      var height = elementPos.height;

      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
        var _lastSize = this.lastSize;

        // We cache the height and width to make it possible to position elements that are
        // getting hidden.
        width = _lastSize.width;
        height = _lastSize.height;
      } else {
        this.lastSize = { width: width, height: height };
      }

      var targetPos = this.cache('target-bounds', function () {
        return _this7.getTargetBounds();
      });
      var targetSize = targetPos;

      // Get an actual px offset from the attachment
      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

      // Add the manually provided offset
      offset = addOffset(offset, manualOffset);
      targetOffset = addOffset(targetOffset, manualTargetOffset);

      // It's now our goal to make (element position + offset) == (target position + target offset)
      var left = targetPos.left + targetOffset.left - offset.left;
      var top = targetPos.top + targetOffset.top - offset.top;

      for (var i = 0; i < TetherBase.modules.length; ++i) {
        var _module2 = TetherBase.modules[i];
        var ret = _module2.position.call(this, {
          left: left,
          top: top,
          targetAttachment: targetAttachment,
          targetPos: targetPos,
          elementPos: elementPos,
          offset: offset,
          targetOffset: targetOffset,
          manualOffset: manualOffset,
          manualTargetOffset: manualTargetOffset,
          scrollbarSize: scrollbarSize,
          attachment: this.attachment
        });

        if (ret === false) {
          return false;
        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
          continue;
        } else {
          top = ret.top;
          left = ret.left;
        }
      }

      // We describe the position three different ways to give the optimizer
      // a chance to decide the best possible way to position the element
      // with the fewest repaints.
      var next = {
        // It's position relative to the page (absolute positioning when
        // the element is a child of the body)
        page: {
          top: top,
          left: left
        },

        // It's position relative to the viewport (fixed positioning)
        viewport: {
          top: top - pageYOffset,
          bottom: pageYOffset - top - height + innerHeight,
          left: left - pageXOffset,
          right: pageXOffset - left - width + innerWidth
        }
      };

      var doc = this.target.ownerDocument;
      var win = doc.defaultView;

      var scrollbarSize = undefined;
      if (win.innerHeight > doc.documentElement.clientHeight) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.bottom -= scrollbarSize.height;
      }

      if (win.innerWidth > doc.documentElement.clientWidth) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.right -= scrollbarSize.width;
      }

      if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
        next.page.bottom = doc.body.scrollHeight - top - height;
        next.page.right = doc.body.scrollWidth - left - width;
      }

      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
        (function () {
          var offsetParent = _this7.cache('target-offsetparent', function () {
            return getOffsetParent(_this7.target);
          });
          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
            return getBounds(offsetParent);
          });
          var offsetParentStyle = getComputedStyle(offsetParent);
          var offsetParentSize = offsetPosition;

          var offsetBorder = {};
          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
          });

          offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
          offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
              // We're within the visible part of the target's scroll parent
              var scrollTop = offsetParent.scrollTop;
              var scrollLeft = offsetParent.scrollLeft;

              // It's position relative to the target's offset parent (absolute positioning when
              // the element is moved to be a child of the target's offset parent).
              next.offset = {
                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
              };
            }
          }
        })();
      }

      // We could also travel up the DOM and try each containing context, rather than only
      // looking at the body, but we're gonna get diminishing returns.

      this.move(next);

      this.history.unshift(next);

      if (this.history.length > 3) {
        this.history.pop();
      }

      if (flushChanges) {
        flush();
      }

      return true;
    }

    // THE ISSUE
  }, {
    key: 'move',
    value: function move(pos) {
      var _this8 = this;

      if (!(typeof this.element.parentNode !== 'undefined')) {
        return;
      }

      var same = {};

      for (var type in pos) {
        same[type] = {};

        for (var key in pos[type]) {
          var found = false;

          for (var i = 0; i < this.history.length; ++i) {
            var point = this.history[i];
            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
              found = true;
              break;
            }
          }

          if (!found) {
            same[type][key] = true;
          }
        }
      }

      var css = { top: '', left: '', right: '', bottom: '' };

      var transcribe = function transcribe(_same, _pos) {
        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
        if (gpu !== false) {
          var yPos = undefined,
              xPos = undefined;
          if (_same.top) {
            css.top = 0;
            yPos = _pos.top;
          } else {
            css.bottom = 0;
            yPos = -_pos.bottom;
          }

          if (_same.left) {
            css.left = 0;
            xPos = _pos.left;
          } else {
            css.right = 0;
            xPos = -_pos.right;
          }

          if (window.matchMedia) {
            // HubSpot/tether#207
            var retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
            if (!retina) {
              xPos = Math.round(xPos);
              yPos = Math.round(yPos);
            }
          }

          css[transformKey] = 'translateX(' + xPos + 'px) translateY(' + yPos + 'px)';

          if (transformKey !== 'msTransform') {
            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
            // but IE9 doesn't support 3d transforms and will choke.
            css[transformKey] += " translateZ(0)";
          }
        } else {
          if (_same.top) {
            css.top = _pos.top + 'px';
          } else {
            css.bottom = _pos.bottom + 'px';
          }

          if (_same.left) {
            css.left = _pos.left + 'px';
          } else {
            css.right = _pos.right + 'px';
          }
        }
      };

      var moved = false;
      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
        css.position = 'absolute';
        transcribe(same.page, pos.page);
      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
        css.position = 'fixed';
        transcribe(same.viewport, pos.viewport);
      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
        (function () {
          css.position = 'absolute';
          var offsetParent = _this8.cache('target-offsetparent', function () {
            return getOffsetParent(_this8.target);
          });

          if (getOffsetParent(_this8.element) !== offsetParent) {
            defer(function () {
              _this8.element.parentNode.removeChild(_this8.element);
              offsetParent.appendChild(_this8.element);
            });
          }

          transcribe(same.offset, pos.offset);
          moved = true;
        })();
      } else {
        css.position = 'absolute';
        transcribe({ top: true, left: true }, pos.page);
      }

      if (!moved) {
        if (this.options.bodyElement) {
          this.options.bodyElement.appendChild(this.element);
        } else {
          var offsetParentIsBody = true;
          var currentNode = this.element.parentNode;
          while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
            if (getComputedStyle(currentNode).position !== 'static') {
              offsetParentIsBody = false;
              break;
            }

            currentNode = currentNode.parentNode;
          }

          if (!offsetParentIsBody) {
            this.element.parentNode.removeChild(this.element);
            this.element.ownerDocument.body.appendChild(this.element);
          }
        }
      }

      // Any css change will trigger a repaint, so let's avoid one if nothing changed
      var writeCSS = {};
      var write = false;
      for (var key in css) {
        var val = css[key];
        var elVal = this.element.style[key];

        if (elVal !== val) {
          write = true;
          writeCSS[key] = val;
        }
      }

      if (write) {
        defer(function () {
          extend(_this8.element.style, writeCSS);
          _this8.trigger('repositioned');
        });
      }
    }
  }]);

  return TetherClass;
})(Evented);

TetherClass.modules = [];

TetherBase.position = position;

var Tether = extend(TetherClass, TetherBase);
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var extend = _TetherBase$Utils.extend;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

function getBoundingRect(tether, to) {
  if (to === 'scrollParent') {
    to = tether.scrollParents[0];
  } else if (to === 'window') {
    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
  }

  if (to === document) {
    to = to.documentElement;
  }

  if (typeof to.nodeType !== 'undefined') {
    (function () {
      var node = to;
      var size = getBounds(to);
      var pos = size;
      var style = getComputedStyle(to);

      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

      // Account any parent Frames scroll offset
      if (node.ownerDocument !== document) {
        var win = node.ownerDocument.defaultView;
        to[0] += win.pageXOffset;
        to[1] += win.pageYOffset;
        to[2] += win.pageXOffset;
        to[3] += win.pageYOffset;
      }

      BOUNDS_FORMAT.forEach(function (side, i) {
        side = side[0].toUpperCase() + side.substr(1);
        if (side === 'Top' || side === 'Left') {
          to[i] += parseFloat(style['border' + side + 'Width']);
        } else {
          to[i] -= parseFloat(style['border' + side + 'Width']);
        }
      });
    })();
  }

  return to;
}

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;
    var targetAttachment = _ref.targetAttachment;

    if (!this.options.constraints) {
      return true;
    }

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
      var _lastSize = this.lastSize;

      // Handle the item getting hidden as a result of our positioning without glitching
      // the classes in and out
      width = _lastSize.width;
      height = _lastSize.height;
    }

    var targetSize = this.cache('target-bounds', function () {
      return _this.getTargetBounds();
    });

    var targetHeight = targetSize.height;
    var targetWidth = targetSize.width;

    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

    this.options.constraints.forEach(function (constraint) {
      var outOfBoundsClass = constraint.outOfBoundsClass;
      var pinnedClass = constraint.pinnedClass;

      if (outOfBoundsClass) {
        allClasses.push(outOfBoundsClass);
      }
      if (pinnedClass) {
        allClasses.push(pinnedClass);
      }
    });

    allClasses.forEach(function (cls) {
      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
        allClasses.push(cls + '-' + side);
      });
    });

    var addClasses = [];

    var tAttachment = extend({}, targetAttachment);
    var eAttachment = extend({}, this.attachment);

    this.options.constraints.forEach(function (constraint) {
      var to = constraint.to;
      var attachment = constraint.attachment;
      var pin = constraint.pin;

      if (typeof attachment === 'undefined') {
        attachment = '';
      }

      var changeAttachX = undefined,
          changeAttachY = undefined;
      if (attachment.indexOf(' ') >= 0) {
        var _attachment$split = attachment.split(' ');

        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

        changeAttachY = _attachment$split2[0];
        changeAttachX = _attachment$split2[1];
      } else {
        changeAttachX = changeAttachY = attachment;
      }

      var bounds = getBoundingRect(_this, to);

      if (changeAttachY === 'target' || changeAttachY === 'both') {
        if (top < bounds[1] && tAttachment.top === 'top') {
          top += targetHeight;
          tAttachment.top = 'bottom';
        }

        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
          top -= targetHeight;
          tAttachment.top = 'top';
        }
      }

      if (changeAttachY === 'together') {
        if (tAttachment.top === 'top') {
          if (eAttachment.top === 'bottom' && top < bounds[1]) {
            top += targetHeight;
            tAttachment.top = 'bottom';

            top += height;
            eAttachment.top = 'top';
          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
            top -= height - targetHeight;
            tAttachment.top = 'bottom';

            eAttachment.top = 'bottom';
          }
        }

        if (tAttachment.top === 'bottom') {
          if (eAttachment.top === 'top' && top + height > bounds[3]) {
            top -= targetHeight;
            tAttachment.top = 'top';

            top -= height;
            eAttachment.top = 'bottom';
          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
            top += height - targetHeight;
            tAttachment.top = 'top';

            eAttachment.top = 'top';
          }
        }

        if (tAttachment.top === 'middle') {
          if (top + height > bounds[3] && eAttachment.top === 'top') {
            top -= height;
            eAttachment.top = 'bottom';
          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
            top += height;
            eAttachment.top = 'top';
          }
        }
      }

      if (changeAttachX === 'target' || changeAttachX === 'both') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          left += targetWidth;
          tAttachment.left = 'right';
        }

        if (left + width > bounds[2] && tAttachment.left === 'right') {
          left -= targetWidth;
          tAttachment.left = 'left';
        }
      }

      if (changeAttachX === 'together') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          if (eAttachment.left === 'right') {
            left += targetWidth;
            tAttachment.left = 'right';

            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'left') {
            left += targetWidth;
            tAttachment.left = 'right';

            left -= width;
            eAttachment.left = 'right';
          }
        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
          if (eAttachment.left === 'left') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'right') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left += width;
            eAttachment.left = 'left';
          }
        } else if (tAttachment.left === 'center') {
          if (left + width > bounds[2] && eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (left < bounds[0] && eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          }
        }
      }

      if (changeAttachY === 'element' || changeAttachY === 'both') {
        if (top < bounds[1] && eAttachment.top === 'bottom') {
          top += height;
          eAttachment.top = 'top';
        }

        if (top + height > bounds[3] && eAttachment.top === 'top') {
          top -= height;
          eAttachment.top = 'bottom';
        }
      }

      if (changeAttachX === 'element' || changeAttachX === 'both') {
        if (left < bounds[0]) {
          if (eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'center') {
            left += width / 2;
            eAttachment.left = 'left';
          }
        }

        if (left + width > bounds[2]) {
          if (eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'center') {
            left -= width / 2;
            eAttachment.left = 'right';
          }
        }
      }

      if (typeof pin === 'string') {
        pin = pin.split(',').map(function (p) {
          return p.trim();
        });
      } else if (pin === true) {
        pin = ['top', 'left', 'right', 'bottom'];
      }

      pin = pin || [];

      var pinned = [];
      var oob = [];

      if (top < bounds[1]) {
        if (pin.indexOf('top') >= 0) {
          top = bounds[1];
          pinned.push('top');
        } else {
          oob.push('top');
        }
      }

      if (top + height > bounds[3]) {
        if (pin.indexOf('bottom') >= 0) {
          top = bounds[3] - height;
          pinned.push('bottom');
        } else {
          oob.push('bottom');
        }
      }

      if (left < bounds[0]) {
        if (pin.indexOf('left') >= 0) {
          left = bounds[0];
          pinned.push('left');
        } else {
          oob.push('left');
        }
      }

      if (left + width > bounds[2]) {
        if (pin.indexOf('right') >= 0) {
          left = bounds[2] - width;
          pinned.push('right');
        } else {
          oob.push('right');
        }
      }

      if (pinned.length) {
        (function () {
          var pinnedClass = undefined;
          if (typeof _this.options.pinnedClass !== 'undefined') {
            pinnedClass = _this.options.pinnedClass;
          } else {
            pinnedClass = _this.getClass('pinned');
          }

          addClasses.push(pinnedClass);
          pinned.forEach(function (side) {
            addClasses.push(pinnedClass + '-' + side);
          });
        })();
      }

      if (oob.length) {
        (function () {
          var oobClass = undefined;
          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
            oobClass = _this.options.outOfBoundsClass;
          } else {
            oobClass = _this.getClass('out-of-bounds');
          }

          addClasses.push(oobClass);
          oob.forEach(function (side) {
            addClasses.push(oobClass + '-' + side);
          });
        })();
      }

      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
        eAttachment.left = tAttachment.left = false;
      }
      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
        eAttachment.top = tAttachment.top = false;
      }

      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
        _this.updateAttachClasses(eAttachment, tAttachment);
        _this.trigger('update', {
          attachment: eAttachment,
          targetAttachment: tAttachment
        });
      }
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return { top: top, left: left };
  }
});
/* globals TetherBase */

'use strict';

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    var targetPos = this.getTargetBounds();

    var bottom = top + height;
    var right = left + width;

    var abutted = [];
    if (top <= targetPos.bottom && bottom >= targetPos.top) {
      ['left', 'right'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === left || targetPosSide === right) {
          abutted.push(side);
        }
      });
    }

    if (left <= targetPos.right && right >= targetPos.left) {
      ['top', 'bottom'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === top || targetPosSide === bottom) {
          abutted.push(side);
        }
      });
    }

    var allClasses = [];
    var addClasses = [];

    var sides = ['left', 'top', 'right', 'bottom'];
    allClasses.push(this.getClass('abutted'));
    sides.forEach(function (side) {
      allClasses.push(_this.getClass('abutted') + '-' + side);
    });

    if (abutted.length) {
      addClasses.push(this.getClass('abutted'));
    }

    abutted.forEach(function (side) {
      addClasses.push(_this.getClass('abutted') + '-' + side);
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return true;
  }
});
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

TetherBase.modules.push({
  position: function position(_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (!this.options.shift) {
      return;
    }

    var shift = this.options.shift;
    if (typeof this.options.shift === 'function') {
      shift = this.options.shift.call(this, { top: top, left: left });
    }

    var shiftTop = undefined,
        shiftLeft = undefined;
    if (typeof shift === 'string') {
      shift = shift.split(' ');
      shift[1] = shift[1] || shift[0];

      var _shift = shift;

      var _shift2 = _slicedToArray(_shift, 2);

      shiftTop = _shift2[0];
      shiftLeft = _shift2[1];

      shiftTop = parseFloat(shiftTop, 10);
      shiftLeft = parseFloat(shiftLeft, 10);
    } else {
      shiftTop = shift.top;
      shiftLeft = shift.left;
    }

    top += shiftTop;
    left += shiftLeft;

    return { top: top, left: left };
  }
});
return Tether;

}));
/*!
 * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.')
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }
}(jQuery);


+function () {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  // shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector) {
        selector = element.getAttribute('href') || '';
        selector = /^#[a-z]/i.test(selector) ? selector : null;
      }

      return selector;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = function () {
    function Alert(element) {
      _classCallCheck(this, Alert);

      this._element = element;
    }

    // getters

    // public

    Alert.prototype.close = function close(element) {
      element = element || this._element;

      var rootElement = this._getRootElement(element);
      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    Alert.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Alert.prototype._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = $(selector)[0];
      }

      if (!parent) {
        parent = $(element).closest('.' + ClassName.ALERT)[0];
      }

      return parent;
    };

    Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);

      $(element).trigger(closeEvent);
      return closeEvent;
    };

    Alert.prototype._removeElement = function _removeElement(element) {
      var _this2 = this;

      $(element).removeClass(ClassName.SHOW);

      if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);
        return;
      }

      $(element).one(Util.TRANSITION_END, function (event) {
        return _this2._destroyElement(element, event);
      }).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Alert.prototype._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    };

    // static

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    // getters

    // public

    Button.prototype.toggle = function toggle() {
      var triggerChangeEvent = true;
      var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = $(this._element).find(Selector.INPUT)[0];

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

              if (activeElement) {
                $(activeElement).removeClass(ClassName.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
        }
      }

      this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName.ACTIVE);
      }
    };

    Button.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // static

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = function () {
    function Carousel(element, config) {
      _classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    // getters

    // public

    Carousel.prototype.next = function next() {
      if (this._isSliding) {
        throw new Error('Carousel is sliding');
      }
      this._slide(Direction.NEXT);
    };

    Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      if (!document.hidden) {
        this.next();
      }
    };

    Carousel.prototype.prev = function prev() {
      if (this._isSliding) {
        throw new Error('Carousel is sliding');
      }
      this._slide(Direction.PREV);
    };

    Carousel.prototype.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    Carousel.prototype.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    Carousel.prototype.to = function to(index) {
      var _this3 = this;

      this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event.SLID, function () {
          return _this3.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    Carousel.prototype.dispose = function dispose() {
      $(this._element).off(EVENT_KEY);
      $.removeData(this._element, DATA_KEY);

      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    };

    // private

    Carousel.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Carousel.prototype._addEventListeners = function _addEventListeners() {
      var _this4 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN, function (event) {
          return _this4._keydown(event);
        });
      }

      if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
        $(this._element).on(Event.MOUSEENTER, function (event) {
          return _this4.pause(event);
        }).on(Event.MOUSELEAVE, function (event) {
          return _this4.cycle(event);
        });
      }
    };

    Carousel.prototype._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;
        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
        default:
          return;
      }
    };

    Carousel.prototype._getItemIndex = function _getItemIndex(element) {
      this._items = $.makeArray($(element).parent().find(Selector.ITEM));
      return this._items.indexOf(element);
    };

    Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;
      var activeIndex = this._getItemIndex(activeElement);
      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;

      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var slideEvent = $.Event(Event.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName
      });

      $(this._element).trigger(slideEvent);

      return slideEvent;
    };

    Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName.ACTIVE);
        }
      }
    };

    Carousel.prototype._slide = function _slide(direction, element) {
      var _this5 = this;

      var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var isCycling = Boolean(this._interval);

      var directionalClassName = void 0;
      var orderClassName = void 0;
      var eventDirectionName = void 0;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName.LEFT;
        orderClassName = ClassName.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName.RIGHT;
        orderClassName = ClassName.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName
      });

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

        $(nextElement).addClass(orderClassName);

        Util.reflow(nextElement);

        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);

        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + ' ' + orderClassName).addClass(ClassName.ACTIVE);

          $(activeElement).removeClass(ClassName.ACTIVE + ' ' + orderClassName + ' ' + directionalClassName);

          _this5._isSliding = false;

          setTimeout(function () {
            return $(_this5._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        $(activeElement).removeClass(ClassName.ACTIVE);
        $(nextElement).addClass(ClassName.ACTIVE);

        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    };

    // static

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Default, $(this).data());

        if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
          $.extend(_config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (data[action] === undefined) {
            throw new Error('No method named "' + action + '"');
          }
          data[action]();
        } else if (_config.interval) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
        return;
      }

      var config = $.extend({}, $(target).data(), $(this).data());
      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.card > .show, .card > .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // getters

    // public

    Collapse.prototype.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    Collapse.prototype.show = function show() {
      var _this6 = this;

      if (this._isTransitioning) {
        throw new Error('Collapse is transitioning');
      }

      if ($(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives = void 0;
      var activesData = void 0;

      if (this._parent) {
        actives = $.makeArray($(this._parent).find(Selector.ACTIVES));
        if (!actives.length) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).data(DATA_KEY);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

      this._element.style[dimension] = 0;
      this._element.setAttribute('aria-expanded', true);

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this6._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

        _this6._element.style[dimension] = '';

        _this6.setTransitioning(false);

        $(_this6._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = 'scroll' + capitalizedDimension;

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

      this._element.style[dimension] = this._element[scrollSize] + 'px';
    };

    Collapse.prototype.hide = function hide() {
      var _this7 = this;

      if (this._isTransitioning) {
        throw new Error('Collapse is transitioning');
      }

      if (!$(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();
      var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

      this._element.style[dimension] = this._element[offsetDimension] + 'px';

      Util.reflow(this._element);

      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

      this._element.setAttribute('aria-expanded', false);

      if (this._triggerArray.length) {
        $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this7.setTransitioning(false);
        $(_this7._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    Collapse.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    };

    // private

    Collapse.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      config.toggle = Boolean(config.toggle); // coerce string values
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Collapse.prototype._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    Collapse.prototype._getParent = function _getParent() {
      var _this8 = this;

      var parent = $(this._config.parent)[0];
      var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

      $(parent).find(selector).each(function (i, element) {
        _this8._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });

      return parent;
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $(element).hasClass(ClassName.SHOW);
        element.setAttribute('aria-expanded', isOpen);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    };

    // static

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);
        var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    var target = Collapse._getTargetFromElement(this);
    var data = $(target).data(DATA_KEY);
    var config = data ? 'toggle' : $(this).data();

    Collapse._jQueryInterface.call($(target), config);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + '|' + ARROW_DOWN_KEYCODE + '|' + ESCAPE_KEYCODE + '|' + SPACE_KEYCODE);

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUSIN_DATA_API: 'focusin' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    BACKDROP: 'dropdown-backdrop',
    DISABLED: 'disabled',
    SHOW: 'show'
  };

  var Selector = {
    BACKDROP: '.dropdown-backdrop',
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    ROLE_MENU: '[role="menu"]',
    ROLE_LISTBOX: '[role="listbox"]',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = function () {
    function Dropdown(element) {
      _classCallCheck(this, Dropdown);

      this._element = element;

      this._addEventListeners();
    }

    // getters

    // public

    Dropdown.prototype.toggle = function toggle() {
      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return false;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return false;
      }

      if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

        // if mobile we use a backdrop because click events don't delegate
        var dropdown = document.createElement('div');
        dropdown.className = ClassName.BACKDROP;
        $(dropdown).insertBefore(this);
        $(dropdown).on('click', Dropdown._clearMenus);
      }

      var relatedTarget = {
        relatedTarget: this
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return false;
      }

      this.focus();
      this.setAttribute('aria-expanded', true);

      $(parent).toggleClass(ClassName.SHOW);
      $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

      return false;
    };

    Dropdown.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
    };

    // private

    Dropdown.prototype._addEventListeners = function _addEventListeners() {
      $(this._element).on(Event.CLICK, this.toggle);
    };

    // static

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Dropdown(this);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config].call(this);
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
        return;
      }

      var backdrop = $(Selector.BACKDROP)[0];
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }

      var toggles = $.makeArray($(Selector.DATA_TOGGLE));

      for (var i = 0; i < toggles.length; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (!$(parent).hasClass(ClassName.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'focusin') && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue;
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent = void 0;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = $(selector)[0];
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (!REGEXP_KEYDOWN.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.FOCUSIN_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    // getters

    // public

    Modal.prototype.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    Modal.prototype.show = function show(relatedTarget) {
      var _this9 = this;

      if (this._isTransitioning) {
        throw new Error('Modal is transitioning');
      }

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }
      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });

      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();
      this._setScrollbar();

      $(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();
      this._setResizeEvent();

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this9.hide(event);
      });

      $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        $(_this9._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this9._element)) {
            _this9._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this9._showElement(relatedTarget);
      });
    };

    Modal.prototype.hide = function hide(event) {
      var _this10 = this;

      if (event) {
        event.preventDefault();
      }

      if (this._isTransitioning) {
        throw new Error('Modal is transitioning');
      }

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);
      if (transition) {
        this._isTransitioning = true;
      }

      var hideEvent = $.Event(Event.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;

      this._setEscapeEvent();
      this._setResizeEvent();

      $(document).off(Event.FOCUSIN);

      $(this._element).removeClass(ClassName.SHOW);

      $(this._element).off(Event.CLICK_DISMISS);
      $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) {
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this10._hideModal(event);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        this._hideModal();
      }
    };

    Modal.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      $(window, document, this._element, this._backdrop).off(EVENT_KEY);

      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._originalBodyPadding = null;
      this._scrollbarWidth = null;
    };

    // private

    Modal.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Modal.prototype._showElement = function _showElement(relatedTarget) {
      var _this11 = this;

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // don't move modals dom position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.scrollTop = 0;

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this11._config.focus) {
          _this11._element.focus();
        }
        _this11._isTransitioning = false;
        $(_this11._element).trigger(shownEvent);
      };

      if (transition) {
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        transitionComplete();
      }
    };

    Modal.prototype._enforceFocus = function _enforceFocus() {
      var _this12 = this;

      $(document).off(Event.FOCUSIN) // guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this12._element !== event.target && !$(_this12._element).has(event.target).length) {
          _this12._element.focus();
        }
      });
    };

    Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
      var _this13 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            _this13.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    Modal.prototype._setResizeEvent = function _setResizeEvent() {
      var _this14 = this;

      if (this._isShown) {
        $(window).on(Event.RESIZE, function (event) {
          return _this14._handleUpdate(event);
        });
      } else {
        $(window).off(Event.RESIZE);
      }
    };

    Modal.prototype._hideModal = function _hideModal() {
      var _this15 = this;

      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', 'true');
      this._isTransitioning = false;
      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName.OPEN);
        _this15._resetAdjustments();
        _this15._resetScrollbar();
        $(_this15._element).trigger(Event.HIDDEN);
      });
    };

    Modal.prototype._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    Modal.prototype._showBackdrop = function _showBackdrop(callback) {
      var _this16 = this;

      var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        var doAnimate = Util.supportsTransitionEnd() && animate;

        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          $(this._backdrop).addClass(animate);
        }

        $(this._backdrop).appendTo(document.body);

        $(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this16._ignoreBackdropClick) {
            _this16._ignoreBackdropClick = false;
            return;
          }
          if (event.target !== event.currentTarget) {
            return;
          }
          if (_this16._config.backdrop === 'static') {
            _this16._element.focus();
          } else {
            _this16.hide();
          }
        });

        if (doAnimate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) {
          return;
        }

        if (!doAnimate) {
          callback();
          return;
        }

        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this16._removeBackdrop();
          if (callback) {
            callback();
          }
        };

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    };

    // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------

    Modal.prototype._handleUpdate = function _handleUpdate() {
      this._adjustDialog();
    };

    Modal.prototype._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + 'px';
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    Modal.prototype._checkScrollbar = function _checkScrollbar() {
      this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    Modal.prototype._setScrollbar = function _setScrollbar() {
      var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

      this._originalBodyPadding = document.body.style.paddingRight || '';

      if (this._isBodyOverflowing) {
        document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetScrollbar = function _resetScrollbar() {
      document.body.style.paddingRight = this._originalBodyPadding;
    };

    Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    };

    // static

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this17 = this;

    var target = void 0;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this17).is(':visible')) {
          _this17.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  var Event = {
    ACTIVATE: 'activate' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    NAV_LINK: 'nav-link',
    NAV: 'nav',
    ACTIVE: 'active'
  };

  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    LIST_ITEM: '.list-item',
    LI: 'li',
    LI_DROPDOWN: 'li.dropdown',
    NAV_LINKS: '.nav-link',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };

  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = function () {
    function ScrollSpy(element, config) {
      var _this18 = this;

      _classCallCheck(this, ScrollSpy);

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $(this._scrollElement).on(Event.SCROLL, function (event) {
        return _this18._process(event);
      });

      this.refresh();
      this._process();
    }

    // getters

    // public

    ScrollSpy.prototype.refresh = function refresh() {
      var _this19 = this;

      var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

      this._offsets = [];
      this._targets = [];

      this._scrollHeight = this._getScrollHeight();

      var targets = $.makeArray($(this._selector));

      targets.map(function (element) {
        var target = void 0;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = $(targetSelector)[0];
        }

        if (target && (target.offsetWidth || target.offsetHeight)) {
          // todo (fat): remove sketch reliance on jQuery position/offset
          return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
        }
        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this19._offsets.push(item[0]);
        _this19._targets.push(item[1]);
      });
    };

    ScrollSpy.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._scrollElement).off(EVENT_KEY);

      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    };

    // private

    ScrollSpy.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');
        if (!id) {
          id = Util.getUID(NAME);
          $(config.target).attr('id', id);
        }
        config.target = '#' + id;
      }

      Util.typeCheckConfig(NAME, config, DefaultType);

      return config;
    };

    ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    ScrollSpy.prototype._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight;
    };

    ScrollSpy.prototype._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;
      var scrollHeight = this._getScrollHeight();
      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }
        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;
        this._clear();
        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    ScrollSpy.prototype._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',');
      queries = queries.map(function (selector) {
        return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
      });

      var $link = $(queries.join(','));

      if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
        $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        $link.addClass(ClassName.ACTIVE);
      } else {
        // todo (fat) this is kinda sus...
        // recursively add actives to tested nav-links
        $link.parents(Selector.LI).find('> ' + Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
      }

      $(this._scrollElement).trigger(Event.ACTIVATE, {
        relatedTarget: target
      });
    };

    ScrollSpy.prototype._clear = function _clear() {
      $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
    };

    // static

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    A: 'a',
    LI: 'li',
    DROPDOWN: '.dropdown',
    LIST: 'ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)',
    FADE_CHILD: '> .nav-item .fade, > .fade',
    ACTIVE: '.active',
    ACTIVE_CHILD: '> .nav-item > .active, > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    // getters

    // public

    Tab.prototype.show = function show() {
      var _this20 = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var target = void 0;
      var previous = void 0;
      var listElement = $(this._element).closest(Selector.LIST)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        previous = $.makeArray($(listElement).find(Selector.ACTIVE));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event.HIDE, {
        relatedTarget: this._element
      });

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = $(selector)[0];
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event.HIDDEN, {
          relatedTarget: _this20._element
        });

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: previous
        });

        $(previous).trigger(hiddenEvent);
        $(_this20._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    Tab.prototype.dispose = function dispose() {
      $.removeClass(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Tab.prototype._activate = function _activate(element, container, callback) {
      var _this21 = this;

      var active = $(container).find(Selector.ACTIVE_CHILD)[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

      var complete = function complete() {
        return _this21._transitionComplete(element, active, isTransitioning, callback);
      };

      if (active && isTransitioning) {
        $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      if (active) {
        $(active).removeClass(ClassName.SHOW);
      }
    };

    Tab.prototype._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
      if (active) {
        $(active).removeClass(ClassName.ACTIVE);

        var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName.ACTIVE);
        }

        active.setAttribute('aria-expanded', false);
      }

      $(element).addClass(ClassName.ACTIVE);
      element.setAttribute('aria-expanded', true);

      if (isTransitioning) {
        Util.reflow(element);
        $(element).addClass(ClassName.SHOW);
      } else {
        $(element).removeClass(ClassName.FADE);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

        var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
        if (dropdownElement) {
          $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    };

    // static

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}(jQuery);

/* global Tether */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($) {

  /**
   * Check for Tether dependency
   * Tether - http://tether.io/
   */
  if (typeof Tether === 'undefined') {
    throw new Error('Bootstrap tooltips require Tether (http://tether.io/)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tether';

  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: '0 0',
    constraints: [],
    container: false
  };

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: 'string',
    constraints: 'array',
    container: '(string|element|boolean)'
  };

  var AttachmentMap = {
    TOP: 'bottom center',
    RIGHT: 'middle left',
    BOTTOM: 'top center',
    LEFT: 'middle right'
  };

  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner'
  };

  var TetherClass = {
    element: false,
    enabled: false
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = function () {
    function Tooltip(element, config) {
      _classCallCheck(this, Tooltip);

      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._isTransitioning = false;
      this._tether = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    // getters

    // public

    Tooltip.prototype.enable = function enable() {
      this._isEnabled = true;
    };

    Tooltip.prototype.disable = function disable() {
      this._isEnabled = false;
    };

    Tooltip.prototype.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    Tooltip.prototype.toggle = function toggle(event) {
      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {

        if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
          this._leave(null, this);
          return;
        }

        this._enter(null, this);
      }
    };

    Tooltip.prototype.dispose = function dispose() {
      clearTimeout(this._timeout);

      this.cleanupTether();

      $.removeData(this.element, this.constructor.DATA_KEY);

      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;
      this._tether = null;

      this.element = null;
      this.config = null;
      this.tip = null;
    };

    Tooltip.prototype.show = function show() {
      var _this22 = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);
      if (this.isWithContent() && this._isEnabled) {
        if (this._isTransitioning) {
          throw new Error('Tooltip is transitioning');
        }
        $(this.element).trigger(showEvent);

        var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);

        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);

        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        var container = this.config.container === false ? document.body : $(this.config.container);

        $(tip).data(this.constructor.DATA_KEY, this).appendTo(container);

        $(this.element).trigger(this.constructor.Event.INSERTED);

        this._tether = new Tether({
          attachment: attachment,
          element: tip,
          target: this.element,
          classes: TetherClass,
          classPrefix: CLASS_PREFIX,
          offset: this.config.offset,
          constraints: this.config.constraints,
          addTargetClasses: false
        });

        Util.reflow(tip);
        this._tether.position();

        $(tip).addClass(ClassName.SHOW);

        var complete = function complete() {
          var prevHoverState = _this22._hoverState;
          _this22._hoverState = null;
          _this22._isTransitioning = false;

          $(_this22.element).trigger(_this22.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this22._leave(null, _this22);
          }
        };

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
          return;
        }

        complete();
      }
    };

    Tooltip.prototype.hide = function hide(callback) {
      var _this23 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);
      if (this._isTransitioning) {
        throw new Error('Tooltip is transitioning');
      }
      var complete = function complete() {
        if (_this23._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this23.element.removeAttribute('aria-describedby');
        $(_this23.element).trigger(_this23.constructor.Event.HIDDEN);
        _this23._isTransitioning = false;
        _this23.cleanupTether();

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName.SHOW);

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    // protected

    Tooltip.prototype.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    Tooltip.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Tooltip.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

      this.cleanupTether();
    };

    Tooltip.prototype.setElementContent = function setElementContent($element, content) {
      var html = this.config.html;
      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
        // content is a DOM node or a jQuery
        if (html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }
      } else {
        $element[html ? 'html' : 'text'](content);
      }
    };

    Tooltip.prototype.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    };

    Tooltip.prototype.cleanupTether = function cleanupTether() {
      if (this._tether) {
        this._tether.destroy();
      }
    };

    // private

    Tooltip.prototype._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    Tooltip.prototype._setListeners = function _setListeners() {
      var _this24 = this;

      var triggers = this.config.trigger.split(' ');

      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this24.element).on(_this24.constructor.Event.CLICK, _this24.config.selector, function (event) {
            return _this24.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this24.constructor.Event.MOUSEENTER : _this24.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this24.constructor.Event.MOUSELEAVE : _this24.constructor.Event.FOCUSOUT;

          $(_this24.element).on(eventIn, _this24.config.selector, function (event) {
            return _this24._enter(event);
          }).on(eventOut, _this24.config.selector, function (event) {
            return _this24._leave(event);
          });
        }

        $(_this24.element).closest('.modal').on('hide.bs.modal', function () {
          return _this24.hide();
        });
      });

      if (this.config.selector) {
        this.config = $.extend({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    Tooltip.prototype._fixTitle = function _fixTitle() {
      var titleType = _typeof(this.element.getAttribute('data-original-title'));
      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    Tooltip.prototype._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    Tooltip.prototype._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    Tooltip.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

      if (config.delay && typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    };

    Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    // static

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Tooltip;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TITLE: '.popover-title',
    CONTENT: '.popover-content'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
    }

    // overrides

    Popover.prototype.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    Popover.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Popover.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      // we use append for html objects to maintain js events
      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
      this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

      this.cleanupTether();
    };

    // private

    Popover.prototype._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
    };

    // static

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data && /destroy|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: 'VERSION',


      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  }(Tooltip);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
}(jQuery);

}();
/*!
  * bootstrap-material-design  v4.0.2 (https://github.com/FezVrasta/bootstrap-material-design)
  * Copyright 2016 Federico Zivolo and contributors
  * Licensed under MIT
  */

(function () {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}

	function interopDefault(ex) {
		return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _global$1 = interopDefault(_global);

var require$$3 = Object.freeze({
	  default: _global$1
	});

	var _has = createCommonjsModule(function (module) {
	  var hasOwnProperty = {}.hasOwnProperty;
	  module.exports = function (it, key) {
	    return hasOwnProperty.call(it, key);
	  };
	});

	var _has$1 = interopDefault(_has);

var require$$4 = Object.freeze({
	  default: _has$1
	});

	var _fails = createCommonjsModule(function (module) {
	  module.exports = function (exec) {
	    try {
	      return !!exec();
	    } catch (e) {
	      return true;
	    }
	  };
	});

	var _fails$1 = interopDefault(_fails);

var require$$1$1 = Object.freeze({
	  default: _fails$1
	});

	var _descriptors = createCommonjsModule(function (module) {
	  // Thank's IE8 for his funny defineProperty
	  module.exports = !interopDefault(require$$1$1)(function () {
	    return Object.defineProperty({}, 'a', { get: function get() {
	        return 7;
	      } }).a != 7;
	  });
	});

	var _descriptors$1 = interopDefault(_descriptors);

var require$$1 = Object.freeze({
	  default: _descriptors$1
	});

	var _core = createCommonjsModule(function (module) {
	  var core = module.exports = { version: '2.4.0' };
	  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});

	var _core$1 = interopDefault(_core);
	var version = _core.version;

var require$$0 = Object.freeze({
	  default: _core$1,
	  version: version
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

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

	var get = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = Object.getOwnPropertyDescriptor(object, property);

	  if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var _isObject = createCommonjsModule(function (module) {
	  module.exports = function (it) {
	    return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
	  };
	});

	var _isObject$1 = interopDefault(_isObject);



	var require$$0$1 = Object.freeze({
	  default: _isObject$1
	});

	var _anObject = createCommonjsModule(function (module) {
	  var isObject = interopDefault(require$$0$1);
	  module.exports = function (it) {
	    if (!isObject(it)) throw TypeError(it + ' is not an object!');
	    return it;
	  };
	});

	var _anObject$1 = interopDefault(_anObject);

var require$$5 = Object.freeze({
	  default: _anObject$1
	});

	var _domCreate = createCommonjsModule(function (module) {
	  var isObject = interopDefault(require$$0$1),
	      document = interopDefault(require$$3).document
	  // in old IE typeof document.createElement is 'object'
	  ,
	      is = isObject(document) && isObject(document.createElement);
	  module.exports = function (it) {
	    return is ? document.createElement(it) : {};
	  };
	});

	var _domCreate$1 = interopDefault(_domCreate);

var require$$2$2 = Object.freeze({
	  default: _domCreate$1
	});

	var _ie8DomDefine = createCommonjsModule(function (module) {
	  module.exports = !interopDefault(require$$1) && !interopDefault(require$$1$1)(function () {
	    return Object.defineProperty(interopDefault(require$$2$2)('div'), 'a', { get: function get() {
	        return 7;
	      } }).a != 7;
	  });
	});

	var _ie8DomDefine$1 = interopDefault(_ie8DomDefine);

var require$$1$3 = Object.freeze({
	  default: _ie8DomDefine$1
	});

	var _toPrimitive = createCommonjsModule(function (module) {
	  // 7.1.1 ToPrimitive(input [, PreferredType])
	  var isObject = interopDefault(require$$0$1);
	  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
	  // and the second argument - flag - preferred type is a string
	  module.exports = function (it, S) {
	    if (!isObject(it)) return it;
	    var fn, val;
	    if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	    if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	    if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	    throw TypeError("Can't convert object to primitive value");
	  };
	});

	var _toPrimitive$1 = interopDefault(_toPrimitive);

var require$$4$1 = Object.freeze({
	  default: _toPrimitive$1
	});

	var _objectDp = createCommonjsModule(function (module, exports) {
	  var anObject = interopDefault(require$$5),
	      IE8_DOM_DEFINE = interopDefault(require$$1$3),
	      toPrimitive = interopDefault(require$$4$1),
	      dP = Object.defineProperty;

	  exports.f = interopDefault(require$$1) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	    anObject(O);
	    P = toPrimitive(P, true);
	    anObject(Attributes);
	    if (IE8_DOM_DEFINE) try {
	      return dP(O, P, Attributes);
	    } catch (e) {/* empty */}
	    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	    if ('value' in Attributes) O[P] = Attributes.value;
	    return O;
	  };
	});

	var _objectDp$1 = interopDefault(_objectDp);
	var f = _objectDp.f;

var require$$2$1 = Object.freeze({
	  default: _objectDp$1,
	  f: f
	});

	var _propertyDesc = createCommonjsModule(function (module) {
	  module.exports = function (bitmap, value) {
	    return {
	      enumerable: !(bitmap & 1),
	      configurable: !(bitmap & 2),
	      writable: !(bitmap & 4),
	      value: value
	    };
	  };
	});

	var _propertyDesc$1 = interopDefault(_propertyDesc);

var require$$2$3 = Object.freeze({
	  default: _propertyDesc$1
	});

	var _hide = createCommonjsModule(function (module) {
	  var dP = interopDefault(require$$2$1),
	      createDesc = interopDefault(require$$2$3);
	  module.exports = interopDefault(require$$1) ? function (object, key, value) {
	    return dP.f(object, key, createDesc(1, value));
	  } : function (object, key, value) {
	    object[key] = value;
	    return object;
	  };
	});

	var _hide$1 = interopDefault(_hide);

var require$$2 = Object.freeze({
	  default: _hide$1
	});

	var _uid = createCommonjsModule(function (module) {
	  var id = 0,
	      px = Math.random();
	  module.exports = function (key) {
	    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	  };
	});

	var _uid$1 = interopDefault(_uid);

var require$$12 = Object.freeze({
	  default: _uid$1
	});

	var _redefine = createCommonjsModule(function (module) {
	  var global = interopDefault(require$$3),
	      hide = interopDefault(require$$2),
	      has = interopDefault(require$$4),
	      SRC = interopDefault(require$$12)('src'),
	      TO_STRING = 'toString',
	      $toString = Function[TO_STRING],
	      TPL = ('' + $toString).split(TO_STRING);

	  interopDefault(require$$0).inspectSource = function (it) {
	    return $toString.call(it);
	  };

	  (module.exports = function (O, key, val, safe) {
	    var isFunction = typeof val == 'function';
	    if (isFunction) has(val, 'name') || hide(val, 'name', key);
	    if (O[key] === val) return;
	    if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	    if (O === global) {
	      O[key] = val;
	    } else {
	      if (!safe) {
	        delete O[key];
	        hide(O, key, val);
	      } else {
	        if (O[key]) O[key] = val;else hide(O, key, val);
	      }
	    }
	    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	  })(Function.prototype, TO_STRING, function toString() {
	    return typeof this == 'function' && this[SRC] || $toString.call(this);
	  });
	});

	var _redefine$1 = interopDefault(_redefine);

var require$$4$2 = Object.freeze({
	  default: _redefine$1
	});

	var _aFunction = createCommonjsModule(function (module) {
	  module.exports = function (it) {
	    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	    return it;
	  };
	});

	var _aFunction$1 = interopDefault(_aFunction);

var require$$0$2 = Object.freeze({
	  default: _aFunction$1
	});

	var _ctx = createCommonjsModule(function (module) {
	  // optional / simple context binding
	  var aFunction = interopDefault(require$$0$2);
	  module.exports = function (fn, that, length) {
	    aFunction(fn);
	    if (that === undefined) return fn;
	    switch (length) {
	      case 1:
	        return function (a) {
	          return fn.call(that, a);
	        };
	      case 2:
	        return function (a, b) {
	          return fn.call(that, a, b);
	        };
	      case 3:
	        return function (a, b, c) {
	          return fn.call(that, a, b, c);
	        };
	    }
	    return function () /* ...args */{
	      return fn.apply(that, arguments);
	    };
	  };
	});

	var _ctx$1 = interopDefault(_ctx);

var require$$31 = Object.freeze({
	  default: _ctx$1
	});

	var _export = createCommonjsModule(function (module) {
	  var global = interopDefault(require$$3),
	      core = interopDefault(require$$0),
	      hide = interopDefault(require$$2),
	      redefine = interopDefault(require$$4$2),
	      ctx = interopDefault(require$$31),
	      PROTOTYPE = 'prototype';

	  var $export = function $export(type, name, source) {
	    var IS_FORCED = type & $export.F,
	        IS_GLOBAL = type & $export.G,
	        IS_STATIC = type & $export.S,
	        IS_PROTO = type & $export.P,
	        IS_BIND = type & $export.B,
	        target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
	        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	        expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
	        key,
	        own,
	        out,
	        exp;
	    if (IS_GLOBAL) source = name;
	    for (key in source) {
	      // contains in native
	      own = !IS_FORCED && target && target[key] !== undefined;
	      // export native or passed
	      out = (own ? target : source)[key];
	      // bind timers to global for call from export context
	      exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	      // extend global
	      if (target) redefine(target, key, out, type & $export.U);
	      // export
	      if (exports[key] != out) hide(exports, key, exp);
	      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	    }
	  };
	  global.core = core;
	  // type bitmap
	  $export.F = 1; // forced
	  $export.G = 2; // global
	  $export.S = 4; // static
	  $export.P = 8; // proto
	  $export.B = 16; // bind
	  $export.W = 32; // wrap
	  $export.U = 64; // safe
	  $export.R = 128; // real proto method for `library` 
	  module.exports = $export;
	});

	var _export$1 = interopDefault(_export);

var require$$1$2 = Object.freeze({
	  default: _export$1
	});

	var _meta = createCommonjsModule(function (module) {
	  var META = interopDefault(require$$12)('meta'),
	      isObject = interopDefault(require$$0$1),
	      has = interopDefault(require$$4),
	      setDesc = interopDefault(require$$2$1).f,
	      id = 0;
	  var isExtensible = Object.isExtensible || function () {
	    return true;
	  };
	  var FREEZE = !interopDefault(require$$1$1)(function () {
	    return isExtensible(Object.preventExtensions({}));
	  });
	  var setMeta = function setMeta(it) {
	    setDesc(it, META, { value: {
	        i: 'O' + ++id, // object ID
	        w: {} // weak collections IDs
	      } });
	  };
	  var fastKey = function fastKey(it, create) {
	    // return primitive with prefix
	    if (!isObject(it)) return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	    if (!has(it, META)) {
	      // can't set metadata to uncaught frozen object
	      if (!isExtensible(it)) return 'F';
	      // not necessary to add metadata
	      if (!create) return 'E';
	      // add missing metadata
	      setMeta(it);
	      // return object ID
	    }return it[META].i;
	  };
	  var getWeak = function getWeak(it, create) {
	    if (!has(it, META)) {
	      // can't set metadata to uncaught frozen object
	      if (!isExtensible(it)) return true;
	      // not necessary to add metadata
	      if (!create) return false;
	      // add missing metadata
	      setMeta(it);
	      // return hash weak collections IDs
	    }return it[META].w;
	  };
	  // add metadata on freeze-family methods calling
	  var onFreeze = function onFreeze(it) {
	    if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	    return it;
	  };
	  var meta = module.exports = {
	    KEY: META,
	    NEED: false,
	    fastKey: fastKey,
	    getWeak: getWeak,
	    onFreeze: onFreeze
	  };
	});

	var _meta$1 = interopDefault(_meta);
	var KEY = _meta.KEY;
	var NEED = _meta.NEED;
	var fastKey = _meta.fastKey;
	var getWeak = _meta.getWeak;
	var onFreeze = _meta.onFreeze;



	var require$$6 = Object.freeze({
	  default: _meta$1,
	  KEY: KEY,
	  NEED: NEED,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	});

	var _shared = createCommonjsModule(function (module) {
	  var global = interopDefault(require$$3),
	      SHARED = '__core-js_shared__',
	      store = global[SHARED] || (global[SHARED] = {});
	  module.exports = function (key) {
	    return store[key] || (store[key] = {});
	  };
	});

	var _shared$1 = interopDefault(_shared);

var require$$1$4 = Object.freeze({
	  default: _shared$1
	});

	var _wks = createCommonjsModule(function (module) {
	  var store = interopDefault(require$$1$4)('wks'),
	      uid = interopDefault(require$$12),
	      _Symbol = interopDefault(require$$3).Symbol,
	      USE_SYMBOL = typeof _Symbol == 'function';

	  var $exports = module.exports = function (name) {
	    return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
	  };

	  $exports.store = store;
	});

	var _wks$1 = interopDefault(_wks);

var require$$0$4 = Object.freeze({
	  default: _wks$1
	});

	var _setToStringTag = createCommonjsModule(function (module) {
	  var def = interopDefault(require$$2$1).f,
	      has = interopDefault(require$$4),
	      TAG = interopDefault(require$$0$4)('toStringTag');

	  module.exports = function (it, tag, stat) {
	    if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	  };
	});

	var _setToStringTag$1 = interopDefault(_setToStringTag);

var require$$0$3 = Object.freeze({
	  default: _setToStringTag$1
	});

	var _wksExt = createCommonjsModule(function (module, exports) {
	  exports.f = interopDefault(require$$0$4);
	});

	var _wksExt$1 = interopDefault(_wksExt);
	var f$1 = _wksExt.f;

var require$$1$5 = Object.freeze({
	  default: _wksExt$1,
	  f: f$1
	});

	var _library = createCommonjsModule(function (module) {
	  module.exports = false;
	});

	var _library$1 = interopDefault(_library);

var require$$2$4 = Object.freeze({
	  default: _library$1
	});

	var _wksDefine = createCommonjsModule(function (module) {
	  var global = interopDefault(require$$3),
	      core = interopDefault(require$$0),
	      LIBRARY = interopDefault(require$$2$4),
	      wksExt = interopDefault(require$$1$5),
	      defineProperty = interopDefault(require$$2$1).f;
	  module.exports = function (name) {
	    var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	    if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	  };
	});

	var _wksDefine$1 = interopDefault(_wksDefine);

var require$$0$5 = Object.freeze({
	  default: _wksDefine$1
	});

	var _cof = createCommonjsModule(function (module) {
	  var toString = {}.toString;

	  module.exports = function (it) {
	    return toString.call(it).slice(8, -1);
	  };
	});

	var _cof$1 = interopDefault(_cof);

var require$$0$6 = Object.freeze({
	  default: _cof$1
	});

	var _iobject = createCommonjsModule(function (module) {
	  // fallback for non-array-like ES3 and non-enumerable old V8 strings
	  var cof = interopDefault(require$$0$6);
	  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	    return cof(it) == 'String' ? it.split('') : Object(it);
	  };
	});

	var _iobject$1 = interopDefault(_iobject);

var require$$1$8 = Object.freeze({
	  default: _iobject$1
	});

	var _defined = createCommonjsModule(function (module) {
	  // 7.2.1 RequireObjectCoercible(argument)
	  module.exports = function (it) {
	    if (it == undefined) throw TypeError("Can't call method on  " + it);
	    return it;
	  };
	});

	var _defined$1 = interopDefault(_defined);

var require$$4$3 = Object.freeze({
	  default: _defined$1
	});

	var _toIobject = createCommonjsModule(function (module) {
	  // to indexed object, toObject with fallback for non-array-like ES3 strings
	  var IObject = interopDefault(require$$1$8),
	      defined = interopDefault(require$$4$3);
	  module.exports = function (it) {
	    return IObject(defined(it));
	  };
	});

	var _toIobject$1 = interopDefault(_toIobject);

var require$$1$7 = Object.freeze({
	  default: _toIobject$1
	});

	var _toInteger = createCommonjsModule(function (module) {
	  // 7.1.4 ToInteger
	  var ceil = Math.ceil,
	      floor = Math.floor;
	  module.exports = function (it) {
	    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	  };
	});

	var _toInteger$1 = interopDefault(_toInteger);

var require$$26 = Object.freeze({
	  default: _toInteger$1
	});

	var _toLength = createCommonjsModule(function (module) {
	  // 7.1.15 ToLength
	  var toInteger = interopDefault(require$$26),
	      min = Math.min;
	  module.exports = function (it) {
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  };
	});

	var _toLength$1 = interopDefault(_toLength);

var require$$3$1 = Object.freeze({
	  default: _toLength$1
	});

	var _toIndex = createCommonjsModule(function (module) {
	  var toInteger = interopDefault(require$$26),
	      max = Math.max,
	      min = Math.min;
	  module.exports = function (index, length) {
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  };
	});

	var _toIndex$1 = interopDefault(_toIndex);

var require$$24 = Object.freeze({
	  default: _toIndex$1
	});

	var _arrayIncludes = createCommonjsModule(function (module) {
	  // false -> Array#indexOf
	  // true  -> Array#includes
	  var toIObject = interopDefault(require$$1$7),
	      toLength = interopDefault(require$$3$1),
	      toIndex = interopDefault(require$$24);
	  module.exports = function (IS_INCLUDES) {
	    return function ($this, el, fromIndex) {
	      var O = toIObject($this),
	          length = toLength(O.length),
	          index = toIndex(fromIndex, length),
	          value;
	      // Array#includes uses SameValueZero equality algorithm
	      if (IS_INCLUDES && el != el) while (length > index) {
	        value = O[index++];
	        if (value != value) return true;
	        // Array#toIndex ignores holes, Array#includes - not
	      } else for (; length > index; index++) {
	        if (IS_INCLUDES || index in O) {
	          if (O[index] === el) return IS_INCLUDES || index || 0;
	        }
	      }return !IS_INCLUDES && -1;
	    };
	  };
	});

	var _arrayIncludes$1 = interopDefault(_arrayIncludes);

var require$$1$9 = Object.freeze({
	  default: _arrayIncludes$1
	});

	var _sharedKey = createCommonjsModule(function (module) {
	  var shared = interopDefault(require$$1$4)('keys'),
	      uid = interopDefault(require$$12);
	  module.exports = function (key) {
	    return shared[key] || (shared[key] = uid(key));
	  };
	});

	var _sharedKey$1 = interopDefault(_sharedKey);

var require$$0$7 = Object.freeze({
	  default: _sharedKey$1
	});

	var _objectKeysInternal = createCommonjsModule(function (module) {
	  var has = interopDefault(require$$4),
	      toIObject = interopDefault(require$$1$7),
	      arrayIndexOf = interopDefault(require$$1$9)(false),
	      IE_PROTO = interopDefault(require$$0$7)('IE_PROTO');

	  module.exports = function (object, names) {
	    var O = toIObject(object),
	        i = 0,
	        result = [],
	        key;
	    for (key in O) {
	      if (key != IE_PROTO) has(O, key) && result.push(key);
	    } // Don't enum bug & hidden keys
	    while (names.length > i) {
	      if (has(O, key = names[i++])) {
	        ~arrayIndexOf(result, key) || result.push(key);
	      }
	    }return result;
	  };
	});

	var _objectKeysInternal$1 = interopDefault(_objectKeysInternal);

var require$$1$6 = Object.freeze({
	  default: _objectKeysInternal$1
	});

	var _enumBugKeys = createCommonjsModule(function (module) {
	  // IE 8- don't enum bug keys
	  module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
	});

	var _enumBugKeys$1 = interopDefault(_enumBugKeys);

var require$$0$8 = Object.freeze({
	  default: _enumBugKeys$1
	});

	var _objectKeys = createCommonjsModule(function (module) {
	  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
	  var $keys = interopDefault(require$$1$6),
	      enumBugKeys = interopDefault(require$$0$8);

	  module.exports = Object.keys || function keys(O) {
	    return $keys(O, enumBugKeys);
	  };
	});

	var _objectKeys$1 = interopDefault(_objectKeys);

var require$$2$5 = Object.freeze({
	  default: _objectKeys$1
	});

	var _keyof = createCommonjsModule(function (module) {
	  var getKeys = interopDefault(require$$2$5),
	      toIObject = interopDefault(require$$1$7);
	  module.exports = function (object, el) {
	    var O = toIObject(object),
	        keys = getKeys(O),
	        length = keys.length,
	        index = 0,
	        key;
	    while (length > index) {
	      if (O[key = keys[index++]] === el) return key;
	    }
	  };
	});

	var _keyof$1 = interopDefault(_keyof);

var require$$16 = Object.freeze({
	  default: _keyof$1
	});

	var _objectGops = createCommonjsModule(function (module, exports) {
	  exports.f = Object.getOwnPropertySymbols;
	});

	var _objectGops$1 = interopDefault(_objectGops);
	var f$2 = _objectGops.f;

var require$$2$6 = Object.freeze({
	  default: _objectGops$1,
	  f: f$2
	});

	var _objectPie = createCommonjsModule(function (module, exports) {
	  exports.f = {}.propertyIsEnumerable;
	});

	var _objectPie$1 = interopDefault(_objectPie);
	var f$3 = _objectPie.f;

var require$$0$9 = Object.freeze({
	  default: _objectPie$1,
	  f: f$3
	});

	var _enumKeys = createCommonjsModule(function (module) {
	  // all enumerable object keys, includes symbols
	  var getKeys = interopDefault(require$$2$5),
	      gOPS = interopDefault(require$$2$6),
	      pIE = interopDefault(require$$0$9);
	  module.exports = function (it) {
	    var result = getKeys(it),
	        getSymbols = gOPS.f;
	    if (getSymbols) {
	      var symbols = getSymbols(it),
	          isEnum = pIE.f,
	          i = 0,
	          key;
	      while (symbols.length > i) {
	        if (isEnum.call(it, key = symbols[i++])) result.push(key);
	      }
	    }return result;
	  };
	});

	var _enumKeys$1 = interopDefault(_enumKeys);

var require$$15 = Object.freeze({
	  default: _enumKeys$1
	});

	var _isArray = createCommonjsModule(function (module) {
	  // 7.2.2 IsArray(argument)
	  var cof = interopDefault(require$$0$6);
	  module.exports = Array.isArray || function isArray(arg) {
	    return cof(arg) == 'Array';
	  };
	});

	var _isArray$1 = interopDefault(_isArray);

var require$$1$10 = Object.freeze({
	  default: _isArray$1
	});

	var _objectDps = createCommonjsModule(function (module) {
	  var dP = interopDefault(require$$2$1),
	      anObject = interopDefault(require$$5),
	      getKeys = interopDefault(require$$2$5);

	  module.exports = interopDefault(require$$1) ? Object.defineProperties : function defineProperties(O, Properties) {
	    anObject(O);
	    var keys = getKeys(Properties),
	        length = keys.length,
	        i = 0,
	        P;
	    while (length > i) {
	      dP.f(O, P = keys[i++], Properties[P]);
	    }return O;
	  };
	});

	var _objectDps$1 = interopDefault(_objectDps);

var require$$0$10 = Object.freeze({
	  default: _objectDps$1
	});

	var _html = createCommonjsModule(function (module) {
	  module.exports = interopDefault(require$$3).document && document.documentElement;
	});

	var _html$1 = interopDefault(_html);

var require$$3$2 = Object.freeze({
	  default: _html$1
	});

	var _objectCreate = createCommonjsModule(function (module) {
	  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	  var anObject = interopDefault(require$$5),
	      dPs = interopDefault(require$$0$10),
	      enumBugKeys = interopDefault(require$$0$8),
	      IE_PROTO = interopDefault(require$$0$7)('IE_PROTO'),
	      Empty = function Empty() {/* empty */},
	      PROTOTYPE = 'prototype';

	  // Create object with fake `null` prototype: use iframe Object with cleared prototype
	  var _createDict = function createDict() {
	    // Thrash, waste and sodomy: IE GC bug
	    var iframe = interopDefault(require$$2$2)('iframe'),
	        i = enumBugKeys.length,
	        lt = '<',
	        gt = '>',
	        iframeDocument;
	    iframe.style.display = 'none';
	    interopDefault(require$$3$2).appendChild(iframe);
	    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	    // createDict = iframe.contentWindow.Object;
	    // html.removeChild(iframe);
	    iframeDocument = iframe.contentWindow.document;
	    iframeDocument.open();
	    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	    iframeDocument.close();
	    _createDict = iframeDocument.F;
	    while (i--) {
	      delete _createDict[PROTOTYPE][enumBugKeys[i]];
	    }return _createDict();
	  };

	  module.exports = Object.create || function create(O, Properties) {
	    var result;
	    if (O !== null) {
	      Empty[PROTOTYPE] = anObject(O);
	      result = new Empty();
	      Empty[PROTOTYPE] = null;
	      // add "__proto__" for Object.getPrototypeOf polyfill
	      result[IE_PROTO] = O;
	    } else result = _createDict();
	    return Properties === undefined ? result : dPs(result, Properties);
	  };
	});

	var _objectCreate$1 = interopDefault(_objectCreate);

var require$$6$1 = Object.freeze({
	  default: _objectCreate$1
	});

	var _objectGopn = createCommonjsModule(function (module, exports) {
	  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	  var $keys = interopDefault(require$$1$6),
	      hiddenKeys = interopDefault(require$$0$8).concat('length', 'prototype');

	  exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	    return $keys(O, hiddenKeys);
	  };
	});

	var _objectGopn$1 = interopDefault(_objectGopn);
	var f$5 = _objectGopn.f;

var require$$3$3 = Object.freeze({
	  default: _objectGopn$1,
	  f: f$5
	});

	var _objectGopnExt = createCommonjsModule(function (module) {
	  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	  var toIObject = interopDefault(require$$1$7),
	      gOPN = interopDefault(require$$3$3).f,
	      toString = {}.toString;

	  var windowNames = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

	  var getWindowNames = function getWindowNames(it) {
	    try {
	      return gOPN(it);
	    } catch (e) {
	      return windowNames.slice();
	    }
	  };

	  module.exports.f = function getOwnPropertyNames(it) {
	    return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	  };
	});

	var _objectGopnExt$1 = interopDefault(_objectGopnExt);
	var f$4 = _objectGopnExt.f;



	var require$$0$11 = Object.freeze({
	  default: _objectGopnExt$1,
	  f: f$4
	});

	var _objectGopd = createCommonjsModule(function (module, exports) {
	  var pIE = interopDefault(require$$0$9),
	      createDesc = interopDefault(require$$2$3),
	      toIObject = interopDefault(require$$1$7),
	      toPrimitive = interopDefault(require$$4$1),
	      has = interopDefault(require$$4),
	      IE8_DOM_DEFINE = interopDefault(require$$1$3),
	      gOPD = Object.getOwnPropertyDescriptor;

	  exports.f = interopDefault(require$$1) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	    O = toIObject(O);
	    P = toPrimitive(P, true);
	    if (IE8_DOM_DEFINE) try {
	      return gOPD(O, P);
	    } catch (e) {/* empty */}
	    if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	  };
	});

	var _objectGopd$1 = interopDefault(_objectGopd);
	var f$6 = _objectGopd.f;

var require$$2$7 = Object.freeze({
	  default: _objectGopd$1,
	  f: f$6
	});

	var es6_symbol = createCommonjsModule(function (module) {
	  'use strict';
	  // ECMAScript 6 symbols shim

	  var global = interopDefault(require$$3),
	      has = interopDefault(require$$4),
	      DESCRIPTORS = interopDefault(require$$1),
	      $export = interopDefault(require$$1$2),
	      redefine = interopDefault(require$$4$2),
	      META = interopDefault(require$$6).KEY,
	      $fails = interopDefault(require$$1$1),
	      shared = interopDefault(require$$1$4),
	      setToStringTag = interopDefault(require$$0$3),
	      uid = interopDefault(require$$12),
	      wks = interopDefault(require$$0$4),
	      wksExt = interopDefault(require$$1$5),
	      wksDefine = interopDefault(require$$0$5),
	      keyOf = interopDefault(require$$16),
	      enumKeys = interopDefault(require$$15),
	      isArray = interopDefault(require$$1$10),
	      anObject = interopDefault(require$$5),
	      toIObject = interopDefault(require$$1$7),
	      toPrimitive = interopDefault(require$$4$1),
	      createDesc = interopDefault(require$$2$3),
	      _create = interopDefault(require$$6$1),
	      gOPNExt = interopDefault(require$$0$11),
	      $GOPD = interopDefault(require$$2$7),
	      $DP = interopDefault(require$$2$1),
	      $keys = interopDefault(require$$2$5),
	      gOPD = $GOPD.f,
	      dP = $DP.f,
	      gOPN = gOPNExt.f,
	      $Symbol = global.Symbol,
	      $JSON = global.JSON,
	      _stringify = $JSON && $JSON.stringify,
	      PROTOTYPE = 'prototype',
	      HIDDEN = wks('_hidden'),
	      TO_PRIMITIVE = wks('toPrimitive'),
	      isEnum = {}.propertyIsEnumerable,
	      SymbolRegistry = shared('symbol-registry'),
	      AllSymbols = shared('symbols'),
	      OPSymbols = shared('op-symbols'),
	      ObjectProto = Object[PROTOTYPE],
	      USE_NATIVE = typeof $Symbol == 'function',
	      QObject = global.QObject;
	  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	  var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	  var setSymbolDesc = DESCRIPTORS && $fails(function () {
	    return _create(dP({}, 'a', {
	      get: function get() {
	        return dP(this, 'a', { value: 7 }).a;
	      }
	    })).a != 7;
	  }) ? function (it, key, D) {
	    var protoDesc = gOPD(ObjectProto, key);
	    if (protoDesc) delete ObjectProto[key];
	    dP(it, key, D);
	    if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	  } : dP;

	  var wrap = function wrap(tag) {
	    var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	    sym._k = tag;
	    return sym;
	  };

	  var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
	    return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol';
	  } : function (it) {
	    return it instanceof $Symbol;
	  };

	  var $defineProperty = function defineProperty(it, key, D) {
	    if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	    anObject(it);
	    key = toPrimitive(key, true);
	    anObject(D);
	    if (has(AllSymbols, key)) {
	      if (!D.enumerable) {
	        if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	        it[HIDDEN][key] = true;
	      } else {
	        if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	        D = _create(D, { enumerable: createDesc(0, false) });
	      }return setSymbolDesc(it, key, D);
	    }return dP(it, key, D);
	  };
	  var $defineProperties = function defineProperties(it, P) {
	    anObject(it);
	    var keys = enumKeys(P = toIObject(P)),
	        i = 0,
	        l = keys.length,
	        key;
	    while (l > i) {
	      $defineProperty(it, key = keys[i++], P[key]);
	    }return it;
	  };
	  var $create = function create(it, P) {
	    return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	  };
	  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	    var E = isEnum.call(this, key = toPrimitive(key, true));
	    if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	  };
	  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	    it = toIObject(it);
	    key = toPrimitive(key, true);
	    if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	    var D = gOPD(it, key);
	    if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	    return D;
	  };
	  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	    var names = gOPN(toIObject(it)),
	        result = [],
	        i = 0,
	        key;
	    while (names.length > i) {
	      if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	    }return result;
	  };
	  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	    var IS_OP = it === ObjectProto,
	        names = gOPN(IS_OP ? OPSymbols : toIObject(it)),
	        result = [],
	        i = 0,
	        key;
	    while (names.length > i) {
	      if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	    }return result;
	  };

	  // 19.4.1.1 Symbol([description])
	  if (!USE_NATIVE) {
	    $Symbol = function _Symbol() {
	      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	      var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	      var $set = function $set(value) {
	        if (this === ObjectProto) $set.call(OPSymbols, value);
	        if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	        setSymbolDesc(this, tag, createDesc(1, value));
	      };
	      if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	      return wrap(tag);
	    };
	    redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	      return this._k;
	    });

	    $GOPD.f = $getOwnPropertyDescriptor;
	    $DP.f = $defineProperty;
	    interopDefault(require$$3$3).f = gOPNExt.f = $getOwnPropertyNames;
	    interopDefault(require$$0$9).f = $propertyIsEnumerable;
	    interopDefault(require$$2$6).f = $getOwnPropertySymbols;

	    if (DESCRIPTORS && !interopDefault(require$$2$4)) {
	      redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	    }

	    wksExt.f = function (name) {
	      return wrap(wks(name));
	    };
	  }

	  $export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	  for (var symbols =
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), i = 0; symbols.length > i;) {
	    wks(symbols[i++]);
	  }for (var symbols = $keys(wks.store), i = 0; symbols.length > i;) {
	    wksDefine(symbols[i++]);
	  }$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	    // 19.4.2.1 Symbol.for(key)
	    'for': function _for(key) {
	      return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	    },
	    // 19.4.2.5 Symbol.keyFor(sym)
	    keyFor: function keyFor(key) {
	      if (isSymbol(key)) return keyOf(SymbolRegistry, key);
	      throw TypeError(key + ' is not a symbol!');
	    },
	    useSetter: function useSetter() {
	      setter = true;
	    },
	    useSimple: function useSimple() {
	      setter = false;
	    }
	  });

	  $export($export.S + $export.F * !USE_NATIVE, 'Object', {
	    // 19.1.2.2 Object.create(O [, Properties])
	    create: $create,
	    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	    defineProperty: $defineProperty,
	    // 19.1.2.3 Object.defineProperties(O, Properties)
	    defineProperties: $defineProperties,
	    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	    // 19.1.2.7 Object.getOwnPropertyNames(O)
	    getOwnPropertyNames: $getOwnPropertyNames,
	    // 19.1.2.8 Object.getOwnPropertySymbols(O)
	    getOwnPropertySymbols: $getOwnPropertySymbols
	  });

	  // 24.3.2 JSON.stringify(value [, replacer [, space]])
	  $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	    var S = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    // WebKit converts symbol values to JSON as null
	    // V8 throws on boxed symbols
	    return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	  })), 'JSON', {
	    stringify: function stringify(it) {
	      if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      var args = [it],
	          i = 1,
	          replacer,
	          $replacer;
	      while (arguments.length > i) {
	        args.push(arguments[i++]);
	      }replacer = args[1];
	      if (typeof replacer == 'function') $replacer = replacer;
	      if ($replacer || !isArray(replacer)) replacer = function replacer(key, value) {
	        if ($replacer) value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return _stringify.apply($JSON, args);
	    }
	  });

	  // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	  $Symbol[PROTOTYPE][TO_PRIMITIVE] || interopDefault(require$$2)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	  // 19.4.3.5 Symbol.prototype[@@toStringTag]
	  setToStringTag($Symbol, 'Symbol');
	  // 20.2.1.9 Math[@@toStringTag]
	  setToStringTag(Math, 'Math', true);
	  // 24.3.3 JSON[@@toStringTag]
	  setToStringTag(global.JSON, 'JSON', true);
	});

	interopDefault(es6_symbol);

	var es6_object_create = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2);
	  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	  $export($export.S, 'Object', { create: interopDefault(require$$6$1) });
	});

	interopDefault(es6_object_create);

	var es6_object_defineProperty = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2);
	  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	  $export($export.S + $export.F * !interopDefault(require$$1), 'Object', { defineProperty: interopDefault(require$$2$1).f });
	});

	interopDefault(es6_object_defineProperty);

	var es6_object_defineProperties = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2);
	  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	  $export($export.S + $export.F * !interopDefault(require$$1), 'Object', { defineProperties: interopDefault(require$$0$10) });
	});

	interopDefault(es6_object_defineProperties);

	var _objectSap = createCommonjsModule(function (module) {
	  // most Object methods by ES6 should accept primitives
	  var $export = interopDefault(require$$1$2),
	      core = interopDefault(require$$0),
	      fails = interopDefault(require$$1$1);
	  module.exports = function (KEY, exec) {
	    var fn = (core.Object || {})[KEY] || Object[KEY],
	        exp = {};
	    exp[KEY] = exec(fn);
	    $export($export.S + $export.F * fails(function () {
	      fn(1);
	    }), 'Object', exp);
	  };
	});

	var _objectSap$1 = interopDefault(_objectSap);

var require$$0$12 = Object.freeze({
	  default: _objectSap$1
	});

	var es6_object_getOwnPropertyDescriptor = createCommonjsModule(function (module) {
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  var toIObject = interopDefault(require$$1$7),
	      $getOwnPropertyDescriptor = interopDefault(require$$2$7).f;

	  interopDefault(require$$0$12)('getOwnPropertyDescriptor', function () {
	    return function getOwnPropertyDescriptor(it, key) {
	      return $getOwnPropertyDescriptor(toIObject(it), key);
	    };
	  });
	});

	interopDefault(es6_object_getOwnPropertyDescriptor);

	var _toObject = createCommonjsModule(function (module) {
	  // 7.1.13 ToObject(argument)
	  var defined = interopDefault(require$$4$3);
	  module.exports = function (it) {
	    return Object(defined(it));
	  };
	});

	var _toObject$1 = interopDefault(_toObject);

var require$$5$1 = Object.freeze({
	  default: _toObject$1
	});

	var _objectGpo = createCommonjsModule(function (module) {
	  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	  var has = interopDefault(require$$4),
	      toObject = interopDefault(require$$5$1),
	      IE_PROTO = interopDefault(require$$0$7)('IE_PROTO'),
	      ObjectProto = Object.prototype;

	  module.exports = Object.getPrototypeOf || function (O) {
	    O = toObject(O);
	    if (has(O, IE_PROTO)) return O[IE_PROTO];
	    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	      return O.constructor.prototype;
	    }return O instanceof Object ? ObjectProto : null;
	  };
	});

	var _objectGpo$1 = interopDefault(_objectGpo);

var require$$0$13 = Object.freeze({
	  default: _objectGpo$1
	});

	var es6_object_getPrototypeOf = createCommonjsModule(function (module) {
	  // 19.1.2.9 Object.getPrototypeOf(O)
	  var toObject = interopDefault(require$$5$1),
	      $getPrototypeOf = interopDefault(require$$0$13);

	  interopDefault(require$$0$12)('getPrototypeOf', function () {
	    return function getPrototypeOf(it) {
	      return $getPrototypeOf(toObject(it));
	    };
	  });
	});

	interopDefault(es6_object_getPrototypeOf);

	var es6_object_keys = createCommonjsModule(function (module) {
	  // 19.1.2.14 Object.keys(O)
	  var toObject = interopDefault(require$$5$1),
	      $keys = interopDefault(require$$2$5);

	  interopDefault(require$$0$12)('keys', function () {
	    return function keys(it) {
	      return $keys(toObject(it));
	    };
	  });
	});

	interopDefault(es6_object_keys);

	var es6_object_getOwnPropertyNames = createCommonjsModule(function (module) {
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  interopDefault(require$$0$12)('getOwnPropertyNames', function () {
	    return interopDefault(require$$0$11).f;
	  });
	});

	interopDefault(es6_object_getOwnPropertyNames);

	var es6_object_freeze = createCommonjsModule(function (module) {
	  // 19.1.2.5 Object.freeze(O)
	  var isObject = interopDefault(require$$0$1),
	      meta = interopDefault(require$$6).onFreeze;

	  interopDefault(require$$0$12)('freeze', function ($freeze) {
	    return function freeze(it) {
	      return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	    };
	  });
	});

	interopDefault(es6_object_freeze);

	var es6_object_seal = createCommonjsModule(function (module) {
	  // 19.1.2.17 Object.seal(O)
	  var isObject = interopDefault(require$$0$1),
	      meta = interopDefault(require$$6).onFreeze;

	  interopDefault(require$$0$12)('seal', function ($seal) {
	    return function seal(it) {
	      return $seal && isObject(it) ? $seal(meta(it)) : it;
	    };
	  });
	});

	interopDefault(es6_object_seal);

	var es6_object_preventExtensions = createCommonjsModule(function (module) {
	  // 19.1.2.15 Object.preventExtensions(O)
	  var isObject = interopDefault(require$$0$1),
	      meta = interopDefault(require$$6).onFreeze;

	  interopDefault(require$$0$12)('preventExtensions', function ($preventExtensions) {
	    return function preventExtensions(it) {
	      return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	    };
	  });
	});

	interopDefault(es6_object_preventExtensions);

	var es6_object_isFrozen = createCommonjsModule(function (module) {
	  // 19.1.2.12 Object.isFrozen(O)
	  var isObject = interopDefault(require$$0$1);

	  interopDefault(require$$0$12)('isFrozen', function ($isFrozen) {
	    return function isFrozen(it) {
	      return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	    };
	  });
	});

	interopDefault(es6_object_isFrozen);

	var es6_object_isSealed = createCommonjsModule(function (module) {
	  // 19.1.2.13 Object.isSealed(O)
	  var isObject = interopDefault(require$$0$1);

	  interopDefault(require$$0$12)('isSealed', function ($isSealed) {
	    return function isSealed(it) {
	      return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	    };
	  });
	});

	interopDefault(es6_object_isSealed);

	var es6_object_isExtensible = createCommonjsModule(function (module) {
	  // 19.1.2.11 Object.isExtensible(O)
	  var isObject = interopDefault(require$$0$1);

	  interopDefault(require$$0$12)('isExtensible', function ($isExtensible) {
	    return function isExtensible(it) {
	      return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	    };
	  });
	});

	interopDefault(es6_object_isExtensible);

	var _objectAssign = createCommonjsModule(function (module) {
	  'use strict';
	  // 19.1.2.1 Object.assign(target, source, ...)

	  var getKeys = interopDefault(require$$2$5),
	      gOPS = interopDefault(require$$2$6),
	      pIE = interopDefault(require$$0$9),
	      toObject = interopDefault(require$$5$1),
	      IObject = interopDefault(require$$1$8),
	      $assign = Object.assign;

	  // should work with symbols and should have deterministic property order (V8 bug)
	  module.exports = !$assign || interopDefault(require$$1$1)(function () {
	    var A = {},
	        B = {},
	        S = Symbol(),
	        K = 'abcdefghijklmnopqrst';
	    A[S] = 7;
	    K.split('').forEach(function (k) {
	      B[k] = k;
	    });
	    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	  }) ? function assign(target, source) {
	    // eslint-disable-line no-unused-vars
	    var T = toObject(target),
	        aLen = arguments.length,
	        index = 1,
	        getSymbols = gOPS.f,
	        isEnum = pIE.f;
	    while (aLen > index) {
	      var S = IObject(arguments[index++]),
	          keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
	          length = keys.length,
	          j = 0,
	          key;
	      while (length > j) {
	        if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	      }
	    }return T;
	  } : $assign;
	});

	var _objectAssign$1 = interopDefault(_objectAssign);

var require$$3$4 = Object.freeze({
	  default: _objectAssign$1
	});

	var es6_object_assign = createCommonjsModule(function (module) {
	  // 19.1.3.1 Object.assign(target, source)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S + $export.F, 'Object', { assign: interopDefault(require$$3$4) });
	});

	interopDefault(es6_object_assign);

	var _sameValue = createCommonjsModule(function (module) {
	  // 7.2.9 SameValue(x, y)
	  module.exports = Object.is || function is(x, y) {
	    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	  };
	});

	var _sameValue$1 = interopDefault(_sameValue);

var require$$21 = Object.freeze({
	  default: _sameValue$1
	});

	var es6_object_is = createCommonjsModule(function (module) {
	  // 19.1.3.10 Object.is(value1, value2)
	  var $export = interopDefault(require$$1$2);
	  $export($export.S, 'Object', { is: interopDefault(require$$21) });
	});

	interopDefault(es6_object_is);

	var _setProto = createCommonjsModule(function (module) {
	  // Works with __proto__ only. Old v8 can't work with null proto objects.
	  /* eslint-disable no-proto */
	  var isObject = interopDefault(require$$0$1),
	      anObject = interopDefault(require$$5);
	  var check = function check(O, proto) {
	    anObject(O);
	    if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	  };
	  module.exports = {
	    set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = interopDefault(require$$31)(Function.call, interopDefault(require$$2$7).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) {
	        buggy = true;
	      }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	    check: check
	  };
	});

	var _setProto$1 = interopDefault(_setProto);
	var set$1 = _setProto.set;
	var check = _setProto.check;

var require$$0$14 = Object.freeze({
	  default: _setProto$1,
	  set: set$1,
	  check: check
	});

	var es6_object_setPrototypeOf = createCommonjsModule(function (module) {
	  // 19.1.3.19 Object.setPrototypeOf(O, proto)
	  var $export = interopDefault(require$$1$2);
	  $export($export.S, 'Object', { setPrototypeOf: interopDefault(require$$0$14).set });
	});

	interopDefault(es6_object_setPrototypeOf);

	var _classof = createCommonjsModule(function (module) {
	  // getting tag from 19.1.3.6 Object.prototype.toString()
	  var cof = interopDefault(require$$0$6),
	      TAG = interopDefault(require$$0$4)('toStringTag')
	  // ES3 wrong here
	  ,
	      ARG = cof(function () {
	    return arguments;
	  }()) == 'Arguments';

	  // fallback for IE11 Script Access Denied error
	  var tryGet = function tryGet(it, key) {
	    try {
	      return it[key];
	    } catch (e) {/* empty */}
	  };

	  module.exports = function (it) {
	    var O, T, B;
	    return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	  };
	});

	var _classof$1 = interopDefault(_classof);

var require$$1$11 = Object.freeze({
	  default: _classof$1
	});

	var es6_object_toString = createCommonjsModule(function (module) {
	  'use strict';
	  // 19.1.3.6 Object.prototype.toString()

	  var classof = interopDefault(require$$1$11),
	      test = {};
	  test[interopDefault(require$$0$4)('toStringTag')] = 'z';
	  if (test + '' != '[object z]') {
	    interopDefault(require$$4$2)(Object.prototype, 'toString', function toString() {
	      return '[object ' + classof(this) + ']';
	    }, true);
	  }
	});

	interopDefault(es6_object_toString);

	var _invoke = createCommonjsModule(function (module) {
	                  // fast apply, http://jsperf.lnkit.com/fast-apply/5
	                  module.exports = function (fn, args, that) {
	                                    var un = that === undefined;
	                                    switch (args.length) {
	                                                      case 0:
	                                                                        return un ? fn() : fn.call(that);
	                                                      case 1:
	                                                                        return un ? fn(args[0]) : fn.call(that, args[0]);
	                                                      case 2:
	                                                                        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
	                                                      case 3:
	                                                                        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
	                                                      case 4:
	                                                                        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
	                                    }return fn.apply(that, args);
	                  };
	});

	var _invoke$1 = interopDefault(_invoke);

var require$$1$13 = Object.freeze({
	                  default: _invoke$1
	});

	var _bind = createCommonjsModule(function (module) {
	  'use strict';

	  var aFunction = interopDefault(require$$0$2),
	      isObject = interopDefault(require$$0$1),
	      invoke = interopDefault(require$$1$13),
	      arraySlice = [].slice,
	      factories = {};

	  var construct = function construct(F, len, args) {
	    if (!(len in factories)) {
	      for (var n = [], i = 0; i < len; i++) {
	        n[i] = 'a[' + i + ']';
	      }factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	    }return factories[len](F, args);
	  };

	  module.exports = Function.bind || function bind(that /*, args... */) {
	    var fn = aFunction(this),
	        partArgs = arraySlice.call(arguments, 1);
	    var bound = function bound() /* args... */{
	      var args = partArgs.concat(arraySlice.call(arguments));
	      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	    };
	    if (isObject(fn.prototype)) bound.prototype = fn.prototype;
	    return bound;
	  };
	});

	var _bind$1 = interopDefault(_bind);

var require$$1$12 = Object.freeze({
	  default: _bind$1
	});

	var es6_function_bind = createCommonjsModule(function (module) {
	  // 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	  var $export = interopDefault(require$$1$2);

	  $export($export.P, 'Function', { bind: interopDefault(require$$1$12) });
	});

	interopDefault(es6_function_bind);

	var es6_function_name = createCommonjsModule(function (module) {
	  var dP = interopDefault(require$$2$1).f,
	      createDesc = interopDefault(require$$2$3),
	      has = interopDefault(require$$4),
	      FProto = Function.prototype,
	      nameRE = /^\s*function ([^ (]*)/,
	      NAME = 'name';

	  var isExtensible = Object.isExtensible || function () {
	    return true;
	  };

	  // 19.2.4.2 name
	  NAME in FProto || interopDefault(require$$1) && dP(FProto, NAME, {
	    configurable: true,
	    get: function get() {
	      try {
	        var that = this,
	            name = ('' + that).match(nameRE)[1];
	        has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
	        return name;
	      } catch (e) {
	        return '';
	      }
	    }
	  });
	});

	interopDefault(es6_function_name);

	var es6_function_hasInstance = createCommonjsModule(function (module) {
	  'use strict';

	  var isObject = interopDefault(require$$0$1),
	      getPrototypeOf = interopDefault(require$$0$13),
	      HAS_INSTANCE = interopDefault(require$$0$4)('hasInstance'),
	      FunctionProto = Function.prototype;
	  // 19.2.3.6 Function.prototype[@@hasInstance](V)
	  if (!(HAS_INSTANCE in FunctionProto)) interopDefault(require$$2$1).f(FunctionProto, HAS_INSTANCE, { value: function value(O) {
	      if (typeof this != 'function' || !isObject(O)) return false;
	      if (!isObject(this.prototype)) return O instanceof this;
	      // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	      while (O = getPrototypeOf(O)) {
	        if (this.prototype === O) return true;
	      }return false;
	    } });
	});

	interopDefault(es6_function_hasInstance);

	var _stringWs = createCommonjsModule(function (module) {
	  module.exports = '\t\n\u000b\f\r   ᠎    ' + '         　\u2028\u2029﻿';
	});

	var _stringWs$1 = interopDefault(_stringWs);

var require$$0$17 = Object.freeze({
	  default: _stringWs$1
	});

	var _stringTrim = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      defined = interopDefault(require$$4$3),
	      fails = interopDefault(require$$1$1),
	      spaces = interopDefault(require$$0$17),
	      space = '[' + spaces + ']',
	      non = '​',
	      ltrim = RegExp('^' + space + space + '*'),
	      rtrim = RegExp(space + space + '*$');

	  var exporter = function exporter(KEY, exec, ALIAS) {
	    var exp = {};
	    var FORCE = fails(function () {
	      return !!spaces[KEY]() || non[KEY]() != non;
	    });
	    var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	    if (ALIAS) exp[ALIAS] = fn;
	    $export($export.P + $export.F * FORCE, 'String', exp);
	  };

	  // 1 -> String#trimLeft
	  // 2 -> String#trimRight
	  // 3 -> String#trim
	  var trim = exporter.trim = function (string, TYPE) {
	    string = String(defined(string));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };

	  module.exports = exporter;
	});

	var _stringTrim$1 = interopDefault(_stringTrim);

var require$$0$16 = Object.freeze({
	  default: _stringTrim$1
	});

	var _parseInt = createCommonjsModule(function (module) {
	  var $parseInt = interopDefault(require$$3).parseInt,
	      $trim = interopDefault(require$$0$16).trim,
	      ws = interopDefault(require$$0$17),
	      hex = /^[\-+]?0[xX]/;

	  module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
	    var string = $trim(String(str), 3);
	    return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
	  } : $parseInt;
	});

	var _parseInt$1 = interopDefault(_parseInt);

var require$$0$15 = Object.freeze({
	  default: _parseInt$1
	});

	var es6_parseInt = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      $parseInt = interopDefault(require$$0$15);
	  // 18.2.5 parseInt(string, radix)
	  $export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });
	});

	interopDefault(es6_parseInt);

	var _parseFloat = createCommonjsModule(function (module) {
	  var $parseFloat = interopDefault(require$$3).parseFloat,
	      $trim = interopDefault(require$$0$16).trim;

	  module.exports = 1 / $parseFloat(interopDefault(require$$0$17) + '-0') !== -Infinity ? function parseFloat(str) {
	    var string = $trim(String(str), 3),
	        result = $parseFloat(string);
	    return result === 0 && string.charAt(0) == '-' ? -0 : result;
	  } : $parseFloat;
	});

	var _parseFloat$1 = interopDefault(_parseFloat);

var require$$0$18 = Object.freeze({
	  default: _parseFloat$1
	});

	var es6_parseFloat = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      $parseFloat = interopDefault(require$$0$18);
	  // 18.2.4 parseFloat(string)
	  $export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });
	});

	interopDefault(es6_parseFloat);

	var _inheritIfRequired = createCommonjsModule(function (module) {
	  var isObject = interopDefault(require$$0$1),
	      setPrototypeOf = interopDefault(require$$0$14).set;
	  module.exports = function (that, target, C) {
	    var P,
	        S = target.constructor;
	    if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
	      setPrototypeOf(that, P);
	    }return that;
	  };
	});

	var _inheritIfRequired$1 = interopDefault(_inheritIfRequired);

var require$$0$19 = Object.freeze({
	  default: _inheritIfRequired$1
	});

	var es6_number_constructor = createCommonjsModule(function (module) {
	  'use strict';

	  var global = interopDefault(require$$3),
	      has = interopDefault(require$$4),
	      cof = interopDefault(require$$0$6),
	      inheritIfRequired = interopDefault(require$$0$19),
	      toPrimitive = interopDefault(require$$4$1),
	      fails = interopDefault(require$$1$1),
	      gOPN = interopDefault(require$$3$3).f,
	      gOPD = interopDefault(require$$2$7).f,
	      dP = interopDefault(require$$2$1).f,
	      $trim = interopDefault(require$$0$16).trim,
	      NUMBER = 'Number',
	      $Number = global[NUMBER],
	      Base = $Number,
	      proto = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  ,
	      BROKEN_COF = cof(interopDefault(require$$6$1)(proto)) == NUMBER,
	      TRIM = 'trim' in String.prototype;

	  // 7.1.3 ToNumber(argument)
	  var toNumber = function toNumber(argument) {
	    var it = toPrimitive(argument, false);
	    if (typeof it == 'string' && it.length > 2) {
	      it = TRIM ? it.trim() : $trim(it, 3);
	      var first = it.charCodeAt(0),
	          third,
	          radix,
	          maxCode;
	      if (first === 43 || first === 45) {
	        third = it.charCodeAt(2);
	        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	      } else if (first === 48) {
	        switch (it.charCodeAt(1)) {
	          case 66:case 98:
	            radix = 2;maxCode = 49;break; // fast equal /^0b[01]+$/i
	          case 79:case 111:
	            radix = 8;maxCode = 55;break; // fast equal /^0o[0-7]+$/i
	          default:
	            return +it;
	        }
	        for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	          code = digits.charCodeAt(i);
	          // parseInt parses a string to a first unavailable symbol
	          // but ToNumber should return NaN if a string contains unavailable symbols
	          if (code < 48 || code > maxCode) return NaN;
	        }return parseInt(digits, radix);
	      }
	    }return +it;
	  };

	  if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	    $Number = function Number(value) {
	      var it = arguments.length < 1 ? 0 : value,
	          that = this;
	      return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function () {
	        proto.valueOf.call(that);
	      }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	    };
	    for (var keys = interopDefault(require$$1) ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
	      if (has(Base, key = keys[j]) && !has($Number, key)) {
	        dP($Number, key, gOPD(Base, key));
	      }
	    }
	    $Number.prototype = proto;
	    proto.constructor = $Number;
	    interopDefault(require$$4$2)(global, NUMBER, $Number);
	  }
	});

	interopDefault(es6_number_constructor);

	var _aNumberValue = createCommonjsModule(function (module) {
	  var cof = interopDefault(require$$0$6);
	  module.exports = function (it, msg) {
	    if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
	    return +it;
	  };
	});

	var _aNumberValue$1 = interopDefault(_aNumberValue);

var require$$0$20 = Object.freeze({
	  default: _aNumberValue$1
	});

	var _stringRepeat = createCommonjsModule(function (module) {
	  'use strict';

	  var toInteger = interopDefault(require$$26),
	      defined = interopDefault(require$$4$3);

	  module.exports = function repeat(count) {
	    var str = String(defined(this)),
	        res = '',
	        n = toInteger(count);
	    if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
	    for (; n > 0; (n >>>= 1) && (str += str)) {
	      if (n & 1) res += str;
	    }return res;
	  };
	});

	var _stringRepeat$1 = interopDefault(_stringRepeat);

var require$$1$14 = Object.freeze({
	  default: _stringRepeat$1
	});

	var es6_number_toFixed = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toInteger = interopDefault(require$$26),
	      aNumberValue = interopDefault(require$$0$20),
	      repeat = interopDefault(require$$1$14),
	      $toFixed = 1..toFixed,
	      floor = Math.floor,
	      data = [0, 0, 0, 0, 0, 0],
	      ERROR = 'Number.toFixed: incorrect invocation!',
	      ZERO = '0';

	  var multiply = function multiply(n, c) {
	    var i = -1,
	        c2 = c;
	    while (++i < 6) {
	      c2 += n * data[i];
	      data[i] = c2 % 1e7;
	      c2 = floor(c2 / 1e7);
	    }
	  };
	  var divide = function divide(n) {
	    var i = 6,
	        c = 0;
	    while (--i >= 0) {
	      c += data[i];
	      data[i] = floor(c / n);
	      c = c % n * 1e7;
	    }
	  };
	  var numToString = function numToString() {
	    var i = 6,
	        s = '';
	    while (--i >= 0) {
	      if (s !== '' || i === 0 || data[i] !== 0) {
	        var t = String(data[i]);
	        s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
	      }
	    }return s;
	  };
	  var pow = function pow(x, n, acc) {
	    return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	  };
	  var log = function log(x) {
	    var n = 0,
	        x2 = x;
	    while (x2 >= 4096) {
	      n += 12;
	      x2 /= 4096;
	    }
	    while (x2 >= 2) {
	      n += 1;
	      x2 /= 2;
	    }return n;
	  };

	  $export($export.P + $export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128..toFixed(0) !== '1000000000000000128') || !interopDefault(require$$1$1)(function () {
	    // V8 ~ Android 4.3-
	    $toFixed.call({});
	  })), 'Number', {
	    toFixed: function toFixed(fractionDigits) {
	      var x = aNumberValue(this, ERROR),
	          f = toInteger(fractionDigits),
	          s = '',
	          m = ZERO,
	          e,
	          z,
	          j,
	          k;
	      if (f < 0 || f > 20) throw RangeError(ERROR);
	      if (x != x) return 'NaN';
	      if (x <= -1e21 || x >= 1e21) return String(x);
	      if (x < 0) {
	        s = '-';
	        x = -x;
	      }
	      if (x > 1e-21) {
	        e = log(x * pow(2, 69, 1)) - 69;
	        z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	        z *= 0x10000000000000;
	        e = 52 - e;
	        if (e > 0) {
	          multiply(0, z);
	          j = f;
	          while (j >= 7) {
	            multiply(1e7, 0);
	            j -= 7;
	          }
	          multiply(pow(10, j, 1), 0);
	          j = e - 1;
	          while (j >= 23) {
	            divide(1 << 23);
	            j -= 23;
	          }
	          divide(1 << j);
	          multiply(1, 1);
	          divide(2);
	          m = numToString();
	        } else {
	          multiply(0, z);
	          multiply(1 << -e, 0);
	          m = numToString() + repeat.call(ZERO, f);
	        }
	      }
	      if (f > 0) {
	        k = m.length;
	        m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	      } else {
	        m = s + m;
	      }return m;
	    }
	  });
	});

	interopDefault(es6_number_toFixed);

	var es6_number_toPrecision = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $fails = interopDefault(require$$1$1),
	      aNumberValue = interopDefault(require$$0$20),
	      $toPrecision = 1..toPrecision;

	  $export($export.P + $export.F * ($fails(function () {
	    // IE7-
	    return $toPrecision.call(1, undefined) !== '1';
	  }) || !$fails(function () {
	    // V8 ~ Android 4.3-
	    $toPrecision.call({});
	  })), 'Number', {
	    toPrecision: function toPrecision(precision) {
	      var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	      return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
	    }
	  });
	});

	interopDefault(es6_number_toPrecision);

	var es6_number_epsilon = createCommonjsModule(function (module) {
	  // 20.1.2.1 Number.EPSILON
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });
	});

	interopDefault(es6_number_epsilon);

	var es6_number_isFinite = createCommonjsModule(function (module) {
	  // 20.1.2.2 Number.isFinite(number)
	  var $export = interopDefault(require$$1$2),
	      _isFinite = interopDefault(require$$3).isFinite;

	  $export($export.S, 'Number', {
	    isFinite: function isFinite(it) {
	      return typeof it == 'number' && _isFinite(it);
	    }
	  });
	});

	interopDefault(es6_number_isFinite);

	var _isInteger = createCommonjsModule(function (module) {
	  // 20.1.2.3 Number.isInteger(number)
	  var isObject = interopDefault(require$$0$1),
	      floor = Math.floor;
	  module.exports = function isInteger(it) {
	    return !isObject(it) && isFinite(it) && floor(it) === it;
	  };
	});

	var _isInteger$1 = interopDefault(_isInteger);

var require$$0$21 = Object.freeze({
	  default: _isInteger$1
	});

	var es6_number_isInteger = createCommonjsModule(function (module) {
	  // 20.1.2.3 Number.isInteger(number)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Number', { isInteger: interopDefault(require$$0$21) });
	});

	interopDefault(es6_number_isInteger);

	var es6_number_isNan = createCommonjsModule(function (module) {
	  // 20.1.2.4 Number.isNaN(number)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Number', {
	    isNaN: function isNaN(number) {
	      return number != number;
	    }
	  });
	});

	interopDefault(es6_number_isNan);

	var es6_number_isSafeInteger = createCommonjsModule(function (module) {
	  // 20.1.2.5 Number.isSafeInteger(number)
	  var $export = interopDefault(require$$1$2),
	      isInteger = interopDefault(require$$0$21),
	      abs = Math.abs;

	  $export($export.S, 'Number', {
	    isSafeInteger: function isSafeInteger(number) {
	      return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	    }
	  });
	});

	interopDefault(es6_number_isSafeInteger);

	var es6_number_maxSafeInteger = createCommonjsModule(function (module) {
	  // 20.1.2.6 Number.MAX_SAFE_INTEGER
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });
	});

	interopDefault(es6_number_maxSafeInteger);

	var es6_number_minSafeInteger = createCommonjsModule(function (module) {
	  // 20.1.2.10 Number.MIN_SAFE_INTEGER
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });
	});

	interopDefault(es6_number_minSafeInteger);

	var es6_number_parseFloat = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      $parseFloat = interopDefault(require$$0$18);
	  // 20.1.2.12 Number.parseFloat(string)
	  $export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });
	});

	interopDefault(es6_number_parseFloat);

	var es6_number_parseInt = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      $parseInt = interopDefault(require$$0$15);
	  // 20.1.2.13 Number.parseInt(string, radix)
	  $export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });
	});

	interopDefault(es6_number_parseInt);

	var _mathLog1p = createCommonjsModule(function (module) {
	  // 20.2.2.20 Math.log1p(x)
	  module.exports = Math.log1p || function log1p(x) {
	    return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	  };
	});

	var _mathLog1p$1 = interopDefault(_mathLog1p);

var require$$0$22 = Object.freeze({
	  default: _mathLog1p$1
	});

	var es6_math_acosh = createCommonjsModule(function (module) {
	  // 20.2.2.3 Math.acosh(x)
	  var $export = interopDefault(require$$1$2),
	      log1p = interopDefault(require$$0$22),
	      sqrt = Math.sqrt,
	      $acosh = Math.acosh;

	  $export($export.S + $export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
	  && $acosh(Infinity) == Infinity), 'Math', {
	    acosh: function acosh(x) {
	      return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	    }
	  });
	});

	interopDefault(es6_math_acosh);

	var es6_math_asinh = createCommonjsModule(function (module) {
	  // 20.2.2.5 Math.asinh(x)
	  var $export = interopDefault(require$$1$2),
	      $asinh = Math.asinh;

	  function asinh(x) {
	    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	  }

	  // Tor Browser bug: Math.asinh(0) -> -0 
	  $export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });
	});

	interopDefault(es6_math_asinh);

	var es6_math_atanh = createCommonjsModule(function (module) {
	  // 20.2.2.7 Math.atanh(x)
	  var $export = interopDefault(require$$1$2),
	      $atanh = Math.atanh;

	  // Tor Browser bug: Math.atanh(-0) -> 0 
	  $export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	    atanh: function atanh(x) {
	      return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	    }
	  });
	});

	interopDefault(es6_math_atanh);

	var _mathSign = createCommonjsModule(function (module) {
	  // 20.2.2.28 Math.sign(x)
	  module.exports = Math.sign || function sign(x) {
	    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	  };
	});

	var _mathSign$1 = interopDefault(_mathSign);

var require$$0$23 = Object.freeze({
	  default: _mathSign$1
	});

	var es6_math_cbrt = createCommonjsModule(function (module) {
	  // 20.2.2.9 Math.cbrt(x)
	  var $export = interopDefault(require$$1$2),
	      sign = interopDefault(require$$0$23);

	  $export($export.S, 'Math', {
	    cbrt: function cbrt(x) {
	      return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	    }
	  });
	});

	interopDefault(es6_math_cbrt);

	var es6_math_clz32 = createCommonjsModule(function (module) {
	  // 20.2.2.11 Math.clz32(x)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    clz32: function clz32(x) {
	      return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	    }
	  });
	});

	interopDefault(es6_math_clz32);

	var es6_math_cosh = createCommonjsModule(function (module) {
	  // 20.2.2.12 Math.cosh(x)
	  var $export = interopDefault(require$$1$2),
	      exp = Math.exp;

	  $export($export.S, 'Math', {
	    cosh: function cosh(x) {
	      return (exp(x = +x) + exp(-x)) / 2;
	    }
	  });
	});

	interopDefault(es6_math_cosh);

	var _mathExpm1 = createCommonjsModule(function (module) {
	  // 20.2.2.14 Math.expm1(x)
	  var $expm1 = Math.expm1;
	  module.exports = !$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17 ? function expm1(x) {
	    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	  } : $expm1;
	});

	var _mathExpm1$1 = interopDefault(_mathExpm1);

var require$$0$24 = Object.freeze({
	  default: _mathExpm1$1
	});

	var es6_math_expm1 = createCommonjsModule(function (module) {
	  // 20.2.2.14 Math.expm1(x)
	  var $export = interopDefault(require$$1$2),
	      $expm1 = interopDefault(require$$0$24);

	  $export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });
	});

	interopDefault(es6_math_expm1);

	var es6_math_fround = createCommonjsModule(function (module) {
	  // 20.2.2.16 Math.fround(x)
	  var $export = interopDefault(require$$1$2),
	      sign = interopDefault(require$$0$23),
	      pow = Math.pow,
	      EPSILON = pow(2, -52),
	      EPSILON32 = pow(2, -23),
	      MAX32 = pow(2, 127) * (2 - EPSILON32),
	      MIN32 = pow(2, -126);

	  var roundTiesToEven = function roundTiesToEven(n) {
	    return n + 1 / EPSILON - 1 / EPSILON;
	  };

	  $export($export.S, 'Math', {
	    fround: function fround(x) {
	      var $abs = Math.abs(x),
	          $sign = sign(x),
	          a,
	          result;
	      if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	      a = (1 + EPSILON32 / EPSILON) * $abs;
	      result = a - (a - $abs);
	      if (result > MAX32 || result != result) return $sign * Infinity;
	      return $sign * result;
	    }
	  });
	});

	interopDefault(es6_math_fround);

	var es6_math_hypot = createCommonjsModule(function (module) {
	  // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	  var $export = interopDefault(require$$1$2),
	      abs = Math.abs;

	  $export($export.S, 'Math', {
	    hypot: function hypot(value1, value2) {
	      // eslint-disable-line no-unused-vars
	      var sum = 0,
	          i = 0,
	          aLen = arguments.length,
	          larg = 0,
	          arg,
	          div;
	      while (i < aLen) {
	        arg = abs(arguments[i++]);
	        if (larg < arg) {
	          div = larg / arg;
	          sum = sum * div * div + 1;
	          larg = arg;
	        } else if (arg > 0) {
	          div = arg / larg;
	          sum += div * div;
	        } else sum += arg;
	      }
	      return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	    }
	  });
	});

	interopDefault(es6_math_hypot);

	var es6_math_imul = createCommonjsModule(function (module) {
	  // 20.2.2.18 Math.imul(x, y)
	  var $export = interopDefault(require$$1$2),
	      $imul = Math.imul;

	  // some WebKit versions fails with big numbers, some has wrong arity
	  $export($export.S + $export.F * interopDefault(require$$1$1)(function () {
	    return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	  }), 'Math', {
	    imul: function imul(x, y) {
	      var UINT16 = 0xffff,
	          xn = +x,
	          yn = +y,
	          xl = UINT16 & xn,
	          yl = UINT16 & yn;
	      return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	    }
	  });
	});

	interopDefault(es6_math_imul);

	var es6_math_log10 = createCommonjsModule(function (module) {
	  // 20.2.2.21 Math.log10(x)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    log10: function log10(x) {
	      return Math.log(x) / Math.LN10;
	    }
	  });
	});

	interopDefault(es6_math_log10);

	var es6_math_log1p = createCommonjsModule(function (module) {
	  // 20.2.2.20 Math.log1p(x)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', { log1p: interopDefault(require$$0$22) });
	});

	interopDefault(es6_math_log1p);

	var es6_math_log2 = createCommonjsModule(function (module) {
	  // 20.2.2.22 Math.log2(x)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    log2: function log2(x) {
	      return Math.log(x) / Math.LN2;
	    }
	  });
	});

	interopDefault(es6_math_log2);

	var es6_math_sign = createCommonjsModule(function (module) {
	  // 20.2.2.28 Math.sign(x)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', { sign: interopDefault(require$$0$23) });
	});

	interopDefault(es6_math_sign);

	var es6_math_sinh = createCommonjsModule(function (module) {
	  // 20.2.2.30 Math.sinh(x)
	  var $export = interopDefault(require$$1$2),
	      expm1 = interopDefault(require$$0$24),
	      exp = Math.exp;

	  // V8 near Chromium 38 has a problem with very small numbers
	  $export($export.S + $export.F * interopDefault(require$$1$1)(function () {
	    return !Math.sinh(-2e-17) != -2e-17;
	  }), 'Math', {
	    sinh: function sinh(x) {
	      return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	    }
	  });
	});

	interopDefault(es6_math_sinh);

	var es6_math_tanh = createCommonjsModule(function (module) {
	  // 20.2.2.33 Math.tanh(x)
	  var $export = interopDefault(require$$1$2),
	      expm1 = interopDefault(require$$0$24),
	      exp = Math.exp;

	  $export($export.S, 'Math', {
	    tanh: function tanh(x) {
	      var a = expm1(x = +x),
	          b = expm1(-x);
	      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	    }
	  });
	});

	interopDefault(es6_math_tanh);

	var es6_math_trunc = createCommonjsModule(function (module) {
	  // 20.2.2.34 Math.trunc(x)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    trunc: function trunc(it) {
	      return (it > 0 ? Math.floor : Math.ceil)(it);
	    }
	  });
	});

	interopDefault(es6_math_trunc);

	var es6_string_fromCodePoint = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      toIndex = interopDefault(require$$24),
	      fromCharCode = String.fromCharCode,
	      $fromCodePoint = String.fromCodePoint;

	  // length should be 1, old FF problem
	  $export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	    // 21.1.2.2 String.fromCodePoint(...codePoints)
	    fromCodePoint: function fromCodePoint(x) {
	      // eslint-disable-line no-unused-vars
	      var res = [],
	          aLen = arguments.length,
	          i = 0,
	          code;
	      while (aLen > i) {
	        code = +arguments[i++];
	        if (toIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	        res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
	      }return res.join('');
	    }
	  });
	});

	interopDefault(es6_string_fromCodePoint);

	var es6_string_raw = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      toIObject = interopDefault(require$$1$7),
	      toLength = interopDefault(require$$3$1);

	  $export($export.S, 'String', {
	    // 21.1.2.4 String.raw(callSite, ...substitutions)
	    raw: function raw(callSite) {
	      var tpl = toIObject(callSite.raw),
	          len = toLength(tpl.length),
	          aLen = arguments.length,
	          res = [],
	          i = 0;
	      while (len > i) {
	        res.push(String(tpl[i++]));
	        if (i < aLen) res.push(String(arguments[i]));
	      }return res.join('');
	    }
	  });
	});

	interopDefault(es6_string_raw);

	var es6_string_trim = createCommonjsModule(function (module) {
	  'use strict';
	  // 21.1.3.25 String.prototype.trim()

	  interopDefault(require$$0$16)('trim', function ($trim) {
	    return function trim() {
	      return $trim(this, 3);
	    };
	  });
	});

	interopDefault(es6_string_trim);

	var _stringAt = createCommonjsModule(function (module) {
	  var toInteger = interopDefault(require$$26),
	      defined = interopDefault(require$$4$3);
	  // true  -> String#at
	  // false -> String#codePointAt
	  module.exports = function (TO_STRING) {
	    return function (that, pos) {
	      var s = String(defined(that)),
	          i = toInteger(pos),
	          l = s.length,
	          a,
	          b;
	      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	      a = s.charCodeAt(i);
	      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	    };
	  };
	});

	var _stringAt$1 = interopDefault(_stringAt);

var require$$0$25 = Object.freeze({
	  default: _stringAt$1
	});

	var _iterators = createCommonjsModule(function (module) {
	  module.exports = {};
	});

	var _iterators$1 = interopDefault(_iterators);

var require$$1$15 = Object.freeze({
	  default: _iterators$1
	});

	var _iterCreate = createCommonjsModule(function (module) {
	  'use strict';

	  var create = interopDefault(require$$6$1),
	      descriptor = interopDefault(require$$2$3),
	      setToStringTag = interopDefault(require$$0$3),
	      IteratorPrototype = {};

	  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	  interopDefault(require$$2)(IteratorPrototype, interopDefault(require$$0$4)('iterator'), function () {
	    return this;
	  });

	  module.exports = function (Constructor, NAME, next) {
	    Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	    setToStringTag(Constructor, NAME + ' Iterator');
	  };
	});

	var _iterCreate$1 = interopDefault(_iterCreate);

var require$$0$26 = Object.freeze({
	  default: _iterCreate$1
	});

	var _iterDefine = createCommonjsModule(function (module) {
	  'use strict';

	  var LIBRARY = interopDefault(require$$2$4),
	      $export = interopDefault(require$$1$2),
	      redefine = interopDefault(require$$4$2),
	      hide = interopDefault(require$$2),
	      has = interopDefault(require$$4),
	      Iterators = interopDefault(require$$1$15),
	      $iterCreate = interopDefault(require$$0$26),
	      setToStringTag = interopDefault(require$$0$3),
	      getPrototypeOf = interopDefault(require$$0$13),
	      ITERATOR = interopDefault(require$$0$4)('iterator'),
	      BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  ,
	      FF_ITERATOR = '@@iterator',
	      KEYS = 'keys',
	      VALUES = 'values';

	  var returnThis = function returnThis() {
	    return this;
	  };

	  module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	    $iterCreate(Constructor, NAME, next);
	    var getMethod = function getMethod(kind) {
	      if (!BUGGY && kind in proto) return proto[kind];
	      switch (kind) {
	        case KEYS:
	          return function keys() {
	            return new Constructor(this, kind);
	          };
	        case VALUES:
	          return function values() {
	            return new Constructor(this, kind);
	          };
	      }return function entries() {
	        return new Constructor(this, kind);
	      };
	    };
	    var TAG = NAME + ' Iterator',
	        DEF_VALUES = DEFAULT == VALUES,
	        VALUES_BUG = false,
	        proto = Base.prototype,
	        $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
	        $default = $native || getMethod(DEFAULT),
	        $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
	        $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
	        methods,
	        key,
	        IteratorPrototype;
	    // Fix native
	    if ($anyNative) {
	      IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	      if (IteratorPrototype !== Object.prototype) {
	        // Set @@toStringTag to native iterators
	        setToStringTag(IteratorPrototype, TAG, true);
	        // fix for some old engines
	        if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	      }
	    }
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if (DEF_VALUES && $native && $native.name !== VALUES) {
	      VALUES_BUG = true;
	      $default = function values() {
	        return $native.call(this);
	      };
	    }
	    // Define iterator
	    if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	      hide(proto, ITERATOR, $default);
	    }
	    // Plug for library
	    Iterators[NAME] = $default;
	    Iterators[TAG] = returnThis;
	    if (DEFAULT) {
	      methods = {
	        values: DEF_VALUES ? $default : getMethod(VALUES),
	        keys: IS_SET ? $default : getMethod(KEYS),
	        entries: $entries
	      };
	      if (FORCED) for (key in methods) {
	        if (!(key in proto)) redefine(proto, key, methods[key]);
	      } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	    }
	    return methods;
	  };
	});

	var _iterDefine$1 = interopDefault(_iterDefine);

var require$$4$4 = Object.freeze({
	  default: _iterDefine$1
	});

	var es6_string_iterator = createCommonjsModule(function (module) {
	  'use strict';

	  var $at = interopDefault(require$$0$25)(true);

	  // 21.1.3.27 String.prototype[@@iterator]()
	  interopDefault(require$$4$4)(String, 'String', function (iterated) {
	    this._t = String(iterated); // target
	    this._i = 0; // next index
	    // 21.1.5.2.1 %StringIteratorPrototype%.next()
	  }, function () {
	    var O = this._t,
	        index = this._i,
	        point;
	    if (index >= O.length) return { value: undefined, done: true };
	    point = $at(O, index);
	    this._i += point.length;
	    return { value: point, done: false };
	  });
	});

	interopDefault(es6_string_iterator);

	var es6_string_codePointAt = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $at = interopDefault(require$$0$25)(false);
	  $export($export.P, 'String', {
	    // 21.1.3.3 String.prototype.codePointAt(pos)
	    codePointAt: function codePointAt(pos) {
	      return $at(this, pos);
	    }
	  });
	});

	interopDefault(es6_string_codePointAt);

	var _isRegexp = createCommonjsModule(function (module) {
	  // 7.2.8 IsRegExp(argument)
	  var isObject = interopDefault(require$$0$1),
	      cof = interopDefault(require$$0$6),
	      MATCH = interopDefault(require$$0$4)('match');
	  module.exports = function (it) {
	    var isRegExp;
	    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	  };
	});

	var _isRegexp$1 = interopDefault(_isRegexp);

var require$$2$8 = Object.freeze({
	  default: _isRegexp$1
	});

	var _stringContext = createCommonjsModule(function (module) {
	  // helper for String#{startsWith, endsWith, includes}
	  var isRegExp = interopDefault(require$$2$8),
	      defined = interopDefault(require$$4$3);

	  module.exports = function (that, searchString, NAME) {
	    if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	    return String(defined(that));
	  };
	});

	var _stringContext$1 = interopDefault(_stringContext);

var require$$1$16 = Object.freeze({
	  default: _stringContext$1
	});

	var _failsIsRegexp = createCommonjsModule(function (module) {
	  var MATCH = interopDefault(require$$0$4)('match');
	  module.exports = function (KEY) {
	    var re = /./;
	    try {
	      '/./'[KEY](re);
	    } catch (e) {
	      try {
	        re[MATCH] = false;
	        return !'/./'[KEY](re);
	      } catch (f) {/* empty */}
	    }return true;
	  };
	});

	var _failsIsRegexp$1 = interopDefault(_failsIsRegexp);

var require$$0$27 = Object.freeze({
	  default: _failsIsRegexp$1
	});

	var es6_string_endsWith = createCommonjsModule(function (module) {
	  // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toLength = interopDefault(require$$3$1),
	      context = interopDefault(require$$1$16),
	      ENDS_WITH = 'endsWith',
	      $endsWith = ''[ENDS_WITH];

	  $export($export.P + $export.F * interopDefault(require$$0$27)(ENDS_WITH), 'String', {
	    endsWith: function endsWith(searchString /*, endPosition = @length */) {
	      var that = context(this, searchString, ENDS_WITH),
	          endPosition = arguments.length > 1 ? arguments[1] : undefined,
	          len = toLength(that.length),
	          end = endPosition === undefined ? len : Math.min(toLength(endPosition), len),
	          search = String(searchString);
	      return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
	    }
	  });
	});

	interopDefault(es6_string_endsWith);

	var es6_string_includes = createCommonjsModule(function (module) {
	  // 21.1.3.7 String.prototype.includes(searchString, position = 0)
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      context = interopDefault(require$$1$16),
	      INCLUDES = 'includes';

	  $export($export.P + $export.F * interopDefault(require$$0$27)(INCLUDES), 'String', {
	    includes: function includes(searchString /*, position = 0 */) {
	      return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	    }
	  });
	});

	interopDefault(es6_string_includes);

	var es6_string_repeat = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2);

	  $export($export.P, 'String', {
	    // 21.1.3.13 String.prototype.repeat(count)
	    repeat: interopDefault(require$$1$14)
	  });
	});

	interopDefault(es6_string_repeat);

	var es6_string_startsWith = createCommonjsModule(function (module) {
	  // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toLength = interopDefault(require$$3$1),
	      context = interopDefault(require$$1$16),
	      STARTS_WITH = 'startsWith',
	      $startsWith = ''[STARTS_WITH];

	  $export($export.P + $export.F * interopDefault(require$$0$27)(STARTS_WITH), 'String', {
	    startsWith: function startsWith(searchString /*, position = 0 */) {
	      var that = context(this, searchString, STARTS_WITH),
	          index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length)),
	          search = String(searchString);
	      return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
	    }
	  });
	});

	interopDefault(es6_string_startsWith);

	var _stringHtml = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      fails = interopDefault(require$$1$1),
	      defined = interopDefault(require$$4$3),
	      quot = /"/g;
	  // B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	  var createHTML = function createHTML(string, tag, attribute, value) {
	    var S = String(defined(string)),
	        p1 = '<' + tag;
	    if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	    return p1 + '>' + S + '</' + tag + '>';
	  };
	  module.exports = function (NAME, exec) {
	    var O = {};
	    O[NAME] = exec(createHTML);
	    $export($export.P + $export.F * fails(function () {
	      var test = ''[NAME]('"');
	      return test !== test.toLowerCase() || test.split('"').length > 3;
	    }), 'String', O);
	  };
	});

	var _stringHtml$1 = interopDefault(_stringHtml);

var require$$0$28 = Object.freeze({
	  default: _stringHtml$1
	});

	var es6_string_anchor = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.2 String.prototype.anchor(name)

	  interopDefault(require$$0$28)('anchor', function (createHTML) {
	    return function anchor(name) {
	      return createHTML(this, 'a', 'name', name);
	    };
	  });
	});

	interopDefault(es6_string_anchor);

	var es6_string_big = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.3 String.prototype.big()

	  interopDefault(require$$0$28)('big', function (createHTML) {
	    return function big() {
	      return createHTML(this, 'big', '', '');
	    };
	  });
	});

	interopDefault(es6_string_big);

	var es6_string_blink = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.4 String.prototype.blink()

	  interopDefault(require$$0$28)('blink', function (createHTML) {
	    return function blink() {
	      return createHTML(this, 'blink', '', '');
	    };
	  });
	});

	interopDefault(es6_string_blink);

	var es6_string_bold = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.5 String.prototype.bold()

	  interopDefault(require$$0$28)('bold', function (createHTML) {
	    return function bold() {
	      return createHTML(this, 'b', '', '');
	    };
	  });
	});

	interopDefault(es6_string_bold);

	var es6_string_fixed = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.6 String.prototype.fixed()

	  interopDefault(require$$0$28)('fixed', function (createHTML) {
	    return function fixed() {
	      return createHTML(this, 'tt', '', '');
	    };
	  });
	});

	interopDefault(es6_string_fixed);

	var es6_string_fontcolor = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.7 String.prototype.fontcolor(color)

	  interopDefault(require$$0$28)('fontcolor', function (createHTML) {
	    return function fontcolor(color) {
	      return createHTML(this, 'font', 'color', color);
	    };
	  });
	});

	interopDefault(es6_string_fontcolor);

	var es6_string_fontsize = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.8 String.prototype.fontsize(size)

	  interopDefault(require$$0$28)('fontsize', function (createHTML) {
	    return function fontsize(size) {
	      return createHTML(this, 'font', 'size', size);
	    };
	  });
	});

	interopDefault(es6_string_fontsize);

	var es6_string_italics = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.9 String.prototype.italics()

	  interopDefault(require$$0$28)('italics', function (createHTML) {
	    return function italics() {
	      return createHTML(this, 'i', '', '');
	    };
	  });
	});

	interopDefault(es6_string_italics);

	var es6_string_link = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.10 String.prototype.link(url)

	  interopDefault(require$$0$28)('link', function (createHTML) {
	    return function link(url) {
	      return createHTML(this, 'a', 'href', url);
	    };
	  });
	});

	interopDefault(es6_string_link);

	var es6_string_small = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.11 String.prototype.small()

	  interopDefault(require$$0$28)('small', function (createHTML) {
	    return function small() {
	      return createHTML(this, 'small', '', '');
	    };
	  });
	});

	interopDefault(es6_string_small);

	var es6_string_strike = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.12 String.prototype.strike()

	  interopDefault(require$$0$28)('strike', function (createHTML) {
	    return function strike() {
	      return createHTML(this, 'strike', '', '');
	    };
	  });
	});

	interopDefault(es6_string_strike);

	var es6_string_sub = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.13 String.prototype.sub()

	  interopDefault(require$$0$28)('sub', function (createHTML) {
	    return function sub() {
	      return createHTML(this, 'sub', '', '');
	    };
	  });
	});

	interopDefault(es6_string_sub);

	var es6_string_sup = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.14 String.prototype.sup()

	  interopDefault(require$$0$28)('sup', function (createHTML) {
	    return function sup() {
	      return createHTML(this, 'sup', '', '');
	    };
	  });
	});

	interopDefault(es6_string_sup);

	var es6_date_now = createCommonjsModule(function (module) {
	  // 20.3.3.1 / 15.9.4.4 Date.now()
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Date', { now: function now() {
	      return new Date().getTime();
	    } });
	});

	interopDefault(es6_date_now);

	var es6_date_toJson = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toObject = interopDefault(require$$5$1),
	      toPrimitive = interopDefault(require$$4$1);

	  $export($export.P + $export.F * interopDefault(require$$1$1)(function () {
	    return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function toISOString() {
	        return 1;
	      } }) !== 1;
	  }), 'Date', {
	    toJSON: function toJSON(key) {
	      var O = toObject(this),
	          pv = toPrimitive(O);
	      return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	    }
	  });
	});

	interopDefault(es6_date_toJson);

	var es6_date_toIsoString = createCommonjsModule(function (module) {
	  'use strict';
	  // 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

	  var $export = interopDefault(require$$1$2),
	      fails = interopDefault(require$$1$1),
	      getTime = Date.prototype.getTime;

	  var lz = function lz(num) {
	    return num > 9 ? num : '0' + num;
	  };

	  // PhantomJS / old WebKit has a broken implementations
	  $export($export.P + $export.F * (fails(function () {
	    return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	  }) || !fails(function () {
	    new Date(NaN).toISOString();
	  })), 'Date', {
	    toISOString: function toISOString() {
	      if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
	      var d = this,
	          y = d.getUTCFullYear(),
	          m = d.getUTCMilliseconds(),
	          s = y < 0 ? '-' : y > 9999 ? '+' : '';
	      return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	    }
	  });
	});

	interopDefault(es6_date_toIsoString);

	var es6_date_toString = createCommonjsModule(function (module) {
	  var DateProto = Date.prototype,
	      INVALID_DATE = 'Invalid Date',
	      TO_STRING = 'toString',
	      $toString = DateProto[TO_STRING],
	      getTime = DateProto.getTime;
	  if (new Date(NaN) + '' != INVALID_DATE) {
	    interopDefault(require$$4$2)(DateProto, TO_STRING, function toString() {
	      var value = getTime.call(this);
	      return value === value ? $toString.call(this) : INVALID_DATE;
	    });
	  }
	});

	interopDefault(es6_date_toString);

	var _dateToPrimitive = createCommonjsModule(function (module) {
	  'use strict';

	  var anObject = interopDefault(require$$5),
	      toPrimitive = interopDefault(require$$4$1),
	      NUMBER = 'number';

	  module.exports = function (hint) {
	    if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
	    return toPrimitive(anObject(this), hint != NUMBER);
	  };
	});

	var _dateToPrimitive$1 = interopDefault(_dateToPrimitive);

var require$$0$29 = Object.freeze({
	  default: _dateToPrimitive$1
	});

	var es6_date_toPrimitive = createCommonjsModule(function (module) {
	  var TO_PRIMITIVE = interopDefault(require$$0$4)('toPrimitive'),
	      proto = Date.prototype;

	  if (!(TO_PRIMITIVE in proto)) interopDefault(require$$2)(proto, TO_PRIMITIVE, interopDefault(require$$0$29));
	});

	interopDefault(es6_date_toPrimitive);

	var es6_array_isArray = createCommonjsModule(function (module) {
	  // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Array', { isArray: interopDefault(require$$1$10) });
	});

	interopDefault(es6_array_isArray);

	var _iterCall = createCommonjsModule(function (module) {
	  // call something on iterator step with safe closing on error
	  var anObject = interopDefault(require$$5);
	  module.exports = function (iterator, fn, value, entries) {
	    try {
	      return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	      // 7.4.6 IteratorClose(iterator, completion)
	    } catch (e) {
	      var ret = iterator['return'];
	      if (ret !== undefined) anObject(ret.call(iterator));
	      throw e;
	    }
	  };
	});

	var _iterCall$1 = interopDefault(_iterCall);

var require$$4$5 = Object.freeze({
	  default: _iterCall$1
	});

	var _isArrayIter = createCommonjsModule(function (module) {
	  // check on default Array iterator
	  var Iterators = interopDefault(require$$1$15),
	      ITERATOR = interopDefault(require$$0$4)('iterator'),
	      ArrayProto = Array.prototype;

	  module.exports = function (it) {
	    return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	  };
	});

	var _isArrayIter$1 = interopDefault(_isArrayIter);

var require$$17 = Object.freeze({
	  default: _isArrayIter$1
	});

	var _createProperty = createCommonjsModule(function (module) {
	  'use strict';

	  var $defineProperty = interopDefault(require$$2$1),
	      createDesc = interopDefault(require$$2$3);

	  module.exports = function (object, index, value) {
	    if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
	  };
	});

	var _createProperty$1 = interopDefault(_createProperty);

var require$$0$30 = Object.freeze({
	  default: _createProperty$1
	});

	var core_getIteratorMethod = createCommonjsModule(function (module) {
	  var classof = interopDefault(require$$1$11),
	      ITERATOR = interopDefault(require$$0$4)('iterator'),
	      Iterators = interopDefault(require$$1$15);
	  module.exports = interopDefault(require$$0).getIteratorMethod = function (it) {
	    if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	  };
	});

	var core_getIteratorMethod$1 = interopDefault(core_getIteratorMethod);

var require$$13 = Object.freeze({
	  default: core_getIteratorMethod$1
	});

	var _iterDetect = createCommonjsModule(function (module) {
	  var ITERATOR = interopDefault(require$$0$4)('iterator'),
	      SAFE_CLOSING = false;

	  try {
	    var riter = [7][ITERATOR]();
	    riter['return'] = function () {
	      SAFE_CLOSING = true;
	    };
	    Array.from(riter, function () {
	      throw 2;
	    });
	  } catch (e) {/* empty */}

	  module.exports = function (exec, skipClosing) {
	    if (!skipClosing && !SAFE_CLOSING) return false;
	    var safe = false;
	    try {
	      var arr = [7],
	          iter = arr[ITERATOR]();
	      iter.next = function () {
	        return { done: safe = true };
	      };
	      arr[ITERATOR] = function () {
	        return iter;
	      };
	      exec(arr);
	    } catch (e) {/* empty */}
	    return safe;
	  };
	});

	var _iterDetect$1 = interopDefault(_iterDetect);

var require$$5$2 = Object.freeze({
	  default: _iterDetect$1
	});

	var es6_array_from = createCommonjsModule(function (module) {
	  'use strict';

	  var ctx = interopDefault(require$$31),
	      $export = interopDefault(require$$1$2),
	      toObject = interopDefault(require$$5$1),
	      call = interopDefault(require$$4$5),
	      isArrayIter = interopDefault(require$$17),
	      toLength = interopDefault(require$$3$1),
	      createProperty = interopDefault(require$$0$30),
	      getIterFn = interopDefault(require$$13);

	  $export($export.S + $export.F * !interopDefault(require$$5$2)(function (iter) {
	    Array.from(iter);
	  }), 'Array', {
	    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	    from: function from(arrayLike /*, mapfn = undefined, thisArg = undefined*/) {
	      var O = toObject(arrayLike),
	          C = typeof this == 'function' ? this : Array,
	          aLen = arguments.length,
	          mapfn = aLen > 1 ? arguments[1] : undefined,
	          mapping = mapfn !== undefined,
	          index = 0,
	          iterFn = getIterFn(O),
	          length,
	          result,
	          step,
	          iterator;
	      if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	      // if object isn't iterable or it's array with default iterator - use simple case
	      if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	          createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	        }
	      } else {
	        length = toLength(O.length);
	        for (result = new C(length); length > index; index++) {
	          createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	        }
	      }
	      result.length = index;
	      return result;
	    }
	  });
	});

	interopDefault(es6_array_from);

	var es6_array_of = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      createProperty = interopDefault(require$$0$30);

	  // WebKit Array.of isn't generic
	  $export($export.S + $export.F * interopDefault(require$$1$1)(function () {
	    function F() {}
	    return !(Array.of.call(F) instanceof F);
	  }), 'Array', {
	    // 22.1.2.3 Array.of( ...items)
	    of: function of() /* ...args */{
	      var index = 0,
	          aLen = arguments.length,
	          result = new (typeof this == 'function' ? this : Array)(aLen);
	      while (aLen > index) {
	        createProperty(result, index, arguments[index++]);
	      }result.length = aLen;
	      return result;
	    }
	  });
	});

	interopDefault(es6_array_of);

	var _strictMethod = createCommonjsModule(function (module) {
	  var fails = interopDefault(require$$1$1);

	  module.exports = function (method, arg) {
	    return !!method && fails(function () {
	      arg ? method.call(null, function () {}, 1) : method.call(null);
	    });
	  };
	});

	var _strictMethod$1 = interopDefault(_strictMethod);

var require$$0$31 = Object.freeze({
	  default: _strictMethod$1
	});

	var es6_array_join = createCommonjsModule(function (module) {
	  'use strict';
	  // 22.1.3.13 Array.prototype.join(separator)

	  var $export = interopDefault(require$$1$2),
	      toIObject = interopDefault(require$$1$7),
	      arrayJoin = [].join;

	  // fallback for not array-like strings
	  $export($export.P + $export.F * (interopDefault(require$$1$8) != Object || !interopDefault(require$$0$31)(arrayJoin)), 'Array', {
	    join: function join(separator) {
	      return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
	    }
	  });
	});

	interopDefault(es6_array_join);

	var es6_array_slice = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      html = interopDefault(require$$3$2),
	      cof = interopDefault(require$$0$6),
	      toIndex = interopDefault(require$$24),
	      toLength = interopDefault(require$$3$1),
	      arraySlice = [].slice;

	  // fallback for not array-like ES3 strings and DOM objects
	  $export($export.P + $export.F * interopDefault(require$$1$1)(function () {
	    if (html) arraySlice.call(html);
	  }), 'Array', {
	    slice: function slice(begin, end) {
	      var len = toLength(this.length),
	          klass = cof(this);
	      end = end === undefined ? len : end;
	      if (klass == 'Array') return arraySlice.call(this, begin, end);
	      var start = toIndex(begin, len),
	          upTo = toIndex(end, len),
	          size = toLength(upTo - start),
	          cloned = Array(size),
	          i = 0;
	      for (; i < size; i++) {
	        cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
	      }return cloned;
	    }
	  });
	});

	interopDefault(es6_array_slice);

	var es6_array_sort = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      aFunction = interopDefault(require$$0$2),
	      toObject = interopDefault(require$$5$1),
	      fails = interopDefault(require$$1$1),
	      $sort = [].sort,
	      test = [1, 2, 3];

	  $export($export.P + $export.F * (fails(function () {
	    // IE8-
	    test.sort(undefined);
	  }) || !fails(function () {
	    // V8 bug
	    test.sort(null);
	    // Old WebKit
	  }) || !interopDefault(require$$0$31)($sort)), 'Array', {
	    // 22.1.3.25 Array.prototype.sort(comparefn)
	    sort: function sort(comparefn) {
	      return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
	    }
	  });
	});

	interopDefault(es6_array_sort);

	var _arraySpeciesConstructor = createCommonjsModule(function (module) {
	  var isObject = interopDefault(require$$0$1),
	      isArray = interopDefault(require$$1$10),
	      SPECIES = interopDefault(require$$0$4)('species');

	  module.exports = function (original) {
	    var C;
	    if (isArray(original)) {
	      C = original.constructor;
	      // cross-realm fallback
	      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	      if (isObject(C)) {
	        C = C[SPECIES];
	        if (C === null) C = undefined;
	      }
	    }return C === undefined ? Array : C;
	  };
	});

	var _arraySpeciesConstructor$1 = interopDefault(_arraySpeciesConstructor);

var require$$0$33 = Object.freeze({
	  default: _arraySpeciesConstructor$1
	});

	var _arraySpeciesCreate = createCommonjsModule(function (module) {
	  // 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	  var speciesConstructor = interopDefault(require$$0$33);

	  module.exports = function (original, length) {
	    return new (speciesConstructor(original))(length);
	  };
	});

	var _arraySpeciesCreate$1 = interopDefault(_arraySpeciesCreate);

var require$$0$32 = Object.freeze({
	  default: _arraySpeciesCreate$1
	});

	var _arrayMethods = createCommonjsModule(function (module) {
	  // 0 -> Array#forEach
	  // 1 -> Array#map
	  // 2 -> Array#filter
	  // 3 -> Array#some
	  // 4 -> Array#every
	  // 5 -> Array#find
	  // 6 -> Array#findIndex
	  var ctx = interopDefault(require$$31),
	      IObject = interopDefault(require$$1$8),
	      toObject = interopDefault(require$$5$1),
	      toLength = interopDefault(require$$3$1),
	      asc = interopDefault(require$$0$32);
	  module.exports = function (TYPE, $create) {
	    var IS_MAP = TYPE == 1,
	        IS_FILTER = TYPE == 2,
	        IS_SOME = TYPE == 3,
	        IS_EVERY = TYPE == 4,
	        IS_FIND_INDEX = TYPE == 6,
	        NO_HOLES = TYPE == 5 || IS_FIND_INDEX,
	        create = $create || asc;
	    return function ($this, callbackfn, that) {
	      var O = toObject($this),
	          self = IObject(O),
	          f = ctx(callbackfn, that, 3),
	          length = toLength(self.length),
	          index = 0,
	          result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined,
	          val,
	          res;
	      for (; length > index; index++) {
	        if (NO_HOLES || index in self) {
	          val = self[index];
	          res = f(val, index, O);
	          if (TYPE) {
	            if (IS_MAP) result[index] = res; // map
	            else if (res) switch (TYPE) {
	                case 3:
	                  return true; // some
	                case 5:
	                  return val; // find
	                case 6:
	                  return index; // findIndex
	                case 2:
	                  result.push(val); // filter
	              } else if (IS_EVERY) return false; // every
	          }
	        }
	      }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	    };
	  };
	});

	var _arrayMethods$1 = interopDefault(_arrayMethods);

var require$$10 = Object.freeze({
	  default: _arrayMethods$1
	});

	var es6_array_forEach = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $forEach = interopDefault(require$$10)(0),
	      STRICT = interopDefault(require$$0$31)([].forEach, true);

	  $export($export.P + $export.F * !STRICT, 'Array', {
	    // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	    forEach: function forEach(callbackfn /* , thisArg */) {
	      return $forEach(this, callbackfn, arguments[1]);
	    }
	  });
	});

	interopDefault(es6_array_forEach);

	var es6_array_map = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $map = interopDefault(require$$10)(1);

	  $export($export.P + $export.F * !interopDefault(require$$0$31)([].map, true), 'Array', {
	    // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	    map: function map(callbackfn /* , thisArg */) {
	      return $map(this, callbackfn, arguments[1]);
	    }
	  });
	});

	interopDefault(es6_array_map);

	var es6_array_filter = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $filter = interopDefault(require$$10)(2);

	  $export($export.P + $export.F * !interopDefault(require$$0$31)([].filter, true), 'Array', {
	    // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	    filter: function filter(callbackfn /* , thisArg */) {
	      return $filter(this, callbackfn, arguments[1]);
	    }
	  });
	});

	interopDefault(es6_array_filter);

	var es6_array_some = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $some = interopDefault(require$$10)(3);

	  $export($export.P + $export.F * !interopDefault(require$$0$31)([].some, true), 'Array', {
	    // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	    some: function some(callbackfn /* , thisArg */) {
	      return $some(this, callbackfn, arguments[1]);
	    }
	  });
	});

	interopDefault(es6_array_some);

	var es6_array_every = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $every = interopDefault(require$$10)(4);

	  $export($export.P + $export.F * !interopDefault(require$$0$31)([].every, true), 'Array', {
	    // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	    every: function every(callbackfn /* , thisArg */) {
	      return $every(this, callbackfn, arguments[1]);
	    }
	  });
	});

	interopDefault(es6_array_every);

	var _arrayReduce = createCommonjsModule(function (module) {
	  var aFunction = interopDefault(require$$0$2),
	      toObject = interopDefault(require$$5$1),
	      IObject = interopDefault(require$$1$8),
	      toLength = interopDefault(require$$3$1);

	  module.exports = function (that, callbackfn, aLen, memo, isRight) {
	    aFunction(callbackfn);
	    var O = toObject(that),
	        self = IObject(O),
	        length = toLength(O.length),
	        index = isRight ? length - 1 : 0,
	        i = isRight ? -1 : 1;
	    if (aLen < 2) for (;;) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (isRight ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for (; isRight ? index >= 0 : length > index; index += i) {
	      if (index in self) {
	        memo = callbackfn(memo, self[index], index, O);
	      }
	    }return memo;
	  };
	});

	var _arrayReduce$1 = interopDefault(_arrayReduce);

var require$$1$17 = Object.freeze({
	  default: _arrayReduce$1
	});

	var es6_array_reduce = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $reduce = interopDefault(require$$1$17);

	  $export($export.P + $export.F * !interopDefault(require$$0$31)([].reduce, true), 'Array', {
	    // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	    reduce: function reduce(callbackfn /* , initialValue */) {
	      return $reduce(this, callbackfn, arguments.length, arguments[1], false);
	    }
	  });
	});

	interopDefault(es6_array_reduce);

	var es6_array_reduceRight = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $reduce = interopDefault(require$$1$17);

	  $export($export.P + $export.F * !interopDefault(require$$0$31)([].reduceRight, true), 'Array', {
	    // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	    reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	      return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	    }
	  });
	});

	interopDefault(es6_array_reduceRight);

	var es6_array_indexOf = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $indexOf = interopDefault(require$$1$9)(false),
	      $native = [].indexOf,
	      NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	  $export($export.P + $export.F * (NEGATIVE_ZERO || !interopDefault(require$$0$31)($native)), 'Array', {
	    // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	    indexOf: function indexOf(searchElement /*, fromIndex = 0 */) {
	      return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
	    }
	  });
	});

	interopDefault(es6_array_indexOf);

	var es6_array_lastIndexOf = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toIObject = interopDefault(require$$1$7),
	      toInteger = interopDefault(require$$26),
	      toLength = interopDefault(require$$3$1),
	      $native = [].lastIndexOf,
	      NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

	  $export($export.P + $export.F * (NEGATIVE_ZERO || !interopDefault(require$$0$31)($native)), 'Array', {
	    // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */) {
	      // convert -0 to +0
	      if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
	      var O = toIObject(this),
	          length = toLength(O.length),
	          index = length - 1;
	      if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
	      if (index < 0) index = length + index;
	      for (; index >= 0; index--) {
	        if (index in O) if (O[index] === searchElement) return index || 0;
	      }return -1;
	    }
	  });
	});

	interopDefault(es6_array_lastIndexOf);

	var _arrayCopyWithin = createCommonjsModule(function (module) {
	  // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	  'use strict';

	  var toObject = interopDefault(require$$5$1),
	      toIndex = interopDefault(require$$24),
	      toLength = interopDefault(require$$3$1);

	  module.exports = [].copyWithin || function copyWithin(target /*= 0*/, start /*= 0, end = @length*/) {
	    var O = toObject(this),
	        len = toLength(O.length),
	        to = toIndex(target, len),
	        from = toIndex(start, len),
	        end = arguments.length > 2 ? arguments[2] : undefined,
	        count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to),
	        inc = 1;
	    if (from < to && to < from + count) {
	      inc = -1;
	      from += count - 1;
	      to += count - 1;
	    }
	    while (count-- > 0) {
	      if (from in O) O[to] = O[from];else delete O[to];
	      to += inc;
	      from += inc;
	    }return O;
	  };
	});

	var _arrayCopyWithin$1 = interopDefault(_arrayCopyWithin);

var require$$2$9 = Object.freeze({
	  default: _arrayCopyWithin$1
	});

	var _addToUnscopables = createCommonjsModule(function (module) {
	  // 22.1.3.31 Array.prototype[@@unscopables]
	  var UNSCOPABLES = interopDefault(require$$0$4)('unscopables'),
	      ArrayProto = Array.prototype;
	  if (ArrayProto[UNSCOPABLES] == undefined) interopDefault(require$$2)(ArrayProto, UNSCOPABLES, {});
	  module.exports = function (key) {
	    ArrayProto[UNSCOPABLES][key] = true;
	  };
	});

	var _addToUnscopables$1 = interopDefault(_addToUnscopables);

var require$$0$34 = Object.freeze({
	  default: _addToUnscopables$1
	});

	var es6_array_copyWithin = createCommonjsModule(function (module) {
	  // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	  var $export = interopDefault(require$$1$2);

	  $export($export.P, 'Array', { copyWithin: interopDefault(require$$2$9) });

	  interopDefault(require$$0$34)('copyWithin');
	});

	interopDefault(es6_array_copyWithin);

	var _arrayFill = createCommonjsModule(function (module) {
	  // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	  'use strict';

	  var toObject = interopDefault(require$$5$1),
	      toIndex = interopDefault(require$$24),
	      toLength = interopDefault(require$$3$1);
	  module.exports = function fill(value /*, start = 0, end = @length */) {
	    var O = toObject(this),
	        length = toLength(O.length),
	        aLen = arguments.length,
	        index = toIndex(aLen > 1 ? arguments[1] : undefined, length),
	        end = aLen > 2 ? arguments[2] : undefined,
	        endPos = end === undefined ? length : toIndex(end, length);
	    while (endPos > index) {
	      O[index++] = value;
	    }return O;
	  };
	});

	var _arrayFill$1 = interopDefault(_arrayFill);

var require$$3$5 = Object.freeze({
	  default: _arrayFill$1
	});

	var es6_array_fill = createCommonjsModule(function (module) {
	  // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	  var $export = interopDefault(require$$1$2);

	  $export($export.P, 'Array', { fill: interopDefault(require$$3$5) });

	  interopDefault(require$$0$34)('fill');
	});

	interopDefault(es6_array_fill);

	var es6_array_find = createCommonjsModule(function (module) {
	  'use strict';
	  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	  var $export = interopDefault(require$$1$2),
	      $find = interopDefault(require$$10)(5),
	      KEY = 'find',
	      forced = true;
	  // Shouldn't skip holes
	  if (KEY in []) Array(1)[KEY](function () {
	    forced = false;
	  });
	  $export($export.P + $export.F * forced, 'Array', {
	    find: function find(callbackfn /*, that = undefined */) {
	      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    }
	  });
	  interopDefault(require$$0$34)(KEY);
	});

	interopDefault(es6_array_find);

	var es6_array_findIndex = createCommonjsModule(function (module) {
	  'use strict';
	  // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

	  var $export = interopDefault(require$$1$2),
	      $find = interopDefault(require$$10)(6),
	      KEY = 'findIndex',
	      forced = true;
	  // Shouldn't skip holes
	  if (KEY in []) Array(1)[KEY](function () {
	    forced = false;
	  });
	  $export($export.P + $export.F * forced, 'Array', {
	    findIndex: function findIndex(callbackfn /*, that = undefined */) {
	      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    }
	  });
	  interopDefault(require$$0$34)(KEY);
	});

	interopDefault(es6_array_findIndex);

	var _setSpecies = createCommonjsModule(function (module) {
	  'use strict';

	  var global = interopDefault(require$$3),
	      dP = interopDefault(require$$2$1),
	      DESCRIPTORS = interopDefault(require$$1),
	      SPECIES = interopDefault(require$$0$4)('species');

	  module.exports = function (KEY) {
	    var C = global[KEY];
	    if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	      configurable: true,
	      get: function get() {
	        return this;
	      }
	    });
	  };
	});

	var _setSpecies$1 = interopDefault(_setSpecies);

var require$$0$35 = Object.freeze({
	  default: _setSpecies$1
	});

	var es6_array_species = createCommonjsModule(function (module) {
	  interopDefault(require$$0$35)('Array');
	});

	interopDefault(es6_array_species);

	var _iterStep = createCommonjsModule(function (module) {
	  module.exports = function (done, value) {
	    return { value: value, done: !!done };
	  };
	});

	var _iterStep$1 = interopDefault(_iterStep);

var require$$3$6 = Object.freeze({
	  default: _iterStep$1
	});

	var es6_array_iterator = createCommonjsModule(function (module) {
	  'use strict';

	  var addToUnscopables = interopDefault(require$$0$34),
	      step = interopDefault(require$$3$6),
	      Iterators = interopDefault(require$$1$15),
	      toIObject = interopDefault(require$$1$7);

	  // 22.1.3.4 Array.prototype.entries()
	  // 22.1.3.13 Array.prototype.keys()
	  // 22.1.3.29 Array.prototype.values()
	  // 22.1.3.30 Array.prototype[@@iterator]()
	  module.exports = interopDefault(require$$4$4)(Array, 'Array', function (iterated, kind) {
	    this._t = toIObject(iterated); // target
	    this._i = 0; // next index
	    this._k = kind; // kind
	    // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	  }, function () {
	    var O = this._t,
	        kind = this._k,
	        index = this._i++;
	    if (!O || index >= O.length) {
	      this._t = undefined;
	      return step(1);
	    }
	    if (kind == 'keys') return step(0, index);
	    if (kind == 'values') return step(0, O[index]);
	    return step(0, [index, O[index]]);
	  }, 'values');

	  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	  Iterators.Arguments = Iterators.Array;

	  addToUnscopables('keys');
	  addToUnscopables('values');
	  addToUnscopables('entries');
	});

	var es6_array_iterator$1 = interopDefault(es6_array_iterator);

var require$$5$3 = Object.freeze({
	  default: es6_array_iterator$1
	});

	var _flags = createCommonjsModule(function (module) {
	  'use strict';
	  // 21.2.5.3 get RegExp.prototype.flags

	  var anObject = interopDefault(require$$5);
	  module.exports = function () {
	    var that = anObject(this),
	        result = '';
	    if (that.global) result += 'g';
	    if (that.ignoreCase) result += 'i';
	    if (that.multiline) result += 'm';
	    if (that.unicode) result += 'u';
	    if (that.sticky) result += 'y';
	    return result;
	  };
	});

	var _flags$1 = interopDefault(_flags);

var require$$1$18 = Object.freeze({
	  default: _flags$1
	});

	var es6_regexp_constructor = createCommonjsModule(function (module) {
	  var global = interopDefault(require$$3),
	      inheritIfRequired = interopDefault(require$$0$19),
	      dP = interopDefault(require$$2$1).f,
	      gOPN = interopDefault(require$$3$3).f,
	      isRegExp = interopDefault(require$$2$8),
	      $flags = interopDefault(require$$1$18),
	      $RegExp = global.RegExp,
	      Base = $RegExp,
	      proto = $RegExp.prototype,
	      re1 = /a/g,
	      re2 = /a/g
	  // "new" creates a new object, old webkit buggy here
	  ,
	      CORRECT_NEW = new $RegExp(re1) !== re1;

	  if (interopDefault(require$$1) && (!CORRECT_NEW || interopDefault(require$$1$1)(function () {
	    re2[interopDefault(require$$0$4)('match')] = false;
	    // RegExp constructor can alter flags and IsRegExp works correct with @@match
	    return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	  }))) {
	    $RegExp = function RegExp(p, f) {
	      var tiRE = this instanceof $RegExp,
	          piRE = isRegExp(p),
	          fiU = f === undefined;
	      return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
	    };
	    var proxy = function proxy(key) {
	      key in $RegExp || dP($RegExp, key, {
	        configurable: true,
	        get: function get() {
	          return Base[key];
	        },
	        set: function set(it) {
	          Base[key] = it;
	        }
	      });
	    };
	    for (var keys = gOPN(Base), i = 0; keys.length > i;) {
	      proxy(keys[i++]);
	    }proto.constructor = $RegExp;
	    $RegExp.prototype = proto;
	    interopDefault(require$$4$2)(global, 'RegExp', $RegExp);
	  }

	  interopDefault(require$$0$35)('RegExp');
	});

	interopDefault(es6_regexp_constructor);

	var es6_regexp_flags = createCommonjsModule(function (module) {
	  // 21.2.5.3 get RegExp.prototype.flags()
	  if (interopDefault(require$$1) && /./g.flags != 'g') interopDefault(require$$2$1).f(RegExp.prototype, 'flags', {
	    configurable: true,
	    get: interopDefault(require$$1$18)
	  });
	});

	interopDefault(es6_regexp_flags);

	var es6_regexp_toString = createCommonjsModule(function (module) {
	  'use strict';

	  var anObject = interopDefault(require$$5),
	      $flags = interopDefault(require$$1$18),
	      DESCRIPTORS = interopDefault(require$$1),
	      TO_STRING = 'toString',
	      $toString = /./[TO_STRING];

	  var define = function define(fn) {
	    interopDefault(require$$4$2)(RegExp.prototype, TO_STRING, fn, true);
	  };

	  // 21.2.5.14 RegExp.prototype.toString()
	  if (interopDefault(require$$1$1)(function () {
	    return $toString.call({ source: 'a', flags: 'b' }) != '/a/b';
	  })) {
	    define(function toString() {
	      var R = anObject(this);
	      return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	    });
	    // FF44- RegExp#toString has a wrong name
	  } else if ($toString.name != TO_STRING) {
	    define(function toString() {
	      return $toString.call(this);
	    });
	  }
	});

	interopDefault(es6_regexp_toString);

	var _fixReWks = createCommonjsModule(function (module) {
	  'use strict';

	  var hide = interopDefault(require$$2),
	      redefine = interopDefault(require$$4$2),
	      fails = interopDefault(require$$1$1),
	      defined = interopDefault(require$$4$3),
	      wks = interopDefault(require$$0$4);

	  module.exports = function (KEY, length, exec) {
	    var SYMBOL = wks(KEY),
	        fns = exec(defined, SYMBOL, ''[KEY]),
	        strfn = fns[0],
	        rxfn = fns[1];
	    if (fails(function () {
	      var O = {};
	      O[SYMBOL] = function () {
	        return 7;
	      };
	      return ''[KEY](O) != 7;
	    })) {
	      redefine(String.prototype, KEY, strfn);
	      hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) {
	        return rxfn.call(string, this, arg);
	      }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) {
	        return rxfn.call(string, this);
	      });
	    }
	  };
	});

	var _fixReWks$1 = interopDefault(_fixReWks);

var require$$1$19 = Object.freeze({
	  default: _fixReWks$1
	});

	var es6_regexp_match = createCommonjsModule(function (module) {
	  // @@match logic
	  interopDefault(require$$1$19)('match', 1, function (defined, MATCH, $match) {
	    // 21.1.3.11 String.prototype.match(regexp)
	    return [function match(regexp) {
	      'use strict';

	      var O = defined(this),
	          fn = regexp == undefined ? undefined : regexp[MATCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    }, $match];
	  });
	});

	interopDefault(es6_regexp_match);

	var es6_regexp_replace = createCommonjsModule(function (module) {
	  // @@replace logic
	  interopDefault(require$$1$19)('replace', 2, function (defined, REPLACE, $replace) {
	    // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	    return [function replace(searchValue, replaceValue) {
	      'use strict';

	      var O = defined(this),
	          fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
	    }, $replace];
	  });
	});

	interopDefault(es6_regexp_replace);

	var es6_regexp_search = createCommonjsModule(function (module) {
	  // @@search logic
	  interopDefault(require$$1$19)('search', 1, function (defined, SEARCH, $search) {
	    // 21.1.3.15 String.prototype.search(regexp)
	    return [function search(regexp) {
	      'use strict';

	      var O = defined(this),
	          fn = regexp == undefined ? undefined : regexp[SEARCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	    }, $search];
	  });
	});

	interopDefault(es6_regexp_search);

	var es6_regexp_split = createCommonjsModule(function (module) {
	  // @@split logic
	  interopDefault(require$$1$19)('split', 2, function (defined, SPLIT, $split) {
	    'use strict';

	    var isRegExp = interopDefault(require$$2$8),
	        _split = $split,
	        $push = [].push,
	        $SPLIT = 'split',
	        LENGTH = 'length',
	        LAST_INDEX = 'lastIndex';
	    if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
	      var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	      // based on es5-shim implementation, need to rework it
	      $split = function $split(separator, limit) {
	        var string = String(this);
	        if (separator === undefined && limit === 0) return [];
	        // If `separator` is not a regex, use native split
	        if (!isRegExp(separator)) return _split.call(string, separator, limit);
	        var output = [];
	        var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
	        var lastLastIndex = 0;
	        var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	        // Make `global` and avoid `lastIndex` issues by working with a copy
	        var separatorCopy = new RegExp(separator.source, flags + 'g');
	        var separator2, match, lastIndex, lastLength, i;
	        // Doesn't need flags gy, but they don't hurt
	        if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	        while (match = separatorCopy.exec(string)) {
	          // `separatorCopy.lastIndex` is not reliable cross-browser
	          lastIndex = match.index + match[0][LENGTH];
	          if (lastIndex > lastLastIndex) {
	            output.push(string.slice(lastLastIndex, match.index));
	            // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	            if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
	              for (i = 1; i < arguments[LENGTH] - 2; i++) {
	                if (arguments[i] === undefined) match[i] = undefined;
	              }
	            });
	            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	            lastLength = match[0][LENGTH];
	            lastLastIndex = lastIndex;
	            if (output[LENGTH] >= splitLimit) break;
	          }
	          if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	        }
	        if (lastLastIndex === string[LENGTH]) {
	          if (lastLength || !separatorCopy.test('')) output.push('');
	        } else output.push(string.slice(lastLastIndex));
	        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	      };
	      // Chakra, V8
	    } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	      $split = function $split(separator, limit) {
	        return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	      };
	    }
	    // 21.1.3.17 String.prototype.split(separator, limit)
	    return [function split(separator, limit) {
	      var O = defined(this),
	          fn = separator == undefined ? undefined : separator[SPLIT];
	      return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	    }, $split];
	  });
	});

	interopDefault(es6_regexp_split);

	var _anInstance = createCommonjsModule(function (module) {
	  module.exports = function (it, Constructor, name, forbiddenField) {
	    if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
	      throw TypeError(name + ': incorrect invocation!');
	    }return it;
	  };
	});

	var _anInstance$1 = interopDefault(_anInstance);

var require$$4$6 = Object.freeze({
	  default: _anInstance$1
	});

	var _forOf = createCommonjsModule(function (module) {
	  var ctx = interopDefault(require$$31),
	      call = interopDefault(require$$4$5),
	      isArrayIter = interopDefault(require$$17),
	      anObject = interopDefault(require$$5),
	      toLength = interopDefault(require$$3$1),
	      getIterFn = interopDefault(require$$13),
	      BREAK = {},
	      RETURN = {};
	  var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	    var iterFn = ITERATOR ? function () {
	      return iterable;
	    } : getIterFn(iterable),
	        f = ctx(fn, that, entries ? 2 : 1),
	        index = 0,
	        length,
	        step,
	        iterator,
	        result;
	    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	    // fast case for arrays with default iterator
	    if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	      result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	      if (result === BREAK || result === RETURN) return result;
	    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	      result = call(iterator, f, step.value, entries);
	      if (result === BREAK || result === RETURN) return result;
	    }
	  };
	  exports.BREAK = BREAK;
	  exports.RETURN = RETURN;
	});

	var _forOf$1 = interopDefault(_forOf);

var require$$1$20 = Object.freeze({
	  default: _forOf$1
	});

	var _speciesConstructor = createCommonjsModule(function (module) {
	  // 7.3.20 SpeciesConstructor(O, defaultConstructor)
	  var anObject = interopDefault(require$$5),
	      aFunction = interopDefault(require$$0$2),
	      SPECIES = interopDefault(require$$0$4)('species');
	  module.exports = function (O, D) {
	    var C = anObject(O).constructor,
	        S;
	    return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	  };
	});

	var _speciesConstructor$1 = interopDefault(_speciesConstructor);

var require$$8 = Object.freeze({
	  default: _speciesConstructor$1
	});

	var _task = createCommonjsModule(function (module) {
	  var ctx = interopDefault(require$$31),
	      invoke = interopDefault(require$$1$13),
	      html = interopDefault(require$$3$2),
	      cel = interopDefault(require$$2$2),
	      global = interopDefault(require$$3),
	      process = global.process,
	      setTask = global.setImmediate,
	      clearTask = global.clearImmediate,
	      MessageChannel = global.MessageChannel,
	      counter = 0,
	      queue = {},
	      ONREADYSTATECHANGE = 'onreadystatechange',
	      defer,
	      channel,
	      port;
	  var run = function run() {
	    var id = +this;
	    if (queue.hasOwnProperty(id)) {
	      var fn = queue[id];
	      delete queue[id];
	      fn();
	    }
	  };
	  var listener = function listener(event) {
	    run.call(event.data);
	  };
	  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	  if (!setTask || !clearTask) {
	    setTask = function setImmediate(fn) {
	      var args = [],
	          i = 1;
	      while (arguments.length > i) {
	        args.push(arguments[i++]);
	      }queue[++counter] = function () {
	        invoke(typeof fn == 'function' ? fn : Function(fn), args);
	      };
	      defer(counter);
	      return counter;
	    };
	    clearTask = function clearImmediate(id) {
	      delete queue[id];
	    };
	    // Node.js 0.8-
	    if (interopDefault(require$$0$6)(process) == 'process') {
	      defer = function defer(id) {
	        process.nextTick(ctx(run, id, 1));
	      };
	      // Browsers with MessageChannel, includes WebWorkers
	    } else if (MessageChannel) {
	      channel = new MessageChannel();
	      port = channel.port2;
	      channel.port1.onmessage = listener;
	      defer = ctx(port.postMessage, port, 1);
	      // Browsers with postMessage, skip WebWorkers
	      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	    } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	      defer = function defer(id) {
	        global.postMessage(id + '', '*');
	      };
	      global.addEventListener('message', listener, false);
	      // IE8-
	    } else if (ONREADYSTATECHANGE in cel('script')) {
	      defer = function defer(id) {
	        html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	          html.removeChild(this);
	          run.call(id);
	        };
	      };
	      // Rest old browsers
	    } else {
	      defer = function defer(id) {
	        setTimeout(ctx(run, id, 1), 0);
	      };
	    }
	  }
	  module.exports = {
	    set: setTask,
	    clear: clearTask
	  };
	});

	var _task$1 = interopDefault(_task);
	var set$2 = _task.set;
	var clear = _task.clear;

var require$$0$36 = Object.freeze({
	  default: _task$1,
	  set: set$2,
	  clear: clear
	});

	var _microtask = createCommonjsModule(function (module) {
	  var global = interopDefault(require$$3),
	      macrotask = interopDefault(require$$0$36).set,
	      Observer = global.MutationObserver || global.WebKitMutationObserver,
	      process = global.process,
	      Promise = global.Promise,
	      isNode = interopDefault(require$$0$6)(process) == 'process';

	  module.exports = function () {
	    var head, last, notify;

	    var flush = function flush() {
	      var parent, fn;
	      if (isNode && (parent = process.domain)) parent.exit();
	      while (head) {
	        fn = head.fn;
	        head = head.next;
	        try {
	          fn();
	        } catch (e) {
	          if (head) notify();else last = undefined;
	          throw e;
	        }
	      }last = undefined;
	      if (parent) parent.enter();
	    };

	    // Node.js
	    if (isNode) {
	      notify = function notify() {
	        process.nextTick(flush);
	      };
	      // browsers with MutationObserver
	    } else if (Observer) {
	      var toggle = true,
	          node = document.createTextNode('');
	      new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	      notify = function notify() {
	        node.data = toggle = !toggle;
	      };
	      // environments with maybe non-completely correct, but existent Promise
	    } else if (Promise && Promise.resolve) {
	      var promise = Promise.resolve();
	      notify = function notify() {
	        promise.then(flush);
	      };
	      // for other environments - macrotask based on:
	      // - setImmediate
	      // - MessageChannel
	      // - window.postMessag
	      // - onreadystatechange
	      // - setTimeout
	    } else {
	      notify = function notify() {
	        // strange IE + webpack dev server bug - use .call(global)
	        macrotask.call(global, flush);
	      };
	    }

	    return function (fn) {
	      var task = { fn: fn, next: undefined };
	      if (last) last.next = task;
	      if (!head) {
	        head = task;
	        notify();
	      }last = task;
	    };
	  };
	});

	var _microtask$1 = interopDefault(_microtask);

var require$$8$1 = Object.freeze({
	  default: _microtask$1
	});

	var _redefineAll = createCommonjsModule(function (module) {
	  var redefine = interopDefault(require$$4$2);
	  module.exports = function (target, src, safe) {
	    for (var key in src) {
	      redefine(target, key, src[key], safe);
	    }return target;
	  };
	});

	var _redefineAll$1 = interopDefault(_redefineAll);

var require$$3$7 = Object.freeze({
	  default: _redefineAll$1
	});

	var es6_promise = createCommonjsModule(function (module) {
	  'use strict';

	  var LIBRARY = interopDefault(require$$2$4),
	      global = interopDefault(require$$3),
	      ctx = interopDefault(require$$31),
	      classof = interopDefault(require$$1$11),
	      $export = interopDefault(require$$1$2),
	      isObject = interopDefault(require$$0$1),
	      aFunction = interopDefault(require$$0$2),
	      anInstance = interopDefault(require$$4$6),
	      forOf = interopDefault(require$$1$20),
	      speciesConstructor = interopDefault(require$$8),
	      task = interopDefault(require$$0$36).set,
	      microtask = interopDefault(require$$8$1)(),
	      PROMISE = 'Promise',
	      TypeError = global.TypeError,
	      process = global.process,
	      $Promise = global[PROMISE],
	      process = global.process,
	      isNode = classof(process) == 'process',
	      empty = function empty() {/* empty */},
	      Internal,
	      GenericPromiseCapability,
	      Wrapper;

	  var USE_NATIVE = !!function () {
	    try {
	      // correct subclassing with @@species support
	      var promise = $Promise.resolve(1),
	          FakePromise = (promise.constructor = {})[interopDefault(require$$0$4)('species')] = function (exec) {
	        exec(empty, empty);
	      };
	      // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	      return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	    } catch (e) {/* empty */}
	  }();

	  // helpers
	  var sameConstructor = function sameConstructor(a, b) {
	    // with library wrapper special case
	    return a === b || a === $Promise && b === Wrapper;
	  };
	  var isThenable = function isThenable(it) {
	    var then;
	    return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	  };
	  var newPromiseCapability = function newPromiseCapability(C) {
	    return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
	  };
	  var PromiseCapability = GenericPromiseCapability = function GenericPromiseCapability(C) {
	    var resolve, reject;
	    this.promise = new C(function ($$resolve, $$reject) {
	      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	      resolve = $$resolve;
	      reject = $$reject;
	    });
	    this.resolve = aFunction(resolve);
	    this.reject = aFunction(reject);
	  };
	  var perform = function perform(exec) {
	    try {
	      exec();
	    } catch (e) {
	      return { error: e };
	    }
	  };
	  var notify = function notify(promise, isReject) {
	    if (promise._n) return;
	    promise._n = true;
	    var chain = promise._c;
	    microtask(function () {
	      var value = promise._v,
	          ok = promise._s == 1,
	          i = 0;
	      var run = function run(reaction) {
	        var handler = ok ? reaction.ok : reaction.fail,
	            resolve = reaction.resolve,
	            reject = reaction.reject,
	            domain = reaction.domain,
	            result,
	            then;
	        try {
	          if (handler) {
	            if (!ok) {
	              if (promise._h == 2) onHandleUnhandled(promise);
	              promise._h = 1;
	            }
	            if (handler === true) result = value;else {
	              if (domain) domain.enter();
	              result = handler(value);
	              if (domain) domain.exit();
	            }
	            if (result === reaction.promise) {
	              reject(TypeError('Promise-chain cycle'));
	            } else if (then = isThenable(result)) {
	              then.call(result, resolve, reject);
	            } else resolve(result);
	          } else reject(value);
	        } catch (e) {
	          reject(e);
	        }
	      };
	      while (chain.length > i) {
	        run(chain[i++]);
	      } // variable length - can't use forEach
	      promise._c = [];
	      promise._n = false;
	      if (isReject && !promise._h) onUnhandled(promise);
	    });
	  };
	  var onUnhandled = function onUnhandled(promise) {
	    task.call(global, function () {
	      var value = promise._v,
	          abrupt,
	          handler,
	          console;
	      if (isUnhandled(promise)) {
	        abrupt = perform(function () {
	          if (isNode) {
	            process.emit('unhandledRejection', value, promise);
	          } else if (handler = global.onunhandledrejection) {
	            handler({ promise: promise, reason: value });
	          } else if ((console = global.console) && console.error) {
	            console.error('Unhandled promise rejection', value);
	          }
	        });
	        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	        promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	      }promise._a = undefined;
	      if (abrupt) throw abrupt.error;
	    });
	  };
	  var isUnhandled = function isUnhandled(promise) {
	    if (promise._h == 1) return false;
	    var chain = promise._a || promise._c,
	        i = 0,
	        reaction;
	    while (chain.length > i) {
	      reaction = chain[i++];
	      if (reaction.fail || !isUnhandled(reaction.promise)) return false;
	    }return true;
	  };
	  var onHandleUnhandled = function onHandleUnhandled(promise) {
	    task.call(global, function () {
	      var handler;
	      if (isNode) {
	        process.emit('rejectionHandled', promise);
	      } else if (handler = global.onrejectionhandled) {
	        handler({ promise: promise, reason: promise._v });
	      }
	    });
	  };
	  var $reject = function $reject(value) {
	    var promise = this;
	    if (promise._d) return;
	    promise._d = true;
	    promise = promise._w || promise; // unwrap
	    promise._v = value;
	    promise._s = 2;
	    if (!promise._a) promise._a = promise._c.slice();
	    notify(promise, true);
	  };
	  var $resolve = function $resolve(value) {
	    var promise = this,
	        then;
	    if (promise._d) return;
	    promise._d = true;
	    promise = promise._w || promise; // unwrap
	    try {
	      if (promise === value) throw TypeError("Promise can't be resolved itself");
	      if (then = isThenable(value)) {
	        microtask(function () {
	          var wrapper = { _w: promise, _d: false }; // wrap
	          try {
	            then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	          } catch (e) {
	            $reject.call(wrapper, e);
	          }
	        });
	      } else {
	        promise._v = value;
	        promise._s = 1;
	        notify(promise, false);
	      }
	    } catch (e) {
	      $reject.call({ _w: promise, _d: false }, e); // wrap
	    }
	  };

	  // constructor polyfill
	  if (!USE_NATIVE) {
	    // 25.4.3.1 Promise(executor)
	    $Promise = function Promise(executor) {
	      anInstance(this, $Promise, PROMISE, '_h');
	      aFunction(executor);
	      Internal.call(this);
	      try {
	        executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	      } catch (err) {
	        $reject.call(this, err);
	      }
	    };
	    Internal = function Promise(executor) {
	      this._c = []; // <- awaiting reactions
	      this._a = undefined; // <- checked in isUnhandled reactions
	      this._s = 0; // <- state
	      this._d = false; // <- done
	      this._v = undefined; // <- value
	      this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	      this._n = false; // <- notify
	    };
	    Internal.prototype = interopDefault(require$$3$7)($Promise.prototype, {
	      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	      then: function then(onFulfilled, onRejected) {
	        var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	        reaction.fail = typeof onRejected == 'function' && onRejected;
	        reaction.domain = isNode ? process.domain : undefined;
	        this._c.push(reaction);
	        if (this._a) this._a.push(reaction);
	        if (this._s) notify(this, false);
	        return reaction.promise;
	      },
	      // 25.4.5.1 Promise.prototype.catch(onRejected)
	      'catch': function _catch(onRejected) {
	        return this.then(undefined, onRejected);
	      }
	    });
	    PromiseCapability = function PromiseCapability() {
	      var promise = new Internal();
	      this.promise = promise;
	      this.resolve = ctx($resolve, promise, 1);
	      this.reject = ctx($reject, promise, 1);
	    };
	  }

	  $export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	  interopDefault(require$$0$3)($Promise, PROMISE);
	  interopDefault(require$$0$35)(PROMISE);
	  Wrapper = interopDefault(require$$0)[PROMISE];

	  // statics
	  $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	    // 25.4.4.5 Promise.reject(r)
	    reject: function reject(r) {
	      var capability = newPromiseCapability(this),
	          $$reject = capability.reject;
	      $$reject(r);
	      return capability.promise;
	    }
	  });
	  $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	    // 25.4.4.6 Promise.resolve(x)
	    resolve: function resolve(x) {
	      // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	      if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
	      var capability = newPromiseCapability(this),
	          $$resolve = capability.resolve;
	      $$resolve(x);
	      return capability.promise;
	    }
	  });
	  $export($export.S + $export.F * !(USE_NATIVE && interopDefault(require$$5$2)(function (iter) {
	    $Promise.all(iter)['catch'](empty);
	  })), PROMISE, {
	    // 25.4.4.1 Promise.all(iterable)
	    all: function all(iterable) {
	      var C = this,
	          capability = newPromiseCapability(C),
	          resolve = capability.resolve,
	          reject = capability.reject;
	      var abrupt = perform(function () {
	        var values = [],
	            index = 0,
	            remaining = 1;
	        forOf(iterable, false, function (promise) {
	          var $index = index++,
	              alreadyCalled = false;
	          values.push(undefined);
	          remaining++;
	          C.resolve(promise).then(function (value) {
	            if (alreadyCalled) return;
	            alreadyCalled = true;
	            values[$index] = value;
	            --remaining || resolve(values);
	          }, reject);
	        });
	        --remaining || resolve(values);
	      });
	      if (abrupt) reject(abrupt.error);
	      return capability.promise;
	    },
	    // 25.4.4.4 Promise.race(iterable)
	    race: function race(iterable) {
	      var C = this,
	          capability = newPromiseCapability(C),
	          reject = capability.reject;
	      var abrupt = perform(function () {
	        forOf(iterable, false, function (promise) {
	          C.resolve(promise).then(capability.resolve, reject);
	        });
	      });
	      if (abrupt) reject(abrupt.error);
	      return capability.promise;
	    }
	  });
	});

	interopDefault(es6_promise);

	var _collectionStrong = createCommonjsModule(function (module) {
	  'use strict';

	  var dP = interopDefault(require$$2$1).f,
	      create = interopDefault(require$$6$1),
	      redefineAll = interopDefault(require$$3$7),
	      ctx = interopDefault(require$$31),
	      anInstance = interopDefault(require$$4$6),
	      defined = interopDefault(require$$4$3),
	      forOf = interopDefault(require$$1$20),
	      $iterDefine = interopDefault(require$$4$4),
	      step = interopDefault(require$$3$6),
	      setSpecies = interopDefault(require$$0$35),
	      DESCRIPTORS = interopDefault(require$$1),
	      fastKey = interopDefault(require$$6).fastKey,
	      SIZE = DESCRIPTORS ? '_s' : 'size';

	  var getEntry = function getEntry(that, key) {
	    // fast case
	    var index = fastKey(key),
	        entry;
	    if (index !== 'F') return that._i[index];
	    // frozen object case
	    for (entry = that._f; entry; entry = entry.n) {
	      if (entry.k == key) return entry;
	    }
	  };

	  module.exports = {
	    getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	      var C = wrapper(function (that, iterable) {
	        anInstance(that, C, NAME, '_i');
	        that._i = create(null); // index
	        that._f = undefined; // first entry
	        that._l = undefined; // last entry
	        that[SIZE] = 0; // size
	        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	      });
	      redefineAll(C.prototype, {
	        // 23.1.3.1 Map.prototype.clear()
	        // 23.2.3.2 Set.prototype.clear()
	        clear: function clear() {
	          for (var that = this, data = that._i, entry = that._f; entry; entry = entry.n) {
	            entry.r = true;
	            if (entry.p) entry.p = entry.p.n = undefined;
	            delete data[entry.i];
	          }
	          that._f = that._l = undefined;
	          that[SIZE] = 0;
	        },
	        // 23.1.3.3 Map.prototype.delete(key)
	        // 23.2.3.4 Set.prototype.delete(value)
	        'delete': function _delete(key) {
	          var that = this,
	              entry = getEntry(that, key);
	          if (entry) {
	            var next = entry.n,
	                prev = entry.p;
	            delete that._i[entry.i];
	            entry.r = true;
	            if (prev) prev.n = next;
	            if (next) next.p = prev;
	            if (that._f == entry) that._f = next;
	            if (that._l == entry) that._l = prev;
	            that[SIZE]--;
	          }return !!entry;
	        },
	        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	        forEach: function forEach(callbackfn /*, that = undefined */) {
	          anInstance(this, C, 'forEach');
	          var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3),
	              entry;
	          while (entry = entry ? entry.n : this._f) {
	            f(entry.v, entry.k, this);
	            // revert to the last existing entry
	            while (entry && entry.r) {
	              entry = entry.p;
	            }
	          }
	        },
	        // 23.1.3.7 Map.prototype.has(key)
	        // 23.2.3.7 Set.prototype.has(value)
	        has: function has(key) {
	          return !!getEntry(this, key);
	        }
	      });
	      if (DESCRIPTORS) dP(C.prototype, 'size', {
	        get: function get() {
	          return defined(this[SIZE]);
	        }
	      });
	      return C;
	    },
	    def: function def(that, key, value) {
	      var entry = getEntry(that, key),
	          prev,
	          index;
	      // change existing entry
	      if (entry) {
	        entry.v = value;
	        // create new entry
	      } else {
	        that._l = entry = {
	          i: index = fastKey(key, true), // <- index
	          k: key, // <- key
	          v: value, // <- value
	          p: prev = that._l, // <- previous entry
	          n: undefined, // <- next entry
	          r: false // <- removed
	        };
	        if (!that._f) that._f = entry;
	        if (prev) prev.n = entry;
	        that[SIZE]++;
	        // add to index
	        if (index !== 'F') that._i[index] = entry;
	      }return that;
	    },
	    getEntry: getEntry,
	    setStrong: function setStrong(C, NAME, IS_MAP) {
	      // add .keys, .values, .entries, [@@iterator]
	      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	      $iterDefine(C, NAME, function (iterated, kind) {
	        this._t = iterated; // target
	        this._k = kind; // kind
	        this._l = undefined; // previous
	      }, function () {
	        var that = this,
	            kind = that._k,
	            entry = that._l;
	        // revert to the last existing entry
	        while (entry && entry.r) {
	          entry = entry.p;
	        } // get next entry
	        if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	          // or finish the iteration
	          that._t = undefined;
	          return step(1);
	        }
	        // return step by kind
	        if (kind == 'keys') return step(0, entry.k);
	        if (kind == 'values') return step(0, entry.v);
	        return step(0, [entry.k, entry.v]);
	      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	      // add [@@species], 23.1.2.2, 23.2.2.2
	      setSpecies(NAME);
	    }
	  };
	});

	var _collectionStrong$1 = interopDefault(_collectionStrong);
	var getConstructor = _collectionStrong.getConstructor;
	var def = _collectionStrong.def;
	var getEntry = _collectionStrong.getEntry;
	var setStrong = _collectionStrong.setStrong;

var require$$1$21 = Object.freeze({
	  default: _collectionStrong$1,
	  getConstructor: getConstructor,
	  def: def,
	  getEntry: getEntry,
	  setStrong: setStrong
	});

	var _collection = createCommonjsModule(function (module) {
	  'use strict';

	  var global = interopDefault(require$$3),
	      $export = interopDefault(require$$1$2),
	      redefine = interopDefault(require$$4$2),
	      redefineAll = interopDefault(require$$3$7),
	      meta = interopDefault(require$$6),
	      forOf = interopDefault(require$$1$20),
	      anInstance = interopDefault(require$$4$6),
	      isObject = interopDefault(require$$0$1),
	      fails = interopDefault(require$$1$1),
	      $iterDetect = interopDefault(require$$5$2),
	      setToStringTag = interopDefault(require$$0$3),
	      inheritIfRequired = interopDefault(require$$0$19);

	  module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	    var Base = global[NAME],
	        C = Base,
	        ADDER = IS_MAP ? 'set' : 'add',
	        proto = C && C.prototype,
	        O = {};
	    var fixMethod = function fixMethod(KEY) {
	      var fn = proto[KEY];
	      redefine(proto, KEY, KEY == 'delete' ? function (a) {
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) {
	        fn.call(this, a === 0 ? 0 : a);return this;
	      } : function set(a, b) {
	        fn.call(this, a === 0 ? 0 : a, b);return this;
	      });
	    };
	    if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
	      new C().entries().next();
	    }))) {
	      // create collection constructor
	      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	      redefineAll(C.prototype, methods);
	      meta.NEED = true;
	    } else {
	      var instance = new C()
	      // early implementations not supports chaining
	      ,
	          HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      ,
	          THROWS_ON_PRIMITIVES = fails(function () {
	        instance.has(1);
	      })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      ,
	          ACCEPT_ITERABLES = $iterDetect(function (iter) {
	        new C(iter);
	      }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      ,
	          BUGGY_ZERO = !IS_WEAK && fails(function () {
	        // V8 ~ Chromium 42- fails only with 5+ elements
	        var $instance = new C(),
	            index = 5;
	        while (index--) {
	          $instance[ADDER](index, index);
	        }return !$instance.has(-0);
	      });
	      if (!ACCEPT_ITERABLES) {
	        C = wrapper(function (target, iterable) {
	          anInstance(target, C, NAME);
	          var that = inheritIfRequired(new Base(), target, C);
	          if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	          return that;
	        });
	        C.prototype = proto;
	        proto.constructor = C;
	      }
	      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	        fixMethod('delete');
	        fixMethod('has');
	        IS_MAP && fixMethod('get');
	      }
	      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	      // weak collections should not contains .clear method
	      if (IS_WEAK && proto.clear) delete proto.clear;
	    }

	    setToStringTag(C, NAME);

	    O[NAME] = C;
	    $export($export.G + $export.W + $export.F * (C != Base), O);

	    if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	    return C;
	  };
	});

	var _collection$1 = interopDefault(_collection);

var require$$0$37 = Object.freeze({
	  default: _collection$1
	});

	var es6_map = createCommonjsModule(function (module) {
	  'use strict';

	  var strong = interopDefault(require$$1$21);

	  // 23.1 Map Objects
	  module.exports = interopDefault(require$$0$37)('Map', function (get) {
	    return function Map() {
	      return get(this, arguments.length > 0 ? arguments[0] : undefined);
	    };
	  }, {
	    // 23.1.3.6 Map.prototype.get(key)
	    get: function get(key) {
	      var entry = strong.getEntry(this, key);
	      return entry && entry.v;
	    },
	    // 23.1.3.9 Map.prototype.set(key, value)
	    set: function set(key, value) {
	      return strong.def(this, key === 0 ? 0 : key, value);
	    }
	  }, strong, true);
	});

	var es6_map$1 = interopDefault(es6_map);

var require$$3$8 = Object.freeze({
	  default: es6_map$1
	});

	var es6_set = createCommonjsModule(function (module) {
	  'use strict';

	  var strong = interopDefault(require$$1$21);

	  // 23.2 Set Objects
	  module.exports = interopDefault(require$$0$37)('Set', function (get) {
	    return function Set() {
	      return get(this, arguments.length > 0 ? arguments[0] : undefined);
	    };
	  }, {
	    // 23.2.3.1 Set.prototype.add(value)
	    add: function add(value) {
	      return strong.def(this, value = value === 0 ? 0 : value, value);
	    }
	  }, strong);
	});

	var es6_set$1 = interopDefault(es6_set);

var require$$4$7 = Object.freeze({
	  default: es6_set$1
	});

	var _collectionWeak = createCommonjsModule(function (module) {
	  'use strict';

	  var redefineAll = interopDefault(require$$3$7),
	      getWeak = interopDefault(require$$6).getWeak,
	      anObject = interopDefault(require$$5),
	      isObject = interopDefault(require$$0$1),
	      anInstance = interopDefault(require$$4$6),
	      forOf = interopDefault(require$$1$20),
	      createArrayMethod = interopDefault(require$$10),
	      $has = interopDefault(require$$4),
	      arrayFind = createArrayMethod(5),
	      arrayFindIndex = createArrayMethod(6),
	      id = 0;

	  // fallback for uncaught frozen keys
	  var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
	    return that._l || (that._l = new UncaughtFrozenStore());
	  };
	  var UncaughtFrozenStore = function UncaughtFrozenStore() {
	    this.a = [];
	  };
	  var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
	    return arrayFind(store.a, function (it) {
	      return it[0] === key;
	    });
	  };
	  UncaughtFrozenStore.prototype = {
	    get: function get(key) {
	      var entry = findUncaughtFrozen(this, key);
	      if (entry) return entry[1];
	    },
	    has: function has(key) {
	      return !!findUncaughtFrozen(this, key);
	    },
	    set: function set(key, value) {
	      var entry = findUncaughtFrozen(this, key);
	      if (entry) entry[1] = value;else this.a.push([key, value]);
	    },
	    'delete': function _delete(key) {
	      var index = arrayFindIndex(this.a, function (it) {
	        return it[0] === key;
	      });
	      if (~index) this.a.splice(index, 1);
	      return !!~index;
	    }
	  };

	  module.exports = {
	    getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	      var C = wrapper(function (that, iterable) {
	        anInstance(that, C, NAME, '_i');
	        that._i = id++; // collection id
	        that._l = undefined; // leak store for uncaught frozen objects
	        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	      });
	      redefineAll(C.prototype, {
	        // 23.3.3.2 WeakMap.prototype.delete(key)
	        // 23.4.3.3 WeakSet.prototype.delete(value)
	        'delete': function _delete(key) {
	          if (!isObject(key)) return false;
	          var data = getWeak(key);
	          if (data === true) return uncaughtFrozenStore(this)['delete'](key);
	          return data && $has(data, this._i) && delete data[this._i];
	        },
	        // 23.3.3.4 WeakMap.prototype.has(key)
	        // 23.4.3.4 WeakSet.prototype.has(value)
	        has: function has(key) {
	          if (!isObject(key)) return false;
	          var data = getWeak(key);
	          if (data === true) return uncaughtFrozenStore(this).has(key);
	          return data && $has(data, this._i);
	        }
	      });
	      return C;
	    },
	    def: function def(that, key, value) {
	      var data = getWeak(anObject(key), true);
	      if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
	      return that;
	    },
	    ufstore: uncaughtFrozenStore
	  };
	});

	var _collectionWeak$1 = interopDefault(_collectionWeak);
	var getConstructor$1 = _collectionWeak.getConstructor;
	var def$1 = _collectionWeak.def;
	var ufstore = _collectionWeak.ufstore;

var require$$1$22 = Object.freeze({
	  default: _collectionWeak$1,
	  getConstructor: getConstructor$1,
	  def: def$1,
	  ufstore: ufstore
	});

	var es6_weakMap = createCommonjsModule(function (module) {
	  'use strict';

	  var each = interopDefault(require$$10)(0),
	      redefine = interopDefault(require$$4$2),
	      meta = interopDefault(require$$6),
	      assign = interopDefault(require$$3$4),
	      weak = interopDefault(require$$1$22),
	      isObject = interopDefault(require$$0$1),
	      getWeak = meta.getWeak,
	      isExtensible = Object.isExtensible,
	      uncaughtFrozenStore = weak.ufstore,
	      tmp = {},
	      InternalMap;

	  var wrapper = function wrapper(get) {
	    return function WeakMap() {
	      return get(this, arguments.length > 0 ? arguments[0] : undefined);
	    };
	  };

	  var methods = {
	    // 23.3.3.3 WeakMap.prototype.get(key)
	    get: function get(key) {
	      if (isObject(key)) {
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(this).get(key);
	        return data ? data[this._i] : undefined;
	      }
	    },
	    // 23.3.3.5 WeakMap.prototype.set(key, value)
	    set: function set(key, value) {
	      return weak.def(this, key, value);
	    }
	  };

	  // 23.3 WeakMap Objects
	  var $WeakMap = module.exports = interopDefault(require$$0$37)('WeakMap', wrapper, methods, weak, true, true);

	  // IE11 WeakMap frozen keys fix
	  if (new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
	    InternalMap = weak.getConstructor(wrapper);
	    assign(InternalMap.prototype, methods);
	    meta.NEED = true;
	    each(['delete', 'has', 'get', 'set'], function (key) {
	      var proto = $WeakMap.prototype,
	          method = proto[key];
	      redefine(proto, key, function (a, b) {
	        // store frozen objects on internal weakmap shim
	        if (isObject(a) && !isExtensible(a)) {
	          if (!this._f) this._f = new InternalMap();
	          var result = this._f[key](a, b);
	          return key == 'set' ? this : result;
	          // store all the rest on native weakmap
	        }return method.call(this, a, b);
	      });
	    });
	  }
	});

	var es6_weakMap$1 = interopDefault(es6_weakMap);

var require$$0$38 = Object.freeze({
	  default: es6_weakMap$1
	});

	var es6_weakSet = createCommonjsModule(function (module) {
	  'use strict';

	  var weak = interopDefault(require$$1$22);

	  // 23.4 WeakSet Objects
	  interopDefault(require$$0$37)('WeakSet', function (get) {
	    return function WeakSet() {
	      return get(this, arguments.length > 0 ? arguments[0] : undefined);
	    };
	  }, {
	    // 23.4.3.1 WeakSet.prototype.add(value)
	    add: function add(value) {
	      return weak.def(this, value, true);
	    }
	  }, weak, false, true);
	});

	interopDefault(es6_weakSet);

	var _typed = createCommonjsModule(function (module) {
	  var global = interopDefault(require$$3),
	      hide = interopDefault(require$$2),
	      uid = interopDefault(require$$12),
	      TYPED = uid('typed_array'),
	      VIEW = uid('view'),
	      ABV = !!(global.ArrayBuffer && global.DataView),
	      CONSTR = ABV,
	      i = 0,
	      l = 9,
	      Typed;

	  var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

	  while (i < l) {
	    if (Typed = global[TypedArrayConstructors[i++]]) {
	      hide(Typed.prototype, TYPED, true);
	      hide(Typed.prototype, VIEW, true);
	    } else CONSTR = false;
	  }

	  module.exports = {
	    ABV: ABV,
	    CONSTR: CONSTR,
	    TYPED: TYPED,
	    VIEW: VIEW
	  };
	});

	var _typed$1 = interopDefault(_typed);
	var ABV = _typed.ABV;
	var CONSTR = _typed.CONSTR;
	var TYPED = _typed.TYPED;
	var VIEW = _typed.VIEW;

var require$$33 = Object.freeze({
	  default: _typed$1,
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW
	});

	var _typedBuffer = createCommonjsModule(function (module, exports) {
	  'use strict';

	  var global = interopDefault(require$$3),
	      DESCRIPTORS = interopDefault(require$$1),
	      LIBRARY = interopDefault(require$$2$4),
	      $typed = interopDefault(require$$33),
	      hide = interopDefault(require$$2),
	      redefineAll = interopDefault(require$$3$7),
	      fails = interopDefault(require$$1$1),
	      anInstance = interopDefault(require$$4$6),
	      toInteger = interopDefault(require$$26),
	      toLength = interopDefault(require$$3$1),
	      gOPN = interopDefault(require$$3$3).f,
	      dP = interopDefault(require$$2$1).f,
	      arrayFill = interopDefault(require$$3$5),
	      setToStringTag = interopDefault(require$$0$3),
	      ARRAY_BUFFER = 'ArrayBuffer',
	      DATA_VIEW = 'DataView',
	      PROTOTYPE = 'prototype',
	      WRONG_LENGTH = 'Wrong length!',
	      WRONG_INDEX = 'Wrong index!',
	      $ArrayBuffer = global[ARRAY_BUFFER],
	      $DataView = global[DATA_VIEW],
	      Math = global.Math,
	      RangeError = global.RangeError,
	      Infinity = global.Infinity,
	      BaseBuffer = $ArrayBuffer,
	      abs = Math.abs,
	      pow = Math.pow,
	      floor = Math.floor,
	      log = Math.log,
	      LN2 = Math.LN2,
	      BUFFER = 'buffer',
	      BYTE_LENGTH = 'byteLength',
	      BYTE_OFFSET = 'byteOffset',
	      $BUFFER = DESCRIPTORS ? '_b' : BUFFER,
	      $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH,
	      $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

	  // IEEE754 conversions based on https://github.com/feross/ieee754
	  var packIEEE754 = function packIEEE754(value, mLen, nBytes) {
	    var buffer = Array(nBytes),
	        eLen = nBytes * 8 - mLen - 1,
	        eMax = (1 << eLen) - 1,
	        eBias = eMax >> 1,
	        rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0,
	        i = 0,
	        s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0,
	        e,
	        m,
	        c;
	    value = abs(value);
	    if (value != value || value === Infinity) {
	      m = value != value ? 1 : 0;
	      e = eMax;
	    } else {
	      e = floor(log(value) / LN2);
	      if (value * (c = pow(2, -e)) < 1) {
	        e--;
	        c *= 2;
	      }
	      if (e + eBias >= 1) {
	        value += rt / c;
	      } else {
	        value += rt * pow(2, 1 - eBias);
	      }
	      if (value * c >= 2) {
	        e++;
	        c /= 2;
	      }
	      if (e + eBias >= eMax) {
	        m = 0;
	        e = eMax;
	      } else if (e + eBias >= 1) {
	        m = (value * c - 1) * pow(2, mLen);
	        e = e + eBias;
	      } else {
	        m = value * pow(2, eBias - 1) * pow(2, mLen);
	        e = 0;
	      }
	    }
	    for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {}
	    e = e << mLen | m;
	    eLen += mLen;
	    for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {}
	    buffer[--i] |= s * 128;
	    return buffer;
	  };
	  var unpackIEEE754 = function unpackIEEE754(buffer, mLen, nBytes) {
	    var eLen = nBytes * 8 - mLen - 1,
	        eMax = (1 << eLen) - 1,
	        eBias = eMax >> 1,
	        nBits = eLen - 7,
	        i = nBytes - 1,
	        s = buffer[i--],
	        e = s & 127,
	        m;
	    s >>= 7;
	    for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {}
	    m = e & (1 << -nBits) - 1;
	    e >>= -nBits;
	    nBits += mLen;
	    for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {}
	    if (e === 0) {
	      e = 1 - eBias;
	    } else if (e === eMax) {
	      return m ? NaN : s ? -Infinity : Infinity;
	    } else {
	      m = m + pow(2, mLen);
	      e = e - eBias;
	    }return (s ? -1 : 1) * m * pow(2, e - mLen);
	  };

	  var unpackI32 = function unpackI32(bytes) {
	    return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	  };
	  var packI8 = function packI8(it) {
	    return [it & 0xff];
	  };
	  var packI16 = function packI16(it) {
	    return [it & 0xff, it >> 8 & 0xff];
	  };
	  var packI32 = function packI32(it) {
	    return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	  };
	  var packF64 = function packF64(it) {
	    return packIEEE754(it, 52, 8);
	  };
	  var packF32 = function packF32(it) {
	    return packIEEE754(it, 23, 4);
	  };

	  var addGetter = function addGetter(C, key, internal) {
	    dP(C[PROTOTYPE], key, { get: function get() {
	        return this[internal];
	      } });
	  };

	  var get = function get(view, bytes, index, isLittleEndian) {
	    var numIndex = +index,
	        intIndex = toInteger(numIndex);
	    if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	    var store = view[$BUFFER]._b,
	        start = intIndex + view[$OFFSET],
	        pack = store.slice(start, start + bytes);
	    return isLittleEndian ? pack : pack.reverse();
	  };
	  var set = function set(view, bytes, index, conversion, value, isLittleEndian) {
	    var numIndex = +index,
	        intIndex = toInteger(numIndex);
	    if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	    var store = view[$BUFFER]._b,
	        start = intIndex + view[$OFFSET],
	        pack = conversion(+value);
	    for (var i = 0; i < bytes; i++) {
	      store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	    }
	  };

	  var validateArrayBufferArguments = function validateArrayBufferArguments(that, length) {
	    anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
	    var numberLength = +length,
	        byteLength = toLength(numberLength);
	    if (numberLength != byteLength) throw RangeError(WRONG_LENGTH);
	    return byteLength;
	  };

	  if (!$typed.ABV) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      var byteLength = validateArrayBufferArguments(this, length);
	      this._b = arrayFill.call(Array(byteLength), 0);
	      this[$LENGTH] = byteLength;
	    };

	    $DataView = function DataView(buffer, byteOffset, byteLength) {
	      anInstance(this, $DataView, DATA_VIEW);
	      anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	      var bufferLength = buffer[$LENGTH],
	          offset = toInteger(byteOffset);
	      if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
	      byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	      if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
	      this[$BUFFER] = buffer;
	      this[$OFFSET] = offset;
	      this[$LENGTH] = byteLength;
	    };

	    if (DESCRIPTORS) {
	      addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	      addGetter($DataView, BUFFER, '_b');
	      addGetter($DataView, BYTE_LENGTH, '_l');
	      addGetter($DataView, BYTE_OFFSET, '_o');
	    }

	    redefineAll($DataView[PROTOTYPE], {
	      getInt8: function getInt8(byteOffset) {
	        return get(this, 1, byteOffset)[0] << 24 >> 24;
	      },
	      getUint8: function getUint8(byteOffset) {
	        return get(this, 1, byteOffset)[0];
	      },
	      getInt16: function getInt16(byteOffset /*, littleEndian */) {
	        var bytes = get(this, 2, byteOffset, arguments[1]);
	        return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	      },
	      getUint16: function getUint16(byteOffset /*, littleEndian */) {
	        var bytes = get(this, 2, byteOffset, arguments[1]);
	        return bytes[1] << 8 | bytes[0];
	      },
	      getInt32: function getInt32(byteOffset /*, littleEndian */) {
	        return unpackI32(get(this, 4, byteOffset, arguments[1]));
	      },
	      getUint32: function getUint32(byteOffset /*, littleEndian */) {
	        return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	      },
	      getFloat32: function getFloat32(byteOffset /*, littleEndian */) {
	        return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	      },
	      getFloat64: function getFloat64(byteOffset /*, littleEndian */) {
	        return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	      },
	      setInt8: function setInt8(byteOffset, value) {
	        set(this, 1, byteOffset, packI8, value);
	      },
	      setUint8: function setUint8(byteOffset, value) {
	        set(this, 1, byteOffset, packI8, value);
	      },
	      setInt16: function setInt16(byteOffset, value /*, littleEndian */) {
	        set(this, 2, byteOffset, packI16, value, arguments[2]);
	      },
	      setUint16: function setUint16(byteOffset, value /*, littleEndian */) {
	        set(this, 2, byteOffset, packI16, value, arguments[2]);
	      },
	      setInt32: function setInt32(byteOffset, value /*, littleEndian */) {
	        set(this, 4, byteOffset, packI32, value, arguments[2]);
	      },
	      setUint32: function setUint32(byteOffset, value /*, littleEndian */) {
	        set(this, 4, byteOffset, packI32, value, arguments[2]);
	      },
	      setFloat32: function setFloat32(byteOffset, value /*, littleEndian */) {
	        set(this, 4, byteOffset, packF32, value, arguments[2]);
	      },
	      setFloat64: function setFloat64(byteOffset, value /*, littleEndian */) {
	        set(this, 8, byteOffset, packF64, value, arguments[2]);
	      }
	    });
	  } else {
	    if (!fails(function () {
	      new $ArrayBuffer(); // eslint-disable-line no-new
	    }) || !fails(function () {
	      new $ArrayBuffer(.5); // eslint-disable-line no-new
	    })) {
	      $ArrayBuffer = function ArrayBuffer(length) {
	        return new BaseBuffer(validateArrayBufferArguments(this, length));
	      };
	      var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	      for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
	        if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
	      };
	      if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
	    }
	    // iOS Safari 7.x bug
	    var view = new $DataView(new $ArrayBuffer(2)),
	        $setInt8 = $DataView[PROTOTYPE].setInt8;
	    view.setInt8(0, 2147483648);
	    view.setInt8(1, 2147483649);
	    if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
	      setInt8: function setInt8(byteOffset, value) {
	        $setInt8.call(this, byteOffset, value << 24 >> 24);
	      },
	      setUint8: function setUint8(byteOffset, value) {
	        $setInt8.call(this, byteOffset, value << 24 >> 24);
	      }
	    }, true);
	  }
	  setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	  setToStringTag($DataView, DATA_VIEW);
	  hide($DataView[PROTOTYPE], $typed.VIEW, true);
	  exports[ARRAY_BUFFER] = $ArrayBuffer;
	  exports[DATA_VIEW] = $DataView;
	});

	var _typedBuffer$1 = interopDefault(_typedBuffer);

var require$$32 = Object.freeze({
	  default: _typedBuffer$1
	});

	var es6_typed_arrayBuffer = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $typed = interopDefault(require$$33),
	      buffer = interopDefault(require$$32),
	      anObject = interopDefault(require$$5),
	      toIndex = interopDefault(require$$24),
	      toLength = interopDefault(require$$3$1),
	      isObject = interopDefault(require$$0$1),
	      ArrayBuffer = interopDefault(require$$3).ArrayBuffer,
	      speciesConstructor = interopDefault(require$$8),
	      $ArrayBuffer = buffer.ArrayBuffer,
	      $DataView = buffer.DataView,
	      $isView = $typed.ABV && ArrayBuffer.isView,
	      $slice = $ArrayBuffer.prototype.slice,
	      VIEW = $typed.VIEW,
	      ARRAY_BUFFER = 'ArrayBuffer';

	  $export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

	  $export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
	    // 24.1.3.1 ArrayBuffer.isView(arg)
	    isView: function isView(it) {
	      return $isView && $isView(it) || isObject(it) && VIEW in it;
	    }
	  });

	  $export($export.P + $export.U + $export.F * interopDefault(require$$1$1)(function () {
	    return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	  }), ARRAY_BUFFER, {
	    // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	    slice: function slice(start, end) {
	      if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
	      var len = anObject(this).byteLength,
	          first = toIndex(start, len),
	          final = toIndex(end === undefined ? len : end, len),
	          result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first)),
	          viewS = new $DataView(this),
	          viewT = new $DataView(result),
	          index = 0;
	      while (first < final) {
	        viewT.setUint8(index++, viewS.getUint8(first++));
	      }return result;
	    }
	  });

	  interopDefault(require$$0$35)(ARRAY_BUFFER);
	});

	interopDefault(es6_typed_arrayBuffer);

	var es6_typed_dataView = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2);
	  $export($export.G + $export.W + $export.F * !interopDefault(require$$33).ABV, {
	    DataView: interopDefault(require$$32).DataView
	  });
	});

	interopDefault(es6_typed_dataView);

	var _typedArray = createCommonjsModule(function (module) {
	  'use strict';

	  if (interopDefault(require$$1)) {
	    var LIBRARY = interopDefault(require$$2$4),
	        global = interopDefault(require$$3),
	        fails = interopDefault(require$$1$1),
	        $export = interopDefault(require$$1$2),
	        $typed = interopDefault(require$$33),
	        $buffer = interopDefault(require$$32),
	        ctx = interopDefault(require$$31),
	        anInstance = interopDefault(require$$4$6),
	        propertyDesc = interopDefault(require$$2$3),
	        hide = interopDefault(require$$2),
	        redefineAll = interopDefault(require$$3$7),
	        toInteger = interopDefault(require$$26),
	        toLength = interopDefault(require$$3$1),
	        toIndex = interopDefault(require$$24),
	        toPrimitive = interopDefault(require$$4$1),
	        has = interopDefault(require$$4),
	        same = interopDefault(require$$21),
	        classof = interopDefault(require$$1$11),
	        isObject = interopDefault(require$$0$1),
	        toObject = interopDefault(require$$5$1),
	        isArrayIter = interopDefault(require$$17),
	        create = interopDefault(require$$6$1),
	        getPrototypeOf = interopDefault(require$$0$13),
	        gOPN = interopDefault(require$$3$3).f,
	        getIterFn = interopDefault(require$$13),
	        uid = interopDefault(require$$12),
	        wks = interopDefault(require$$0$4),
	        createArrayMethod = interopDefault(require$$10),
	        createArrayIncludes = interopDefault(require$$1$9),
	        speciesConstructor = interopDefault(require$$8),
	        ArrayIterators = interopDefault(require$$5$3),
	        Iterators = interopDefault(require$$1$15),
	        $iterDetect = interopDefault(require$$5$2),
	        setSpecies = interopDefault(require$$0$35),
	        arrayFill = interopDefault(require$$3$5),
	        arrayCopyWithin = interopDefault(require$$2$9),
	        $DP = interopDefault(require$$2$1),
	        $GOPD = interopDefault(require$$2$7),
	        dP = $DP.f,
	        gOPD = $GOPD.f,
	        RangeError = global.RangeError,
	        TypeError = global.TypeError,
	        Uint8Array = global.Uint8Array,
	        ARRAY_BUFFER = 'ArrayBuffer',
	        SHARED_BUFFER = 'Shared' + ARRAY_BUFFER,
	        BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT',
	        PROTOTYPE = 'prototype',
	        ArrayProto = Array[PROTOTYPE],
	        $ArrayBuffer = $buffer.ArrayBuffer,
	        $DataView = $buffer.DataView,
	        arrayForEach = createArrayMethod(0),
	        arrayFilter = createArrayMethod(2),
	        arraySome = createArrayMethod(3),
	        arrayEvery = createArrayMethod(4),
	        arrayFind = createArrayMethod(5),
	        arrayFindIndex = createArrayMethod(6),
	        arrayIncludes = createArrayIncludes(true),
	        arrayIndexOf = createArrayIncludes(false),
	        arrayValues = ArrayIterators.values,
	        arrayKeys = ArrayIterators.keys,
	        arrayEntries = ArrayIterators.entries,
	        arrayLastIndexOf = ArrayProto.lastIndexOf,
	        arrayReduce = ArrayProto.reduce,
	        arrayReduceRight = ArrayProto.reduceRight,
	        arrayJoin = ArrayProto.join,
	        arraySort = ArrayProto.sort,
	        arraySlice = ArrayProto.slice,
	        arrayToString = ArrayProto.toString,
	        arrayToLocaleString = ArrayProto.toLocaleString,
	        ITERATOR = wks('iterator'),
	        TAG = wks('toStringTag'),
	        TYPED_CONSTRUCTOR = uid('typed_constructor'),
	        DEF_CONSTRUCTOR = uid('def_constructor'),
	        ALL_CONSTRUCTORS = $typed.CONSTR,
	        TYPED_ARRAY = $typed.TYPED,
	        VIEW = $typed.VIEW,
	        WRONG_LENGTH = 'Wrong length!';

	    var $map = createArrayMethod(1, function (O, length) {
	      return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	    });

	    var LITTLE_ENDIAN = fails(function () {
	      return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	    });

	    var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
	      new Uint8Array(1).set({});
	    });

	    var strictToLength = function strictToLength(it, SAME) {
	      if (it === undefined) throw TypeError(WRONG_LENGTH);
	      var number = +it,
	          length = toLength(it);
	      if (SAME && !same(number, length)) throw RangeError(WRONG_LENGTH);
	      return length;
	    };

	    var toOffset = function toOffset(it, BYTES) {
	      var offset = toInteger(it);
	      if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
	      return offset;
	    };

	    var validate = function validate(it) {
	      if (isObject(it) && TYPED_ARRAY in it) return it;
	      throw TypeError(it + ' is not a typed array!');
	    };

	    var allocate = function allocate(C, length) {
	      if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
	        throw TypeError('It is not a typed array constructor!');
	      }return new C(length);
	    };

	    var speciesFromList = function speciesFromList(O, list) {
	      return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	    };

	    var fromList = function fromList(C, list) {
	      var index = 0,
	          length = list.length,
	          result = allocate(C, length);
	      while (length > index) {
	        result[index] = list[index++];
	      }return result;
	    };

	    var addGetter = function addGetter(it, key, internal) {
	      dP(it, key, { get: function get() {
	          return this._d[internal];
	        } });
	    };

	    var $from = function from(source /*, mapfn, thisArg */) {
	      var O = toObject(source),
	          aLen = arguments.length,
	          mapfn = aLen > 1 ? arguments[1] : undefined,
	          mapping = mapfn !== undefined,
	          iterFn = getIterFn(O),
	          i,
	          length,
	          values,
	          result,
	          step,
	          iterator;
	      if (iterFn != undefined && !isArrayIter(iterFn)) {
	        for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	          values.push(step.value);
	        }O = values;
	      }
	      if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
	      for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
	        result[i] = mapping ? mapfn(O[i], i) : O[i];
	      }
	      return result;
	    };

	    var $of = function of() /*...items*/{
	      var index = 0,
	          length = arguments.length,
	          result = allocate(this, length);
	      while (length > index) {
	        result[index] = arguments[index++];
	      }return result;
	    };

	    // iOS Safari 6.x fails here
	    var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
	      arrayToLocaleString.call(new Uint8Array(1));
	    });

	    var $toLocaleString = function toLocaleString() {
	      return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	    };

	    var proto = {
	      copyWithin: function copyWithin(target, start /*, end */) {
	        return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	      },
	      every: function every(callbackfn /*, thisArg */) {
	        return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      fill: function fill(value /*, start, end */) {
	        // eslint-disable-line no-unused-vars
	        return arrayFill.apply(validate(this), arguments);
	      },
	      filter: function filter(callbackfn /*, thisArg */) {
	        return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
	      },
	      find: function find(predicate /*, thisArg */) {
	        return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      findIndex: function findIndex(predicate /*, thisArg */) {
	        return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      forEach: function forEach(callbackfn /*, thisArg */) {
	        arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      indexOf: function indexOf(searchElement /*, fromIndex */) {
	        return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      includes: function includes(searchElement /*, fromIndex */) {
	        return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      join: function join(separator) {
	        // eslint-disable-line no-unused-vars
	        return arrayJoin.apply(validate(this), arguments);
	      },
	      lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */) {
	        // eslint-disable-line no-unused-vars
	        return arrayLastIndexOf.apply(validate(this), arguments);
	      },
	      map: function map(mapfn /*, thisArg */) {
	        return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      reduce: function reduce(callbackfn /*, initialValue */) {
	        // eslint-disable-line no-unused-vars
	        return arrayReduce.apply(validate(this), arguments);
	      },
	      reduceRight: function reduceRight(callbackfn /*, initialValue */) {
	        // eslint-disable-line no-unused-vars
	        return arrayReduceRight.apply(validate(this), arguments);
	      },
	      reverse: function reverse() {
	        var that = this,
	            length = validate(that).length,
	            middle = Math.floor(length / 2),
	            index = 0,
	            value;
	        while (index < middle) {
	          value = that[index];
	          that[index++] = that[--length];
	          that[length] = value;
	        }return that;
	      },
	      some: function some(callbackfn /*, thisArg */) {
	        return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      sort: function sort(comparefn) {
	        return arraySort.call(validate(this), comparefn);
	      },
	      subarray: function subarray(begin, end) {
	        var O = validate(this),
	            length = O.length,
	            $begin = toIndex(begin, length);
	        return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toIndex(end, length)) - $begin));
	      }
	    };

	    var $slice = function slice(start, end) {
	      return speciesFromList(this, arraySlice.call(validate(this), start, end));
	    };

	    var $set = function set(arrayLike /*, offset */) {
	      validate(this);
	      var offset = toOffset(arguments[1], 1),
	          length = this.length,
	          src = toObject(arrayLike),
	          len = toLength(src.length),
	          index = 0;
	      if (len + offset > length) throw RangeError(WRONG_LENGTH);
	      while (index < len) {
	        this[offset + index] = src[index++];
	      }
	    };

	    var $iterators = {
	      entries: function entries() {
	        return arrayEntries.call(validate(this));
	      },
	      keys: function keys() {
	        return arrayKeys.call(validate(this));
	      },
	      values: function values() {
	        return arrayValues.call(validate(this));
	      }
	    };

	    var isTAIndex = function isTAIndex(target, key) {
	      return isObject(target) && target[TYPED_ARRAY] && (typeof key === 'undefined' ? 'undefined' : _typeof(key)) != 'symbol' && key in target && String(+key) == String(key);
	    };
	    var $getDesc = function getOwnPropertyDescriptor(target, key) {
	      return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
	    };
	    var $setDesc = function defineProperty(target, key, desc) {
	      if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
	        target[key] = desc.value;
	        return target;
	      } else return dP(target, key, desc);
	    };

	    if (!ALL_CONSTRUCTORS) {
	      $GOPD.f = $getDesc;
	      $DP.f = $setDesc;
	    }

	    $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	      getOwnPropertyDescriptor: $getDesc,
	      defineProperty: $setDesc
	    });

	    if (fails(function () {
	      arrayToString.call({});
	    })) {
	      arrayToString = arrayToLocaleString = function toString() {
	        return arrayJoin.call(this);
	      };
	    }

	    var $TypedArrayPrototype$ = redefineAll({}, proto);
	    redefineAll($TypedArrayPrototype$, $iterators);
	    hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	    redefineAll($TypedArrayPrototype$, {
	      slice: $slice,
	      set: $set,
	      constructor: function constructor() {/* noop */},
	      toString: arrayToString,
	      toLocaleString: $toLocaleString
	    });
	    addGetter($TypedArrayPrototype$, 'buffer', 'b');
	    addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	    addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	    addGetter($TypedArrayPrototype$, 'length', 'e');
	    dP($TypedArrayPrototype$, TAG, {
	      get: function get() {
	        return this[TYPED_ARRAY];
	      }
	    });

	    module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	      CLAMPED = !!CLAMPED;
	      var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array',
	          ISNT_UINT8 = NAME != 'Uint8Array',
	          GETTER = 'get' + KEY,
	          SETTER = 'set' + KEY,
	          TypedArray = global[NAME],
	          Base = TypedArray || {},
	          TAC = TypedArray && getPrototypeOf(TypedArray),
	          FORCED = !TypedArray || !$typed.ABV,
	          O = {},
	          TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	      var getter = function getter(that, index) {
	        var data = that._d;
	        return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	      };
	      var setter = function setter(that, index, value) {
	        var data = that._d;
	        if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	        data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	      };
	      var addElement = function addElement(that, index) {
	        dP(that, index, {
	          get: function get() {
	            return getter(this, index);
	          },
	          set: function set(value) {
	            return setter(this, index, value);
	          },
	          enumerable: true
	        });
	      };
	      if (FORCED) {
	        TypedArray = wrapper(function (that, data, $offset, $length) {
	          anInstance(that, TypedArray, NAME, '_d');
	          var index = 0,
	              offset = 0,
	              buffer,
	              byteLength,
	              length,
	              klass;
	          if (!isObject(data)) {
	            length = strictToLength(data, true);
	            byteLength = length * BYTES;
	            buffer = new $ArrayBuffer(byteLength);
	          } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	            buffer = data;
	            offset = toOffset($offset, BYTES);
	            var $len = data.byteLength;
	            if ($length === undefined) {
	              if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	              byteLength = $len - offset;
	              if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	            } else {
	              byteLength = toLength($length) * BYTES;
	              if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
	            }
	            length = byteLength / BYTES;
	          } else if (TYPED_ARRAY in data) {
	            return fromList(TypedArray, data);
	          } else {
	            return $from.call(TypedArray, data);
	          }
	          hide(that, '_d', {
	            b: buffer,
	            o: offset,
	            l: byteLength,
	            e: length,
	            v: new $DataView(buffer)
	          });
	          while (index < length) {
	            addElement(that, index++);
	          }
	        });
	        TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	        hide(TypedArrayPrototype, 'constructor', TypedArray);
	      } else if (!$iterDetect(function (iter) {
	        // V8 works with iterators, but fails in many other cases
	        // https://code.google.com/p/v8/issues/detail?id=4552
	        new TypedArray(null); // eslint-disable-line no-new
	        new TypedArray(iter); // eslint-disable-line no-new
	      }, true)) {
	        TypedArray = wrapper(function (that, data, $offset, $length) {
	          anInstance(that, TypedArray, NAME);
	          var klass;
	          // `ws` module bug, temporarily remove validation length for Uint8Array
	          // https://github.com/websockets/ws/pull/645
	          if (!isObject(data)) return new Base(strictToLength(data, ISNT_UINT8));
	          if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	            return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
	          }
	          if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	          return $from.call(TypedArray, data);
	        });
	        arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
	          if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
	        });
	        TypedArray[PROTOTYPE] = TypedArrayPrototype;
	        if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
	      }
	      var $nativeIterator = TypedArrayPrototype[ITERATOR],
	          CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined),
	          $iterator = $iterators.values;
	      hide(TypedArray, TYPED_CONSTRUCTOR, true);
	      hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	      hide(TypedArrayPrototype, VIEW, true);
	      hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	      if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	        dP(TypedArrayPrototype, TAG, {
	          get: function get() {
	            return NAME;
	          }
	        });
	      }

	      O[NAME] = TypedArray;

	      $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

	      $export($export.S, NAME, {
	        BYTES_PER_ELEMENT: BYTES,
	        from: $from,
	        of: $of
	      });

	      if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

	      $export($export.P, NAME, proto);

	      setSpecies(NAME);

	      $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

	      $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

	      $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, { toString: arrayToString });

	      $export($export.P + $export.F * fails(function () {
	        new TypedArray(1).slice();
	      }), NAME, { slice: $slice });

	      $export($export.P + $export.F * (fails(function () {
	        return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	      }) || !fails(function () {
	        TypedArrayPrototype.toLocaleString.call([1, 2]);
	      })), NAME, { toLocaleString: $toLocaleString });

	      Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	      if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
	    };
	  } else module.exports = function () {/* empty */};
	});

	var _typedArray$1 = interopDefault(_typedArray);



	var require$$0$39 = Object.freeze({
	  default: _typedArray$1
	});

	var es6_typed_int8Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Int8', 1, function (init) {
	    return function Int8Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_int8Array);

	var es6_typed_uint8Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Uint8', 1, function (init) {
	    return function Uint8Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_uint8Array);

	var es6_typed_uint8ClampedArray = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Uint8', 1, function (init) {
	    return function Uint8ClampedArray(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  }, true);
	});

	interopDefault(es6_typed_uint8ClampedArray);

	var es6_typed_int16Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Int16', 2, function (init) {
	    return function Int16Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_int16Array);

	var es6_typed_uint16Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Uint16', 2, function (init) {
	    return function Uint16Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_uint16Array);

	var es6_typed_int32Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Int32', 4, function (init) {
	    return function Int32Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_int32Array);

	var es6_typed_uint32Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Uint32', 4, function (init) {
	    return function Uint32Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_uint32Array);

	var es6_typed_float32Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Float32', 4, function (init) {
	    return function Float32Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_float32Array);

	var es6_typed_float64Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Float64', 8, function (init) {
	    return function Float64Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_float64Array);

	var es6_reflect_apply = createCommonjsModule(function (module) {
	  // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	  var $export = interopDefault(require$$1$2),
	      aFunction = interopDefault(require$$0$2),
	      anObject = interopDefault(require$$5),
	      rApply = (interopDefault(require$$3).Reflect || {}).apply,
	      fApply = Function.apply;
	  // MS Edge argumentsList argument is optional
	  $export($export.S + $export.F * !interopDefault(require$$1$1)(function () {
	    rApply(function () {});
	  }), 'Reflect', {
	    apply: function apply(target, thisArgument, argumentsList) {
	      var T = aFunction(target),
	          L = anObject(argumentsList);
	      return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	    }
	  });
	});

	interopDefault(es6_reflect_apply);

	var es6_reflect_construct = createCommonjsModule(function (module) {
	  // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	  var $export = interopDefault(require$$1$2),
	      create = interopDefault(require$$6$1),
	      aFunction = interopDefault(require$$0$2),
	      anObject = interopDefault(require$$5),
	      isObject = interopDefault(require$$0$1),
	      fails = interopDefault(require$$1$1),
	      bind = interopDefault(require$$1$12),
	      rConstruct = (interopDefault(require$$3).Reflect || {}).construct;

	  // MS Edge supports only 2 arguments and argumentsList argument is optional
	  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
	  var NEW_TARGET_BUG = fails(function () {
	    function F() {}
	    return !(rConstruct(function () {}, [], F) instanceof F);
	  });
	  var ARGS_BUG = !fails(function () {
	    rConstruct(function () {});
	  });

	  $export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	    construct: function construct(Target, args /*, newTarget*/) {
	      aFunction(Target);
	      anObject(args);
	      var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	      if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	      if (Target == newTarget) {
	        // w/o altered newTarget, optimization for 0-4 arguments
	        switch (args.length) {
	          case 0:
	            return new Target();
	          case 1:
	            return new Target(args[0]);
	          case 2:
	            return new Target(args[0], args[1]);
	          case 3:
	            return new Target(args[0], args[1], args[2]);
	          case 4:
	            return new Target(args[0], args[1], args[2], args[3]);
	        }
	        // w/o altered newTarget, lot of arguments case
	        var $args = [null];
	        $args.push.apply($args, args);
	        return new (bind.apply(Target, $args))();
	      }
	      // with altered newTarget, not support built-in constructors
	      var proto = newTarget.prototype,
	          instance = create(isObject(proto) ? proto : Object.prototype),
	          result = Function.apply.call(Target, instance, args);
	      return isObject(result) ? result : instance;
	    }
	  });
	});

	interopDefault(es6_reflect_construct);

	var es6_reflect_defineProperty = createCommonjsModule(function (module) {
	  // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	  var dP = interopDefault(require$$2$1),
	      $export = interopDefault(require$$1$2),
	      anObject = interopDefault(require$$5),
	      toPrimitive = interopDefault(require$$4$1);

	  // MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	  $export($export.S + $export.F * interopDefault(require$$1$1)(function () {
	    Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
	  }), 'Reflect', {
	    defineProperty: function defineProperty(target, propertyKey, attributes) {
	      anObject(target);
	      propertyKey = toPrimitive(propertyKey, true);
	      anObject(attributes);
	      try {
	        dP.f(target, propertyKey, attributes);
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }
	  });
	});

	interopDefault(es6_reflect_defineProperty);

	var es6_reflect_deleteProperty = createCommonjsModule(function (module) {
	  // 26.1.4 Reflect.deleteProperty(target, propertyKey)
	  var $export = interopDefault(require$$1$2),
	      gOPD = interopDefault(require$$2$7).f,
	      anObject = interopDefault(require$$5);

	  $export($export.S, 'Reflect', {
	    deleteProperty: function deleteProperty(target, propertyKey) {
	      var desc = gOPD(anObject(target), propertyKey);
	      return desc && !desc.configurable ? false : delete target[propertyKey];
	    }
	  });
	});

	interopDefault(es6_reflect_deleteProperty);

	var es6_reflect_enumerate = createCommonjsModule(function (module) {
	  'use strict';
	  // 26.1.5 Reflect.enumerate(target)

	  var $export = interopDefault(require$$1$2),
	      anObject = interopDefault(require$$5);
	  var Enumerate = function Enumerate(iterated) {
	    this._t = anObject(iterated); // target
	    this._i = 0; // next index
	    var keys = this._k = [] // keys
	    ,
	        key;
	    for (key in iterated) {
	      keys.push(key);
	    }
	  };
	  interopDefault(require$$0$26)(Enumerate, 'Object', function () {
	    var that = this,
	        keys = that._k,
	        key;
	    do {
	      if (that._i >= keys.length) return { value: undefined, done: true };
	    } while (!((key = keys[that._i++]) in that._t));
	    return { value: key, done: false };
	  });

	  $export($export.S, 'Reflect', {
	    enumerate: function enumerate(target) {
	      return new Enumerate(target);
	    }
	  });
	});

	interopDefault(es6_reflect_enumerate);

	var es6_reflect_get = createCommonjsModule(function (module) {
	  // 26.1.6 Reflect.get(target, propertyKey [, receiver])
	  var gOPD = interopDefault(require$$2$7),
	      getPrototypeOf = interopDefault(require$$0$13),
	      has = interopDefault(require$$4),
	      $export = interopDefault(require$$1$2),
	      isObject = interopDefault(require$$0$1),
	      anObject = interopDefault(require$$5);

	  function get(target, propertyKey /*, receiver*/) {
	    var receiver = arguments.length < 3 ? target : arguments[2],
	        desc,
	        proto;
	    if (anObject(target) === receiver) return target[propertyKey];
	    if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
	    if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
	  }

	  $export($export.S, 'Reflect', { get: get });
	});

	interopDefault(es6_reflect_get);

	var es6_reflect_getOwnPropertyDescriptor = createCommonjsModule(function (module) {
	  // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	  var gOPD = interopDefault(require$$2$7),
	      $export = interopDefault(require$$1$2),
	      anObject = interopDefault(require$$5);

	  $export($export.S, 'Reflect', {
	    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	      return gOPD.f(anObject(target), propertyKey);
	    }
	  });
	});

	interopDefault(es6_reflect_getOwnPropertyDescriptor);

	var es6_reflect_getPrototypeOf = createCommonjsModule(function (module) {
	  // 26.1.8 Reflect.getPrototypeOf(target)
	  var $export = interopDefault(require$$1$2),
	      getProto = interopDefault(require$$0$13),
	      anObject = interopDefault(require$$5);

	  $export($export.S, 'Reflect', {
	    getPrototypeOf: function getPrototypeOf(target) {
	      return getProto(anObject(target));
	    }
	  });
	});

	interopDefault(es6_reflect_getPrototypeOf);

	var es6_reflect_has = createCommonjsModule(function (module) {
	  // 26.1.9 Reflect.has(target, propertyKey)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Reflect', {
	    has: function has(target, propertyKey) {
	      return propertyKey in target;
	    }
	  });
	});

	interopDefault(es6_reflect_has);

	var es6_reflect_isExtensible = createCommonjsModule(function (module) {
	  // 26.1.10 Reflect.isExtensible(target)
	  var $export = interopDefault(require$$1$2),
	      anObject = interopDefault(require$$5),
	      $isExtensible = Object.isExtensible;

	  $export($export.S, 'Reflect', {
	    isExtensible: function isExtensible(target) {
	      anObject(target);
	      return $isExtensible ? $isExtensible(target) : true;
	    }
	  });
	});

	interopDefault(es6_reflect_isExtensible);

	var _ownKeys = createCommonjsModule(function (module) {
	  // all object keys, includes non-enumerable and symbols
	  var gOPN = interopDefault(require$$3$3),
	      gOPS = interopDefault(require$$2$6),
	      anObject = interopDefault(require$$5),
	      Reflect = interopDefault(require$$3).Reflect;
	  module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
	    var keys = gOPN.f(anObject(it)),
	        getSymbols = gOPS.f;
	    return getSymbols ? keys.concat(getSymbols(it)) : keys;
	  };
	});

	var _ownKeys$1 = interopDefault(_ownKeys);

var require$$3$9 = Object.freeze({
	  default: _ownKeys$1
	});

	var es6_reflect_ownKeys = createCommonjsModule(function (module) {
	  // 26.1.11 Reflect.ownKeys(target)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Reflect', { ownKeys: interopDefault(require$$3$9) });
	});

	interopDefault(es6_reflect_ownKeys);

	var es6_reflect_preventExtensions = createCommonjsModule(function (module) {
	  // 26.1.12 Reflect.preventExtensions(target)
	  var $export = interopDefault(require$$1$2),
	      anObject = interopDefault(require$$5),
	      $preventExtensions = Object.preventExtensions;

	  $export($export.S, 'Reflect', {
	    preventExtensions: function preventExtensions(target) {
	      anObject(target);
	      try {
	        if ($preventExtensions) $preventExtensions(target);
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }
	  });
	});

	interopDefault(es6_reflect_preventExtensions);

	var es6_reflect_set = createCommonjsModule(function (module) {
	  // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	  var dP = interopDefault(require$$2$1),
	      gOPD = interopDefault(require$$2$7),
	      getPrototypeOf = interopDefault(require$$0$13),
	      has = interopDefault(require$$4),
	      $export = interopDefault(require$$1$2),
	      createDesc = interopDefault(require$$2$3),
	      anObject = interopDefault(require$$5),
	      isObject = interopDefault(require$$0$1);

	  function set(target, propertyKey, V /*, receiver*/) {
	    var receiver = arguments.length < 4 ? target : arguments[3],
	        ownDesc = gOPD.f(anObject(target), propertyKey),
	        existingDescriptor,
	        proto;
	    if (!ownDesc) {
	      if (isObject(proto = getPrototypeOf(target))) {
	        return set(proto, propertyKey, V, receiver);
	      }
	      ownDesc = createDesc(0);
	    }
	    if (has(ownDesc, 'value')) {
	      if (ownDesc.writable === false || !isObject(receiver)) return false;
	      existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	      existingDescriptor.value = V;
	      dP.f(receiver, propertyKey, existingDescriptor);
	      return true;
	    }
	    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	  }

	  $export($export.S, 'Reflect', { set: set });
	});

	interopDefault(es6_reflect_set);

	var es6_reflect_setPrototypeOf = createCommonjsModule(function (module) {
	  // 26.1.14 Reflect.setPrototypeOf(target, proto)
	  var $export = interopDefault(require$$1$2),
	      setProto = interopDefault(require$$0$14);

	  if (setProto) $export($export.S, 'Reflect', {
	    setPrototypeOf: function setPrototypeOf(target, proto) {
	      setProto.check(target, proto);
	      try {
	        setProto.set(target, proto);
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }
	  });
	});

	interopDefault(es6_reflect_setPrototypeOf);

	var es7_array_includes = createCommonjsModule(function (module) {
	  'use strict';
	  // https://github.com/tc39/Array.prototype.includes

	  var $export = interopDefault(require$$1$2),
	      $includes = interopDefault(require$$1$9)(true);

	  $export($export.P, 'Array', {
	    includes: function includes(el /*, fromIndex = 0 */) {
	      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	    }
	  });

	  interopDefault(require$$0$34)('includes');
	});

	interopDefault(es7_array_includes);

	var es7_string_at = createCommonjsModule(function (module) {
	  'use strict';
	  // https://github.com/mathiasbynens/String.prototype.at

	  var $export = interopDefault(require$$1$2),
	      $at = interopDefault(require$$0$25)(true);

	  $export($export.P, 'String', {
	    at: function at(pos) {
	      return $at(this, pos);
	    }
	  });
	});

	interopDefault(es7_string_at);

	var _stringPad = createCommonjsModule(function (module) {
	  // https://github.com/tc39/proposal-string-pad-start-end
	  var toLength = interopDefault(require$$3$1),
	      repeat = interopDefault(require$$1$14),
	      defined = interopDefault(require$$4$3);

	  module.exports = function (that, maxLength, fillString, left) {
	    var S = String(defined(that)),
	        stringLength = S.length,
	        fillStr = fillString === undefined ? ' ' : String(fillString),
	        intMaxLength = toLength(maxLength);
	    if (intMaxLength <= stringLength || fillStr == '') return S;
	    var fillLen = intMaxLength - stringLength,
	        stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	    return left ? stringFiller + S : S + stringFiller;
	  };
	});

	var _stringPad$1 = interopDefault(_stringPad);

var require$$0$40 = Object.freeze({
	  default: _stringPad$1
	});

	var es7_string_padStart = createCommonjsModule(function (module) {
	  'use strict';
	  // https://github.com/tc39/proposal-string-pad-start-end

	  var $export = interopDefault(require$$1$2),
	      $pad = interopDefault(require$$0$40);

	  $export($export.P, 'String', {
	    padStart: function padStart(maxLength /*, fillString = ' ' */) {
	      return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	    }
	  });
	});

	interopDefault(es7_string_padStart);

	var es7_string_padEnd = createCommonjsModule(function (module) {
	  'use strict';
	  // https://github.com/tc39/proposal-string-pad-start-end

	  var $export = interopDefault(require$$1$2),
	      $pad = interopDefault(require$$0$40);

	  $export($export.P, 'String', {
	    padEnd: function padEnd(maxLength /*, fillString = ' ' */) {
	      return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	    }
	  });
	});

	interopDefault(es7_string_padEnd);

	var es7_string_trimLeft = createCommonjsModule(function (module) {
	  'use strict';
	  // https://github.com/sebmarkbage/ecmascript-string-left-right-trim

	  interopDefault(require$$0$16)('trimLeft', function ($trim) {
	    return function trimLeft() {
	      return $trim(this, 1);
	    };
	  }, 'trimStart');
	});

	interopDefault(es7_string_trimLeft);

	var es7_string_trimRight = createCommonjsModule(function (module) {
	  'use strict';
	  // https://github.com/sebmarkbage/ecmascript-string-left-right-trim

	  interopDefault(require$$0$16)('trimRight', function ($trim) {
	    return function trimRight() {
	      return $trim(this, 2);
	    };
	  }, 'trimEnd');
	});

	interopDefault(es7_string_trimRight);

	var es7_string_matchAll = createCommonjsModule(function (module) {
	  'use strict';
	  // https://tc39.github.io/String.prototype.matchAll/

	  var $export = interopDefault(require$$1$2),
	      defined = interopDefault(require$$4$3),
	      toLength = interopDefault(require$$3$1),
	      isRegExp = interopDefault(require$$2$8),
	      getFlags = interopDefault(require$$1$18),
	      RegExpProto = RegExp.prototype;

	  var $RegExpStringIterator = function $RegExpStringIterator(regexp, string) {
	    this._r = regexp;
	    this._s = string;
	  };

	  interopDefault(require$$0$26)($RegExpStringIterator, 'RegExp String', function next() {
	    var match = this._r.exec(this._s);
	    return { value: match, done: match === null };
	  });

	  $export($export.P, 'String', {
	    matchAll: function matchAll(regexp) {
	      defined(this);
	      if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
	      var S = String(this),
	          flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp),
	          rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	      rx.lastIndex = toLength(regexp.lastIndex);
	      return new $RegExpStringIterator(rx, S);
	    }
	  });
	});

	interopDefault(es7_string_matchAll);

	var es7_symbol_asyncIterator = createCommonjsModule(function (module) {
	  interopDefault(require$$0$5)('asyncIterator');
	});

	interopDefault(es7_symbol_asyncIterator);

	var es7_symbol_observable = createCommonjsModule(function (module) {
	  interopDefault(require$$0$5)('observable');
	});

	interopDefault(es7_symbol_observable);

	var es7_object_getOwnPropertyDescriptors = createCommonjsModule(function (module) {
	  // https://github.com/tc39/proposal-object-getownpropertydescriptors
	  var $export = interopDefault(require$$1$2),
	      ownKeys = interopDefault(require$$3$9),
	      toIObject = interopDefault(require$$1$7),
	      gOPD = interopDefault(require$$2$7),
	      createProperty = interopDefault(require$$0$30);

	  $export($export.S, 'Object', {
	    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	      var O = toIObject(object),
	          getDesc = gOPD.f,
	          keys = ownKeys(O),
	          result = {},
	          i = 0,
	          key;
	      while (keys.length > i) {
	        createProperty(result, key = keys[i++], getDesc(O, key));
	      }return result;
	    }
	  });
	});

	interopDefault(es7_object_getOwnPropertyDescriptors);

	var _objectToArray = createCommonjsModule(function (module) {
	  var getKeys = interopDefault(require$$2$5),
	      toIObject = interopDefault(require$$1$7),
	      isEnum = interopDefault(require$$0$9).f;
	  module.exports = function (isEntries) {
	    return function (it) {
	      var O = toIObject(it),
	          keys = getKeys(O),
	          length = keys.length,
	          i = 0,
	          result = [],
	          key;
	      while (length > i) {
	        if (isEnum.call(O, key = keys[i++])) {
	          result.push(isEntries ? [key, O[key]] : O[key]);
	        }
	      }return result;
	    };
	  };
	});

	var _objectToArray$1 = interopDefault(_objectToArray);

var require$$0$41 = Object.freeze({
	  default: _objectToArray$1
	});

	var es7_object_values = createCommonjsModule(function (module) {
	  // https://github.com/tc39/proposal-object-values-entries
	  var $export = interopDefault(require$$1$2),
	      $values = interopDefault(require$$0$41)(false);

	  $export($export.S, 'Object', {
	    values: function values(it) {
	      return $values(it);
	    }
	  });
	});

	interopDefault(es7_object_values);

	var es7_object_entries = createCommonjsModule(function (module) {
	  // https://github.com/tc39/proposal-object-values-entries
	  var $export = interopDefault(require$$1$2),
	      $entries = interopDefault(require$$0$41)(true);

	  $export($export.S, 'Object', {
	    entries: function entries(it) {
	      return $entries(it);
	    }
	  });
	});

	interopDefault(es7_object_entries);

	var _objectForcedPam = createCommonjsModule(function (module) {
	  // Forced replacement prototype accessors methods
	  module.exports = interopDefault(require$$2$4) || !interopDefault(require$$1$1)(function () {
	    var K = Math.random();
	    // In FF throws only define methods
	    __defineSetter__.call(null, K, function () {/* empty */});
	    delete interopDefault(require$$3)[K];
	  });
	});

	var _objectForcedPam$1 = interopDefault(_objectForcedPam);

var require$$0$42 = Object.freeze({
	  default: _objectForcedPam$1
	});

	var es7_object_defineGetter = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toObject = interopDefault(require$$5$1),
	      aFunction = interopDefault(require$$0$2),
	      $defineProperty = interopDefault(require$$2$1);

	  // B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	  interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$42), 'Object', {
	    __defineGetter__: function __defineGetter__(P, getter) {
	      $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
	    }
	  });
	});

	interopDefault(es7_object_defineGetter);

	var es7_object_defineSetter = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toObject = interopDefault(require$$5$1),
	      aFunction = interopDefault(require$$0$2),
	      $defineProperty = interopDefault(require$$2$1);

	  // B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	  interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$42), 'Object', {
	    __defineSetter__: function __defineSetter__(P, setter) {
	      $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
	    }
	  });
	});

	interopDefault(es7_object_defineSetter);

	var es7_object_lookupGetter = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toObject = interopDefault(require$$5$1),
	      toPrimitive = interopDefault(require$$4$1),
	      getPrototypeOf = interopDefault(require$$0$13),
	      getOwnPropertyDescriptor = interopDefault(require$$2$7).f;

	  // B.2.2.4 Object.prototype.__lookupGetter__(P)
	  interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$42), 'Object', {
	    __lookupGetter__: function __lookupGetter__(P) {
	      var O = toObject(this),
	          K = toPrimitive(P, true),
	          D;
	      do {
	        if (D = getOwnPropertyDescriptor(O, K)) return D.get;
	      } while (O = getPrototypeOf(O));
	    }
	  });
	});

	interopDefault(es7_object_lookupGetter);

	var es7_object_lookupSetter = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toObject = interopDefault(require$$5$1),
	      toPrimitive = interopDefault(require$$4$1),
	      getPrototypeOf = interopDefault(require$$0$13),
	      getOwnPropertyDescriptor = interopDefault(require$$2$7).f;

	  // B.2.2.5 Object.prototype.__lookupSetter__(P)
	  interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$42), 'Object', {
	    __lookupSetter__: function __lookupSetter__(P) {
	      var O = toObject(this),
	          K = toPrimitive(P, true),
	          D;
	      do {
	        if (D = getOwnPropertyDescriptor(O, K)) return D.set;
	      } while (O = getPrototypeOf(O));
	    }
	  });
	});

	interopDefault(es7_object_lookupSetter);

	var _arrayFromIterable = createCommonjsModule(function (module) {
	  var forOf = interopDefault(require$$1$20);

	  module.exports = function (iter, ITERATOR) {
	    var result = [];
	    forOf(iter, false, result.push, result, ITERATOR);
	    return result;
	  };
	});

	var _arrayFromIterable$1 = interopDefault(_arrayFromIterable);

var require$$3$10 = Object.freeze({
	  default: _arrayFromIterable$1
	});

	var _collectionToJson = createCommonjsModule(function (module) {
	  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
	  var classof = interopDefault(require$$1$11),
	      from = interopDefault(require$$3$10);
	  module.exports = function (NAME) {
	    return function toJSON() {
	      if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	      return from(this);
	    };
	  };
	});

	var _collectionToJson$1 = interopDefault(_collectionToJson);

var require$$0$43 = Object.freeze({
	  default: _collectionToJson$1
	});

	var es7_map_toJson = createCommonjsModule(function (module) {
	  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
	  var $export = interopDefault(require$$1$2);

	  $export($export.P + $export.R, 'Map', { toJSON: interopDefault(require$$0$43)('Map') });
	});

	interopDefault(es7_map_toJson);

	var es7_set_toJson = createCommonjsModule(function (module) {
	  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
	  var $export = interopDefault(require$$1$2);

	  $export($export.P + $export.R, 'Set', { toJSON: interopDefault(require$$0$43)('Set') });
	});

	interopDefault(es7_set_toJson);

	var es7_system_global = createCommonjsModule(function (module) {
	  // https://github.com/ljharb/proposal-global
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'System', { global: interopDefault(require$$3) });
	});

	interopDefault(es7_system_global);

	var es7_error_isError = createCommonjsModule(function (module) {
	  // https://github.com/ljharb/proposal-is-error
	  var $export = interopDefault(require$$1$2),
	      cof = interopDefault(require$$0$6);

	  $export($export.S, 'Error', {
	    isError: function isError(it) {
	      return cof(it) === 'Error';
	    }
	  });
	});

	interopDefault(es7_error_isError);

	var es7_math_iaddh = createCommonjsModule(function (module) {
	  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    iaddh: function iaddh(x0, x1, y0, y1) {
	      var $x0 = x0 >>> 0,
	          $x1 = x1 >>> 0,
	          $y0 = y0 >>> 0;
	      return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	    }
	  });
	});

	interopDefault(es7_math_iaddh);

	var es7_math_isubh = createCommonjsModule(function (module) {
	  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    isubh: function isubh(x0, x1, y0, y1) {
	      var $x0 = x0 >>> 0,
	          $x1 = x1 >>> 0,
	          $y0 = y0 >>> 0;
	      return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	    }
	  });
	});

	interopDefault(es7_math_isubh);

	var es7_math_imulh = createCommonjsModule(function (module) {
	  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    imulh: function imulh(u, v) {
	      var UINT16 = 0xffff,
	          $u = +u,
	          $v = +v,
	          u0 = $u & UINT16,
	          v0 = $v & UINT16,
	          u1 = $u >> 16,
	          v1 = $v >> 16,
	          t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	      return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	    }
	  });
	});

	interopDefault(es7_math_imulh);

	var es7_math_umulh = createCommonjsModule(function (module) {
	  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    umulh: function umulh(u, v) {
	      var UINT16 = 0xffff,
	          $u = +u,
	          $v = +v,
	          u0 = $u & UINT16,
	          v0 = $v & UINT16,
	          u1 = $u >>> 16,
	          v1 = $v >>> 16,
	          t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	      return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	    }
	  });
	});

	interopDefault(es7_math_umulh);

	var _metadata = createCommonjsModule(function (module) {
	  var Map = interopDefault(require$$3$8),
	      $export = interopDefault(require$$1$2),
	      shared = interopDefault(require$$1$4)('metadata'),
	      store = shared.store || (shared.store = new (interopDefault(require$$0$38))());

	  var getOrCreateMetadataMap = function getOrCreateMetadataMap(target, targetKey, create) {
	    var targetMetadata = store.get(target);
	    if (!targetMetadata) {
	      if (!create) return undefined;
	      store.set(target, targetMetadata = new Map());
	    }
	    var keyMetadata = targetMetadata.get(targetKey);
	    if (!keyMetadata) {
	      if (!create) return undefined;
	      targetMetadata.set(targetKey, keyMetadata = new Map());
	    }return keyMetadata;
	  };
	  var ordinaryHasOwnMetadata = function ordinaryHasOwnMetadata(MetadataKey, O, P) {
	    var metadataMap = getOrCreateMetadataMap(O, P, false);
	    return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	  };
	  var ordinaryGetOwnMetadata = function ordinaryGetOwnMetadata(MetadataKey, O, P) {
	    var metadataMap = getOrCreateMetadataMap(O, P, false);
	    return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	  };
	  var ordinaryDefineOwnMetadata = function ordinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	    getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	  };
	  var ordinaryOwnMetadataKeys = function ordinaryOwnMetadataKeys(target, targetKey) {
	    var metadataMap = getOrCreateMetadataMap(target, targetKey, false),
	        keys = [];
	    if (metadataMap) metadataMap.forEach(function (_, key) {
	      keys.push(key);
	    });
	    return keys;
	  };
	  var toMetaKey = function toMetaKey(it) {
	    return it === undefined || (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : String(it);
	  };
	  var exp = function exp(O) {
	    $export($export.S, 'Reflect', O);
	  };

	  module.exports = {
	    store: store,
	    map: getOrCreateMetadataMap,
	    has: ordinaryHasOwnMetadata,
	    get: ordinaryGetOwnMetadata,
	    set: ordinaryDefineOwnMetadata,
	    keys: ordinaryOwnMetadataKeys,
	    key: toMetaKey,
	    exp: exp
	  };
	});

	var _metadata$1 = interopDefault(_metadata);
	var store = _metadata.store;
	var map = _metadata.map;
	var has = _metadata.has;
	var get$1 = _metadata.get;
	var set$3 = _metadata.set;
	var keys = _metadata.keys;
	var key = _metadata.key;
	var exp = _metadata.exp;



	var require$$2$10 = Object.freeze({
	  default: _metadata$1,
	  store: store,
	  map: map,
	  has: has,
	  get: get$1,
	  set: set$3,
	  keys: keys,
	  key: key,
	  exp: exp
	});

	var es7_reflect_defineMetadata = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      toMetaKey = metadata.key,
	      ordinaryDefineOwnMetadata = metadata.set;

	  metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	      ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	    } });
	});

	interopDefault(es7_reflect_defineMetadata);

	var es7_reflect_deleteMetadata = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      toMetaKey = metadata.key,
	      getOrCreateMetadataMap = metadata.map,
	      store = metadata.store;

	  metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */) {
	      var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]),
	          metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	      if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
	      if (metadataMap.size) return true;
	      var targetMetadata = store.get(target);
	      targetMetadata['delete'](targetKey);
	      return !!targetMetadata.size || store['delete'](target);
	    } });
	});

	interopDefault(es7_reflect_deleteMetadata);

	var es7_reflect_getMetadata = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      getPrototypeOf = interopDefault(require$$0$13),
	      ordinaryHasOwnMetadata = metadata.has,
	      ordinaryGetOwnMetadata = metadata.get,
	      toMetaKey = metadata.key;

	  var ordinaryGetMetadata = function ordinaryGetMetadata(MetadataKey, O, P) {
	    var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	    if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
	    var parent = getPrototypeOf(O);
	    return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	  };

	  metadata.exp({ getMetadata: function getMetadata(metadataKey, target /*, targetKey */) {
	      return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	    } });
	});

	interopDefault(es7_reflect_getMetadata);

	var es7_reflect_getMetadataKeys = createCommonjsModule(function (module) {
	  var Set = interopDefault(require$$4$7),
	      from = interopDefault(require$$3$10),
	      metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      getPrototypeOf = interopDefault(require$$0$13),
	      ordinaryOwnMetadataKeys = metadata.keys,
	      toMetaKey = metadata.key;

	  var ordinaryMetadataKeys = function ordinaryMetadataKeys(O, P) {
	    var oKeys = ordinaryOwnMetadataKeys(O, P),
	        parent = getPrototypeOf(O);
	    if (parent === null) return oKeys;
	    var pKeys = ordinaryMetadataKeys(parent, P);
	    return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	  };

	  metadata.exp({ getMetadataKeys: function getMetadataKeys(target /*, targetKey */) {
	      return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	    } });
	});

	interopDefault(es7_reflect_getMetadataKeys);

	var es7_reflect_getOwnMetadata = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      ordinaryGetOwnMetadata = metadata.get,
	      toMetaKey = metadata.key;

	  metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */) {
	      return ordinaryGetOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	    } });
	});

	interopDefault(es7_reflect_getOwnMetadata);

	var es7_reflect_getOwnMetadataKeys = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      ordinaryOwnMetadataKeys = metadata.keys,
	      toMetaKey = metadata.key;

	  metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */) {
	      return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	    } });
	});

	interopDefault(es7_reflect_getOwnMetadataKeys);

	var es7_reflect_hasMetadata = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      getPrototypeOf = interopDefault(require$$0$13),
	      ordinaryHasOwnMetadata = metadata.has,
	      toMetaKey = metadata.key;

	  var ordinaryHasMetadata = function ordinaryHasMetadata(MetadataKey, O, P) {
	    var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	    if (hasOwn) return true;
	    var parent = getPrototypeOf(O);
	    return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	  };

	  metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */) {
	      return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	    } });
	});

	interopDefault(es7_reflect_hasMetadata);

	var es7_reflect_hasOwnMetadata = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      ordinaryHasOwnMetadata = metadata.has,
	      toMetaKey = metadata.key;

	  metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */) {
	      return ordinaryHasOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	    } });
	});

	interopDefault(es7_reflect_hasOwnMetadata);

	var es7_reflect_metadata = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      aFunction = interopDefault(require$$0$2),
	      toMetaKey = metadata.key,
	      ordinaryDefineOwnMetadata = metadata.set;

	  metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
	      return function decorator(target, targetKey) {
	        ordinaryDefineOwnMetadata(metadataKey, metadataValue, (targetKey !== undefined ? anObject : aFunction)(target), toMetaKey(targetKey));
	      };
	    } });
	});

	interopDefault(es7_reflect_metadata);

	var es7_asap = createCommonjsModule(function (module) {
	  // https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	  var $export = interopDefault(require$$1$2),
	      microtask = interopDefault(require$$8$1)(),
	      process = interopDefault(require$$3).process,
	      isNode = interopDefault(require$$0$6)(process) == 'process';

	  $export($export.G, {
	    asap: function asap(fn) {
	      var domain = isNode && process.domain;
	      microtask(domain ? domain.bind(fn) : fn);
	    }
	  });
	});

	interopDefault(es7_asap);

	var es7_observable = createCommonjsModule(function (module) {
	  'use strict';
	  // https://github.com/zenparsing/es-observable

	  var $export = interopDefault(require$$1$2),
	      global = interopDefault(require$$3),
	      core = interopDefault(require$$0),
	      microtask = interopDefault(require$$8$1)(),
	      OBSERVABLE = interopDefault(require$$0$4)('observable'),
	      aFunction = interopDefault(require$$0$2),
	      anObject = interopDefault(require$$5),
	      anInstance = interopDefault(require$$4$6),
	      redefineAll = interopDefault(require$$3$7),
	      hide = interopDefault(require$$2),
	      forOf = interopDefault(require$$1$20),
	      RETURN = forOf.RETURN;

	  var getMethod = function getMethod(fn) {
	    return fn == null ? undefined : aFunction(fn);
	  };

	  var cleanupSubscription = function cleanupSubscription(subscription) {
	    var cleanup = subscription._c;
	    if (cleanup) {
	      subscription._c = undefined;
	      cleanup();
	    }
	  };

	  var subscriptionClosed = function subscriptionClosed(subscription) {
	    return subscription._o === undefined;
	  };

	  var closeSubscription = function closeSubscription(subscription) {
	    if (!subscriptionClosed(subscription)) {
	      subscription._o = undefined;
	      cleanupSubscription(subscription);
	    }
	  };

	  var Subscription = function Subscription(observer, subscriber) {
	    anObject(observer);
	    this._c = undefined;
	    this._o = observer;
	    observer = new SubscriptionObserver(this);
	    try {
	      var cleanup = subscriber(observer),
	          subscription = cleanup;
	      if (cleanup != null) {
	        if (typeof cleanup.unsubscribe === 'function') cleanup = function cleanup() {
	          subscription.unsubscribe();
	        };else aFunction(cleanup);
	        this._c = cleanup;
	      }
	    } catch (e) {
	      observer.error(e);
	      return;
	    }if (subscriptionClosed(this)) cleanupSubscription(this);
	  };

	  Subscription.prototype = redefineAll({}, {
	    unsubscribe: function unsubscribe() {
	      closeSubscription(this);
	    }
	  });

	  var SubscriptionObserver = function SubscriptionObserver(subscription) {
	    this._s = subscription;
	  };

	  SubscriptionObserver.prototype = redefineAll({}, {
	    next: function next(value) {
	      var subscription = this._s;
	      if (!subscriptionClosed(subscription)) {
	        var observer = subscription._o;
	        try {
	          var m = getMethod(observer.next);
	          if (m) return m.call(observer, value);
	        } catch (e) {
	          try {
	            closeSubscription(subscription);
	          } finally {
	            throw e;
	          }
	        }
	      }
	    },
	    error: function error(value) {
	      var subscription = this._s;
	      if (subscriptionClosed(subscription)) throw value;
	      var observer = subscription._o;
	      subscription._o = undefined;
	      try {
	        var m = getMethod(observer.error);
	        if (!m) throw value;
	        value = m.call(observer, value);
	      } catch (e) {
	        try {
	          cleanupSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }cleanupSubscription(subscription);
	      return value;
	    },
	    complete: function complete(value) {
	      var subscription = this._s;
	      if (!subscriptionClosed(subscription)) {
	        var observer = subscription._o;
	        subscription._o = undefined;
	        try {
	          var m = getMethod(observer.complete);
	          value = m ? m.call(observer, value) : undefined;
	        } catch (e) {
	          try {
	            cleanupSubscription(subscription);
	          } finally {
	            throw e;
	          }
	        }cleanupSubscription(subscription);
	        return value;
	      }
	    }
	  });

	  var $Observable = function Observable(subscriber) {
	    anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
	  };

	  redefineAll($Observable.prototype, {
	    subscribe: function subscribe(observer) {
	      return new Subscription(observer, this._f);
	    },
	    forEach: function forEach(fn) {
	      var that = this;
	      return new (core.Promise || global.Promise)(function (resolve, reject) {
	        aFunction(fn);
	        var subscription = that.subscribe({
	          next: function next(value) {
	            try {
	              return fn(value);
	            } catch (e) {
	              reject(e);
	              subscription.unsubscribe();
	            }
	          },
	          error: reject,
	          complete: resolve
	        });
	      });
	    }
	  });

	  redefineAll($Observable, {
	    from: function from(x) {
	      var C = typeof this === 'function' ? this : $Observable;
	      var method = getMethod(anObject(x)[OBSERVABLE]);
	      if (method) {
	        var observable = anObject(method.call(x));
	        return observable.constructor === C ? observable : new C(function (observer) {
	          return observable.subscribe(observer);
	        });
	      }
	      return new C(function (observer) {
	        var done = false;
	        microtask(function () {
	          if (!done) {
	            try {
	              if (forOf(x, false, function (it) {
	                observer.next(it);
	                if (done) return RETURN;
	              }) === RETURN) return;
	            } catch (e) {
	              if (done) throw e;
	              observer.error(e);
	              return;
	            }observer.complete();
	          }
	        });
	        return function () {
	          done = true;
	        };
	      });
	    },
	    of: function of() {
	      for (var i = 0, l = arguments.length, items = Array(l); i < l;) {
	        items[i] = arguments[i++];
	      }return new (typeof this === 'function' ? this : $Observable)(function (observer) {
	        var done = false;
	        microtask(function () {
	          if (!done) {
	            for (var i = 0; i < items.length; ++i) {
	              observer.next(items[i]);
	              if (done) return;
	            }observer.complete();
	          }
	        });
	        return function () {
	          done = true;
	        };
	      });
	    }
	  });

	  hide($Observable.prototype, OBSERVABLE, function () {
	    return this;
	  });

	  $export($export.G, { Observable: $Observable });

	  interopDefault(require$$0$35)('Observable');
	});

	interopDefault(es7_observable);

	var _path = createCommonjsModule(function (module) {
	  module.exports = interopDefault(require$$3);
	});

	var _path$1 = interopDefault(_path);

var require$$2$11 = Object.freeze({
	  default: _path$1
	});

	var _partial = createCommonjsModule(function (module) {
	  'use strict';

	  var path = interopDefault(require$$2$11),
	      invoke = interopDefault(require$$1$13),
	      aFunction = interopDefault(require$$0$2);
	  module.exports = function () /* ...pargs */{
	    var fn = aFunction(this),
	        length = arguments.length,
	        pargs = Array(length),
	        i = 0,
	        _ = path._,
	        holder = false;
	    while (length > i) {
	      if ((pargs[i] = arguments[i++]) === _) holder = true;
	    }return function () /* ...args */{
	      var that = this,
	          aLen = arguments.length,
	          j = 0,
	          k = 0,
	          args;
	      if (!holder && !aLen) return invoke(fn, pargs, that);
	      args = pargs.slice();
	      if (holder) for (; length > j; j++) {
	        if (args[j] === _) args[j] = arguments[k++];
	      }while (aLen > k) {
	        args.push(arguments[k++]);
	      }return invoke(fn, args, that);
	    };
	  };
	});

	var _partial$1 = interopDefault(_partial);

var require$$0$44 = Object.freeze({
	  default: _partial$1
	});

	var web_timers = createCommonjsModule(function (module) {
	  // ie9- setTimeout & setInterval additional parameters fix
	  var global = interopDefault(require$$3),
	      $export = interopDefault(require$$1$2),
	      invoke = interopDefault(require$$1$13),
	      partial = interopDefault(require$$0$44),
	      navigator = global.navigator,
	      MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	  var wrap = function wrap(set) {
	    return MSIE ? function (fn, time /*, ...args */) {
	      return set(invoke(partial, [].slice.call(arguments, 2), typeof fn == 'function' ? fn : Function(fn)), time);
	    } : set;
	  };
	  $export($export.G + $export.B + $export.F * MSIE, {
	    setTimeout: wrap(global.setTimeout),
	    setInterval: wrap(global.setInterval)
	  });
	});

	interopDefault(web_timers);

	var web_immediate = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      $task = interopDefault(require$$0$36);
	  $export($export.G + $export.B, {
	    setImmediate: $task.set,
	    clearImmediate: $task.clear
	  });
	});

	interopDefault(web_immediate);

	var web_dom_iterable = createCommonjsModule(function (module) {
	  var $iterators = interopDefault(require$$5$3),
	      redefine = interopDefault(require$$4$2),
	      global = interopDefault(require$$3),
	      hide = interopDefault(require$$2),
	      Iterators = interopDefault(require$$1$15),
	      wks = interopDefault(require$$0$4),
	      ITERATOR = wks('iterator'),
	      TO_STRING_TAG = wks('toStringTag'),
	      ArrayValues = Iterators.Array;

	  for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
	    var NAME = collections[i],
	        Collection = global[NAME],
	        proto = Collection && Collection.prototype,
	        key;
	    if (proto) {
	      if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
	      if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	      Iterators[NAME] = ArrayValues;
	      for (key in $iterators) {
	        if (!proto[key]) redefine(proto, key, $iterators[key], true);
	      }
	    }
	  }
	});

	interopDefault(web_dom_iterable);

	var shim = createCommonjsModule(function (module) {
	  module.exports = interopDefault(require$$0);
	});

	interopDefault(shim);

	var runtime = createCommonjsModule(function (module) {
	  /**
	   * Copyright (c) 2014, Facebook, Inc.
	   * All rights reserved.
	   *
	   * This source code is licensed under the BSD-style license found in the
	   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	   * additional grant of patent rights can be found in the PATENTS file in
	   * the same directory.
	   */

	  !function (global) {
	    "use strict";

	    var hasOwn = Object.prototype.hasOwnProperty;
	    var undefined; // More compressible than void 0.
	    var $Symbol = typeof Symbol === "function" ? Symbol : {};
	    var iteratorSymbol = $Symbol.iterator || "@@iterator";
	    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	    var inModule = (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object";
	    var runtime = global.regeneratorRuntime;
	    if (runtime) {
	      if (inModule) {
	        // If regeneratorRuntime is defined globally and we're in a module,
	        // make the exports object identical to regeneratorRuntime.
	        module.exports = runtime;
	      }
	      // Don't bother evaluating the rest of this file if the runtime was
	      // already defined globally.
	      return;
	    }

	    // Define the runtime globally (as expected by generated code) as either
	    // module.exports (if we're in a module) or a new, empty object.
	    runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	    function wrap(innerFn, outerFn, self, tryLocsList) {
	      // If outerFn provided, then outerFn.prototype instanceof Generator.
	      var generator = Object.create((outerFn || Generator).prototype);
	      var context = new Context(tryLocsList || []);

	      // The ._invoke method unifies the implementations of the .next,
	      // .throw, and .return methods.
	      generator._invoke = makeInvokeMethod(innerFn, self, context);

	      return generator;
	    }
	    runtime.wrap = wrap;

	    // Try/catch helper to minimize deoptimizations. Returns a completion
	    // record like context.tryEntries[i].completion. This interface could
	    // have been (and was previously) designed to take a closure to be
	    // invoked without arguments, but in all the cases we care about we
	    // already have an existing method we want to call, so there's no need
	    // to create a new function object. We can even get away with assuming
	    // the method takes exactly one argument, since that happens to be true
	    // in every case, so we don't have to touch the arguments object. The
	    // only additional allocation required is the completion record, which
	    // has a stable shape and so hopefully should be cheap to allocate.
	    function tryCatch(fn, obj, arg) {
	      try {
	        return { type: "normal", arg: fn.call(obj, arg) };
	      } catch (err) {
	        return { type: "throw", arg: err };
	      }
	    }

	    var GenStateSuspendedStart = "suspendedStart";
	    var GenStateSuspendedYield = "suspendedYield";
	    var GenStateExecuting = "executing";
	    var GenStateCompleted = "completed";

	    // Returning this object from the innerFn has the same effect as
	    // breaking out of the dispatch switch statement.
	    var ContinueSentinel = {};

	    // Dummy constructor functions that we use as the .constructor and
	    // .constructor.prototype properties for functions that return Generator
	    // objects. For full spec compliance, you may wish to configure your
	    // minifier not to mangle the names of these two functions.
	    function Generator() {}
	    function GeneratorFunction() {}
	    function GeneratorFunctionPrototype() {}

	    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	    GeneratorFunctionPrototype.constructor = GeneratorFunction;
	    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

	    // Helper for defining the .next, .throw, and .return methods of the
	    // Iterator interface in terms of a single ._invoke method.
	    function defineIteratorMethods(prototype) {
	      ["next", "throw", "return"].forEach(function (method) {
	        prototype[method] = function (arg) {
	          return this._invoke(method, arg);
	        };
	      });
	    }

	    runtime.isGeneratorFunction = function (genFun) {
	      var ctor = typeof genFun === "function" && genFun.constructor;
	      return ctor ? ctor === GeneratorFunction ||
	      // For the native GeneratorFunction constructor, the best we can
	      // do is to check its .name property.
	      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	    };

	    runtime.mark = function (genFun) {
	      if (Object.setPrototypeOf) {
	        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	      } else {
	        genFun.__proto__ = GeneratorFunctionPrototype;
	        if (!(toStringTagSymbol in genFun)) {
	          genFun[toStringTagSymbol] = "GeneratorFunction";
	        }
	      }
	      genFun.prototype = Object.create(Gp);
	      return genFun;
	    };

	    // Within the body of any async function, `await x` is transformed to
	    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	    // `value instanceof AwaitArgument` to determine if the yielded value is
	    // meant to be awaited. Some may consider the name of this method too
	    // cutesy, but they are curmudgeons.
	    runtime.awrap = function (arg) {
	      return new AwaitArgument(arg);
	    };

	    function AwaitArgument(arg) {
	      this.arg = arg;
	    }

	    function AsyncIterator(generator) {
	      function invoke(method, arg, resolve, reject) {
	        var record = tryCatch(generator[method], generator, arg);
	        if (record.type === "throw") {
	          reject(record.arg);
	        } else {
	          var result = record.arg;
	          var value = result.value;
	          if (value instanceof AwaitArgument) {
	            return Promise.resolve(value.arg).then(function (value) {
	              invoke("next", value, resolve, reject);
	            }, function (err) {
	              invoke("throw", err, resolve, reject);
	            });
	          }

	          return Promise.resolve(value).then(function (unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            resolve(result);
	          }, reject);
	        }
	      }

	      if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process.domain) {
	        invoke = process.domain.bind(invoke);
	      }

	      var previousPromise;

	      function enqueue(method, arg) {
	        function callInvokeWithMethodAndArg() {
	          return new Promise(function (resolve, reject) {
	            invoke(method, arg, resolve, reject);
	          });
	        }

	        return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
	        // Avoid propagating failures to Promises returned by later
	        // invocations of the iterator.
	        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      }

	      // Define the unified helper method that is used to implement .next,
	      // .throw, and .return (see defineIteratorMethods).
	      this._invoke = enqueue;
	    }

	    defineIteratorMethods(AsyncIterator.prototype);

	    // Note that simple async functions are implemented on top of
	    // AsyncIterator objects; they just return a Promise for the value of
	    // the final result produced by the iterator.
	    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

	      return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function (result) {
	        return result.done ? result.value : iter.next();
	      });
	    };

	    function makeInvokeMethod(innerFn, self, context) {
	      var state = GenStateSuspendedStart;

	      return function invoke(method, arg) {
	        if (state === GenStateExecuting) {
	          throw new Error("Generator is already running");
	        }

	        if (state === GenStateCompleted) {
	          if (method === "throw") {
	            throw arg;
	          }

	          // Be forgiving, per 25.3.3.3.3 of the spec:
	          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	          return doneResult();
	        }

	        while (true) {
	          var delegate = context.delegate;
	          if (delegate) {
	            if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
	              // A return or throw (when the delegate iterator has no throw
	              // method) always terminates the yield* loop.
	              context.delegate = null;

	              // If the delegate iterator has a return method, give it a
	              // chance to clean up.
	              var returnMethod = delegate.iterator["return"];
	              if (returnMethod) {
	                var record = tryCatch(returnMethod, delegate.iterator, arg);
	                if (record.type === "throw") {
	                  // If the return method threw an exception, let that
	                  // exception prevail over the original return or throw.
	                  method = "throw";
	                  arg = record.arg;
	                  continue;
	                }
	              }

	              if (method === "return") {
	                // Continue with the outer return, now that the delegate
	                // iterator has been terminated.
	                continue;
	              }
	            }

	            var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

	            if (record.type === "throw") {
	              context.delegate = null;

	              // Like returning generator.throw(uncaught), but without the
	              // overhead of an extra function call.
	              method = "throw";
	              arg = record.arg;
	              continue;
	            }

	            // Delegate generator ran and handled its own exceptions so
	            // regardless of what the method was, we continue as if it is
	            // "next" with an undefined arg.
	            method = "next";
	            arg = undefined;

	            var info = record.arg;
	            if (info.done) {
	              context[delegate.resultName] = info.value;
	              context.next = delegate.nextLoc;
	            } else {
	              state = GenStateSuspendedYield;
	              return info;
	            }

	            context.delegate = null;
	          }

	          if (method === "next") {
	            // Setting context._sent for legacy support of Babel's
	            // function.sent implementation.
	            context.sent = context._sent = arg;
	          } else if (method === "throw") {
	            if (state === GenStateSuspendedStart) {
	              state = GenStateCompleted;
	              throw arg;
	            }

	            if (context.dispatchException(arg)) {
	              // If the dispatched exception was caught by a catch block,
	              // then let that catch block handle the exception normally.
	              method = "next";
	              arg = undefined;
	            }
	          } else if (method === "return") {
	            context.abrupt("return", arg);
	          }

	          state = GenStateExecuting;

	          var record = tryCatch(innerFn, self, context);
	          if (record.type === "normal") {
	            // If an exception is thrown from innerFn, we leave state ===
	            // GenStateExecuting and loop back for another invocation.
	            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	            var info = {
	              value: record.arg,
	              done: context.done
	            };

	            if (record.arg === ContinueSentinel) {
	              if (context.delegate && method === "next") {
	                // Deliberately forget the last sent value so that we don't
	                // accidentally pass it on to the delegate.
	                arg = undefined;
	              }
	            } else {
	              return info;
	            }
	          } else if (record.type === "throw") {
	            state = GenStateCompleted;
	            // Dispatch the exception by looping back around to the
	            // context.dispatchException(arg) call above.
	            method = "throw";
	            arg = record.arg;
	          }
	        }
	      };
	    }

	    // Define Generator.prototype.{next,throw,return} in terms of the
	    // unified ._invoke helper method.
	    defineIteratorMethods(Gp);

	    Gp[iteratorSymbol] = function () {
	      return this;
	    };

	    Gp[toStringTagSymbol] = "Generator";

	    Gp.toString = function () {
	      return "[object Generator]";
	    };

	    function pushTryEntry(locs) {
	      var entry = { tryLoc: locs[0] };

	      if (1 in locs) {
	        entry.catchLoc = locs[1];
	      }

	      if (2 in locs) {
	        entry.finallyLoc = locs[2];
	        entry.afterLoc = locs[3];
	      }

	      this.tryEntries.push(entry);
	    }

	    function resetTryEntry(entry) {
	      var record = entry.completion || {};
	      record.type = "normal";
	      delete record.arg;
	      entry.completion = record;
	    }

	    function Context(tryLocsList) {
	      // The root entry object (effectively a try statement without a catch
	      // or a finally block) gives us a place to store values thrown from
	      // locations where there is no enclosing try statement.
	      this.tryEntries = [{ tryLoc: "root" }];
	      tryLocsList.forEach(pushTryEntry, this);
	      this.reset(true);
	    }

	    runtime.keys = function (object) {
	      var keys = [];
	      for (var key in object) {
	        keys.push(key);
	      }
	      keys.reverse();

	      // Rather than returning an object with a next method, we keep
	      // things simple and return the next function itself.
	      return function next() {
	        while (keys.length) {
	          var key = keys.pop();
	          if (key in object) {
	            next.value = key;
	            next.done = false;
	            return next;
	          }
	        }

	        // To avoid creating an additional object, we just hang the .value
	        // and .done properties off the next function object itself. This
	        // also ensures that the minifier will not anonymize the function.
	        next.done = true;
	        return next;
	      };
	    };

	    function values(iterable) {
	      if (iterable) {
	        var iteratorMethod = iterable[iteratorSymbol];
	        if (iteratorMethod) {
	          return iteratorMethod.call(iterable);
	        }

	        if (typeof iterable.next === "function") {
	          return iterable;
	        }

	        if (!isNaN(iterable.length)) {
	          var i = -1,
	              next = function next() {
	            while (++i < iterable.length) {
	              if (hasOwn.call(iterable, i)) {
	                next.value = iterable[i];
	                next.done = false;
	                return next;
	              }
	            }

	            next.value = undefined;
	            next.done = true;

	            return next;
	          };

	          return next.next = next;
	        }
	      }

	      // Return an iterator with no values.
	      return { next: doneResult };
	    }
	    runtime.values = values;

	    function doneResult() {
	      return { value: undefined, done: true };
	    }

	    Context.prototype = {
	      constructor: Context,

	      reset: function reset(skipTempReset) {
	        this.prev = 0;
	        this.next = 0;
	        // Resetting context._sent for legacy support of Babel's
	        // function.sent implementation.
	        this.sent = this._sent = undefined;
	        this.done = false;
	        this.delegate = null;

	        this.tryEntries.forEach(resetTryEntry);

	        if (!skipTempReset) {
	          for (var name in this) {
	            // Not sure about the optimal order of these conditions:
	            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	              this[name] = undefined;
	            }
	          }
	        }
	      },

	      stop: function stop() {
	        this.done = true;

	        var rootEntry = this.tryEntries[0];
	        var rootRecord = rootEntry.completion;
	        if (rootRecord.type === "throw") {
	          throw rootRecord.arg;
	        }

	        return this.rval;
	      },

	      dispatchException: function dispatchException(exception) {
	        if (this.done) {
	          throw exception;
	        }

	        var context = this;
	        function handle(loc, caught) {
	          record.type = "throw";
	          record.arg = exception;
	          context.next = loc;
	          return !!caught;
	        }

	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          var record = entry.completion;

	          if (entry.tryLoc === "root") {
	            // Exception thrown outside of any try block that could handle
	            // it, so set the completion value of the entire function to
	            // throw the exception.
	            return handle("end");
	          }

	          if (entry.tryLoc <= this.prev) {
	            var hasCatch = hasOwn.call(entry, "catchLoc");
	            var hasFinally = hasOwn.call(entry, "finallyLoc");

	            if (hasCatch && hasFinally) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              } else if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else if (hasCatch) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              }
	            } else if (hasFinally) {
	              if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else {
	              throw new Error("try statement without catch or finally");
	            }
	          }
	        }
	      },

	      abrupt: function abrupt(type, arg) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	            var finallyEntry = entry;
	            break;
	          }
	        }

	        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	          // Ignore the finally entry if control is not jumping to a
	          // location outside the try/catch block.
	          finallyEntry = null;
	        }

	        var record = finallyEntry ? finallyEntry.completion : {};
	        record.type = type;
	        record.arg = arg;

	        if (finallyEntry) {
	          this.next = finallyEntry.finallyLoc;
	        } else {
	          this.complete(record);
	        }

	        return ContinueSentinel;
	      },

	      complete: function complete(record, afterLoc) {
	        if (record.type === "throw") {
	          throw record.arg;
	        }

	        if (record.type === "break" || record.type === "continue") {
	          this.next = record.arg;
	        } else if (record.type === "return") {
	          this.rval = record.arg;
	          this.next = "end";
	        } else if (record.type === "normal" && afterLoc) {
	          this.next = afterLoc;
	        }
	      },

	      finish: function finish(finallyLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          if (entry.finallyLoc === finallyLoc) {
	            this.complete(entry.completion, entry.afterLoc);
	            resetTryEntry(entry);
	            return ContinueSentinel;
	          }
	        }
	      },

	      "catch": function _catch(tryLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          if (entry.tryLoc === tryLoc) {
	            var record = entry.completion;
	            if (record.type === "throw") {
	              var thrown = record.arg;
	              resetTryEntry(entry);
	            }
	            return thrown;
	          }
	        }

	        // The context.catch method must only be called with a location
	        // argument that corresponds to a known catch block.
	        throw new Error("illegal catch attempt");
	      },

	      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	        this.delegate = {
	          iterator: values(iterable),
	          resultName: resultName,
	          nextLoc: nextLoc
	        };

	        return ContinueSentinel;
	      }
	    };
	  }(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  _typeof(commonjsGlobal) === "object" ? commonjsGlobal : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : commonjsGlobal);
	});

	interopDefault(runtime);

	var _replacer = createCommonjsModule(function (module) {
	  module.exports = function (regExp, replace) {
	    var replacer = replace === Object(replace) ? function (part) {
	      return replace[part];
	    } : replace;
	    return function (it) {
	      return String(it).replace(regExp, replacer);
	    };
	  };
	});

	var _replacer$1 = interopDefault(_replacer);

var require$$0$45 = Object.freeze({
	  default: _replacer$1
	});

	var core_regexp_escape = createCommonjsModule(function (module) {
	  // https://github.com/benjamingr/RexExp.escape
	  var $export = interopDefault(require$$1$2),
	      $re = interopDefault(require$$0$45)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

	  $export($export.S, 'RegExp', { escape: function escape(it) {
	      return $re(it);
	    } });
	});

	interopDefault(core_regexp_escape);

	var _escape = createCommonjsModule(function (module) {
	  module.exports = interopDefault(require$$0).RegExp.escape;
	});

	interopDefault(_escape);

	var index = createCommonjsModule(function (module) {
	  "use strict";

	  /* eslint max-len: 0 */

	  if (commonjsGlobal._babelPolyfill) {
	    throw new Error("only one instance of babel-polyfill is allowed");
	  }
	  commonjsGlobal._babelPolyfill = true;

	  // Should be removed in the next major release:

	  var DEFINE_PROPERTY = "defineProperty";
	  function define(O, key, value) {
	    O[key] || Object[DEFINE_PROPERTY](O, key, {
	      writable: true,
	      configurable: true,
	      value: value
	    });
	  }

	  define(String.prototype, "padLeft", "".padStart);
	  define(String.prototype, "padRight", "".padEnd);

	  "pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	    [][key] && define(Array, key, Function.call.bind([][key]));
	  });
	});

	interopDefault(index);

	/*!
	 * Bootstrap v4.0.0-alpha.3 (http://getbootstrap.com)
	 * Copyright 2011-2016 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */if(typeof jQuery==='undefined'){throw new Error('Bootstrap\'s JavaScript requires jQuery');}+function($){var version=$.fn.jquery.split(' ')[0].split('.');if(version[0]<2&&version[1]<9||version[0]==1&&version[1]==9&&version[2]<1||version[0]>=4){throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');}}(jQuery);+function($){/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): util.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */'use strict';var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function;}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}}};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Util=function($){/**
	   * ------------------------------------------------------------------------
	   * Private TransitionEnd Helpers
	   * ------------------------------------------------------------------------
	   */var transition=false;var MAX_UID=1000000;var TransitionEndEvent={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'};// shoutout AngusCroll (https://goo.gl/pxwQGp)
	function toType(obj){return{}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();}function isElement(obj){return(obj[0]||obj).nodeType;}function getSpecialTransitionEndEvent(){return{bindType:transition.end,delegateType:transition.end,handle:function handle(event){if($(event.target).is(this)){return event.handleObj.handler.apply(this,arguments);// eslint-disable-line prefer-rest-params
	}return undefined;}};}function transitionEndTest(){if(window.QUnit){return false;}var el=document.createElement('bootstrap');for(var _name in TransitionEndEvent){if(el.style[_name]!==undefined){return{end:TransitionEndEvent[_name]};}}return false;}function transitionEndEmulator(duration){var _this=this;var called=false;$(this).one(Util.TRANSITION_END,function(){called=true;});setTimeout(function(){if(!called){Util.triggerTransitionEnd(_this);}},duration);return this;}function setTransitionEndSupport(){transition=transitionEndTest();$.fn.emulateTransitionEnd=transitionEndEmulator;if(Util.supportsTransitionEnd()){$.event.special[Util.TRANSITION_END]=getSpecialTransitionEndEvent();}}/**
	   * --------------------------------------------------------------------------
	   * Public Util Api
	   * --------------------------------------------------------------------------
	   */var Util={TRANSITION_END:'bsTransitionEnd',getUID:function getUID(prefix){do{/* eslint-disable no-bitwise */prefix+=~~(Math.random()*MAX_UID);// "~~" acts like a faster Math.floor() here
	/* eslint-enable no-bitwise */}while(document.getElementById(prefix));return prefix;},getSelectorFromElement:function getSelectorFromElement(element){var selector=element.getAttribute('data-target');if(!selector){selector=element.getAttribute('href')||'';selector=/^#[a-z]/i.test(selector)?selector:null;}return selector;},reflow:function reflow(element){new Function('bs','return bs')(element.offsetHeight);},triggerTransitionEnd:function triggerTransitionEnd(element){$(element).trigger(transition.end);},supportsTransitionEnd:function supportsTransitionEnd(){return Boolean(transition);},typeCheckConfig:function typeCheckConfig(componentName,config,configTypes){for(var property in configTypes){if(configTypes.hasOwnProperty(property)){var expectedTypes=configTypes[property];var value=config[property];var valueType=undefined;if(value&&isElement(value)){valueType='element';}else{valueType=toType(value);}if(!new RegExp(expectedTypes).test(valueType)){throw new Error(componentName.toUpperCase()+': '+('Option "'+property+'" provided type "'+valueType+'" ')+('but expected type "'+expectedTypes+'".'));}}}}};setTransitionEndSupport();return Util;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): alert.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Alert=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='alert';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.alert';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var TRANSITION_DURATION=150;var Selector={DISMISS:'[data-dismiss="alert"]'};var Event={CLOSE:'close'+EVENT_KEY,CLOSED:'closed'+EVENT_KEY,CLICK_DATA_API:'click'+EVENT_KEY+DATA_API_KEY};var ClassName={ALERT:'alert',FADE:'fade',IN:'in'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Alert=function(){function Alert(element){_classCallCheck(this,Alert);this._element=element;}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Alert,[{key:'close',// public
	value:function close(element){element=element||this._element;var rootElement=this._getRootElement(element);var customEvent=this._triggerCloseEvent(rootElement);if(customEvent.isDefaultPrevented()){return;}this._removeElement(rootElement);}},{key:'dispose',value:function dispose(){$.removeData(this._element,DATA_KEY);this._element=null;}// private
	},{key:'_getRootElement',value:function _getRootElement(element){var selector=Util.getSelectorFromElement(element);var parent=false;if(selector){parent=$(selector)[0];}if(!parent){parent=$(element).closest('.'+ClassName.ALERT)[0];}return parent;}},{key:'_triggerCloseEvent',value:function _triggerCloseEvent(element){var closeEvent=$.Event(Event.CLOSE);$(element).trigger(closeEvent);return closeEvent;}},{key:'_removeElement',value:function _removeElement(element){$(element).removeClass(ClassName.IN);if(!Util.supportsTransitionEnd()||!$(element).hasClass(ClassName.FADE)){this._destroyElement(element);return;}$(element).one(Util.TRANSITION_END,$.proxy(this._destroyElement,this,element)).emulateTransitionEnd(TRANSITION_DURATION);}},{key:'_destroyElement',value:function _destroyElement(element){$(element).detach().trigger(Event.CLOSED).remove();}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var $element=$(this);var data=$element.data(DATA_KEY);if(!data){data=new Alert(this);$element.data(DATA_KEY,data);}if(config==='close'){data[config](this);}});}},{key:'_handleDismiss',value:function _handleDismiss(alertInstance){return function(event){if(event){event.preventDefault();}alertInstance.close(this);};}},{key:'VERSION',get:function get(){return VERSION;}}]);return Alert;}();$(document).on(Event.CLICK_DATA_API,Selector.DISMISS,Alert._handleDismiss(new Alert()));/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=Alert._jQueryInterface;$.fn[NAME].Constructor=Alert;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Alert._jQueryInterface;};return Alert;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): button.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Button=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='button';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.button';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var ClassName={ACTIVE:'active',BUTTON:'btn',FOCUS:'focus'};var Selector={DATA_TOGGLE_CARROT:'[data-toggle^="button"]',DATA_TOGGLE:'[data-toggle="buttons"]',INPUT:'input',ACTIVE:'.active',BUTTON:'.btn'};var Event={CLICK_DATA_API:'click'+EVENT_KEY+DATA_API_KEY,FOCUS_BLUR_DATA_API:'focus'+EVENT_KEY+DATA_API_KEY+' '+('blur'+EVENT_KEY+DATA_API_KEY)};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Button=function(){function Button(element){_classCallCheck(this,Button);this._element=element;}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Button,[{key:'toggle',// public
	value:function toggle(){var triggerChangeEvent=true;var rootElement=$(this._element).closest(Selector.DATA_TOGGLE)[0];if(rootElement){var input=$(this._element).find(Selector.INPUT)[0];if(input){if(input.type==='radio'){if(input.checked&&$(this._element).hasClass(ClassName.ACTIVE)){triggerChangeEvent=false;}else{var activeElement=$(rootElement).find(Selector.ACTIVE)[0];if(activeElement){$(activeElement).removeClass(ClassName.ACTIVE);}}}if(triggerChangeEvent){input.checked=!$(this._element).hasClass(ClassName.ACTIVE);$(this._element).trigger('change');}input.focus();}}else{this._element.setAttribute('aria-pressed',!$(this._element).hasClass(ClassName.ACTIVE));}if(triggerChangeEvent){$(this._element).toggleClass(ClassName.ACTIVE);}}},{key:'dispose',value:function dispose(){$.removeData(this._element,DATA_KEY);this._element=null;}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY);if(!data){data=new Button(this);$(this).data(DATA_KEY,data);}if(config==='toggle'){data[config]();}});}},{key:'VERSION',get:function get(){return VERSION;}}]);return Button;}();$(document).on(Event.CLICK_DATA_API,Selector.DATA_TOGGLE_CARROT,function(event){event.preventDefault();var button=event.target;if(!$(button).hasClass(ClassName.BUTTON)){button=$(button).closest(Selector.BUTTON);}Button._jQueryInterface.call($(button),'toggle');}).on(Event.FOCUS_BLUR_DATA_API,Selector.DATA_TOGGLE_CARROT,function(event){var button=$(event.target).closest(Selector.BUTTON)[0];$(button).toggleClass(ClassName.FOCUS,/^focus(in)?$/.test(event.type));});/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=Button._jQueryInterface;$.fn[NAME].Constructor=Button;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Button._jQueryInterface;};return Button;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): carousel.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Carousel=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='carousel';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.carousel';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var TRANSITION_DURATION=600;var ARROW_LEFT_KEYCODE=37;// KeyboardEvent.which value for left arrow key
	var ARROW_RIGHT_KEYCODE=39;// KeyboardEvent.which value for right arrow key
	var Default={interval:5000,keyboard:true,slide:false,pause:'hover',wrap:true};var DefaultType={interval:'(number|boolean)',keyboard:'boolean',slide:'(boolean|string)',pause:'(string|boolean)',wrap:'boolean'};var Direction={NEXT:'next',PREVIOUS:'prev'};var Event={SLIDE:'slide'+EVENT_KEY,SLID:'slid'+EVENT_KEY,KEYDOWN:'keydown'+EVENT_KEY,MOUSEENTER:'mouseenter'+EVENT_KEY,MOUSELEAVE:'mouseleave'+EVENT_KEY,LOAD_DATA_API:'load'+EVENT_KEY+DATA_API_KEY,CLICK_DATA_API:'click'+EVENT_KEY+DATA_API_KEY};var ClassName={CAROUSEL:'carousel',ACTIVE:'active',SLIDE:'slide',RIGHT:'right',LEFT:'left',ITEM:'carousel-item'};var Selector={ACTIVE:'.active',ACTIVE_ITEM:'.active.carousel-item',ITEM:'.carousel-item',NEXT_PREV:'.next, .prev',INDICATORS:'.carousel-indicators',DATA_SLIDE:'[data-slide], [data-slide-to]',DATA_RIDE:'[data-ride="carousel"]'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Carousel=function(){function Carousel(element,config){_classCallCheck(this,Carousel);this._items=null;this._interval=null;this._activeElement=null;this._isPaused=false;this._isSliding=false;this._config=this._getConfig(config);this._element=$(element)[0];this._indicatorsElement=$(this._element).find(Selector.INDICATORS)[0];this._addEventListeners();}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Carousel,[{key:'next',// public
	value:function next(){if(!this._isSliding){this._slide(Direction.NEXT);}}},{key:'nextWhenVisible',value:function nextWhenVisible(){// Don't call next when the page isn't visible
	if(!document.hidden){this.next();}}},{key:'prev',value:function prev(){if(!this._isSliding){this._slide(Direction.PREVIOUS);}}},{key:'pause',value:function pause(event){if(!event){this._isPaused=true;}if($(this._element).find(Selector.NEXT_PREV)[0]&&Util.supportsTransitionEnd()){Util.triggerTransitionEnd(this._element);this.cycle(true);}clearInterval(this._interval);this._interval=null;}},{key:'cycle',value:function cycle(event){if(!event){this._isPaused=false;}if(this._interval){clearInterval(this._interval);this._interval=null;}if(this._config.interval&&!this._isPaused){this._interval=setInterval($.proxy(document.visibilityState?this.nextWhenVisible:this.next,this),this._config.interval);}}},{key:'to',value:function to(index){var _this2=this;this._activeElement=$(this._element).find(Selector.ACTIVE_ITEM)[0];var activeIndex=this._getItemIndex(this._activeElement);if(index>this._items.length-1||index<0){return;}if(this._isSliding){$(this._element).one(Event.SLID,function(){return _this2.to(index);});return;}if(activeIndex===index){this.pause();this.cycle();return;}var direction=index>activeIndex?Direction.NEXT:Direction.PREVIOUS;this._slide(direction,this._items[index]);}},{key:'dispose',value:function dispose(){$(this._element).off(EVENT_KEY);$.removeData(this._element,DATA_KEY);this._items=null;this._config=null;this._element=null;this._interval=null;this._isPaused=null;this._isSliding=null;this._activeElement=null;this._indicatorsElement=null;}// private
	},{key:'_getConfig',value:function _getConfig(config){config=$.extend({},Default,config);Util.typeCheckConfig(NAME,config,DefaultType);return config;}},{key:'_addEventListeners',value:function _addEventListeners(){if(this._config.keyboard){$(this._element).on(Event.KEYDOWN,$.proxy(this._keydown,this));}if(this._config.pause==='hover'&&!('ontouchstart'in document.documentElement)){$(this._element).on(Event.MOUSEENTER,$.proxy(this.pause,this)).on(Event.MOUSELEAVE,$.proxy(this.cycle,this));}}},{key:'_keydown',value:function _keydown(event){event.preventDefault();if(/input|textarea/i.test(event.target.tagName)){return;}switch(event.which){case ARROW_LEFT_KEYCODE:this.prev();break;case ARROW_RIGHT_KEYCODE:this.next();break;default:return;}}},{key:'_getItemIndex',value:function _getItemIndex(element){this._items=$.makeArray($(element).parent().find(Selector.ITEM));return this._items.indexOf(element);}},{key:'_getItemByDirection',value:function _getItemByDirection(direction,activeElement){var isNextDirection=direction===Direction.NEXT;var isPrevDirection=direction===Direction.PREVIOUS;var activeIndex=this._getItemIndex(activeElement);var lastItemIndex=this._items.length-1;var isGoingToWrap=isPrevDirection&&activeIndex===0||isNextDirection&&activeIndex===lastItemIndex;if(isGoingToWrap&&!this._config.wrap){return activeElement;}var delta=direction===Direction.PREVIOUS?-1:1;var itemIndex=(activeIndex+delta)%this._items.length;return itemIndex===-1?this._items[this._items.length-1]:this._items[itemIndex];}},{key:'_triggerSlideEvent',value:function _triggerSlideEvent(relatedTarget,directionalClassname){var slideEvent=$.Event(Event.SLIDE,{relatedTarget:relatedTarget,direction:directionalClassname});$(this._element).trigger(slideEvent);return slideEvent;}},{key:'_setActiveIndicatorElement',value:function _setActiveIndicatorElement(element){if(this._indicatorsElement){$(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);var nextIndicator=this._indicatorsElement.children[this._getItemIndex(element)];if(nextIndicator){$(nextIndicator).addClass(ClassName.ACTIVE);}}}},{key:'_slide',value:function _slide(direction,element){var _this3=this;var activeElement=$(this._element).find(Selector.ACTIVE_ITEM)[0];var nextElement=element||activeElement&&this._getItemByDirection(direction,activeElement);var isCycling=Boolean(this._interval);var directionalClassName=direction===Direction.NEXT?ClassName.LEFT:ClassName.RIGHT;if(nextElement&&$(nextElement).hasClass(ClassName.ACTIVE)){this._isSliding=false;return;}var slideEvent=this._triggerSlideEvent(nextElement,directionalClassName);if(slideEvent.isDefaultPrevented()){return;}if(!activeElement||!nextElement){// some weirdness is happening, so we bail
	return;}this._isSliding=true;if(isCycling){this.pause();}this._setActiveIndicatorElement(nextElement);var slidEvent=$.Event(Event.SLID,{relatedTarget:nextElement,direction:directionalClassName});if(Util.supportsTransitionEnd()&&$(this._element).hasClass(ClassName.SLIDE)){$(nextElement).addClass(direction);Util.reflow(nextElement);$(activeElement).addClass(directionalClassName);$(nextElement).addClass(directionalClassName);$(activeElement).one(Util.TRANSITION_END,function(){$(nextElement).removeClass(directionalClassName).removeClass(direction);$(nextElement).addClass(ClassName.ACTIVE);$(activeElement).removeClass(ClassName.ACTIVE).removeClass(direction).removeClass(directionalClassName);_this3._isSliding=false;setTimeout(function(){return $(_this3._element).trigger(slidEvent);},0);}).emulateTransitionEnd(TRANSITION_DURATION);}else{$(activeElement).removeClass(ClassName.ACTIVE);$(nextElement).addClass(ClassName.ACTIVE);this._isSliding=false;$(this._element).trigger(slidEvent);}if(isCycling){this.cycle();}}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY);var _config=$.extend({},Default,$(this).data());if((typeof config==='undefined'?'undefined':_typeof(config))==='object'){$.extend(_config,config);}var action=typeof config==='string'?config:_config.slide;if(!data){data=new Carousel(this,_config);$(this).data(DATA_KEY,data);}if(typeof config==='number'){data.to(config);}else if(typeof action==='string'){if(data[action]===undefined){throw new Error('No method named "'+action+'"');}data[action]();}else if(_config.interval){data.pause();data.cycle();}});}},{key:'_dataApiClickHandler',value:function _dataApiClickHandler(event){var selector=Util.getSelectorFromElement(this);if(!selector){return;}var target=$(selector)[0];if(!target||!$(target).hasClass(ClassName.CAROUSEL)){return;}var config=$.extend({},$(target).data(),$(this).data());var slideIndex=this.getAttribute('data-slide-to');if(slideIndex){config.interval=false;}Carousel._jQueryInterface.call($(target),config);if(slideIndex){$(target).data(DATA_KEY).to(slideIndex);}event.preventDefault();}},{key:'VERSION',get:function get(){return VERSION;}},{key:'Default',get:function get(){return Default;}}]);return Carousel;}();$(document).on(Event.CLICK_DATA_API,Selector.DATA_SLIDE,Carousel._dataApiClickHandler);$(window).on(Event.LOAD_DATA_API,function(){$(Selector.DATA_RIDE).each(function(){var $carousel=$(this);Carousel._jQueryInterface.call($carousel,$carousel.data());});});/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=Carousel._jQueryInterface;$.fn[NAME].Constructor=Carousel;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Carousel._jQueryInterface;};return Carousel;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): collapse.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Collapse=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='collapse';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.collapse';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var TRANSITION_DURATION=600;var Default={toggle:true,parent:''};var DefaultType={toggle:'boolean',parent:'string'};var Event={SHOW:'show'+EVENT_KEY,SHOWN:'shown'+EVENT_KEY,HIDE:'hide'+EVENT_KEY,HIDDEN:'hidden'+EVENT_KEY,CLICK_DATA_API:'click'+EVENT_KEY+DATA_API_KEY};var ClassName={IN:'in',COLLAPSE:'collapse',COLLAPSING:'collapsing',COLLAPSED:'collapsed'};var Dimension={WIDTH:'width',HEIGHT:'height'};var Selector={ACTIVES:'.panel > .in, .panel > .collapsing',DATA_TOGGLE:'[data-toggle="collapse"]'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Collapse=function(){function Collapse(element,config){_classCallCheck(this,Collapse);this._isTransitioning=false;this._element=element;this._config=this._getConfig(config);this._triggerArray=$.makeArray($('[data-toggle="collapse"][href="#'+element.id+'"],'+('[data-toggle="collapse"][data-target="#'+element.id+'"]')));this._parent=this._config.parent?this._getParent():null;if(!this._config.parent){this._addAriaAndCollapsedClass(this._element,this._triggerArray);}if(this._config.toggle){this.toggle();}}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Collapse,[{key:'toggle',// public
	value:function toggle(){if($(this._element).hasClass(ClassName.IN)){this.hide();}else{this.show();}}},{key:'show',value:function show(){var _this4=this;if(this._isTransitioning||$(this._element).hasClass(ClassName.IN)){return;}var actives=undefined;var activesData=undefined;if(this._parent){actives=$.makeArray($(Selector.ACTIVES));if(!actives.length){actives=null;}}if(actives){activesData=$(actives).data(DATA_KEY);if(activesData&&activesData._isTransitioning){return;}}var startEvent=$.Event(Event.SHOW);$(this._element).trigger(startEvent);if(startEvent.isDefaultPrevented()){return;}if(actives){Collapse._jQueryInterface.call($(actives),'hide');if(!activesData){$(actives).data(DATA_KEY,null);}}var dimension=this._getDimension();$(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);this._element.style[dimension]=0;this._element.setAttribute('aria-expanded',true);if(this._triggerArray.length){$(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded',true);}this.setTransitioning(true);var complete=function complete(){$(_this4._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);_this4._element.style[dimension]='';_this4.setTransitioning(false);$(_this4._element).trigger(Event.SHOWN);};if(!Util.supportsTransitionEnd()){complete();return;}var capitalizedDimension=dimension[0].toUpperCase()+dimension.slice(1);var scrollSize='scroll'+capitalizedDimension;$(this._element).one(Util.TRANSITION_END,complete).emulateTransitionEnd(TRANSITION_DURATION);this._element.style[dimension]=this._element[scrollSize]+'px';}},{key:'hide',value:function hide(){var _this5=this;if(this._isTransitioning||!$(this._element).hasClass(ClassName.IN)){return;}var startEvent=$.Event(Event.HIDE);$(this._element).trigger(startEvent);if(startEvent.isDefaultPrevented()){return;}var dimension=this._getDimension();var offsetDimension=dimension===Dimension.WIDTH?'offsetWidth':'offsetHeight';this._element.style[dimension]=this._element[offsetDimension]+'px';Util.reflow(this._element);$(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);this._element.setAttribute('aria-expanded',false);if(this._triggerArray.length){$(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded',false);}this.setTransitioning(true);var complete=function complete(){_this5.setTransitioning(false);$(_this5._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);};this._element.style[dimension]=0;if(!Util.supportsTransitionEnd()){complete();return;}$(this._element).one(Util.TRANSITION_END,complete).emulateTransitionEnd(TRANSITION_DURATION);}},{key:'setTransitioning',value:function setTransitioning(isTransitioning){this._isTransitioning=isTransitioning;}},{key:'dispose',value:function dispose(){$.removeData(this._element,DATA_KEY);this._config=null;this._parent=null;this._element=null;this._triggerArray=null;this._isTransitioning=null;}// private
	},{key:'_getConfig',value:function _getConfig(config){config=$.extend({},Default,config);config.toggle=Boolean(config.toggle);// coerce string values
	Util.typeCheckConfig(NAME,config,DefaultType);return config;}},{key:'_getDimension',value:function _getDimension(){var hasWidth=$(this._element).hasClass(Dimension.WIDTH);return hasWidth?Dimension.WIDTH:Dimension.HEIGHT;}},{key:'_getParent',value:function _getParent(){var _this6=this;var parent=$(this._config.parent)[0];var selector='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]';$(parent).find(selector).each(function(i,element){_this6._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element),[element]);});return parent;}},{key:'_addAriaAndCollapsedClass',value:function _addAriaAndCollapsedClass(element,triggerArray){if(element){var isOpen=$(element).hasClass(ClassName.IN);element.setAttribute('aria-expanded',isOpen);if(triggerArray.length){$(triggerArray).toggleClass(ClassName.COLLAPSED,!isOpen).attr('aria-expanded',isOpen);}}}// static
	}],[{key:'_getTargetFromElement',value:function _getTargetFromElement(element){var selector=Util.getSelectorFromElement(element);return selector?$(selector)[0]:null;}},{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var $this=$(this);var data=$this.data(DATA_KEY);var _config=$.extend({},Default,$this.data(),(typeof config==='undefined'?'undefined':_typeof(config))==='object'&&config);if(!data&&_config.toggle&&/show|hide/.test(config)){_config.toggle=false;}if(!data){data=new Collapse(this,_config);$this.data(DATA_KEY,data);}if(typeof config==='string'){if(data[config]===undefined){throw new Error('No method named "'+config+'"');}data[config]();}});}},{key:'VERSION',get:function get(){return VERSION;}},{key:'Default',get:function get(){return Default;}}]);return Collapse;}();$(document).on(Event.CLICK_DATA_API,Selector.DATA_TOGGLE,function(event){event.preventDefault();var target=Collapse._getTargetFromElement(this);var data=$(target).data(DATA_KEY);var config=data?'toggle':$(this).data();Collapse._jQueryInterface.call($(target),config);});/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=Collapse._jQueryInterface;$.fn[NAME].Constructor=Collapse;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Collapse._jQueryInterface;};return Collapse;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): dropdown.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Dropdown=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='dropdown';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.dropdown';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var ESCAPE_KEYCODE=27;// KeyboardEvent.which value for Escape (Esc) key
	var ARROW_UP_KEYCODE=38;// KeyboardEvent.which value for up arrow key
	var ARROW_DOWN_KEYCODE=40;// KeyboardEvent.which value for down arrow key
	var RIGHT_MOUSE_BUTTON_WHICH=3;// MouseEvent.which value for the right button (assuming a right-handed mouse)
	var Event={HIDE:'hide'+EVENT_KEY,HIDDEN:'hidden'+EVENT_KEY,SHOW:'show'+EVENT_KEY,SHOWN:'shown'+EVENT_KEY,CLICK:'click'+EVENT_KEY,CLICK_DATA_API:'click'+EVENT_KEY+DATA_API_KEY,KEYDOWN_DATA_API:'keydown'+EVENT_KEY+DATA_API_KEY};var ClassName={BACKDROP:'dropdown-backdrop',DISABLED:'disabled',OPEN:'open'};var Selector={BACKDROP:'.dropdown-backdrop',DATA_TOGGLE:'[data-toggle="dropdown"]',FORM_CHILD:'.dropdown form',ROLE_MENU:'[role="menu"]',ROLE_LISTBOX:'[role="listbox"]',NAVBAR_NAV:'.navbar-nav',VISIBLE_ITEMS:'[role="menu"] li:not(.disabled) a, '+'[role="listbox"] li:not(.disabled) a'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Dropdown=function(){function Dropdown(element){_classCallCheck(this,Dropdown);this._element=element;this._addEventListeners();}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Dropdown,[{key:'toggle',// public
	value:function toggle(){if(this.disabled||$(this).hasClass(ClassName.DISABLED)){return false;}var parent=Dropdown._getParentFromElement(this);var isActive=$(parent).hasClass(ClassName.OPEN);Dropdown._clearMenus();if(isActive){return false;}if('ontouchstart'in document.documentElement&&!$(parent).closest(Selector.NAVBAR_NAV).length){// if mobile we use a backdrop because click events don't delegate
	var dropdown=document.createElement('div');dropdown.className=ClassName.BACKDROP;$(dropdown).insertBefore(this);$(dropdown).on('click',Dropdown._clearMenus);}var relatedTarget={relatedTarget:this};var showEvent=$.Event(Event.SHOW,relatedTarget);$(parent).trigger(showEvent);if(showEvent.isDefaultPrevented()){return false;}this.focus();this.setAttribute('aria-expanded','true');$(parent).toggleClass(ClassName.OPEN);$(parent).trigger($.Event(Event.SHOWN,relatedTarget));return false;}},{key:'dispose',value:function dispose(){$.removeData(this._element,DATA_KEY);$(this._element).off(EVENT_KEY);this._element=null;}// private
	},{key:'_addEventListeners',value:function _addEventListeners(){$(this._element).on(Event.CLICK,this.toggle);}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY);if(!data){$(this).data(DATA_KEY,data=new Dropdown(this));}if(typeof config==='string'){if(data[config]===undefined){throw new Error('No method named "'+config+'"');}data[config].call(this);}});}},{key:'_clearMenus',value:function _clearMenus(event){if(event&&event.which===RIGHT_MOUSE_BUTTON_WHICH){return;}var backdrop=$(Selector.BACKDROP)[0];if(backdrop){backdrop.parentNode.removeChild(backdrop);}var toggles=$.makeArray($(Selector.DATA_TOGGLE));for(var i=0;i<toggles.length;i++){var _parent=Dropdown._getParentFromElement(toggles[i]);var relatedTarget={relatedTarget:toggles[i]};if(!$(_parent).hasClass(ClassName.OPEN)){continue;}if(event&&event.type==='click'&&/input|textarea/i.test(event.target.tagName)&&$.contains(_parent,event.target)){continue;}var hideEvent=$.Event(Event.HIDE,relatedTarget);$(_parent).trigger(hideEvent);if(hideEvent.isDefaultPrevented()){continue;}toggles[i].setAttribute('aria-expanded','false');$(_parent).removeClass(ClassName.OPEN).trigger($.Event(Event.HIDDEN,relatedTarget));}}},{key:'_getParentFromElement',value:function _getParentFromElement(element){var parent=undefined;var selector=Util.getSelectorFromElement(element);if(selector){parent=$(selector)[0];}return parent||element.parentNode;}},{key:'_dataApiKeydownHandler',value:function _dataApiKeydownHandler(event){if(!/(38|40|27|32)/.test(event.which)||/input|textarea/i.test(event.target.tagName)){return;}event.preventDefault();event.stopPropagation();if(this.disabled||$(this).hasClass(ClassName.DISABLED)){return;}var parent=Dropdown._getParentFromElement(this);var isActive=$(parent).hasClass(ClassName.OPEN);if(!isActive&&event.which!==ESCAPE_KEYCODE||isActive&&event.which===ESCAPE_KEYCODE){if(event.which===ESCAPE_KEYCODE){var toggle=$(parent).find(Selector.DATA_TOGGLE)[0];$(toggle).trigger('focus');}$(this).trigger('click');return;}var items=$.makeArray($(Selector.VISIBLE_ITEMS));items=items.filter(function(item){return item.offsetWidth||item.offsetHeight;});if(!items.length){return;}var index=items.indexOf(event.target);if(event.which===ARROW_UP_KEYCODE&&index>0){// up
	index--;}if(event.which===ARROW_DOWN_KEYCODE&&index<items.length-1){// down
	index++;}if(index<0){index=0;}items[index].focus();}},{key:'VERSION',get:function get(){return VERSION;}}]);return Dropdown;}();$(document).on(Event.KEYDOWN_DATA_API,Selector.DATA_TOGGLE,Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API,Selector.ROLE_MENU,Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API,Selector.ROLE_LISTBOX,Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API,Dropdown._clearMenus).on(Event.CLICK_DATA_API,Selector.DATA_TOGGLE,Dropdown.prototype.toggle).on(Event.CLICK_DATA_API,Selector.FORM_CHILD,function(e){e.stopPropagation();});/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=Dropdown._jQueryInterface;$.fn[NAME].Constructor=Dropdown;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Dropdown._jQueryInterface;};return Dropdown;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): modal.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Modal=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='modal';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.modal';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var TRANSITION_DURATION=300;var BACKDROP_TRANSITION_DURATION=150;var ESCAPE_KEYCODE=27;// KeyboardEvent.which value for Escape (Esc) key
	var Default={backdrop:true,keyboard:true,focus:true,show:true};var DefaultType={backdrop:'(boolean|string)',keyboard:'boolean',focus:'boolean',show:'boolean'};var Event={HIDE:'hide'+EVENT_KEY,HIDDEN:'hidden'+EVENT_KEY,SHOW:'show'+EVENT_KEY,SHOWN:'shown'+EVENT_KEY,FOCUSIN:'focusin'+EVENT_KEY,RESIZE:'resize'+EVENT_KEY,CLICK_DISMISS:'click.dismiss'+EVENT_KEY,KEYDOWN_DISMISS:'keydown.dismiss'+EVENT_KEY,MOUSEUP_DISMISS:'mouseup.dismiss'+EVENT_KEY,MOUSEDOWN_DISMISS:'mousedown.dismiss'+EVENT_KEY,CLICK_DATA_API:'click'+EVENT_KEY+DATA_API_KEY};var ClassName={SCROLLBAR_MEASURER:'modal-scrollbar-measure',BACKDROP:'modal-backdrop',OPEN:'modal-open',FADE:'fade',IN:'in'};var Selector={DIALOG:'.modal-dialog',DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:'.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Modal=function(){function Modal(element,config){_classCallCheck(this,Modal);this._config=this._getConfig(config);this._element=element;this._dialog=$(element).find(Selector.DIALOG)[0];this._backdrop=null;this._isShown=false;this._isBodyOverflowing=false;this._ignoreBackdropClick=false;this._originalBodyPadding=0;this._scrollbarWidth=0;}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Modal,[{key:'toggle',// public
	value:function toggle(relatedTarget){return this._isShown?this.hide():this.show(relatedTarget);}},{key:'show',value:function show(relatedTarget){var _this7=this;var showEvent=$.Event(Event.SHOW,{relatedTarget:relatedTarget});$(this._element).trigger(showEvent);if(this._isShown||showEvent.isDefaultPrevented()){return;}this._isShown=true;this._checkScrollbar();this._setScrollbar();$(document.body).addClass(ClassName.OPEN);this._setEscapeEvent();this._setResizeEvent();$(this._element).on(Event.CLICK_DISMISS,Selector.DATA_DISMISS,$.proxy(this.hide,this));$(this._dialog).on(Event.MOUSEDOWN_DISMISS,function(){$(_this7._element).one(Event.MOUSEUP_DISMISS,function(event){if($(event.target).is(_this7._element)){_this7._ignoreBackdropClick=true;}});});this._showBackdrop($.proxy(this._showElement,this,relatedTarget));}},{key:'hide',value:function hide(event){if(event){event.preventDefault();}var hideEvent=$.Event(Event.HIDE);$(this._element).trigger(hideEvent);if(!this._isShown||hideEvent.isDefaultPrevented()){return;}this._isShown=false;this._setEscapeEvent();this._setResizeEvent();$(document).off(Event.FOCUSIN);$(this._element).removeClass(ClassName.IN);$(this._element).off(Event.CLICK_DISMISS);$(this._dialog).off(Event.MOUSEDOWN_DISMISS);if(Util.supportsTransitionEnd()&&$(this._element).hasClass(ClassName.FADE)){$(this._element).one(Util.TRANSITION_END,$.proxy(this._hideModal,this)).emulateTransitionEnd(TRANSITION_DURATION);}else{this._hideModal();}}},{key:'dispose',value:function dispose(){$.removeData(this._element,DATA_KEY);$(window).off(EVENT_KEY);$(document).off(EVENT_KEY);$(this._element).off(EVENT_KEY);$(this._backdrop).off(EVENT_KEY);this._config=null;this._element=null;this._dialog=null;this._backdrop=null;this._isShown=null;this._isBodyOverflowing=null;this._ignoreBackdropClick=null;this._originalBodyPadding=null;this._scrollbarWidth=null;}// private
	},{key:'_getConfig',value:function _getConfig(config){config=$.extend({},Default,config);Util.typeCheckConfig(NAME,config,DefaultType);return config;}},{key:'_showElement',value:function _showElement(relatedTarget){var _this8=this;var transition=Util.supportsTransitionEnd()&&$(this._element).hasClass(ClassName.FADE);if(!this._element.parentNode||this._element.parentNode.nodeType!==Node.ELEMENT_NODE){// don't move modals dom position
	document.body.appendChild(this._element);}this._element.style.display='block';this._element.removeAttribute('aria-hidden');this._element.scrollTop=0;if(transition){Util.reflow(this._element);}$(this._element).addClass(ClassName.IN);if(this._config.focus){this._enforceFocus();}var shownEvent=$.Event(Event.SHOWN,{relatedTarget:relatedTarget});var transitionComplete=function transitionComplete(){if(_this8._config.focus){_this8._element.focus();}$(_this8._element).trigger(shownEvent);};if(transition){$(this._dialog).one(Util.TRANSITION_END,transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);}else{transitionComplete();}}},{key:'_enforceFocus',value:function _enforceFocus(){var _this9=this;$(document).off(Event.FOCUSIN)// guard against infinite focus loop
	.on(Event.FOCUSIN,function(event){if(document!==event.target&&_this9._element!==event.target&&!$(_this9._element).has(event.target).length){_this9._element.focus();}});}},{key:'_setEscapeEvent',value:function _setEscapeEvent(){var _this10=this;if(this._isShown&&this._config.keyboard){$(this._element).on(Event.KEYDOWN_DISMISS,function(event){if(event.which===ESCAPE_KEYCODE){_this10.hide();}});}else if(!this._isShown){$(this._element).off(Event.KEYDOWN_DISMISS);}}},{key:'_setResizeEvent',value:function _setResizeEvent(){if(this._isShown){$(window).on(Event.RESIZE,$.proxy(this._handleUpdate,this));}else{$(window).off(Event.RESIZE);}}},{key:'_hideModal',value:function _hideModal(){var _this11=this;this._element.style.display='none';this._element.setAttribute('aria-hidden','true');this._showBackdrop(function(){$(document.body).removeClass(ClassName.OPEN);_this11._resetAdjustments();_this11._resetScrollbar();$(_this11._element).trigger(Event.HIDDEN);});}},{key:'_removeBackdrop',value:function _removeBackdrop(){if(this._backdrop){$(this._backdrop).remove();this._backdrop=null;}}},{key:'_showBackdrop',value:function _showBackdrop(callback){var _this12=this;var animate=$(this._element).hasClass(ClassName.FADE)?ClassName.FADE:'';if(this._isShown&&this._config.backdrop){var doAnimate=Util.supportsTransitionEnd()&&animate;this._backdrop=document.createElement('div');this._backdrop.className=ClassName.BACKDROP;if(animate){$(this._backdrop).addClass(animate);}$(this._backdrop).appendTo(document.body);$(this._element).on(Event.CLICK_DISMISS,function(event){if(_this12._ignoreBackdropClick){_this12._ignoreBackdropClick=false;return;}if(event.target!==event.currentTarget){return;}if(_this12._config.backdrop==='static'){_this12._element.focus();}else{_this12.hide();}});if(doAnimate){Util.reflow(this._backdrop);}$(this._backdrop).addClass(ClassName.IN);if(!callback){return;}if(!doAnimate){callback();return;}$(this._backdrop).one(Util.TRANSITION_END,callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);}else if(!this._isShown&&this._backdrop){$(this._backdrop).removeClass(ClassName.IN);var callbackRemove=function callbackRemove(){_this12._removeBackdrop();if(callback){callback();}};if(Util.supportsTransitionEnd()&&$(this._element).hasClass(ClassName.FADE)){$(this._backdrop).one(Util.TRANSITION_END,callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);}else{callbackRemove();}}else if(callback){callback();}}// ----------------------------------------------------------------------
	// the following methods are used to handle overflowing modals
	// todo (fat): these should probably be refactored out of modal.js
	// ----------------------------------------------------------------------
	},{key:'_handleUpdate',value:function _handleUpdate(){this._adjustDialog();}},{key:'_adjustDialog',value:function _adjustDialog(){var isModalOverflowing=this._element.scrollHeight>document.documentElement.clientHeight;if(!this._isBodyOverflowing&&isModalOverflowing){this._element.style.paddingLeft=this._scrollbarWidth+'px';}if(this._isBodyOverflowing&&!isModalOverflowing){this._element.style.paddingRight=this._scrollbarWidth+'px';}}},{key:'_resetAdjustments',value:function _resetAdjustments(){this._element.style.paddingLeft='';this._element.style.paddingRight='';}},{key:'_checkScrollbar',value:function _checkScrollbar(){this._isBodyOverflowing=document.body.clientWidth<window.innerWidth;this._scrollbarWidth=this._getScrollbarWidth();}},{key:'_setScrollbar',value:function _setScrollbar(){var bodyPadding=parseInt($(Selector.FIXED_CONTENT).css('padding-right')||0,10);this._originalBodyPadding=document.body.style.paddingRight||'';if(this._isBodyOverflowing){document.body.style.paddingRight=bodyPadding+this._scrollbarWidth+'px';}}},{key:'_resetScrollbar',value:function _resetScrollbar(){document.body.style.paddingRight=this._originalBodyPadding;}},{key:'_getScrollbarWidth',value:function _getScrollbarWidth(){// thx d.walsh
	var scrollDiv=document.createElement('div');scrollDiv.className=ClassName.SCROLLBAR_MEASURER;document.body.appendChild(scrollDiv);var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth;document.body.removeChild(scrollDiv);return scrollbarWidth;}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config,relatedTarget){return this.each(function(){var data=$(this).data(DATA_KEY);var _config=$.extend({},Modal.Default,$(this).data(),(typeof config==='undefined'?'undefined':_typeof(config))==='object'&&config);if(!data){data=new Modal(this,_config);$(this).data(DATA_KEY,data);}if(typeof config==='string'){if(data[config]===undefined){throw new Error('No method named "'+config+'"');}data[config](relatedTarget);}else if(_config.show){data.show(relatedTarget);}});}},{key:'VERSION',get:function get(){return VERSION;}},{key:'Default',get:function get(){return Default;}}]);return Modal;}();$(document).on(Event.CLICK_DATA_API,Selector.DATA_TOGGLE,function(event){var _this13=this;var target=undefined;var selector=Util.getSelectorFromElement(this);if(selector){target=$(selector)[0];}var config=$(target).data(DATA_KEY)?'toggle':$.extend({},$(target).data(),$(this).data());if(this.tagName==='A'){event.preventDefault();}var $target=$(target).one(Event.SHOW,function(showEvent){if(showEvent.isDefaultPrevented()){// only register focus restorer if modal will actually get shown
	return;}$target.one(Event.HIDDEN,function(){if($(_this13).is(':visible')){_this13.focus();}});});Modal._jQueryInterface.call($(target),config,this);});/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=Modal._jQueryInterface;$.fn[NAME].Constructor=Modal;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Modal._jQueryInterface;};return Modal;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): scrollspy.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var ScrollSpy=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='scrollspy';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.scrollspy';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var Default={offset:10,method:'auto',target:''};var DefaultType={offset:'number',method:'string',target:'(string|element)'};var Event={ACTIVATE:'activate'+EVENT_KEY,SCROLL:'scroll'+EVENT_KEY,LOAD_DATA_API:'load'+EVENT_KEY+DATA_API_KEY};var ClassName={DROPDOWN_ITEM:'dropdown-item',DROPDOWN_MENU:'dropdown-menu',NAV_LINK:'nav-link',NAV:'nav',ACTIVE:'active'};var Selector={DATA_SPY:'[data-spy="scroll"]',ACTIVE:'.active',LIST_ITEM:'.list-item',LI:'li',LI_DROPDOWN:'li.dropdown',NAV_LINKS:'.nav-link',DROPDOWN:'.dropdown',DROPDOWN_ITEMS:'.dropdown-item',DROPDOWN_TOGGLE:'.dropdown-toggle'};var OffsetMethod={OFFSET:'offset',POSITION:'position'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var ScrollSpy=function(){function ScrollSpy(element,config){_classCallCheck(this,ScrollSpy);this._element=element;this._scrollElement=element.tagName==='BODY'?window:element;this._config=this._getConfig(config);this._selector=this._config.target+' '+Selector.NAV_LINKS+','+(this._config.target+' '+Selector.DROPDOWN_ITEMS);this._offsets=[];this._targets=[];this._activeTarget=null;this._scrollHeight=0;$(this._scrollElement).on(Event.SCROLL,$.proxy(this._process,this));this.refresh();this._process();}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(ScrollSpy,[{key:'refresh',// public
	value:function refresh(){var _this14=this;var autoMethod=this._scrollElement!==this._scrollElement.window?OffsetMethod.POSITION:OffsetMethod.OFFSET;var offsetMethod=this._config.method==='auto'?autoMethod:this._config.method;var offsetBase=offsetMethod===OffsetMethod.POSITION?this._getScrollTop():0;this._offsets=[];this._targets=[];this._scrollHeight=this._getScrollHeight();var targets=$.makeArray($(this._selector));targets.map(function(element){var target=undefined;var targetSelector=Util.getSelectorFromElement(element);if(targetSelector){target=$(targetSelector)[0];}if(target&&(target.offsetWidth||target.offsetHeight)){// todo (fat): remove sketch reliance on jQuery position/offset
	return[$(target)[offsetMethod]().top+offsetBase,targetSelector];}return null;}).filter(function(item){return item;}).sort(function(a,b){return a[0]-b[0];}).forEach(function(item){_this14._offsets.push(item[0]);_this14._targets.push(item[1]);});}},{key:'dispose',value:function dispose(){$.removeData(this._element,DATA_KEY);$(this._scrollElement).off(EVENT_KEY);this._element=null;this._scrollElement=null;this._config=null;this._selector=null;this._offsets=null;this._targets=null;this._activeTarget=null;this._scrollHeight=null;}// private
	},{key:'_getConfig',value:function _getConfig(config){config=$.extend({},Default,config);if(typeof config.target!=='string'){var id=$(config.target).attr('id');if(!id){id=Util.getUID(NAME);$(config.target).attr('id',id);}config.target='#'+id;}Util.typeCheckConfig(NAME,config,DefaultType);return config;}},{key:'_getScrollTop',value:function _getScrollTop(){return this._scrollElement===window?this._scrollElement.scrollY:this._scrollElement.scrollTop;}},{key:'_getScrollHeight',value:function _getScrollHeight(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);}},{key:'_process',value:function _process(){var scrollTop=this._getScrollTop()+this._config.offset;var scrollHeight=this._getScrollHeight();var maxScroll=this._config.offset+scrollHeight-this._scrollElement.offsetHeight;if(this._scrollHeight!==scrollHeight){this.refresh();}if(scrollTop>=maxScroll){var target=this._targets[this._targets.length-1];if(this._activeTarget!==target){this._activate(target);}}if(this._activeTarget&&scrollTop<this._offsets[0]){this._activeTarget=null;this._clear();return;}for(var i=this._offsets.length;i--;){var isActiveTarget=this._activeTarget!==this._targets[i]&&scrollTop>=this._offsets[i]&&(this._offsets[i+1]===undefined||scrollTop<this._offsets[i+1]);if(isActiveTarget){this._activate(this._targets[i]);}}}},{key:'_activate',value:function _activate(target){this._activeTarget=target;this._clear();var queries=this._selector.split(',');queries=queries.map(function(selector){return selector+'[data-target="'+target+'"],'+(selector+'[href="'+target+'"]');});var $link=$(queries.join(','));if($link.hasClass(ClassName.DROPDOWN_ITEM)){$link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);$link.addClass(ClassName.ACTIVE);}else{// todo (fat) this is kinda sus...
	// recursively add actives to tested nav-links
	$link.parents(Selector.LI).find(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);}$(this._scrollElement).trigger(Event.ACTIVATE,{relatedTarget:target});}},{key:'_clear',value:function _clear(){$(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY);var _config=(typeof config==='undefined'?'undefined':_typeof(config))==='object'&&config||null;if(!data){data=new ScrollSpy(this,_config);$(this).data(DATA_KEY,data);}if(typeof config==='string'){if(data[config]===undefined){throw new Error('No method named "'+config+'"');}data[config]();}});}},{key:'VERSION',get:function get(){return VERSION;}},{key:'Default',get:function get(){return Default;}}]);return ScrollSpy;}();$(window).on(Event.LOAD_DATA_API,function(){var scrollSpys=$.makeArray($(Selector.DATA_SPY));for(var i=scrollSpys.length;i--;){var $spy=$(scrollSpys[i]);ScrollSpy._jQueryInterface.call($spy,$spy.data());}});/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=ScrollSpy._jQueryInterface;$.fn[NAME].Constructor=ScrollSpy;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return ScrollSpy._jQueryInterface;};return ScrollSpy;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): tab.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Tab=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='tab';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.tab';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var TRANSITION_DURATION=150;var Event={HIDE:'hide'+EVENT_KEY,HIDDEN:'hidden'+EVENT_KEY,SHOW:'show'+EVENT_KEY,SHOWN:'shown'+EVENT_KEY,CLICK_DATA_API:'click'+EVENT_KEY+DATA_API_KEY};var ClassName={DROPDOWN_MENU:'dropdown-menu',ACTIVE:'active',FADE:'fade',IN:'in'};var Selector={A:'a',LI:'li',DROPDOWN:'.dropdown',UL:'ul:not(.dropdown-menu)',FADE_CHILD:'> .nav-item .fade, > .fade',ACTIVE:'.active',ACTIVE_CHILD:'> .nav-item > .active, > .active',DATA_TOGGLE:'[data-toggle="tab"], [data-toggle="pill"]',DROPDOWN_TOGGLE:'.dropdown-toggle',DROPDOWN_ACTIVE_CHILD:'> .dropdown-menu .active'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Tab=function(){function Tab(element){_classCallCheck(this,Tab);this._element=element;}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Tab,[{key:'show',// public
	value:function show(){var _this15=this;if(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&$(this._element).hasClass(ClassName.ACTIVE)){return;}var target=undefined;var previous=undefined;var ulElement=$(this._element).closest(Selector.UL)[0];var selector=Util.getSelectorFromElement(this._element);if(ulElement){previous=$.makeArray($(ulElement).find(Selector.ACTIVE));previous=previous[previous.length-1];}var hideEvent=$.Event(Event.HIDE,{relatedTarget:this._element});var showEvent=$.Event(Event.SHOW,{relatedTarget:previous});if(previous){$(previous).trigger(hideEvent);}$(this._element).trigger(showEvent);if(showEvent.isDefaultPrevented()||hideEvent.isDefaultPrevented()){return;}if(selector){target=$(selector)[0];}this._activate(this._element,ulElement);var complete=function complete(){var hiddenEvent=$.Event(Event.HIDDEN,{relatedTarget:_this15._element});var shownEvent=$.Event(Event.SHOWN,{relatedTarget:previous});$(previous).trigger(hiddenEvent);$(_this15._element).trigger(shownEvent);};if(target){this._activate(target,target.parentNode,complete);}else{complete();}}},{key:'dispose',value:function dispose(){$.removeClass(this._element,DATA_KEY);this._element=null;}// private
	},{key:'_activate',value:function _activate(element,container,callback){var active=$(container).find(Selector.ACTIVE_CHILD)[0];var isTransitioning=callback&&Util.supportsTransitionEnd()&&(active&&$(active).hasClass(ClassName.FADE)||Boolean($(container).find(Selector.FADE_CHILD)[0]));var complete=$.proxy(this._transitionComplete,this,element,active,isTransitioning,callback);if(active&&isTransitioning){$(active).one(Util.TRANSITION_END,complete).emulateTransitionEnd(TRANSITION_DURATION);}else{complete();}if(active){$(active).removeClass(ClassName.IN);}}},{key:'_transitionComplete',value:function _transitionComplete(element,active,isTransitioning,callback){if(active){$(active).removeClass(ClassName.ACTIVE);var dropdownChild=$(active).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];if(dropdownChild){$(dropdownChild).removeClass(ClassName.ACTIVE);}active.setAttribute('aria-expanded',false);}$(element).addClass(ClassName.ACTIVE);element.setAttribute('aria-expanded',true);if(isTransitioning){Util.reflow(element);$(element).addClass(ClassName.IN);}else{$(element).removeClass(ClassName.FADE);}if(element.parentNode&&$(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)){var dropdownElement=$(element).closest(Selector.DROPDOWN)[0];if(dropdownElement){$(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);}element.setAttribute('aria-expanded',true);}if(callback){callback();}}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var $this=$(this);var data=$this.data(DATA_KEY);if(!data){data=data=new Tab(this);$this.data(DATA_KEY,data);}if(typeof config==='string'){if(data[config]===undefined){throw new Error('No method named "'+config+'"');}data[config]();}});}},{key:'VERSION',get:function get(){return VERSION;}}]);return Tab;}();$(document).on(Event.CLICK_DATA_API,Selector.DATA_TOGGLE,function(event){event.preventDefault();Tab._jQueryInterface.call($(this),'show');});/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=Tab._jQueryInterface;$.fn[NAME].Constructor=Tab;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Tab._jQueryInterface;};return Tab;}(jQuery);/* global Tether *//**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): tooltip.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Tooltip=function($){/**
	   * Check for Tether dependency
	   * Tether - http://github.hubspot.com/tether/
	   */if(window.Tether===undefined){throw new Error('Bootstrap tooltips require Tether (http://github.hubspot.com/tether/)');}/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='tooltip';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.tooltip';var EVENT_KEY='.'+DATA_KEY;var JQUERY_NO_CONFLICT=$.fn[NAME];var TRANSITION_DURATION=150;var CLASS_PREFIX='bs-tether';var Default={animation:true,template:'<div class="tooltip" role="tooltip">'+'<div class="tooltip-arrow"></div>'+'<div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,selector:false,placement:'top',offset:'0 0',constraints:[]};var DefaultType={animation:'boolean',template:'string',title:'(string|element|function)',trigger:'string',delay:'(number|object)',html:'boolean',selector:'(string|boolean)',placement:'(string|function)',offset:'string',constraints:'array'};var AttachmentMap={TOP:'bottom center',RIGHT:'middle left',BOTTOM:'top center',LEFT:'middle right'};var HoverState={IN:'in',OUT:'out'};var Event={HIDE:'hide'+EVENT_KEY,HIDDEN:'hidden'+EVENT_KEY,SHOW:'show'+EVENT_KEY,SHOWN:'shown'+EVENT_KEY,INSERTED:'inserted'+EVENT_KEY,CLICK:'click'+EVENT_KEY,FOCUSIN:'focusin'+EVENT_KEY,FOCUSOUT:'focusout'+EVENT_KEY,MOUSEENTER:'mouseenter'+EVENT_KEY,MOUSELEAVE:'mouseleave'+EVENT_KEY};var ClassName={FADE:'fade',IN:'in'};var Selector={TOOLTIP:'.tooltip',TOOLTIP_INNER:'.tooltip-inner'};var TetherClass={element:false,enabled:false};var Trigger={HOVER:'hover',FOCUS:'focus',CLICK:'click',MANUAL:'manual'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Tooltip=function(){function Tooltip(element,config){_classCallCheck(this,Tooltip);// private
	this._isEnabled=true;this._timeout=0;this._hoverState='';this._activeTrigger={};this._tether=null;// protected
	this.element=element;this.config=this._getConfig(config);this.tip=null;this._setListeners();}/**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Tooltip,[{key:'enable',// public
	value:function enable(){this._isEnabled=true;}},{key:'disable',value:function disable(){this._isEnabled=false;}},{key:'toggleEnabled',value:function toggleEnabled(){this._isEnabled=!this._isEnabled;}},{key:'toggle',value:function toggle(event){if(event){var dataKey=this.constructor.DATA_KEY;var context=$(event.currentTarget).data(dataKey);if(!context){context=new this.constructor(event.currentTarget,this._getDelegateConfig());$(event.currentTarget).data(dataKey,context);}context._activeTrigger.click=!context._activeTrigger.click;if(context._isWithActiveTrigger()){context._enter(null,context);}else{context._leave(null,context);}}else{if($(this.getTipElement()).hasClass(ClassName.IN)){this._leave(null,this);return;}this._enter(null,this);}}},{key:'dispose',value:function dispose(){clearTimeout(this._timeout);this.cleanupTether();$.removeData(this.element,this.constructor.DATA_KEY);$(this.element).off(this.constructor.EVENT_KEY);if(this.tip){$(this.tip).remove();}this._isEnabled=null;this._timeout=null;this._hoverState=null;this._activeTrigger=null;this._tether=null;this.element=null;this.config=null;this.tip=null;}},{key:'show',value:function show(){var _this16=this;var showEvent=$.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){$(this.element).trigger(showEvent);var isInTheDom=$.contains(this.element.ownerDocument.documentElement,this.element);if(showEvent.isDefaultPrevented()||!isInTheDom){return;}var tip=this.getTipElement();var tipId=Util.getUID(this.constructor.NAME);tip.setAttribute('id',tipId);this.element.setAttribute('aria-describedby',tipId);this.setContent();if(this.config.animation){$(tip).addClass(ClassName.FADE);}var placement=typeof this.config.placement==='function'?this.config.placement.call(this,tip,this.element):this.config.placement;var attachment=this._getAttachment(placement);$(tip).data(this.constructor.DATA_KEY,this).appendTo(document.body);$(this.element).trigger(this.constructor.Event.INSERTED);this._tether=new Tether({attachment:attachment,element:tip,target:this.element,classes:TetherClass,classPrefix:CLASS_PREFIX,offset:this.config.offset,constraints:this.config.constraints,addTargetClasses:false});Util.reflow(tip);this._tether.position();$(tip).addClass(ClassName.IN);var complete=function complete(){var prevHoverState=_this16._hoverState;_this16._hoverState=null;$(_this16.element).trigger(_this16.constructor.Event.SHOWN);if(prevHoverState===HoverState.OUT){_this16._leave(null,_this16);}};if(Util.supportsTransitionEnd()&&$(this.tip).hasClass(ClassName.FADE)){$(this.tip).one(Util.TRANSITION_END,complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);return;}complete();}}},{key:'hide',value:function hide(callback){var _this17=this;var tip=this.getTipElement();var hideEvent=$.Event(this.constructor.Event.HIDE);var complete=function complete(){if(_this17._hoverState!==HoverState.IN&&tip.parentNode){tip.parentNode.removeChild(tip);}_this17.element.removeAttribute('aria-describedby');$(_this17.element).trigger(_this17.constructor.Event.HIDDEN);_this17.cleanupTether();if(callback){callback();}};$(this.element).trigger(hideEvent);if(hideEvent.isDefaultPrevented()){return;}$(tip).removeClass(ClassName.IN);if(Util.supportsTransitionEnd()&&$(this.tip).hasClass(ClassName.FADE)){$(tip).one(Util.TRANSITION_END,complete).emulateTransitionEnd(TRANSITION_DURATION);}else{complete();}this._hoverState='';}// protected
	},{key:'isWithContent',value:function isWithContent(){return Boolean(this.getTitle());}},{key:'getTipElement',value:function getTipElement(){return this.tip=this.tip||$(this.config.template)[0];}},{key:'setContent',value:function setContent(){var $tip=$(this.getTipElement());this.setElementContent($tip.find(Selector.TOOLTIP_INNER),this.getTitle());$tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);this.cleanupTether();}},{key:'setElementContent',value:function setElementContent($element,content){var html=this.config.html;if((typeof content==='undefined'?'undefined':_typeof(content))==='object'&&(content.nodeType||content.jquery)){// content is a DOM node or a jQuery
	if(html){if(!$(content).parent().is($element)){$element.empty().append(content);}}else{$element.text($(content).text());}}else{$element[html?'html':'text'](content);}}},{key:'getTitle',value:function getTitle(){var title=this.element.getAttribute('data-original-title');if(!title){title=typeof this.config.title==='function'?this.config.title.call(this.element):this.config.title;}return title;}},{key:'cleanupTether',value:function cleanupTether(){if(this._tether){this._tether.destroy();}}// private
	},{key:'_getAttachment',value:function _getAttachment(placement){return AttachmentMap[placement.toUpperCase()];}},{key:'_setListeners',value:function _setListeners(){var _this18=this;var triggers=this.config.trigger.split(' ');triggers.forEach(function(trigger){if(trigger==='click'){$(_this18.element).on(_this18.constructor.Event.CLICK,_this18.config.selector,$.proxy(_this18.toggle,_this18));}else if(trigger!==Trigger.MANUAL){var eventIn=trigger===Trigger.HOVER?_this18.constructor.Event.MOUSEENTER:_this18.constructor.Event.FOCUSIN;var eventOut=trigger===Trigger.HOVER?_this18.constructor.Event.MOUSELEAVE:_this18.constructor.Event.FOCUSOUT;$(_this18.element).on(eventIn,_this18.config.selector,$.proxy(_this18._enter,_this18)).on(eventOut,_this18.config.selector,$.proxy(_this18._leave,_this18));}});if(this.config.selector){this.config=$.extend({},this.config,{trigger:'manual',selector:''});}else{this._fixTitle();}}},{key:'_fixTitle',value:function _fixTitle(){var titleType=_typeof(this.element.getAttribute('data-original-title'));if(this.element.getAttribute('title')||titleType!=='string'){this.element.setAttribute('data-original-title',this.element.getAttribute('title')||'');this.element.setAttribute('title','');}}},{key:'_enter',value:function _enter(event,context){var dataKey=this.constructor.DATA_KEY;context=context||$(event.currentTarget).data(dataKey);if(!context){context=new this.constructor(event.currentTarget,this._getDelegateConfig());$(event.currentTarget).data(dataKey,context);}if(event){context._activeTrigger[event.type==='focusin'?Trigger.FOCUS:Trigger.HOVER]=true;}if($(context.getTipElement()).hasClass(ClassName.IN)||context._hoverState===HoverState.IN){context._hoverState=HoverState.IN;return;}clearTimeout(context._timeout);context._hoverState=HoverState.IN;if(!context.config.delay||!context.config.delay.show){context.show();return;}context._timeout=setTimeout(function(){if(context._hoverState===HoverState.IN){context.show();}},context.config.delay.show);}},{key:'_leave',value:function _leave(event,context){var dataKey=this.constructor.DATA_KEY;context=context||$(event.currentTarget).data(dataKey);if(!context){context=new this.constructor(event.currentTarget,this._getDelegateConfig());$(event.currentTarget).data(dataKey,context);}if(event){context._activeTrigger[event.type==='focusout'?Trigger.FOCUS:Trigger.HOVER]=false;}if(context._isWithActiveTrigger()){return;}clearTimeout(context._timeout);context._hoverState=HoverState.OUT;if(!context.config.delay||!context.config.delay.hide){context.hide();return;}context._timeout=setTimeout(function(){if(context._hoverState===HoverState.OUT){context.hide();}},context.config.delay.hide);}},{key:'_isWithActiveTrigger',value:function _isWithActiveTrigger(){for(var trigger in this._activeTrigger){if(this._activeTrigger[trigger]){return true;}}return false;}},{key:'_getConfig',value:function _getConfig(config){config=$.extend({},this.constructor.Default,$(this.element).data(),config);if(config.delay&&typeof config.delay==='number'){config.delay={show:config.delay,hide:config.delay};}Util.typeCheckConfig(NAME,config,this.constructor.DefaultType);return config;}},{key:'_getDelegateConfig',value:function _getDelegateConfig(){var config={};if(this.config){for(var key in this.config){if(this.constructor.Default[key]!==this.config[key]){config[key]=this.config[key];}}}return config;}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY);var _config=(typeof config==='undefined'?'undefined':_typeof(config))==='object'?config:null;if(!data&&/destroy|hide/.test(config)){return;}if(!data){data=new Tooltip(this,_config);$(this).data(DATA_KEY,data);}if(typeof config==='string'){if(data[config]===undefined){throw new Error('No method named "'+config+'"');}data[config]();}});}},{key:'VERSION',get:function get(){return VERSION;}},{key:'Default',get:function get(){return Default;}},{key:'NAME',get:function get(){return NAME;}},{key:'DATA_KEY',get:function get(){return DATA_KEY;}},{key:'Event',get:function get(){return Event;}},{key:'EVENT_KEY',get:function get(){return EVENT_KEY;}},{key:'DefaultType',get:function get(){return DefaultType;}}]);return Tooltip;}();$.fn[NAME]=Tooltip._jQueryInterface;$.fn[NAME].Constructor=Tooltip;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Tooltip._jQueryInterface;};return Tooltip;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): popover.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Popover=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='popover';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.popover';var EVENT_KEY='.'+DATA_KEY;var JQUERY_NO_CONFLICT=$.fn[NAME];var Default=$.extend({},Tooltip.Default,{placement:'right',trigger:'click',content:'',template:'<div class="popover" role="tooltip">'+'<div class="popover-arrow"></div>'+'<h3 class="popover-title"></h3>'+'<div class="popover-content"></div></div>'});var DefaultType=$.extend({},Tooltip.DefaultType,{content:'(string|element|function)'});var ClassName={FADE:'fade',IN:'in'};var Selector={TITLE:'.popover-title',CONTENT:'.popover-content',ARROW:'.popover-arrow'};var Event={HIDE:'hide'+EVENT_KEY,HIDDEN:'hidden'+EVENT_KEY,SHOW:'show'+EVENT_KEY,SHOWN:'shown'+EVENT_KEY,INSERTED:'inserted'+EVENT_KEY,CLICK:'click'+EVENT_KEY,FOCUSIN:'focusin'+EVENT_KEY,FOCUSOUT:'focusout'+EVENT_KEY,MOUSEENTER:'mouseenter'+EVENT_KEY,MOUSELEAVE:'mouseleave'+EVENT_KEY};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Popover=function(_Tooltip){_inherits(Popover,_Tooltip);function Popover(){_classCallCheck(this,Popover);_get(Object.getPrototypeOf(Popover.prototype),'constructor',this).apply(this,arguments);}/**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     */_createClass(Popover,[{key:'isWithContent',// overrides
	value:function isWithContent(){return this.getTitle()||this._getContent();}},{key:'getTipElement',value:function getTipElement(){return this.tip=this.tip||$(this.config.template)[0];}},{key:'setContent',value:function setContent(){var $tip=$(this.getTipElement());// we use append for html objects to maintain js events
	this.setElementContent($tip.find(Selector.TITLE),this.getTitle());this.setElementContent($tip.find(Selector.CONTENT),this._getContent());$tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);this.cleanupTether();}// private
	},{key:'_getContent',value:function _getContent(){return this.element.getAttribute('data-content')||(typeof this.config.content==='function'?this.config.content.call(this.element):this.config.content);}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY);var _config=(typeof config==='undefined'?'undefined':_typeof(config))==='object'?config:null;if(!data&&/destroy|hide/.test(config)){return;}if(!data){data=new Popover(this,_config);$(this).data(DATA_KEY,data);}if(typeof config==='string'){if(data[config]===undefined){throw new Error('No method named "'+config+'"');}data[config]();}});}},{key:'VERSION',// getters
	get:function get(){return VERSION;}},{key:'Default',get:function get(){return Default;}},{key:'NAME',get:function get(){return NAME;}},{key:'DATA_KEY',get:function get(){return DATA_KEY;}},{key:'Event',get:function get(){return Event;}},{key:'EVENT_KEY',get:function get(){return EVENT_KEY;}},{key:'DefaultType',get:function get(){return DefaultType;}}]);return Popover;}(Tooltip);$.fn[NAME]=Popover._jQueryInterface;$.fn[NAME].Constructor=Popover;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Popover._jQueryInterface;};return Popover;}(jQuery);}(jQuery);

	var Util = function () {

	  /**
	   * ------------------------------------------------------------------------
	   * Private TransitionEnd Helpers
	   * ------------------------------------------------------------------------
	   */

	  var transitionEnd = false;
	  var _transitionEndSelector = '';

	  var TransitionEndEvent = {
	    WebkitTransition: 'webkitTransitionEnd',
	    MozTransition: 'transitionend',
	    OTransition: 'oTransitionEnd otransitionend',
	    transition: 'transitionend'
	  };

	  function transitionEndTest() {
	    if (window.QUnit) {
	      return false;
	    }

	    var el = document.createElement('bmd');

	    for (var name in TransitionEndEvent) {
	      if (el.style[name] !== undefined) {
	        return TransitionEndEvent[name]; // { end: TransitionEndEvent[name] }
	      }
	    }

	    return false;
	  }

	  function setTransitionEndSupport() {
	    transitionEnd = transitionEndTest();

	    // generate a concatenated transition end event selector
	    for (var name in TransitionEndEvent) {
	      _transitionEndSelector += ' ' + TransitionEndEvent[name];
	    }
	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Public Util Api
	   * --------------------------------------------------------------------------
	   */

	  var Util = {
	    transitionEndSupported: function transitionEndSupported() {
	      return transitionEnd;
	    },
	    transitionEndSelector: function transitionEndSelector() {
	      return _transitionEndSelector;
	    },
	    isChar: function isChar(event) {
	      if (typeof event.which === 'undefined') {
	        return true;
	      } else if (typeof event.which === 'number' && event.which > 0) {
	        return !event.ctrlKey && !event.metaKey && !event.altKey && event.which !== 8 // backspace
	        && event.which !== 9 // tab
	        && event.which !== 13 // enter
	        && event.which !== 16 // shift
	        && event.which !== 17 // ctrl
	        && event.which !== 20 // caps lock
	        && event.which !== 27 // escape
	        ;
	      }
	      return false;
	    },
	    assert: function assert($element, invalidTest, message) {
	      if (invalidTest) {
	        if (!$element === undefined) {
	          $element.css('border', '1px solid red');
	        }
	        console.error(message, $element); // eslint-disable-line no-console
	        throw message;
	      }
	    },
	    describe: function describe($element) {
	      if ($element === undefined) {
	        return 'undefined';
	      } else if ($element.length === 0) {
	        return '(no matching elements)';
	      }
	      return $element[0].outerHTML.split('>')[0] + '>';
	    }
	  };

	  setTransitionEndSupport();
	  return Util;
	}(jQuery);

	var Base = function ($) {

	  var ClassName = {
	    BMD_FORM_GROUP: 'bmd-form-group',
	    IS_FILLED: 'is-filled',
	    IS_FOCUSED: 'is-focused'
	  };

	  var Selector = {
	    BMD_FORM_GROUP: '.' + ClassName.BMD_FORM_GROUP
	  };

	  var Default = {};

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Base = function () {

	    /**
	     *
	     * @param element
	     * @param config
	     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
	     */
	    function Base($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	      classCallCheck(this, Base);

	      this.$element = $element;
	      this.config = $.extend(true, {}, Default, config);

	      // set properties for use in the constructor initialization
	      for (var key in properties) {
	        this[key] = properties[key];
	      }
	    }

	    createClass(Base, [{
	      key: 'dispose',
	      value: function dispose(dataKey) {
	        this.$element.data(dataKey, null);
	        this.$element = null;
	        this.config = null;
	      }

	      // ------------------------------------------------------------------------
	      // protected

	    }, {
	      key: 'addFormGroupFocus',
	      value: function addFormGroupFocus() {
	        if (!this.$element.prop('disabled')) {
	          this.$bmdFormGroup.addClass(ClassName.IS_FOCUSED);
	        }
	      }
	    }, {
	      key: 'removeFormGroupFocus',
	      value: function removeFormGroupFocus() {
	        this.$bmdFormGroup.removeClass(ClassName.IS_FOCUSED);
	      }
	    }, {
	      key: 'removeIsFilled',
	      value: function removeIsFilled() {
	        this.$bmdFormGroup.removeClass(ClassName.IS_FILLED);
	      }
	    }, {
	      key: 'addIsFilled',
	      value: function addIsFilled() {
	        this.$bmdFormGroup.addClass(ClassName.IS_FILLED);
	      }

	      // Find bmd-form-group

	    }, {
	      key: 'findMdbFormGroup',
	      value: function findMdbFormGroup() {
	        var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	        var mfg = this.$element.closest(Selector.BMD_FORM_GROUP);
	        if (mfg.length === 0 && raiseError) {
	          $.error('Failed to find ' + Selector.BMD_FORM_GROUP + ' for ' + Util.describe(this.$element));
	        }
	        return mfg;
	      }

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }]);
	    return Base;
	  }();

	  return Base;
	}(jQuery);

	var BaseInput = function ($) {

	  var ClassName = {
	    FORM_GROUP: 'form-group',
	    BMD_FORM_GROUP: 'bmd-form-group',
	    BMD_LABEL: 'bmd-label',
	    BMD_LABEL_STATIC: 'bmd-label-static',
	    BMD_LABEL_PLACEHOLDER: 'bmd-label-placeholder',
	    BMD_LABEL_FLOATING: 'bmd-label-floating',
	    HAS_DANGER: 'has-danger',
	    IS_FILLED: 'is-filled',
	    IS_FOCUSED: 'is-focused',
	    INPUT_GROUP: 'input-group'
	  };

	  var Selector = {
	    FORM_GROUP: '.' + ClassName.FORM_GROUP,
	    BMD_FORM_GROUP: '.' + ClassName.BMD_FORM_GROUP,
	    BMD_LABEL_WILDCARD: 'label[class^=\'' + ClassName.BMD_LABEL + '\'], label[class*=\' ' + ClassName.BMD_LABEL + '\']' // match any label variant if specified
	  };

	  var Default = {
	    validate: false,
	    formGroup: {
	      required: false
	    },
	    bmdFormGroup: {
	      template: '<span class=\'' + ClassName.BMD_FORM_GROUP + '\'></span>',
	      create: true, // create a wrapper if form-group not found
	      required: true // not recommended to turn this off, only used for inline components
	    },
	    label: {
	      required: false,

	      // Prioritized find order for resolving the label to be used as an bmd-label if not specified in the markup
	      //  - a function(thisComponent); or
	      //  - a string selector used like $bmdFormGroup.find(selector)
	      //
	      // Note this only runs if $bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD) fails to find a label (as authored in the markup)
	      //
	      selectors: ['.form-control-label', // in the case of horizontal or inline forms, this will be marked
	      '> label' // usual case for text inputs, first child.  Deeper would find toggle labels so don't do that.
	      ],
	      className: ClassName.BMD_LABEL_STATIC
	    },
	    requiredClasses: [],
	    invalidComponentMatches: [],
	    convertInputSizeVariations: true
	  };

	  var FormControlSizeMarkers = {
	    'form-control-lg': 'bmd-form-group-lg',
	    'form-control-sm': 'bmd-form-group-sm'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var BaseInput = function (_Base) {
	    inherits(BaseInput, _Base);

	    /**
	     *
	     * @param element
	     * @param config
	     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
	     */
	    function BaseInput($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	      classCallCheck(this, BaseInput);

	      // Enforce no overlap between components to prevent side effects
	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(BaseInput).call(this, $element, $.extend(true, {}, Default, config), properties));

	      _this._rejectInvalidComponentMatches();

	      // Enforce expected structure (if any)
	      _this.rejectWithoutRequiredStructure();

	      // Enforce required classes for a consistent rendering
	      _this._rejectWithoutRequiredClasses();

	      // Resolve the form-group first, it will be used for bmd-form-group if possible
	      //   note: different components have different rules
	      _this.$formGroup = _this.findFormGroup(_this.config.formGroup.required);

	      // Will add bmd-form-group to form-group or create an bmd-form-group
	      //  Performance Note: for those forms that are really performance driven, create the markup with the .bmd-form-group to avoid
	      //    rendering changes once added.
	      _this.$bmdFormGroup = _this.resolveMdbFormGroup();

	      // Resolve and mark the bmdLabel if necessary as defined by the config
	      _this.$bmdLabel = _this.resolveMdbLabel();

	      // Signal to the bmd-form-group that a form-control-* variation is being used
	      _this.resolveMdbFormGroupSizing();

	      _this.addFocusListener();
	      _this.addChangeListener();

	      if (_this.$element.val() != '') {
	        _this.addIsFilled();
	      }
	      return _this;
	    }

	    createClass(BaseInput, [{
	      key: 'dispose',
	      value: function dispose(dataKey) {
	        get(Object.getPrototypeOf(BaseInput.prototype), 'dispose', this).call(this, dataKey);
	        this.$bmdFormGroup = null;
	        this.$formGroup = null;
	      }

	      // ------------------------------------------------------------------------
	      // protected

	    }, {
	      key: 'rejectWithoutRequiredStructure',
	      value: function rejectWithoutRequiredStructure() {
	        // implement
	      }
	    }, {
	      key: 'addFocusListener',
	      value: function addFocusListener() {
	        var _this2 = this;

	        this.$element.on('focus', function () {
	          _this2.addFormGroupFocus();
	        }).on('blur', function () {
	          _this2.removeFormGroupFocus();
	        });
	      }
	    }, {
	      key: 'addChangeListener',
	      value: function addChangeListener() {
	        var _this3 = this;

	        this.$element.on('keydown paste', function (event) {
	          if (Util.isChar(event)) {
	            _this3.addIsFilled();
	          }
	        }).on('keyup change', function () {

	          // make sure empty is added back when there is a programmatic value change.
	          //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
	          if (_this3.isEmpty()) {
	            _this3.removeIsFilled();
	          } else {
	            _this3.addIsFilled();
	          }

	          if (_this3.config.validate) {
	            // Validation events do not bubble, so they must be attached directly to the text: http://jsfiddle.net/PEpRM/1/
	            //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
	            //  the form-group on change.
	            //
	            // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
	            //        BUT, I've left it here for backwards compatibility.
	            var isValid = typeof _this3.$element[0].checkValidity === 'undefined' || _this3.$element[0].checkValidity();
	            if (isValid) {
	              _this3.removeHasDanger();
	            } else {
	              _this3.addHasDanger();
	            }
	          }
	        });
	      }
	    }, {
	      key: 'addHasDanger',
	      value: function addHasDanger() {
	        this.$bmdFormGroup.addClass(ClassName.HAS_DANGER);
	      }
	    }, {
	      key: 'removeHasDanger',
	      value: function removeHasDanger() {
	        this.$bmdFormGroup.removeClass(ClassName.HAS_DANGER);
	      }
	    }, {
	      key: 'isEmpty',
	      value: function isEmpty() {
	        return this.$element.val() === null || this.$element.val() === undefined || this.$element.val() === '';
	      }

	      // Will add bmd-form-group to form-group or create a bmd-form-group if necessary

	    }, {
	      key: 'resolveMdbFormGroup',
	      value: function resolveMdbFormGroup() {
	        var mfg = this.findMdbFormGroup(false);
	        if (mfg === undefined || mfg.length === 0) {
	          if (this.config.bmdFormGroup.create && (this.$formGroup === undefined || this.$formGroup.length === 0)) {
	            // If a form-group doesn't exist (not recommended), take a guess and wrap the element (assuming no label).
	            //  note: it's possible to make this smarter, but I need to see valid cases before adding any complexity.

	            // this may be an input-group, wrap that instead
	            if (this.outerElement().parent().hasClass(ClassName.INPUT_GROUP)) {
	              this.outerElement().parent().wrap(this.config.bmdFormGroup.template);
	            } else {
	              this.outerElement().wrap(this.config.bmdFormGroup.template);
	            }
	          } else {
	            // a form-group does exist, add our marker class to it
	            this.$formGroup.addClass(ClassName.BMD_FORM_GROUP);

	            // OLD: may want to implement this after all, see how the styling turns out, but using an existing form-group is less manipulation of the dom and therefore preferable
	            // A form-group does exist, so add an bmd-form-group wrapping it's internal contents
	            //fg.wrapInner(this.config.bmdFormGroup.template)
	          }

	          mfg = this.findMdbFormGroup(this.config.bmdFormGroup.required);
	        }

	        return mfg;
	      }

	      // Demarcation element (e.g. first child of a form-group)
	      //  Subclasses such as file inputs may have different structures

	    }, {
	      key: 'outerElement',
	      value: function outerElement() {
	        return this.$element;
	      }

	      // Will add bmd-label to bmd-form-group if not already specified

	    }, {
	      key: 'resolveMdbLabel',
	      value: function resolveMdbLabel() {

	        var label = this.$bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD);
	        if (label === undefined || label.length === 0) {
	          // we need to find it based on the configured selectors
	          label = this.findMdbLabel(this.config.label.required);

	          if (label === undefined || label.length === 0) {
	            // no label found, and finder did not require one
	          } else {
	            // a candidate label was found, add the configured default class name
	            label.addClass(this.config.label.className);
	          }
	        }

	        return label;
	      }

	      // Find bmd-label variant based on the config selectors

	    }, {
	      key: 'findMdbLabel',
	      value: function findMdbLabel() {
	        var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	        var label = null;

	        // use the specified selector order
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = this.config.label.selectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var selector = _step.value;

	            if ($.isFunction(selector)) {
	              label = selector(this);
	            } else {
	              label = this.$bmdFormGroup.find(selector);
	            }

	            if (label !== undefined && label.length > 0) {
	              break;
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }

	        if (label.length === 0 && raiseError) {
	          $.error('Failed to find ' + Selector.BMD_LABEL_WILDCARD + ' within form-group for ' + Util.describe(this.$element));
	        }
	        return label;
	      }

	      // Find bmd-form-group

	    }, {
	      key: 'findFormGroup',
	      value: function findFormGroup() {
	        var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	        var fg = this.$element.closest(Selector.FORM_GROUP);
	        if (fg.length === 0 && raiseError) {
	          $.error('Failed to find ' + Selector.FORM_GROUP + ' for ' + Util.describe(this.$element));
	        }
	        return fg;
	      }

	      // Due to the interconnected nature of labels/inputs/help-blocks, signal the bmd-form-group-* size variation based on
	      //  a found form-control-* size

	    }, {
	      key: 'resolveMdbFormGroupSizing',
	      value: function resolveMdbFormGroupSizing() {
	        if (!this.config.convertInputSizeVariations) {
	          return;
	        }

	        // Modification - Change text-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
	        for (var inputSize in FormControlSizeMarkers) {
	          if (this.$element.hasClass(inputSize)) {
	            //this.$element.removeClass(inputSize)
	            this.$bmdFormGroup.addClass(FormControlSizeMarkers[inputSize]);
	          }
	        }
	      }

	      // ------------------------------------------------------------------------
	      // private

	    }, {
	      key: '_rejectInvalidComponentMatches',
	      value: function _rejectInvalidComponentMatches() {
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = this.config.invalidComponentMatches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var otherComponent = _step2.value;

	            otherComponent.rejectMatch(this.constructor.name, this.$element);
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }
	      }
	    }, {
	      key: '_rejectWithoutRequiredClasses',
	      value: function _rejectWithoutRequiredClasses() {
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	          for (var _iterator3 = this.config.requiredClasses[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var requiredClass = _step3.value;


	            var found = false;
	            // allow one of several classes to be passed in x||y
	            if (requiredClass.indexOf('||') !== -1) {
	              var oneOf = requiredClass.split('||');
	              var _iteratorNormalCompletion4 = true;
	              var _didIteratorError4 = false;
	              var _iteratorError4 = undefined;

	              try {
	                for (var _iterator4 = oneOf[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                  var _requiredClass = _step4.value;

	                  if (this.$element.hasClass(_requiredClass)) {
	                    found = true;
	                    break;
	                  }
	                }
	              } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	              } finally {
	                try {
	                  if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                    _iterator4.return();
	                  }
	                } finally {
	                  if (_didIteratorError4) {
	                    throw _iteratorError4;
	                  }
	                }
	              }
	            } else if (this.$element.hasClass(requiredClass)) {
	              found = true;
	            }

	            // error if not found
	            if (!found) {
	              $.error(this.constructor.name + ' element: ' + Util.describe(this.$element) + ' requires class: ' + requiredClass);
	            }
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	              _iterator3.return();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }
	      }

	      // ------------------------------------------------------------------------
	      // static

	    }]);
	    return BaseInput;
	  }(Base);

	  return BaseInput;
	}(jQuery);

	var BaseSelection = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var Default = {
	    label: {
	      required: false

	      // Prioritized find order for resolving the label to be used as an bmd-label if not specified in the markup
	      //  - a function(thisComponent); or
	      //  - a string selector used like $bmdFormGroup.find(selector)
	      //
	      // Note this only runs if $bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD) fails to find a label (as authored in the markup)
	      //
	      //selectors: [
	      //  `.form-control-label`, // in the case of horizontal or inline forms, this will be marked
	      //  `> label` // usual case for text inputs
	      //]
	    }
	  };

	  var Selector = {
	    LABEL: 'label'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var BaseSelection = function (_BaseInput) {
	    inherits(BaseSelection, _BaseInput);

	    function BaseSelection($element, config, properties) {
	      classCallCheck(this, BaseSelection);

	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(BaseSelection).call(this, $element, $.extend(true, {}, Default, config), properties));
	      // properties = {inputType: checkbox, outerClass: checkbox-inline}
	      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
	      // '.${this.outerClass} > label > input[type=${this.inputType}]'

	      _this.decorateMarkup();
	      return _this;
	    }

	    // ------------------------------------------------------------------------
	    // protected

	    createClass(BaseSelection, [{
	      key: 'decorateMarkup',
	      value: function decorateMarkup() {
	        this.$element.after(this.config.template);
	      }

	      // Demarcation element (e.g. first child of a form-group)

	    }, {
	      key: 'outerElement',
	      value: function outerElement() {
	        // .checkbox|switch|radio > label > input[type=checkbox|radio]
	        // label.checkbox-inline > input[type=checkbox|radio]
	        // .${this.outerClass} > label > input[type=${this.inputType}]
	        return this.$element.parent().closest('.' + this.outerClass);
	      }
	    }, {
	      key: 'rejectWithoutRequiredStructure',
	      value: function rejectWithoutRequiredStructure() {
	        // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
	        // '.${this.outerClass} > label > input[type=${this.inputType}]'
	        Util.assert(this.$element, !this.$element.parent().prop('tagName') === 'label', this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element should be <label>.');
	        Util.assert(this.$element, !this.outerElement().hasClass(this.outerClass), this.constructor.name + '\'s ' + Util.describe(this.$element) + ' outer element should have class ' + this.outerClass + '.');
	      }
	    }, {
	      key: 'addFocusListener',
	      value: function addFocusListener() {
	        var _this2 = this;

	        // checkboxes didn't appear to bubble to the document, so we'll bind these directly
	        this.$element.closest(Selector.LABEL).hover(function () {
	          _this2.addFormGroupFocus();
	        }, function () {
	          _this2.removeFormGroupFocus();
	        });
	      }
	    }, {
	      key: 'addChangeListener',
	      value: function addChangeListener() {
	        var _this3 = this;

	        this.$element.change(function () {
	          _this3.$element.blur();
	        });
	      }

	      // ------------------------------------------------------------------------
	      // private

	    }]);
	    return BaseSelection;
	  }(BaseInput);

	  return BaseSelection;
	}(jQuery);

	var Checkbox = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'checkbox';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {
	    template: '<span class=\'checkbox-decorator\'><span class=\'check\'></span></span>'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Checkbox = function (_BaseSelection) {
	    inherits(Checkbox, _BaseSelection);

	    function Checkbox($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: NAME, outerClass: NAME } : arguments[2];
	      classCallCheck(this, Checkbox);
	      return possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this, $element, $.extend(true,
	      //{invalidComponentMatches: [File, Radio, Text, Textarea, Select]},
	      Default, config), properties));
	    }

	    createClass(Checkbox, [{
	      key: 'dispose',
	      value: function dispose() {
	        var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

	        get(Object.getPrototypeOf(Checkbox.prototype), 'dispose', this).call(this, dataKey);
	      }
	    }], [{
	      key: 'matches',
	      value: function matches($element) {
	        // '.checkbox > label > input[type=checkbox]'
	        if ($element.attr('type') === 'checkbox') {
	          return true;
	        }
	        return false;
	      }
	    }, {
	      key: 'rejectMatch',
	      value: function rejectMatch(component, $element) {
	        Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'checkbox\'.');
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }, {
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Checkbox($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Checkbox;
	  }(BaseSelection);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Checkbox._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Checkbox;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Checkbox._jQueryInterface;
	  };

	  return Checkbox;
	}(jQuery);

	var CheckboxInline = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'checkboxInline';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {
	    bmdFormGroup: {
	      create: false, // no bmd-form-group creation if form-group not present. It messes with the layout.
	      required: false
	    }
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var CheckboxInline = function (_Checkbox) {
	    inherits(CheckboxInline, _Checkbox);

	    function CheckboxInline($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'checkbox', outerClass: 'checkbox-inline' } : arguments[2];
	      classCallCheck(this, CheckboxInline);
	      return possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxInline).call(this, $element, $.extend(true, {}, Default, config), properties));
	    }

	    createClass(CheckboxInline, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(CheckboxInline.prototype), 'dispose', this).call(this, DATA_KEY);
	      }

	      //static matches($element) {
	      //  // '.checkbox-inline > input[type=checkbox]'
	      //  if ($element.attr('type') === 'checkbox') {
	      //    return true
	      //  }
	      //  return false
	      //}
	      //
	      //static rejectMatch(component, $element) {
	      //  Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='checkbox'.`)
	      //}

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new CheckboxInline($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return CheckboxInline;
	  }(Checkbox);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = CheckboxInline._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = CheckboxInline;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return CheckboxInline._jQueryInterface;
	  };

	  return CheckboxInline;
	}(jQuery);

	var CollapseInline = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'collapseInline';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Selector = {
	    ANY_INPUT: 'input, select, textarea'
	  };

	  var ClassName = {
	    IN: 'in',
	    COLLAPSE: 'collapse',
	    COLLAPSING: 'collapsing',
	    COLLAPSED: 'collapsed',
	    WIDTH: 'width'
	  };
	  var Default = {};

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var CollapseInline = function (_Base) {
	    inherits(CollapseInline, _Base);

	    // $element is expected to be the trigger
	    //  i.e. <button class="btn bmd-btn-icon" for="search" data-toggle="collapse" data-target="#search-field" aria-expanded="false" aria-controls="search-field">
	    function CollapseInline($element, config) {
	      classCallCheck(this, CollapseInline);

	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(CollapseInline).call(this, $element, $.extend(true, {}, Default, config)));

	      _this.$bmdFormGroup = _this.findMdbFormGroup(true);

	      var collapseSelector = $element.data('target');
	      _this.$collapse = $(collapseSelector);

	      Util.assert($element, _this.$collapse.length === 0, 'Cannot find collapse target for ' + Util.describe($element));
	      Util.assert(_this.$collapse, !_this.$collapse.hasClass(ClassName.COLLAPSE), Util.describe(_this.$collapse) + ' is expected to have the \'' + ClassName.COLLAPSE + '\' class.  It is being targeted by ' + Util.describe($element));

	      // find the first input for focusing
	      var $inputs = _this.$bmdFormGroup.find(Selector.ANY_INPUT);
	      if ($inputs.length > 0) {
	        _this.$input = $inputs.first();
	      }

	      // automatically add the marker class to collapse width instead of height - nice convenience because it is easily forgotten
	      if (!_this.$collapse.hasClass(ClassName.WIDTH)) {
	        _this.$collapse.addClass(ClassName.WIDTH);
	      }

	      if (_this.$input) {
	        // add a listener to set focus
	        _this.$collapse.on('shown.bs.collapse', function () {
	          _this.$input.focus();
	        });

	        // add a listener to collapse field
	        _this.$input.blur(function () {
	          _this.$collapse.collapse('hide');
	        });
	      }
	      return _this;
	    }

	    createClass(CollapseInline, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(CollapseInline.prototype), 'dispose', this).call(this, DATA_KEY);
	        this.$bmdFormGroup = null;
	        this.$collapse = null;
	        this.$input = null;
	      }

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new CollapseInline($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return CollapseInline;
	  }(Base);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = CollapseInline._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = CollapseInline;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return CollapseInline._jQueryInterface;
	  };

	  return CollapseInline;
	}(jQuery);

	var File = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'file';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {};

	  var ClassName = {
	    FILE: NAME,
	    IS_FILE: 'is-file'
	  };

	  var Selector = {
	    FILENAMES: 'input.form-control[readonly]'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var File = function (_BaseInput) {
	    inherits(File, _BaseInput);

	    function File($element, config) {
	      classCallCheck(this, File);

	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(File).call(this, $element, $.extend(true,
	      //{invalidComponentMatches: [Checkbox, Radio, Text, Textarea, Select, Switch]},
	      Default, config)));

	      _this.$bmdFormGroup.addClass(ClassName.IS_FILE);
	      return _this;
	    }

	    createClass(File, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(File.prototype), 'dispose', this).call(this, DATA_KEY);
	      }
	    }, {
	      key: 'outerElement',


	      // ------------------------------------------------------------------------
	      // protected

	      // Demarcation element (e.g. first child of a form-group)
	      value: function outerElement() {
	        // label.file > input[type=file]
	        return this.$element.parent().closest('.' + ClassName.FILE);
	      }
	    }, {
	      key: 'rejectWithoutRequiredStructure',
	      value: function rejectWithoutRequiredStructure() {
	        // label.file > input[type=file]
	        Util.assert(this.$element, !this.outerElement().prop('tagName') === 'label', this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element ' + Util.describe(this.outerElement()) + ' should be <label>.');
	        Util.assert(this.$element, !this.outerElement().hasClass(ClassName.FILE), this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element ' + Util.describe(this.outerElement()) + ' should have class .' + ClassName.FILE + '.');
	      }
	    }, {
	      key: 'addFocusListener',
	      value: function addFocusListener() {
	        var _this2 = this;

	        this.$bmdFormGroup.on('focus', function () {
	          _this2.addFormGroupFocus();
	        }).on('blur', function () {
	          _this2.removeFormGroupFocus();
	        });
	      }
	    }, {
	      key: 'addChangeListener',
	      value: function addChangeListener() {
	        var _this3 = this;

	        // set the fileinput readonly field with the name of the file
	        this.$element.on('change', function () {
	          var value = '';
	          $.each(_this3.$element.files, function (i, file) {
	            value += file.name + '  , ';
	          });
	          value = value.substring(0, value.length - 2);
	          if (value) {
	            _this3.addIsFilled();
	          } else {
	            _this3.removeIsFilled();
	          }
	          _this3.$bmdFormGroup.find(Selector.FILENAMES).val(value);
	        });
	      }

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: 'matches',
	      value: function matches($element) {
	        if ($element.attr('type') === 'file') {
	          return true;
	        }
	        return false;
	      }
	    }, {
	      key: 'rejectMatch',
	      value: function rejectMatch(component, $element) {
	        Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'file\'.');
	      }
	    }, {
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new File($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return File;
	  }(BaseInput);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = File._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = File;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return File._jQueryInterface;
	  };

	  return File;
	}(jQuery);

	var Radio = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'radio';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {
	    template: '<span class=\'bmd-radio-outer-circle\'></span><span class=\'bmd-radio-inner-circle\'></span>'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Radio = function (_BaseSelection) {
	    inherits(Radio, _BaseSelection);

	    function Radio($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: NAME, outerClass: NAME } : arguments[2];
	      classCallCheck(this, Radio);
	      return possibleConstructorReturn(this, Object.getPrototypeOf(Radio).call(this, $element, $.extend(true,
	      //{invalidComponentMatches: [Checkbox, File, Switch, Text]},
	      Default, config), properties));
	    }

	    createClass(Radio, [{
	      key: 'dispose',
	      value: function dispose() {
	        var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

	        get(Object.getPrototypeOf(Radio.prototype), 'dispose', this).call(this, dataKey);
	      }
	    }], [{
	      key: 'matches',
	      value: function matches($element) {
	        // '.radio > label > input[type=radio]'
	        if ($element.attr('type') === 'radio') {
	          return true;
	        }
	        return false;
	      }
	    }, {
	      key: 'rejectMatch',
	      value: function rejectMatch(component, $element) {
	        Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'radio\'.');
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      //decorateMarkup() {
	      //  this.$element.after(this.config.template)
	      //}


	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }, {
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Radio($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Radio;
	  }(BaseSelection);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Radio._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Radio;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Radio._jQueryInterface;
	  };

	  return Radio;
	}(jQuery);

	var RadioInline = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'radioInline';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {
	    bmdFormGroup: {
	      create: false, // no bmd-form-group creation if form-group not present. It messes with the layout.
	      required: false
	    }
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var RadioInline = function (_Radio) {
	    inherits(RadioInline, _Radio);

	    function RadioInline($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'radio', outerClass: 'radio-inline' } : arguments[2];
	      classCallCheck(this, RadioInline);
	      return possibleConstructorReturn(this, Object.getPrototypeOf(RadioInline).call(this, $element, $.extend(true, {}, Default, config), properties));
	    }

	    createClass(RadioInline, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(RadioInline.prototype), 'dispose', this).call(this, DATA_KEY);
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new RadioInline($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return RadioInline;
	  }(Radio);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = RadioInline._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = RadioInline;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return RadioInline._jQueryInterface;
	  };

	  return RadioInline;
	}(jQuery);

	var BaseFormControl = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var Default = {
	    requiredClasses: ['form-control']
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var BaseFormControl = function (_BaseInput) {
	    inherits(BaseFormControl, _BaseInput);

	    function BaseFormControl($element, config) {
	      classCallCheck(this, BaseFormControl);

	      // Initially mark as empty
	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(BaseFormControl).call(this, $element, $.extend(true, Default, config)));

	      if (_this.isEmpty()) {
	        _this.removeIsFilled();
	      }
	      return _this;
	    }

	    return BaseFormControl;
	  }(BaseInput);

	  return BaseFormControl;
	}(jQuery);

	var Select = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'select';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {
	    requiredClasses: ['form-control||custom-select']
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Select = function (_BaseFormControl) {
	    inherits(Select, _BaseFormControl);

	    function Select($element, config) {
	      classCallCheck(this, Select);

	      // floating labels will cover the options, so trigger them to be above (if used)
	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(Select).call(this, $element, $.extend(true,
	      //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Text, Textarea]},
	      Default, config)));

	      _this.addIsFilled();
	      return _this;
	    }

	    createClass(Select, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(Select.prototype), 'dispose', this).call(this, DATA_KEY);
	      }
	    }], [{
	      key: 'matches',
	      value: function matches($element) {
	        if ($element.prop('tagName') === 'select') {
	          return true;
	        }
	        return false;
	      }
	    }, {
	      key: 'rejectMatch',
	      value: function rejectMatch(component, $element) {
	        Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for <select>.');
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }, {
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Select($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Select;
	  }(BaseFormControl);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Select._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Select;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Select._jQueryInterface;
	  };

	  return Select;
	}(jQuery);

	var Switch = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'switch';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {
	    template: '<span class=\'bmd-switch-track\'></span>'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Switch = function (_Checkbox) {
	    inherits(Switch, _Checkbox);

	    function Switch($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'checkbox', outerClass: 'switch' } : arguments[2];
	      classCallCheck(this, Switch);
	      return possibleConstructorReturn(this, Object.getPrototypeOf(Switch).call(this, $element, $.extend(true, {}, Default, config), properties));
	      // selector: '.switch > label > input[type=checkbox]'
	    }

	    createClass(Switch, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(Switch.prototype), 'dispose', this).call(this, DATA_KEY);
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Switch($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Switch;
	  }(Checkbox);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Switch._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Switch;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Switch._jQueryInterface;
	  };

	  return Switch;
	}(jQuery);

	var Text = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'text';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {};

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Text = function (_BaseFormControl) {
	    inherits(Text, _BaseFormControl);

	    function Text($element, config) {
	      classCallCheck(this, Text);
	      return possibleConstructorReturn(this, Object.getPrototypeOf(Text).call(this, $element, $.extend(true,
	      //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Select, Textarea]},
	      Default, config)));
	    }

	    createClass(Text, [{
	      key: 'dispose',
	      value: function dispose() {
	        var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

	        get(Object.getPrototypeOf(Text.prototype), 'dispose', this).call(this, dataKey);
	      }
	    }], [{
	      key: 'matches',
	      value: function matches($element) {
	        if ($element.attr('type') === 'text') {
	          return true;
	        }
	        return false;
	      }
	    }, {
	      key: 'rejectMatch',
	      value: function rejectMatch(component, $element) {
	        Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'text\'.');
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }, {
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Text($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Text;
	  }(BaseFormControl);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Text._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Text;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Text._jQueryInterface;
	  };

	  return Text;
	}(jQuery);

	var Textarea = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'textarea';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {};

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Textarea = function (_BaseFormControl) {
	    inherits(Textarea, _BaseFormControl);

	    function Textarea($element, config) {
	      classCallCheck(this, Textarea);
	      return possibleConstructorReturn(this, Object.getPrototypeOf(Textarea).call(this, $element, $.extend(true,
	      //{invalidComponentMatches: [Checkbox, File, Radio, Text, Select, Switch]},
	      Default, config)));
	    }

	    createClass(Textarea, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(Textarea.prototype), 'dispose', this).call(this, DATA_KEY);
	      }
	    }], [{
	      key: 'matches',
	      value: function matches($element) {
	        if ($element.prop('tagName') === 'textarea') {
	          return true;
	        }
	        return false;
	      }
	    }, {
	      key: 'rejectMatch',
	      value: function rejectMatch(component, $element) {
	        Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for <textarea>.');
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }, {
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Textarea($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Textarea;
	  }(BaseFormControl);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Textarea._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Textarea;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Textarea._jQueryInterface;
	  };

	  return Textarea;
	}(jQuery);

	var BaseLayout = function ($) {

	  var ClassName = {
	    CANVAS: 'bmd-layout-canvas',
	    CONTAINER: 'bmd-layout-container',
	    BACKDROP: 'bmd-layout-backdrop'
	  };

	  var Selector = {
	    CANVAS: '.' + ClassName.CANVAS,
	    CONTAINER: '.' + ClassName.CONTAINER,
	    BACKDROP: '.' + ClassName.BACKDROP
	  };

	  var Default = {
	    canvas: {
	      create: true,
	      required: true,
	      template: '<div class="' + ClassName.CANVAS + '"></div>'
	    },
	    backdrop: {
	      create: true,
	      required: true,
	      template: '<div class="' + ClassName.BACKDROP + '"></div>'
	    }
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var BaseLayout = function (_Base) {
	    inherits(BaseLayout, _Base);

	    function BaseLayout($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	      classCallCheck(this, BaseLayout);

	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(BaseLayout).call(this, $element, $.extend(true, {}, Default, config), properties));

	      _this.$container = _this.findContainer(true);
	      _this.$backdrop = _this.resolveBackdrop();
	      _this.resolveCanvas();
	      return _this;
	    }

	    createClass(BaseLayout, [{
	      key: 'dispose',
	      value: function dispose(dataKey) {
	        get(Object.getPrototypeOf(BaseLayout.prototype), 'dispose', this).call(this, dataKey);
	        this.$container = null;
	        this.$backdrop = null;
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      // Will wrap container in bmd-layout-canvas if necessary

	    }, {
	      key: 'resolveCanvas',
	      value: function resolveCanvas() {
	        var bd = this.findCanvas(false);
	        if (bd === undefined || bd.length === 0) {
	          if (this.config.canvas.create) {
	            this.$container.wrap(this.config.canvas.template);
	          }

	          bd = this.findCanvas(this.config.canvas.required);
	        }

	        return bd;
	      }

	      // Find closest bmd-layout-container based on the given context

	    }, {
	      key: 'findCanvas',
	      value: function findCanvas() {
	        var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	        var context = arguments.length <= 1 || arguments[1] === undefined ? this.$container : arguments[1];

	        var canvas = context.closest(Selector.CANVAS);
	        if (canvas.length === 0 && raiseError) {
	          $.error('Failed to find ' + Selector.CANVAS + ' for ' + Util.describe(context));
	        }
	        return canvas;
	      }

	      // Will add bmd-layout-backdrop to bmd-layout-container if necessary

	    }, {
	      key: 'resolveBackdrop',
	      value: function resolveBackdrop() {
	        var bd = this.findBackdrop(false);
	        if (bd === undefined || bd.length === 0) {
	          if (this.config.backdrop.create) {
	            this.$container.append(this.config.backdrop.template);
	          }

	          bd = this.findBackdrop(this.config.backdrop.required);
	        }

	        return bd;
	      }

	      // Find closest bmd-layout-container based on the given context

	    }, {
	      key: 'findBackdrop',
	      value: function findBackdrop() {
	        var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	        var context = arguments.length <= 1 || arguments[1] === undefined ? this.$container : arguments[1];

	        var backdrop = context.find('> ' + Selector.BACKDROP);
	        if (backdrop.length === 0 && raiseError) {
	          $.error('Failed to find ' + Selector.BACKDROP + ' for ' + Util.describe(context));
	        }
	        return backdrop;
	      }

	      // Find closest bmd-layout-container based on the given context

	    }, {
	      key: 'findContainer',
	      value: function findContainer() {
	        var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	        var context = arguments.length <= 1 || arguments[1] === undefined ? this.$element : arguments[1];

	        var container = context.closest(Selector.CONTAINER);
	        if (container.length === 0 && raiseError) {
	          $.error('Failed to find ' + Selector.CONTAINER + ' for ' + Util.describe(context));
	        }
	        return container;
	      }

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }]);
	    return BaseLayout;
	  }(Base);

	  return BaseLayout;
	}(jQuery);

	var Drawer = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'drawer';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Keycodes = {
	    ESCAPE: 27
	    //ENTER: 13,
	    //SPACE: 32
	  };

	  var ClassName = {
	    IN: 'in',
	    DRAWER_IN: 'bmd-drawer-in',
	    DRAWER_OUT: 'bmd-drawer-out',
	    DRAWER: 'bmd-layout-drawer',
	    CONTAINER: 'bmd-layout-container'
	  };

	  var Default = {
	    focusSelector: 'a, button, input'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Drawer = function (_BaseLayout) {
	    inherits(Drawer, _BaseLayout);

	    // $element is expected to be the trigger
	    //  i.e. <button class="btn bmd-btn-icon" for="search" data-toggle="drawer" data-target="#my-side-nav-drawer" aria-expanded="false" aria-controls="my-side-nav-drawer">
	    function Drawer($element, config) {
	      classCallCheck(this, Drawer);

	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(Drawer).call(this, $element, $.extend(true, {}, Default, config)));

	      _this.$toggles = $('[data-toggle="drawer"][href="#' + _this.$element[0].id + '"], [data-toggle="drawer"][data-target="#' + _this.$element[0].id + '"]');

	      _this._addAria();

	      // click or escape on the backdrop closes the drawer
	      _this.$backdrop.keydown(function (ev) {
	        if (ev.which === Keycodes.ESCAPE) {
	          _this.hide();
	        }
	      }).click(function () {
	        _this.hide();
	      });

	      // escape on the drawer closes it
	      _this.$element.keydown(function (ev) {
	        if (ev.which === Keycodes.ESCAPE) {
	          _this.hide();
	        }
	      });

	      // any toggle button clicks
	      _this.$toggles.click(function () {
	        _this.toggle();
	      });
	      return _this;
	    }

	    createClass(Drawer, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(Drawer.prototype), 'dispose', this).call(this, DATA_KEY);
	        this.$toggles = null;
	      }
	    }, {
	      key: 'toggle',
	      value: function toggle() {
	        if (this._isOpen()) {
	          this.hide();
	        } else {
	          this.show();
	        }
	      }
	    }, {
	      key: 'show',
	      value: function show() {
	        if (this._isForcedClosed() || this._isOpen()) {
	          return;
	        }

	        this.$toggles.attr('aria-expanded', true);
	        this.$element.attr('aria-expanded', true);
	        this.$element.attr('aria-hidden', false);

	        // focus on the first focusable item
	        var $focusOn = this.$element.find(this.config.focusSelector);
	        if ($focusOn.length > 0) {
	          $focusOn.first().focus();
	        }

	        this.$container.addClass(ClassName.DRAWER_IN);
	        // backdrop is responsively styled based on bmd-drawer-overlay, therefore style is none of our concern, simply add the marker class and let the scss determine if it should be displayed or not.
	        this.$backdrop.addClass(ClassName.IN);
	      }
	    }, {
	      key: 'hide',
	      value: function hide() {
	        if (!this._isOpen()) {
	          return;
	        }

	        this.$toggles.attr('aria-expanded', false);
	        this.$element.attr('aria-expanded', false);
	        this.$element.attr('aria-hidden', true);

	        this.$container.removeClass(ClassName.DRAWER_IN);
	        this.$backdrop.removeClass(ClassName.IN);
	      }

	      // ------------------------------------------------------------------------
	      // private

	    }, {
	      key: '_isOpen',
	      value: function _isOpen() {
	        return this.$container.hasClass(ClassName.DRAWER_IN);
	      }
	    }, {
	      key: '_isForcedClosed',
	      value: function _isForcedClosed() {
	        return this.$container.hasClass(ClassName.DRAWER_OUT);
	      }
	    }, {
	      key: '_addAria',
	      value: function _addAria() {
	        var isOpen = this._isOpen();
	        this.$element.attr('aria-expanded', isOpen);
	        this.$element.attr('aria-hidden', isOpen);

	        if (this.$toggles.length) {
	          this.$toggles.attr('aria-expanded', isOpen);
	        }
	      }

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Drawer($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Drawer;
	  }(BaseLayout);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Drawer._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Drawer;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Drawer._jQueryInterface;
	  };

	  return Drawer;
	}(jQuery);

	var Ripples = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'ripples';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var ClassName = {
	    CONTAINER: 'ripple-container',
	    DECORATOR: 'ripple-decorator'
	  };

	  var Selector = {
	    CONTAINER: '.' + ClassName.CONTAINER,
	    DECORATOR: '.' + ClassName.DECORATOR //,
	  };

	  var Default = {
	    container: {
	      template: '<div class=\'' + ClassName.CONTAINER + '\'></div>'
	    },
	    decorator: {
	      template: '<div class=\'' + ClassName.DECORATOR + '\'></div>'
	    },
	    trigger: {
	      start: 'mousedown touchstart',
	      end: 'mouseup mouseleave touchend'
	    },
	    touchUserAgentRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
	    duration: 500
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Ripples = function () {
	    function Ripples($element, config) {
	      var _this = this;

	      classCallCheck(this, Ripples);

	      this.$element = $element;

	      //console.log(`Adding ripples to ${Util.describe(this.$element)}`)  // eslint-disable-line no-console
	      this.config = $.extend(true, {}, Default, config);

	      // attach initial listener
	      this.$element.on(this.config.trigger.start, function (event) {
	        _this._onStartRipple(event);
	      });
	    }

	    createClass(Ripples, [{
	      key: 'dispose',
	      value: function dispose() {
	        this.$element.data(DATA_KEY, null);
	        this.$element = null;
	        this.$container = null;
	        this.$decorator = null;
	        this.config = null;
	      }

	      // ------------------------------------------------------------------------
	      // private

	    }, {
	      key: '_onStartRipple',
	      value: function _onStartRipple(event) {
	        var _this2 = this;

	        // Verify if the user is just touching on a device and return if so
	        if (this._isTouch() && event.type === 'mousedown') {
	          return;
	        }

	        // Find or create the ripple container element
	        this._findOrCreateContainer();

	        // Get relY and relX positions of the container element
	        var relY = this._getRelY(event);
	        var relX = this._getRelX(event);

	        // If relY and/or relX are false, return the event
	        if (!relY && !relX) {
	          return;
	        }

	        // set the location and color each time (even if element is cached)
	        this.$decorator.css({
	          left: relX,
	          top: relY,
	          'background-color': this._getRipplesColor()
	        });

	        // Make sure the ripple has the styles applied (ugly hack but it works)
	        this._forceStyleApplication();

	        // Turn on the ripple animation
	        this.rippleOn();

	        // Call the rippleEnd function when the transition 'on' ends
	        setTimeout(function () {
	          _this2.rippleEnd();
	        }, this.config.duration);

	        // Detect when the user leaves the element to cleanup if not already done?
	        this.$element.on(this.config.trigger.end, function () {
	          if (_this2.$decorator) {
	            // guard against race condition/mouse attack
	            _this2.$decorator.data('mousedown', 'off');

	            if (_this2.$decorator.data('animating') === 'off') {
	              _this2.rippleOut();
	            }
	          }
	        });
	      }
	    }, {
	      key: '_findOrCreateContainer',
	      value: function _findOrCreateContainer() {
	        if (!this.$container || !this.$container.length > 0) {
	          this.$element.append(this.config.container.template);
	          this.$container = this.$element.find(Selector.CONTAINER);
	        }

	        // always add the rippleElement, it is always removed
	        this.$container.append(this.config.decorator.template);
	        this.$decorator = this.$container.find(Selector.DECORATOR);
	      }

	      // Make sure the ripple has the styles applied (ugly hack but it works)

	    }, {
	      key: '_forceStyleApplication',
	      value: function _forceStyleApplication() {
	        return window.getComputedStyle(this.$decorator[0]).opacity;
	      }

	      /**
	       * Get the relX
	       */

	    }, {
	      key: '_getRelX',
	      value: function _getRelX(event) {
	        var wrapperOffset = this.$container.offset();

	        var result = null;
	        if (!this._isTouch()) {
	          // Get the mouse position relative to the ripple wrapper
	          result = event.pageX - wrapperOffset.left;
	        } else {
	          // Make sure the user is using only one finger and then get the touch
	          //  position relative to the ripple wrapper
	          event = event.originalEvent;

	          if (event.touches.length === 1) {
	            result = event.touches[0].pageX - wrapperOffset.left;
	          } else {
	            result = false;
	          }
	        }

	        return result;
	      }

	      /**
	       * Get the relY
	       */

	    }, {
	      key: '_getRelY',
	      value: function _getRelY(event) {
	        var containerOffset = this.$container.offset();
	        var result = null;

	        if (!this._isTouch()) {
	          /**
	           * Get the mouse position relative to the ripple wrapper
	           */
	          result = event.pageY - containerOffset.top;
	        } else {
	          /**
	           * Make sure the user is using only one finger and then get the touch
	           * position relative to the ripple wrapper
	           */
	          event = event.originalEvent;

	          if (event.touches.length === 1) {
	            result = event.touches[0].pageY - containerOffset.top;
	          } else {
	            result = false;
	          }
	        }

	        return result;
	      }

	      /**
	       * Get the ripple color
	       */

	    }, {
	      key: '_getRipplesColor',
	      value: function _getRipplesColor() {
	        var color = this.$element.data('ripple-color') ? this.$element.data('ripple-color') : window.getComputedStyle(this.$element[0]).color;
	        return color;
	      }

	      /**
	       * Verify if the client is using a mobile device
	       */

	    }, {
	      key: '_isTouch',
	      value: function _isTouch() {
	        return this.config.touchUserAgentRegex.test(navigator.userAgent);
	      }

	      /**
	       * End the animation of the ripple
	       */

	    }, {
	      key: 'rippleEnd',
	      value: function rippleEnd() {
	        if (this.$decorator) {
	          // guard against race condition/mouse attack
	          this.$decorator.data('animating', 'off');

	          if (this.$decorator.data('mousedown') === 'off') {
	            this.rippleOut(this.$decorator);
	          }
	        }
	      }

	      /**
	       * Turn off the ripple effect
	       */

	    }, {
	      key: 'rippleOut',
	      value: function rippleOut() {
	        var _this3 = this;

	        this.$decorator.off();

	        if (Util.transitionEndSupported()) {
	          this.$decorator.addClass('ripple-out');
	        } else {
	          this.$decorator.animate({ opacity: 0 }, 100, function () {
	            _this3.$decorator.trigger('transitionend');
	          });
	        }

	        this.$decorator.on(Util.transitionEndSelector(), function () {
	          if (_this3.$decorator) {
	            _this3.$decorator.remove();
	            _this3.$decorator = null;
	          }
	        });
	      }

	      /**
	       * Turn on the ripple effect
	       */

	    }, {
	      key: 'rippleOn',
	      value: function rippleOn() {
	        var _this4 = this;

	        var size = this._getNewSize();

	        if (Util.transitionEndSupported()) {
	          this.$decorator.css({
	            '-ms-transform': 'scale(' + size + ')',
	            '-moz-transform': 'scale(' + size + ')',
	            '-webkit-transform': 'scale(' + size + ')',
	            transform: 'scale(' + size + ')'
	          }).addClass('ripple-on').data('animating', 'on').data('mousedown', 'on');
	        } else {
	          this.$decorator.animate({
	            width: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
	            height: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
	            'margin-left': Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
	            'margin-top': Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
	            opacity: 0.2
	          }, this.config.duration, function () {
	            _this4.$decorator.trigger('transitionend');
	          });
	        }
	      }

	      /**
	       * Get the new size based on the element height/width and the ripple width
	       */

	    }, {
	      key: '_getNewSize',
	      value: function _getNewSize() {
	        return Math.max(this.$element.outerWidth(), this.$element.outerHeight()) / this.$decorator.outerWidth() * 2.5;
	      }

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Ripples($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Ripples;
	  }();

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Ripples._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Ripples;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Ripples._jQueryInterface;
	  };

	  return Ripples;
	}(jQuery);

	var Autofill = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'autofill';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {};

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Autofill = function (_Base) {
	    inherits(Autofill, _Base);

	    function Autofill($element, config) {
	      classCallCheck(this, Autofill);

	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(Autofill).call(this, $element, $.extend(true, {}, Default, config)));

	      _this._watchLoading();
	      _this._attachEventHandlers();
	      return _this;
	    }

	    createClass(Autofill, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(Autofill.prototype), 'dispose', this).call(this, DATA_KEY);
	      }

	      // ------------------------------------------------------------------------
	      // private

	    }, {
	      key: '_watchLoading',
	      value: function _watchLoading() {
	        var _this2 = this;

	        // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
	        setTimeout(function () {
	          clearInterval(_this2._onLoading);
	        }, 10000);
	      }

	      // This part of code will detect autofill when the page is loading (username and password inputs for example)

	    }, {
	      key: '_onLoading',
	      value: function _onLoading() {
	        setInterval(function () {
	          $('input[type!=checkbox]').each(function (index, element) {
	            var $element = $(element);
	            if ($element.val() && $element.val() !== $element.attr('value')) {
	              $element.trigger('change');
	            }
	          });
	        }, 100);
	      }
	    }, {
	      key: '_attachEventHandlers',
	      value: function _attachEventHandlers() {
	        // Listen on inputs of the focused form
	        //  (because user can select from the autofill dropdown only when the input has focus)
	        var focused = null;
	        $(document).on('focus', 'input', function (event) {
	          var $inputs = $(event.currentTarget).closest('form').find('input').not('[type=file]');
	          focused = setInterval(function () {
	            $inputs.each(function (index, element) {
	              var $element = $(element);
	              if ($element.val() !== $element.attr('value')) {
	                $element.trigger('change');
	              }
	            });
	          }, 100);
	        }).on('blur', '.form-group input', function () {
	          clearInterval(focused);
	        });
	      }

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Autofill($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Autofill;
	  }(Base);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Autofill._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Autofill;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Autofill._jQueryInterface;
	  };

	  return Autofill;
	}(jQuery);

	/**
	 * $.bootstrapMaterialDesign(config) is a macro class to configure the components generally
	 *  used in Bootstrap Material Design.  You may pass overrides to the configurations
	 *  which will be passed into each component, or you may omit use of this class and
	 *  configure each component separately.
	 */
	var BootstrapMaterialDesign = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'bootstrapMaterialDesign';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = NAME; // retain this full name since it is long enough not to conflict
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  /**
	   * Global configuration:
	   *  The global configuration hash will be mixed in to each components' config.
	   *    e.g. calling $.bootstrapMaterialDesign({global: { validate: true } }) would pass `validate:true` to every component
	   *
	   *
	   * Component configuration:
	   *  - selector: may be a string or an array.  Any array will be joined with a comma to generate the selector
	   *  - disable any component by defining it as false with an override. e.g. $.bootstrapMaterialDesign({ autofill: false })
	   *
	   *  @see each individual component for more configuration settings.
	   */
	  var Default = {
	    global: {
	      validate: false,
	      label: {
	        className: 'bmd-label-static' // default style of label to be used if not specified in the html markup
	      }
	    },
	    autofill: {
	      selector: 'body'
	    },
	    checkbox: {
	      selector: '.checkbox > label > input[type=checkbox]'
	    },
	    checkboxInline: {
	      selector: 'label.checkbox-inline > input[type=checkbox]'
	    },
	    collapseInline: {
	      selector: '.bmd-collapse-inline [data-toggle="collapse"]'
	    },
	    drawer: {
	      selector: '.bmd-layout-drawer'
	    },
	    file: {
	      selector: 'input[type=file]'
	    },
	    radio: {
	      selector: '.radio > label > input[type=radio]'
	    },
	    radioInline: {
	      selector: 'label.radio-inline > input[type=radio]'
	    },
	    ripples: {
	      //selector: ['.btn:not(.btn-link):not(.ripple-none)'] // testing only
	      selector: ['.btn:not(.btn-link):not(.ripple-none)', '.card-image:not(.ripple-none)', '.navbar a:not(.ripple-none)', '.dropdown-menu a:not(.ripple-none)', '.nav-tabs a:not(.ripple-none)', '.pagination li:not(.active):not(.disabled) a:not(.ripple-none)', '.ripple' // generic marker class to add ripple to elements
	      ]
	    },
	    select: {
	      selector: ['select']
	    },
	    switch: {
	      selector: '.switch > label > input[type=checkbox]'
	    },
	    text: {
	      // omit inputs we have specialized components to handle - we need to match text, email, etc.  The easiest way to do this appears to be just omit the ones we don't want to match and let the rest fall through to this.
	      selector: ['input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=button]):not([type=submit]):not([type=reset])']
	    },
	    textarea: {
	      selector: ['textarea']
	    },
	    arrive: true,
	    // create an ordered component list for instantiation
	    instantiation: ['ripples', 'checkbox', 'checkboxInline', 'collapseInline', 'drawer',
	    //'file',
	    'radio', 'radioInline', 'switch', 'text', 'textarea', 'select', 'autofill']
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var BootstrapMaterialDesign = function () {
	    function BootstrapMaterialDesign($element, config) {
	      var _this = this;

	      classCallCheck(this, BootstrapMaterialDesign);

	      this.$element = $element;
	      this.config = $.extend(true, {}, Default, config);
	      var $document = $(document);

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        var _loop = function _loop() {
	          var component = _step.value;


	          // the component's config fragment is passed in directly, allowing users to override
	          var componentConfig = _this.config[component];

	          // check to make sure component config is enabled (not `false`)
	          if (componentConfig) {
	            (function () {

	              // assemble the selector as it may be an array
	              var selector = _this._resolveSelector(componentConfig);

	              // mix in global options
	              componentConfig = $.extend(true, {}, _this.config.global, componentConfig);

	              // create the jquery fn name e.g. 'bmdText' for 'text'
	              var componentName = '' + (component.charAt(0).toUpperCase() + component.slice(1));
	              var jqueryFn = 'bmd' + componentName;

	              try {
	                // safely instantiate component on selector elements with config, report errors and move on.
	                // console.debug(`instantiating: $('${selector}')[${jqueryFn}](${componentConfig})`) // eslint-disable-line no-console
	                $(selector)[jqueryFn](componentConfig);

	                // add to arrive if present and enabled
	                if (document.arrive && _this.config.arrive) {
	                  $document.arrive(selector, function () {
	                    // eslint-disable-line no-loop-func
	                    $(this)[jqueryFn](componentConfig);
	                  });
	                }
	              } catch (e) {
	                var message = 'Failed to instantiate component: $(\'' + selector + '\')[' + jqueryFn + '](' + componentConfig + ')';
	                console.error(message, e, '\nSelected elements: ', $(selector)); // eslint-disable-line no-console
	                throw e;
	              }
	            })();
	          }
	        };

	        for (var _iterator = this.config.instantiation[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          _loop();
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }

	    createClass(BootstrapMaterialDesign, [{
	      key: 'dispose',
	      value: function dispose() {
	        this.$element.data(DATA_KEY, null);
	        this.$element = null;
	        this.config = null;
	      }

	      // ------------------------------------------------------------------------
	      // private

	    }, {
	      key: '_resolveSelector',
	      value: function _resolveSelector(componentConfig) {
	        var selector = componentConfig.selector;
	        if (Array.isArray(selector)) {
	          selector = selector.join(', ');
	        }

	        return selector;
	      }

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new BootstrapMaterialDesign($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return BootstrapMaterialDesign;
	  }();

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = BootstrapMaterialDesign._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = BootstrapMaterialDesign;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return BootstrapMaterialDesign._jQueryInterface;
	  };

	  return BootstrapMaterialDesign;
	}(jQuery);

}());
//# sourceMappingURL=bootstrap-material-design.iife.js.map
;
/*!
 * Bootstrap v3.3.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.1",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.1",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.1",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c="prev"==a?-1:1,d=this.getItemIndex(b),e=(d+c)%this.$items.length;return this.$items.eq(e)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i="next"==b?"first":"last",j=this;if(!f.length){if(!this.options.wrap)return;f=this.$element.find(".item")[i]()}if(f.hasClass("active"))return this.sliding=!1;var k=f[0],l=a.Event("slide.bs.carousel",{relatedTarget:k,direction:h});if(this.$element.trigger(l),!l.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var m=a(this.$indicators.children()[this.getItemIndex(f)]);m&&m.addClass("active")}var n=a.Event("slid.bs.carousel",{relatedTarget:k,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),j.sliding=!1,setTimeout(function(){j.$element.trigger(n)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(n)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a(this.options.trigger).filter('[href="#'+b.id+'"], [data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.1",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.find("> .panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":a.extend({},e.data(),{trigger:this});c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.1",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.1",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.options.backdrop&&d.adjustBackdrop(),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$element.find(".modal-dialog").one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').prependTo(this.$element).on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.options.backdrop&&this.adjustBackdrop(),this.adjustDialog()},c.prototype.adjustBackdrop=function(){this.$backdrop.css("height",0).css("height",this.$element[0].scrollHeight)},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){this.bodyIsOverflowing=document.body.scrollHeight>document.documentElement.clientHeight,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b,g=f&&f.selector;(e||"destroy"!=b)&&(g?(e||d.data("bs.tooltip",e={}),e[g]||(e[g]=new c(this,f))):e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.1",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=this.tip(),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b,g=f&&f.selector;(e||"destroy"!=b)&&(g?(e||d.data("bs.popover",e={}),e[g]||(e[g]=new c(this,f))):e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.1",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.1",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.1",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})
})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.1",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=i?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a("body").height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
(function() {


}).call(this);
/*! jQuery v1.11.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */

(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//








//http://bootsnipp.com/snippets/kE9rg
$(function() {
    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

});