process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('node:path');

var win;
var child;

let filePath = null;
let notEmty = false;

const opts = {
  type: 'question',
  buttons: ['Cancel', 'Yes', 'No'],
  defaultId: 1,
  cancelId: 0,
  title: 'Question',
  message: 'Do you want to save the current program?'
}


ipcMain.handle("configCheck", (sender) => {
});

let saveFile = function (data) {
  dialog.showSaveDialog(win,{
    defaultPath: "G:\\",
    title: "Save object",
    properties: ['saveFile'],
    filters: [
      { name: "projekt", extensions: ["sim51"] }
    ],
  }).then(result => {
    if (!result.canceled) {
      console.log(result.filePath);
      filePath = result.filePath
      fs.writeFile(result.Path, data, function (err) {
      });
      saveFile = function (data) {
        fs.writeFile(filePath, data, function (err) {
        });
      };
      autoSave = function (data) {
        fs.writeFile(filePath, data, function (err) {
        });
      };
      notEmty = false;
    }
  }).catch(err => {
    console.log(err);
  })
}

let autoSave = function (data) {
  let d = JSON.parse(data);
  notEmty = d.Code.replace(/\s+/g, '') != '' || d.Periphery == [];
};

ipcMain.handle("Save", (sender, data) => {
  saveFile(data);
});

ipcMain.handle("autoSave", (sender, data) => {
  autoSave(data);
});

function openFile() {
  if (filePath != null) {
    if (closeFileConfirmation() == 0) {
      return;
    }
  }
  dialog.showOpenDialog(win, {
    defaultPath: "G:\\",
    title: "open",
    properties: ['openFile'],
    filters: [
      { name: 'projekt', extensions: ['sim51'] },
    ],
  }).then(result => {
    if (!result.canceled) {
      filePath = result.filePaths[0];
      notEmty = false;
      saveFile = function (data) {
        fs.writeFile(filePath, data, function (err) {
        });
      };
      autoSave = function (data) {
        fs.writeFile(filePath, data, function (err) {
        });
      };
      notEmty = false;
      fs.readFile(result.filePaths[0], 'utf8', function (err, data) {
        win.webContents.send('open_event', JSON.parse(data));
      });
    }
  }).catch(err => {
    console.log(err);
  })
}

/*ipcMain.handle("Close", (sender, s, data) => {
  if (notEmty) {
    if (closeFileConfirmation()) { return };
  }
  win.destroy();
});*/

function createWindow(url) {
  //Create Menu
  createMenu();
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      defaultFontFamily: "Consolas"
    }
  });

  // maximize window
  win.maximize();
  win.show();
  // and load the index.html of the app.
  win.loadFile(url);
  //Open DevTools
  win.webContents.openDevTools();

  win.on("close", e => {
    e.preventDefault();
    if (notEmty) {
      dialog.showMessageBox(win, opts).then(result => {
        console.log(result.response);
        switch (result.response) {
          case 1:   //YES
            win.webContents.send('save_event');
            win.destroy();
            return false;
          case 2:   //NO
            win.destroy();
            return false;
          case 0:   //Cancel
            break;
        }
      });
    }
    else {
      win.webContents.send('save_event');
      win.destroy();
    }

  })
}

function newFile() {
  win.webContents.send('open_event', {
    "Code": '',
    "Periphery": []
  });
  saveFile = function (data) {
    dialog.showSaveDialog(win, {
      defaultPath: 'G:\\projekt.sim51',
      title: 'Save object',
      filters: [
        { name: 'projekt', extensions: ['sim51'] }
      ]
    }).then(result => {
      if (!result.canceled) {
        console.log(result.filePath);
        filePath = result.filePath
        fs.writeFile(result.Path, data, function (err) {
        });
        saveFile = function ( data) {
          fs.writeFile(filePath, data, function (err) {
          });
        };
        autoSave = function (data) {
          fs.writeFile(filePath, data, function (err) {
          });
        };
        notEmty = false;
      }
    }).catch(err => {
      console.log(err);
    })
  }
  autoSave = function (data) {
    let d = JSON.parse(data);
    notEmty = d.Code.replace(/\s+/g, '') != '' || d.Periphery == [];
  };
  filePath = null;
  notEmty = false;
}

