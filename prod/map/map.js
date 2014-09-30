'use strict';

angular.module('veloToulouse.map', [])

.controller('MapCtrl', ['$scope', 'Stations', 'WhereAmI', '$state', 
	function($scope, Stations, WhereAmI, $state) {

		$scope.loading = true;

		var map, markers;

		$scope.$on("refreshMap", function (event) {
		   refreshMarkers();
		});

		$scope.$on("geolocToggle", function (event) {
		   geoloc();
		});

		$scope.currentView = 'velo';

		   

		function initMap() {
			map = L.map('map', {
			    center: [43.603937, 1.443253],
			    zoom: 16,
			    minZoom: 14,
			   	maxZoom: 18,
			    maxBounds: [
				    [43.538430, 1.374514],
				    [43.665970, 1.517680]
				],
				zoomControl: false,
				attributionControl: false
			});
			L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
			    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			    maxZoom: 18
			}).addTo(map);
			loadMarkers();
		}

		function geoloc() {
			if (navigator.geolocation) {
				/*map.locate(
					{
						setView: true,
						enableHighAccuracy: true
					}
				);*/
				WhereAmI.getPosition(function(data) {
			    	var lat = data.coords.latitude;
			        var lng = data.coords.longitude;

			        map.setView([lat, lng]);
			    });
			}
		}
		

		function loadMarkers() {
			Stations.query(function(data) {
				var i = 0;
				markers = new L.markerClusterGroup({
					showCoverageOnHover: false,
					disableClusteringAtZoom: 16,
					iconCreateFunction: function (cluster) {
						var childCount = cluster.getChildCount();

						return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster ' + $scope.currentView, iconSize: new L.Point(40, 40) });
					}
				});
				angular.forEach(data, function(aStationMarker) {
					var available, 
						percent;
					
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

					var currentIcon = L.icon({
					    iconUrl: 'img/markers/'+ $scope.currentView.substr(0,1) +'marker-'+ percent +'.png',
					    iconSize: [38, 60],
					    iconAnchor: [30, 60],
					    labelAnchor: [-10, -37]
					});

					var currentMarker = new L.Marker([aStationMarker.position.lat, aStationMarker.position.lng],{
						icon: currentIcon,
						title: available,
						alt: 'station-'+aStationMarker.number,
						riseOnHover: true,
						riseOffset: 600
					}).bindLabel(
						available, 
						{ 
							noHide: true ,
							className: 'availableNumber '+$scope.currentView,
							direction: 'left'
						}
					).on('click', function() {
						$state.go('station' , {'stationId': aStationMarker.number});
					});

					markers.addLayer(currentMarker);

					i++;
					if(i === data.length) {
						map.addLayer(markers);
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

			refreshMarkers();
			

		}

		function refreshMarkers() {
			$scope.loading = true;
			map.removeLayer(markers);
			loadMarkers();

		}
		initMap();
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