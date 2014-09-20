'use sctric';

angular.module('veloToulouse.sideMenu',[])

.directive('sideMenu',function(){

	return {
		scope: true,
		restric: 'A',
		templateUrl: "partials/components/side-menu.html",
		controller: 'SideMenuCtrl'
	};

})

.controller('SideMenuCtrl',['$scope',
	function($scope){

		$scope.closeMenu = function() {
			$('#side-menu').removeClass('opened');
			$('#side-menu').addClass('closed');
		}
	}
]);