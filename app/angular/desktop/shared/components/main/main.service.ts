import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs/Observable"

const REPEAT = 30

@Injectable()
export class MainService {
  private api = "https://skaties.lv/api/1/starfm"
  constructor(private http: HttpClient) {}

  song() {
    return Observable.timer(0, REPEAT * 1000)
      .mergeMap(() => this.http.post<SongResponse>(`${this.api}/song/`, {}))
      .repeat()
  }

  program() {
    return Observable.timer(0, REPEAT * 1000)
      .mergeMap(() => this.http.post<ProgramResponse>(`${this.api}/program/`, {}))
      .repeat()
  }
}
