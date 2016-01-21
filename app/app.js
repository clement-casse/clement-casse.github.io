'use strict';

// Declare app level module which depends on views, and components
angular.module('application', [
    'ngRoute',
    'application.resume'
])

//
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/resume/en/default'
    });
}]);
