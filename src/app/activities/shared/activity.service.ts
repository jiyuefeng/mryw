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

  private url = environment.serverUrl + 'sh/activities';

  constructor(private http: Http) {
    super();
  }

  getActivities(keyword: string, pageNum:number, pageSize:number): Observable<any> {
    let url = `${this.url}?keyword=${keyword}&pageNum=${pageNum}&pageSize=${pageSize}`;
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(this.extractData).catch(this.handleError);
  }

  getActivity(activityId: number): Observable<ActivityModel> {
    let url = `${this.url}/${activityId}`;
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(this.extractData).catch(this.handleError);
  }


  createActivity(activity: ActivityModel): Observable<ActivityModel> {
    let body = JSON.stringify(activity);
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.url, body, options)
      .map(this.extractData).map(data => {
        let activity = new ActivityModel();
        activity.id = data.id;

        activity.createTime = new Date().getTime();
        return activity;
      })
      .catch(this.handleError);
  }

  updateActivity(activity: ActivityModel): Observable<any> {
    let url = `${this.url}/${activity.id}`;
    let body = JSON.stringify(activity);
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.put(url, body, options)
      .map(this.extractData).catch(this.handleError);
  }

  deleteActivity(activityId: number): Observable<any> {
    let url = `${this.url}/${activityId}`;
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.delete(url, options).map(this.extractData).catch(this.handleError);
  }

  updateActivityStatus(activityId: number, status: string): Observable<any> {
    let url = `${this.url}/${activityId}/status`;
    let body = {"status": status};
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.put(url, body, options).map(this.extractData).catch(this.handleError);
  }

}
