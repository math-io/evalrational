/* jshint evil:true */
'use strict';

// EVAL RATIONAL FACTORY //

/**
* FUNCTION: factory( num, denom )
*	Returns a function for evaluating a rational function.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} num - numerator polynomial coefficients sorted in ascending degree
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} denom - denominator polynomial coefficients sorted in ascending degree
* @returns {Function} function for evaluating a rational function
*/
function factory( num, denom ) {
	var f;
	var n;
	var m;
	var i;
	var ratio;

	// Code generation. Start with the function definition...
	f = 'return function evalrational(x){';

	// Create the function body...
	n = num.length;

	// Declare variables...
	f += 'var numSum; var denomSum;';

	// If no coefficients, the function always returns NaN...
	if ( n === 0 ) {
		f += 'return NaN;';
	}
	// If num and denom have only one coefficient, the function always returns the ratio of the first coefficients...
	else if ( n === 1 ) {
		ratio = num[ 0 ] / denom[ 0 ];
		f += 'return ' + ratio + ';';
	}
	// If more than one coefficient, apply Horner's method to both numerator and denominator...
	else {

		// If `x == 0`, return the ratio of the first coefficients...
		ratio = num[ 0 ] / denom[ 0 ];
		f += 'if(x===0){return ' + ratio + ';}';

		// If `x <= 1`, evaluate the numerator and denominator of the rational function using Horner's method...
		f += 'if(x<=1){';
		f += 'numSum = ' + num[ 0 ];
		m = n - 1;
		for ( i = 1; i < n; i++ ) {
			f += '+x*';
			if ( i < m ) {
				f += '(';
			}
			f += num[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';
		f += 'denomSum = ' + denom[ 0 ];
		m = n - 1;
		for ( i = 1; i < n; i++ ) {
			f += '+x*';
			if ( i < m ) {
				f += '(';
			}
			f += denom[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';

		// Close the if statement...
		f += '} else {';

		// If `x > 1`, evaluate the numerator and denominator via the inverse to avoid overflow...
		f += 'x = 1/x;';
		m = n - 1;
		f += 'numSum = ' + num[ m ];
		for ( i = m - 1; i >= 0; i-- ) {
			f += '+x*';
			if ( i > 0 ) {
				f += '(';
			}
			f += num[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';

		m = n - 1;
		f += 'denomSum = ' + denom[ m ];
		for ( i = m - 1; i >= 0; i-- ) {
			f += '+x*';
			if ( i > 0 ) {
				f += '(';
			}
			f += denom[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';

		// Close the else statement...
		f += '}';

		// Return the ratio of the two sums...
		f += 'return numSum / denomSum;';
	}
	// Close the function:
	f += '}';

	// Create the function in the global scope:
	return ( new Function( f ) )();

	/**
	* returns
	*	function evalrational( x ) {
	*		var numSum;
	*		var denomSum;
	*		if ( x === 0 ) {
	*			return num[ 0 ] / denom[ 0 ];
	*		}
	*		if ( x <= 1 ) {
	*			numSum = num[0]+x*(num[1]+x*(num[2]+x*(num[3]+...+x*(num[n-2]+x*num[n-1]))));
	*			denomSum = denom[0]+x*(denom[1]+x*(denom[2]+x*(denom[3]+...+x*(denom[n-2]+x*denom[n-1]))));
	*		} else {
	*			x = 1/x;
	*			numSum = num[n-1]+x*(num[n-2]+x*(num[n-3]+x*(num[n-4]+...+x*(num[1]+x*num[0]))));
	*			denomSum = denom[n-1]+x*(denom[n-2]+x*(denom[n-3]+x*(denom[n-4]+...+x*(denom[1]+x*denom[0]))));
	*		}
	*		return numSum / denomSum;
	*	}
	*/
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;
