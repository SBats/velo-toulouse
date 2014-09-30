'use strict';

/* App */
// Declare app level module which depends on views, and components
var app = angular.module('veloToulouse', [
  'ui.router',
  'ngAnimate',
  'LocalStorageModule',
  'veloToulouse.home',
  'veloToulouse.map',
  'veloToulouse.station',
  'veloToulouse.favoris',
  'veloToulouse.navbar',
  'veloToulouse.sideMenu',
  'veloServices'
]);

app.controller('MainCtrl',['$rootScope', '$scope', '$state',
  function($rootScope, $scope, $state) {

    $rootScope.previousState;
    $rootScope.currentState;
    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
        $rootScope.updateNavBar(to.name);
        if (to.name !== 'home') {
          $scope.uiViewShown = true;
        }else {
          $scope.uiViewShown = false;
        }

        var ChildElement = document.querySelector('.main-view');
        $rootScope.childScope = angular.element(ChildElement).scope();
    });

    $rootScope.goToPreviousState = function() {
      if ($rootScope.previousState !== '') {
        $state.go($rootScope.previousState);
      }else {
        $state.go('home');
      }
      
    }

  }
]);

app.config(function($stateProvider, $urlRouterProvider) {
    
  $urlRouterProvider.otherwise('home');
        
});

var  trim1 = function(str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};