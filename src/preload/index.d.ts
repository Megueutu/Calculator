import { ElectronAPI } from '@electron-toolkit/preload'

interface Api {
  resizeWindow: (width: number, height: number) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
