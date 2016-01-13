
var SubSystem = (function () {

  var self = {};

  self.test = function (name) {
    robotLog(name + ' status is OK');
    return true;
  }

  return self;
})();