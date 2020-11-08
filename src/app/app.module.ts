import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConfigurationService} from "./services/Configuration/configuration.service";
import {StreamDetailsComponent} from "./components/stream-details/stream-details.component";

@NgModule({
  declarations: [AppComponent, StreamDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [ConfigurationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
