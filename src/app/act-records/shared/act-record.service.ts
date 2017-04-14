import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {environment} from "../../../environments/environment";
import {BaseService} from "../../shared/services/base.service";

@Injectable()
export class ActRecordService extends BaseService {

  private url = environment.serverUrl + 'sh/activities';

  constructor(private http: Http) {
    super();
  }

  getActRecords(activityId: number, keyword: string, status: string, pageNum:number, pageSize:number): Observable<any> {
    let url = `${this.url}/${activityId}/records?keyword=${keyword}&status=${status}&pageNum=${pageNum}&pageSize=${pageSize}`;
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(this.extractData).catch(this.handleError);
  }

  getActRecordsInfo(activityId: number): Observable<any> {
    let url = `${this.url}/${activityId}/records/info`;
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(this.extractData).catch(this.handleError);
  }

  updateActRecordStatus(activityId: number, actRecordId: number, status: string): Observable<any> {
    let url = `${this.url}/${activityId}/records/${actRecordId}/status`;
    let body = {"status": status};
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.put(url, body, options).map(this.extractData).catch(this.handleError);
  }

}
