const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("fileManager", {
    //saveConfig: (s) => ipcRenderer.invoke("saveSettings",s),
    saveFile: (data) => ipcRenderer.invoke("Save",data),
    autosaveFile: (data) => ipcRenderer.invoke("autoSave",data),
    //checkConfig: () => ipcRenderer.invoke("configCheck"),

    //closeApp: (s,data) => ipcRenderer.invoke("Close",s,data)
})

contextBridge.exposeInMainWorld("events", {
    onSave: (callback) => ipcRenderer.on('save_event', (_event) => callback()),
    onOpen: (callback) => ipcRenderer.on('open_event', (_event, data) => callback(data)),
    //onSaveConfig: (callback) => ipcRenderer.on('saveConfig_event', (_event) => callback()),
    //onClose: (callback) => ipcRenderer.on('close_event', (_event) => callback()),
    //onConfigCheck: (callback) => ipcRenderer.on('config_event', (_event,config) => callback(config)),
})

