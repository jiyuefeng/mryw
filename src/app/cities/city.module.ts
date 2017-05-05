import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderModule} from "../shared/header/header.module";
import {CityRoutingModule} from "./city-routing.module";
import {CityListComponent} from "./city-list.component";

@NgModule({
  imports: [
    CommonModule,
    CityRoutingModule,
    HeaderModule
  ],
  declarations: [CityListComponent]
})
export class CityModule { }
