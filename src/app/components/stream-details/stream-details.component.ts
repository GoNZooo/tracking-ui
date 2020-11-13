import {Component} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {StreamsState} from "../../services/EventsChannel/events-channel.reducer";
import {Store} from "@ngrx/store";
import {EventsChannelService} from "../../services/EventsChannel/events-channel.service";
import {State} from "../../app.module";
import {TrackingEvent, TrackingStream} from "../../../tracking/types";

@Component({
  selector: "app-stream-details",
  templateUrl: "./stream-details.component.html",
  styleUrls: ["./stream-details.component.scss"],
  providers: [],
})
export class StreamDetailsComponent {
  ips: Observable<string[]>;
  ipEntries: Observable<IpEntry[]>;
  events: Observable<TrackingEvent[]>;

  private _streams: Observable<StreamsState>;

  constructor(eventsChannel: EventsChannelService, store: Store<State>) {
    this._streams = store.select((state) => state.streams);

    this.ips = this._streams.pipe(map((s) => Object.keys(s)));

    this.ipEntries = this._streams.pipe(
      map((s) =>
        Object.keys(s).map((ip) => {
          const streams = Object.keys(s[ip]).map((streamId) => s[ip][streamId]);

          return {ip, streams};
        })
      )
    );

    this.events = this.ipEntries.pipe(
      map((ipEntries) => {
        return ipEntries.reduce<TrackingEvent[]>((es, ipEntry) => {
          const events = ipEntry.streams.reduce<TrackingEvent[]>(
            (streamEvents, stream) => [...streamEvents, ...stream.events],
            []
          );

          return [...es, ...events];
        }, []);
      })
    );
  }
}

interface IpEntry {
  ip: string;
  streams: TrackingStream[];
}
