var totalTime = 0;

function startTimer() {
	totalTime = 0;
	Screen.drawText('XTEST ' + totalTime, 'red', false, 20, 20);
	setInterval(function () {
		totalTime += 1;
	}, 1000);
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