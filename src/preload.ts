import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  getVideoList: async () => {
    return ipcRenderer.invoke("get-video-list");
  },
});
