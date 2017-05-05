import {Component, OnInit} from "@angular/core";
import {ActRecordService} from "./shared/act-record.service";
import {ActRecordModel} from "./shared/act-record.model";

import {ActivatedRoute} from "@angular/router";
import {ActivityService} from "../activities/shared/activity.service";
import {ActivityModel} from "../activities/shared/activity.model";
import {ToastService} from "../shared/services/toast.service";
import {MyErrorHandler} from "../shared/error/error-handler";


@Component({
    templateUrl: 'act-record-list.component.html',
    styleUrls: ['act-record-list.component.css'],
    providers: [ActivityService, ActRecordService]
})
export class ActRecordListComponent implements OnInit {

  message: string;

  pageNum: number = 1;
  pageSize: number = 10;

  info: any = {'JOIN':0, 'WIN': 0, 'CASH': 0};

  searchParams: any = {
    keyword: '',
    status: ''
  };

  total: number;

  activity: ActivityModel = new ActivityModel();
  actRecord: ActRecordModel = new ActRecordModel();
  actRecords: ActRecordModel[];

  loading: boolean;


  constructor(private route: ActivatedRoute,
              private activityService: ActivityService,
              private actRecordService: ActRecordService,
              private errorHandler: MyErrorHandler,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      //
      this.activityService.getActivity(params['cityCode'], +params['id']).subscribe(
        data => {
          this.activity = data;
          this.getActRecordsInfo();
          this.getActRecords();
        },
        error => {this.errorHandler.handleError(error)});
    });
  }

  getActRecords() {
    this.actRecordService.getActRecords(
      this.activity,
      this.searchParams.keyword,
      this.searchParams.status,
      this.pageNum,
      this.pageSize).subscribe(
      data => {
        this.total = data.total;
        this.actRecords = data.data;
        this.loading = false;
      },
      error => {this.errorHandler.handleError(error)});
  }

  search(currentPage: number) {
    this.pageNum = currentPage;
    this.getActRecords();
  }

  getActRecordsInfo() {
    this.actRecordService.getActRecordsInfo(
      this.activity).subscribe(
      data => {
        this.info = data;
      },
      error => {this.errorHandler.handleError(error)});
  }

  join(actRecord: ActRecordModel) {
  if(confirm("确定更改为参与？")) {
    this.actRecord = actRecord;
    this.actRecordService.updateActRecordStatus(this.activity, this.actRecord.id, 'JOIN').subscribe(
      data => {
        this.getActRecords();
        this.message = '更改为参与成功';
        this.toastService.triggerToast('提示', this.message, 'success');
        this.actRecord = new ActRecordModel();
      },
      error => {
        this.errorHandler.handleError(error)
      });
  }
}

  win(actRecord: ActRecordModel) {
    if(confirm("确定更改为中奖？")) {
      this.actRecord = actRecord;
      this.actRecordService.updateActRecordStatus(this.activity, this.actRecord.id, 'WIN').subscribe(
        data => {
          this.getActRecords();
          this.message = '更改为中奖成功';
          this.toastService.triggerToast('提示', this.message, 'success');
          this.actRecord = new ActRecordModel();
        },
        error => {
          this.errorHandler.handleError(error)
        });
    }
  }

  cash(actRecord: ActRecordModel) {
    if(confirm("确定更改为兑奖？")) {
      this.actRecord = actRecord;
      this.actRecordService.updateActRecordStatus(this.activity, this.actRecord.id, 'CASH').subscribe(
        data => {
          this.getActRecords();
          this.message = '更改为兑奖成功';
          this.toastService.triggerToast('提示', this.message, 'success');
          this.actRecord = new ActRecordModel();
        },
        error => {
          this.errorHandler.handleError(error)
        });
    }
  }

  exportExcel() {
    this.actRecordService.getExcelUrl(this.activity).subscribe(
      data => {
        window.location.href = data.downloadUrl;
      },
      error => {
        this.errorHandler.handleError(error)
      });
  }

}
