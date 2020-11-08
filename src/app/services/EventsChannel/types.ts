import * as t from "io-ts";

export const InPing = t.type({type: t.literal("InPing")}, "InPing");

export type InPing = t.TypeOf<typeof InPing>;

export const Connected = t.type({type: t.literal("Connected")}, "Connected");

export type Connected = t.TypeOf<typeof Connected>;

export const IncomingEventsChannelEvent = t.union([InPing, Connected]);

export type IncomingEventsChannelEvent = t.TypeOf<typeof IncomingEventsChannelEvent>;
