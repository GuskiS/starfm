import { Component, ViewEncapsulation, OnDestroy } from "@angular/core"
import { ElectronService } from "./../shared/services"

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.sass"],
  templateUrl: "./app.component.html",
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnDestroy {
  constructor(public electron: ElectronService) {}

  ngOnDestroy(): void {
    this.electron.clean()
  }
}
