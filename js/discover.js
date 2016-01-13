
var Discover = (function () {

  var self = {},
      subSystemArrayStub = ['GPS', 'Sonar']; // 2do: get from BUS

  self.scanSubSystems = function () {
    robotLog('Scanning subsystems ...');

    for (var i = 0; i < subSystemArrayStub.length; i++) {
      robotLog(subSystemArrayStub[i] + ' component is found');
      SubSystem.test(subSystemArrayStub[i]);
    }
  }

  return self;
})();