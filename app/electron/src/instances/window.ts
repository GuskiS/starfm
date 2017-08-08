import * as is from "electron-is"
import { BrowserWindow, Menu } from "electron"

import * as tray from "./tray"
import * as launcher from "./launcher"
import { index } from "./../helpers"

const { instances, settings, controls } = global.electron

export const create = () => {
  Object.assign(global.electron.settings, require("./../actions/settings"))
  Object.assign(global.electron.controls, require("./../actions/controls"))

  const { icon, title, previous: { x, y, hidden } } = settings.app.get()
  const window = new BrowserWindow({
    x,
    y,
    icon,
    title,
    width: 300,
    height: 300,
    frame: false,
    show: !hidden,
    resizable: false
  })

  instances.window = window
  instances.tray = tray.create()
  instances.launcher = launcher.init()
  settings.app.set("paused", false)

  window.loadURL(index())
  window.setMenu(new Menu())

  window
    .on("blur", () => settings.app.set("blurred", true))
    .on("focus", () => settings.app.set("blurred", false))
    .on("close", () => {
      const hidden = !window.isVisible()
      const { x, y } = window.getBounds()
      settings.app.set("previous", { x, y, hidden })
    })
    .on("closed", () => delete instances.window)

  if (is.dev()) {
    window.webContents.openDevTools()
  }
}

export const exists = () => {
  if (instances.window) {
    if (!instances.window.isVisible()) {
      controls.show()
    }
    controls.focus()
  }
}
