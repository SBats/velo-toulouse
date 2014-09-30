'use strict';

/* Services */

var ville = 'Toulouse',
	decauxApiKey = '003549deb9ac51b9d34cacc018c0e7f97039c6f9';

angular.module('veloServices', ['ngResource'])

.factory('AStation', ['$resource',
	function($resource){

    	return {
        infos: $resource('https://api.jcdecaux.com/vls/v1/stations/:stationNumber?contract='+ville+'&apiKey='+decauxApiKey, {}, {
      		query: {method:'GET', params:{stationNumber: ''}, isArray: false}
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

.factory('WhereAmI', [
  function() {

      return {
        getPosition: function(callback) {
          navigator.geolocation.getCurrentPosition(function(position) {
            callback(position); 
          }, function(issue) {
            callback(issue);
          },{
            enableHighAccuracy: true
          });
          return callback;
        }
      }
  }
])

.factory('CalculDistance', [
  function(originsCoord, destinationsCoord) {
    return {

      getDistance: function(datas, callback) {

        var serviceCalc = new google.maps.DistanceMatrixService();
        serviceCalc.getDistanceMatrix({
          origins: [datas.originsCoord],
          destinations: [datas.destinationsCoord],
          travelMode: google.maps.TravelMode.BICYCLING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: true,
          avoidTolls: false
        },function(response, status) {
            var result = [];
            if (status != google.maps.DistanceMatrixStatus.OK) {
              result[0] = 'Error was: ' + status;
            } else {
              var origins = response.originAddresses;
              var destinations = response.destinationAddresses;
              
              for (var i = 0; i < origins.length; i++) {

                result.push(response.rows[i].elements[0].distance);
              }

            }
            
            callback(result);
          }
        );
        return callback;

      }
      
    }
    

  }
]);