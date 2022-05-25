'use strict';

var callBind = require('call-bind');
var callBound = require('call-bind/callBound');
var isString = require('is-string');

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (!Array.prototype.join) {
		return implementation;
	}

	try {
		Array.prototype.join.call(undefined, 'a');
		Array.prototype.join.call(null, 'a');

		return implementation; // IE 10-11
	} catch (e) {
		/**/
	}

	var hasStringJoinBug;
	try {
		hasStringJoinBug = Array.prototype.join.call('123', ',') !== '1,2,3';
	} catch (e) {
		hasStringJoinBug = true;
	}
	var hasJoinUndefinedBug = [1, 2].join(undefined) !== '1,2';

	if (hasStringJoinBug || hasJoinUndefinedBug) {
		var $join = callBind(Array.prototype.join);
		/* eslint no-invalid-this: 1 */

		if (hasStringJoinBug) {
			var $split = callBound('String.prototype.split');
			return function join(separator) {
				var sep = typeof separator === 'undefined' ? ',' : separator;
				return $join(isString(this) ? $split(this, '') : this, sep);
			};
		}
		if (hasJoinUndefinedBug) {
			return function join(separator) {
				var sep = typeof separator === 'undefined' ? ',' : separator;
				return $join(this, sep);
			};
		}
	}

	return Array.prototype.join;
};
