# $watchOnce

This module adds `$watchOnce`, `$watchGroupOnce`, and `$watchCollectionOnce` to angular scopes. Each of these have the same signature as their angular counterparts. The difference is the listener you provide is only called once, and only when the value is defined. Note that for `$watchGroupOnce`, it will only be called when *every* expression's value is defined. Also, `$watchGroupOnce` is only available in Angular >= 1.3. Once your listner has been called, the watcher stop itself from watching.

## To Get

Get the code on [GitHub](http://github.com/kentcdodds/watchOnce): [Scope.$watchOnce.js](https://raw.githubusercontent.com/kentcdodds/watchOnce/master/Scope.$watchOnce.js) | [Scope.$watchOnce.min.js](https://raw.githubusercontent.com/kentcdodds/watchOnce/master/Scope.$watchOnce.min.js)

Or by using bower or npm:

`bower|npm install watch-once`

## To Use

Include it on your page with a script tag. And add it to your dependencies:

```javascript
angular.module('app', ['Scope.$wachOnce']);

// Then you can do this:

$scope.$watchOnce('expression', function(value) {
  console.log(value); // <-- will only print once and will never be undefined.
});

// you can also use $watchGroupOnce and $watchCollectionOnce
```

See the test-runner.js and the [demo page](http://kent.doddsfamily.us/watchOnce) (which runs the test runner).

## Angular compatability

This is compatible with Angular >= 1.0.0. Note, that older versions only had `$watch` so only `$watchOnce` is supported for the older versions.

## No grunt/gulp/mocha/jasmin/whatever?

It's small... I haven't taken the time to make a build. But there are tests, just not using a testing framework... And this is all you have to do with each update:

- run `$ uglifyjs Scope.\$watchOnce.js --comments -o Scope.\$watchOnce.min.js`
- Bump `bower.json` and `package.json` versions.

## License

MIT