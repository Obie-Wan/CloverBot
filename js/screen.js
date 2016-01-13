
var Screen = (function () {

  var grid,
      self = {},      

      canvas  = document.getElementById('level'),
      context = canvas.getContext('2d');

  self.init = function (size) {      
    grid = Array(size);

    for (var i = 0; i < size; i++) {
      grid[i] = Array(size);
      for (var i1 = 0; i1 < size; i1++) {
        grid[i][i1] = {type: EMPTY, free: true, visible: DEBUG};
      }
    }

    canvas.width  = size * BLOCK_SIZE;
    canvas.height = canvas.width;
  };

  // getters
  self.getSize = function () {
    return grid.length;
  };

  self.getContext = function() {
    return context;
  };

  self.isFree = function (x, y) {
    return grid[x][y].free;
  };

   self.isDangerous = function (x, y) {
    return grid[x][y].dangerous;
  };

  // setters
  self.setCell = function (x, y, cell) {
    if (x < grid.length && y < grid.length) {
      grid[x][y] = cell;
    } else {
      log('setCell failed: invalid coordinates:' + x + ',' + y);
    }
  };

  self.setVisible = function(x, y) {
    grid[x][y].visible = true;
  };

  self.drawCell = function (x, y, color, text) {
    context.fillStyle = color;
    context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

    if (text) {
      context.font = '10pt Calibri';
      context.fillStyle = 'white';

      
      var topOffset = context.measureText(text).height,
          leftOffset = context.measureText(text).width/2;
      context.fillText(text, x*BLOCK_SIZE + BLOCK_SIZE/2 - leftOffset, 
                             y*BLOCK_SIZE + BLOCK_SIZE/2);
    }

    if (DEBUG) {
      context.fillStyle = 'white';
      context.fillText(x + ' / ' + y, x * BLOCK_SIZE + 10, y * BLOCK_SIZE + 10);
    }        
  };

  self.drawText = function(text, color, align, x, y) {
      context.font = '30pt Calibri';
      if (align) {
        context.textAlign = align;
      }
      context.fillStyle = color;
      context.fillText(text, x || canvas.width / 2, y || canvas.height / 2);
  };

  self.drawTrap = function (x, y) {
    var RAYS = 5;

    function Segment(startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    function getAveragePoint(start, end) {
        return {
          x: start.x + (end.x - start.x) / 2,
          y: start.y + (end.y - start.y) / 2
        };
    }

    function createSegments() {
        maximumOffset = 70; // of the lightning top

        var segmentList = [new Segment(startPoint, endPoint)];
        offsetAmount = maximumOffset; 

        for(var i=0; i<RAYS; i++) {          
          var iter_start_len = segmentList.length;
          for(var j=0; j<iter_start_len; j++) { // iterate current segment list
            segment = segmentList.shift();      // remove basic segment, which we brake into parts

            midPoint = getAveragePoint(segment.startPoint, segment.endPoint);

            // move midPoint by random offset            
            midPoint.x += (Math.random() < 0.5 ? -1 : 1) * Math.random() * offsetAmount;
            midPoint.y += (Math.random() < 0.5 ? -1 : 1) * Math.random() * offsetAmount;

            // create 2 new segments from the basic with an intermediate point
            segmentList.push(new Segment(startPoint, midPoint));
            segmentList.push(new Segment(midPoint, endPoint));
          }

          offsetAmount /= 2; // decrease middle point offset to smoothen lightning borders
        }

        return segmentList;
    }

    var max, min, context  = Screen.getContext();
    var startPoint = {x: x * BLOCK_SIZE, y: y * BLOCK_SIZE};
    var endPoint = {x: startPoint.x + BLOCK_SIZE, y: startPoint.y + BLOCK_SIZE};
    var segments = createSegments();

    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);

    for (var i=0; i<segments.length; i++) {
      context.lineTo(segments[i].startPoint.x, segments[i].startPoint.y);
      context.lineTo(segments[i].endPoint.x, segments[i].endPoint.y);
    }

    context.strokeStyle = '#ffffff';    
    context.stroke();
  };

  self.draw = function () {
    var cell, color;

    // clean canvas
    canvas.height = canvas.width;

    var remains = LEVEL_TIME - totalTime;
    if(Robot.dead || (remains <= 0)) {
      Screen.drawText('GAME OVER', 'red', 'center');
      return;
    }

    for (var x = 0; x < self.getSize(); x++) {     
      for (var y = 0; y < self.getSize(); y++) 
      {
        cell = grid[x][y];
        if (cell.visible) {
          switch (cell.type) {
            case WALL:
                 color = '#555555';
                 self.drawCell(x, y, color);
                 break;
            case EMPTY:                 
                 color = 'green';           
                 self.drawCell(x, y, color);      
                 break;
            case TRAP:                 
                 color = 'green';                 
                 self.drawCell(x, y, color);
                 self.drawTrap(x, y);
                 break;
            default:
                 color = 'red';
                 self.drawCell(x, y, color);
                 break;
          }
        }        
      }
    }

    Goal.draw();
    Robot.draw();
    
    self.drawText('TIME LEFT: ' + remains, 'red', false, 10, 40);
  }

  return self;
})();
