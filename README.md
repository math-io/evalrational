evalrational
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Evaluates a [rational function][rational-function], i.e. the ratio of two [polynomials][polynomial].

A [rational function][rational-function] `f(x)` is defined as

<div class="equation" align="center" data-raw-text="f(x) = \frac{P(x)}{Q(x)}" data-equation="eq:rational_function">
	<img src="https://cdn.rawgit.com/math-io/evalrational/cfbe5ef7e1feb82405feb13e52c71c1b03ea25c4/docs/img/eqn.svg" alt="Rational function definition.">
	<br>
</div>

where both `P(x)` and `Q(x)` are polynomials in `x`.


## Installation

``` bash
$ npm install math-evalrational
```


## Usage

``` javascript
var evalrational = require( 'math-evalrational' );
```

#### evalrational( P, Q, x )

Evaluates a [rational function][rational-function] at a value `x`. The coefficients `P` and `Q` are expected to be arrays of the same length.

``` javascript
var P = [ -6, -5 ];
var Q = [ 3, 0.5 ];

var v = evalrational( P, Q, 6 );
// returns -6 => ( -6*6^0 - 5*6^1 ) / ( 3*6^0 + 0.5*6^1 ) = (-6-30)/(3+3)
```

For polynomials of different degree, the coefficient array for the lower degree [polynomial][polynomial] should be padded with zeros.

``` javascript
// 2x^3 + 4x^2 - 5x^1 - 6x^0 => degree 4
var P = [ -6, -5, 4, 2 ];

// 0.5x^1 + 3x^0 => degree 2
var Q = [ 3, 0.5, 0, 0 ]; // zero-padded

var v = evalrational( P, Q, 6 );
// returns 90 => ( -6*6^0 - 5*6^1 + 4*6^2 + 2*6^3 ) / ( 3*6^0 + 0.5*6^1 + 0*6^2 + 0*6^3 ) = (-6-30+144+432)/(3+3)
```

Coefficients should be ordered in __ascending__ degree. For example, for a [polynomial][polynomial]

<div class="equation" align="center" data-raw-text="c_nx^n + c_{n-1}x^{n-1} + \ldots + c_1x^1 + c_0 = \sum_{i=0}^{n} c_ix^i" data-equation="eq:polynomial">
	<img src="https://cdn.rawgit.com/math-io/evalrational/5a32486a004f818897cb634cacb9186cfa9148b0/docs/img/coef.svg" alt="Polynomial expression.">
	<br>
</div>

the coefficients would be

```
[c_0, c_1, ..., c_(n-1), c_n]
```

matching the summation notation.


#### evalrational.factory( P, Q )

Uses code generation to in-line coefficients and return a reusable `function` for evaluating a [rational function][rational-function].

``` javascript
var P = [ 20, 8, 3 ];
var Q = [ 10, 9, 1 ];

var rational = evalrational.factory( P, Q );

var v = rational( 10 );
// returns 2 => (20*10^0 + 8*10^1 + 3*10^2) / (10*10^0 + 9*10^1 + 1*10^2) = (20+80+300)/(10+90+100)

v = rational( 2 );
// returns 1.5 => (20*2^0 + 8*2^1 + 3*2^2) / (10*2^0 + 9*2^1 + 1*2^2) = (20+16+12)/(10+18+4)
```

__Note__: For hot code paths in which coefficients are invariant, the generated `function` will be more performant than the main export.


## Examples

``` javascript
var round = require( 'math-round' );
var evalrational = require( 'math-evalrational' );

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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors..


[npm-image]: http://img.shields.io/npm/v/math-evalrational.svg
[npm-url]: https://npmjs.org/package/math-evalrational

[build-image]: http://img.shields.io/travis/math-io/evalrational/master.svg
[build-url]: https://travis-ci.org/math-io/evalrational

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/evalrational/master.svg
[coverage-url]: https://codecov.io/github/math-io/evalrational?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/evalrational.svg
[dependencies-url]: https://david-dm.org/math-io/evalrational

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/evalrational.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/evalrational

[github-issues-image]: http://img.shields.io/github/issues/math-io/evalrational.svg
[github-issues-url]: https://github.com/math-io/evalrational/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[polynomial]: https://en.wikipedia.org/wiki/Polynomial
[compute-io]: https://github.com/compute-io
[rational-function]: https://en.wikipedia.org/wiki/Rational_function
