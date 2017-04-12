import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [
    {path: '', redirectTo: 'activities', pathMatch: 'full'},
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: 'activities', loadChildren: './activities/activity.module#ActivityModule' },
    { path: 'activities/:id/records', loadChildren: './act-records/act-record.module#ActRecordModule'},
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
