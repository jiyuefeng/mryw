import {BrowserModule} from "@angular/platform-browser";
import {NgModule, ErrorHandler} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ToastyModule} from "ng2-toasty";
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./shared/services/auth/auth.guard.service";
import {AuthService} from "./shared/services/auth/auth.service";
import {UploadService} from "./shared/services/upload.service";
import {MyErrorHandler} from "./shared/error/error-handler";
import {ToastService} from "./shared/services/toast.service";
import {LoginModule} from "./login/login.module";
import {NotFoundModule} from "./not-found/not-found.module";
import {ActivityModule} from "./activities/activity.module";
import {ActRecordModule} from "./act-records/act-record.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SlimLoadingBarModule.forRoot(),
    ToastyModule.forRoot(),

    AppRoutingModule,

    LoginModule,
    NotFoundModule,
    ActivityModule,
    ActRecordModule
  ],
  providers: [
    ToastService,
    AuthGuard,
    AuthService,
    UploadService,
    {provide: ErrorHandler, useClass: MyErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

