import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ActivityRoutingModule} from "./activity-routing.module";
import {ActivityListComponent} from "./activity-list.component";
import {ActivityStatusPipe} from "../shared/pipes/activity-status.pipe";
import {Ng2PaginationModule} from "ng2-pagination";
import {HeaderModule} from "../shared/header/header.module";
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2PaginationModule,
    Ng2DatetimePickerModule,
    ActivityRoutingModule,
    HeaderModule
  ],
  declarations: [ActivityListComponent, ActivityStatusPipe]
})
export class ActivityModule { }
