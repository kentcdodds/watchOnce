/**
 * @name watch-once
 * @version 2.0.0
 * @fileOverview The watchOnce module adds $watchOnce functionality to your $rootScope
 *
 * http://www.github.com/kentcdodds/watchOnce
 *
 * @license Scope.$watchOnce may be freely distributed under the MIT license.
 * @copyright (c) 2015 Kent C. Dodds
 * @author Kent C. Dodds <kent@doddsfamily.us> (http://kentcdodds.com)
 */
(function (factory) {
  /* jshint strict: false */
  /* global define, module, require */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('angular'));
  } else {
    // Browser globals
    factory(angular);
  }
}(function (angular) {
  'use strict';
  var ngModule = angular.module('Scope.$watchOnce', []);

  ngModule.run(['$rootScope', function($rootScope) {

    var valueValidators = {
      $watch: angular.isDefined,
      $watchCollection: angular.isDefined,
      $watchGroup: function(value) {
        return !!value && !value.some(function(item) {
          return !angular.isDefined(item);
        });
      }
    };

    // force all $newed up scopes to have the $watches
    var scopePrototype = Object.getPrototypeOf($rootScope);
    var oldNew = scopePrototype.$new;
    scopePrototype.$new = function $new() {
      var scope = oldNew.apply(this, arguments);
      addOnces(scope);
      return scope;
    };

    // add onces to $rootScope
    addOnces($rootScope);


    // FUNCTIONS

    function addOnces(scope) {
      if (!scope.$watchOnce) {
        angular.forEach(['$watch', '$watchGroup', '$watchCollection'], function(watchType) {
          if (angular.isFunction(scope[watchType])) {
            scope[watchType + 'Once'] = getWatchSubstitute(watchType);
          }
        });
      }
    }

    function getWatchSubstitute(name) {
      return function watchSubstitute(expression, listener, deep) {
        var stopWatching = {
          fn: angular.noop
        };
        var listenerWrapper = getListenerWrapper(listener, stopWatching, valueValidators[name]);
        stopWatching.fn = this[name].apply(this, [expression, listenerWrapper, deep]);
        return stopWatching.fn;
      };
    }

    function getListenerWrapper(listener, stopWatching, isValidValue) {
      return function watcherHandler(newValue) {
        if (!isValidValue(newValue)) {
          return;
        }
        listener.apply(this, arguments);
        stopWatching.fn();
      };
    }
  }]);

  return ngModule.name;
}));
