const fs = require('fs');

// Add a zero if n < 10
function addZ(n) { return n < 10 ? '0' + n:'' + n; }

// Read console input
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Build project name
const date = new Date();
const year = date.getFullYear().toString().substr(-2);
const month = addZ((date.getMonth() + 1));
const day = addZ(date.getUTCDate());
const hours = addZ(date.getHours());
const minutes = addZ(date.getMinutes());

rl.question('Nom du projet : ', (answer) => {
  // Create the project directory
  const name = `${year}${month}${day}${hours}${minutes} - ${answer}`;
  fs.mkdirSync(name);

  // Create the source folder
  const src = `C:\\Users\\Damien\\Documents\\src\\${name}`;
  fs.mkdirSync(src);

  // Create a junction to each other
  // fs.symlinkSync(src, `${name}\\src`, 'junction');
  rl.close();
});
