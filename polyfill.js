'use strict';

var callBind = require('call-bind');
var callBound = require('call-bound');
var isString = require('is-string');

var implementation = require('./implementation');

var $arrayProto = Array.prototype;

module.exports = function getPolyfill() {
	if (!$arrayProto.join) {
		return implementation;
	}

	try {
		$arrayProto.join.call(undefined, 'a');
		$arrayProto.join.call(null, 'a');

		return implementation; // IE 10-11
	} catch (e) {
		/**/
	}

	var hasStringJoinBug;
	try {
		hasStringJoinBug = $arrayProto.join.call('123', ',') !== '1,2,3';
	} catch (e) {
		hasStringJoinBug = true;
	}
	var hasJoinUndefinedBug = [1, 2].join(undefined) !== '1,2';

	if (hasStringJoinBug || hasJoinUndefinedBug) {
		var $join = callBind($arrayProto.join);
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

	return $arrayProto.join;
};
