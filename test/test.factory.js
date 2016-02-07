'use strict';

// MODULES //

var tape = require( 'tape' );
var factory = require( './../lib/factory.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof factory === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var evalpoly = factory( [1,2,3], [1,2,3] );
	t.ok( typeof evalpoly === 'function', 'returns a function' );
	t.end();
});

tape( 'if provided two empty coefficient arrays, the generated `evalrational` function always returns `NaN`', function test( t ) {
	var evalpoly = factory( [] );
	var v;
	var i;

	for ( i = 0; i < 100; i++ ) {
		v = evalpoly( i );
		t.ok( v !== v, 'returns NaN' );
	}
	t.end();
});

tape( 'if provided only one coefficient for both arrays, the generated `evalrational` function always returns the ratio of the two coefficients', function test( t ) {
	var evalpoly = factory( [2], [4] );
	var v;
	var i;

	for ( i = 0; i < 100; i++ ) {
		v = evalpoly( i );
		t.equal( v, 0.5, 'returns coefficient ratio' );
	}
	t.end();
});

tape( 'if the value at which to evaluate a rational function is `0`, the generated `evalrational` function returns the ratio of the first coefficients', function test( t ) {
	var evalpoly = factory( [3,2,1], [0.5,2,1] );
	var v;

	v = evalpoly( 0 );
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


	t.end();
});
