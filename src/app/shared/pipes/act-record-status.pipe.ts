import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'actRecordStatus'})
export class ActRecordStatusPipe implements PipeTransform {

  actRecordStatus:any = {
    'JOIN': '参与',
    'WIN': '中奖',
    'CASH': '兑奖'
  };

    transform(value: string): number {
        return this.actRecordStatus[value];
    }
}
