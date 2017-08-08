import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { HttpClientModule } from "@angular/common/http"

import { AppComponent } from "./app.component"
import { ALL_COMPONENTS, ALL_MODULES, ALL_SERVICES } from "./../shared"

import "./rxjs"

@NgModule({
  declarations: [AppComponent, ALL_COMPONENTS],
  imports: [BrowserModule, HttpClientModule, ALL_MODULES],
  providers: [ALL_SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule {}
