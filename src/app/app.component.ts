import {Component} from "@angular/core";
import {ConfigurationService} from "./services/Configuration/configuration.service";
import {environment} from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "tracking-ui";

  constructor(configuration: ConfigurationService) {
    configuration.setBaseUrl(environment.baseUrl);
    configuration.setWebsocketBaseUrl(environment.websocketBaseUrl);
  }
}
