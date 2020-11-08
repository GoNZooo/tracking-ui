import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ConfigurationService {
  public baseUrl = "";
  public websocketBaseUrl = "";

  constructor() {}

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  setWebsocketBaseUrl(url: string): void {
    this.websocketBaseUrl = url;
  }
}
