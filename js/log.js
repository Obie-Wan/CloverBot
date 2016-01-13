var logArea = document.getElementById('log');

function clearLog() {
  logArea.value = '';
}

function log(message) {
  logArea.value += message + '\n';
}

function robotLog(message) {
  logArea.value += '[' + NAME + ' v.' + VERSION + '] ' + message + '\n';
}