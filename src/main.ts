import { app, BrowserWindow, ipcMain } from "electron";
import { debounce } from "mabiki";
import * as fs from "node:fs";
import * as path from "node:path";

let win: BrowserWindow;
let videoWin: BrowserWindow;
let monitorWin: BrowserWindow;
const SIZE = { width: 1920, height: 1080 };

app.commandLine.appendSwitch("disable-renderer-backgrounding");

const syncWindowPisitions = (x: number, y: number) => {
  debounce(() => {
    if (win) {
      win.setPosition(x, y);
      // win.moveTop();
    }
    if (videoWin) {
      videoWin.setPosition(x, y);
    }
  }, 1000);
};

app.whenReady().then(() => {
  win = new BrowserWindow({
    ...SIZE,
    // frame: false,
    // titleBarStyle: "hidden",
    autoHideMenuBar: true,
    opacity: 0.5,
    webPreferences: {
      // preload: "dist/preload.js"
    },
  });
  win.loadURL("http://localhost:5000/rolling");
  win.addListener("resize", () => {
    debounce(() => {
      win.reload();
    }, 500);
    win.reload();
  });
  win.addListener("move", () => {
    const p = win.getPosition();
    syncWindowPisitions(p[0], p[1]);
  });

  videoWin = new BrowserWindow({
    ...SIZE,
    // frame: false,
    // titleBarStyle: "hidden",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      // preload: "./dist/preload.js"
    },
  });
  videoWin.loadURL("http://localhost:5000/vfx");
  videoWin.addListener("resize", () => {
    debounce(() => {
      videoWin.reload();
    }, 500);
  });
  videoWin.addListener("move", () => {
    const p = videoWin.getPosition();
    syncWindowPisitions(p[0], p[1]);
  });
  // win.moveTop();

  monitorWin = new BrowserWindow({
    ...SIZE,
    title: "monitor",
    webPreferences: {
      devTools: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  monitorWin.loadURL("http://localhost:5000/monitor");
  // monitorWin.webContents.openDevTools();
});

ipcMain.handle("get-video-list", async () => {
  // const list = fs.readdirSync("assets");
  // console.log(list)
  console.warn("invoked");
  return JSON.stringify({ a: "b" });
});
