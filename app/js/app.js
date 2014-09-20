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

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/map');
        
});

