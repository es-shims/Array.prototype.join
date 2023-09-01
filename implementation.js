'use strict';

var Get = require('es-abstract/2023/Get');
var LengthOfArrayLike = require('es-abstract/2023/LengthOfArrayLike');
var ToObject = require('es-abstract/2023/ToObject');
var ToString = require('es-abstract/2023/ToString');

var callBound = require('call-bind/callBound');

var isString = require('is-string');

// Check failure of by-index access of string characters (IE < 9) and failure of `0 in boxedString` (Rhino)
var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

var strSplit = callBound('String.prototype.split');

module.exports = function join(separator) {
	var O = ToObject(this); // step 1
	var self = splitString && isString(O) ? strSplit(O, '') : O;

	var len = LengthOfArrayLike(self); // step 2

	var sep = typeof separator === 'undefined' ? ',' : ToString(separator); // steps 3-4

	var R = ''; // step 5
	var k = 0; // step 6
	while (k < len) { // step 7
		if (k > 0) {
			R += sep; // step 7.a
		}
		var element = Get(O, ToString(k)); // step 7.b
		// eslint-disable-next-line eqeqeq
		var next = element == null ? '' : ToString(element); // step 7.c
		R += next; // step 7.d
		k += 1; // step 7.e
	}
	return R; // step 8
};

module.exports.prototype = undefined;
