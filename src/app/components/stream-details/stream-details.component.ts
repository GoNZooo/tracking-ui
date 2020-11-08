import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {EventsChannelService} from "../../services/EventsChannel/events-channel.service";
import {Subscription} from "rxjs";

@Component({
  selector: "app-stream-details",
  templateUrl: "./stream-details.component.html",
  styleUrls: ["./stream-details.component.scss"],
  providers: [EventsChannelService],
})
export class StreamDetailsComponent implements OnInit, OnDestroy {
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
        console.log({event});
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this.eventsChannel.disconnect();
  }
}
