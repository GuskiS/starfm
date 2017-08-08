declare namespace NodeJS {
  export interface GlobalElectron {
    instances: {
      window?: Electron.BrowserWindow
      tray?: Electron.Tray
      launcher?: AutoLaunch
      menu?: Electron.Menu
    }
    settings: SettingsObjectImport
    controls: ControlsInterface
  }

  export interface Global {
    electron: GlobalElectron
  }
}

interface AppInterface {
  title: string
  icon: string
  launch: boolean
  blurred: boolean
  volume: number
  paused: boolean
  previous: { x?: number; y?: number; hidden?: boolean }
}

interface SettingsInterface {
  app: AppInterface
}

interface SettingsObjectImport {
  app: SettingsObject
}

interface SettingsObject {
  get(key?: KeyType): any
  set(key?: KeyType, value: any): any
  watch(cb: Function): any
  __path(key: KeyType): string
}

type KeyType = keyof AppInterface

interface ControlsInterface {
  exit(): void
  show(): void
  hide(): void
  focus(): void
  reload(): void
}
