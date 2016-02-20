'use strict';

// MODULES //

var tape = require( 'tape' );
var evalrational = require( './../lib/evalrational.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof evalrational, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided two empty coefficient arrays, the function always returns `NaN`', function test( t ) {
	var v;
	var i;

	for ( i = 0; i < 100; i++ ) {
		v = evalrational( [], [], i );
		t.ok( v !== v, 'returns NaN' );
	}
	t.end();
});

tape( 'if provided only one coefficient for both arrays, the function always returns the ratio of the two coefficients', function test( t ) {
	var v;
	var i;

	for ( i = 0; i < 100; i++ ) {
		v = evalrational( [2], [4], i );
		t.equal( v, 0.5, 'returns coefficient ratio' );
	}
	t.end();
});

tape( 'if the value at which to evaluate a rational function is `0`, the function returns the ratio of the first coefficients', function test( t ) {
	var v;

	v = evalrational( [3,2,1], [0.5,2,1], 0 );
	t.equal( v, 6, 'returns coefficient ratio' );

	t.end();
});

tape( 'the function evaluates a rational function', function test( t ) {
	var P;
	var Q;
	var v;

	P = [ 2, 3, 2 ];
	Q = [ 1, 0, 0 ];
	v = evalrational( P, Q, 1 );
	t.equal( v, 7, 'returns 7' );

	P = [ -6, -5 ];
	Q = [ 3, 0.5 ];
	v = evalrational( P, Q, 6 );
	t.equal( v, -6, 'returns -6' );

	P = [ -19, 7, -4, 6 ];
	Q = [ 4, 5, 2, 1 ];
	v = evalrational( P, Q, 3 );
	t.equal( v, 2, 'returns 2' );

	// Large negative `x`:
	P = [ 10, 2, 1 ];
	Q = [ 1, 0, 0 ];
	v = evalrational( P, Q, -1e306 );
	t.equal( v, -1.2e307, 'returns -1.2e307' );

	t.end();
});
