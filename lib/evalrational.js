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
*	Evaluates a rational function, i.e. the ratio of two polynomial described by the coefficients stored in P and Q. Coefficients should be sorted in ascending degree.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} P - numerator polynomial coefficients sorted in ascending degree
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} Q - denominator polynomial coefficients sorted in ascending degree
* @param {Number} x - value at which to evaluate the rational function
* @returns {Number} evaluated rational function
*/
function evalrational( P, Q, x ) {
	var len;
	var s1;
	var s2;
	var i;
	len = P.length;
	if ( x <= 1 ) {
		s1 = P[ len-1 ];
		s2 = Q[ len-1 ];
		for ( i = len-2; i >= 0; --i ) {
			s1 *= x;
			s2 *= x;
			s1 += P[ i ];
			s2 += Q[ i ];
		}
	} else {
		x = 1 / x;
		s1 = P[ 0 ];
		s2 = Q[ 0 ];
		for( i = 1; i < len; ++i ) {
			s1 *= x;
			s2 *= x;
			s1 += P[ i ];
			s2 += Q[ i ];
		}
	}
	return s1 / s2;
} // end FUNCTION evalrational()


// EXPORTS //

module.exports = evalrational;
