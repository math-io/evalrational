'use strict';

var round = require( 'math-round' );
var evalrational = require( './../lib' );

var rational;
var sign;
var len;
var P;
var Q;
var v;
var i;

// Create two arrays of random coefficients...
len = 10;
P = new Float64Array( len );
Q = new Float64Array( len );
for ( i = 0; i < len; i++ ) {
	if ( Math.random() < 0.5 ) {
		sign = -1;
	} else {
		sign = 1;
	}
	P[ i ] = sign * round( Math.random()*100 );
	Q[ i ] = sign * round( Math.random()*100 );
}

// Evaluate the rational function at random values...
for ( i = 0; i < 100; i++ ) {
	v = Math.random() * 100;
	console.log( 'f(%d) = %d', v, evalrational( P, Q, v ) );
}

// Generate an `evalrational` function...
rational = evalrational.factory( P, Q );
for ( i = 0; i < 100; i++ ) {
	v = Math.random()*100 - 50;
	console.log( 'f(%d) = %d', v, rational( v ) );
}
