import { Component } from "@angular/core"
import { Observable } from "rxjs/Observable"
import { MainService } from "./main.service"

@Component({
  selector: "[main-component]",
  styleUrls: ["./main.component.sass"],
  templateUrl: "./main.component.html",
  providers: [MainService]
})
export class MainComponent {
  song$: Observable<SongResponse>
  program$: Observable<ProgramResponse>

  constructor(private service: MainService) {
    this.song$ = this.service.song()
    this.program$ = this.service.program()
  }
}
