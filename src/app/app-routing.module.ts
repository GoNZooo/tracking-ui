import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {StreamDetailsComponent} from "./components/stream-details/stream-details.component";

const routes: Routes = [
  {path: "", redirectTo: "/streams/127.0.0.1", pathMatch: "full"},
  {path: "streams/:ip", component: StreamDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
