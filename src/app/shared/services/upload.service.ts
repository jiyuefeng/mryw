import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import "rxjs/add/operator/share";
import {environment} from "../../../environments/environment";
import {BaseService} from "./base.service";
import {Http, RequestOptions} from "@angular/http";

@Injectable()
export class UploadService extends BaseService{
    private url: string = environment.serverUrl + '/uploads';

  constructor(private http: Http) {
    super();
  }

  uploadPicture(picText: string): Observable<string> {
    let url = `${this.url}/picture`;
    let body = {'picText': picText};
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map(this.extractData).map(data => {
        return data.url;
      })
      .catch(this.handleError);
  }
}
