import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConfigurationService} from "./services/Configuration/configuration.service";
import {StreamDetailsComponent} from "./components/stream-details/stream-details.component";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {eventsChannelReducer, StreamsState} from "./services/EventsChannel/events-channel.reducer";
import {EventsChannelService} from "./services/EventsChannel/events-channel.service";
import {ObjectAccessPipe} from "./pipes/object-access.pipe";

export interface State {
  streams: StreamsState;
}

@NgModule({
  declarations: [AppComponent, StreamDetailsComponent, ObjectAccessPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot<State>({streams: eventsChannelReducer}, {}),
    EffectsModule.forRoot([]),
  ],
  providers: [ConfigurationService, EventsChannelService],
  bootstrap: [AppComponent],
})
export class AppModule {}
