'use strict';

var round = require( 'math-round' );
var evalrational = require( './../lib' );

var rational;
var denom;
var sign;
var len;
var num;
var v;
var i;

// Create two arrays of random coefficients...
len = 10;
num = new Float64Array( len );
denom = new Float64Array( len );
for ( i = 0; i < len; i++ ) {
	if ( Math.random() < 0.5 ) {
		sign = -1;
	} else {
		sign = 1;
	}
	num[ i ] = sign * round( Math.random()*100 );
	denom[ i ] = sign * round( Math.random()*100 );
}

// Evaluate the rational function at random values...
for ( i = 0; i < 100; i++ ) {
	v = Math.random() * 100;
	console.log( 'f(%d) = %d', v, evalrational( num, denom, v ) );
}

// Generate an `evalrational` function...
rational = evalrational.factory( num, denom );
for ( i = 0; i < 100; i++ ) {
	v = Math.random()*100 - 50;
	console.log( 'f(%d) = %d', v, rational( v ) );
}
