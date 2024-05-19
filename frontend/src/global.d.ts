// src/global.d.ts

interface ElectronAPI {
    onCommandOutput: (callback: (output: string) => void) => void;
  }
  
  interface Window {
    electronAPI: ElectronAPI;
  }
  