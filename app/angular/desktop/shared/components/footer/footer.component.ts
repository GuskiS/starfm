import { Component, ViewChild, ElementRef, OnInit } from "@angular/core"
import { ElectronService } from "./../../services"

@Component({
  selector: "[footer-component]",
  styleUrls: ["./footer.component.sass"],
  templateUrl: "./footer.component.html"
})
export class FooterComponent implements OnInit {
  settings: AppInterface
  @ViewChild("player") player: ElementRef

  constructor(public electron: ElectronService) {
    this.settings = this.electron.settings
    this.electron.observable.subscribe(settings => {
      if (settings.paused !== this.settings.paused) {
        this.pauseOrUnpause(settings.paused)
      }

      this.settings = settings
    })
  }

  ngOnInit(): void {
    const player = this.player.nativeElement
    const { volume, paused } = this.electron.settings

    player.autoplay = true
    player.volume = volume
    if (paused) {
      player.pause()
    }
  }

  click(): void {
    this.electron.app.set("paused", !this.settings.paused)
  }

  pauseOrUnpause(paused: boolean): void {
    const player = this.player.nativeElement

    if (paused) {
      player.pause()
    } else {
      player.load()
      player.play()
    }
  }

  volumeSlide({ value }: { value: number }): void {
    this.player.nativeElement.volume = value
  }

  volumeChange({ value }: { value: number }): void {
    this.electron.app.set("volume", value)
  }
}
