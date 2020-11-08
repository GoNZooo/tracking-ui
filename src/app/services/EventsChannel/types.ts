import * as t from "io-ts";

export const Ping = t.type({type: t.literal("Ping")}, "Ping");

export type Ping = t.TypeOf<typeof Ping>;

export const Connected = t.type({type: t.literal("Connected")}, "Connected");

export type Connected = t.TypeOf<typeof Connected>;

export const IncomingEventsChannelEvent = t.union([Ping, Connected]);

export type IncomingEventsChannelEvent = t.TypeOf<typeof IncomingEventsChannelEvent>;
