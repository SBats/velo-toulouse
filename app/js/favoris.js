'use strict';


angular.module('veloToulouse.favoris', [])

.controller('FavCtrl', ['$scope', 'localStorageService', 'Stations', 'WhereAmI', 'AStation', '$state', 
	function($scope, localStorageService, Stations, WhereAmI, AStation, $state) {

		$scope.title = "Mes Favoris";
		$scope.buttons = {
			refresh: {
				icon: 'refresh',
				iconSrc: '',
				action: '',
				style: 'fill:white;',
				class: 'refresh'
			},
			sort: {
				icon: 'sort',
				iconSrc: '',
				action: '',
				style: '',
				class: 'sort'
			}

		};

		$scope.backButton = false;

		var localfavs = [];
		localStorageService.bind($scope, 'favoris', localfavs);


		$scope.favStations = [];

		Stations.query(function(data){
			/*var geoCoord;
			if (navigator.geolocation) {

				WhereAmI.getPosition(function(data) {	

			    	geoCoord = data;
		   			console.log(geoCoord);

			    });
			}*/

			angular.forEach(data, function(aStation){
				aStation.name = aStation.name.substring(aStation.name.indexOf('-')+1);
				
				/*if (navigator.geolocation) {
					aStation.distance = AStation.distance.query({geoloc: geoCoord.coords.latitude+','+geoCoord.coords.longitude, stationLoc: aStation.position.lat+','+aStation.position.lng});
				}else {
					aStation.distance = '-'
				}*/

				var index = localfavs.indexOf(aStation.number);
				if (index > -1) {
					$scope.favStations.push(aStation);
				}
			});
		});

		$scope.removeFav = function(stationNumber) {
			var index = localfavs.indexOf(stationNumber);
			if (index > -1) {
				localfavs.splice(index, 1);
			}
			var i=0;
			angular.forEach($scope.favStations, function(aStation){

				if (aStation.number === stationNumber) {
					console.log('ok');
					$scope.favStations.splice(i,1);
					return true;
				}

				i++;
			});


			

		}

}])

.config(function($stateProvider, $urlRouterProvider) {
  
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('favoris', {
            url: '/favoris',
            templateUrl: 'partials/favoris.html',
            controller: 'FavCtrl'
        })
        
});