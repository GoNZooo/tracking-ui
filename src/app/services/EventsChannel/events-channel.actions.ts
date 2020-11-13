import {createAction, props} from "@ngrx/store";
import {TrackingEvent, TrackingStream} from "../../../tracking/types";

export enum EventsChannelActions {
  connected = "[EventsChannel] Connected",
  initialStreams = "[EventsChannel] InitialStreams",
  new = "[EventsChannel] NewEvent",
}

export const connected = createAction(EventsChannelActions.connected);

export const initialStreams = createAction(
  EventsChannelActions.initialStreams,
  props<{streams: TrackingStream[]}>()
);

export const newEvent = createAction(
  EventsChannelActions.new,
  props<{ip: string; event: TrackingEvent}>()
);
