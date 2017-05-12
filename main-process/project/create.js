const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('open-directory-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, function (directory) {
    if (directory) event.sender.send('selected-directory', directory)
  })
})
