'use strict';

angular.module('veloToulouse.station', [])

.controller('StationCtrl', ['$scope', 'AStation', 'WhereAmI', 'localStorageService', 'CalculDistance', '$stateParams',
	function($scope, AStation, WhereAmI, localStorageService, CalculDistance, $stateParams) {

		var localfavs = [];
		localStorageService.bind($scope, 'favoris', localfavs);


		$scope.title = "";

		$scope.navbar = {
			buttons: {
				refresh: {
					icon: 'refresh',
					iconSrc: '',
					style: 'fill:white;',
					class: 'refresh'
				}

			},
			menuButtons: {},
			filledOrNot: '',
			backButton: true
		};

		$scope.eventsHandler = function(event) {
			switch ($(event.target).attr('class')) {
				case 'refresh':
					$scope.updateStation();
					break;

				default:
					$scope.updateStation();
			}
		}

		$scope.favOrNot = '';

		$scope.station = AStation.infos.query({stationNumber: $stateParams.stationId}, function() {

			$scope.station.name = trim1($scope.station.name.substring($scope.station.name.indexOf('-')+1));
			$scope.station.distance = 'Calcul...';
			if (navigator.geolocation) {

				WhereAmI.getPosition(function(data) {	

					var geoloc = data.coords.latitude+','+data.coords.longitude;
					var goal = $scope.station.position.lat+','+$scope.station.position.lng;

					CalculDistance.getDistance({originsCoord: geoloc, destinationsCoord: goal}, function(result) {
						$scope.station.distance = result[0];
						$scope.$digest();
					});
			    	 
			    });
			}else {
				$scope.station.distance = '???';
			}

			updateFavOrNot();

		});

		var updateFavOrNot = function() {

			var index = localfavs.indexOf($scope.station.number);
			if (index > -1) {
				$scope.favOrNot = 'star';
			}else {
				$scope.favOrNot = 'star-outline';
			}
		}

		$scope.changeFav = function() {

			var index = localfavs.indexOf($scope.station.number);
			if (index > -1) {
				localfavs.splice(index, 1);
			}else {
				localfavs.push($scope.station.number);
			}

			updateFavOrNot();

		}

		$scope.updateStation = function() {

			var updatedInfos = AStation.infos.query({stationNumber: $stateParams.stationId}, function() {

				$scope.station.available_bikes = updatedInfos.available_bikes;

				$scope.station.available_bike_stands = updatedInfos.available_bike_stands;

				if (navigator.geolocation) {

					WhereAmI.getPosition(function(data) {	

				    	$scope.station.distance = AStation.distance.query({geoloc: data.coords.latitude+','+data.coords.longitude, stationLoc: $scope.station.position.lat+','+$scope.station.position.lng});
			   
				    });
				}


			});

			
		}

	}
])

.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
        
        .state('station', {
            url: '/station/:stationId',
            templateUrl: 'partials/station.html',
            controller: 'StationCtrl'
        })
        
});