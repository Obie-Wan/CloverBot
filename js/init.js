var totalTime = 0, interval = null;

function startTimer() {
	totalTime = 0;
	
  if (!interval) {
    interval = setInterval(function () {
      totalTime += 1;
    }, 1000);
  }
}


function start() {
  robotLog('Initialization ...');

  Discover.scanSubSystems();
  Area.getAreaInfo();

  startTimer();
  
  //listenForTasks();
  //runTasks();
}

function stop() {  
  saveAreaInfo();  
  pauseTasks();
  halt();
}