import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {environment} from "../../../environments/environment";
import {BaseService} from "../../shared/services/base.service";
import {ActivityModel} from "../../activities/shared/activity.model";

@Injectable()
export class ActRecordService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  getActRecords(activity: ActivityModel, keyword: string, status: string, pageNum:number, pageSize:number): Observable<any> {
    let url = this.getUrl(activity) + `?keyword=${keyword}&status=${status}&pageNum=${pageNum}&pageSize=${pageSize}`;
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(this.extractData).catch(this.handleError);
  }

  getActRecordsInfo(activity: ActivityModel): Observable<any> {
    let url = this.getUrl(activity) + `/info`;
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(this.extractData).catch(this.handleError);
  }

  updateActRecordStatus(activity: ActivityModel, actRecordId: number, status: string): Observable<any> {
    let url = this.getUrl(activity) + `/${actRecordId}/status`;
    let body = {"status": status};
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.put(url, body, options).map(this.extractData).catch(this.handleError);
  }

  getExcelUrl(activity: ActivityModel): Observable<any> {
    let url = this.getUrl(activity) + `/excel`;
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(this.extractData).catch(this.handleError);
  }

  getUrl(activity: ActivityModel) {
    return environment.serverUrl + `${activity.cityCode}/activities/${activity.id}/records`;
  }

}
