import * as t from "io-ts";
import {TrackingEvent, TrackingStream} from "../../../tracking/types";

export const Connected = t.type({type: t.literal("Connected")}, "Connected");

export type Connected = t.TypeOf<typeof Connected>;

export const InitialStreams = t.type({
  type: t.literal("InitialStreams"),
  streams: t.array(TrackingStream),
});

export type InitialStreams = t.TypeOf<typeof InitialStreams>;

export const EventReceived = t.type({
  type: t.literal("EventReceived"),
  ip: t.string,
  event: TrackingEvent,
});

export type EventReceived = t.TypeOf<typeof EventReceived>;

export const IncomingEventsChannelEvent = t.union([Connected, InitialStreams, EventReceived]);

export type IncomingEventsChannelEvent = t.TypeOf<typeof IncomingEventsChannelEvent>;
