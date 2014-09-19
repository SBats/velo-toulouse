'use strict';

/* Services */

var ville = 'Toulouse',
	decauxApiKey = '003549deb9ac51b9d34cacc018c0e7f97039c6f9',
  googleApiKey = 'AIzaSyC_IUmJss50rhoUQc8Wl245UOm1WZpHso8',
  locomotion = 'bicycling',
  lang = 'fr-FR';

angular.module('veloServices', ['ngResource'])

.factory('AStation', ['$resource',
	function($resource){

    	return {
        infos: $resource('https://api.jcdecaux.com/vls/v1/stations/:stationNumber?contract='+ville+'&apiKey='+decauxApiKey, {}, {
      		query: {method:'GET', params:{stationNumber: ''}, isArray: false}
      	}),

        distance: $resource('https://maps.googleapis.com/maps/api/distancematrix/json?origins=:geoloc&destinations=:stationLoc&mode='+ locomotion +'&language='+ lang +'&key='+googleApiKey, {}, {
          query: {method:'GET', params:{geoloc: '', stationLoc: ''}, isArray: false}
        })
      };
 	}
 ])

.factory('Stations', ['$resource',
	function($resource){

    	return $resource('https://api.jcdecaux.com/vls/v1/stations?contract='+ville+'&apiKey='+decauxApiKey, {}, {
      		query: {method:'GET', params:{}, isArray: true}
      	});

 	}
 ])

.factory('WhereAmI', 
  function() {

      return {
        getPosition: function(callback) {
          navigator.geolocation.getCurrentPosition(function(position) { callback(position); });
          return callback;
        }
      }
  }
);