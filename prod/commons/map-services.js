'use strict';

/* Services */

angular.module('mapServices', ['ngResource'])

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
])

.factory('calculCoords', [
  function(cityName) {
    return {

      getCityCoords: function(city, callback) {

        var geocoder = new google.maps.Geocoder(),
            latLng = [43.603937, 1.443253];
        geocoder.geocode({'address': city}, function(response, status){
          var result;
          if (status == google.maps.GeocoderStatus.OK) {
            result = [response[0].geometry.location.k,response[0].geometry.location.B] ;
          } else {
            result = latLng;
            console.error("Geocode was not successful for the following reason: " + status);
          }
          callback(result)
        });
        return callback;

      }
      
    }
    

  }
]);