'use strict';

// var canDistinguishSparseFromUndefined = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false.
// eslint-disable-next-line no-sparse-arrays, array-bracket-spacing
var holesExist = !(0 in [, ]); // FF 3 fails this check

module.exports = function (join, t) {
	t.equal(
		join([1, 2]),
		'1,2',
		'defaults to a comma separator when none is provided'
	);

	t.equal(
		join([1, 2], undefined),
		'1,2',
		'defaults to a comma separator when undefined is provided'
	);

	t.equal(
		join([1, null, undefined, 2]),
		'1,,,2',
		'nullish values are the empty string'
	);

	t.test('sparse arrays', { skip: !holesExist }, function (st) {
		var a = [1, , 3]; // eslint-disable-line no-sparse-arrays
		st.notOk(1 in a, 'hole exists');

		st.equal(join(a, 'x'), '1xx3', 'treats holes as dense undefineds');

		st.end();
	});

	t.test('works, extended', function (st) {
		st.equal(join([]), '');
		st.equal(join([undefined]), '');
		st.equal(join([undefined, undefined]), ',');
		st.equal(join([null, null]), ',');
		st.equal(join([undefined, undefined], '|'), '|');
		st.equal(join([null, null], '|'), '|');
		st.equal(join([1, 2, 3], '|'), '1|2|3');
		st.equal(join([1, 2, 3], null), '1null2null3');
		st.equal(join([1, 2, 3], {}), '1[object Object]2[object Object]3');
		st.equal(join([1, 2, 3], ''), '123');

		st.end();
	});

	var obj = { 0: 1, 1: 2, 2: 3, 3: 4, length: 3 };
	t.equal(
		Array.prototype.join.call(obj, ','),
		'1,2,3',
		'is generic'
	);

	var str = '123';
	t.equal(
		Array.prototype.join.call(str, ','),
		'1,2,3',
		'works with a string literal'
	);

	var args = (function () { return arguments; }(1, 2, 3));
	t.equal(
		Array.prototype.join.call(args, ','),
		'1,2,3',
		'works with `arguments`'
	);
};
