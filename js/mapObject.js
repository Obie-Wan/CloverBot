
var MapObject = (function () {

  var self = {}, 
      COLOR = 'red',
      x = 0, y = 0;

  self.getX = function() {
    return x;
  };

  self.getY = function() {
    return y;
  };

  self.getAdjacentCells = function() {
    var col, cells = [];

    for (col = -1; col < 2; col++) {

      if (y > 0 && 
          x < (Screen.getSize() - col) && 
          y < (Screen.getSize() - 1)) {
        cells.push({x: x + col, y: y - 1});
        cells.push({x: x + col, y: y + 1});
      }
    }

 
    if (x > 0) {
      cells.push({x: x - 1, y: y});
    }

    if (x < (Screen.getSize() - 1)) {
      cells.push({x: x + 1, y: y});
    }   

    return cells;
  };

  // move an object
  self.move = function(left, top) {
    if (!Screen.isFree(x + left, y + top)) {      
      log('Could not place an object: cell is not free!');      
      return;
    }

    x += left;
    y += top;

    self.executeMoveHandlers();
  }

  // override me for custom move actions
  self.executeMoveHandlers = function () {};
  self.executeOverHandlers = function () {};

  // DRAWING STUFF
  self.draw = function() {
    Screen.drawCell(x, y, COLOR);
  };

  return self;
})();
