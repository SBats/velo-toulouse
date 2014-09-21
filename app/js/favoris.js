'use strict';


angular.module('veloToulouse.favoris', [])

.controller('FavCtrl', ['$scope', 'localStorageService', 'Stations', 'WhereAmI', 'AStation', '$state', 
	function($scope, localStorageService, Stations, WhereAmI, AStation, $state) {

		$scope.title = "Mes Favoris";

		$scope.navbar = {
			buttons: {
				refresh: {
					icon: 'refresh',
					iconSrc: '',
					style: 'fill:white;',
					class: 'refresh'
				}

			},
			menuButtons: {
				sort: {
					icon: 'sort',
					iconSrc: '',
					halign: 'right',
					valign: 'top',
					style: '',
					class: 'sort',
					childs: {
						alpha: {
							label: 'Az',
							icon: '',
							class: 'alpha'
						},
						metric: {
							label: 'Km',
							icon: '',
							class: 'metric'
						}
					}
				}

			},
			filledOrNot: 'filled',
			backButton: false
		};

		$scope.eventsHandler = function(event) {
			switch ($(event.target).attr('class')) {
				case 'refresh':
					$scope.loadStations();
					break;

				case 'alpha':
					$scope.sortByAlpha();
					break;

				case 'metric':
					$scope.sortByMetric();
					break;

				default:
					$scope.loadStations();
			}
		}

		var localfavs = [];
		localStorageService.bind($scope, 'favoris', localfavs);

		$scope.sortByAlpha = function() {
			console.log($scope.favStations);
			$scope.favStations.sort(function(a,b) {
				var textA = a.name.toUpperCase();
    			var textB = b.name.toUpperCase();
				if (textA < textB) {
					return -1;
				}else if (textA > textB) {
					return 1;
				}else {
					return 0;
				}
			});
		}

		$scope.sortByMetric = function() {
			console.log('sort By Metric');
			$scope.favStations.sort(function(a,b) {
				if (a.distance < b.distance) {
					return -1;
				}else if(b.distance < a.distance) {
					return 1;
				}else {
					return 0;
				}
			});
		}


		$scope.loadStations = function() {

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
					aStation.name = trim1(aStation.name.substring(aStation.name.indexOf('-')+1));
					
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
				$scope.sortByAlpha();

			});
		}

		$scope.removeFav = function(stationNumber, event) {
			event.preventDefault();

			var index = localfavs.indexOf(stationNumber);
			if (index > -1) {
				localfavs.splice(index, 1);
			}
			var i=0;
			angular.forEach($scope.favStations, function(aStation){

				if (aStation.number === stationNumber) {
					$scope.favStations.splice(i,1);
					return true;
				}

				i++;
			});


		}

		$scope.loadStations();

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