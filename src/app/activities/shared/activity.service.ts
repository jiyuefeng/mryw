import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {BaseService} from "../../shared";
import {ActivityModel} from "./";
import {environment} from "../../../environments/environment";

@Injectable()
export class ActivityService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  getActivities(cityCode: string, keyword: string, status: string,pageNum:number, pageSize:number): Observable<any> {
    let url = this.getUrl(cityCode) + `?keyword=${keyword}&status=${status}&pageNum=${pageNum}&pageSize=${pageSize}`;
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(this.extractData).catch(this.handleError);
  }

  getActivity(cityCode: string, activityId: number): Observable<ActivityModel> {
    let url = this.getUrl(cityCode) + `/${activityId}`;
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(this.extractData).catch(this.handleError);
  }


  createActivity(activity: ActivityModel): Observable<ActivityModel> {
    let body = JSON.stringify(activity);
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.getUrl(activity.cityCode), body, options)
      .map(this.extractData).map(data => {
        activity.id = data.id;
        activity.createTime = new Date().getTime();
        return activity;
      })
      .catch(this.handleError);
  }

  updateActivity(activity: ActivityModel): Observable<any> {
    let url = this.getUrl(activity.cityCode) + `/${activity.id}`;
    let body = JSON.stringify(activity);
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.put(url, body, options)
      .map(this.extractData).catch(this.handleError);
  }

  deleteActivity(cityCode: string, activityId: number): Observable<any> {
    let url = this.getUrl(cityCode) + `/${activityId}`;
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.delete(url, options).map(this.extractData).catch(this.handleError);
  }

  updateActivityStatus(cityCode: string, activityId: number, status: string): Observable<any> {
    let url = this.getUrl(cityCode) + `/${activityId}/status`;
    let body = {"status": status};
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.put(url, body, options).map(this.extractData).catch(this.handleError);
  }

  getUrl(cityCode: string) {
    return `${environment.serverUrl}${cityCode}/activities`;
  }

}
