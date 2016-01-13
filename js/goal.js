
var Goal = (function () {

  var self = {}, 
      GOAL_COLOR = '#101f10',
      x = 8, y = 8;

  self.getX = function() {
    return x;
  };

  self.getY = function() {
    return y;
  };

  // DRAWING STUFF
  self.draw = function () {
    Screen.drawCell(x, y, GOAL_COLOR, 'GOAL');    
  };

  self.check = function () {
    if ((self.getX() === Robot.getX()) &&
        (self.getY() === Robot.getY())) {
      clearLog();
      init();
    }
  };
 
  return self;
})();
