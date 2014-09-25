'use strict';

angular.module('veloToulouse.map', [])

.controller('MapCtrl', ['$scope', 'Stations', 'WhereAmI', '$state', 
	function($scope, Stations, WhereAmI, $state) {

		$scope.loading = true;

		$scope.$on("refreshMap", function (event) {
		   $scope.refreshMarkers();
		});

		$scope.$on("geolocToggle", function (event) {
		   $scope.map.geoloc();
		});

		$scope.stationMarkers = {
			list: [],
			control: {}
		};

		$scope.currentView = 'velo';

		$scope.map = {
		    center: {
		        latitude: 43.603937,
		        longitude: 1.443253
		    },
		    zoom: 16,
		    options: {
		    	disableDefaultUI: true,
		    	minZoom: 14,
		    	maxZoom: 18
		    },
		    control: {},
		    events: {
		    	tilesloaded: function (map) {
		            $scope.$apply(function () {
		            	$scope.mapInstance = map;
		            	loadMarkers();

	           	 	});
		        }
		    },
		    geoloc: function() {
		    	if (navigator.geolocation) {
					WhereAmI.getPosition(function(data) {
				    	var lat = data.coords.latitude;
				        var lng = data.coords.longitude;

				        $scope.map.control.refresh({latitude: lat, longitude: lng});
				    });
				}
		    }
		};

		$scope.markersEvents = {
          click: function (gMarker, eventName, model) {
            if(model.id){
              $state.go('station' , {'stationId': model.id});
            }
          }
        };

		var markers = [];

		var loadMarkers = function() {
			Stations.query(function(data) {
				var i = 0;
				angular.forEach(data, function(aStationMarker) {
					var currentMarker = {}, available, percent;
					
					currentMarker.id = aStationMarker.number;
					currentMarker.latitude = aStationMarker.position.lat;
					currentMarker.longitude = aStationMarker.position.lng;
					
					if($scope.currentView === 'station'){
						percent = Math.floor((Math.round(aStationMarker.available_bike_stands/aStationMarker.bike_stands*100)+5)/10)*10;
					}else{
						percent = Math.floor((Math.round(aStationMarker.available_bikes/aStationMarker.bike_stands*100)+5)/10)*10;
					}
					
					if($scope.currentView === 'station'){
						available = String(aStationMarker.available_bike_stands);
					}else{
						available = String(aStationMarker.available_bikes);
					}
	
					currentMarker.icon = 'img/markers/'+ $scope.currentView.substr(0,1) +'marker-'+ percent +'.png';
					currentMarker.options = {
						'labelContent': available,
						'labelAnchor': '16 48',
						'labelClass': 'availableNumber '+$scope.currentView
					};

					$scope.stationMarkers.list.push(currentMarker);

					i++;
					if(i === data.length) {
						$scope.loading = false;
					}

				});

				
				
			});
			
		}

		$scope.switchMarkers = function(event) {
			if ($scope.currentView === 'velo' ) {
				$scope.currentView = $scope.currentView = 'station';
			}else {
				$scope.currentView = $scope.currentView = 'velo';
			}

			$scope.refreshMarkers();
			

		}

		$scope.refreshMarkers = function() {
			$scope.loading = true;
			$scope.stationMarkers.list = [];
			loadMarkers();

		}

		//$scope.stations = Stations.query();
}])

.directive('mapVelo',[
	function() {
		return {
			restrict: 'E',
			templateUrl: 'map/map.html',
			controller: 'MapCtrl',
			replace: false
		}
	}
]);