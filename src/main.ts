import { app, BrowserWindow } from "electron";
import { debounce } from "mabiki";

let win: BrowserWindow;
let videoWin: BrowserWindow;
let monitorWin: BrowserWindow;
const SIZE = { width: 1920, height: 1080 };

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

  monitorWin = new BrowserWindow();
  monitorWin.loadURL("http://localhost:5000/monitor");
});
