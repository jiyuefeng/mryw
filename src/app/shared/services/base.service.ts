import {Injectable} from "@angular/core";
import {Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import {UserModel} from "./auth/user.model";
import {ApiException} from "../error/api.exception";
import {environment} from "../../../environments/environment";


@Injectable()
export class BaseService {
    token:string;
    currentUser:UserModel;

    protected extractData(res:Response) {
        let body = res.json() || {};
        // 如果返回错误
        if (body && body.errorCode) {
            throw new ApiException(body.requestId, body.errorCode, body.errorMsg);
        }
        return body.responseParams;
    }

    protected handleError(error:any) {
      return Observable.throw(error);
    }

    getHeaders():Headers {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.set('key', environment.key);
        headers.set('api-version', environment.apiVersion);
        headers.set('authorization', this.getToken());
        return headers;
    }

    setToken(token:string): void {
        this.token = token;
        localStorage.setItem('mryw-token', this.token);
    }

    removeToken(): void {
        this.token = null;
        localStorage.removeItem('mryw-token');
    }

    getToken():string {
        return localStorage.getItem('mryw-token');
    }

    setCurrentUser(currentUser:UserModel): void {
        this.currentUser = currentUser;
        localStorage.setItem('mryw-currentUser', JSON.stringify(this.currentUser));
    }

    removeCurrentUser(): void {
        this.currentUser = null;
        localStorage.removeItem('mryw-currentUser');
    }

    getCurrentUser():UserModel {
        let tmp = localStorage.getItem('mryw-currentUser');
        return JSON.parse(tmp);
    }
}
