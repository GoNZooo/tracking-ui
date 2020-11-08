import {TestBed} from "@angular/core/testing";

import {EventsChannelService} from "./events-channel.service";

describe("EventsChannelService", () => {
  let service: EventsChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsChannelService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
