import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ActRecordListComponent} from "./act-record-list.component";
import {AuthGuard} from "../shared/services/auth/auth.guard.service";


const routes: Routes = [
  {path: '', component: ActRecordListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActRecordRoutingModule { }
