angular.module('veloToulouse.home', [])

.controller('HomeCtrl', ['$scope', '$state',
	function($scope, $state) {

	}
])

.config(function($stateProvider, $urlRouterProvider) {
  
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        })
        
});