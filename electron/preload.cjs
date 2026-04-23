const { contextBridge, ipcRenderer, webFrame } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (data) => ipcRenderer.invoke('channel-name', data),
  receiveData: (callback) => ipcRenderer.on('from_main', (_event, data) => callback(data)),
  sendToMain: (data) => ipcRenderer.send('from_renderer', data),
  onNavigate: (callback) => ipcRenderer.on('navigate', (_event, path) => callback(path)),
  sendtoProduct : (data) => ipcRenderer.send('to_product', data),
  zoomIn: () => webFrame.setZoomLevel(webFrame.getZoomLevel() + 0.5),
  zoomOut: () => webFrame.setZoomLevel(webFrame.getZoomLevel() - 0.5),
})
