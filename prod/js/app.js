'use strict';

/* App */
// Declare app level module which depends on views, and components
var app = angular.module('veloToulouse', [
  'ui.router',
  'google-maps',
  'LocalStorageModule',
  'veloToulouse.map',
  'veloToulouse.station',
  'veloToulouse.favoris',
  'veloToulouse.navbar',
  'veloToulouse.sideMenu',
  'veloServices'
]);

app.controller('MainCtrl',['$rootScope', '$state',
  function($rootScope, $state) {

    $rootScope.previousState;
    $rootScope.currentState;
    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
    });

    $rootScope.goToPreviousState = function() {
      if ($rootScope.previousState !== '') {
        $state.go($rootScope.previousState);
      }else {
        $state.go('map');
      }
      
    }

  }
]);

app.config(function($stateProvider, $urlRouterProvider) {
    
  $urlRouterProvider.otherwise('/map');
        
});

var  trim1 = function(str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};