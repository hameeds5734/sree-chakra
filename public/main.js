const { app, BrowserWindow } = require('electron')
const path = require('path');
const url = require('url');
require('@electron/remote/main').initialize()

function createWindow() {
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:',
        slashes: true,
    });
    const win = new BrowserWindow({
        minWidth:1000,
        minHeight:700,
        webPreferences: {
            enableRemoteModule: true
        },
        title:'SREE CHAKRA SEWING'
    })

    win.setMenu(null);
    win.loadURL(startUrl)
}
app.on('ready', createWindow)
 
app.on('window-all-closed', function() {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', function () {
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
})