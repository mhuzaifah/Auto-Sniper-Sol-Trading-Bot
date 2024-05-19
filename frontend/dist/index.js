"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class Main {
    constructor() {
        this.mainWindow = null;
        this.createWindow = () => {
            this.mainWindow = new electron_1.BrowserWindow({
                width: 800,
                height: 600,
                webPreferences: {
                    nodeIntegration: true
                }
            });
            this.mainWindow.loadFile('index.html');
            this.mainWindow.on('closed', () => {
                this.mainWindow = null;
            });
        };
        this.onWindowAllClosed = () => {
            if (process.platform !== 'darwin') {
                electron_1.app.quit();
            }
        };
    }
    init() {
        electron_1.app.on('ready', this.createWindow);
        electron_1.app.on('window-all-closed', this.onWindowAllClosed);
    }
}
const main = new Main();
main.init();
