import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Ng2PaginationModule} from "ng2-pagination";
import {ActRecordListComponent} from "./act-record-list.component";
import {ActRecordRoutingModule} from "./act-record-routing.module";
import {HeaderModule} from "../shared/header/header.module";
import {ActRecordStatusPipe} from "../shared/pipes/act-record-status.pipe";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2PaginationModule,
    ActRecordRoutingModule,
    HeaderModule
  ],
  declarations: [ActRecordListComponent, ActRecordStatusPipe]
})
export class ActRecordModule { }
