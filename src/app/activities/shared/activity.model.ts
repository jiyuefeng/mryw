export class ActivityModel {
  public id: number;
  public cityCode: string;
  public title: string;
  public startTime: Date | number;
  public endTime: Date | number;
  public price: number;
  public intro: string;
  public pictures: string[] = ["","","","",""];
  public detailUrl: string;
  public remark: string;
  public status: string;
  public createTime: Date | number;
  public creator: string;
  public lastModifyTime: Date | number;
  public lastModifier: string;
  public lastAuditTime: Date | number;
  public lastAuditor: string;
  public del: boolean;

  public recordCount:number = 0;
}
