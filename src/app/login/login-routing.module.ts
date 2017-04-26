import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import {OpenIdLoginComponent} from "./openid-login.component";

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'openid', component: OpenIdLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
