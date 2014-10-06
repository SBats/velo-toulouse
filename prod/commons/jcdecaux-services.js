'use strict';

/* Services */

angular.module('jcDecauxServices', ['ngResource'])

.factory('AStation', ['$resource',
	function($resource){

    	return {
        infos: $resource('https://api.jcdecaux.com/vls/v1/stations/:stationNumber?contract=:city&apiKey=:decauxApiKey', {}, {
      		query: {method:'GET', params:{stationNumber: '', city: '', decauxApiKey: ''}, isArray: false}
      	})
      };
 	}
 ])

.factory('Stations', ['$resource',
	function($resource){

    	return $resource('https://api.jcdecaux.com/vls/v1/stations?contract=:city&apiKey=:decauxApiKey', {}, {
      		query: {method:'GET', params:{city: '', decauxApiKey: ''}, isArray: true}
      	});

 	}
 ]);