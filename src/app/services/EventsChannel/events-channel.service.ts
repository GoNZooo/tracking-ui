import {Injectable, OnDestroy} from "@angular/core";
import * as phoenix from "phoenix";
import {Subject, Subscription} from "rxjs";
import {IncomingEventsChannelEvent} from "./types";
import {ConfigurationService} from "../Configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class EventsChannelService implements OnDestroy {
  public incomingEvents = new Subject<IncomingEventsChannelEvent>();
  public outgoingEvents = new Subject<unknown>();

  private _socket: phoenix.Socket;
  private _channel: phoenix.Channel;
  private _subscriptions = new Subscription();

  constructor(private configuration: ConfigurationService) {}

  joinForIP(ip: string): void {
    this._socket = new phoenix.Socket(`${this.configuration.websocketBaseUrl}/socket`, {});
    this._socket.connect();
    this._channel = this._socket.channel(`events-ip:${ip}`, {});
    this._channel.on("event", (payload: unknown) => {
      if (IncomingEventsChannelEvent.is(payload)) {
        this.incomingEvents.next(payload);
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
