'use strict';

// MODULES //

var tape = require( 'tape' );
var factory = require( './../lib/factory.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var evalrational = factory( [1,2,3], [1,2,3] );
	t.equal( typeof evalrational, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided two empty coefficient arrays, the generated `evalrational` function always returns `NaN`', function test( t ) {
	var evalrational;
	var v;
	var i;

	evalrational = factory( [], [] );
	for ( i = 0; i < 100; i++ ) {
		v = evalrational( i );
		t.ok( v !== v, 'returns NaN' );
	}
	t.end();
});

tape( 'if provided only one coefficient for both arrays, the generated `evalrational` function always returns the ratio of the two coefficients', function test( t ) {
	var evalrational;
	var v;
	var i;

	evalrational = factory( [2], [4] );
	for ( i = 0; i < 100; i++ ) {
		v = evalrational( i );
		t.equal( v, 0.5, 'returns coefficient ratio' );
	}
	t.end();
});

tape( 'if the value at which to evaluate a rational function is `0`, the generated `evalrational` function returns the ratio of the first coefficients', function test( t ) {
	var evalrational;
	var v;

	evalrational = factory( [3,2,1], [0.5,2,1] );

	v = evalrational( 0 );
	t.equal( v, 6, 'returns coefficient ratio' );

	t.end();
});

tape( 'the generated `evalrational` function evaluates a rational function', function test( t ) {
	var evalrational;
	var v;

	evalrational = factory( [ -6, -5 ], [ 3, 0.5 ] );

	v = evalrational( 6 );
	t.equal( v, -6, 'returns -6' );

	v = evalrational( 2 );
	t.equal( v, -4, 'returns -4' );

	v = evalrational( 0.5 ); // -8.5 / 3.25
	t.equal( v, -2.6153846153846154, 'returns -2.6153846153846154' );

	v = evalrational( 1 ); // -11 / 3.5
	t.equal( v, -3.142857142857143, 'returns -3.142857142857143' );

	t.end();
});

tape( 'the generated function handles large `x` values', function test( t ) {
	var evalrational;
	var v1;
	var v2;
	var P;
	var Q;
	var x;
	var i;

	// 6x^5 + 5x^4 + 4x^3 + 3x^2 + 2x^1 + 1x^0
	P = [ 1, 2, 3, 4, 5, 6 ];

	// 1x^5 + 2x^4 + 3x^3 + 4x^2 + 5x^1 + 6x^0
	Q = [ 6, 5, 4, 3, 2, 1 ];

	evalrational = factory( P, Q );

	x = 1e100;
	for ( i = 0; i < 1000; i++ ) {
		x *= 2;
		v1 = evalrational( x );
		v2 = evalrational( -x );
		t.equal( v1, v2, 'for x=+-'+x+', returns '+v1 );
	}
	t.end();
});

tape( 'the generated function returns analytically incorrect results for certain coefficient and `x` combinations', function test( t ) {
	var evalrational;
	var P;
	var Q;
	var v;

	// Case 1: large negative `x`

	// 1x^2 + 1e308x^1 + 0x^0
	P = [ 0, 1e308, 1 ];

	// 0x^2 + 0x^2 + 1x^0
	Q = [ 1, 0, 0 ];

	evalrational = factory( P, Q );

	// => (-1e308)^2 + (1e308)(-1e308) = +inf - inf => indeterminate => NaN
	v = evalrational( -1e308 );
	t.notOk( v !== v, 'should be NaN' );


	// Case 2: large positive `x`

	// 1x^2 - 1e308x^1 + 0x^0
	P = [ 0, -1e308, 1 ];

	// 0x^2 + 0x^2 + 1x^0
	Q = [ 1, 0, 0 ];

	evalrational = factory( P, Q );

	// => (1e308)^2 - (1e308)(1e308) = +inf - inf => indeterminate => NaN
	v = evalrational( 1e308 );
	t.notOk( v !== v, 'should be NaN' );

	t.end();
});
