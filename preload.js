const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("fileManager", {
    saveFile: (data) => ipcRenderer.invoke("Save",data),
    autosaveFile: (data) => ipcRenderer.invoke("autoSave",data),
})

contextBridge.exposeInMainWorld("events", {
    onSave: (callback) => ipcRenderer.on('save_event', (_event) => callback()),
    onOpen: (callback) => ipcRenderer.on('open_event', (_event, data) => callback(data)),
})

