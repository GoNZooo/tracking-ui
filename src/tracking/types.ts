import * as t from "io-ts";

export const ExtraAnchorData = t.type({});
export type ExtraAnchorData = t.TypeOf<typeof ExtraAnchorData>;

export const ExtraHeadingData = t.type({});
export type ExtraHeadingData = t.TypeOf<typeof ExtraHeadingData>;

export const ExtraImageData = t.type({});
export type ExtraImageData = t.TypeOf<typeof ExtraImageData>;

export const ExtraData = t.union([ExtraAnchorData, ExtraHeadingData, ExtraImageData]);
export type ExtraData = t.TypeOf<typeof ExtraData>;

export const Parameters = t.type({url: t.string, elementSelector: t.string, extras: ExtraData});
export type Parameters = t.TypeOf<typeof Parameters>;

export const MouseOver = t.type({
  stream_id: t.string,
  name: t.literal("mouseover"),
  parameters: Parameters,
});
export type MouseOver = t.TypeOf<typeof MouseOver>;

export const Load = t.type({stream_id: t.string, name: t.literal("load"), parameters: Parameters});
export type Load = t.TypeOf<typeof Load>;

export const Click = t.type({
  stream_id: t.string,
  name: t.literal("click"),
  parameters: Parameters,
});
export type Click = t.TypeOf<typeof Click>;

export const TrackingEvent = t.union([MouseOver, Click, Load]);
export type TrackingEvent = t.TypeOf<typeof TrackingEvent>;

export const TrackingStream = t.type({
  id: t.string,
  ip: t.string,
  events: t.array(TrackingEvent),
  inserted_at: t.string,
  updated_at: t.string,
});
export type TrackingStream = t.TypeOf<typeof TrackingStream>;
