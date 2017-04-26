import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LoginRoutingModule} from "./login-routing.module";
import {LoginComponent} from "./login.component";
import {OpenIdLoginComponent} from "./openid-login.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent, OpenIdLoginComponent]
})
export class LoginModule { }
