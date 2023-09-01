'use strict';

var define = require('define-properties');
var RequireObjectCoercible = require('es-abstract/2023/RequireObjectCoercible');
var callBind = require('call-bind');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var bound = callBind(getPolyfill());

var boundShim = function join(array, separator) {
	RequireObjectCoercible(array);
	return bound(array, separator);
};
define(boundShim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundShim;
