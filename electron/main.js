import { app, BrowserWindow, ipcMain, session, globalShortcut, Tray, dialog, Menu } from 'electron'
import { fileURLToPath } from 'url'
import path from 'path'
import windowStateKeeper from 'electron-window-state'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let win = null

const getIconPath = () => app.isPackaged
  ? path.join(process.resourcesPath, 'assets', 'hero.png')
  : path.join(__dirname, '../src/assets/hero.png')

let template = [
  { label: 'Files', submenu: [
    { label: 'New', accelerator: 'CmdOrCtrl+N' },
    { label: 'Open', accelerator: 'CmdOrCtrl+O' },
  ]},
  { label: 'Edit', submenu: [
    { label: 'Undo', accelerator: 'CmdOrCtrl+Z' },
    { label: 'Redo', accelerator: 'CmdOrCtrl+Shift+Z' },
  ]},
  { label: 'Views' },
  ...(process.platform === 'darwin' ? [{ label: 'Help' }] : [])
]

Menu.setApplicationMenu(Menu.buildFromTemplate(template))

const mnu = Menu.buildFromTemplate([
  { label: 'Dashboard', accelerator: 'CmdOrCtrl+D' },
  { label: 'Products', accelerator: 'CmdOrCtrl+P' },
  { role: 'reload', accelerator: 'CmdOrCtrl+R' },
  { role: 'toggledevtools', accelerator: 'CmdOrCtrl+Shift+I' },
  { label: 'Exit', role: 'quit' }
])

const createWindow = () => {
  let mainWindowState = windowStateKeeper({ defaultWidth: 1000, defaultHeight: 600 })

  win = new BrowserWindow({
    icon: getIconPath(),
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindowState.manage(win)
  win.webContents.on('context-menu', () => mnu.popup({ window: win }))

  app.isPackaged
    ? win.loadFile(path.join(__dirname, '../dist/index.html'))
    : win.loadURL('http://localhost:5173')

  globalShortcut.register('CommandOrControl+R', () => win.reload())
  globalShortcut.register('CommandOrControl+Shift+I', () => win.webContents.openDevTools())
  globalShortcut.register('CommandOrControl+O', () => win.webContents.send('navigate', '/orders'))
  globalShortcut.register('CommandOrControl+P', () => win.webContents.send('navigate', '/products'))
  globalShortcut.register('CommandOrControl+I', () => win.webContents.send('navigate', '/reports'))
  globalShortcut.register('CommandOrControl+D', () => win.webContents.send('navigate', '/'))
  globalShortcut.register('CommandOrControl+M', () => win.minimize())
  globalShortcut.register('CommandOrControl+Shift+M', () => win.isMaximized() ? win.restore() : win.maximize())

  globalShortcut.register('CommandOrControl+Q', () => {
    dialog.showOpenDialog(win, { defaultPath: app.getPath('desktop'), properties: ['openDirectory'] })
  })

  globalShortcut.register('CommandOrControl+W', () => {
    dialog.showMessageBox(win, {
      type: 'question', buttons: ['Yes', 'No'], message: 'Are you sure?'
    }).then(result => { if (result.response === 0) console.log('User clicked Yes') })
  })
}

app.on('ready', () => {
  if (!app.isPackaged) {
    // dev mode - no CSP
  } else {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': ["default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"]
        }
      })
    })
  }

  createWindow()

  console.warn(process.versions)

  const tray = new Tray(getIconPath())
  tray.setToolTip('Inventory Management System')
  tray.on('click', () => {
    win.isVisible() ? win.hide() : (win.show(), win.focus())
  })

  ipcMain.handle('channel-name', (event, data) => {
    console.log('React se aaya:', data)
    return `Main.js ne receive kiya: ${data.data}`
  })

  ipcMain.on('from_renderer', (event, data) => {
    console.log('Received from Orders:', data)
    event.reply('from_main', `Main received: ${data}`)
  })

  ipcMain.on('to_product', (event, data) => {
    console.log('Received from Products:', data)
    event.reply('from_main', `Main received from Products: ${data}`)
  })
})
