import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {BaseService} from "../base.service";
import {UserModel} from "./user.model";
import {environment} from "../../../../environments/environment";


@Injectable()
export class AuthService extends BaseService {
  // 登录后重定向的页面
  redirectUrl: string;

  private url = environment.serverUrl + '/session';

  constructor(private http: Http) {
    super();
  }

  login(username: string, password: string): Observable<UserModel> {
    let body = {username: username, password: password};
    let options = new RequestOptions({headers: this.getHeaders()});
    return this.http.post(this.url, body, options)
      .map(this.extractData).map(data => {
        this.setToken(data.token);
        this.setCurrentUser(data.userInfo);
        return data.userInfo;
      }).catch(this.handleError);
  }

  openIdLoginUrl(): Observable<string> {
    let options = new RequestOptions({headers: this.getHeaders()});

    return this.http.get(this.url + '/url', options)
      .map(this.extractData).map(data => {
        return "";
      }).catch(this.handleError);
  }

  openIdLogin(): Observable<UserModel> {
    let body = null;
    let options = new RequestOptions({headers: this.getHeaders()});

    return this.http.post(this.url + '/openid', body, options)
      .map(this.extractData).map(data => {
        this.setToken(data.authorization);
        this.setCurrentUser(data.user);
        return data.user;
      }).catch(this.handleError);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.removeToken();
    this.removeCurrentUser();
  }
}
