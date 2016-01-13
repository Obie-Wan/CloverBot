
var Robot = (function () {

  var self = {}, 
      SONAR_COLOR,
      ROBOT_COLOR = 'blue',

      sonarState = 0,
      INITIAL_X = 1,
      INITIAL_Y = 1,
      x, y, dead;

  SONAR_COLOR = ROBOT_COLOR;

  self.create = function() {
    x = INITIAL_X;
    y = INITIAL_Y;

    self.dead = false;
    self.move(0, 0);
  };

  self.getX = function() {
    return x;
  };

  self.getY = function() {
    return y;
  };

  self.move = function(left, top) {
    if (!Screen.isFree(x + left, y + top)) {      
      DEBUG ? log('Could not place a robot: cell is not free!') : null; 
      return;
    }

    x += left;
    y += top;
    
    // 2DO: refactor with pubsub
    self.scanSonar();

    if (Screen.isDangerous(x, y)) {      
      DEBUG ? log('Robot is dead') : null; 
      
      self.dead = true;
      
      
      /*clearLog();
      init();
      alert('Robot was repaired!');*/

      return;
    }
    Goal.check();
  }

  self.scanSonar = function() {    
    Screen.setVisible(x, y);

    var cells = self.getAdjacentCells();
    for (var cell in cells) {
      Screen.setVisible(cells[cell].x, cells[cell].y);
    }
  };

  self.getAdjacentCells = function() {
    var col, cells = [];

    for (col = -1; col < 2; col++) {
      cells.push({x: x + col, y: y - 1});
      cells.push({x: x + col, y: y + 1});
    }

    cells.push({x: x - 1, y: y});
    cells.push({x: x + 1, y: y});

    return cells;
  };

  // DRAWING STUFF
  self.draw = function() {
    //Screen.drawCell(x, y, ROBOT_COLOR);
    var context = Screen.getContext();

    // draw robot
    context.beginPath();
    context.arc(x * BLOCK_SIZE + BLOCK_SIZE / 2, y * BLOCK_SIZE + BLOCK_SIZE / 2, 
                BLOCK_SIZE / 2, 0, 2 * Math.PI); 
    context.closePath();

    context.fillStyle = ROBOT_COLOR;
    context.fill();

    self.drawSonar();
  };

  self.drawSonar = function() {
    var context = Screen.getContext(),
        left = x * BLOCK_SIZE,
        top  = y * BLOCK_SIZE;

    context.strokeStyle = SONAR_COLOR;
    for(var i = 1; i < sonarState; i++) {
      context.moveTo(left + BLOCK_SIZE / 2 - 5 * i, top - 5 * i);
      context.lineTo(left + BLOCK_SIZE / 2 + 5 * i, top - 5 * i);

      context.moveTo(left - 5 * i, top + BLOCK_SIZE / 2 - 5 * i);
      context.lineTo(left - 5 * i, top + BLOCK_SIZE / 2 + 5 * i);

      context.moveTo(left + BLOCK_SIZE + 5 * i, top + BLOCK_SIZE / 2 - 5 * i);
      context.lineTo(left + BLOCK_SIZE + 5 * i, top + BLOCK_SIZE / 2 + 5 * i);

      context.moveTo(left + BLOCK_SIZE / 2 - 5 * i, top + BLOCK_SIZE + 5 * i);
      context.lineTo(left + BLOCK_SIZE / 2 + 5 * i, top + BLOCK_SIZE + 5 * i);
    }
    context.stroke();
    sonarState = (sonarState === SONAR_LINES) ? 0 : sonarState + 1;
  }

  return self;
})();
