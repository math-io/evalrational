'use strict';

/**
* NOTE: the original C++ code and copyright notice is from the [Boost library]{http://www.boost.org/doc/libs/1_43_0/boost/math/tools/rational.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/**
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/


// EVAL RATIONAL //

/**
* FUNCTION: evalrational( P, Q, x )
*	Evaluates a rational function, i.e. the ratio of two polynomial described by the coefficients stored in num and demom.
*	Coefficients should be stored such that the coefficients for the x^i terms are in num[i] and denom[i].
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} num - numerator polynomial coefficients sorted in ascending degree
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} denom - denominator polynomial coefficients sorted in ascending degree
* @param {Number} x - value at which to evaluate the function
* @returns {Number} evaluated rational function
*/
function evalrational( num, denom, x ) {
	var s1, s2;
	var i;
	var len = num.length;
	if ( x <= 1 ) {
		s1 = num[ len - 1 ];
		s2 = denom[ len - 1 ];
		for ( i = len - 2; i >= 0; --i ) {
			s1 *= x;
			s2 *= x;
			s1 += num[ i ];
			s2 += denom[ i ];
		}
	} else {
		x = 1 / x;
		s1 = num[ 0 ];
		s2 = denom[ 0 ];
		for( i = 1; i < len; ++i ) {
			s1 *= x;
			s2 *= x;
			s1 += num[ i ];
			s2 += denom[ i ];
		}
	}
	return s1 / s2;
} // end FUNCTION evalrational()


// EXPORTS //

module.exports = evalrational;
