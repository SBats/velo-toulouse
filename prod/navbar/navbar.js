'use sctric';

angular.module('veloToulouse.navbar',['veloToulouse.favoris', 'veloToulouse.map', 'veloToulouse.station'])

.directive('navBar',function(){

	return {
		scope: true,
		restric: 'A',
		templateUrl: "navbar/navbar.html",
		controller: 'NavCtrl'
	};

})

.controller('NavCtrl',['$scope', '$rootScope',
	function($scope, $rootScope){
		$scope.openMenu = function() {
			$('#side-menu').addClass('opened');
			$('#side-menu').removeClass('closed');
		}

		$scope.eventsHandler = function(event) {
			console.log($rootScope.childScope);
			switch ($(event.target).attr('class')) {
				case 'refresh-map':
					$rootScope.$broadcast("refreshMap");
					break;

				case 'geoloc':
					$rootScope.$broadcast("geolocToggle");
					break;

				case 'refresh-station':
					$rootScope.$broadcast("refreshStation");
					break;

				case 'refresh-favs':
					$rootScope.$broadcast("refreshFavs");
					break;

				case 'alpha':
					$rootScope.$broadcast("sortAlpha");
					break;

				case 'metric':
					$rootScope.$broadcast("sortMetric");
					break;

				default:
					console.log('Unknown function');
			}
		}

		$rootScope.updateNavBar = function(currentState) {
			switch(currentState) {

				case 'home':
					$scope.title = "Carte";

					$scope.navbar = {
						buttons: {
							geoloc: {
								icon: 'customicon:geoloc',
								iconSrc: '',
								style: '',
								class: 'geoloc'
							},
							refresh: {
								icon: 'refresh',
								iconSrc: '',
								style: 'fill:white;',
								class: 'refresh-map'
							}

						},
						menuButtons: {},
						filledOrNot: 'filled',
						backButton: false
					};
					break;

				case 'station':
					$scope.title = "";

					$scope.navbar = {
						buttons: {
							refresh: {
								icon: 'refresh',
								iconSrc: '',
								style: 'fill:white;',
								class: 'refresh-station'
							}

						},
						menuButtons: {},
						filledOrNot: '',
						backButton: true
					};
					break;

				case 'favoris':
					$scope.title = "Mes Favoris";

					$scope.navbar = {
						buttons: {
							refresh: {
								icon: 'refresh',
								iconSrc: '',
								style: 'fill:white;',
								class: 'refresh-favs'
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
					break;

				default:
					$scope.title = "";

					$scope.navbar = {
						buttons: {},
						menuButtons: {},
						filledOrNot: 'filled',
						backButton: false
					};

			}

		};



	}



]);