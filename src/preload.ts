import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  getVideoList: async () => {
    ipcRenderer.invoke("get-video-list");
  },
});
