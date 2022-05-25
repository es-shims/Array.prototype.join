'use strict';

var index = require('../');
var test = require('tape');
var runTests = require('./tests');

test('as a function', function (t) {
	t.test('bad array/this value', function (st) {
		/* eslint no-useless-call: 1 */
		st['throws'](function () { index.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { index.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(index, t);

	t.end();
});
