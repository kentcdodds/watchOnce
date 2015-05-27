angular.module('example', ['Scope.$watchOnce']).run(function($rootScope) {
  'use strict';
  
  var calls = {
    $watch: 0,
    $watchOnce: 0,

    $watchGroup: 0,
    $watchGroupOnce: 0,

    $watchCollection: 0,
    $watchCollectionOnce: 0
  };

  var watchTypes = [];
  angular.forEach(['$watch', '$watchGroup', '$watchCollection'], function(type) {
    if (angular.isFunction($rootScope[type])) {
      watchTypes.push(type);
    }
  });

  var expressions = {
    $watch: 'objs.$watch',
    $watchGroup: ['objs.$watchGroup1', 'objs.$watchGroup2'],
    $watchCollection: 'objs.$watchCollection'
  };

  var firstAssignments = {
    $watch: '$watch',
    $watchGroup: ['$watchGroup1', '$watchGroup2'],
    $watchCollection: ['$watchCollection1', '$watchCollection2']
  };

  var secondAssignments = {
    $watch: '$watchAgain',
    $watchGroup: ['$watchGroup1Again', '$watchGroup2Again'],
    $watchCollection: ['$watchCollection1Again', '$watchCollection2Again']
  };

  var finalValues = {};

  $rootScope.testResults = '';

  $rootScope.objs = {
    $watch: undefined,
    $watchGroup1: undefined,
    $watchGroup2: undefined,
    $watchCollection: undefined
  };

  iterateTypes(function(type, typeOnce) {
    $rootScope[type](expressions[type], getIncrementer(type));
    $rootScope[typeOnce](expressions[type], getIncrementer(typeOnce));
  });

  setTimeout(function() {
    $rootScope.objs.$watch = firstAssignments.$watch;
    $rootScope.objs.$watchGroup1 = firstAssignments.$watchGroup[0];
    $rootScope.objs.$watchGroup2 = firstAssignments.$watchGroup[1];
    $rootScope.objs.$watchCollection = firstAssignments.$watchCollection;
    $rootScope.$apply();
  }, 1);

  setTimeout(function() {
    $rootScope.objs.$watch = secondAssignments.$watch;
    $rootScope.objs.$watchGroup1 = secondAssignments.$watchGroup[0];
    $rootScope.objs.$watchGroup2 = secondAssignments.$watchGroup[1];
    $rootScope.objs.$watchCollection = secondAssignments.$watchCollection;
    $rootScope.$apply();
  }, 2);

  setTimeout(function() {
    iterateTypes(function(type) {
      printResults(type);
    });
    $rootScope.$apply();
  }, 3);

  function printResults(type) {
    var typeOnce = type + 'Once';
    var normalWorked = 3 === calls[type] && angular.equals(finalValues[type], secondAssignments[type]);
    var onceWorked = 1 === calls[typeOnce] && angular.equals(finalValues[typeOnce], firstAssignments[type]);
    $rootScope.testResults += type + ' Results\n';
    $rootScope.testResults += getResult(type, 3, normalWorked);
    $rootScope.testResults += '\n';
    $rootScope.testResults += getResult(typeOnce, 1, onceWorked);
    $rootScope.testResults += '\n\n';
    if (!normalWorked || !onceWorked) {
      console.log('finalValues: ', finalValues);
    }
  }

  function getResult(type, totalCalls, worked) {
    return type + ': Total calls ' + totalCalls + ' === ' + calls[type] + ' and correct values... ' + worked + ' ---> ' + (worked ? 'Success' : 'Failure') + '!';
  }

  function getIncrementer(item) {
    return function(_new) {
      finalValues[item] = _new;
      calls[item]++;
    };
  }

  function iterateTypes(fn) {
    angular.forEach(watchTypes, function(type) {
      fn(type, type + 'Once');
    });
  }
});
