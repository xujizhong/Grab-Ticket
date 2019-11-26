const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');

const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 300,
        height: 800,
        x:0,
        y:0,
        center:true,
        alwaysOnTop:true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true //可以在页面中使用node
        }
    });

    mainWindow.loadFile('index.html');

    // mainWindow.loadURL('https://www.damai.cn')

    // let view = new BrowserView()
    // mainWindow.setBrowserView(view)
    // view.setBounds({ x: xOffset, y: yOffset, width: windowWidth - xOffset, height: windowHeight - yOffset })
    // view.setAutoResize({ width: true, height: true })

    // // view.webContents.loadFile('index.html');
    // view.webContents.loadURL('https://www.damai.cn')

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

// ipcMain.on('grabMainProcess', (event, param) => {
//     console.log(mainWindow.WebContents, 222)
//     event.reply('getCookie-reply', 111)
// });
