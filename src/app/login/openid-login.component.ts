import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute}      from '@angular/router';


import {LoginModel} from './shared';
import {AuthService} from "../shared/services/auth/auth.service";
import {ToastService} from "../shared/services/toast.service";
import {MyErrorHandler} from "../shared/error/error-handler";

@Component({
  template: ``
})
export class OpenIdLoginComponent implements OnInit {

  message: string;
  model: LoginModel = new LoginModel();

  openIdParams: any = {};

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              public router: Router,
              private errorHandler: MyErrorHandler,
              public toastService: ToastService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.openIdParams['openid.op_endpoint'] = params['openid.op_endpoint'];
      this.openIdParams['openid.sig'] = params['openid.sig'];
      this.openIdParams['openid.return_to'] = params['openid.return_to'];
      this.openIdParams['openid.ns'] = params['openid.ns'];
      this.openIdParams['openid.sreg.fullname'] = params['openid.sreg.fullname'];
      this.openIdParams['openid.response_nonce'] = params['openid.response_nonce'];
      this.openIdParams['openid.ax.mode'] = params['openid.ax.mode'];
      this.openIdParams['openid.claimed_id'] = params['openid.claimed_id'];
      this.openIdParams['openid.ns.sreg'] = params['openid.ns.sreg'];
      this.openIdParams['openid.sreg.nickname'] = params['openid.sreg.nickname'];
      this.openIdParams['openid.ns.ax'] = params['openid.ns.ax'];
      this.openIdParams['openid.signed'] = params['openid.signed'];
      this.openIdParams['openid.assoc_handle'] = params['openid.assoc_handle'];
      this.openIdParams['openid.mode'] = params['openid.mode'];
      this.openIdParams['openid.identity'] = params['openid.identity'];
      this.openIdParams['openid.sreg.email'] = params['openid.sreg.email'];
      this.authService.openIdLogin(this.openIdParams).subscribe(data => {
        if (this.authService.isLoggedIn()) {
          this.message = `登录成功，欢迎${data.username}`;
          this.toastService.triggerToast('提示', this.message, 'success');
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/cities';
          this.router.navigate([redirect]);
        }
      }, error =>  {
        this.router.navigate(['/login']);
        this.errorHandler.handleError(error);
      });
    });
  }

}
