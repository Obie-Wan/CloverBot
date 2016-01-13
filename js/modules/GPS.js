var GPS = (function () {

  var self = {};

  self.isAvailable = function () {
    return true;
  }

  self.getLat = function () {
    return 1.0;
  }

  self.getLng = function () {
    return 1.0;
  }

  return self;
})();