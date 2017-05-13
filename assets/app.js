const remote = require('electron').remote;

const close = document.getElementById('app-close');
close.addEventListener('click', () => {
  const window = remote.getCurrentWindow();
  window.close();
})
