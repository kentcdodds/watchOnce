# $watchOnce

[![Bower version](https://badge.fury.io/bo/watch-once.svg)](http://badge.fury.io/bo/watch-once)
[![Code Climate](http://img.shields.io/codeclimate/github/kentcdodds/watchOnce.svg)](https://codeclimate.com/github/kentcdodds/watchOnce)
[![Build Status](https://travis-ci.org/kentcdodds/watchOnce.svg?branch=master)](https://travis-ci.org/kentcdodds/watchOnce)

[![NPM](https://nodei.co/npm/watch-once.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/watch-once/)

This module adds `$watchOnce`, `$watchGroupOnce`, and `$watchCollectionOnce` to angular scopes. Each of these have the same signature as their angular counterparts. The difference is the listener you provide is only called once, and only when the value is defined. Note that for `$watchGroupOnce`, it will only be called when *every* expression's value is defined. Also, `$watchGroupOnce` is only available in Angular >= 1.3. Once your listener has been called, the watcher stops itself from watching.

## To Get

Get the code on [GitHub](http://github.com/kentcdodds/watchOnce): [index.js](https://raw.githubusercontent.com/kentcdodds/watchOnce/master/index.js) | [index.min.js](https://raw.githubusercontent.com/kentcdodds/watchOnce/master/index.min.js)

Or by using bower or npm:

`bower|npm install watch-once`

## To Use

Include it on your page with a script tag (or require it in using commonjs or amd) and add it to your dependencies:

```javascript
// CommonJS
angular.module('app', [require('watch-once')]);

// AMD
define(['path/to/watch-once/index.js'], function(watchOnce) {
  angular.module('app', [watchOnce]);
});

// global
angular.module('app', ['watchOnce']);



// Then you can do this:

$scope.$watchOnce('expression', function(value) {
  console.log(value); // <-- will only print once and will never be undefined.
});

// it works in link functions as well (other solutions don't do this).

// you can also use $watchGroupOnce and $watchCollectionOnce
```

See the test-runner.js and the [demo page](http://kent.doddsfamily.us/watchOnce) (which runs the test runner).

## Angular compatibility

This is compatible with Angular >= 1.0.0. Note, that older versions only had `$watch` so only `$watchOnce` is supported for the older versions.
