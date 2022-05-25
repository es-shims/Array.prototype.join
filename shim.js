'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimArrayPrototypeJoin() {
	var polyfill = getPolyfill();

	define(
		Array.prototype,
		{ join: polyfill },
		{ join: function () { return Array.prototype.join !== polyfill; } }
	);

	return polyfill;
};
