process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
var { fs } = require('fs');

var win;
var child;

var saveFunction = function(){};
let path = null;

function createWindow(url) {
  //Create Menu
  createMenu();
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    webPreferences: {
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
}

function createMenu() {
  var menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          click: function () {
            closeFileConfirmation();
          }
        },
        {
          label: 'Open File...',
          click: function () {
            if(path != null){
              if(closeFileConfirmation()==0){return;}
            }
            dialog.showOpenDialog(win, {
              properties: ['openFile']
            }).then(result => {
              if (!result.canceled) {
                
                
              }
            }).catch(err => {
              console.log(err)
            })
          }
        },
        {
          label: 'Save',
          accelerator: 'CommandOrControl+S',
          click: function(){
            win.webContents.executeJavaScript(`saveFunction();`)
          }
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
  saveFunction = function () {
    dialog.showSaveDialog(win, {
      properties: ['saveFile']
    }).then(result => {
      if (!result.canceled) {
        let s = {
          "Code": getEditorText(),
          "Periphery": grid.getPeripheryJson()
        };
        if (path != null) {

        }
      }
    }).catch(err => {
      console.log(err)
    })
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    //saveConfig();
    //saveFunction();
    app.quit()
  }
});

function saveConfig() {
  fs.writeFile("G:\\MCSim_config_file.json", j.toString(), (err) => { });
  win.webContents.executeJavaScript(`getSettings(${fs});`);
}

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
  const opts = {
    type: 'question',
    buttons: ['Cancel', 'Yes', 'No'],
    defaultId: 1,
    cancelId: 0,
    title: 'Question',
    message: 'Do you want to save the current program?'
  }

  dialog.showMessageBox(win, opts).then(result => {
    console.log(result.response);
    switch (result.response) {
      case 1:   //YES
        win.webContents.executeJavaScript('doEditorTextSave();');
        win.webContents.executeJavaScript('clearEditorText();');
        return 1;
      case 2:   //NO
        win.webContents.executeJavaScript('clearEditorText();');
        return 2;
      case 0:   //Cancel
        return 0
    }
  });
}