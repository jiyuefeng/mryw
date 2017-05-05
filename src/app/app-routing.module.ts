import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [
    {path: '', redirectTo: 'cities', pathMatch: 'full'},
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: 'cities', loadChildren: './cities/city.module#CityModule' },
    { path: 'cities/:cityCode/activities', loadChildren: './activities/activity.module#ActivityModule' },
    { path: 'cities/:cityCode/activities/:id/records', loadChildren: './act-records/act-record.module#ActRecordModule'},
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
