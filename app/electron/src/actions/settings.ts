import * as is from "electron-is"
import * as settings from "electron-settings"
import { path } from "./../helpers"

const cache: { [key: string]: any } = {}
const DEFAULT: SettingsInterface = {
  app: {
    title: "Radio StarFM",
    icon: path("assets/icon.png"),
    launch: false,
    blurred: false,
    volume: 0.3,
    paused: false,
    previous: {}
  }
}

settings.set("app", { ...DEFAULT.app, ...settings.get("app") })

const fromCache = async (file: string) => {
  if (!cache[file]) {
    cache[file] = await import(file)
  }
  return cache[file]
}

const watch = async (newValues: AppInterface, oldValues: AppInterface) => {
  if (is.linux() && newValues.paused !== oldValues.paused) {
    const { tray, menu } = global.electron.instances
    if (tray && menu) {
      menu.items[0].checked = newValues.paused
      tray.setContextMenu(menu)
    }
  }

  if (newValues.launch !== oldValues.launch) {
    const launcher = await fromCache("./../instances/launcher")
    launcher.toggle(newValues.launch)
  }
}

const object = (storage: keyof SettingsInterface): SettingsObject => {
  settings.watch(storage, watch)

  return {
    get(key: KeyType) {
      if (key) {
        return settings.get(this.__path(key))
      } else {
        return settings.getAll()[storage]
      }
    },
    set(key: KeyType | undefined = undefined, value: any) {
      if (key) {
        const data = value || (<any>DEFAULT[storage])[key]
        settings.set(this.__path(key), data)
      } else {
        settings.set(storage, value)
      }

      return this.get()
    },
    watch(cb: Function) {
      return settings.watch(storage, cb)
    },
    __path(key: KeyType) {
      return `${storage}.${key}`
    }
  }
}

export const app = object("app")
