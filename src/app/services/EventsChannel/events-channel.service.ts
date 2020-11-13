import {Injectable, OnDestroy} from "@angular/core";
import * as Phoenix from "phoenix";
import {Subscription} from "rxjs";
import {IncomingEventsChannelEvent} from "./types";
import {ConfigurationService} from "../Configuration/configuration.service";
import {PathReporter} from "io-ts/PathReporter";
import {connected, initialStreams, newEvent} from "./events-channel.actions";
import {assertUnreachable} from "../../utilities";
import {Store} from "@ngrx/store";
import {StreamsState} from "./events-channel.reducer";

@Injectable({
  providedIn: "root",
})
export class EventsChannelService implements OnDestroy {
  private _socket: Phoenix.Socket;
  private _channel: Phoenix.Channel;
  private _subscriptions = new Subscription();

  constructor(private store: Store<StreamsState>, private configuration: ConfigurationService) {
    this.join();
  }

  join(): void {
    this._socket = new Phoenix.Socket(`${this.configuration.websocketBaseUrl}/socket`, {});
    this._socket.connect();
    this._channel = this._socket.channel(`events:all`, {});
    this._channel.on("event", (payload: unknown) => {
      if (IncomingEventsChannelEvent.is(payload)) {
        switch (payload.type) {
          case "Connected": {
            this.store.dispatch(connected());

            break;
          }

          case "InitialStreams": {
            this.store.dispatch(initialStreams(payload));

            break;
          }

          case "EventReceived": {
            this.store.dispatch(newEvent({ip: payload.ip, event: payload.event}));

            break;
          }

          default:
            assertUnreachable(payload);
        }
      } else {
        const validation = IncomingEventsChannelEvent.decode(payload);
        console.error(PathReporter.report(validation));
      }
    });
    this._channel.join();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this.disconnect();
  }

  disconnect(): void {
    this._socket.disconnect();
  }
}
