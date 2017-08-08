import { Injectable, NgZone } from "@angular/core"
import { Observable } from "rxjs/Observable"
import { Subscriber } from "rxjs/Subscriber"

@Injectable()
export class ElectronService {
  electron = window.__electron
  settings: AppInterface = this.app.get()
  observable: Observable<AppInterface>
  watcher: { dispose: Function }

  constructor(private zone: NgZone) {
    this.observable = new Observable<AppInterface>(this.observer.bind(this)).share()
  }

  clean(): void {
    this.zone.runOutsideAngular(() => this.watcher.dispose())
  }

  get app() {
    return this.electron.settings.app
  }

  get controls() {
    return this.electron.controls
  }

  private observer(observer: Subscriber<AppInterface>): void {
    this.watcher = this.app.watch((result: AppInterface) => {
      this.zone.run(() => {
        this.settings = result
        observer.next(result)
      })
    })
  }
}
