global.electron = {
  instances: {},
  settings: {} as SettingsObjectImport,
  controls: {} as ControlsInterface
}

import { app } from "electron"
import * as is from "electron-is"

import * as Window from "./instances/window"
import { path } from "./helpers"

const exists = app.makeSingleInstance(Window.exists)
if (exists) {
  app.quit()
} else {
  if (is.dev()) {
    require("electron-reload")(__dirname, { electron: path("./node_modules/.bin/electron") })
  }

  app.on("ready", Window.create)

  app.on("window-all-closed", () => {
    if (!is.macOS()) {
      app.quit()
    }
  })

  app.on("activate", () => {
    if (!global.electron.instances.window) {
      Window.create()
    }
  })
}
