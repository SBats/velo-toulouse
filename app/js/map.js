'use strict';


var lat = 43.603937,
	lng = 1.443253,
	mapElement = 'velo';

angular.module('veloToulouse.map', [])

.controller('MapCtrl', ['$scope', 'Stations', 'WhereAmI', '$state', 
	function($scope, Stations, WhereAmI, $state) {

		$scope.stationMarkers = [];

		$scope.title = "Carte";
		$scope.buttons = {
			geoloc: {
				icon: '',
				iconSrc: 'img/icons/geoloc.png',
				action: 'map.geoloc()',
				style: '',
				class: 'geoloc'
			},
			refresh: {
				icon: 'refresh',
				iconSrc: '',
				action: 'refreshMarkers()',
				style: 'fill:white;',
				class: 'refresh'
			}

		};

		$scope.backButton = false;

		$scope.eventsHandler = function(event) {
			switch ($(event.target).attr('class')) {
				case 'refresh':
					$scope.refreshMarkers();
					break;

				case 'geoloc':
					$scope.map.geoloc();
					break;

				default:
					$scope.refreshMarkers();
			}
		}

		$scope.currentView = mapElement;

		$scope.map = {
		    center: {
		        latitude: lat,
		        longitude: lng
		    },
		    zoom: 16,
		    options: {
		    	disableDefaultUI: true
		    },
		    control: {},
		    events: {
			    dragend : function(maps, dragend){
			    	var coord = maps.getCenter();
			    	lat = coord.k;
					lng = coord.B;
				}
		    },
		    geoloc: function() {
		    	if (navigator.geolocation) {
					WhereAmI.getPosition(function(data) {
				    	lat = data.coords.latitude;
				        lng = data.coords.longitude;

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
				angular.forEach(data, function(aStationMarker) {
					var currentMarker = {}, available, percent;
					
					currentMarker.id = aStationMarker.number;
					currentMarker.latitude = aStationMarker.position.lat;
					currentMarker.longitude = aStationMarker.position.lng;
					
					if(mapElement === 'station'){
						percent = Math.floor((Math.round(aStationMarker.available_bike_stands/aStationMarker.bike_stands*100)+5)/10)*10;
					}else{
						percent = Math.floor((Math.round(aStationMarker.available_bikes/aStationMarker.bike_stands*100)+5)/10)*10;
					}
					
					if(mapElement === 'station'){
						available = String(aStationMarker.available_bike_stands);
					}else{
						available = String(aStationMarker.available_bikes);
					}
	
					currentMarker.icon = 'img/markers/'+ mapElement.substr(0,1) +'marker-'+ percent +'.png';
					currentMarker.options = {
						'labelContent': available,
						'labelAnchor': '16 48',
						'labelClass': 'availableNumber '+mapElement
					};

					$scope.stationMarkers.push(currentMarker);
				});


			});
		}

		$scope.switchMarkers = function(event) {
			if (mapElement === 'velo' ) {
				$scope.currentView = mapElement = 'station';
			}else {
				$scope.currentView = mapElement = 'velo';
			}

			$scope.refreshMarkers();
			

		}

		$scope.refreshMarkers = function() {
			$scope.stationMarkers = [];
			loadMarkers();

		}

		loadMarkers();

		//$scope.stations = Stations.query();
}])

.config(function($stateProvider, $urlRouterProvider) {
  
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('map', {
            url: '/map',
            templateUrl: 'partials/map.html',
            controller: 'MapCtrl'
        })
        
});