import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {EventsChannelService} from "../../services/EventsChannel/events-channel.service";
import {Subscription} from "rxjs";
import {TrackingStream} from "../../../tracking/types";
import {assertUnreachable} from "../../utilities";

interface Streams {
  [streamId: string]: TrackingStream;
}

@Component({
  selector: "app-stream-details",
  templateUrl: "./stream-details.component.html",
  styleUrls: ["./stream-details.component.scss"],
  providers: [EventsChannelService],
})
export class StreamDetailsComponent implements OnInit, OnDestroy {
  public streams: Streams = {};

  private _ip: string;
  private _subscriptions = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, private eventsChannel: EventsChannelService) {
    this._subscriptions.add(
      this.activatedRoute.paramMap.subscribe((parameters) => {
        this._ip = parameters.get("ip");
      })
    );
  }

  ngOnInit(): void {
    this.eventsChannel.joinForIP(this._ip);
    this._subscriptions.add(
      this.eventsChannel.incomingEvents.subscribe((event) => {
        switch (event.type) {
          case "Connected": {
            break;
          }

          case "InitialStreams": {
            event.streams.forEach((stream) => {
              this.streams[stream.id] = stream;
            });

            break;
          }

          case "EventReceived": {
            const streamId = event.event.stream_id;
            const previousEvents = this.streams[streamId].events;
            const newEvents = [...previousEvents, event.event];
            this.streams[streamId] = {...this.streams[streamId], events: newEvents};

            break;
          }

          default:
            assertUnreachable(event);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this.eventsChannel.disconnect();
  }
}