function createMenu() {
  var menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          click: function () {
            if (notEmty) {
              dialog.showMessageBox(win, opts).then(result => {
                console.log(result.response);
                switch (result.response) {
                  case 1:   //YES
                    win.webContents.send('save_event');
                    newFile();
                    return false;
                  case 2:   //NO
                    newFile();
                    return false;
                  case 0:   //Cancel
                    break;
                }
              });
            } else { newFile(); }
          }
        },
        {
          label: 'Open File...',
          accelerator: 'CommandOrControl+O',
          click: function () {
            if (notEmty) {
              dialog.showMessageBox(win, opts).then(result => {
                console.log(result.response);
                switch (result.response) {
                  case 1:   //YES
                    win.webContents.send('save_event');
                    openFile();
                    return false;
                  case 2:   //NO
                    openFile();
                    return false;
                  case 0:   //Cancel
                    break;
                }
              });
            } else { openFile(); }
          }
        },
        {
          label: 'Save',
          accelerator: 'CommandOrControl+S',
          click: () => win.webContents.send('save_event')
        },
        {
          label: 'Save As...',
          click: function () { win.webContents.executeJavaScript('doEditorTextSave();'); }
        }]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          role: "undo"
          //click: function(){win.webContents.executeJavaScript('console.log("undo");');}
        },
        {
          label: 'Redo',
          role: 'redo'
          //click: function(){win.webContents.executeJavaScript('console.log("redo");');}
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          role: 'cut',
          accelerator: 'CommandOrControl+X'
        },
        {
          label: 'Copy',
          role: 'copy',
          accelerator: 'CommandOrControl+C'
        },
        {
          label: 'Paste',
          role: 'paste',
          accelerator: 'CommandOrControl+P'
        },
        {
          label: 'Select All',
          //role: 'selectAll'
          accelerator: 'CommandOrControl+A',
          click: function () { win.webContents.executeJavaScript('doEditorSelectAll();'); }
        }]
    },
    {
      label: 'Format',
      submenu: [
        {
          label: 'Themes',
          submenu: [
            {
              label: 'Defualt',
              type: 'radio',
              click: function () {
                win.webContents.executeJavaScript("changeEditorTheme('default');");
              }
            },
            {
              label: 'Monokai',
              type: 'radio',
              click: function () {
                win.webContents.executeJavaScript("changeEditorTheme('monokai');");
              }
            },
            {
              label: 'Dracula',
              type: 'radio',
              click: function () {
                win.webContents.executeJavaScript("changeEditorTheme('dracula');");
              }
            },
            {
              label: 'Darcula',
              type: 'radio',
              click: function () {
                win.webContents.executeJavaScript("changeEditorTheme('darcula');");
              }
            },
            {
              label: 'Gruvbox Dark',
              type: 'radio',
              click: function () {
                win.webContents.executeJavaScript("changeEditorTheme('gruvbox-dark');");
              }
            },
            {
              label: 'XQ-Light',
              type: 'radio',
              click: function () {
                win.webContents.executeJavaScript("changeEditorTheme('xq-light');");
              }
            }]
        },
        {
          label: 'Fonts',
          click: function () {

            child = new BrowserWindow({
              parent: win,
              modal: true,
              width: 200, height: 150,
              resizable: false,
              frame: true,
              title: 'Fonts',
              autoHideMenuBar: true,
              webPreferences: {
                enableRemoteModule: true,
                nodeIntegration: true
              }
            });

            child.show();
            child.loadFile('fonts/font-dialog.html');
            //child.webContents.openDevTools();

          }
        }]
    }]);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow('index.html');
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow('index.html');
  }
});

// In this file you can include the rest of your app's specific main process

ipcMain.on('sendNewFont', (event, args) => {
  let size = args[0];
  let family = args[1];
  //console.log("Size: " + size + ", Family: " + family);
  child.close();
  /* win.webContents.executeJavaScript("console.log(" + size + ");");
  win.webContents.executeJavaScript("console.log('" + family + "');"); */
  win.webContents.executeJavaScript("changeEditorFontSize(" + size + ")");
  win.webContents.executeJavaScript("changeEditorFontFamily('" + family + "')");
});

function closeFileConfirmation() {

  dialog.showMessageBox(win, opts).then(result => {
    console.log(result.response);
    switch (result.response) {
      case 1:   //YES
        win.webContents.send('save_event');
        return false;
      case 2:   //NO
        return false;
      case 0:   //Cancel
        return true
    }
  });
}