import { app, BrowserWindow } from "electron";

let win: BrowserWindow;
let videoWin: BrowserWindow;
const SIZE = { width: 1920, height: 1080}

const syncWindowPisitions = (x: number, y: number) => {
  if (win) {
    win.setPosition(x, y);
    win.moveTop();
  }
  if (videoWin) {
    videoWin.setPosition(x, y);
  }
};

app.whenReady().then(() => {
  win = new BrowserWindow({
    ...SIZE,
    // frame: false,
    // titleBarStyle: "hidden",
    autoHideMenuBar: true,
    opacity: 0.8,
  });
  win.loadURL("http://localhost:5000/kosendj");
  win.addListener("resize", () => {
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
  });
  videoWin.loadURL("http://localhost:5000/video");
  videoWin.addListener("resize", () => {
    videoWin.reload();
  });
  videoWin.addListener("move", () => {
    const p = videoWin.getPosition();
    syncWindowPisitions(p[0], p[1]);
  });
  win.moveTop();
});
