# array.prototype.join <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

An ES spec-compliant `Array.prototype.join` shim/polyfill/replacement that works as far down as ES3.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the [spec](https://tc39.es/ecma262/#sec-array.prototype.concat).

Because `Array.prototype.join` depends on a receiver (the “this” value), the main export takes the array to operate on as the first argument.

## Example

```js
var join = require('array.prototype.join');
var assert = require('assert');

var a = [1, 1, 1];
assert.deepEqual(join(a, 'x'), '1x1x1');
```

```js
var join = require('array.prototype.join');
var assert = require('assert');
/* when Array#join is not present */
delete Array.prototype.join;
var shimmed = join.shim();
assert.equal(shimmed, join.getPolyfill());
assert.equal(shimmed, Array.prototype.join);
assert.deepEqual([1, 2, 3].join('x'), join([1, 2, 3], 'x'));
```

```js
var join = require('array.prototype.join');
var assert = require('assert');
/* when Array#join is present */
var shimmed = join.shim();
assert.equal(shimmed, Array.prototype.join);
assert.deepEqual([1, 2, 3].join(), join([1, 2, 3]));
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/array.prototype.join
[npm-version-svg]: https://versionbadg.es/es-shims/Array.prototype.join.svg
[deps-svg]: https://david-dm.org/es-shims/Array.prototype.join.svg
[deps-url]: https://david-dm.org/es-shims/Array.prototype.join
[dev-deps-svg]: https://david-dm.org/es-shims/Array.prototype.join/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/Array.prototype.join#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/array.prototype.join.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/array.prototype.join.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/array.prototype.join.svg
[downloads-url]: https://npm-stat.com/charts.html?package=array.prototype.join
[codecov-image]: https://codecov.io/gh/es-shims/Array.prototype.join/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/Array.prototype.join/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/Array.prototype.join
[actions-url]: https://github.com/es-shims/Array.prototype.join/actions
