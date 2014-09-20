'use sctric';

angular.module('veloToulouse.navbar',[])

.directive('navBar',function(){

	return {
		scope: true,
		restric: 'A',
		templateUrl: "partials/components/navbar.html",
		controller: 'NavCtrl'
	};

})

.controller('NavCtrl',['$scope',
	function($scope){
		$scope.openMenu = function() {
			$('#side-menu').addClass('opened');
			$('#side-menu').removeClass('closed');
		}
	}
]);