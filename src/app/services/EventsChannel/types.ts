import * as t from "io-ts";
import {TrackingStream} from "../../../tracking/types";

export const Ping = t.type({type: t.literal("Ping")}, "Ping");

export type Ping = t.TypeOf<typeof Ping>;

export const Connected = t.type({type: t.literal("Connected")}, "Connected");

export type Connected = t.TypeOf<typeof Connected>;

export const InitialStreams = t.type({
  type: t.literal("InitialStreams"),
  streams: t.array(TrackingStream),
});

export type InitialStreams = t.TypeOf<typeof InitialStreams>;

export const IncomingEventsChannelEvent = t.union([Ping, Connected, InitialStreams]);

export type IncomingEventsChannelEvent = t.TypeOf<typeof IncomingEventsChannelEvent>;
