import * as is from "electron-is"
import { Menu, Tray } from "electron"

const { controls, settings, instances } = global.electron

const click = (key: "launch" | "paused") => settings.app.set(key, !settings.app.get(key))

const menu = () => {
  const { launch, paused } = settings.app.get()

  instances.menu = Menu.buildFromTemplate([
    { label: "Pause", type: "checkbox", checked: paused, click: click.bind(this, "paused"), visible: is.linux() },
    { label: "Auto start", type: "checkbox", checked: launch, click: click.bind(this, "launch"), visible: !is.dev() },
    { label: "Show", click: controls.show },
    { label: "Exit", click: controls.exit }
  ])

  return instances.menu
}

export const create = () => {
  const { icon, title } = settings.app.get()
  const tray = new Tray(icon)

  tray.setToolTip(title)
  tray.setContextMenu(menu())
  tray.on("click", () => click("paused")).on("double-click", () => {
    instances.window && instances.window.isVisible() ? controls.hide() : controls.show()
  })

  return tray
}
