'use strict';

// MODULES //

var tape = require( 'tape' );
var evalrational = require( './../lib/evalrational.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof evalrational === 'function', 'main export is a function' );
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
	var num;
	var denom;
	var v;

	num = [ 2, 3, 2 ];
	denom = [ 1, 0, 0 ];
	v = evalrational( num, denom, 1 );
	t.equal( v, 7, 'returns 7' );

	num = [ -6, -5 ];
	denom = [ 3, 0.5 ];
	v = evalrational( num, denom, 6 );
	t.equal( v, -6, 'returns -6' );

	num = [ -19, 7, -4, 6 ];
	denom = [ 4, 5, 2, 1 ];
	v = evalrational( num, denom, 3 );
	t.equal( v, 2, 'returns 2' );

	t.end();
});
