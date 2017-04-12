import {Component, OnInit} from "@angular/core";
import {ActivityService} from "./shared/activity.service";
import {ActivityModel} from "./shared/activity.model";
import {UploadService} from "../shared/services/upload.service";
import {ToastService} from "../shared/services/toast.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.css'],
    providers: [ActivityService]
})
export class ActivityListComponent implements OnInit {

  message: string;

  pageNum: number = 1;
  pageSize: number = 10;
  total: number;

  activity: ActivityModel = new ActivityModel();
  activities: ActivityModel[];

  loading: boolean;
  searchParams: any = {
    keyword: ''
  };

  showAdd: boolean = false;
  showUpdate: boolean = false;
  showDetail: boolean = false;

  uploadProgress: number;

  picture1Mode: number = 2;
  picture2Mode: number = 2;
  picture3Mode: number = 2;
  picture4Mode: number = 2;
  picture5Mode: number = 2;

  constructor(private activityService: ActivityService,
              private uploadService: UploadService,
              private toastService: ToastService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getActivities();
  }

  getActivities() {
    this.activityService.getActivities(
      this.searchParams.keyword,
      this.pageNum,
      this.pageSize).subscribe(
      data => {
        this.total = data.total;
        this.activities = data.data;
        this.loading = false;
      },
      error => {throw error});
  }

  search(currentPage: number) {
    this.pageNum = currentPage;
    this.getActivities();
  }

  createActivity() {
    this.activityService.createActivity(this.activity).subscribe(
      data => {
        // this.activities.push(data);
        this.getActivities();
        this.message = '创建成功';
        this.toastService.triggerToast('提示', this.message, 'success');
        this.activity = new ActivityModel();
        this.showAdd = false;
      },
      error => {throw error});
  }


  updateActivity() {
    this.activityService.updateActivity(this.activity).subscribe(
      data => {
        this.getActivities();
        this.message = '更新成功';
        this.toastService.triggerToast('提示', this.message, 'success');
        this.activity = new ActivityModel();
        this.showUpdate = false;
      },
      error => {throw error});
  }

  audit(activity: ActivityModel) {
    if(confirm("确定审核？")) {
      this.activity = activity;
      this.activityService.updateActivityStatus(this.activity.id, 'AUDITED').subscribe(
        data => {
          this.getActivities();
          this.message = '审核成功';
          this.toastService.triggerToast('提示', this.message, 'success');
          this.activity = new ActivityModel();
        },
        error => {
          throw error
        });
    }
  }

  cancelAudit(activity: ActivityModel) {
    if(confirm("确定取消审核？")) {
      this.activity = activity;
      this.activityService.updateActivityStatus(this.activity.id, 'NOT_AUDIT').subscribe(
        data => {
          this.getActivities();
          this.message = '取消审核成功';
          this.toastService.triggerToast('提示', this.message, 'success');
          this.activity = new ActivityModel();
        },
        error => {
          throw error
        });
    }
  }

  changeStatus(activity: ActivityModel) {
    // this.activityService.changeStatus(wxconfig.id ,!wxconfig.status).subscribe(
    //   data => {
    //     this.message = !wxconfig.status ? '启用成功' : '禁用成功';
    //     this.toastService.triggerToast('提示', this.message, 'success');
    //     wxconfig.status = !wxconfig.status;
    //   },
    //   error => {throw error});
  }

  openCreateDialog() {
    this.showAdd = true;
  }

  openUpdateDialog(activity: ActivityModel) {
    this.activity = activity;
    this.showUpdate = true;
  }

  openDetailDialog(activity: ActivityModel) {
    this.activity = activity;
    this.showDetail = true;
  }

  closeDetailDialog() {
    this.activity = new ActivityModel();
    this.showDetail = false;
  }

  cancel() {
    this.showAdd = false;
    this.showUpdate = false;
    this.activity = new ActivityModel();
  }

  upload($event: any, i:number) {
    if ( typeof(FileReader) === 'undefined' ) {
      alert("抱歉，你的浏览器不支持 FileReader，不能将图片转换为Base64，请使用现代浏览器操作！");
    }

    let file = $event.target.files[0];
    if(!/image\/\w+/.test(file.type)){
      this.message = '请确保文件为图像类型';
      this.toastService.triggerToast('提示', this.message, 'success');
      return false;
    }

    let reader = new FileReader();
    reader.onloadend = (e) => {
      this.uploadService.uploadPicture(reader.result).subscribe(
        url => this.activity.pictures[i] = url,
        error => {throw error}
      );
    };
    reader.readAsDataURL(file);
  }
}
