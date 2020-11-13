import {TrackingStream} from "../../../tracking/types";
import {Action, createReducer, on} from "@ngrx/store";
import {connected, initialStreams, newEvent} from "./events-channel.actions";

export interface StreamsState {
  [ip: string]: StreamMap;
}

export interface StreamMap {
  [streamId: string]: TrackingStream;
}

export const initialState: StreamsState = {};

const _eventsChannelReducer = createReducer(
  initialState,
  on(
    connected,
    (state: StreamsState): StreamsState => {
      return state;
    }
  ),
  on(
    initialStreams,
    (state: StreamsState, {streams}): StreamsState => {
      console.log(streams);

      return streams.reduce<StreamsState>((s, stream) => {
        console.log("processing:", stream.ip, stream, s);
        const previousStreams = s[stream.ip];
        console.log("previousStreams", previousStreams);

        return {...s, [stream.ip]: {...s[stream.ip], [stream.id]: stream}};
      }, {} as StreamsState);
    }
  ),
  on(
    newEvent,
    (state: StreamsState, {ip, event}): StreamsState => {
      const streamId = event.stream_id;
      const oldStreams = state[ip];
      const oldEvents = oldStreams[streamId].events;
      const newStream = {...oldStreams[streamId], events: [...oldEvents, event]};
      console.log("event:", ip, event);

      return {...state, [ip]: {...oldStreams, [streamId]: newStream}};
    }
  )
);

export const eventsChannelReducer = (state: StreamsState, action: Action): StreamsState => {
  return _eventsChannelReducer(state, action);
};
