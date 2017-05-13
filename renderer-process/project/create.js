const ipc = require('electron').ipcRenderer;
const fs = require('fs');

// Add a zero if n < 10
function addZ(n) { return n < 10 ? '0' + n:'' + n; }

const projectNameInput = document.getElementById('project-name');
const projectDirInput = document.getElementById('project-dir');

// fill the directory input if defined as an argument from shell
ipc.on('path', function (event, path) {
  projectDirInput.value = path;
})

// Select path for the new project
const selectDirBtn = document.getElementById('select-directory');

// Open directory selection dialog
selectDirBtn.addEventListener('click', function (event) {
  ipc.send('open-directory-dialog');
})

// Get selected directory
ipc.on('selected-directory', function (event, path) {
  projectDirInput.value = path;
})

ipc.on('section-displayed', function (event, path) {
  // It seems to work only when no debug tools
  projectNameInput.focus();
})

// Create directories
const createDirs = () => {
  // Build project name
  const date = new Date();
  const year = date.getFullYear().toString().substr(-2);
  const month = addZ((date.getMonth() + 1));
  const day = addZ(date.getUTCDate());
  const hours = addZ(date.getHours());
  const minutes = addZ(date.getMinutes());

  // Create the project directory
  const projectName = document.getElementById('project-name').value;
  const name = `${year}${month}${day}${hours}${minutes} - ${projectName}`;
  fs.mkdirSync(`${projectDirInput.value}\\${name}`);

  // Create the source folder
  const src = `C:\\Users\\Damien\\Documents\\src\\${name}`;
  fs.mkdirSync(src);
}

// Enter hit
const formElement = document.getElementById('create-project-form');
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  createDirs();
})

// Create button clicked
const createButton = document.getElementById('create-project');
createButton.addEventListener('click', function (event) {
  createDirs();
});
