
function keyboardHandler(event) {
  var e = event || window.event;
  var code = e.charCode || e.keyCode;

  switch (code) {
    case KEY_UP: 
         Robot.move(0, -1);
         break;

    case KEY_DOWN: 
         Robot.move(0, 1);
         break;

    case KEY_LEFT: 
         Robot.move(-1, 0);
         break;

    case KEY_RIGHT: 
         Robot.move(1, 0);
         break;
  }
}

function createAreaBorder() {
  var size = Screen.getSize();

  for (var i = 0; i < size; i++) {
    Screen.setCell(0, i, {type: WALL});
    Screen.setCell(i, 0, {type: WALL});

    Screen.setCell(i, size - 1, {type: WALL});
    Screen.setCell(size - 1, i, {type: WALL});
  }
}

function createWalls() {
  var x, y, size = Screen.getSize();

  // exclude borders
  size -= 1;

  // create random walls
  // 2DO: better wall generation algo
  for (var i = 1; i < size; i++) {    
    x = Math.round(Math.random() * (size - 2)) + 1,
    y = Math.round(Math.random() * (size - 2)) + 1;

    if (x == INITIAL_X && y == INITIAL_Y) {
      continue;
    }
    Screen.setCell(x, y, {type: WALL});
  }
}

function createObjects() {
  var x, y, size = Screen.getSize() - 1;

  for (var i = 1; i < size / 2; i++) {    
    x = Math.round(Math.random() * (size - 2)) + 1,
    y = Math.round(Math.random() * (size - 2)) + 1;

    if (x == INITIAL_X && y == INITIAL_Y) {
      continue;
    }
    Screen.setCell(x, y, {type: TRAP, free: true, dangerous: true, visible: DEBUG});
  }
}


function createLevel() {  
  log('Creating a level ...');

  createAreaBorder();
  createWalls();
  createObjects();
}

var redrawInterval = null;

function init() {  
  Screen.init(AREA_SIZE);

  createLevel();
  Robot.create();
  //Goal.create();

  // setup draw & event timers
  Screen.draw();
  if (!redrawInterval) {
    redrawInterval = setInterval(Screen.draw, 100);
    document.getElementsByTagName('body')[0].addEventListener('keydown', keyboardHandler, false);
  };
  
  start();
}
