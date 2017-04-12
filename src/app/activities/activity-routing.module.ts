import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ActivityListComponent} from "./activity-list.component";
import {AuthGuard} from "../shared/services/auth/auth.guard.service";


const routes: Routes = [
    {path: '', component: ActivityListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
