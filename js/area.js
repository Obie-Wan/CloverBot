
var Area = (function () {

  var self = {},
      coords = {lat: 0.0, lng: 0.0},
      areaData = null,
      Storage = {get: function() { return {};}}; // temp

  self.getAreaInfo = function () {
    var prevCoords   = Storage.get('coords', coords),
        prevAreaData = Storage.get('areaData', areaData); 

    coords.lat = GPS.getLat();
    coords.lng = GPS.getLng();

    if (prevCoords.lat !== coords.lat &&
        prevCoords.lng !== coords.lng) {
      robotLog('New area detected!');
      //scanArea();
    }
  }

  /*self.saveAreaInfo = function () {
    Storage.set('coords', coords); 
    Storage.set('areaData', areaData); 
  }*/

  return self;
})();