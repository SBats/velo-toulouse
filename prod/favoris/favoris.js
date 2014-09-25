'use strict';


angular.module('veloToulouse.favoris', ['veloToulouse.navbar'])

.controller('FavCtrl', ['$scope', 'localStorageService', 'Stations', 'WhereAmI', 'AStation', 'CalculDistance', '$state', 
	function($scope, localStorageService, Stations, WhereAmI, AStation, CalculDistance, $state) {		

		$scope.$on("refreshFavs", function (event) {
		   $scope.loadStations();
		});

		$scope.$on("sortAlpha", function (event) {
		   $scope.sortByAlpha();
		});

		$scope.$on("sortMetric", function (event) {
		   $scope.sortByMetric();
		});

		var localfavs = [];
		localStorageService.bind($scope, 'favoris', localfavs);

		$scope.sortByAlpha = function() {
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
			$scope.favStations.sort(function(a,b) {
				var distanceA = parseFloat(a.distance.value);
				var distanceB = parseFloat(b.distance.value);
				if (distanceA < distanceB) {
					return -1;
				}else if(distanceB < distanceA) {
					return 1;
				}else {
					return 0;
				}
			});
		}


		$scope.loadStations = function() {

			$scope.favStations = [];

			Stations.query(function(data){
				var stations = data;
				var geoloc;
				if (navigator.geolocation) {

					WhereAmI.getPosition(function(data) {	

				    	geoloc = data.coords.latitude+','+data.coords.longitude;

				    	angular.forEach(stations, function(aStation){
							aStation.name = trim1(aStation.name.substring(aStation.name.indexOf('-')+1));
							aStation.bonusClass = '';

							var index = localfavs.indexOf(aStation.number);
							if (index > -1) {
								var goal = aStation.position.lat+','+aStation.position.lng;
								CalculDistance.getDistance({originsCoord: geoloc, destinationsCoord: goal}, function(result) {
									aStation.distance = result[0];
									$scope.$digest();
								});
								$scope.favStations.push(aStation);
								$scope.sortByAlpha();
							}
						});

				    });
				}else {
					angular.forEach(data, function(aStation){
						aStation.name = trim1(aStation.name.substring(aStation.name.indexOf('-')+1));

						var index = localfavs.indexOf(aStation.number);
						if (index > -1) {
							$scope.favStations.push(aStation);
						}
						$scope.$digest();
						$scope.sortByAlpha();
					});
				}				

			});
		}

		$scope.removeFav = function(stationNumber, event) {

			var index = localfavs.indexOf(stationNumber);
			if (index > -1) {
				localfavs.splice(index, 1);
				favOrNot();
			}
			for(var i=0; i < $scope.favStations.length; i++){

				if ($scope.favStations[i].number === stationNumber) {
					$scope.favStations[i].bonusClass = 'deleting';
					setTimeout(function(){
						$scope.favStations.splice(i,1);
						console.log(i + ' ' +$scope.favStations);
						$scope.$digest();
					},500);	
					break;	

				}
				
			}

		}

		var favOrNot = function() {
			if(localfavs.length === 0) {
				$scope.noFavs = true;
			}else {
				$scope.noFavs = false;
			}
		}

		favOrNot();
		$scope.loadStations();

}])

.config(function($stateProvider, $urlRouterProvider) {
  
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('favoris', {
            url: '/favoris',
            templateUrl: 'favoris/favoris.html',
            controller: 'FavCtrl'
        })
        
});