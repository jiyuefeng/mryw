import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {CityListComponent} from "./city-list.component";
import {AuthGuard} from "../shared/services/auth/auth.guard.service";

const routes: Routes = [
  {path: '', component: CityListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule {
}
